import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.check.trigger());
  }

  onLogin() {
    this.store.dispatch(AuthActions.login.trigger());
  }
}
