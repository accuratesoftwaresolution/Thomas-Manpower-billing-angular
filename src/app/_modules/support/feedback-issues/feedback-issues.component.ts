import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IgissueDetailDto } from 'src/app/_dto/igissue-detail.dto';
import { IgissueSummaryDto } from 'src/app/_dto/igissue-summary.dto';
import { AuthService } from 'src/app/_providers/auth.service';
import { SupportService } from 'src/app/_providers/support.service';
import { environment } from 'src/environments/environment';

/*
Created by Sruthin
date: 09-12-2021
for user Support
 */

@Component({
  selector: 'app-feedback-issues',
  templateUrl: './feedback-issues.component.html',
  styleUrls: ['./feedback-issues.component.css']
})
export class FeedbackIssuesComponent implements OnInit {

  currentUser: IgissueSummaryDto;
  currentUserDetail: IgissueDetailDto;
  isTermsAndConditions: boolean = false;
  isIssueDetails: boolean = false;
  isFailed: boolean = false;
  disableEmail: boolean = false;
  disableSend: boolean = false;
  isUpload: boolean;
  imageUrl: string;
  currentUrl: any;
  basicUrl: string = environment.apiUrl;
  count: number = 0;
  name: string = "";
  mail: string;
  subject: string;
  description: string;

  constructor(
    private _supportService: SupportService,
    private _router: Router,
    private authService: AuthService,
    public _lang: LangaugeTranslateService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    private _uiService: UiService
  ) { }

  async ngOnInit(): Promise<void> {
    
    this.currentUrl = this._router.url
    this.currentUserDetail = new IgissueDetailDto();
    this.isTermsAndConditions = true;
    this.isIssueDetails = false;
    this.isFailed = false;
    this.disableEmail = true;
    this.isUpload = true;

    // await this.authService.getUserInfo().then((res) => {
    //   this.name = res.userName;
    //   this.mail = res.userId;
    // }, (err) => {
    //   // console.warn("err==", err);
    // });
    // Uncomment this when using API LOGIN

  }

  async saveIssueDetails() {
    if (!(await this.preSave())) {
      return;
    }
    this.disableSend = true;
    let newUser = new IgissueSummaryDto();
    let newUserDetails = new IgissueDetailDto();
    newUser.name = this.name;
    newUser.identifiedByEmail = this.mail;
    newUser.relatedProject = localStorage.getItem('module');
    newUser.summary = this.subject;
    newUser.identifiedDate = new Date();
    if (this.currentUrl == '/support/feedback') {
      newUser.source = 'feedback';
    }
    newUser.status = "O"
    newUserDetails.description = this.description;
    newUserDetails.developerYn = "N";
    newUserDetails.seen = "N";
    newUserDetails.imagePath = this.imageUrl;
    newUser.igissueDetailDto = [newUserDetails];
    this.currentUser = newUser;
    this._supportService.save(this.currentUser).then((res) => {
      this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate("issueSendSuccess") });
      setTimeout(() => {
        this._router.navigate(["/support/chat"]);
      }, 2000);
    }, (err) => {
      // console.warn(err);
      this.isFailed = true;
    });
  }

  onBasicUpload(event: any, code?: string) {
    this.imageUrl = event.originalEvent.body.fileName;
    this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate("fileuploadedSuccess") });
    if (this.imageUrl) {
      this.isUpload = false;
    }

  }



  async preSave(): Promise<boolean> {

    if (!this.name || this.name.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate("userNameNotNull") });
      return false;
    }
    if (!this.mail || this.mail.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate("emailNotNull") });
      return false;
    }
    //need to discuss
    
    // if (!this._uiService.getEmailRegex().test(this.mail)) {
    //   this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate("emailNotValid") });
    //   return false;
    // }
    if (!this.subject || this.subject.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate("subjectNotNull") });
      return false;
    }
    if (!this.description || this.description.trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate("descriptionNotNull") });
      return false;
    }

    return true;
  }

}
