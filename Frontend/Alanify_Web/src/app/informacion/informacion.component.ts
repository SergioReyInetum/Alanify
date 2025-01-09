import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informacion',
  standalone: false,
  
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.scss'
})
export class InformacionComponent {
  constructor(private router: Router) {}

  

   // Propiedad para controlar la pestaña activa
   activeTab: string = 'configurar'; // Define la pestaña activa inicial
   // Función para manejar la navegación
 navigate(tab: string) {
   this.activeTab = tab;
    // Navegamos a la ruta correspondiente usando el Router
    if (tab === 'configurar') {
      this.router.navigate(['/configurar-ordenador']);
    } else {
      // Manejo de otras posibles rutas o lógica adicional
      console.log('Ruta no manejada:', tab);
    }
  }

  // Añadir un botón para borrar el texto del input 
  inputText: string = ''; // Variable para almacenar el valor del input

  clearText(): void {
    this.inputText = ''; // Borra el texto
  }

}
