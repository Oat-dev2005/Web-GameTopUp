import { Component, OnInit } from '@angular/core';
import { Header } from '../../pages/header/header';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GameGetResponse } from '../../model/game_res';
import { Webservice } from '../../services/api/webservice';

@Component({
  selector: 'app-sell-page',
  standalone: true,
  imports: [Header, CommonModule, RouterModule, FormsModule],
  templateUrl: './sell-page.html',
  styleUrls: ['./sell-page.scss'],
})
export class SellPage {
  ListGames: GameGetResponse[] = [];
  game: GameGetResponse | null = null;

  // games: any[] = [];
  top5GameIds: number[] = [];
  searchByName: string = ''; // ตัวแปรสำหรับค้นหาจากชื่อเกม
  searchByType: string = ''; // ตัวแปรสำหรับค้นหาจากประเภทเกม

  constructor(
    private router: Router,
    private webService: Webservice,
    private route: ActivatedRoute
  ) {}

  async search(input: HTMLInputElement) {
    const value = input.value.trim();

    if (!value) {
      // ไม่ได้ใส่ค่า → ดึงทริปทั้งหมด
      this.ListGames = await this.webService.getGames();
      this.game = null; // reset trip เดี่ยว
      console.log('ค้นหาทั้งหมด', this.ListGames);
      return;
    }

    // // ถ้าเป็นตัวเลข → ค้นหาด้วย ID
    // if (!isNaN(+value)) {
    //   this.game = await this.webService.getOneGame(+value);
    //   this.ListGames = []; // reset list
    //   console.log('ค้นหาด้วย ID', this.game);
    // } else {
    //   // ถ้าเป็น string → ค้นหาด้วยชื่อ
    //   this.ListGames = await this.webService.getTripByName(value);
    //   this.game = null; // reset single trip
    //   console.log('ค้นหาด้วยชื่อ', this.ListGames);
    // }
  }
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
    // ดึงเกมทั้งหมด
    this.ListGames = await this.webService.getGames();
    console.log('เกมทั้งหมด:', this.ListGames);
    // console.log('Response จาก API:', response);

    // ถ้ามี id ใน route ให้ดึงเกมตัวเดียว
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.game = await this.webService.getOneGame(id);
      console.log('รายละเอียดเกม:', this.game);
    }
  }

  getImage(file?: string) {
    if (!file) {
      return 'assets/images/default.jpg'; // ถ้าไม่มีไฟล์ → ใช้รูป default
    }
    return this.webService.getImageUrl(file);
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
    return this.ListGames.filter((game) => {
      const nameQuery = this.searchByName.toLowerCase();
      const typeQuery = this.searchByType.toLowerCase();
      return (
        game.Gname.toLowerCase().includes(nameQuery) &&
        game.category.toLowerCase().includes(typeQuery)
      );
    });
  }

  // ฟังก์ชันสำหรับเพิ่มเกมลงในตะกร้า
  addToCart(game: GameGetResponse) {
    console.log('เพิ่มเกมลงในตะกร้า:', game);

    let cartIds = JSON.parse(localStorage.getItem('cart') || '[]');

    // ✅ เก็บเฉพาะ id แทนที่จะเก็บทั้ง object
    if (!cartIds.includes(game.id)) {
      cartIds.push(game.id);
      localStorage.setItem('cart', JSON.stringify(cartIds));
    }

    console.log('ตะกร้าหลังจากเพิ่มเกม:', cartIds);
    alert(`เพิ่ม ${game.Gname} ลงในตะกร้าแล้ว`);
  }
}
