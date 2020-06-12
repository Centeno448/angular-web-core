import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit, OnDestroy {
  private serviceSub: Subscription;

  single: any[];
  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#f1e900', '#c1c1c1', '#ab4e00', '#000', '#000']
  };

  cardColor: string = '#232837';

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.serviceSub = this.reportService.getUserReport().subscribe((single) => {
      Object.assign(this, { single });
    });
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
  }
}
