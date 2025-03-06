import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  standalone: false,
  
  templateUrl: './informacion.component.html',
  
})
export class InformacionComponent {
  constructor(private router: Router) {}

  

// Propiedad para controlar la pestaña activa
activeTab: string = 'informacion';

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
