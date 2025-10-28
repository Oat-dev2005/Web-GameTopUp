import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../../pages/header/header';
import { FormsModule } from '@angular/forms';
import { GameGetResponse } from '../../model/game_res';
import { Webservice } from '../../services/api/webservice';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  imports: [Header, RouterModule, CommonModule, FormsModule],
  styleUrls: ['./cart.scss'],
})
export class Cart implements OnInit {
  userBalance: number = 0;

  cart: GameGetResponse[] = []; // รายการเกมในตะกร้า
  cartIds: number[] = []; // รายการ id เกมในตะกร้า

  discountCode: string = ''; // รหัสส่วนลดที่ผู้ใช้กรอก
  discountApplied: boolean = false; // เช็คว่ามีการใช้ส่วนลด
  discountAmount: number = 0; // จำนวนส่วนลด
  finalPrice: number = 0; // ราคาหลังหักส่วนลด
  totalPrice: number = 0; // ราคาทั้งหมดในตะกร้า (ก่อนหักส่วนลด)

  constructor(
    private webService: Webservice,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try {
      // ดึง ID เกมจาก localStorage (ต้องเป็น array ของเลข)
      const storedCart = localStorage.getItem('cart');
      this.cartIds = Array.isArray(JSON.parse(storedCart || '[]'))
        ? JSON.parse(storedCart || '[]')
        : [];

      console.log('รหัสเกมในตะกร้า:', this.cartIds);

      // โหลดข้อมูลเกมทั้งหมดจาก API
      this.cart = await Promise.all(
        this.cartIds.map((id) => this.webService.getOneGame(id))
      );

      // แปลง Gprice เป็น number
      this.cart = this.cart.map((game) => ({
        ...game,
        Gprice: Number(game.Gprice),
      }));

      console.log('ข้อมูลเกมในตะกร้า:', this.cart);
      this.calculateTotalPrice();
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการโหลดข้อมูลตะกร้า:', error);
      this.cart = [];
      this.cartIds = [];
    }
  }

  getImage(file?: string) {
    if (!file) return 'assets/images/default.jpg';
    return this.webService.getImageUrl(file);
  }

  // ฟังก์ชันคำนวณราคาทั้งหมดในตะกร้า
  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum, game) => sum + game.Gprice, 0);
    this.finalPrice = this.totalPrice; // ราคาสุทธิเริ่มต้น
  }

  // ฟังก์ชันสำหรับใช้รหัสส่วนลด
  applyDiscount() {
    if (this.discountCode === 'DISCOUNT10') {
      this.discountAmount = this.finalPrice * 0.1;
      this.finalPrice -= this.discountAmount;
      this.discountApplied = true;
    } else {
      this.discountAmount = 0;
      this.finalPrice = this.totalPrice;
      this.discountApplied = false;
    }
  }

  // ฟังก์ชันลบเกมออกจากตะกร้า
  removeFromCart(gameId: number) {
    this.cart = this.cart.filter((game) => game.id !== gameId);
    this.cartIds = this.cartIds.filter((id) => id !== gameId);
    localStorage.setItem('cart', JSON.stringify(this.cartIds));
    this.calculateTotalPrice();
  }

  async buyGames() {
  if (this.cart.length === 0) {
    alert('ตะกร้าว่าง');
    return;
  }

  const userId = this.authService.getUserId();
  if (!userId) {
    alert('โปรดเข้าสู่ระบบก่อนซื้อเกม');
    this.router.navigate(['/login']);
    return;
  }

  // ดึงยอด balance ล่าสุดจาก backend
  const profileResp: any = await this.webService.getOneProfile(userId);
  const balance = profileResp?.data?.balance || 0;

  // ตรวจสอบการซื้อซ้ำ
  const duplicateGames: number[] = [];
  for (let gameId of this.cartIds) {
    const checkResp = await this.webService.checkPurchased(userId, gameId);
    if (checkResp.success && checkResp.purchased) {
      duplicateGames.push(gameId);
    }
  }

  if (duplicateGames.length > 0) {
    alert(`คุณเคยซื้อเกมเหล่านี้ไปแล้ว: ${duplicateGames.join(', ')}`);
    return;
  }

  if (balance >= this.finalPrice) {
    const confirmPurchase = window.confirm(
      `คุณต้องการซื้อเกมทั้งหมดในตะกร้า ราคา ${this.finalPrice} บาท ใช่หรือไม่?`
    );
    if (!confirmPurchase) return;

    try {
      // เรียก API เพื่อบันทึกการซื้อเกม
      const purchaseResp: any = await this.webService.buyGamesBulk(userId, this.cartIds, this.finalPrice);

      if (purchaseResp.success) {
        // ล้างตะกร้า
        this.cart = [];
        this.cartIds = [];
        localStorage.removeItem('cart');
        this.totalPrice = 0;
        this.finalPrice = 0;
        this.discountAmount = 0;
        this.discountApplied = false;
        this.userBalance = purchaseResp.newBalance;

        alert('ซื้อเกมสำเร็จ!');
      } else {
        alert(purchaseResp.message || 'ซื้อเกมไม่สำเร็จ');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการซื้อเกม:', error);
      alert('เกิดข้อผิดพลาดในการซื้อเกม');
    }
  } else {
    alert('เงินไม่พอ');
  }
}
}
