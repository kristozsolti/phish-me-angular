import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from 'elasticsearch';
import { Client } from 'elasticsearch-browser';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../employee/employee';
import { PhishingMailTemplate } from '../phishing-mail-template/phishing-mail-template';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  private static readonly EMPLOYEE_INDEX = 'phishme.employees';
  private static readonly MAIL_TEMPLATE_INDEX = 'phishme.phishing_email_templates';
  private static readonly EMPLOYEE_NAME_FIELD = 'name';
  private static readonly MAIL_SUBJECT_FIELD = 'subject';
  private static readonly TYPE = '_doc';
  private client: Client;

  constructor(private htttp: HttpClient) {
    if (!this.client) {
      this.connect();
    }
  }

  private connect(): void {
    this.client = new Client({
      host: environment.elasticsearchServerUrl,
      // log: 'trace'
    });
  }

  fullTextSearch(indexParam: string, typeParam: string, fieldParam: string, queryTextParam: string, sourceParam: Array<string>): any {
    return this.client.search<SearchResponse<Employee>>({
      index: indexParam,
      type: typeParam,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        query: {
          match_phrase_prefix: {
            [fieldParam]: queryTextParam,
          }
        }
      },
      _source: sourceParam
    });
  }

  searchEmployeeByName(employeeName: string): Observable<Employee[]> {
    const employees: Employee[] = [];

    this.fullTextSearch(
      ElasticsearchService.EMPLOYEE_INDEX,
      ElasticsearchService.TYPE,
      ElasticsearchService.EMPLOYEE_NAME_FIELD,
      employeeName,
      ['name', 'email', 'jobTitle', 'imageUrl', 'phishingCount']
    ).then(
      response => {
        if (response.hits.total.value > 0) {
          response.hits.hits.map(result => {
            employees.push(result._source);
          });
        }
      }, error => {
        console.log(error);
      }).then(() => {
        console.log('Search completed');
      });

    return of<Employee[]>(employees);
  }

  searchMailTemplateSubject(mailTemplateSubject: string): Observable<PhishingMailTemplate[]> {
    const phishingMailTemplates: PhishingMailTemplate[] = [];

    this.fullTextSearch(
      ElasticsearchService.MAIL_TEMPLATE_INDEX,
      ElasticsearchService.TYPE,
      ElasticsearchService.MAIL_SUBJECT_FIELD,
      mailTemplateSubject,
      ['subject', 'sender', 'body']
    ).then(
      response => {
        if (response.hits.total.value > 0) {
          response.hits.hits.map(result => {
            phishingMailTemplates.push(result._source);
          });
        }
      }, error => {
        console.log(error);
      }).then(() => {
        console.log('Search completed');
      });

    return of<PhishingMailTemplate[]>(phishingMailTemplates);
  }
}
