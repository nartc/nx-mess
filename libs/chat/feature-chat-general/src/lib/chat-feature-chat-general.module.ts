import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatDataAccessChatGeneralModule } from '@nx-mess/chat/data-access-chat-general';
import { ChatUiChatInputModule } from '@nx-mess/chat/ui-chat-input';
import { ChatUiMessagesContainerModule } from '@nx-mess/chat/ui-messages-container';
import { ChatGeneralPage } from './chat-general.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatGeneralPage }]),
    ReactiveComponentModule,
    ChatDataAccessChatGeneralModule,
    IonicModule,
    ReactiveFormsModule,
    ChatUiChatInputModule,
    ChatUiMessagesContainerModule,
  ],
  declarations: [ChatGeneralPage],
})
export class ChatFeatureChatGeneralModule {}
