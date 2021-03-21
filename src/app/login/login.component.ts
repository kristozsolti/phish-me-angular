import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              @Inject(TOASTR_TOKEN) private toastr: IToastr,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm): void {
    this.authService.loginAdmin(loginForm.value).subscribe(
      (response: boolean) => {
        if (response === true) {
          this.toastr.info('Authenticated');
          this.authService.changeAuthStatus(response);
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.warning('Wrong credentials!');
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not log in. Try again later.', 'Error');
      }
    );
  }

}
