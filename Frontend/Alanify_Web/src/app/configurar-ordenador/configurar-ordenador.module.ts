import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Usa CommonModule en lugar de BrowserModule

import { ConfigurarOrdenadorRoutingModule } from './configurar-ordenador-routing.module';
import { ConfigurarOrdenadorComponent } from './configurar-ordenador.component';
import { FormsModule } from '@angular/forms';  // Mantiene FormsModule para ngModel
import { MatDialogModule } from '@angular/material/dialog'; // Mantiene MatDialogModule
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConfigurarOrdenadorComponent
  ],
  imports: [
    CommonModule, // Reemplaza BrowserModule y BrowserAnimationsModule con CommonModule
    ConfigurarOrdenadorRoutingModule,
    FormsModule,
    MatDialogModule, // Mantiene el módulo de Angular Material para el diálogo
    SharedModule
  ]
})
export class ConfigurarOrdenadorModule { }