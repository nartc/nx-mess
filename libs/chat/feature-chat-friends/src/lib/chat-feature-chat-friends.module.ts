import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatFriendsPage } from './chat-friends.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatFriendsPage }]),
    IonicModule,
  ],
  declarations: [ChatFriendsPage],
})
export class ChatFeatureChatFriendsModule {}
