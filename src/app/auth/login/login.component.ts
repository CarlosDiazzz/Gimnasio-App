import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = false;
  token: string | null = null; // <-- Agrega esta variable

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.token = res.token; // <-- Guarda el token para mostrarlo
        this.error = false;
        // this.router.navigate(['/dashboard']); // Puedes comentar esto mientras pruebas
      },
      error: () => {
        this.error = true;
        this.token = null;
      }
    });
  }
}
