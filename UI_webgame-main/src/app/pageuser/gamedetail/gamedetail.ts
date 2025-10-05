import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import games from '/Users/jira/UI_webgame-main/src/assets/game.json'; // ใช้ path เดิมของคุณได้เลย
import { Header } from '../../pages/header/header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gamedetail',
  imports: [Header, CommonModule],
  templateUrl: './gamedetail.html',
  styleUrls: ['./gamedetail.scss'],
})
export class Gamedetail implements OnInit {
  game: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ได้ id:', id); // ✅ ตรวจว่าขึ้นใน console หรือไม่

    this.game = games.find((g) => g.id === id);
    console.log('ข้อมูลเกมที่เจอ:', this.game); // ✅ ตรวจว่าขึ้นไหม
  }

  // ฟังก์ชันเพิ่มเกมลงตะกร้า
  addToCart(game: any): void {
    console.log('เพิ่มเกมลงในตะกร้า:', game);

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));

    console.log('ตะกร้าหลังจากเพิ่มเกม:', cart);

    // หลังจากเพิ่มเกมแล้วนำทางไปหน้าตะกร้า
    this.router.navigate(['/cart']);
  }
}
