import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterState } from '@angular/router';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { Employee } from '../employee/employee';
import { PhishingMailTemplate } from '../phishing-mail-template/phishing-mail-template';
import { SearchResult } from '../search/search-result';
import { SearchResultService } from '../search/search-result.service';
import { filter } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  queryText = '';

  constructor(private es: ElasticsearchService,
              private searchResultService: SearchResultService,
              private router: Router,
              @Inject(TOASTR_TOKEN) private toastr: IToastr,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.searchResultService.changeSearchResult(null);
      this.queryText = '';
    });
  }

  search(): void {
    if (this.queryText.length < 1) {
      this.searchResultService.changeSearchResult(null);
      return;
    }

    if (this.router.url === '/employee') {
      this.searchEmployeeByName(this.queryText);
    } else if (this.router.url === '/phishing-mail-template') {
      this.searchPhishingMailBySubject(this.queryText);
    }
  }

  searchEmployeeByName(searchTerm: string): void {
    this.es.searchEmployeeByName(searchTerm).subscribe(
      (response: Employee[]) => {
        const employeeSearchResult: SearchResult = {
          result: response,
          type: 'employee',
          searchTerm
        };
        this.searchResultService.changeSearchResult(employeeSearchResult);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not search employees. Try again later.', 'Error');
      }
    );
  }

  searchPhishingMailBySubject(searchTerm: string): void {
    this.es.searchMailTemplateSubject(searchTerm).subscribe(
      (response: PhishingMailTemplate[]) => {
        const mailTemplSearchResult: SearchResult = {
          result: response,
          type: 'phishing-mail-template',
          searchTerm
        };
        this.searchResultService.changeSearchResult(mailTemplSearchResult);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not load employees from the server.', 'Error');
      }
    );
  }

  onSignOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
