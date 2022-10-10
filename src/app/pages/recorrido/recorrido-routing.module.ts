import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecorridoPage } from './recorrido.page';

const routes: Routes = [
  {
    path: '',
    component: RecorridoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecorridoPageRoutingModule {}
