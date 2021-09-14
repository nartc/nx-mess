import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const chatWebRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@nx-mess/chat-web/home/feature').then(
        (m) => m.ChatWebHomeFeatureModule
      ),
  },
  {
    path: 'chat',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('@nx-mess/chat-web/chat/feature').then(
        (m) => m.ChatWebChatFeatureModule
      ),
  },
];
