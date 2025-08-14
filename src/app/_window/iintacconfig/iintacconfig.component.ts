
import { SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { ActionService, FormService } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IintacconfigDto } from 'src/app/_dto/iintacconfig.dto';
import { InterfaceAdminService } from 'src/app/_modules/administration/interface-admin/interface-admin.service';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-iintacconfig',
  templateUrl: './iintacconfig.component.html',
  styleUrls: ['./iintacconfig.component.scss']
})
export class IintacconfigComponent implements OnInit {

  productDialog: boolean;
  drCrLovData: SelectItem[] = [];
  rateLovData: SelectItem[] = [];
  setupLovData: SelectItem[] = [];
  // searchDisplay: boolean = false;

  constructor(
    public actionService: ActionService,
    public service: FormService,
    private _lang: LangaugeTranslateService,
    private _ui: UiService,
    public popUpLovService: PopUpLovService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    public _mainService: InterfaceAdminService
  ) { }

  ngOnInit(): void {
    // this.accDetails = this.service.header.iintacconfig;
    this.getLovData();
  }

  openNew() {
    this.actionService.currentComponent.createInsertRow()
    this.service.selectedDetailRow = new IintacconfigDto();
    this.productDialog = true;
  }

  editProduct(product: any) {
    this.service.selectedDetailRow = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any, ri: number) {
    if (product.crud == "I") {
      this.service.header.iintacconfig.splice(ri, 1);
      return;
    }
    const removeRow = Object.assign({}, this.service.header.iintacconfig.splice(ri, 1)[0]);
    removeRow.crud = 'D';
    this._mainService.deletedDetailRows.push(removeRow);
    this._messageService.add({ severity: 'success', summary: 'success', detail: this._errorTranslateService.translate('rowDeleteSuccessMsg') });
  }

  hideDialog() {
    // this.service.header.iintacconfig.push(this.updateAc);
    this._mainService.accDetails = [...this.service.header.iintacconfig];
    this.productDialog = false;
  }

  saveDetail(data) {
    if (!this.service.selectedDetailRow.shortName || this.service.selectedDetailRow.shortName == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('defAcCannotbeBlank') });
      return false;
    }
    if (!this.service.selectedDetailRow.signInt || this.service.selectedDetailRow.signInt.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('signIntCannotbeBlank') });
      return false;
    }
    if (!this.service.selectedDetailRow.rate || this.service.selectedDetailRow.rate.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('rateCannotbeBlank') });
      return false;
    }

    if (this.service.selectedDetailRow.shortName) {
      this.service.header.iintacconfig[this.findIndexById(this.service.selectedDetailRow.shortName)] = this.service.selectedDetailRow;
      this._messageService.add({ severity: 'success', summary: 'success', detail: this._errorTranslateService.translate('rowSaveSuccessMsg') });
    }
    else {
      this.service.header.iintacconfig.push(this.service.selectedDetailRow);
      this._messageService.add({ severity: 'success', summary: 'success', detail: this._errorTranslateService.translate('rowSaveSuccessMsg') });
    }
    this._mainService.accDetails = [...this.service.header.iintacconfig];
    this.productDialog = false;
    this.service.selectedDetailRow = new IintacconfigDto();
  }

  findIndexById(id: any): number {
    let index = -1;
    for (let i = 0; i < this.service.header.iintacconfig.length; i++) {
      if (this.service.header.iintacconfig[i].shortName == id) {
        index = i;
        break;
      }
    }
    return index;
  }

  getLovData() {
    this.drCrLovData = [
      { label: this._lang.first("Dr"), labelPl: this._lang.first("Dr"), labelSl: this._lang.second("Dr"), value: 1 },
      { label: this._lang.first("Cr"), labelPl: this._lang.first("Cr"), labelSl: this._lang.second("Cr"), value: -1 },
    ];

    this.rateLovData = [
      { label: this._lang.first("baseRate"), labelPl: this._lang.first("baseRate"), labelSl: this._lang.second("baseRate"), value: "BASE_RATE" },
      { label: this._lang.first("costRate"), labelPl: this._lang.first("costRate"), labelSl: this._lang.second("costRate"), value: "COST_RATE" },
      { label: this._lang.first("itemRate"), labelPl: this._lang.first("itemRate"), labelSl: this._lang.second("itemRate"), value: "ITEM_RATE" },
      { label: this._lang.first("balance"), labelPl: this._lang.first("balance"), labelSl: this._lang.second("balance"), value: "BALANCE" },
      { label: this._lang.first("vat"), labelPl: this._lang.first("vat"), labelSl: this._lang.second("vat"), value: "VAT" },
    ];
    this._ui.getDataInLovFormat(apiUrl.setup, 2, null, { labelFeild: "shortName", codeFeilds: "acCode" }, true).then(data => this.setupLovData = data)
  }

}
