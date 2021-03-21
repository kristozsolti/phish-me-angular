import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { SearchResult } from '../search/search-result';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  title = 'Employees';
  employees: Employee[] = [];
  editEmployee!: Employee;
  deleteEmployee!: Employee;
  showAvatars = false;
  searchEmployees = false;
  searchTerm: string;

  constructor(private employeeService: EmployeeService,
              @Inject(TOASTR_TOKEN) private toastr: IToastr,
              private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.currentSearchResults.subscribe(
        (employeeSearch: SearchResult) => {
          if (employeeSearch.searchTerm === '' || !employeeSearch.searchTerm) {
            this.getEmployees();
            this.searchEmployees = false;
          } else if (employeeSearch.type === 'employee') {
            this.employees = employeeSearch.result;
            this.searchTerm = employeeSearch.searchTerm;
            this.searchEmployees = true;
            console.log(employeeSearch);
          }
        }
    );
  }

  ngOnDestroy(): void {
    
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
}
