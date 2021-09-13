import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
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

  readonly check$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.check.trigger),
      switchMap(() =>
        this.auth.user$.pipe(
          map((userOrNull) => AuthActions.check.success({ user: userOrNull }))
        )
      )
    )
  );
}
