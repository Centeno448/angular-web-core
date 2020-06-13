import { CapitalizePipe } from './../shared/pipes/capitalize.pipe';
import { ReportRoutingModule } from './report-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { RatingReportComponent } from './rating-report/rating-report.component';
import { PositionMatchPipe } from './rating-report/pipes/position-match.pipe';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BooksReportComponent } from './books-report/books-report.component';
import { CategoryReportComponent } from './category-report/category-report.component';
import { UserReportComponent } from './user-report/user-report.component';
import { MonthReportComponent } from './month-report/month-report.component';
import { FailedExchangeComponent } from './failed-exchange/failed-exchange.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    NgxChartsModule
  ],
  declarations: [
    RatingReportComponent,
    BooksReportComponent,
    CategoryReportComponent,
    UserReportComponent,
    MonthReportComponent,
    FailedExchangeComponent,
    CapitalizePipe,
    PositionMatchPipe
  ]
})
export class ReportModule {}
