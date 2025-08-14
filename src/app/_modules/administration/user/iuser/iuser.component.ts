import { LangaugeTranslateService } from '@accurate/providers';
import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { IuserDto } from 'src/app/_dto/iuser.dto';
import { LovDto } from 'src/app/_dto/lov/lov.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuser',
  templateUrl: './iuser.component.html',
  styleUrls: ['./iuser.component.scss']
})
export class IuserComponent implements OnInit {


  @Input('parentData') public isRac;
  @Input('parentData1') public isDisable;

  yesNoLovData: LovDto[] = [
    { label: this._lang.first("dropDownDefaultMsg"), value: "" },
    { label: this._lang.first("yes"), value: 'Y' },
    { label: this._lang.first("no"), value: 'N' }
  ];

  saleRateLovData: LovDto[] = [
    { label: this._lang.first("SaleRate1"), value: '1' },
    { label: this._lang.first("SaleRate2"), value: '2' },
    { label: this._lang.first("SaleRate3"), value: '3' },
    { label: this._lang.first("SaleRate4"), value: '4' },
    { label: this._lang.first("na"), value: 'N' }
  ];

  DatedEditLovData: LovDto[] = [
    { label: this._lang.first("systemDate"), value: 'S' },
    { label: this._lang.first("anyDate"), value: 'A' }
  ];

  accountRightsLovData: LovDto[] = [
    { label: this._lang.first("allAccount"), value: 'A' },
    { label: this._lang.first("subledger"), value: 'S' }
  ];

  userModeLovData: LovDto[] = [
    { label: this._lang.first("single-User"), value: 'S' },
    { label: this._lang.first("multi-User"), value: 'M' },
  ];

  iuserIdLovData: IuserDto[] = [];
  iuserGroupLovData: IuserDto[] = [];
  iuserLovCols = [
    { field: 'userId', header: 'User Id', width: '30%' },
    { field: 'userName', header: 'User Name', width: '70%' }
  ];

  disableLov: boolean = true;

  constructor(
    public service: FormService,
    public actionService: ActionService,
    public popUpService: PopUpLovService,
    private _lang: LangaugeTranslateService
  ) { }

  ngOnInit(): void {
    this.initializeLov();
  }

  isDisabled(value) {
    if (value == "Y") {
      this.disableLov = false;
    }
    else {
      this.disableLov = true;
      this.service.header.userGroup = null;
    }
  }

  async onUserGroupLov() {
    const ref = this.actionService.showPopUp(this.iuserGroupLovData, this.iuserLovCols);
    ref.onClose.subscribe((selectedRow: IuserDto) => {
      if (selectedRow) {
        this.service.header.userGroup = selectedRow.userId;
        this.service.header.acFilter = selectedRow.acFilter;
        this.service.header.allBrRight = selectedRow.allBrRight;
        this.service.header.acRight = selectedRow.acRight;
        this.service.header.allCoRight = selectedRow.allCoRight;
        this.service.header.approvingUserid = selectedRow.approvingUserid;
        this.service.header.backEntDay = selectedRow.backEntDay;
        this.service.header.backEntRestYn = selectedRow.backEntRestYn;
        this.service.header.belowCost = selectedRow.belowCost;
        this.service.header.canVrEdit = selectedRow.canVrEdit;
        this.service.header.corDay = selectedRow.corDay;
        this.service.header.corRestYn = selectedRow.corRestYn;
        this.service.header.crLimit = selectedRow.crLimit;
        this.service.header.duplicateItem = selectedRow.duplicateItem;
        this.service.header.finalizationYn = selectedRow.finalizationYn;
        this.service.header.messageOnQuit = selectedRow.messageOnQuit;
        this.service.header.msgCloseDelay = selectedRow.msgCloseDelay;
        this.service.header.negativeIssue = selectedRow.negativeIssue;
        this.service.header.otherPrivilages = selectedRow.otherPrivilages;
        this.service.header.pwdExpDays = selectedRow.pwdExpDays;
        this.service.header.salVisible = selectedRow.salVisible;
        this.service.header.secuLevel = selectedRow.secuLevel;
        this.service.header.showCost = selectedRow.showCost;
        this.service.header.userMode = selectedRow.userMode;
        this.service.header.verifiedVrEdit = selectedRow.verifiedVrEdit;
        this.service.header.vrDtAllowed = selectedRow.vrDtAllowed;
        this.service.header.windowstate = selectedRow.windowstate;
      }
    });
  }

  async onUserIdLov() {
    const ref = this.actionService.showPopUp(this.iuserIdLovData, this.iuserLovCols);
    ref.onClose.subscribe((selectedRow: IuserDto) => {
      if (selectedRow) {
        this.service.header.approvingUserid = selectedRow.userId;
      }
    });
  }

  async initializeLov() {
    await this.popUpService.getUserGroupLov().then(data => {
      this.iuserGroupLovData = data
    }, (err) => {
      // console.warn("==error=", err.error.message);
    });

    await this.popUpService.getUserIdLov().then(data => {
      this.iuserIdLovData = data.data
    }, (err) => {
      // console.warn("==error=", err.error.message);
    });
  }

}
