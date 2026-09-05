import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'Job Seeker';
  message = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.message = '';
    this.error = '';

    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill all required fields';
      return;
    }

    this.authService.register(
      this.name,
      this.email,
      this.password,
      this.role
    ).subscribe({
      next: (response) => {
        this.message = response.message || 'Registration successful!';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.error =
          error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}