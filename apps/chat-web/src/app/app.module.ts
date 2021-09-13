import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatWebShellFeatureModule } from '@nx-mess/chat-web/shell-feature';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, ChatWebShellFeatureModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
