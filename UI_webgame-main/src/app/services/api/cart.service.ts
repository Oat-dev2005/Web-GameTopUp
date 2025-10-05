import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  // เพิ่มเกมลงในตะกร้า
  addToCart(game: any) {
    this.cart.push(game);
  }

  // ดึงข้อมูลตะกร้า
  getCart() {
    return this.cart;
  }

  // ลบเกมออกจากตะกร้า
  removeFromCart(gameId: number) {
    this.cart = this.cart.filter(game => game.id !== gameId);
  }

  // เช็คว่ามีเกมนี้ในตะกร้าหรือไม่
  isGameInCart(gameId: number): boolean {
    return this.cart.some(game => game.id === gameId);
  }
}
