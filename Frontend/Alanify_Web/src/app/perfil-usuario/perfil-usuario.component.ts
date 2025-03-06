import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  standalone: false,
  
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent {

  constructor(private router: Router) {}

  // Propiedad para controlar la pestaña activa
activeTab: string = 'perfil';

  // Función para manejar la navegación
navigate(tab: string) {
  this.activeTab = tab;
  switch (tab) {
    case 'informacion':
      this.router.navigate(['/informacion']);
      break;
    case 'configurar':
      this.router.navigate(['/configurar-ordenador']);
      break;
    case 'perfil':
      this.router.navigate(['/perfil-usuario']);
      break;
    default:
      console.log('Ruta no manejada:', tab);
  }
}

}
