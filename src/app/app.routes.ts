import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
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
];
