import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Webservice } from '../../services/api/webservice';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    // RouterOutlet,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register {
  username = '';
  email = '';
  password = '';
  selectedFile: File | null = null;

  constructor(private router: Router, private webService: Webservice) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async regUsers() {
    if (!this.username || !this.email || !this.password) {
      alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    const body = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    try {
      const response = await this.webService.register(body, this.selectedFile);
      console.log('✅ Register Success:', response);

      alert('สมัครสมาชิกสำเร็จ!');
      this.router.navigate(['']);
    } catch (error) {
      console.error('❌ Register failed:', error);
      alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
