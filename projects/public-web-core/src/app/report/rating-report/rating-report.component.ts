import { Subscription } from 'rxjs';
import { ReportRatingModel } from './../models/report-rating.model';
import { ReportService } from './../report.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-rating-report',
  templateUrl: './rating-report.component.html',
  styleUrls: ['./rating-report.component.css']
})
export class RatingReportComponent implements OnInit, OnDestroy {
  constructor(private reportService: ReportService) {}

  data: ReportRatingModel[];
  chunkedData = [];
  private serviceSub: Subscription;

  ngOnInit(): void {
    this.serviceSub = this.reportService.getReportRating().subscribe((data) => {
      this.chunkedData = [data.slice(0, 3), data.slice(3)];
      console.log(this.chunkedData);
    });
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
  }
}
