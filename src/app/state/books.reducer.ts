import { createReducer, on } from '@ngrx/store';

import { retrievedBookList } from './books.actions';
import { Book } from '../model/books.model';

export const InitialState: ReadonlyArray<Book> = [];

export const booksReducer = createReducer(
  InitialState,
  on(retrievedBookList, (state, { books }) => books)
);
