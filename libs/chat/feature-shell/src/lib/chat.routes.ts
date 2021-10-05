import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@nx-mess/chat/feature-home').then((m) => m.ChatFeatureHomeModule),
  },
];
