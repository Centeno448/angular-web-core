import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-category-report',
  templateUrl: './category-report.component.html',
  styleUrls: ['./category-report.component.css']
})
export class CategoryReportComponent implements OnInit, OnDestroy {
  private serviceSub: Subscription;

  single: any[];

  // NgxChart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Intercambios';
  showYAxisLabel = true;
  yAxisLabel = 'Combinacion de categorías';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#009ADB']
  };

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.serviceSub = this.reportService
      .getCategoryReport()
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
