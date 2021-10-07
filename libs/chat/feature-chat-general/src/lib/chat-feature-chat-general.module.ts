import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatDataAccessChatGeneralModule } from '@nx-mess/chat/data-access-chat-general';
import { ChatGeneralPage } from './chat-general.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatGeneralPage }]),
    ReactiveComponentModule,
    ChatDataAccessChatGeneralModule,
  ],
  declarations: [ChatGeneralPage],
})
export class ChatFeatureChatGeneralModule {}
