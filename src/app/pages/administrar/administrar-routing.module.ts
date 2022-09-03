import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrarPage } from './administrar.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrarPageRoutingModule {}
