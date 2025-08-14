import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, FormService, ICTFormPageBean, Toast } from '@accurate/toolbar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { IcsalesmanDto } from 'src/app/_dto/icsalesman.dto';
import { Iigrp1Dto } from 'src/app/_dto/iigrp1.dto';
import { Iigrp2Dto } from 'src/app/_dto/iigrp2.dto';
import { Iigrp3Dto } from 'src/app/_dto/iigrp3.dto';
import { Iigrp4Dto } from 'src/app/_dto/iigrp4.dto';
import { Iigrp5Dto } from 'src/app/_dto/iigrp5.dto';
import { Iigrp6Dto } from 'src/app/_dto/iigrp6.dto';
import { Iigrp7Dto } from 'src/app/_dto/iigrp7.dto';
import { Iigrp8Dto } from 'src/app/_dto/iigrp8.dto';
import { IuserDto } from 'src/app/_dto/iuser.dto';
import { IusercorightsDto } from 'src/app/_dto/iusercorights.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { IuserpwdDto } from 'src/app/_dto/iuserpwd.dto';
import { IbrService } from 'src/app/_providers/ibr.service';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends ICTFormPageBean implements OnInit {

  DIALOG_TITLE = "User Master"
  API_END_URL = apiUrl.userMaster;
  PRIMARY_KEYS = ["coCode", "userId"];
  key: string = "userId";
  rightsKey: string = "brCode";
  selectedRow: any;
  groupKey: string = "code";
  selectedTabIndex: number = 0;
  pagination: boolean=true;
 


  @ViewChild(Table) dt: Table;
  searchPopupColumns = [
    { field: 'userId', header: 'User Id', width: '2em' },
    { field: 'userName', header: 'User Name', width: '4em' },
    { field: 'userGroup', header: 'User Group', width: '2em' },
  ];


  columns: {
    field: string; header: string; width: string, disabled?: boolean, disableAfterSave?: boolean, type?: string,
    data?: SelectItem[], lovData?: any[], lovColumn?: { field: string, header: string, width: string }[], lovColModify?: { popUpCol: string, modColumn: string }[]
  }[] = [];

  iuserLovData: IuserDto[] = [];
  iigrp1LovData: Iigrp1Dto[] = [];
  iigrp2LovData: Iigrp2Dto[] = [];
  iigrp3LovData: Iigrp3Dto[] = [];
  iigrp4LovData: Iigrp4Dto[] = [];
  iigrp5LovData: Iigrp5Dto[] = [];
  iigrp6LovData: Iigrp6Dto[] = [];
  iigrp7LovData: Iigrp7Dto[] = [];
  iigrp8LovData: Iigrp8Dto[] = [];

  branchRights: IusercorightsDto[];

  salesmanRight: IcsalesmanDto[];
  grp1Right: Iigrp1Dto[];
  grp2Right: Iigrp2Dto[];
  grp3Right: Iigrp3Dto[];
  grp4Right: Iigrp4Dto[];
  grp5Right: Iigrp5Dto[];
  grp6Right: Iigrp6Dto[];
  grp7Right: Iigrp7Dto[];
  grp8Right: Iigrp8Dto[];

  isDisable: boolean = true;
  isRac: boolean = true;

  constructor(
    public service: FormService,
    public actionService: ActionService,
    public popUpService: PopUpLovService,
    public branchService: IbrService,
    private _messageService:MessageService,
    private _errorTanslateService:ErrorTranslateService
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    actionService.headerDto = IuserDto;

    actionService.detailDto = IusercorightsDto;
    actionService.detailPropertyName = "iusercorights";
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.service.header = new IuserDto();
    this.initialize();
  }

  async preSave(): Promise<boolean> {
    if (!this.service.header.userId || this.service.header.userId == "") {
      await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("userIdcannotbeBlank") });
      return false;
    }
    if (!this.service.header.userName || this.service.header.userName == "") {
      await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("userNamecannotbeBlank") });
      return false;
    }
    if (!this.service.header.password || this.service.header.password == "") {
      await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("userPasswordcannotbeBlank") });
      return false;
    }
    if (!this.service.header.confirmPass || this.service.header.confirmPass == "") {
      await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("userConfirmPasswordcannotbeBlank") });
      return false;
    }
    if (this.service.header.userGroupYn == "Y" && this.service.header.userGroup == null) {
      await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("userGroupCannotbeblank") });
      return false;
    }
    if (this.isDisable == false) {
      for (let i = 0; i < this.iuserLovData.length; i++) {
        if (this.service.header.userId.trim().toUpperCase() == this.iuserLovData[i].userId.trim().toUpperCase()) {
          await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("duplicatePrimaryKey") });
          return false;
        }
      }
    }
    if ((this.service.header.password || this.service.header.confirmPass) && (this.service.header.password.trim() != this.service.header.confirmPass.trim())) {
      await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("confirmPasswpordisnotmatchingwiththepassword") });
      return false;
    }
    if (this.service.header.iusercorights) {
      for (let i = 0; i < this.service.header.iusercorights.length; i++) {
        if (!this.service.header.iusercorights[i].dvCode) {
          await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("divisioncannotbeblankinBranchRighttab") });
          return false;
        }
      }
      for (let i = 0; i < this.service.header.iusercorights.length; i++) {
        if (!this.service.header.iusercorights[i].brCode) {
          await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("branchcannotbeblankinBranchRighttab") });
          return false;
        }
      }
    }
    for (let i = 0; i < this.salesmanRight.length; i++) {
      if (!this.salesmanRight[i].code || this.salesmanRight[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinSalesmanRighttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp1Right.length; i++) {
      if (!this.grp1Right[i].code || this.grp1Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP1Righttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp2Right.length; i++) {
      if (!this.grp2Right[i].code || this.grp2Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP2Righttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp3Right.length; i++) {
      if (!this.grp3Right[i].code || this.grp3Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP3Righttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp4Right.length; i++) {
      if (!this.grp4Right[i].code || this.grp4Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP4Righttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp5Right.length; i++) {
      if (!this.grp5Right[i].code || this.grp5Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP5Righttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp6Right.length; i++) {
      if (!this.grp6Right[i].code || this.grp6Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP6Righttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp7Right.length; i++) {
      if (!this.grp7Right[i].code || this.grp7Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP7Righttab") });
        return false;
      }
    }
    for (let i = 0; i < this.grp8Right.length; i++) {
      if (!this.grp8Right[i].code || this.grp8Right[i].code == null) {
        await this._messageService.add({ severity: 'info', summary: 'User Master', detail: this._errorTanslateService.translate("codecannotbeblankinGRP8Righttab") });
        return false;
      }
    }

    if (this.service.header.password && this.service.header.password.trim() != "********") {
      this.service.header.pass = this.service.header.password.trim();
    }
    // this.service.header.userId = this.service.header.userId.toUpperCase().trim();
    this.service.header.userId = this.service.header.userId.toUpperCase();
    this.service.header["iuserotherrights"] = [];
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.salesmanRight);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp1Right);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp2Right);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp3Right);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp4Right);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp5Right);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp6Right);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp7Right);
    this.service.header["iuserotherrights"] = await this.service.header["iuserotherrights"].concat(this.grp8Right);
    return true;
  }

  async postSearch(): Promise<void> {
    super.postSearch();
    this.isDisable = true;
    this.service.header.confirmPass = "********";
    this.service.header.password = "********";

    this.salesmanRight = this.service.header.iuserotherrights.filter(row => row.type == "SALESMAN");
    this.grp1Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP1");
    this.grp2Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP2");
    this.grp3Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP3");
    this.grp4Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP4");
    this.grp5Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP5");
    this.grp6Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP6");
    this.grp7Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP7");
    this.grp8Right = this.service.header.iuserotherrights.filter(row => row.type == "GRP8");

    if (this.service.header.iusercorights) {
      for (let i = 0; i < this.service.header.iusercorights.length; i++) {
        await this.branchService.getBrDetails(this.service.header.iusercorights[0].brCode).then((data) => {
          this.service.header.iusercorights[i].brName = data.brName;
        })
      }
    }
    if (this.service.header.iuserpwd.length > 0) {
      for (let i = 0; i < this.service.header.iuserpwd.length; i++) {
        this.service.header.iuserpwd[i].oldPwd = '*******';
        this.service.header.iuserpwd[i].newPwd = '*******';
      }
    }
    if (this.salesmanRight) {
      for (let i = 0; i < this.salesmanRight.length; i++) {
        await this.popUpService.getSalesmanLovWithFilter(this.salesmanRight[i].code)
          .then((data) => {
            this.salesmanRight[i].name = data[0].name;
          }, (err) => {
            // console.warn("--err--", err.error.message);
          })
      }
    }
    if (this.grp1Right) {
      for (let i = 0; i < this.grp1Right.length; i++) {
        for (let j = 0; j < this.iigrp1LovData.length; j++) {
          if (this.grp1Right[i].code.trim() == this.iigrp1LovData[j].code.trim()) {
            this.grp1Right[i].name = this.iigrp1LovData[j].name;
            break;
          }
        }
      }
    }
    if (this.grp2Right) {
      for (let i = 0; i < this.grp2Right.length; i++) {
        for (let j = 0; j < this.iigrp2LovData.length; j++) {
          if (this.grp2Right[i].code.trim() == this.iigrp2LovData[j].code.trim()) {
            this.grp2Right[i].name = this.iigrp2LovData[j].name;
            break;
          }
        }
      }
    }
    if (this.grp3Right) {
      for (let i = 0; i < this.grp3Right.length; i++) {
        for (let j = 0; j < this.iigrp3LovData.length; j++) {
          if (this.grp3Right[i].code.trim() == this.iigrp3LovData[j].code.trim()) {
            this.grp3Right[i].name = this.iigrp3LovData[j].name;
            break;
          }
        }
      }
    }
    if (this.grp4Right) {
      for (let i = 0; i < this.grp4Right.length; i++) {
        for (let j = 0; j < this.iigrp4LovData.length; j++) {
          if (this.grp4Right[i].code.trim() == this.iigrp4LovData[j].code.trim()) {
            this.grp4Right[i].name = this.iigrp4LovData[j].name;
            break;
          }
        }
      }
    }
    if (this.grp5Right) {
      for (let i = 0; i < this.grp5Right.length; i++) {
        for (let j = 0; j < this.iigrp5LovData.length; j++) {
          if (this.grp5Right[i].code.trim() == this.iigrp5LovData[j].code.trim()) {
            this.grp5Right[i].name = this.iigrp5LovData[j].name;
            break;
          }
        }
      }
    }
    if (this.grp6Right) {
      for (let i = 0; i < this.grp6Right.length; i++) {
        for (let j = 0; j < this.iigrp6LovData.length; j++) {
          if (this.grp6Right[i].code.trim() == this.iigrp6LovData[j].code.trim()) {
            this.grp6Right[i].name = this.iigrp6LovData[j].name;
            break;
          }
        }
      }
    }
    if (this.grp7Right) {
      for (let i = 0; i < this.grp7Right.length; i++) {
        for (let j = 0; j < this.iigrp7LovData.length; j++) {
          if (this.grp7Right[i].code.trim() == this.iigrp7LovData[j].code.trim()) {
            this.grp7Right[i].name = this.iigrp7LovData[j].name;
            break;
          }
        }
      }
    }
    if (this.grp8Right) {
      for (let i = 0; i < this.grp8Right.length; i++) {
        for (let j = 0; j < this.iigrp8LovData.length; j++) {
          if (this.grp8Right[i].code.trim() == this.iigrp8LovData[j].code.trim()) {
            this.grp8Right[i].name = this.iigrp8LovData[j].name;
            break;
          }
        }
      }
    }
  }

  async postCreateInsert(): Promise<void> {
    this.salesmanRight = this.grp1Right = this.grp2Right = this.grp3Right = this.grp4Right = this.grp5Right = this.grp6Right = this.grp7Right = this.grp8Right = [];
    this.isDisable = false;
  }

  onTabChange(event) {
    this.selectedTabIndex = event.index;
    if (event.index == 1) {
      this.actionService.detailDto = IusercorightsDto;
      this.actionService.detailPropertyName = "iusercorights";
    }
    if (event.index == 2) {
      this.actionService.detailDto = IuserpwdDto;
      this.actionService.detailPropertyName = "iuserpwd";
    }
    if (event.index == 3 || event.index == 4 || event.index == 5 || event.index == 6 ||
      event.index == 7 || event.index == 8 || event.index == 9 || event.index == 10 || event.index == 11) {
      this.actionService.detailDto = IuserotherrightsDto;
      this.actionService.detailPropertyName = "iuserotherrights";
    }
  }

  async initialize(): Promise<any> {
    await this.popUpService.getUserIdLov().then(data => {
      this.iuserLovData = data
    }, (err) => {
      // console.warn("==error=", err.error.message);
    });
    await this.popUpService.getGrp1Lov().then(data => {
      this.iigrp1LovData = data;
    });
    await this.popUpService.getGrp2Lov().then(data => {
      this.iigrp2LovData = data;
    });
    await this.popUpService.getGrp3Lov().then(data => {
      this.iigrp3LovData = data;
    });
    await this.popUpService.getGrp4Lov().then(data => {
      this.iigrp4LovData = data;
    });
    await this.popUpService.getGrp5Lov().then(data => {
      this.iigrp5LovData = data;
    });
    await this.popUpService.getGrp6Lov().then(data => {
      this.iigrp6LovData = data;
    });
    await this.popUpService.getGrp7Lov().then(data => {
      this.iigrp7LovData = data;
    });
    await this.popUpService.getGrp8Lov().then(data => {
      this.iigrp8LovData = data;
    });
  }
}
