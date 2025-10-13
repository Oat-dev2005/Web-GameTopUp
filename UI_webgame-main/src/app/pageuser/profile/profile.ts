import { Component } from '@angular/core';
import { Webservice } from '../../services/api/webservice';  // Webservice สำหรับเรียก API
import { AuthService } from '../../services/api/auth.service';  // AuthService สำหรับตรวจสอบสถานะผู้ใช้ที่ล็อกอิน
import { Router, RouterModule } from '@angular/router';
import { UserGetResponse } from '../../model/user_res';  // UserGetResponse interface
import { Header } from '../../pages/header/header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [Header,CommonModule,RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile {
  user: UserGetResponse | null = null;  // กำหนดประเภทข้อมูลตรงกับ UserGetResponse
  username: string = '';
  email: string = '';
  role: string = '';
  image: string = '';
  balance: number = 0;
  topupHistory: any;

  constructor(
    public webService: Webservice,
    private authService: AuthService,
    private router: Router
  ) {}

  // เมื่อคอมโพเนนต์โหลด จะเรียก API เพื่อดึงข้อมูลโปรไฟล์
  async ngOnInit() {
  const userId = this.authService.getUserId();

  if (userId) {
    try {
      const profile = await this.webService.getOneProfile(userId);

      if (profile) {
        // กำหนดค่าผลลัพธ์ที่ได้รับจาก API ลงในตัวแปร
        this.user = profile.data;
        this.username = this.user.username || '';
        this.email = this.user.email || '';
        this.role = this.user.role || '';
        this.image = this.user.image || '';
        this.balance = typeof this.user.balance === 'number' ? this.user.balance : 0;
        this.topupHistory = this.user.topup_history || [];  // เก็บประวัติการเติมเงิน
      }
    } catch (error) {
      console.error('ไม่สามารถดึงข้อมูลโปรไฟล์ได้', error);
      alert('ไม่สามารถดึงข้อมูลโปรไฟล์');
    }
  } else {
    alert('โปรดเข้าสู่ระบบ');
    this.router.navigate(['/login']);
  }
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
