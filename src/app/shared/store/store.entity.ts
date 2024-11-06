
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IFavorite } from '../models/store.interface';

export interface State extends EntityState<IFavorite> {
    favorites: IFavorite | null;
}

export const boardAdaptor: EntityAdapter<IFavorite> = createEntityAdapter<IFavorite>(
    {
    selectId: (board: IFavorite) => board.id,
    sortComparer: (a: IFavorite, b: IFavorite) => a.name.localeCompare(b.name),
}
);

export const initialBoardState: State = boardAdaptor.getInitialState({
    favorites: null,
});