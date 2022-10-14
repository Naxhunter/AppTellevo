import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisponiblePage } from './disponible.page';

const routes: Routes = [
  {
    path: '',
    component: DisponiblePage,
   /* children: [
      {
        path: 'detalle',
        loadChildren: () => import('../detalle/detalle.module').then( m => m.DetallePageModule)
      },
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisponiblePageRoutingModule {}
