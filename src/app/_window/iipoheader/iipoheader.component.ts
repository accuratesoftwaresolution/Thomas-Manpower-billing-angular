import { BranchSelectionService } from '@accurate/branch-selection';
import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { LangaugeTranslateService, MasterService } from '@accurate/providers';
import { ActionService } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit, } from '@angular/core';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { IipodetailDto } from 'src/app/_dto/iipodetail.dto';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-iipoheader',
  templateUrl: './iipoheader.component.html',
  styleUrls: ['./iipoheader.component.scss']
})
export class IipoheaderComponent implements OnInit {

  service = this._actionService.currentComponent.service;

  // header: IipoheaderDto;

  columnMetaData: FormAlignerDto[] = [];
  iac4LovData: SelectItem[] = [];
  statusLovData: SelectItem[] = [];
  jobLovData: SelectItem[] = [];
  allAccountData: Iac4Dto[] = [];
  deliveryTermLovData: SelectItem[] = [];
  paymentLovData: SelectItem[] = [];
  jobAllData: any;

  constructor(
    private _uiService: UiService,
    private _lang: LangaugeTranslateService,
    private _masterService: MasterService,
    private _actionService: ActionService,
    private _branchSelection: BranchSelectionService
  ) {
    this.getColumn();
  }

  ngOnInit(): void {

    // this.service.header = new IipoheaderDto();
    this.getAllLovData();
  }

  getColumn() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [
          { columnName: 'vrNo', labelCode: 'vrNo', mandatory: true, size: 2, type: 'number', maxlength: 10, disableExpression: () => this._branchSelection.vrNoEnable },
          { columnName: 'vrDate', labelCode: 'vrDate', mandatory: true, size: 3, type: 'date' },
          { columnName: 'status', size: 3, labelCode: 'status', type: 'dropdown', data: () => this.statusLovData },
          { columnName: 'refNo', labelCode: 'refNo', size: 2, maxlength: 30 },
          { columnName: 'creditPeriod', size: 2, labelCode: 'crPeriod', type: 'number', maxlength: 5 },
          { columnName: 'acCode', size: 2, labelCode: 'acCode', mandatory: true, type: 'dropdown', data: () => this.iac4LovData, valueChange: (event) => this.acCodeValueChange() },
          { columnName: 'acName', size: 3, labelCode: 'acName', maxlength: 30 },
          { columnName: 'jobCode', size: 3, labelCode: 'jobNoDivision', type: 'dropdown', data: () => this.jobLovData, valueChange: (event) => this.onJobCodeLov() },
          // { columnName: 'shippingAdd', size: 3, labelCode: '', isDisabled: true },
          { columnName: 'discPer', size: 2, labelCode: 'discPer', valueChange: (event) => this.onHeaderDiscount('P', event), type: 'currency', minFractionDigits: this.service.amtDecPts, maxFractionDigits: this.service.amtDecPts },//valueExpression: () => this.getDiscPerc(), 
          { columnName: 'discAmt', size: 2, labelCode: 'discAmt', valueChange: (event) => this.onHeaderDiscount('A', event), type: 'currency', minFractionDigits: this.service.amtDecPts, maxFractionDigits: this.service.amtDecPts },//type: 'currency'  valueExpression: () => this.getTotalDisAmt(),
          { columnName: 'deliveryTerms', size: 2, labelCode: 'deliveryTerms', type: 'dropdown', data: () => this.deliveryTermLovData, },
          { columnName: 'paymentTerms', size: 2, labelCode: 'paymentTerms', type: 'dropdown', data: () => this.paymentLovData, },
          { columnName: 'sign1Desi', labelCode: 'sign1Desi', size: 3, maxlength: 50 },
          { columnName: 'remarks', size: 5, labelCode: 'remarks', },
        ]
      }
    ]
  }

  getAllLovData() {
    this.statusLovData = [
      { label: this._lang.first("active"), value: 'A' },
      { label: this._lang.first("inactive"), value: 'I' },
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

  }

  acCodeValueChange() {
    if (this.service.header.acCode) {
      this.allAccountData.forEach(res => {
        if (res.acCode == this.service.header.acCode) {
          this.service.header.acName = res.acName;
        }
      })
    }
  }

  onJobCodeLov() {
    if (this.service.header.jobCode) {
      this.jobAllData.forEach(res => {
        if (res.jobCode == this.service.header.jobCode) {
          this.service.header.acName = res.acName;
          this.service.header.shippingAdd = (res.jobCode.replace(/\s/g, "")).concat('--').concat(res.aliasName ? res.aliasName : res.jobName);
        }
      })
    }
  }


  onHeaderDiscount(flag: string, event) {
    let detailTotAmt = 0;
    if ((!this.service.header.iipodetail) || (this.service.header.iipodetail && this.service.header.iipodetail.length <= 0))
      return;
    detailTotAmt = this.getTotalAmount();
    if (flag == 'P') {
      // if (this.service.header.discPer > 100 || this.service.header.discPer < 0) {
      //   this.messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('enterValidAmountPerc') });
      //   return false;
      // }

      this.service.header.discAmt = detailTotAmt * this.service.header.discPer / 100;
    }
    else if (flag == 'A' && detailTotAmt > 0) {
      this.service.header.discPer = this.service.header.discAmt * 100 / detailTotAmt;
    }

    this.service.header.iipodetail.forEach((row: IipodetailDto) => {
      row.disPer = this.service.header.discPer;
      row.disAmt = (row.itemQty * row.baseRate) * row.disPer / 100;
    });
  }

  // getDiscPerc() {
  //   const totalDiscAmt = this.getTotalDisAmt();
  //   const totalAmt = this.getTotalAmount();
  //   this.service.header.discPer = (totalDiscAmt != null ? totalDiscAmt : 0) * 100 / totalAmt;
  //   return (this.service.header.discPer && this.service.header.discPer != NaN) ? this._actionService.round(this.service.header.discPer, 2) : 0;
  // }

  // getTotalDisAmt() {
  //   if (this.service.header.iipodetail && this.service.header.iipodetail.length > 0) {
  //     const total = this.service.header.iipodetail.reduce((sum, current) =>
  //       parseFloat(sum.toString()) + parseFloat(current.disAmt.toString()), 0);
  //     return this._actionService.roundAmount(total);
  //   }
  //   return 0;
  // }

  getTotalAmount(): number {

    if (this.service.header.iipodetail && this.service.header.iipodetail.length > 0) {
      const total = this.service.header.iipodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.itemQty * current.baseRate).toString()), 0);
      return total;
    }
    return 0;
  }


}
