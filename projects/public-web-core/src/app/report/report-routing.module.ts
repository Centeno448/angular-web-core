import { AdminAuthGuard } from './../auth/admin-auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RatingReportComponent } from './rating-report/rating-report.component';
import { BooksReportComponent } from './books-report/books-report.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule {}
