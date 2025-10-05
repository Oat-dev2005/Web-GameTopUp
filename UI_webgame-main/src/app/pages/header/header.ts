import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  userId: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
}
