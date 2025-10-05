import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Webservice } from '../../services/api/webservice';
import { AuthService } from '../../services/api/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    // RouterOutlet,
    RouterModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private webService: Webservice,
    private auth: AuthService
  ) {}

  async loginUsers() {
    if (!this.email || !this.password) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    try {
      const response: any = await this.webService.login({
        email: this.email,
        password: this.password,
      });

      if (response.success) {
        this.auth.login(response.user);

        if (this.auth.isAdmin()) {
          this.router.navigate(['admin']);
        } else if (this.auth.isUser()) {
          this.router.navigate(['sellpage']);
        } else {
          alert('ไม่พบ role ที่ถูกต้อง');
        }
      } else {
        alert(response.message || 'เข้าสู่ระบบไม่สำเร็จ');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }
  }
  //     if (response.success) {
  //       this.auth.login(response.user);
  //       const user = response.user;
  //       localStorage.setItem('user', JSON.stringify(user));
  //       localStorage.setItem('userId', user.id.toString());

  //       if (user.role === 'admin') {
  //         this.router.navigate(['admin']);
  //       } else if (user.role === 'user') {
  //         this.router.navigate(['sellpage']);
  //       } else {
  //         alert('ไม่พบ role ที่ถูกต้อง');
  //       }
  //     } else {
  //       alert(response.message || 'เข้าสู่ระบบไม่สำเร็จ');
  //     }
  //   } catch (error) {
  //     console.error('❌ Login failed:', error);
  //     alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  //   }
  // }

  // ตรวจสอบว่า user ได้เข้าสู่ระบบแล้วหรือยัง
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
