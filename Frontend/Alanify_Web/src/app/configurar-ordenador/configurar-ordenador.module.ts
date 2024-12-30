import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurarOrdenadorRoutingModule } from './configurar-ordenador-routing.module';
import { ConfigurarOrdenadorComponent } from './configurar-ordenador.component';


@NgModule({
  declarations: [
    ConfigurarOrdenadorComponent
  ],
  imports: [
    CommonModule,
    ConfigurarOrdenadorRoutingModule
  ]
})
export class ConfigurarOrdenadorModule { }
