import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhishingMailTemplate } from './phishing-mail-template';

@Injectable({
  providedIn: 'root'
})
export class PhishingMailService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  getPhishingMailTemplates(): Observable<PhishingMailTemplate[]> {
    return this.http.get<PhishingMailTemplate[]>(`${this.apiServerUrl}/phishing-mail/all`);
  }

  sendPhishingMail(phishingMailTemplateId: string): Observable<void> {
    return this.http.post<void>(`${this.apiServerUrl}/phishing-mail/send`, phishingMailTemplateId);
  }

  addPhishingMailTemplate(mailTemplate: PhishingMailTemplate): Observable<PhishingMailTemplate> {
    return this.http.post<PhishingMailTemplate>(`${this.apiServerUrl}/phishing-mail/add-template`, mailTemplate);
  }

  updatePhishingMailTemplate(mailTemplate: PhishingMailTemplate): Observable<PhishingMailTemplate> {
    return this.http.put<PhishingMailTemplate>(`${this.apiServerUrl}/phishing-mail/update`, mailTemplate);
  }

  public deletePhishingMailTemplate(templateId: string): Observable<PhishingMailTemplate> {
    return this.http.delete<PhishingMailTemplate>(`${this.apiServerUrl}/phishing-mail/delete/${templateId}`);
  }
}
