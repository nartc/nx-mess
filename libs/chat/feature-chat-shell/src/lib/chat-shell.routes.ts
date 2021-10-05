import { Routes } from '@angular/router';
import { ChatShellPage } from './chat-shell.page';

export const chatShellRoutes: Routes = [
  {
    path: '',
    component: ChatShellPage,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
      {
        path: 'general',
        loadChildren: () =>
          import('@nx-mess/chat/feature-chat-general').then(
            (m) => m.ChatFeatureChatGeneralModule
          ),
      },
      {
        path: 'friends',
        loadChildren: () =>
          import('@nx-mess/chat/feature-chat-friends').then(
            (m) => m.ChatFeatureChatFriendsModule
          ),
      },
      {
        path: 'me',
        loadChildren: () =>
          import('@nx-mess/chat/feature-chat-me').then(
            (m) => m.ChatFeatureChatMeModule
          ),
      },
    ],
  },
];
