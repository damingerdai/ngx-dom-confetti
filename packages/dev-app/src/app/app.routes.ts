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
        path: 'guide',
        loadChildren: () => import('./routes/guide/guide.routes').then(m => m.routes)
      }
    ]
  }
];

