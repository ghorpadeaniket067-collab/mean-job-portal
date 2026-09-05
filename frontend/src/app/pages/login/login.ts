import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';

  message = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.message = '';
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        this.message = 'Login successful!';

        setTimeout(() => {
          if (response.user.role === 'Recruiter') {
            this.router.navigate(['/recruiter-dashboard']);
          } else {
            this.router.navigate(['/jobs']);
          }
        }, 800);
      },

      error: (error) => {
        this.error =
          error.error?.message || 'Login failed';
      }
    });
  }
}