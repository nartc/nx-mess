import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatWebChatUiChatMenuModule } from '@nx-mess/chat-web/chat/ui/chat-menu';
import { ChatWebChatUiChatMenuNavModule } from '@nx-mess/chat-web/chat/ui/chat-menu-nav';
import { ChatWebChatUiChatNavModule } from '@nx-mess/chat-web/chat/ui/chat-nav';
import { ChatShellComponent } from './chat-shell.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChatShellComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@nx-mess/chat-web/chat/chat-feature').then(
                (m) => m.ChatWebChatChatFeatureModule
              ),
          },
        ],
      },
    ]),
    ReactiveComponentModule,
    ChatWebChatUiChatMenuModule,
    ChatWebChatUiChatNavModule,
    ChatWebChatUiChatMenuNavModule,
  ],
  declarations: [ChatShellComponent],
})
export class ChatWebChatChatShellFeatureModule {}
