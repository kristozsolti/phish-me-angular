import { Component, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent {

  @Input() pieChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  @Input() pieChartData: SingleDataSet = [30, 50, 20];
  @Input() pieChartType: ChartType = 'pie';
  @Input() pieChartLegend = true;
  @Input() pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

}
