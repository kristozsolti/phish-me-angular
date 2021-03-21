import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAdminAuthenticated: boolean;
  isAdminAuthenticatedSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdminAuthenticatedSubs = this.authService.isAdminAuthenticated.subscribe(
      status => this.isAdminAuthenticated = status
    );
  }

  ngOnDestroy(): void {
    this.isAdminAuthenticatedSubs.unsubscribe();
  }

  styleMainContainer(): string {
    if (this.isAdminAuthenticated) {
      return 'col-md-12 ml-sm-auto col-lg-12 px-md-12';
    } else {
      return 'col-md-9 ml-sm-auto col-lg-10 px-md-4';
    }
  }

}
