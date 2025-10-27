import { Component, OnInit } from '@angular/core';
import { Header } from '../../pages/header/header';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Webservice } from '../../services/api/webservice';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-gamelibrary',
  templateUrl: './gamelibrary.html',
  styleUrls: ['./gamelibrary.scss'],
  imports: [Header, CommonModule, RouterModule, FormsModule],
  standalone: true,
})
export class Gamelibrary implements OnInit {
  games: any[] = [];
  top5GameIds: number[] = [];
  searchByName: string = ''; // ตัวแปรสำหรับค้นหาจากชื่อเกม
  searchByType: string = ''; // ตัวแปรสำหรับค้นหาจากประเภทเกม
  userId!: number;
  purchasedGames: any[] = [];

  constructor(private router: Router, private webService: Webservice) {}

  // ngOnInit() {
  //   this.games = games
  //     .map((game) => ({
  //       ...game,
  //       sold: Number(game.sold),
  //     }))
  //     .sort((a, b) => b.sold - a.sold);

  //   this.top5GameIds = this.games.slice(0, 5).map((game) => game.id);
  // }
  async ngOnInit() {
    try {
      const resp: any = await this.webService.getUserLibrary(this.userId);
      if (resp.success) {
        this.games = resp.data.map((g: any) => ({
          ...g,
          Gprice: Number(g.Gprice),
        }));
      }
    } catch (error) {
      console.error('Error loading library:', error);
    }
  }

  // // ฟังก์ชันสำหรับตรวจสอบว่าเกมเป็น Top 5 หรือไม่
  // isTop5(gameId: number): boolean {
  //   return this.top5GameIds.includes(gameId);
  // }

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

  getImage(file?: string) {
    if (!file) {
      return 'assets/images/default.jpg'; // ถ้าไม่มีไฟล์ → ใช้รูป default
    }
    return this.webService.getImageUrl(file);
  }

  // ฟังก์ชันสำหรับเพิ่มเกมลงในตะกร้า
  addToCart(game: any) {
    alert(`คุณมีเกม "${game.Gname}" แล้ว ไม่สามารถซื้อซ้ำได้ ❌`);
  }
}
