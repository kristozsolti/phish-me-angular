import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsModule } from './common/icons.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeComponent } from './employee/employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhishingMailTemplateComponent } from './phishing-mail-template/phishing-mail-template.component';
import { IToastr, TOASTR_TOKEN } from './common/toastr.service';
import { JQ_TOKEN } from './common/jquery.service';
import { DelayedInputDirective } from './delayed-input/delayed-input.directive';
import { LoginComponent } from './login/login.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { BubbleChartComponent } from './charts/bubble-chart/bubble-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { RadarChartComponent } from './charts/radar-chart/radar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';

const toastr: IToastr = window['toastr'];
const jQuery = window['$'];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    EmployeeComponent,
    DashboardComponent,
    PhishingMailTemplateComponent,
    DelayedInputDirective,
    LoginComponent,
    BarChartComponent,
    BubbleChartComponent,
    LineChartComponent,
    PieChartComponent,
    RadarChartComponent,
    DoughnutChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
