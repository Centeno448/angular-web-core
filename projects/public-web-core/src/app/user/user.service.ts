import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './user.model';
import { ServerError } from '../shared/server-error.model';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = new Subject<User[]>();

  user = new Subject<User>();

  usersUpdated = new Subject<boolean>();

  errorOcurred = new Subject<ServerError>();

  private baseUrl = environment.baseUrl + 'users';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    this.http
      .get<User[]>(this.baseUrl, {
        headers: { Auth: environment.apiKey }
      })
      .subscribe(
        users => {
          this.users.next(users);
        },
        error => {
          this.errorOcurred.next(error.error);
        }
      );
  }

  deleteUser(id: number) {
    this.http
      .delete(this.baseUrl + '/' + id, {
        headers: { Auth: environment.apiKey }
      })
      .subscribe(
        response => {
          this.usersUpdated.next(true);
        },
        error => {
          this.errorOcurred.next(error.error);
        }
      );
  }

  updateUser(id: number, user: User) {
    this.http
      .patch(this.baseUrl + '/' + id, user, {
        headers: { Auth: environment.apiKey }
      })
      .subscribe(
        response => {
          this.usersUpdated.next(true);
        },
        error => {
          this.errorOcurred.next(error.error);
        }
      );
  }

  addUser(user: User) {
    this.http
      .post(this.baseUrl, user, {
        headers: { Auth: environment.apiKey }
      })
      .subscribe(
        res => {
          this.usersUpdated.next(true);
        },
        error => {
          this.errorOcurred.next(error.error);
        }
      );
  }

  getUser(id: number) {
    this.http
      .get<User>(this.baseUrl + '/' + id, {
        headers: { Auth: environment.apiKey }
      })
      .subscribe(
        user => {
          this.user.next(user);
        },
        error => {
          this.errorOcurred.next(error);
        }
      );
  }
}
