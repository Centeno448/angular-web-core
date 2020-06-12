import { ReportService } from './../report.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-books-report',
  templateUrl: './books-report.component.html',
  styleUrls: ['./books-report.component.css']
})
export class BooksReportComponent implements OnInit {
  single: any[];

  // NgxChart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Libros';
  showYAxisLabel = true;
  yAxisLabel = 'Intercambios';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#009ADB']
  };

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.reportService.getBookReport().subscribe((single) => {
      Object.assign(this, { single });
    });
  }
}
