import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatFriendsPage } from './chat-friends.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatFriendsPage }]),
  ],
  declarations: [ChatFriendsPage],
})
export class ChatFeatureChatFriendsModule {}
