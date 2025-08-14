import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { AuthService, ErrorTranslateService, LangaugeTranslateService, MasterService, MenuService } from '@accurate/providers';
import { ToolbarService } from '@accurate/toolbar';
import { MasterDesignService, UiService } from '@accurate/ui';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { IgissueDetailDto } from 'src/app/_dto/igissue-detail.dto';
import { IgissueSummaryDto } from 'src/app/_dto/igissue-summary.dto';
import { RegisteredIssueService } from 'src/app/_providers/registered-issue.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-registered-issues-view',
  templateUrl: './registered-issues-view.component.html',
  styleUrls: ['./registered-issues-view.component.scss']
})
export class RegisteredIssuesViewComponent implements OnInit {

  titleCode: string = "registeredIssues";
  helpCode: string = "registeredIssuesHelp";
  loading: boolean = false;
  isUpdate: boolean = false;
  disabled: boolean = true;
  isVisible: boolean = true;
  basicUrl: string = environment.apiUrl;
  dataKey: string = 'code';
  showImage: boolean = false;
  image: any;
  isClose: boolean = false;
  dialogMsgs: Message[] = [];
  issueSummery: FormAlignerDto[] = [];
  paymentDetail: FormAlignerDto[] = [];
  buttonMetaData: FormAlignerDto[] = [];
  issueDetails: IgissueDetailDto[];
  selectedIssueDetails: IgissueDetailDto;
  statusList: SelectItem[] = [];
  assignedToList: SelectItem[] = [];
  priorityList: SelectItem[] = [];
  sendData = [];
  isSuperUser: boolean = false;
  dateTim;
  dateFields: string[] = ["createdDate", "modifiedDate"];
  chatOpen: boolean = false;
  @Input('id') id: string;
  @Input('viewIssue') viewIssue: boolean;
  @Output() public exit = new EventEmitter();

  constructor(
    public _issueService: RegisteredIssueService,
    public _lang: LangaugeTranslateService,
    public _menuService: MenuService,
    private _masterService: MasterService,
    public _masterdesignService: MasterDesignService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    private _ui: UiService,
    private _authService: AuthService
  ) {
    this.getColumnInfo();
    this.dateTim = new Date();
  }

  ngOnInit(): void {

    this._issueService.header = new IgissueSummaryDto();
    this.selectedIssueDetails = new IgissueDetailDto();
    if (this.id) {
      this.isUpdate = true;
      this.isVisible = true;
      this.getSelectedIssue(this.id);
    }
    this._authService.getUserInfo().then((res: any) => {
      if (res.userType == 'N') {
        this._issueService.notSuperUser = true
      }
    })

  }


  async getSelectedIssue(id: string) {
    if (id) {
      this.selectedIssueDetails.developerYn = 'Y';
      await this._issueService.getDetailData(apiUrl.igIssueDetail, id, this.selectedIssueDetails.developerYn).then((res) => {
      }, (err) => {
        // console.warn("Error", err);
      })
      await this._issueService.getSummaryMasterData(apiUrl.issuetracker, id).then((res: IgissueSummaryDto) => {
        this.loading = false;
        this._issueService.header = res;
        if (this._issueService.header.status == 'H') {
          this._issueService.header.hold = 'Y'
        } else {
          this._issueService.header.hold = null
        }
        this._issueService.header.identifiedDate = this._ui.transformDate(res.identifiedDate);
        this._issueService.header.targetResolutionDate = this._ui.transformDate(res.targetResolutionDate);
        this._issueService.header.actualResolutionDate = this._ui.transformDate(res.actualResolutionDate);
        this.refreshImage(this._issueService.header.igissueDetailDto);
      }, (err) => {
        // console.warn("errr--", err);
      })
      await this._issueService.getDetailMasterData(`${apiUrl.igIssueDetail}?where[refCode]=${id}&order[code]=DESC`).then((res: IgissueDetailDto[]) => {
        this.issueDetails = res;
      this.refreshImage(this.issueDetails);
        this.dateFields.forEach(row => {
          res[row] = this._ui.transformDate(res[row], 'yyyy-MM-dd');
        });
      })
    }
  }

  goBackToList() {
    this.exit.emit({});
  }

