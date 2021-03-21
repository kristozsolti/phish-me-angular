import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})

export class DoughnutChartComponent {

  @Input() doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  @Input() doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  @Input() doughnutChartType: ChartType = 'doughnut';

}
