import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Webservice } from '../../services/api/webservice';
import { GameGetResponse } from '../../model/game_res';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';

@Component({
  selector: 'app-editgame',
  standalone: true,
  imports: [CommonModule, FormsModule , HeaderAdmin],
  templateUrl: './editgame.html',
  styleUrls: ['./editgame.scss'],
})
export class Editgame {
  game: GameGetResponse = {
    id: 0,
    Gname: '',
    Gimage: '',
    Gprice: 0,
    sold: 0,
    category: '',
    detail: '',
    releasedate: '',
  };

  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private webService: Webservice
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.game = await this.webService.getOneGame(id);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async updateGame() {
    const formData = new FormData();
    formData.append('Gname', this.game.Gname);
    formData.append('Gprice', String(this.game.Gprice));
    formData.append('category', this.game.category);
    formData.append('detail', this.game.detail);

    if (this.selectedFile) {
      formData.append('Gimage', this.selectedFile);
    }

    try {
      await this.webService.editGame(this.game.id, formData); // ✅ แก้ชื่อเมธอด
      alert('อัปเดตเกมเรียบร้อย ✅');
      this.router.navigate(['/admin']);
    } catch (err) {
      console.error('อัปเดตเกมล้มเหลว ❌', err);
      alert('เกิดข้อผิดพลาดในการอัปเดต');
    }
  }
}
