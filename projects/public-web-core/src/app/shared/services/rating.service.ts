import { UserSelect } from './../userSelect.model';
import { Rating } from './../models/rating.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = environment.baseUrl + 'rating';

  constructor(private http: HttpClient) {}

  getAllRatings() {
    return this.http.get<Rating[]>(this.baseUrl);
  }

  deleteRating(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addRating(rating: Rating) {
    return this.http.post(`${this.baseUrl}`, {
      score: rating.score,
      comment: rating.comment,
      toUser: rating.toUser,
      fromUser: rating.fromUser
    });
  }

  updateRating(id: number, rating: Rating) {
    return this.http.put(`${this.baseUrl}/${id}`, {
      score: rating.score,
      comment: rating.comment,
      toUser: rating.toUser,
      fromUser: rating.fromUser
    });
  }

  getRatingsFromUser(id: number) {
    return this.http.get<Rating[]>(`${this.baseUrl}/${id}`);
  }

  getRatingsToUser(id: number) {
    return this.http.get<Rating[]>(`${this.baseUrl}/recieved/${id}`);
  }

  getValidRatingUsers(id: number) {
    return this.http.get<UserSelect[]>(`${this.baseUrl}/users/${id}`);
  }
}
