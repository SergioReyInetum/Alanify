import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Para formularios básicos

import { AuthComponent } from './auth.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { SoporteComponent } from './soporte/soporte.component';
import { TokenValidacionComponent } from './token-validacion/token-validacion.component';

import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    AuthComponent,
    CrearCuentaComponent,
    IniciarSesionComponent,
    SoporteComponent,
    TokenValidacionComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    RouterModule // Importamos RouterModule para las rutas
  ]
})
export class AuthModule { }
