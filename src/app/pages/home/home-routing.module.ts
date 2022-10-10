import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'administrar/:rut',
        loadChildren: () => import('../administrar/administrar.module').then(m => m.AdministrarPageModule)
      },
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'solicitud/:rut',
        loadChildren: () => import('../solicitud/solicitud.module').then(m => m.SolicitudPageModule)
      },
      {
        path: 'nuevoviaje/:rut',
        loadChildren: () => import('../nuevoviaje/nuevoviaje.module').then(m => m.NuevoviajePageModule)
      },

      {
        path: 'disponible/:rut',
        loadChildren: () => import('../disponible/disponible.module').then(m => m.DisponiblePageModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
