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

}
