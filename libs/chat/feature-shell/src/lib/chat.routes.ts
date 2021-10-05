import { Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';

export const chatRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('@nx-mess/chat/feature-home').then((m) => m.ChatFeatureHomeModule),
  },
  {
    path: 'chat',
    canActivateChild: [AuthGuard],
    loadChildren: () =>
      import('@nx-mess/chat/feature-chat-shell').then(
        (m) => m.ChatFeatureChatGeneralShellModule
      ),
  },
];
