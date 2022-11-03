import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Book } from './model/books.model';

import { selectBookCollection, selectBooks } from './state/books.selectors';
import {
  retrievedBookList,
  addBook,
  removeBook,
} from 'src/app/state/books.actions';

import { GoogleBookService } from './book-list/books.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private bookService: GoogleBookService, private store: Store) {}

  books$ = this.store.select(selectBooks);

  bookCollection$ = this.store.select(selectBookCollection).pipe(
    map((books: Array<Book | undefined>) => {
      return books.filter((book) => book) as Array<Book>;
    }),
    tap((books: Array<Book>) => {
      console.log('non undefined books');

    })
  )

  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }


  ngOnInit() {
    this.bookService
      .getBooks()
      .subscribe((books) => this.store.dispatch(retrievedBookList({ books })));
  }
}
