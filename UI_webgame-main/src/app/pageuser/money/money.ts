import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Header } from '../../pages/header/header';

@Component({
  selector: 'app-money',
  imports: [CommonModule,RouterModule,NgFor,FormsModule ,Header ],
  templateUrl: './money.html',
  styleUrl: './money.scss'
})

  export class Money {
  amounts = [100, 200,300, 500, 1000,2000];  // ยอดเงินที่สามารถเลือกได้
  amountInput: number | undefined;   // จำนวนเงินที่กรอกหรือเลือก

  // ฟังก์ชันเพื่อเซ็ตจำนวนเงินที่เลือก
  setAmount(amount: number): void {
    this.amountInput = amount;
  }

  // ฟังก์ชันยืนยันการเติมเงิน
  submitPayment(): void {
    if (this.amountInput && this.amountInput > 0) {
      alert(`คุณได้เติมเงินจำนวน ${this.amountInput} บาท`);
    } else {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
    }
  }
}
