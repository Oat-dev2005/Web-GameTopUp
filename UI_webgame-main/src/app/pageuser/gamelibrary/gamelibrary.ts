import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../../pages/header/header';
import { Webservice } from '../../services/api/webservice';
import { AuthService } from '../../services/api/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gamelibrary',
  templateUrl: './gamelibrary.html',
  styleUrls: ['./gamelibrary.scss'],
  imports: [Header, CommonModule, RouterModule, FormsModule],
  standalone: true,
})
export class Gamelibrary implements OnInit {
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
  }

  openGame(id: number) {
    // นำทางไปหน้า sellpage (game detail)
    // (ต้องใช้ Router, แต่เพื่อความสั้นใช้ location.href หรือ router.navigate ในเวอร์ชันจริง)
    window.location.href = `/sellpage/${id}`;
  }
}