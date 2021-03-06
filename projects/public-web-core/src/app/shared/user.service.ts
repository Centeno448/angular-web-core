import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSelect } from './userSelect.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl + 'user';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<UserSelect[]>(this.baseUrl);
  }
}
