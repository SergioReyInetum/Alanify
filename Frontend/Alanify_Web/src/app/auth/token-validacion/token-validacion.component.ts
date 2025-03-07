import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router


@Component({
  selector: 'app-token-validacion',
  templateUrl: './token-validacion.component.html',
  styleUrl: './token-validacion.component.scss',
  standalone: false // Opcional, por defecto es false
})
export class TokenValidacionComponent {
  token: string = '';

  constructor(private router: Router) {}

  onValidate() {
    // Aquí iría la lógica de validación del token
    console.log('Token enviado:', this.token);
    // Simulamos una validación exitosa y redirigimos a /perfil-usuario
    this.router.navigate(['/perfil-usuario']);
  }

}
