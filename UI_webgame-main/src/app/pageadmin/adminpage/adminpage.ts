import { Component, OnInit } from '@angular/core';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import games from '/Users/jira/UI_webgame-main/src/assets/game.json'; // เปลี่ยนเป็น relative path

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [HeaderAdmin, CommonModule, RouterModule, FormsModule],
  templateUrl: './adminpage.html',
  styleUrl: './adminpage.scss',
})
export class Adminpage implements OnInit {
  games: any[] = [];
  top5GameIds: number[] = [];
  searchByName: string = ''; // ตัวแปรสำหรับค้นหาจากชื่อเกม
  searchByType: string = ''; // ตัวแปรสำหรับค้นหาจากประเภทเกม

  constructor(private router: Router) {}

  ngOnInit() {
    this.games = games
      .map((game) => ({
        ...game,
        sold: Number(game.sold),
      }))
      .sort((a, b) => b.sold - a.sold);

    this.top5GameIds = this.games.slice(0, 5).map((game) => game.id);
  }

  // ฟังก์ชันสำหรับตรวจสอบว่าเกมเป็น Top 5 หรือไม่
  isTop5(gameId: number): boolean {
    return this.top5GameIds.includes(gameId);
  }

  // ฟังก์ชันสำหรับ tracking games ตาม id
  trackByGameId(index: number, game: any): number {
    return game.id;
  }

  // ฟังก์ชันกรองเกมตามชื่อและประเภท
  getFilteredGames() {
    return this.games.filter((game) => {
      const nameQuery = this.searchByName.toLowerCase();
      const typeQuery = this.searchByType.toLowerCase();
      return (
        game.name.toLowerCase().includes(nameQuery) &&
        game.type.toLowerCase().includes(typeQuery)
      );
    });
  }

  // ฟังก์ชันสำหรับเพิ่มเกมลงในตะกร้า
  addToCart(game: any) {
    console.log('เพิ่มเกมลงในตะกร้า:', game);

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('ตะกร้าหลังจากเพิ่มเกม:', cart);

    this.router.navigate(['/cart']);
  }
}
