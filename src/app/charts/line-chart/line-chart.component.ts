import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  @Input() lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  @Input() lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  @Input() lineChartOptions = {
    responsive: true,
  };

  @Input() lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  @Input() lineChartLegend = true;
  @Input() lineChartPlugins = [];
  @Input() lineChartType = 'line';

}
