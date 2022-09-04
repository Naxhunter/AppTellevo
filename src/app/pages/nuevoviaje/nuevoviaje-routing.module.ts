import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoviajePage } from './nuevoviaje.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoviajePageRoutingModule {}
