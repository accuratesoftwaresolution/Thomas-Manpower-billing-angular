import { BranchSelectionService } from '@accurate/branch-selection';
import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService, MasterService } from '@accurate/providers';
import { ActionService } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { IisodetailDto } from 'src/app/_dto/iisodetail.dto';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-iisoheader',
  templateUrl: './iisoheader.component.html',
  styleUrls: ['./iisoheader.component.scss']
})
export class IisoheaderComponent implements OnInit {

  service = this._actionService.currentComponent.service;

  columnMetaData: FormAlignerDto[] = [];
  addressMetaData: FormAlignerDto[] = [];
  iac4LovData: SelectItem[] = [];
  statusLovData: SelectItem[] = [];
  jobLovData: SelectItem[] = [];
  allAccountData: Iac4Dto[] = [];
  deliveryTermLovData: SelectItem[] = [];
  paymentLovData: SelectItem[] = [];
  currencyLovData: SelectItem[] = [];
  modeofShipLovData: SelectItem[] = [];
  jobAllData: any;
  allCurrencyData: any;

  constructor(
    private _uiService: UiService,
    private _lang: LangaugeTranslateService,
    private _masterService: MasterService,
    private _actionService: ActionService,
    private messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    private _branchSelection: BranchSelectionService
  ) {
    this.getColumn();
  }

  ngOnInit(): void {
    // this.service.header = new IisoheaderDto();
    this.getAllLovData();
  }

