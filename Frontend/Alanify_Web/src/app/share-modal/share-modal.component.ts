import { Component, InjectionToken } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share-modal',
  imports: [],
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.scss'
})
export class ShareModalComponent {
  constructor(public dialogRef: MatDialogRef<ShareModalComponent>) {}

  compartirEn(plataforma: string): void {
    const url = window.location.href;
    const texto = '¡Mira este componente que encontré en AlaniFy!';

    let shareUrl = '';

    switch (plataforma) {
      case 'instagram':
        alert('Instagram no permite compartir enlaces directamente desde la web.');
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
      case 'copiarLink':
        this.copyLink(url);
        return;
      default:
        console.error('Plataforma no soportada');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  }

  copyLink(url: string): void {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Enlace copiado al portapapeles: ' + url);
      })
      .catch((err: Error) => {
        console.error('Error al copiar el enlace: ', err);
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}


