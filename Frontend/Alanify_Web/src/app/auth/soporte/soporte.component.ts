import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.scss',
  standalone: false // Opcional, por defecto es false
})
export class SoporteComponent {
  constructor(private router: Router) {}

  navigateToIniciarSesion() {
    this.router.navigate(['/auth/iniciar-sesion']);
  }

}
