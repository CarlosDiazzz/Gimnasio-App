import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registro = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    telefono: ''
  };
  error = false;
  token: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.registro).subscribe({
      next: (res) => {
        this.token = res.token;
        this.error = false;
        this.authService.setToken(res.token);
        // this.router.navigate(['/dashboard']); // Redirige si quieres
      },
      error: () => {
        this.error = true;
        this.token = null;
      }
    });
  }
}