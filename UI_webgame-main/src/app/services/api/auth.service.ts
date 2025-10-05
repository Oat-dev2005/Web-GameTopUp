import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userKey = 'user';

  constructor(private router: Router) {}

  login(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['login']);
  }

  getUser(): any | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  isUser(): boolean {
    const user = this.getUser();
    return user?.role === 'user';
  }
}
