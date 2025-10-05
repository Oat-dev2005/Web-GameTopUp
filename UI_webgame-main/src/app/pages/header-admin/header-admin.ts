import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-header-admin',
  imports: [RouterModule],
  templateUrl: './header-admin.html',
  styleUrl: './header-admin.scss',
})
export class HeaderAdmin {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
