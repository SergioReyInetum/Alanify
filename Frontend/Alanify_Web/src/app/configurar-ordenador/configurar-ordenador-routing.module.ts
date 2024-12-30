import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurarOrdenadorComponent } from './configurar-ordenador.component';

const routes: Routes = [{ path: '', component: ConfigurarOrdenadorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurarOrdenadorRoutingModule { }
