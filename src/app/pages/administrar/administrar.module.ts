import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrarPageRoutingModule } from './administrar-routing.module';

import { AdministrarPage } from './administrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdministrarPage]
})
export class AdministrarPageModule {}
