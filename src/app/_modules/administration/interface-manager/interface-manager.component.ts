import { IintDto } from 'src/app/_dto/iint.dto';
import { ErrorTranslateService, MasterService } from '@accurate/providers';
import { ActionService, AppBreadcrumbService, FormService, ICTFormPageBean } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IintacconfigDto } from 'src/app/_dto/iintacconfig.dto';
import { IntrpttitleDto } from 'src/app/_dto/iintrpttitle.dto';
import { IintvrnoDto } from 'src/app/_dto/iintvrno.dto';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { InterfaceAdminService } from '../interface-admin/interface-admin.service';

@Component({
  selector: 'app-interface-manager',
  templateUrl: './interface-manager.component.html',
  styleUrls: ['./interface-manager.component.scss']
})
export class InterfaceManagerComponent extends ICTFormPageBean implements OnInit {


  DIALOG_TITLE = "Interface Manager"
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
  isManager: boolean = true;

  constructor(
    private _interfaceAdminService: InterfaceAdminService,
    private breadcrumbService: AppBreadcrumbService,
    private _masterService: MasterService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    public actionService: ActionService,
    public service: FormService
  ) {
    super(service, actionService);
    this.breadcrumbService.setItems([
      { label: 'Interface Admin', routerLink: ['/'] }
    ]);

    this.actionService.currentComponent = this;
    this.actionService.toolbarButton.createInsertRow = true;
    // this.actionService.toolbarButton.deleteRow = true;
    actionService.headerDto = IintDto;
    
    this.createInsert();
  }

  ngOnInit(): void {
    this.service.header = new IintDto();

    this._masterService.getMasterData(apiUrl.iint).then(res => {
      this.iintadminData = res['data'];
    })
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
  }

  async postCreateInsert() {
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