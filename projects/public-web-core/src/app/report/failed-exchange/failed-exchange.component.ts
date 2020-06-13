import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-failed-exchange',
  templateUrl: './failed-exchange.component.html',
  styleUrls: ['./failed-exchange.component.css']
})
export class FailedExchangeComponent implements OnInit, OnDestroy {
  single: any[];

  private serviceSub: Subscription;

  // NgxChart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Tipo';
  showYAxisLabel = true;
  yAxisLabel = 'Intercambios';

  colorScheme = {
    domain: ['#A10A28', '#5AA454']
  };

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.serviceSub = this.reportService
      .getFailedReport()
      .subscribe((single) => {
        Object.assign(this, { single });
      });
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
  }
}
