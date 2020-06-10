import { BookExchange } from '../models/book-exchange.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExchangeSelect } from '../../book-exchange/exchange-select.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private baseUrl = environment.baseUrl + 'exchange';

  constructor(private http: HttpClient) {}

  getAllExchanges() {
    return this.http.get<BookExchange[]>(this.baseUrl);
  }

  getExchangeByUser(id: number) {
    return this.http.get<BookExchange[]>(`${this.baseUrl}/${id}`);
  }

  getValidExchanges(categoryId: number, userId: number) {
    return this.http.post<ExchangeSelect[]>(`${this.baseUrl}/valid/`, {
      categoryId,
      userId
    });
  }

  deleteExchange(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addExchange(exchange: BookExchange) {
    return this.http.post(`${this.baseUrl}`, {
      toUser: exchange.toUser,
      fromUser: exchange.fromUser,
      toBook: exchange.toBook,
      fromBook: exchange.fromBook,
      exchangeDate: `${exchange.exchangeDate.getFullYear()}-${
        exchange.exchangeDate.getMonth() + 1 < 10
          ? '0' + (exchange.exchangeDate.getMonth() + 1)
          : exchange.exchangeDate.getMonth() + 1
      }-${
        exchange.exchangeDate.getDate() < 10
          ? '0' + exchange.exchangeDate.getDate()
          : exchange.exchangeDate.getDate()
      }`
    });
  }

  updateExchange(id: number, exchange: BookExchange) {
    return this.http.put(`${this.baseUrl}/${id}`, {
      toUser: exchange.toUser,
      fromUser: exchange.fromUser,
      toBook: exchange.toBook,
      fromBook: exchange.fromBook,
      exchangeDate: `${exchange.exchangeDate.getFullYear()}-${
        exchange.exchangeDate.getMonth() + 1 < 10
          ? '0' + (exchange.exchangeDate.getMonth() + 1)
          : exchange.exchangeDate.getMonth() + 1
      }-${
        exchange.exchangeDate.getDate() < 10
          ? '0' + exchange.exchangeDate.getDate()
          : exchange.exchangeDate.getDate()
      }`
    });
  }
}
