import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IRov } from '../models/rov.interface';
import { IFavorite } from '../models/store.interface';

export interface RoversState extends EntityState<IRov> {
  favorites: IRov[]; 
}

export const rovAdapter: EntityAdapter<IRov> = createEntityAdapter<IRov>({
  selectId: (rov: IRov) => rov.id,
  // sortComparer: (a, b) => a.rover.name.localeCompare(b.rover.name),
});

export const initialRoversState: RoversState = rovAdapter.getInitialState({
  ids: [], 
  entities: {}, 
  favorites: [],
});
