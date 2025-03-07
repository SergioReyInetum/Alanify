import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    RouterModule // Para que NavComponent pueda usar Router
  ],
  exports: [NavComponent] // Exportar NavComponent para otros módulos
})
export class SharedModule { }