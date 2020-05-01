import { Book } from './book.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = environment.baseUrl + 'book';

  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<Book[]>(this.baseUrl);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addBook(book: Book) {
    return this.http.post(`${this.baseUrl}`, {
      name: book.name,
      author: book.author,
      publicationDate: `${book.publicationDate.getFullYear()}-${
        book.publicationDate.getMonth() + 1 < 10
          ? '0' + (book.publicationDate.getMonth() + 1)
          : book.publicationDate.getMonth() + 1
      }-${book.publicationDate.getDate()}`,
      category: book.category,
      user: book.owner
    });
  }

  updateBook(id: number, book: Book) {
    return this.http.put(`${this.baseUrl}/${id}`, {
      name: book.name,
      author: book.author,
      publicationDate: `${book.publicationDate.getFullYear()}-${
        book.publicationDate.getMonth() + 1 < 10
          ? '0' + (book.publicationDate.getMonth() + 1)
          : book.publicationDate.getMonth() + 1
      }-${book.publicationDate.getDate()}`,
      category: book.category,
      user: book.owner
    });
  }
}
