import { Component } from '@angular/core';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import { GameGetResponse } from '../../model/game_res';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Webservice } from '../../services/api/webservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailadmin',
  imports: [HeaderAdmin, CommonModule,RouterLink],
  templateUrl: './detailadmin.html',
  styleUrls: ['./detailadmin.scss'] // ✅ แก้ตรงนี้ (เติม s)
})
export class Detailadmin {
  game: GameGetResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webService: Webservice // ✅ inject Webservice ให้ถูก
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.game = await this.webService.getOneGame(id);
      console.log('ข้อมูลเกม:', this.game);
    }
  }

  getImage(file?: string) {
    if (!file) {
      return 'assets/images/default.jpg';
    }
    return this.webService.getImageUrl(file);
  }

  async deleteGame() {
    if (!this.game) return;

    const confirmed = confirm(`คุณต้องการลบเกม "${this.game.Gname}" ใช่หรือไม่?`);

    if (confirmed) {
      try {
        await this.webService.deleteGame(this.game.id);
        alert('ลบเกมเรียบร้อยแล้ว ✅');
        this.router.navigate(['/admin']); // ✅ กลับไปหน้า sellpage
      } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error);
        alert('ลบเกมไม่สำเร็จ ❌');
      }
    }
  }
}

