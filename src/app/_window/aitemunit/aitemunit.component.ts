
import { SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { ActionService, FormService } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit,Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AiitemunitDto } from 'src/app/_dto/aiitemunit.dto';
import { InterfaceAdminService } from 'src/app/_modules/administration/interface-admin/interface-admin.service';
// import { ItemMasterDetailService } from 'src/app/_modules/inventory/masters/item-master/item-master.service';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-aitemunit',
  templateUrl: './aitemunit.component.html',
  styleUrls: ['./aitemunit.component.scss']
})
export class AitemunitComponent implements OnInit {

@Input('service') mainService: any;

@Input('parentData') isManager: boolean;

  productDialog: boolean;
  drCrLovData: SelectItem[] = [];
  rateLovData: SelectItem[] = [];
  unitLovData: SelectItem[] = [];
  accDetails: any;
  // searchDisplay: boolean = false;

  constructor(
    public actionService: ActionService,
    public service: FormService,
    
    private _lang: LangaugeTranslateService,
    private _ui: UiService,
    public popUpLovService: PopUpLovService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    // public _mainService: ItemMasterDetailService
  ) { }

  ngOnInit(): void {
    

    //this.accDetails = this.service.header.iiitemunit;
    
    // this.getLovData();
  }

  // openNew() {
  //   if(this.service.header &&this.service.header.iiitemunit && this.service.header != null && this.service.header !=undefined){
  //   this.service.selectedDetailRow = new AiitemunitDto();
  //   if(!this._mainService.unitDetails || this._mainService.unitDetails == null || this._mainService.unitDetails == undefined){
  //     this.service.selectedDetailRow.cFactor = 1;
  //   }
    
  //   //this.actionService.currentComponent.createInsertRow()
   
  //   this.productDialog = true;}
  //   else{
      
  //     this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('selectAnyItemFirst') });

  //   }
  // }

  // editProduct(product: any) {
  //   this.service.selectedDetailRow = { ...product };
  //   this.productDialog = true;
  // }

  // deleteProduct(product: any, ri: number) {
  //   if (product.crud == "I") {
  //     this.service.header.iiitemunit.splice(ri, 1);
  //     return;
  //   }
  //   const removeRow = Object.assign({}, this.service.header.iiitemunit.splice(ri, 1)[0]);
  //   removeRow.crud = 'D';
  //   this._mainService.deletedDetailRows.push(removeRow);
  //   this._messageService.add({ severity: 'success', summary: 'success', detail: this._errorTranslateService.translate('rowDeleteSuccessMsg') });
  // }

  // hideDialog() {
  //   // this.service.header.iiitemunit.push(this.updateAc);
  //   this._mainService.unitDetails = [...this.service.header.iiitemunit];
  //   this.productDialog = false;
  // }

  // saveDetail(data) {
   

    
  //   if (!this.service.selectedDetailRow.unitCode || this.service.selectedDetailRow.unitCode == "") {
  //     this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('defAcCannotbeBlank') });
  //     return false;
  //   }
  //   if (!this.service.selectedDetailRow.cFactor || this.service.selectedDetailRow.cFactor.toString().trim() == "") {
  //     this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('cFactorCannotbeBlank') });
  //     return false;
  //   }
  //   // if (!this.service.selectedDetailRow.rate || this.service.selectedDetailRow.rate.toString().trim() == "") {
  //   //   this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('rateCannotbeBlank') });
  //   //   return false;
  //   // }

  //   // if (this.service.selectedDetailRow.shortName) {
  //   //   this.service.header.iiitemunit[this.findIndexById(this.service.selectedDetailRow.shortName)] = this.service.selectedDetailRow;
  //   //   this._messageService.add({ severity: 'success', summary: 'success', detail: this._errorTranslateService.translate('rowSaveSuccessMsg') });
  //   // }
  //   else {
      
      
  //     this.service.header?.iiitemunit?.push(this.service.selectedDetailRow);
  //     this._messageService.add({ severity: 'success', summary: 'success', detail: this._errorTranslateService.translate('rowSaveSuccessMsg') });
  //   }
  //   this._mainService.unitDetails = [...this.service.header.iiitemunit];
  //   this.productDialog = false;
  //   this.service.selectedDetailRow = new AiitemunitDto();
  // }

  // findIndexById(id: any): number {
  //   let index = -1;
  //   // for (let i = 0; i < this.service.header.iiitemunit.length; i++) {
  //   //   if (this.service.header.iiitemunit[i].shortName == id) {
  //   //     index = i;
  //   //     break;
  //   //   }
  //   // }
  //   return index;
  // }

  // getLovData() {
  //   this.drCrLovData = [
  //     { label: this._lang.first("Dr"), labelPl: this._lang.first("Dr"), labelSl: this._lang.second("Dr"), value: 1 },
  //     { label: this._lang.first("Cr"), labelPl: this._lang.first("Cr"), labelSl: this._lang.second("Cr"), value: -1 },
  //   ];

  //   this.rateLovData = [
  //     { label: this._lang.first("baseRate"), labelPl: this._lang.first("baseRate"), labelSl: this._lang.second("baseRate"), value: "BASE_RATE" },
  //     { label: this._lang.first("costRate"), labelPl: this._lang.first("costRate"), labelSl: this._lang.second("costRate"), value: "COST_RATE" },
  //     { label: this._lang.first("itemRate"), labelPl: this._lang.first("itemRate"), labelSl: this._lang.second("itemRate"), value: "ITEM_RATE" },
  //     { label: this._lang.first("balance"), labelPl: this._lang.first("balance"), labelSl: this._lang.second("balance"), value: "BALANCE" },
  //     { label: this._lang.first("vat"), labelPl: this._lang.first("vat"), labelSl: this._lang.second("vat"), value: "VAT" },
  //   ];
  //   this._ui.getDataInLovFormat('iiunit', 2, null, { labelFeild: "name", codeFeilds: "code" }, true).then(data => this.unitLovData = data)
  // }

}
