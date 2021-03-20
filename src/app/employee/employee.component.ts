import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { PhishingMailTemplate } from '../phishing-mail-template/phishing-mail-template';
import { PhishingMailService } from '../phishing-mail-template/phishing-mail.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  title = 'Employees';
  employees: Employee[] = [];
  editEmployee!: Employee;
  deleteEmployee!: Employee;
  phishingMailTemplates: PhishingMailTemplate[] = [];
  phishingMailTemplateId: string;
  showAvatars = false;

  constructor(private employeeService: EmployeeService,
              private phishingMailService: PhishingMailService,
              @Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  toggleAvatars(): void {
    this.showAvatars = !this.showAvatars;
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this. employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not load employees from the server.', 'Error');
      }
    );
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

  onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementsByTagName('body')[0];
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    } else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    } else if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    } else if (mode === 'send-phishing-mail') {
      button.setAttribute('data-target', '#sendPhishingMailModal');
      this.getPhishingMailTemplates();
    }

    container.appendChild(button);
    button.click();
  }

  onAddEmloyee(addForm: NgForm): void {
    const addEmployeeBtn = document.getElementById('add-employee-form');
    if (addEmployeeBtn) {
      addEmployeeBtn.click();
    }
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log('Added\n', response);
        this.getEmployees();
        addForm.reset();
        this.toastr.success('Employee successfully added.', 'Success');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not save employee. Try again later.', 'Error');
      }
    );
  }

  onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log('Edited\n', response);
        this.toastr.success('Employee successfully updated.', 'Success');
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not update employee. Try again later.', 'Error');
      }
      );
    }

  onDeleteEmloyee(employeeId: string): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: Employee) => {
        console.log(response);
        this.toastr.success(`${response.name} successfully deleted.`, 'Success');
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not delete employee. Try again later.', 'Error');
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
}
