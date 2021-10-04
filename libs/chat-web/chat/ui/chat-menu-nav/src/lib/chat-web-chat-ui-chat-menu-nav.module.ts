import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { nxcSearchIcon } from '@nx-mess/chat-web/shared/icons/search';
import { ChatMenuNavComponent } from './chat-menu-nav.component';

@NgModule({
  imports: [CommonModule, SvgIconsModule.forChild([nxcSearchIcon])],
  declarations: [ChatMenuNavComponent],
  exports: [ChatMenuNavComponent],
})
export class ChatWebChatUiChatMenuNavModule {}
