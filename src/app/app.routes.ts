import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login-home',
    pathMatch: 'full',
  },
  {
    path: 'login-home',
    loadComponent: () => import('./login-home/login-home.page').then( m => m.LoginHomePage)
  },
  {
    path: 'login-cadastro',
    loadComponent: () => import('./login-cadastro/login-cadastro.page').then( m => m.LoginCadastroPage)
  },
  {
    path: 'login-recovery',
    loadComponent: () => import('./login-recovery/login-recovery.page').then( m => m.LoginRecoveryPage)
  },
  {
    path: 'home-list-os',
    loadComponent: () => import('./home-list-os/home-list-os.page').then( m => m.HomeListOsPage)
  },
  {
    path: 'home-list-map',
    loadComponent: () => import('./home-list-map/home-list-map.page').then( m => m.HomeListMapPage)
  },
  {
    path: 'os-chamado-home',
    loadComponent: () => import('./os-chamado-home/os-chamado-home.page').then( m => m.OsChamadoHomePage)
  },
  {
    path: 'home-config',
    loadComponent: () => import('./home-config/home-config.page').then( m => m.HomeConfigPage)
  },
];
