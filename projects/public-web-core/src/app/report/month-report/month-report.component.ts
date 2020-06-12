import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-month-report',
  templateUrl: './month-report.component.html',
  styleUrls: ['./month-report.component.css']
})
export class MonthReportComponent implements OnInit, OnDestroy {
  private serviceSub: Subscription;
  multi: any[];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Mes';
  yAxisLabel: string = 'Año';

  colorScheme = {
    domain: ['#DD83FB', '#8207AB']
  };

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.serviceSub = this.reportService.getMonthReport().subscribe((multi) => {
      console.log(multi);
      Object.assign(this, { multi });
    });
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
  }
}
