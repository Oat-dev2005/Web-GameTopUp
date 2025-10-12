import { Component } from '@angular/core';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Webservice } from '../../services/api/webservice';
import { GameGetResponse } from '../../model/game_res';

@Component({
  selector: 'app-addgame',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    HeaderAdmin,
  ],
  templateUrl: './addgame.html',
  styleUrl: './addgame.scss',
})
export class Addgame {
  game: GameGetResponse | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private webService: Webservice
  ) {}

  Gname = '';
  selectedFile: File | null = null;
  Gprice = 0;
  sold = 0;
  category = '';
  detail = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  // async ngOnInit() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.game = await this.webService.getOneGame(id);
  //   if (this.game) {
  //     this.Gname = this.game.Gname;
  //     this.Gprice = this.game.Gprice;
  //     this.sold = this.game.sold;
  //     this.category = this.game.category;
  //     this.detail = this.game.detail;
  //   }
  // }

  async addNewGameOrEdit() {
    if (!this.Gname || !this.Gprice || !this.category || !this.detail) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const formData = new FormData();
    formData.append('Gname', this.Gname);
    formData.append('Gprice', this.Gprice.toString());
    formData.append('sold', this.sold.toString());
    formData.append('category', this.category);
    formData.append('detail', this.detail);

    if (this.selectedFile) {
      formData.append('Gimage', this.selectedFile, this.selectedFile.name);
    }

    try {
      const response = await this.webService.addNewGame(formData);
      console.log('✅ เพิ่มเกมสำเร็จ:', response);
      alert('เพิ่มเกมใหม่สำเร็จ ✅');
      this.router.navigate(['admin']);
    } catch (error) {
      console.error('❌ เพิ่มเกมล้มเหลว:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มเกม');
    }
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }
}
