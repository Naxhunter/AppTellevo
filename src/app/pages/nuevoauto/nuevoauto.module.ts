import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoautoPageRoutingModule } from './nuevoauto-routing.module';

import { NuevoautoPage } from './nuevoauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoautoPageRoutingModule
  ],
  declarations: [NuevoautoPage]
})
export class NuevoautoPageModule {}
