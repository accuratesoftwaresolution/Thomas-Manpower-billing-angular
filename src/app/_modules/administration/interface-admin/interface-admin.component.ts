import { ErrorTranslateService, MasterService } from '@accurate/providers';
import { ActionService, AppBreadcrumbService, FormService, ICTFormPageBean } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IintDto } from 'src/app/_dto/iint.dto';
import { IintacconfigDto } from 'src/app/_dto/iintacconfig.dto';
import { IntrpttitleDto } from 'src/app/_dto/iintrpttitle.dto';
import { IintvrnoDto } from 'src/app/_dto/iintvrno.dto';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { InterfaceAdminService } from './interface-admin.service';

@Component({
  selector: 'app-interface-admin',
  templateUrl: './interface-admin.component.html',
  styleUrls: ['./interface-admin.component.scss']
})
export class InterfaceAdminComponent extends ICTFormPageBean implements OnInit {

  DIALOG_TITLE = "Interface Admin"
  API_END_URL = apiUrl.iint;
  PRIMARY_KEYS = ["coCode", "intCode"];
  key: string = "intCode";
  dateFields = ["intCloseDate"];
  searchPopupColumns = [
    { field: 'intCode', header: 'Interface Code', width: '3.5em' },
    { field: 'intName', header: 'Interface Name', width: '5em' },
    { field: 'windowName', header: 'Window Name', width: '3.5em' },
  ];
  pagination = true;

  // selectedIint: any = new IintDto();
  iintadminData: any;
  loading: boolean = false;
  selectedTabIndex: number = 0;
  isManager: boolean = false;

  constructor(
    private _interfaceAdminService: InterfaceAdminService,
    private breadcrumbService: AppBreadcrumbService,
    private _masterService: MasterService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    public actionService: ActionService,
    public service: FormService,
  ) {
    super(service, actionService);
    this.breadcrumbService.setItems([
      { label: 'Interface Admin', routerLink: ['/'] }
    ]);

    this.actionService.currentComponent = this;
    this.actionService.toolbarButton.createInsertRow = true;
    // this.actionService.toolbarButton.deleteRow = true;
    actionService.headerDto = IintDto;
  }

  ngOnInit(): void {
    this.service.header = new IintDto();
    // this.service.header.iintacconfig.push(new IintacconfigDto());
    // this.service.header.iintrpttitle.push(new IntrpttitleDto());

    // this.onInsert();
    this._masterService.getMasterData(apiUrl.iint).then(res => {
      this.iintadminData = res['data'];
    })
    this.createInsert();
  }

  onTabChange(event) {
    this.selectedTabIndex = event.index;
    if (event.index == 2) {
      this.actionService.detailDto = IintvrnoDto;
      this.actionService.detailPropertyName = "iintvrno";
    }
    if (event.index == 3) {
      this.actionService.detailDto = IntrpttitleDto;
      this.actionService.detailPropertyName = "iintrpttitle";
    }
    if (event.index == 4) {
      this.actionService.detailDto = IintacconfigDto;
      this.actionService.detailPropertyName = "iintacconfig";
    }
  }

