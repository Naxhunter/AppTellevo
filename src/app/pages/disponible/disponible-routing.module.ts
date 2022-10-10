import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisponiblePage } from './disponible.page';

const routes: Routes = [
  {
    path: '',
    component: DisponiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisponiblePageRoutingModule {}
