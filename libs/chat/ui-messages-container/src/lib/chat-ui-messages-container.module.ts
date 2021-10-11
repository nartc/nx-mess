import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { MessagesContainerComponent } from './messages-container.component';

@NgModule({
  imports: [CommonModule, ReactiveComponentModule],
  declarations: [MessagesContainerComponent],
  exports: [MessagesContainerComponent],
})
export class ChatUiMessagesContainerModule {}
