import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../employee/employee';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  /**
   * Returns a list of employees ordered by phishing count
   * desc and limit to first 10 results.
   */
  getTop10PhishedEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.apiServerUrl}/dashboard/top-ten-phished`);
  }

}
