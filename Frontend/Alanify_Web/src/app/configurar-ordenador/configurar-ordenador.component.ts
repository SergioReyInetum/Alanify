import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router'; // Importa el router de Angular
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { ShareModalComponent } from '../share-modal/share-modal.component'; // Importa el componente del modal
import { trigger, state, style, animate, transition } from '@angular/animations'; // Importa animaciones

@Component({
  selector: 'app-configurar-ordenador',
  standalone: false,
  
  templateUrl: './configurar-ordenador.component.html',
  styleUrl: './configurar-ordenador.component.scss',
  animations: [
    trigger('slideAnimation', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('left', style({ transform: 'translateX(-100%)' })),
      state('right', style({ transform: 'translateX(0)' })),
      transition('* => right', animate('500ms ease-in-out')),
      transition('* => left', animate('500ms ease-in-out')),
    ])
  ]
})
export class ConfigurarOrdenadorComponent {
  // Tres opciones de ordenadores simuladas (puedes reemplazarlas con datos de la IA más tarde)
  computerOptions = [
    {
      id: 1,
      image: 'assets/images/caja1.png', // Primera imagen de ordenador
      components: [
        { id: 1, name: 'Socket', price: 150 },
        { id: 2, name: 'Procesador', price: 200 },
        { id: 3, name: 'Placa base', price: 120 },
        { id: 4, name: 'Memoria RAM', price: 80 },
        { id: 5, name: 'Tarjeta gráfica', price: 400 },
        { id: 6, name: 'Disco duro', price: 70 },
        { id: 7, name: 'Disco duro adicional', price: 50 },
        { id: 8, name: 'Refrigeración CPU', price: 35 },
        { id: 9, name: 'Fuente de alimentación', price: 70 }
      ]
    },
    {
      id: 2,
      image: 'assets/images/caja2.png', // Segunda imagen de ordenador (la actual en tu HTML)
      components: [
        { id: 1, name: 'Socket', price: 150 },
        { id: 2, name: 'Procesador', price: 150 },
        { id: 3, name: 'Placa base', price: 100 },
        { id: 4, name: 'Memoria RAM', price: 70 },
        { id: 5, name: 'Tarjeta gráfica', price: 350 },
        { id: 6, name: 'Disco duro', price: 60 },
        { id: 7, name: 'Disco duro adicional', price: 40 },
        { id: 8, name: 'Refrigeración CPU', price: 30 },
        { id: 9, name: 'Fuente de alimentación', price: 60 }
      ]
    },
    {
      id: 3,
      image: 'assets/images/caja3.png', // Tercera imagen de ordenador (debes agregar esta imagen a assets)
      components: [
        { id: 1, name: 'Socket', price: 160 },
        { id: 2, name: 'Procesador', price: 180 },
        { id: 3, name: 'Placa base', price: 110 },
        { id: 4, name: 'Memoria RAM', price: 90 },
        { id: 5, name: 'Tarjeta gráfica', price: 450 },
        { id: 6, name: 'Disco duro', price: 80 },
        { id: 7, name: 'Disco duro adicional', price: 60 },
        { id: 8, name: 'Refrigeración CPU', price: 40 },
        { id: 9, name: 'Fuente de alimentación', price: 80 }
      ]
    }
  ];

  currentOptionIndex: number = 1; // Inicia con la segunda opción (índice 1, ya que el array es 0-based)

  @HostBinding('@slideAnimation') get slideState() {
    return this.currentOptionIndex === 1 ? 'right' : this.currentOptionIndex === 0 ? 'left' : 'right';
  }

   // Inyectamos el Router en el constructor
   constructor(private router: Router, public dialog: MatDialog) {}



  get currentOption() {
    return this.computerOptions[this.currentOptionIndex];
  }

  get totalPrice(): number {
    return this.currentOption.components.reduce((sum, component) => sum + component.price, 0);
  }

  editComponent(componentId: number) {
    console.log(`Editar componente con ID: ${componentId}`);
    const component = this.currentOption.components.find(c => c.id === componentId);
    if (component) {
      console.log(`Componente encontrado: ${component.name}`);
    } else {
      console.log('Componente no encontrado');
    }
  }

  // Navegar a la opción anterior (cíclicamente)
  moverIzquierda(): void {
    this.currentOptionIndex = (this.currentOptionIndex - 1 + this.computerOptions.length) % this.computerOptions.length;
  }

  // Navegar a la opción siguiente (cíclicamente)
  moverDerecha(): void {
    this.currentOptionIndex = (this.currentOptionIndex + 1) % this.computerOptions.length;
  }

    // Propiedad para controlar la visibilidad del menú de redes sociales
    showMenu: boolean = false;

    // Función para alternar la visibilidad del menú de redes sociales
    toggleMenu(): void {
      // esta funcion ya no es necesaria, se puede eliminar
    }

  compartirEn(plataforma: string): void {
    const url = window.location.href; // URL actual de la página
    const texto = '¡Mira este componente que encontré en AlaniFy!'; // Texto que acompaña el enlace
  
    let shareUrl = ''; // Inicializamos la URL de la plataforma
  
    switch (plataforma) {
      case 'instagram':
        alert('Instagram no permite compartir enlaces directamente desde la web.'); // Aviso para Instagram
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(texto)}%20${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'copiarLink':  // Cambié de 'copiar' a 'copiarLink' aquí
        this.copyLink(url); // Llamamos a la función para copiar el enlace
        return; // Terminamos aquí porque no necesitamos abrir una nueva ventana
      default:
        console.error('Plataforma no soportada');
        return;
    }


    // Si hay una URL válida, abrirla en una nueva pestaña 
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  
    // Ocultar el menú  de redes sociales después de compartir
    this.showMenu = false;
  }
  // Nueva función para abrir el modal de compartir
  openShareModal(): void {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      width: '400px', // Ancho del modal
      height: 'auto', // Altura automática
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }

  // Función para copiar el enlace al portapapeles
  copyLink(url: string): void {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Enlace copiado al portapapeles: ' + url);
      })
      .catch((err: Error) => { // Añadir tipo de error explícito
        console.error('Error al copiar el enlace: ', err);
      });
  }

  // Propiedad para controlar la pestaña activa
  activeTab: string = 'configurar'; // Define la pestaña activa inicial
    // Función para manejar la navegación
  navigate(tab: string) {
    // Navegamos a la ruta correspondiente usando el Router
    if (tab === 'informacion') {
      this.router.navigate(['/informacion']);
    } else if (tab === 'perfil') {
      this.router.navigate(['/perfil-usuario']);
    } else {
      // Manejo de la ruta por defecto o cualquier otra lógica que desees implementar
      console.log('Ruta no manejada:', tab);
    }
  }


  // Añadir un botón para borrar el texto del input 
  inputText: string = ''; // Variable para almacenar el valor del input

  clearText(): void {
    this.inputText = ''; // Borra el texto
  }
  

}
