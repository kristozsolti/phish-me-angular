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
      log: 'trace'
    });
  }

  /**
   * Makes a full text search on elasticsearch server and check if the search string starts with the queryTextParam.
   * @param indexParam : index on es
   * @param typeParam : type on es
   * @param fieldParam : field on es
   * @param queryTextParam : the text to be searched
   * @param sourceParam : source on es
   */
  fullTextSearch(indexParam: string, typeParam: string, fieldParam: string, queryTextParam: string, sourceParam: Array<string>): any {
    return this.client.search<SearchResponse<Employee>>({
      index: indexParam,
      type: typeParam,
      filterPath: ['hits.hits', 'hits.total', '_scroll_id'],
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

  /**
   * Searches on elasticsearch server for an employee name that starts with the employeeName input param.
   * @param employeeName : the employee name to be searched
   */
  searchEmployeeByName(employeeName: string): Observable<Employee[]> {
    const employees: Employee[] = [];

    this.fullTextSearch(
      ElasticsearchService.EMPLOYEE_INDEX,
      ElasticsearchService.TYPE,
      ElasticsearchService.EMPLOYEE_NAME_FIELD,
      employeeName,
      ['_id', 'name', 'email', 'jobTitle', 'imageUrl', 'phishingCount']
    ).then(
      response => {
        if (response.hits.total.value > 0) {
          response.hits.hits.map(result => {
            employees.push({id: result._id, ...result._source});
          });
        }
      }, error => {
        console.log(error);
      }).then(() => {
        console.log('Search completed');
      });

    return of<Employee[]>(employees);
  }

  /**
   * Searches on elasticsearch server for an phishing mail template that's subject starts with the mailTemplateSubject input param.
   * @param mailTemplateSubject : the subject of the phishing mail template to be searched
   */
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
            phishingMailTemplates.push({id: result._id, ...result._source});
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
