import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa esto para Angular Material
import { MatToolbarModule } from '@angular/material/toolbar'; // Ejemplo de módulo de Angular Material, barra de herramientas
import { MatButtonModule } from '@angular/material/button'; // Otro ejemplo de módulo de boton
import { MatCardModule } from '@angular/material/card'; // Módulo para tarjetas

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  // Añadir este import para usar formularios en Angular
import { AuthModule } from './auth/auth.module'; // Importar el módulo de autenticación

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Necesario para las animaciones de Angular Material
    AppRoutingModule,
    MatToolbarModule, // Importa módulos de Angular Material aquí
    MatButtonModule,
    MatCardModule,
    FormsModule,
    AuthModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
