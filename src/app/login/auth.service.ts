import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSource = new BehaviorSubject(false);
  isAdminAuthenticated = this.authStatusSource.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Makes a POST request to the backend with the specified username, password fields to 
   * check if they corresponds to the admin's credentials.
   * @param object : an object containing username and password fields.
   */
  loginAdmin({ username, password }): any {
    return this.http.post<boolean>(`${environment.apiServerUrl}/auth/login`, { username, password })
    .pipe(tap(data => {
      this.changeAuthStatus(data);
    }))
    .pipe(catchError(err => {
      return of(false);
    }));
  }

  /**
   * Used to change the authentication status to let other components know if
   * the admin is authenticated.
   * @param status : true if the admin is authenticated, false otherwise
   */
  changeAuthStatus(status: boolean): void {
    this.authStatusSource.next(status);
  }

  /**
   * Signs out of the application.
   */
  logout(): void {
    this.changeAuthStatus(false);
  }
}
