import { Component, OnInit } from '@angular/core';
import { IgissueSummaryDto } from 'src/app/_dto/igissue-summary.dto';
import { SupportService } from 'src/app/_providers/support.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { AuthService } from 'src/app/_providers/auth.service';
import { IgissueDetailDto } from 'src/app/_dto/igissue-detail.dto';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';
import { MessageService } from 'primeng/api';
import { ErrorTranslateService } from '@accurate/providers';
import { UiService } from '@accurate/ui';

/*
Created by Sruthin
date: 09-12-2021
for user Support
 */


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  issueTrackerData: IgissueSummaryDto[];
  isChatBox: boolean = false;
  apiEndUrl = apiUrl.igissueSummary;
  data: any[];
  name: string = "";
  selectedIssueTrackerData: IgissueSummaryDto;
  viewPage: number;
  issueDetails: IgissueDetailDto[];
  basicUrl: string = environment.apiUrl;
  showImage: boolean = false;
  dataKey: string = 'code';
  image: any;
  currentUserDetail: IgissueDetailDto;
  chatDescription: string;
  imageUrl: string;
  isUpload: boolean;
  userId: string;

  constructor(
    private _supportService: SupportService,
    private authService: AuthService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    private uiService: UiService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.currentUserDetail = new IgissueDetailDto();
    // await this.authService.getUserInfo().then((res) => {
    //   this.name = res.userName;
    //   this.userId = res.userId;
    // }, (err) => {
    //   // console.warn("err==", err);
    // });
    // Uncomment this when using API LOGIN
    await this.getHeaderData();
  }

  getHeaderData() {
    if (this.userId) {
      this._supportService.getMasterData(`${this.apiEndUrl}?where[identifiedByEmail]=${this.userId}`).then((data: IgissueSummaryDto[]) => {
        this.issueTrackerData = data;
        this.data = data;
      }, (err) => {
        // console.warn("err==", err);
      });
    }
  }


  async goToViewPage(issue: IgissueSummaryDto) {
    let flag = 0;
    this.isChatBox = true;
    this.selectedIssueTrackerData = issue;
    this.viewPage = issue.code;
    await this._supportService.getDetailMasterData(`${apiUrl.igIssueDetail}?where[refCode]=${this.viewPage}&order[code]=DESC`).then((res: IgissueDetailDto[]) => {
      this.issueDetails = res;
      this.refreshImage(this.issueDetails);
      for (let issue of this.issueDetails) {
        if (issue.developerYn == 'Y') {
          if (issue.seen != 'Y') {
            flag = 1;
          }
          issue.seen = 'Y';
        }
      }
      if (flag == 1) {
        this._supportService.updateDetailData(apiUrl.igIssueDetailPublic, this.issueDetails).then((res: IgissueDetailDto) => {
        }, (err) => {
          // console.warn("==er==", err);
        });
        this.getHeaderData();
      }
    }, (err) => {
      // console.warn("==er==", err);
    });
  }




  images: any = {};

  refreshImage(masterDatas: any) {

    masterDatas.forEach((data) => {
      this.getImageInLov(data[this.dataKey], data.imagePath);
    })
  }

  async getImageInLov(code: string | number, imgName?: string) {
    if (this.images[code])
      return;
    if (!imgName)
      this.images[code] = "/assets/acccurate/images/image-not-found.jpg";
    else {
      this._supportService.getImg(apiUrl.fileUpload, imgName).then((res: any) => {
        let variable = (image) => this.images[code] = image;
        this.createImageFromBlob(res, variable);
        //saveAs(res)
      }, (err) => {
        // console.warn("==er====", err);
        this.images[code] = "/assets/acccurate/images/image-not-found.jpg";
      });
    }
  }

  createImageFromBlob(image: Blob, variableAssign?: any) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      if (!variableAssign) this.images = reader.result; else variableAssign(reader.result);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }


  downloadImage(imagePath) {
    if (imagePath) {

      this._supportService.getImg(apiUrl.fileUpload, imagePath).then((res: any) => {
        saveAs(res)
      }, (err) => {
        this._messageService.add({ severity: 'info', summary: 'Info', detail: "Image Not Found" });
        // console.warn("==er====", err);
      });

    } else {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: "No Image Uploaded By User" });
    }
  }

  viewImage(imageData: any) {
    this.image = imageData;
    this.showImage = true;

  }

  cancelIssue(user) {
    if (this.selectedIssueTrackerData.status == 'C') {
      this._messageService.add({ severity: "info", summary: "Info", detail: this._errorTranslateService.translate("issueAlreadyClosed") });
    }
    else if (this.selectedIssueTrackerData.status == 'CN') {
      this._messageService.add({ severity: "info", summary: "Info", detail: this._errorTranslateService.translate("issueAlreadyCancelled") });
    }
    else {
      this.selectedIssueTrackerData.status = 'CN';
      this._supportService.updateMasterData(apiUrl.igissueSummary, this.selectedIssueTrackerData).then((res) => {
        this._messageService.add({ severity: "sucess", summary: "Success", detail: this._errorTranslateService.translate("issueCancelled") });
      }, (err) => {
        // console.warn(err);
        this.uiService.handleError(err);
      });
    }
  }


  async sendReplay() {
    if (!(await this.sendPreCheck())) {
      return;
    }
    if (this.chatDescription) {
      this.currentUserDetail.description = this.chatDescription;
    }
    if (this.imageUrl) {
      this.currentUserDetail.imagePath = this.imageUrl;
    }
    this.currentUserDetail.refCode = this.viewPage;

    this._supportService.updateDetailData(apiUrl.igIssueDetailPublic, this.currentUserDetail).then((res: IgissueDetailDto) => {
      this.chatDescription = null;
      this.imageUrl = null;
      this.isUpload = true;
      this._supportService.getDetailMasterData(`${apiUrl.igIssueDetail}?where[refCode]=${this.viewPage}&order[code]=DESC`).then((res: IgissueDetailDto[]) => {
        this.issueDetails = res;
        this.refreshImage(this.issueDetails);
      })
    }, (err) => {
      // console.warn("ERRR===", err);
    })
  }

  async sendPreCheck(): Promise<boolean> {
    if (!this.chatDescription || this.chatDescription == "" || this.chatDescription.trim() == "") {
      this._messageService.add({ severity: "info", summary: "Info", detail: this._errorTranslateService.translate("messageNotNull") });
      return false;
    }
    return true;
  }

  onBasicUpload(event: any, code?: string) {
    this.imageUrl = event.originalEvent.body.fileName;
    this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate("fileuploadedSuccess") });
    if (this.imageUrl) {
      this.isUpload = false;
    }

  }


}
