import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '@nx-mess/shared/store';

@Component({
  selector: 'nxc-home',
  template: `
    <h1>Welcome to Nx Messenger</h1>
    <h3>A chat application built with the MEAN stack</h3>
    <button
      class="px-4 py-2 bg-primary text-white text-2xl"
      type="button"
      (click)="onLogin()"
    >
      Login
    </button>
  `,
  styles: [
    // language=scss
    `
      :host {
        @apply flex flex-col;
        @apply justify-center;
        @apply items-center;
        @apply gap-8;
        @apply p-16;
        @apply w-screen h-screen;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private store: Store) {}

  onLogin() {
    this.store.dispatch(AuthActions.login.trigger());
  }
}
