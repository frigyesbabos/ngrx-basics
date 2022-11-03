import { HttpClient } from '@angular/common/http';
import { createInjectableType } from '@angular/compiler';
import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../model/books.model';
import { booksReducer } from '../state/books.reducer';

@Injectable({ providedIn: 'root' })
export class GoogleBookService {

  constructor(private http: HttpClient) {}

    getBooks(): Observable<Array<Book>> {
      return this.http.get<{items: Book[]}>(
        'https://www.googleapis.com/books/v1/volumes?maxResults=5&orderBy=relevance&q=oliver%20sacks'
      )
      .pipe(map((books) => books.items || []))
    }
}

