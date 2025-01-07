import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurarOrdenadorRoutingModule } from './configurar-ordenador-routing.module';
import { ConfigurarOrdenadorComponent } from './configurar-ordenador.component';
import { FormsModule } from '@angular/forms';  // Añadir este import para usar formularios en Angular


@NgModule({
  declarations: [
    ConfigurarOrdenadorComponent
  ],
  imports: [
    CommonModule,
    ConfigurarOrdenadorRoutingModule,
    FormsModule
  ]
})
export class ConfigurarOrdenadorModule { }
