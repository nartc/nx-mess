import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { AuthActions } from './auth.slice';

@Injectable()
export class AuthEffect {
  constructor(private actions$: Actions, private auth: AuthService) {}

  readonly login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login.trigger),
        tap(() => {
          this.auth.loginWithRedirect();
        })
      ),
    { dispatch: false }
  );

  readonly loginSuccess$ = createEffect(() =>
    this.actions$.pipe(ofType(AuthActions.login.success))
  );
}
