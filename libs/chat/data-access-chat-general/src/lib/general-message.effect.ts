import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GeneralMessageActions } from '@nx-mess/chat/data-access-chat-general';
import { MessagesApiService } from '@nx-mess/shared/data-access-api';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class GeneralMessageEffect {
  constructor(
    private actions$: Actions,
    private messagesApiService: MessagesApiService
  ) {}

  readonly getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GeneralMessageActions.load.trigger),
      switchMap(() =>
        this.messagesApiService.getAll().pipe(
          map((messages) =>
            GeneralMessageActions.load.success({
              entities: messages.map((message) => ({
                ...message,
                isSuccess: true,
              })),
            })
          ),
          catchError(() =>
            of(GeneralMessageActions.load.success({ entities: [] }))
          )
        )
      )
    )
  );
}
