import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home/:rut',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)

  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule)
  },
  {
    path: 'disponible',
    loadChildren: () => import('./pages/disponible/disponible.module').then( m => m.DisponiblePageModule)
  },
  {
    path: 'detalle',
    loadChildren: () => import('./pages/detalle/detalle.module').then( m => m.DetallePageModule)
  },
  {
    path: 'nuevoauto',
    loadChildren: () => import('./pages/nuevoauto/nuevoauto.module').then( m => m.NuevoautoPageModule)
  },
  {
    path: 'recorrido',
    loadChildren: () => import('./pages/recorrido/recorrido.module').then( m => m.RecorridoPageModule)
  },

  {
    path: 'administrar/:rut',
    loadChildren: () => import('./pages/administrar/administrar.module').then(m => m.AdministrarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil/:rut',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./pages/solicitud/solicitud.module').then(m => m.SolicitudPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'nuevoviaje',
    loadChildren: () => import('./pages/nuevoviaje/nuevoviaje.module').then(m => m.NuevoviajePageModule),
    canActivate: [AuthGuard]
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
