import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { ChatWebShellFeatureModule } from '@nx-mess/chat-web/shell-feature';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SvgIconsModule.forRoot(),
    ChatWebShellFeatureModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
