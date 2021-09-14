import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '@nx-mess/shared/store';

@Component({
  selector: 'nxc-home',
  template: `
    <button
      class="px-4 py-2 rounded bg-primary text-white"
      type="button"
      (click)="onLogin()"
    >
      Login
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private store: Store) {}

  onLogin() {
    this.store.dispatch(AuthActions.login.trigger());
  }
}
