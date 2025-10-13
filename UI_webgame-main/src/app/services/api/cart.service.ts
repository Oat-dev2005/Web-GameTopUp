import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  constructor() {
    // โหลด cart จาก localStorage ตอนสร้าง service
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = storedCart;
  }

  // เพิ่มเกมลงในตะกร้า
  addToCart(game: any) {
    if (!this.cart.some((g) => game.id === game.id)) {
      this.cart.push(game);
      this.saveCart();
    }
  }

  // ดึงข้อมูลตะกร้า
  getCart() {
    return this.cart;
  }

  // ลบเกมออกจากตะกร้า
  removeFromCart(gameId: number) {
    this.cart = this.cart.filter((game) => game.id !== gameId);
    this.saveCart();
  }

  // เช็คว่ามีเกมนี้ในตะกร้าหรือไม่
  isGameInCart(gameId: number): boolean {
    return this.cart.some((game) => game.id === gameId);
  }

  private saveCart() {
    // บันทึกลง localStorage ด้วย
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
