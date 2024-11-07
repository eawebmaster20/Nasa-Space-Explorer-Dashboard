import { createReducer, on } from '@ngrx/store';
import * as Actions from './store.actions';
import { initialRoversState, rovAdapter, RoversState } from './store.entity';

export const roversReducer = createReducer(
  initialRoversState,
  
  // Set fetched rovers to store on success
  on(Actions.fetchRovsSuccess, (state, { rovs }) => rovAdapter.setAll(rovs, state)),
  
  // Add an item to favorites
  on(Actions.addFavorite, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite],
  })),

  // Remove an item from favorites by filtering it out
  on(Actions.removeFavorite, (state, { id }) => ({
    ...state,
    favorites: state.favorites.filter(fav => fav.id !== id),
  }))
);

// Export entity selectors for convenience
export const { selectAll, selectEntities } = rovAdapter.getSelectors();
