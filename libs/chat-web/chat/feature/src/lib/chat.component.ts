import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '@nx-mess/shared/store';

@Component({
  selector: 'nxc-chat',
  template: `
    <pre>{{ user$ | async | json }}</pre>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {
  readonly user$ = this.store.select(AuthSelectors.selectUser);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
