import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IToastr, TOASTR_TOKEN } from '../common/toastr.service';
import { SearchResult } from '../search/search-result';
import { SearchService } from '../search/search.service';
import { PhishingMailTemplate } from './phishing-mail-template';
import { PhishingMailService } from './phishing-mail.service';

@Component({
  selector: 'app-phishing-mail-template',
  templateUrl: './phishing-mail-template.component.html',
  styleUrls: ['./phishing-mail-template.component.css']
})
export class PhishingMailTemplateComponent implements OnInit, OnDestroy {
  title = 'Manage Phishing Email Templates';
  phishingMailTemplates: PhishingMailTemplate[] = [];
  editTemplate: PhishingMailTemplate;
  deleteTemplate: PhishingMailTemplate;
  previewTemplate: PhishingMailTemplate;
  showHelp = false;
  searchTemplates = false;
  searchTerm: string;
  searchServiceSubscription: Subscription;
  mailTemplServiceSubscription: Subscription;


  constructor(private phishingMailService: PhishingMailService,
              @Inject(TOASTR_TOKEN) private toastr: IToastr,
              private searchService: SearchService ) { }

  ngOnInit(): void {
    this.searchServiceSubscription = this.searchService.currentSearchResults.subscribe(
      (mailTemplateSearch: SearchResult) => {
        if (mailTemplateSearch.searchTerm === '' || !mailTemplateSearch.searchTerm) {
          this.getPhishingMailTemplates();
          this.searchTemplates = false;
        } else if (mailTemplateSearch.type === 'phishing-mail-template') {
          this.phishingMailTemplates = mailTemplateSearch.result;
          this.searchTerm = mailTemplateSearch.searchTerm;
          this.searchTemplates = true;
          console.log(mailTemplateSearch);
        }
      });
  }

  ngOnDestroy(): void {
    this.mailTemplServiceSubscription.unsubscribe();
    this.searchServiceSubscription.unsubscribe();
  }

  toggleShowHelp(): void {
    this.showHelp = !this.showHelp;
  }

  getPhishingMailTemplates(): void {
    this.searchTemplates = false;
    this.searchTerm = '';

    this.mailTemplServiceSubscription = this.phishingMailService.getPhishingMailTemplates().subscribe(
      (response: PhishingMailTemplate[]) => {
        console.log(response);
        this.phishingMailTemplates = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not load phishing email templates from the server. Try again later.', 'Error');
      }
    );
  }

  onOpenModal(mailTemplate: PhishingMailTemplate, mode: string): void {
    const container = document.getElementsByTagName('body')[0];
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addTemplateModal');
    } else if (mode === 'edit') {
      this.editTemplate = mailTemplate;
      button.setAttribute('data-target', '#updateTemplateModal');
    } else if (mode === 'delete') {
      this.deleteTemplate = mailTemplate;
      button.setAttribute('data-target', '#deleteTemplateModal');
    } else if (mode === 'preview') {
      this.previewTemplate = mailTemplate;
      button.setAttribute('data-target', '#previewTemplateModal');
    }

    container.appendChild(button);
    button.click();
  }

  onAddTemplate(addForm: NgForm): void {
    const addTemplateBtn = document.getElementById('add-template-form');
    if (addTemplateBtn) {
      addTemplateBtn.click();
    }
    this.phishingMailService.addPhishingMailTemplate(addForm.value).subscribe(
      (response: PhishingMailTemplate) => {
        console.log('Added\n', response);
        this.getPhishingMailTemplates();
        addForm.reset();
        this.toastr.success('New phishing email template successfully added.', 'Success');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not load employees from the server.', 'Error');
      }
    );
  }

  onUpdateTemplate(template: PhishingMailTemplate): void {
    this.phishingMailService.updatePhishingMailTemplate(template).subscribe(
      (response: PhishingMailTemplate) => {
        console.log('Edited\n', response);
        this.toastr.success('Phishing email template successfully updated.', 'Success');
        this.getPhishingMailTemplates();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not update phishing email template. Try again later.', 'Error');
      }
      );
  }

  onDeleteTemplate(templateId: string): void {
    this.phishingMailService.deletePhishingMailTemplate(templateId).subscribe(
      (response: PhishingMailTemplate) => {
        console.log('Edited\n', response);
        this.toastr.success('Phishing email template successfully deleted.', 'Success');
        this.getPhishingMailTemplates();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        this.toastr.error('Could not delete phishing email template. Try again later.', 'Error');
      }
    );
  }

}
