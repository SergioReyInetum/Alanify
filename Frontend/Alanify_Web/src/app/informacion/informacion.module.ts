import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionRoutingModule } from './informacion-routing.module';
import { InformacionComponent } from './informacion.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InformacionComponent
  ],
  imports: [
    CommonModule,
    InformacionRoutingModule,
    SharedModule
  ]
})
export class InformacionModule { }
