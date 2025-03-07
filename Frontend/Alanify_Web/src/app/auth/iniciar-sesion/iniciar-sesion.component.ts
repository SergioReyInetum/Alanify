import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.scss',
  standalone: false // Opcional, por defecto es false
})
export class IniciarSesionComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  navigateToCrearCuenta() {
    this.router.navigate(['/auth/crear-cuenta']);
  }

  navigateToSoporte() {
    this.router.navigate(['/auth/soporte']);
  }

  onLogin() {
    // Aquí iría la lógica de autenticación real (por ejemplo, con un servicio)
    console.log('Iniciando sesión con:', this.username, this.password);
    // Simulamos un login exitoso y redirigimos a /perfil-usuario
    this.router.navigate(['/perfil-usuario']);
  }

  goBack() {
    this.router.navigate(['/configurar-ordenador']);
  }



}
