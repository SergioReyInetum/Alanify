import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { CrearCuentaComponent } from './crear-cuenta/crear-cuenta.component';
import { TokenValidacionComponent } from './token-validacion/token-validacion.component';
import { SoporteComponent } from './soporte/soporte.component';

const routes: Routes = [
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'crear-cuenta', component: CrearCuentaComponent },
  { path: 'token-validacion', component: TokenValidacionComponent },
  { path: 'soporte', component: SoporteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

