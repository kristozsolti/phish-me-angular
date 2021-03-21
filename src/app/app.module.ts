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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
