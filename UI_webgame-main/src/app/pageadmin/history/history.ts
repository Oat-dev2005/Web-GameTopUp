import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from '../../pages/header-admin/header-admin';
import jsonData from '/Users/jira/UI_webgame-main/src/assets/user.json';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, HeaderAdmin, RouterModule],
  templateUrl: './history.html',
  styleUrls: ['./history.scss'],
})
export class Historyuser {
  users = jsonData.filter((user: any) => user.role === 'member');

  constructor(private router: Router) {}

  goToDetail(user: any) {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    this.router.navigate(['/hisdetail']);
  }
}
