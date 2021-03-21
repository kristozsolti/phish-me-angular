import { Injectable } from '@angular/core';
import { Employee } from 'src/app/employee/employee';
import { BarChart } from './bar-chart';

@Injectable({
  providedIn: 'root'
})
export class BarChartService {

  constructor() { }

  convertEmployeesToBarChart(employees: Employee[]): BarChart {
    const barChart: BarChart = {
      options: { responsive: true },
      legend: true,
      data: [],
      labels: [],
      plugins: [],
      type: 'horizontalBar'
    };
    const data = [];

    employees.map((employee: Employee) => {
      if (employee.phishingCount > 0) {
        barChart.labels.push(employee.name);
        data.push(employee.phishingCount);
      }
    });

    const chartData = [{ data, label: 'Top Phished Employees' }];
    barChart.data = chartData;

    return barChart;
  }
}
