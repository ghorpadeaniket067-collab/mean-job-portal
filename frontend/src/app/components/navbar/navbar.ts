import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  menuOpen = false;
  userName = '';

  constructor(private router: Router) {
    this.loadUser();
  }

  loadUser() {
    const user = localStorage.getItem('user');

    if (!user) {
      return;
    }

    try {
      const userData = JSON.parse(user);
      this.userName = userData.name || 'User';
    } catch {
      this.userName = 'User';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.menuOpen = false;
    this.router.navigate(['/login']);
  }
}
