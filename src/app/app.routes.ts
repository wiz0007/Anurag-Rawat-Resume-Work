import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Anurag Rawat | HR Coordinator',
    loadComponent: () => import('./pages/home/home').then((module) => module.Home)
  },
  { path: '**', redirectTo: '' }
];
