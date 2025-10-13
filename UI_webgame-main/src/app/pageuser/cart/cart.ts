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

  // async ngOnInit() {
  //   // ดึง ID เกมจาก localStorage
  //   this.cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
  //   console.log('รหัสเกมในตะกร้า:', this.cartIds);

  //   // โหลดข้อมูลเกมทั้งหมดจาก API
  //   this.cart = await Promise.all(
  //     this.cartIds.map((id) => this.webService.getOneGame(id))
  //   );

  //   console.log('ข้อมูลเกมในตะกร้า:', this.cart);
  //   this.calculateTotalPrice();
  // }
  async ngOnInit() {
    this.cartIds = JSON.parse(localStorage.getItem('cart') || '[]');
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
  }

  getImage(file?: string) {
    if (!file) {
      return 'assets/images/default.jpg'; // ถ้าไม่มีไฟล์ → ใช้รูป default
    }
    return this.webService.getImageUrl(file);
  }

  // ฟังก์ชันคำนวณราคาทั้งหมดในตะกร้า
  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum, game) => sum + game.Gprice, 0);
    this.finalPrice = this.totalPrice; // กำหนดราคาสุทธิให้เท่ากับราคาเดิมก่อนหักส่วนลด
  }

  // ฟังก์ชันสำหรับใช้รหัสส่วนลด
  applyDiscount() {
    if (this.discountCode === 'DISCOUNT10') {
      // สมมติว่า รหัส 'DISCOUNT10' ให้ส่วนลด 10%
      this.discountAmount = this.finalPrice * 0.1; // คำนวณส่วนลด 10%
      this.finalPrice -= this.discountAmount; // คำนวณราคาหลังหักส่วนลด
      this.discountApplied = true;
    } else {
      this.discountAmount = 0;
      this.finalPrice = this.totalPrice; // หากไม่มีส่วนลดจะคำนวณราคาทั้งหมด
      this.discountApplied = false;
    }
  }

  // ฟังก์ชันลบเกมออกจากตะกร้า
  removeFromCart(gameId: number) {
    this.cart = this.cart.filter((game) => game.id !== gameId);
    this.cartIds = this.cartIds.filter((id) => id !== gameId);
    localStorage.setItem('cart', JSON.stringify(this.cartIds));
    this.calculateTotalPrice(); // อัปเดตราคาเมื่อเกมถูกลบ
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

    if (balance >= this.finalPrice) {
      const confirmPurchase = window.confirm(
        `คุณต้องการซื้อเกมทั้งหมดในตะกร้า ราคา ${this.finalPrice} บาท ใช่หรือไม่?`
      );
      if (!confirmPurchase) return;

      // หัก balance
      // const newBalance = balance - this.finalPrice;
      const updateResp: any = await this.webService.purchaseGames(
        userId,
        this.finalPrice
      );

      if (updateResp.success) {
        // ลบเกมทั้งหมดในตะกร้า
        this.cart = [];
        this.cartIds = [];
        localStorage.removeItem('cart');
        this.totalPrice = 0;
        this.finalPrice = 0;
        this.discountAmount = 0;
        this.discountApplied = false;

        this.userBalance = updateResp.newBalance;

        alert('ซื้อเกมสำเร็จ!');
        // อัปเดตหน้า profile หรือ balance ถ้าต้องการ
      } else {
        alert(updateResp.message || 'ซื้อเกมไม่สำเร็จ');
      }
    } else {
      alert('เงินไม่พอ');
    }
  }
}