  onBasicUpload(event: any, code?: string) {
    this.selectedIssueDetails.imagePath = event.originalEvent.body.fileName;
    this._messageService.add({ severity: 'success', summary: 'Success', detail: this.getErrorMessage("fileuploadedSuccess") });
  }

  downloadImage(imagePath) {
    if (imagePath) {
      if (this._issueService.header.source == 'feedback') {
        this._issueService.getImg(apiUrl.fileUpload, imagePath).then((res: any) => {
          saveAs(res, this._issueService.header.identifiedBy)
        }, (err) => {
          this._messageService.add({ severity: 'info', summary: 'Info', detail: "Image Not Found" });
          // console.warn("==er====", err);
        });
      } else {
        this._issueService.getImg(apiUrl.fileUpload, imagePath).then((res: any) => {
          saveAs(res, this._issueService.header.identifiedBy)
        }, (err) => {
          this._messageService.add({ severity: 'info', summary: 'Info', detail: "Image Not Found" });
          // console.warn("==er====", err);
        });
      }
    } else {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: "No Image Uploaded By User" });
    }
  }

  async getColumnInfo() {
    this.issueSummery = [
      {
        type: 'group', size: 12, groupColumnMetaData: [
          { columnName: 'name', size: 3, labelCode: 'name', isDisabled: true },
          { columnName: 'identifiedByEmail', size: 3, labelCode: 'identifiedByEmail', isDisabled: true },
          { columnName: 'identifiedDate', size: 3, labelCode: 'identifiedDate', type: 'date', isDisabled: true },
          { columnName: 'source', size: 3, labelCode: 'source', isDisabled: true },
          { columnName: 'summary', size: 12, labelCode: 'subject', isDisabled: true },
          { columnName: 'targetResolutionDate', size: 3, labelCode: 'targetCompleteDate', type: 'date' },
          { columnName: 'priority', size: 3, labelCode: 'priority', type: 'dropdown', data: () => this.priorityList },
          { columnName: 'progress', size: 3, labelCode: 'devRemarks', type: 'textarea' },
          { columnName: 'assignedTo', size: 3, labelCode: 'assignedTo', type: 'dropdown', data: () => this.assignedToList, valueChange: (event) => this.developerValueChange(event), hidden: () => this._issueService.notSuperUser },
          { columnName: 'actualResolutionDate', size: 3, labelCode: 'actualCompleteDate', type: 'datetime', isDisabled: true, hidden: () => this.checkStatus() },
          { columnName: 'resolutionSummary', size: 9, labelCode: 'issueRemarks', mandatory: true, hidden: () => this.checkStatus() },
          { columnName: 'hold', size: 9, labelCode: 'hold', type: 'check', hidden: () => this.isWip(), valueChange: (event) => this.holdWork(event), },
        ]
      }
    ];

    // this.paymentDetail = [
    //   {
    //     type: 'group', size: 12, groupColumnMetaData: [
    //       { columnName: 'refCode', size: 6, labelCode: 'refCode', type: 'number', disableExpression: () => this.isUpdate },
    //       { columnName: 'description', size: 12, labelCode: 'description', type: 'dropdown', data: () => this.statusList, disableExpression: () => this.isUpdate },
    //       { columnName: 'seen', size: 6, labelCode: 'seen' },
    //       { columnName: 'imagePath', size: 6, labelCode: 'imagePath' },
    //     ]
    //   }
    // ];

    this._issueService.getDataInLovFormat(apiUrl.igdeveloper, 2, null, null, null).then(res => {
      this.assignedToList = res;
    }, (err) => {
      // console.warn("==err==", err);
    });

    this.statusList = [
      { label: this._lang.first("open"), labelPl: this._lang.first("open"), labelSl: this._lang.second("open"), value: "O" },
      { label: this._lang.first("wip"), labelPl: this._lang.first("wip"), labelSl: this._lang.second("wip"), value: "W" },
      { label: this._lang.first("hold"), labelPl: this._lang.first("hold"), labelSl: this._lang.second("hold"), value: "H" },
      { label: this._lang.first("closed"), labelPl: this._lang.first("closed"), labelSl: this._lang.second("closed"), value: "C" },
      { label: this._lang.first("cancelled"), labelPl: this._lang.first("cancelled"), labelSl: this._lang.second("cancelled"), value: "CN" },
    ];

    this.priorityList = [
      { label: this._lang.first("low"), labelPl: this._lang.first("low"), labelSl: this._lang.second("low"), value: "L" },
      { label: this._lang.first("medium"), labelPl: this._lang.first("medium"), labelSl: this._lang.second("medium"), value: "M" },
      { label: this._lang.first("high"), labelPl: this._lang.first("high"), labelSl: this._lang.second("high"), value: "H" },
    ]
  }

  async sendPreCheck(): Promise<boolean> {
    if (!this.selectedIssueDetails.description || this.selectedIssueDetails.description == "" || this.selectedIssueDetails.description.trim() == "") {
      return false;
    }
    return true;
  }

  developerValueChange(event) {
    if (this._issueService.header.assignedTo != 0) {
      this._issueService.header.status = 'W';
    } else {
      this._issueService.header.status = 'O';
    }
  }

  viewImage(imageData: any) {
    this.image = imageData;
    
    this.showImage = true;

  }

  async sendReplay() {
    if (!(await this.sendPreCheck())) {
      return;
    }
    if (this._issueService.header.code) {
      this.selectedIssueDetails.refCode = this._issueService.header.code;
    }
    await this._issueService.updateDetailData(apiUrl.igIssueDetail, this.selectedIssueDetails).then((res: IgissueDetailDto) => {
      ;
      this.sendData.push(res);
      this.selectedIssueDetails.description = null;
      this._issueService.getDetailMasterData(`${apiUrl.igIssueDetail}?where[refCode]=${this.selectedIssueDetails.refCode}&order[code]=DESC`).then((res: IgissueDetailDto[]) => {
        this.issueDetails = res;
        this._issueService.header.igissueDetailDto = res

        this.refreshImage(this._issueService.header.igissueDetailDto);
      })
    }, (err) => {
      // console.warn("ERRR===", err);
    })
  }
  checkStatus() {
    if (this._issueService.header.status == 'C') {
      return false;
    } else {
      return true;
    }
  }

  isWip() {
    if (this._issueService.header.status == 'W' || this._issueService.header.status == 'H') {
      return false;
    } else {
      return true;
    }
  }
  holdWork(event) {
    if (event.checked == true) {
      this._issueService.header.status = 'H'
    } else {
      this._issueService.header.status = 'W'
    }
  }

  getErrorMessage(code: string): string {
    return this._errorTranslateService.translate(code);
  }

  images: any = {};

  refreshImage(masterDatas: any) {
    if (masterDatas)
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
      this._issueService.getImg(apiUrl.fileUpload, imgName).then((res: any) => {
        let variable = (image) => this.images[code] = image;
        this._ui.createImageFromBlob(res, variable);
      }, (err) => {
        // console.warn("==er====", err);
        this.images[code] = "/assets/acccurate/images/image-not-found.jpg";
      });
    }
  }
  async preSave(): Promise<boolean> {
    if (this.isClose == true) {
      if (!this._issueService.header.resolutionSummary || this._issueService.header.resolutionSummary == "") {
        this._messageService.add({ severity: 'info', summary: 'Info', detail: this.getErrorMessage('remarksNotNull') });
        return false;
      }
    }
    return true
  }

  async save() {
    if (!(await this.preSave())) {
      return;
    }
    if (this.issueDetails) {
      this._issueService.header.igissueDetailDto = this.issueDetails;
    }
    this._issueService.updateMasterData(apiUrl.issuetracker, this._issueService.header).then(res => {
      this._messageService.add({ severity: 'success', summary: 'Success', detail: this.getErrorMessage('issueDetailsUpdated') });
    }, (err) => {
      // console.warn("==err==", err);
    })
  }

  close() {
    this.isClose = true;
    this._issueService.header.status = 'C';
    this._issueService.header.actualResolutionDate = new Date();
  }

  cancelIssue() {
    this._issueService.header.status = 'CN';
  }

  cancel() {
    if (this._issueService.header.assignedTo != 0) {
      this._issueService.header.status = 'W';
    } else {
      this._issueService.header.status = 'O';
    }

    this._issueService.header.resolutionSummary = null;
    this._issueService.header.actualResolutionDate = new Date();
    this.isClose = false;
  }

  getStatus(code: string) {
    const status: any = this.statusList.find((row) => row.value == code);
    return status?.label;
  }

  openChat() {
    this.chatOpen = true;
  }

}
