import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router


@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.scss',
  standalone: false // Opcional, por defecto es false
})
export class CrearCuentaComponent {
  constructor(private router: Router) {}

  navigateToTokenValidacion() {
    this.router.navigate(['/auth/token-validacion']);
  }

}
