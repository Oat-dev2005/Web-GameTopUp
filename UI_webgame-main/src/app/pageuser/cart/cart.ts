import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../../pages/header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  imports: [Header, RouterModule, CommonModule, FormsModule],
  styleUrls: ['./cart.scss'],
})
export class Cart implements OnInit {
  cart: any[] = []; // รายการเกมในตะกร้า
  discountCode: string = ''; // รหัสส่วนลดที่ผู้ใช้กรอก
  discountApplied: boolean = false; // เช็คว่ามีการใช้ส่วนลด
  discountAmount: number = 0; // จำนวนส่วนลด
  finalPrice: number = 0; // ราคาหลังหักส่วนลด
  totalPrice: number = 0; // ราคาทั้งหมดในตะกร้า (ก่อนหักส่วนลด)

  ngOnInit() {
    // ดึงข้อมูลตะกร้าจาก localStorage
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('ตะกร้าปัจจุบัน:', this.cart); // ตรวจสอบว่าได้ข้อมูลจาก localStorage หรือไม่
    this.calculateTotalPrice(); // คำนวณราคาทั้งหมด
  }

  // ฟังก์ชันคำนวณราคาทั้งหมดในตะกร้า
  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((sum, game) => sum + game.price, 0);
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
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.calculateTotalPrice(); // อัปเดตราคาเมื่อเกมถูกลบ
  }
}
