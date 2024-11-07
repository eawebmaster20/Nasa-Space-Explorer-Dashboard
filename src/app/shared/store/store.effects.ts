// effects.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as Action from './store.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class RoverEffects {
  constructor(private actions$: Actions) {} 
  
  fetchRovs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Action.fetchRovs),
      switchMap(() =>
        of(Action.fetchRovsSuccess({rovs:[]})
        )
      )
    )
  );
}
