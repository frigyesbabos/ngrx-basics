import { createReducer, on } from '@ngrx/store';
import { addBook, removeBook } from './books.actions';

export const InitialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  InitialState,
  on(removeBook, (state, { bookId }) => state.filter((id) => id !== bookId)),
  on(addBook, (state, { bookId }) => {
    if (state.indexOf(bookId) > -1) return state;

    return [...state, bookId];
  })
);
