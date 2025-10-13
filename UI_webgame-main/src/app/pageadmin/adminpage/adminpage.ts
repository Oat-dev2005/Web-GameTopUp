import { Component, OnInit } from '@angular/core';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameGetResponse } from '../../model/game_res';
import { Webservice } from '../../services/api/webservice';
//import games from '/web_game_week3/Web-GameTopUp-main/UI_webgame-main/src/assets/game.json'; // เปลี่ยนเป็น relative path

@Component({
  selector: 'app-adminpage',
  standalone: true,
  imports: [HeaderAdmin, CommonModule, RouterModule, FormsModule],
  templateUrl: './adminpage.html',
  styleUrl: './adminpage.scss',
})
export class Adminpage implements OnInit {
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
  }

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

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('ตะกร้าหลังจากเพิ่มเกม:', cart);

    this.router.navigate(['/cart']);
  }
}
