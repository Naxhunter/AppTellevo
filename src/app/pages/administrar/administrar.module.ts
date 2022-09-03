import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';

import { AdministrarPageRoutingModule } from './administrar-routing.module';

import { AdministrarPage } from './administrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarPageRoutingModule,
    NavController
  ],
  declarations: [AdministrarPage]
})
export class AdministrarPageModule {}
