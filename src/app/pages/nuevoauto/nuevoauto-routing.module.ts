import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoautoPage } from './nuevoauto.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoautoPageRoutingModule {}
