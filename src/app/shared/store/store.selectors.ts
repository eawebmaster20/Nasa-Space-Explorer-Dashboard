import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoversState, rovAdapter } from './store.entity';

// Select the main rover state
export const selectRoversState = createFeatureSelector<RoversState>('rovers');

// Selector for all rovers
// export const selectAllRovers = createSelector(
//   selectRoversState,
//   rovAdapter.getSelectors().selectAll
// );
export const {
  selectIds: selectRoverIds,
  selectEntities: selectRoverEntities,
  selectAll: selectAllRovers,
  selectTotal: selectRoverTotal,
} = rovAdapter.getSelectors(selectRoversState);

// Selector for all favorites
export const selectAllFavorites = createSelector(
  selectRoversState,
  (state) => state.favorites
);

// Selector to check if a specific rover is in favorites
export const selectIsFavorite = (id: number) => createSelector(
  selectRoversState,
  (state) => state.favorites.some(favorite => favorite.id === id)
);
