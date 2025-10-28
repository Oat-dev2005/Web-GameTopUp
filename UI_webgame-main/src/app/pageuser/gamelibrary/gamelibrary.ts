import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
import { Header } from '../../pages/header/header';

import games from '/Users/jira/UI_webgame-main/src/assets/game.json'; // ใช้ path เดิมของคุณได้เลย
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
=======
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../../pages/header/header';
import { Webservice } from '../../services/api/webservice';
import { AuthService } from '../../services/api/auth.service';
>>>>>>> Stashed changes
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gamelibrary',
  templateUrl: './gamelibrary.html',
  styleUrls: ['./gamelibrary.scss'],
  imports: [Header, CommonModule, RouterModule, FormsModule],
  standalone: true,
})
export class Gamelibrary implements OnInit {
<<<<<<< Updated upstream
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
=======
   purchases: any[] = [];
  loading = true;

  constructor(
    private webService: Webservice,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    try {
      const userId = this.authService.getUserId();
      if (!userId) {
        this.purchases = [];
        this.loading = false;
        return;
      }
      const resp: any = await this.webService.getUserPurchases(userId);
      if (resp && resp.success) {
        this.purchases = resp.data || [];
      } else {
        this.purchases = [];
      }
    } catch (err) {
      console.error("Load purchases error:", err);
      this.purchases = [];
    } finally {
      this.loading = false;
    }
  }

  getImage(file?: string) {
    if (!file) return 'assets/images/default.jpg';
    return this.webService.getImageUrl(file);
  }

  trackById(index: number, item: any) {
    return item.id;
>>>>>>> Stashed changes
  }

  openGame(id: number) {
    // นำทางไปหน้า sellpage (game detail)
    // (ต้องใช้ Router, แต่เพื่อความสั้นใช้ location.href หรือ router.navigate ในเวอร์ชันจริง)
    window.location.href = `/sellpage/${id}`;
  }
}