import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../../pages/header/header';
import { Webservice } from '../../services/api/webservice';
import { AuthService } from '../../services/api/auth.service';  // ใช้ AuthService เพื่อเช็คสถานะล็อกอิน

@Component({
  selector: 'app-money',
  imports: [CommonModule, RouterModule, NgFor, FormsModule, Header],
  templateUrl: './money.html',
  styleUrls: ['./money.scss']
})
export class Money {
  amounts = [100, 200, 300, 500, 1000, 2000];  // รายการจำนวนเงินที่ผู้ใช้สามารถเลือก
  amountInput: number | undefined;  // ตัวแปรเก็บจำนวนเงินที่เลือก
  errorMessage: string = '';  // ตัวแปรเก็บข้อความแจ้งเตือน

  constructor(
    private webService: Webservice,
    private authService: AuthService,  // ใช้เพื่อดึงข้อมูลผู้ใช้
    private router: Router
  ) {}

  // เมื่อผู้ใช้เลือกจำนวนเงิน
  setAmount(amount: number): void {
    this.amountInput = amount;
  }

  // ฟังก์ชันสำหรับการเติมเงิน
  async submitPayment() {
    if (this.amountInput && this.amountInput > 0) {
      // เพิ่มการยืนยันก่อนการเติมเงิน
      const confirmPayment = window.confirm(`คุณต้องการเติมเงินจำนวน ${this.amountInput} บาทใช่หรือไม่?`);
      
      if (confirmPayment) {
        try {
          // ดึง userId จาก AuthService (สมมุติว่าคุณจัดการ session หรือ token ไว้ใน AuthService)
          const userId = this.authService.getUserId();
          if (!userId) {
            this.errorMessage = 'กรุณาเข้าสู่ระบบก่อนเติมเงิน';
            this.router.navigate(['/login']);  // นำทางไปหน้า login หากยังไม่ล็อกอิน
            return;
          }

          // เรียก API สำหรับการเติมเงิน
          const resp: any = await this.webService.topUp(userId, this.amountInput);
          if (resp.success) {
            alert(`เติมเงินสำเร็จ จำนวน ${this.amountInput} บาท`);
            // อาจจะมีการอัปเดตข้อมูลยอดเงินที่หน้าหลัก หรือหน้าโปรไฟล์
          } else {
            this.errorMessage = `เติมเงินไม่สำเร็จ: ${resp.message}`;
          }
        } catch (err) {
          console.error('Error top up:', err);
          this.errorMessage = 'เกิดข้อผิดพลาดในการเติมเงิน';
        }
      } else {
        this.errorMessage = 'การเติมเงินถูกยกเลิก';
      }
    } else {
      this.errorMessage = 'กรุณากรอกจำนวนเงินที่ถูกต้อง';
    }
  }
}
