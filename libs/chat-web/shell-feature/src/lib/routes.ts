import { Routes } from '@angular/router';

export const chatWebRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@nx-mess/chat-web/home/feature').then(
        (m) => m.ChatWebHomeFeatureModule
      ),
  },
];
