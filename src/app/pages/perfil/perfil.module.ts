import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, Route} from '@angular/router';
import { NavController } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    NavController,
    ActivatedRoute
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
