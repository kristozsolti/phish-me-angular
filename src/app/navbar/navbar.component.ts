import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { Employee } from '../employee/employee';
import { PhishingMailTemplate } from '../phishing-mail-template/phishing-mail-template';
import { SearchResult } from '../search/search-result';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private queryText = '';


  constructor(private es: ElasticsearchService,
              private searchResultService: SearchService,
              private router: Router,
              @Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  ngOnInit(): void {
  }

  search($event: any): void {
    this.queryText = $event.target.value;
    if (this.queryText.length < 1) {
      this.searchResultService.changeSearchResult(null);
      return;
    }
    alert(this.router.url);

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

}
