import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () => import('./routes/home/home.routes').then(m => m.routes)
      },
      {
        path: 'api-reference',
        title: 'API Reference · ngx-dom-confetti',
        loadComponent: () => import('./routes/api-reference/api-reference.component').then(m => m.ApiReferenceComponent)
      },
      {
        path: 'guide',
        loadChildren: () => import('./routes/guide/guide.routes').then(m => m.routes)
      }
    ]
  }
];

