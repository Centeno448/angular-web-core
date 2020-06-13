import { GenericMultipleReportModel } from './models/report-generic-multiple.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportRatingModel } from './models/report-rating.model';
import { GenericReportModel } from './models/report-generic.model';

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
    return this.http.get<GenericReportModel[]>(
      `${this.baseUrl}/mostExchangedBooks`
    );
  }

  getCategoryReport() {
    return this.http.get<GenericReportModel[]>(
      `${this.baseUrl}/mostExchangedCategories`
    );
  }

  getUserReport() {
    return this.http.get<GenericReportModel[]>(
      `${this.baseUrl}/mostExchangesByUsers`
    );
  }

  getMonthReport() {
    return this.http.get<GenericMultipleReportModel[]>(
      `${this.baseUrl}/mostExchangesByMonth`
    );
  }

  getFailedReport() {
    return this.http.get<GenericMultipleReportModel[]>(
      `${this.baseUrl}/failedExchanges`
    );
  }
}
