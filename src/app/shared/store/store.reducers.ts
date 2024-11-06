import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './store.actions';
import { initialBoardState, boardAdaptor } from './store.entity';

export const boardReducer = createReducer(
  initialBoardState,
  on(BoardActions.fetchBoardsSuccess, (state, { boards }) => boardAdaptor.setAll(boards, state)),
  on(BoardActions.addBoard, (state, { board }) => boardAdaptor.addOne(board, state)),
  on(BoardActions.updateBoard, (state, { id, changes }) => boardAdaptor.updateOne({ id, changes }, state)),
  on(BoardActions.deleteBoard, (state, { id }) => boardAdaptor.removeOne(id, state)),
  on(BoardActions.selectBoard, (state, { board }) => ({
    ...state,
    selectedBoard: board
  })),
  on(BoardActions.clearSelectedBoard, state => ({
    ...state,
    selectedBoard: null
  })),
  
);

export const { selectAll, selectEntities } = boardAdaptor.getSelectors();

