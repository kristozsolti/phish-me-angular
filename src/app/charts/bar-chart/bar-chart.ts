import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from 'ng2-charts';

export interface BarChart {
    options: ChartOptions;
    labels: Label[];
    type: ChartType;
    legend: boolean;
    plugins: Array<any>;
    data: ChartDataSets[];
}
