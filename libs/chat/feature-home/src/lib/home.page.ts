import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '@nx-mess/shared/store';

@Component({
  selector: 'nxc-home',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Nx Mess</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Nx Mess</ion-title>
        </ion-toolbar>
      </ion-header>

      <div
        class="flex flex-col items-center justify-center gap-2 h-with-offset-top"
      >
        <ion-text>
          <h1>Welcome to Nx Messenger</h1>
        </ion-text>

        <ion-text>
          <strong>A chat application built with the MEAN stack</strong>
        </ion-text>

        <ion-button (click)="onLoginClick()" expand="block">Login</ion-button>
      </div>
    </ion-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  constructor(private store: Store) {}

  onLoginClick() {
    this.store.dispatch(AuthActions.login.trigger());
  }
}
