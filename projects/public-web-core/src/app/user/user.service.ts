import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = new Subject<User[]>();

  usersUpdated = new Subject<boolean>();

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
          console.log('get error' + error);
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
          console.log('delete error' + error);
        }
      );
  }
}
