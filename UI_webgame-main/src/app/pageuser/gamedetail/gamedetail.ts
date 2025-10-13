import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Webservice } from '../../services/api/webservice';
import { GameGetResponse } from '../../model/game_res';
import { Header } from '../../pages/header/header';

@Component({
  selector: 'app-gamedetail',
  standalone: true,
  imports: [CommonModule,Header],
  templateUrl: './gamedetail.html',
  styleUrls: ['./gamedetail.scss']
})
export class Gamedetail implements OnInit {
  game: GameGetResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private webService: Webservice
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
}
