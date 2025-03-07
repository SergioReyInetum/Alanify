import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: false,
})
export class NavComponent {
  activeTab: string = 'configurar';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      if (url.includes('informacion')) {
        this.activeTab = 'informacion';
      } else if (url.includes('configurar-ordenador')) {
        this.activeTab = 'configurar';
      } else if (url.includes('perfil-usuario') || url.includes('auth')) {
        this.activeTab = 'perfil';
      }
    });
  }

  navigate(tab: string) {
    this.activeTab = tab;
    if (tab === 'informacion') {
      this.router.navigate(['/informacion']);
    } else if (tab === 'configurar') {
      this.router.navigate(['/configurar-ordenador']);
    } else if (tab === 'perfil') {
      this.router.navigate(['/auth']);
    }
  }
}