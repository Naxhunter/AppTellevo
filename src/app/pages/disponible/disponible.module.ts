import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisponiblePageRoutingModule } from './disponible-routing.module';

import { DisponiblePage } from './disponible.page';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisponiblePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [DisponiblePage]
})
export class DisponiblePageModule {}
