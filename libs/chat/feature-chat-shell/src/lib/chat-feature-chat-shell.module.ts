import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChatShellPage } from './chat-shell.page';
import { chatShellRoutes } from './chat-shell.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(chatShellRoutes), IonicModule],
  declarations: [ChatShellPage],
})
export class ChatFeatureChatGeneralShellModule {}
