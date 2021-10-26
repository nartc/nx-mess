import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveComponentModule } from '@ngrx/component';
import { ChatMePage } from './chat-me.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ChatMePage }]),
    IonicModule,
    ReactiveComponentModule,
  ],
  declarations: [ChatMePage],
})
export class ChatFeatureChatMeModule {}
