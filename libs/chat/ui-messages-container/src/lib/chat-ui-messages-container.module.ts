import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatUiMessageModule } from '@nx-mess/chat/ui-message';
import { MessagesContainerComponent } from './messages-container.component';

@NgModule({
  imports: [CommonModule, ReactiveComponentModule, ChatUiMessageModule],
  declarations: [MessagesContainerComponent],
  exports: [MessagesContainerComponent],
})
export class ChatUiMessagesContainerModule {}
