import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'configurar-ordenador', loadChildren: () => import('./configurar-ordenador/configurar-ordenador.module').then(m => m.ConfigurarOrdenadorModule) },
  { path: 'informacion', loadChildren: () => import('./informacion/informacion.module').then(m => m.InformacionModule) },
  { path: 'perfil-usuario', loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(m => m.PerfilUsuarioModule) },
  { path: '', redirectTo: '/configurar-ordenador', pathMatch: 'full' },  // Redirige a configurar-ordenador al cargar la app
  { path: '**', redirectTo: '/configurar-ordenador' }  // Redirige rutas no definidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export { routes };  // Exporta las rutas