  async postSearch() {
    this._interfaceAdminService.accDetails = this.service.header.iintacconfig;
    this._interfaceAdminService.rptDetails = this.service.header.iintrpttitle;
    this._interfaceAdminService.isUpdate = true;
    // if (this.service.header.windowName) {
    //   for (let i = 0; i < this.iintadminData.length; i++) {
    //     if (this.service.header.windowName.trim() === this.iintadminData[i].objectName.trim()) {
    //       this.service.header.objectDescription = this.iintadminData[i].objectDesc;
    //       break;
    //     }
    //   }
    // }
    // if (this.service.header.acCodeH) {
    //   for (let i = 0; i < this._iintService.iac4LovData.length; i++) {
    //     if (this.service.header.acCodeH.trim() === this._iintService.iac4LovData[i].value.trim()) {
    //       this.service.header.acCodeHName = this._iintService.iac4LovData[i].label;
    //       break;
    //     }
    //   }
    // }
    // if (this.service.header.acCodeD) {
    //   for (let i = 0; i < this._iintService.iac4LovData.length; i++) {
    //     if (this.service.header.acCodeD.trim() === this._iintService.iac4LovData[i].value.trim()) {
    //       this.service.header.acCodeDName = this._iintService.iac4LovData[i].label;
    //       break;
    //     }
    //   }
    // }
    // if (this.service.header.rptLogic) {
    //   for (let i = 0; i < this._iintService.iintlogicLovData.length; i++) {
    //     if (this.service.header.rptLogic.trim() === this._iintService.iintlogicLovData[i].value.trim()) {

    //       this.service.header.rptLogicName = this._iintService.iintlogicLovData[i].label;
    //       break;
    //     }
    //   }
    // }
    // if (this.service.header.intLogic) {
    //   for (let i = 0; i < this._iintService.iintlogicLovData.length; i++) {
    //     if (this.service.header.intLogic.trim() === this._iintService.iintlogicLovData[i].value.trim()) {
    //       this.service.header.intLogicName = this._iintService.iintlogicLovData[i].label;
    //       break;
    //     }
    //   }
    // }


  }

  async postCreateInsert() {
    this._interfaceAdminService.accDetails = [];
    this._interfaceAdminService.isUpdate = false;
  }

  async preSave(): Promise<boolean> {
    if (!this.service.header.intCode || this.service.header.intCode.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('iintCodecannotbeBlank') });
      return false;
    }

    if (!this.service.header.intName || this.service.header.intName.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('intNamecannotbeBlank') });
      return false;
    }

    if (!this.service.header.intLogic || this.service.header.intLogic.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('intlogiccannotbeBlank') });
      return false;
    }

    if (!this.service.header.menuLevel1 || this.service.header.menuLevel1 == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('menuLocationCantNull') });
      return false;
    }
    if (!this._interfaceAdminService.isUpdate) {
      for (let i = 0; i < this.iintadminData.length; i++) {
        if (this.service.header.intCode && this.service.header.intCode.trim() == this.iintadminData[i].intCode.trim()) {
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('duplicatePrimaryKey') });
          return false;
        }
      }
    }

    if (!this.service.header.intCode || this.service.header.intCode.length > 5) {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('intCodeLength') });
      return false;
    }

    if (this.service.header.iintacconfig && this.service.header.iintacconfig.length > 0) {
      for (let i = 0; i < this.service.header.iintacconfig.length; i++) {
        if (!this.service.header.iintacconfig[i].shortName || this.service.header.iintacconfig[i].shortName == "") {
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('shortNameCannotbeBlank') });
          return false;
        }
        if (!this.service.header.iintacconfig[i].signInt || this.service.header.iintacconfig[i].signInt.toString().trim() == "") {
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('signIntCannotbeBlank') });
          return false;
        }
        if (!this.service.header.iintacconfig[i].rate || this.service.header.iintacconfig[i].rate.toString().trim() == "") {
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('rateCannotbeBlank') });
          return false;
        }
      }
    }
    if (this.service.header.iintrpttitle && this.service.header.iintrpttitle.length > 0) {
      for (let i = 0; i < this.service.header.iintrpttitle.length; i++) {
        if (!this.service.header.iintrpttitle[i].rptTitle || this.service.header.iintrpttitle[i].rptTitle == "") {
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('rptTitleCannotbeBlank') });
          return false;
        }
      }
    }

    this.service.header.iintacconfig = this._interfaceAdminService.deletedDetailRows.concat(Object.assign([], this.service.header.iintacconfig));
    this.service.header.iintrpttitle = this._interfaceAdminService.rptDeletedDetailRows.concat(Object.assign([], this.service.header.iintrpttitle));
    return true;
  }

}
