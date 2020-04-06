import { AuthLoginModel } from './auth-login.model';
import { ApiRegisterModel } from './api-register.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl + 'auth/';

  constructor(private http: HttpClient) {}

  register(user: ApiRegisterModel) {
    return this.http.post(this.baseUrl + 'register', user, {
      headers: { Auth: environment.apiKey }
    });
  }

  login(user: AuthLoginModel) {
    return this.http.post(this.baseUrl + 'login', user, {
      headers: { Auth: environment.apiKey }
    });
  }
}
