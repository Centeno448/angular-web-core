import { UserReportComponent } from './user-report/user-report.component';
import { AdminAuthGuard } from './../auth/admin-auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RatingReportComponent } from './rating-report/rating-report.component';
import { BooksReportComponent } from './books-report/books-report.component';
import { CategoryReportComponent } from './category-report/category-report.component';
import { MonthReportComponent } from './month-report/month-report.component';
import { FailedExchangeComponent } from './failed-exchange/failed-exchange.component';

const routes: Routes = [
  {
    path: 'report/ratings',
    component: RatingReportComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'report/books',
    component: BooksReportComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'report/categories',
    component: CategoryReportComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'report/users',
    component: UserReportComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'report/months',
    component: MonthReportComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'report/failed-exchange',
    component: FailedExchangeComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
