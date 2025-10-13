import { Component, OnInit } from '@angular/core';
import { Webservice } from '../../services/api/webservice'; // ที่ที่ Webservice ถูกประกาศ
import { UserGetResponse } from '../../model/user_res';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  imports: [CommonModule, HeaderAdmin, RouterModule],
  templateUrl: './history.html',
  styleUrls: ['./history.scss'],
})
export class Historyuser implements OnInit {

  users: UserGetResponse[] = [];  // เก็บข้อมูลผู้ใช้ทั้งหมด

  constructor(
    private webservice: Webservice,
    private router: Router  // เพิ่ม Router เข้าไปใน constructor
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.webservice.getAllUsers();  // เรียกฟังก์ชันจาก web service
    } catch (error) {
      console.error("Error loading users", error);
    }
  }

  goToDetail(user: any) {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    this.router.navigate(['/hisdetail']);
  }

  getImageUrl(filename: string): string {
    if (!filename) {
      return 'assets/images/default.jpg'; // ถ้าไม่มีรูป ใช้ default
    }
    return `${this.webservice.getApiEndpoint()}/uploads/${filename}`; // ใช้ getApiEndpoint()
  }
}
