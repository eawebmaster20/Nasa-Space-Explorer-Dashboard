import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { ApiService } from '../services/api/api.service';
import { v4 as uuidv4 } from 'uuid';
import * as MyActions from './store.actions';
import { Store } from '@ngrx/store';
import { IFavorite } from '../models/store.interface';
import { selectSelectedBoard } from './store.selectors';
@Injectable()
export class BoardEffects {

  constructor(
    private actions: Actions,
    private storeService: ApiService,
    private store: Store
  ) {}


  updateLocalStorage$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(MyActions.updateBoard), 
        withLatestFrom(this.store.select(selectSelectedBoard)),
        tap(([action, selectedBoard]) => {
          if (selectedBoard) {
            // console.log('localstorage updated', selectedBoard);
            localStorage.setItem('selectedBoard', JSON.stringify(selectedBoard));
          }
        })
      ),
    { dispatch: false }
  );
}
