import { createAction, props } from '@ngrx/store';
import { IFavorite } from '../models/store.interface';
import { IRov } from '../models/rov.interface';

export const fetchRovs = createAction('[Rov/API] Fetch Rovers');
export const fetchRovsSuccess = createAction('[Rov/API] Fetch Rovers Success', props<{ rovs: IRov[] }>());
export const fetchRovsFailure = createAction('[Rov/API] Fetch Rovers Failure');

export const addFavorite = createAction('[Favorites] Add to Favorites', props<{ favorite: any }>());
export const removeFavorite = createAction('[Favorites] Remove from Favorites', props<{ id: number }>());
