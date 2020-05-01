import { BookCategory } from './book-category.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {
  private baseUrl = environment.baseUrl + 'category';

  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http.get<BookCategory[]>(this.baseUrl);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addCategory(category: BookCategory) {
    return this.http.post(`${this.baseUrl}`, {
      name: category.name,
      description: category.description
    });
  }

  updateCategory(id: number, category: BookCategory) {
    return this.http.put(`${this.baseUrl}/${id}`, {
      name: category.name,
      description: category.description
    });
  }
}
