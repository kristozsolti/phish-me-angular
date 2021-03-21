import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { BarChart } from '../charts/bar-chart/bar-chart';
import { BarChartService } from '../charts/bar-chart/bar-chart.service';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';
import { Employee } from '../employee/employee';
import { PhishingMailTemplate } from '../phishing-mail-template/phishing-mail-template';
import { PhishingMailService } from '../phishing-mail-template/phishing-mail.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  phishingMailTemplates: PhishingMailTemplate[] = [];
  phishingMailTemplateId: string;
  top10PhishedEmployeesChart: BarChart;
  barChartReady = false;

  constructor(private phishingMailService: PhishingMailService,
              @Inject(TOASTR_TOKEN) private toastr: IToastr,
              private dashboardService: DashboardService,
              private barChartService: BarChartService) { }

  ngOnInit(): void {
    this.getTop10PhishedEmployees();
  }

  onOpenModal(mode: string): void {
    const container = document.getElementsByTagName('body')[0];
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'send-phishing-mail') {
      button.setAttribute('data-target', '#sendPhishingMailModal');
      this.getPhishingMailTemplates();
    }

    container.appendChild(button);
    button.click();
  }

  getPhishingMailTemplates(): void {
    this.phishingMailService.getPhishingMailTemplates().subscribe(
      (response: PhishingMailTemplate[]) => {
        this.phishingMailTemplates = response;
        this.phishingMailTemplateId = response[0]?.id;
        console.log(this.phishingMailTemplates);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not load  mail templates from the server.', 'Error');
      }
    );
  }

  onSendPhishingMail(mailTemplateId: any): void {
    console.log(mailTemplateId);
    this.phishingMailService.sendPhishingMail(mailTemplateId.phishingMailTemplateId).subscribe(
      (response: void) => {
        console.log(response);
        this.toastr.info('Started sending the phishing emails.', 'Info');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not send phishing mail. Try again later.', 'Error');
      }
    );
  }

  getTop10PhishedEmployees(): void {
    this.dashboardService.getTop10PhishedEmployees().subscribe(
      (response: Employee[]) => {
        console.log(response);
        this.top10PhishedEmployeesChart = this.barChartService.convertEmployeesToBarChart(response);
        console.log(this.top10PhishedEmployeesChart);
        this.barChartReady = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not send phishing mail. Try again later.', 'Error');
      }
    );
  }

}
