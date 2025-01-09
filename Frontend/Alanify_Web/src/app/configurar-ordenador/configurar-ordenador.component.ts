import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el router de Angular

@Component({
  selector: 'app-configurar-ordenador',
  standalone: false,
  
  templateUrl: './configurar-ordenador.component.html',
  styleUrl: './configurar-ordenador.component.scss'
})
export class ConfigurarOrdenadorComponent {
  components = [
    { id: 1, name: 'Socket', price: 150 },
    { id: 2, name: 'Procesador', price: 150 },
    { id: 3, name: 'Placa base', price: 100 },
    { id: 4, name: 'Memoria RAM', price: 70 },
    { id: 5, name: 'Tarjeta gráfica', price: 350 },
    { id: 6, name: 'Disco duro', price: 60 },
    { id: 7, name: 'Disco duro adicional', price: 40 },
    { id: 8, name: 'Refrigeración CPU', price: 30 },
    { id: 9, name: 'Fuente de alimentación', price: 60 }
  ];

   // Inyectamos el Router en el constructor
   constructor(private router: Router) {}

  // Función para manejar la edición del componente
  editComponent(componentId: number) {
    console.log(`Editar componente con ID: ${componentId}`);
    const component = this.components.find(c => c.id === componentId);
    if (component) {
      console.log(`Componente encontrado: ${component.name}`);
      // Aquí puedes agregar lógica para abrir un formulario de edición, o modificar el componente directamente
    } else {
      console.log('Componente no encontrado');
    }
  }
  

  // Calcular el precio total
  get totalPrice(): number {
    return this.components.reduce((sum, component) => sum + component.price, 0);
  }

    // Propiedad para controlar la visibilidad del menú de redes sociales
    showMenu: boolean = false;

    // Función para alternar la visibilidad del menú de redes sociales
    toggleMenu(): void {
      this.showMenu = !this.showMenu;
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


  // Propiedad para controlar el desplazamiento horizontal
  margenIzquierda = 0;

  // Función para mover la imagen y la lista de componentes hacia la izquierda
  moverIzquierda(): void {
    this.margenIzquierda -= 100; // Desplaza 100px hacia la izquierda
  }

  // Función para mover la imagen y la lista de componentes hacia la derecha
  moverDerecha(): void {
    this.margenIzquierda += 100; // Desplaza 100px hacia la derecha
  }

  // Añadir un botón para borrar el texto del input 
  inputText: string = ''; // Variable para almacenar el valor del input

  clearText(): void {
    this.inputText = ''; // Borra el texto
  }
  

}
