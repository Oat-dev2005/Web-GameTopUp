import { Component } from '@angular/core';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import jsonData from '/Users/jira/UI_webgame-main/src/assets/user.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hisdetail',
  standalone: true,
  imports: [CommonModule, HeaderAdmin],
  templateUrl: './hisdetail.html',
  styleUrl: './hisdetail.scss',
})
export class Hisdetail {
  user: any;

  constructor() {
    const data = localStorage.getItem('selectedUser');
    this.user = data ? JSON.parse(data) : null;
  }
}
