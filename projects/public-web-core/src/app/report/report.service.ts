import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportRatingModel } from './models/report-rating.model';
import { ReportBookModel } from './models/report-book.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = environment.baseUrl + 'report';

  constructor(private http: HttpClient) {}

  getReportRating() {
    return this.http.get<ReportRatingModel[]>(`${this.baseUrl}/averageRatings`);
  }

  getBookReport() {
    return this.http.get<ReportBookModel[]>(
      `${this.baseUrl}/mostExchangedBooks`
    );
  }
}
