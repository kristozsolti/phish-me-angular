import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * TODO: change it to false
   */
  private authStatusSource = new BehaviorSubject(false);
  isAdminAuthenticated = this.authStatusSource.asObservable();

  constructor(private http: HttpClient) { }

  loginAdmin({ username, password }): any {
    return this.http.post<boolean>(`${environment.apiServerUrl}/auth/login`, { username, password })
    .pipe(tap(data => {
      this.changeAuthStatus(data);
    }))
    .pipe(catchError(err => {
      return of(false);
    }));
  }

  changeAuthStatus(status: boolean): void {
    this.authStatusSource.next(status);
  }

  logout(): void {
    this.changeAuthStatus(false);
  }
}