  getColumn() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [
          { columnName: 'vrNo', labelCode: 'vrNo', mandatory: true, size: 2, type: 'number', maxlength: 10, disableExpression: () => this._branchSelection.vrNoEnable },
          { columnName: 'vrDate', labelCode: 'vrDate', mandatory: true, size: 3, type: 'date' },
          { columnName: 'status', size: 2, labelCode: 'status', type: 'dropdown', data: () => this.statusLovData },
          { columnName: 'refNo', labelCode: 'refNo', size: 2, maxlength: 30 },
          { columnName: 'refDate', labelCode: 'refDate', size: 3, maxlength: 30, type: 'date' },
          { columnName: 'acCode', size: 2, labelCode: 'acCode', mandatory: true, type: 'dropdown', data: () => this.iac4LovData, valueChange: (event) => this.acCodeValueChange() },
          { columnName: 'acName', size: 5, labelCode: 'acName', isDisabled: true, },
          { columnName: 'vat', size: 2, labelCode: 'vat', type: 'check', valueChange: (event) => this.vatChange(event), },
          { columnName: 'gsm', size: 3, labelCode: 'gsm', maxlength: 20, valueChange: (event) => this.phoneValueChange(event, "gsm") },
          { columnName: 'creditPeriod', size: 3, labelCode: 'crPeriod', type: 'number', maxlength: 5 },
          { columnName: 'jobCode', size: 3, labelCode: 'jobNoDivision', type: 'dropdown', data: () => this.jobLovData, },// valueChange: (event) => this.onJobCodeLov() 
          { columnName: 'paymentTerms', size: 3, labelCode: 'paymentTerms', type: 'dropdown', data: () => this.paymentLovData, },
          { columnName: 'shippingTerms', size: 3, labelCode: 'shippingTerms', maxlength: 3000 },
          { columnName: 'modeOfShip', size: 3, labelCode: 'modeOfShip', type: 'dropdown', data: () => this.modeofShipLovData, },
          { columnName: 'remarks', size: 5, labelCode: 'remarks', maxlength: 3000 },
          { columnName: 'curCode', size: 2, labelCode: 'baseCurCode', isDisabled: true, type: 'dropdown', data: () => this.currencyLovData, valueChange: (event) => this.onCurCodeChange() },
          { columnName: 'curRate', size: 2, labelCode: 'curRate', isDisabled: true, type: 'currency', },
          { columnName: 'sign1Name', labelCode: 'signatories', size: 3, maxlength: 50 },
          { columnName: 'sign2Name', labelCode: '', size: 3, maxlength: 50 },
          { columnName: 'sign3Name', labelCode: '', size: 3, maxlength: 50 },
          { columnName: 'deliveryTerms', size: 3, labelCode: 'deliveryTerms', type: 'dropdown', data: () => this.deliveryTermLovData, },
          { columnName: 'discPer', size: 2, labelCode: 'discPer', valueChange: (event) => this.onHeaderDiscount('P'), type: 'currency', minFractionDigits: this.service.amtDecPts, maxFractionDigits: this.service.amtDecPts },//valueExpression: () => this.getDiscPerc(), 
          { columnName: 'discAmt', size: 2, labelCode: 'discAmt', valueChange: (event) => this.onHeaderDiscount('A'), type: 'currency', minFractionDigits: this.service.amtDecPts, maxFractionDigits: this.service.amtDecPts },//type: 'currency'  valueExpression: () => this.getTotalDisAmt(),
        ]
      }
    ]
    this.addressMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [{
          type: 'group', size: 12, label: "Address", groupColumnMetaData: [
            { columnName: 'add1', size: 3, labelCode: 'add1', maxlength: 50 },
            { columnName: 'add2', size: 3, labelCode: 'add2', maxlength: 50 },
            { columnName: 'add3', size: 3, labelCode: 'add3', maxlength: 50 },
            { columnName: 'add4', size: 3, labelCode: 'add4', maxlength: 50 },
            { columnName: 'contact', size: 3, labelCode: 'contact', maxlength: 40, valueChange: (event) => this.phoneValueChange(event, "contact") },
            { columnName: 'tel', size: 3, labelCode: 'tel', maxlength: 20, valueChange: (event) => this.phoneValueChange(event, "tel") },
            { columnName: 'fax', size: 3, labelCode: 'fax', maxlength: 20, valueChange: (event) => this.phoneValueChange(event, "fax") },
            { columnName: 'email', size: 3, labelCode: 'email', maxlength: 50, valueChange: (event) => this.emailValueChange(event) },
          ]
        }]
      },
    ]
  }

  async getAllLovData() {
    this.statusLovData = [
      { label: this._lang.first("active"), value: 'A' },
      { label: this._lang.first("inactive"), value: 'I' },
      { label: this._lang.first("closed"), value: 'C' },
    ];

    this.modeofShipLovData = [
      { label: this._lang.first("byRoad"), value: 'R' },
      { label: this._lang.first("bySea"), value: 'S' },
      { label: this._lang.first("byAir"), value: 'A' },
    ];
    this._uiService.getDataInLovFormat(apiUrl.iac4, 2, null, { labelFeild: "acCode", codeFeilds: "acCode" }, true).then(res => {
      this.iac4LovData = res;
    })
    this._uiService.getDataInLovFormat(apiUrl.job, 2, null, { labelFeild: "jobName", codeFeilds: "jobCode" }, true).then(res => {
      this.jobLovData = res;
    })
    this._uiService.getDataInLovFormat(apiUrl.terms, 2, null, { labelFeild: "name", codeFeilds: "name", dataFetchExpression: { getMethodExpression: `where[termType]=2` } }, true).then(res => {
      this.paymentLovData = res;
    })
    this._uiService.getDataInLovFormat(apiUrl.terms, 2, null, { labelFeild: "name", codeFeilds: "name", dataFetchExpression: { getMethodExpression: `where[termType]=3` } }, true).then(res => {
      this.deliveryTermLovData = res;
    })

    this._masterService.getMasterData(apiUrl.iac4).then(data => {
      this.allAccountData = data['data'];
    });
    this._masterService.getMasterData(apiUrl.job).then(data => {
      this.jobAllData = data['data'];
    });

    await this._uiService.getDataInLovFormat(apiUrl.currency, 2, null, { labelFeild: 'code', codeFeilds: 'code' }, true).then(data => {
      this.currencyLovData = data;
    });

    this._masterService.getMasterData(apiUrl.currency).then((res) => {
      this.allCurrencyData = res['data'];
    });
  }

  // onJobCodeLov() {
  //   if (this.service.header.jobCode) {
  //     this.jobAllData.forEach(res => {
  //       if (res.jobCode == this.service.header.jobCode) {
  //         this.service.header.acName = res.acName;
  //         this.service.header.shippingAdd = (res.jobCode.replace(/\s/g, "")).concat('--').concat(res.aliasName ? res.aliasName : res.jobName);
  //       }
  //     })
  //   }
  // }

  vatChange(event) {
    if (event && event.checked) {
      this.service.header.vat = "Y";
    }
    else
      this.service.header.vat = "N";
  }
  acCodeValueChange() {
    if (this.service.header.acCode) {
      this.allAccountData.forEach(res => {
        if (res.acCode == this.service.header.acCode) {
          this.service.header.acName = res.acName;
          this.service.header.curCode = res.curCode;
          this.onCurCodeChange();
        }
      })
    }
  }

  onCurCodeChange() {
    this.allCurrencyData.forEach(data => {
      if (this.service.header.curCode && this.service.header.curCode == data.code) {
        this.service.header.curRate = data.curRate;
      }
    });
  }

  emailValueChange(event) {
    if (this.service.header.email && (!this._uiService.getEmailRegex().test(this.service.header.email))) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidMail') });
      this.service.header.email = null;
      return;
    }
  }

  phoneValueChange(event, colName) {
    if ((this.service.header.tel && colName == "tel") && (!this._uiService.getPhoneRegex().test(this.service.header.tel))) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidTelephone') });
      this.service.header.tel = null;
    }
    else if ((this.service.header.gsm && colName == "gsm") && (!this._uiService.getPhoneRegex().test(this.service.header.gsm))) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidGsm') });
      this.service.header.gsm = null;
    }
    else if ((this.service.header.contact && colName == "contact") && (!this._uiService.getPhoneRegex().test(this.service.header.contact))) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidContact') });
      this.service.header.contact = null;
    }
    if ((this.service.header.fax && colName == "fax") && (!this._uiService.getPhoneRegex().test(this.service.header.fax))) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidFax') });
      this.service.header.fax = null;
    }
  }

  onHeaderDiscount(flag: string) {
    let detailTotAmt = 0;
    if ((!this.service.header.iisodetail) || (this.service.header.iisodetail && this.service.header.iisodetail.length <= 0))
      return;
    detailTotAmt = this.getTotalAmount();
    if (flag == 'P') {
      this.service.header.discAmt = this._actionService.round(detailTotAmt * this.service.header.discPer / 100, this.service.amtDecPts);
    }
    else if (flag == 'A' && detailTotAmt > 0) {
      this.service.header.discPer = this._actionService.round(this.service.header.discAmt * 100 / detailTotAmt, this.service.amtDecPts);
    }

    this.service.header.iisodetail.forEach((row: IisodetailDto) => {
      row.disPer = this.service.header.discPer;
      row.disAmt = (row.itemQty * row.baseRate) * row.disPer / 100;
    });
  }


  getTotalAmount(): number {

    if (this.service.header.iisodetail && this.service.header.iisodetail.length > 0) {
      const total = this.service.header.iisodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.itemQty * current.baseRate).toString()), 0);
      return total;
    }
    return 0;
  }

}
