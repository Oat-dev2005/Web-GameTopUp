import { Component } from '@angular/core';
import { Header } from '../../pages/header/header';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Webservice } from '../../services/api/webservice';
import { UserGetResponse } from '../../model/ีuser_res';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-profile',
  imports: [Header, RouterModule, CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile {
  user: UserGetResponse | null = null;

  username = '';
  email = '';
  role = '';
  image: string | File = '';

  // imageUrl: string =
  //   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdUwpUCDiwozPqnZc5AqQorU651Mo3vpXXJg&s';

  constructor(
    private router: Router,
    private webService: Webservice,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = await this.webService.getOneProfile(id);

    if (this.user) {
      this.username = this.user.username;
      this.email = this.user.email;
      this.role = this.user.role;
      this.image = this.user.image || '';
    }
  }

  async EditProfile() {
    if (!this.user) return;

    const body = {
      username: this.username,
      email: this.email,
      role: this.role,
      image: this.image,
    };

    try {
      const response = await this.webService.updateProfile(this.user.id, body);
      console.log('อัปเดตสำเร็จ:', response);
      alert('บันทึกข้อมูลสำเร็จ ✅');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Save failed:', error);
    }
  }

  logout() {
    this.auth.logout();
  }
}
