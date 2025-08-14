import { FormAlignerDto } from '@accurate/dto';
import { IcoService, LangaugeTranslateService } from '@accurate/providers';
import { UiService } from '@accurate/ui';
import { Component, Input, OnInit } from '@angular/core';
import { InterfaceAdminService } from 'src/app/_modules/administration/interface-admin/interface-admin.service';
import { apiFilterProperties, apiUrl } from 'src/app/_resources/api-url.properties';
import { IintService } from './iint.service';
// import { AccountsService } from 'src/app/_providers/accounts.service';

@Component({
  selector: 'app-iint',
  templateUrl: './iint.component.html',
  styleUrls: ['./iint.component.scss']
})
export class IintComponent implements OnInit {

  @Input('service') mainService: any;
  @Input('parentData') isManager: boolean;

  columnMetaData: FormAlignerDto[] = [];
  defaultAccMetaData: FormAlignerDto[] = [];
  detailMetaData: FormAlignerDto[] = [];
  refDocMetaData: FormAlignerDto[] = [];


  constructor(
    private _ui: UiService,
    private _lang: LangaugeTranslateService,
    public _service: IintService,
    private _interfaceService: InterfaceAdminService,
    // private accountsService: AccountsService,
    private icoService: IcoService

  ) {
    this.getColumnInfo();
  }

  ngOnInit(): void {
    this._service.mainService = this.mainService;
    this.getLovData();
  }

  refIntMandatoryValueChange(event) {
    if (event.checked)
      this.mainService.header.refIntMandatory = 'Y';
    else
      this.mainService.header.refIntMandatory = 'N';
  }

  intcodeChange(event) {
    this.mainService.header.intCode = this.mainService.header.abrv = this.mainService.header.intCode.toUpperCase();
  }

  onacCodeHChange(event, type: string) {
    this._service.iac4LovData.forEach(data => {
      if (type == "H") {
        if (data.value == this.mainService.header.acCodeH)
          this.mainService.header.acCodeHName = data.label
      }
      if (type == "D") {
        if (data.value == this.mainService.header.acCodeD)
          this.mainService.header.acCodeDName = data.label
      }
    })

  }

  onIntlogicChange(event, type: string) {
    this._service.iintlogicLovData.forEach(data => {
      if (type == "int") {
        if (data.value == this.mainService.header.intLogic)
          this.mainService.header.intLogicName = data.label
      }
      if (type == "rpt") {
        if (data.value == this.mainService.header.rptLogic)
          this.mainService.header.rptLogicName = data.label
      }
    })

  }

  getColumnInfo() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [
          { columnName: 'intCode', size: 2, labelCode: 'intCode', mandatory: true, maxlength: 5, valueChange: (event) => this.intcodeChange(event), disableExpression: () => this._interfaceService.isUpdate },
          { columnName: 'intName', size: 5, labelCode: 'intName', mandatory: true, maxlength: 50 },
          { columnName: 'abrv', size: 2, labelCode: 'abrv', maxlength: 5 },
          { columnName: 'intMode', size: 3, labelCode: 'mode', type: 'dropdown', data: () => this._service.userModeLovData },//
          { columnName: 'windowName', size: 4, labelCode: 'intObject', type: 'dropdown', data: () => this._service.iintobjectLovData, disableExpression: () => this.isManager },
          { columnName: 'intLogic', size: 4, labelCode: 'intLogic', mandatory: true, maxlength: 5, type: 'dropdown', data: () => this._service.iintlogicLovData, valueChange: (event) => this.onIntlogicChange(event, "int"), disableExpression: () => this.isManager },
          { columnName: 'rptLogic', size: 4, labelCode: 'rptLogic', maxlength: 5, type: 'dropdown', data: () => this._service.iintlogicLovData, valueChange: (event) => this.onIntlogicChange(event, "rpt"), disableExpression: () => this.isManager },
        ]
      }
    ]
    this.defaultAccMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Default Account Setting", groupColumnMetaData: [
              { columnName: 'acCodeH', size: 6, labelCode: 'headerAc', maxlength: 9, type: 'dropdown', data: () => this._service.iac4LovData, },// valueChange: (event) => this.onacCodeHChange(event, "H")
              // { columnName: 'acCodeHName', size: 6, labelCode: 'acName', isDisabled: true, },
              { columnName: 'acCodeD', size: 6, labelCode: 'acCodeD', maxlength: 9, type: 'dropdown', data: () => this._service.iac4LovData, },//valueChange: (event) => this.onacCodeHChange(event, "D")   
              // { columnName: 'acCodeDName', size: 6, labelCode: 'acName', isDisabled: true },
            ]
          }
        ]
      }
    ]
    this.detailMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [
          { columnName: 'drCr', size: 3, labelCode: 'defdrCr', maxlength: 2, type: 'dropdown', data: () => this._service.drCrLovData, disableExpression: () => this.isManager },
          { columnName: 'editDrCr', size: 3, labelCode: 'editDrCr', maxlength: 1, type: 'dropdown', data: () => this._service.yesNoList, disableExpression: () => this.isManager },
          { columnName: 'acVisible', size: 3, labelCode: 'acVisible', maxlength: 1, type: 'dropdown', data: () => this._service.accountVisibleLovData, disableExpression: () => this.isManager },
          { columnName: 'billAuto', size: 3, labelCode: 'billAuto', type: 'dropdown', data: () => this._service.yesNoList, disableExpression: () => this.isManager },
          { columnName: 'sortOrder', size: 3, labelCode: 'sortOrder', maxlength: 4, },
          { columnName: 'intVisible', size: 3, labelCode: 'intVisible', maxlength: 1, type: 'dropdown', data: () => this._service.yesNoList, disableExpression: () => this.isManager },
          { columnName: 'intCloseDate', size: 3, labelCode: 'closedUpto', type: 'date' },
          { columnName: 'salesmanMandatory', size: 3, labelCode: 'salesmanMandatory', type: 'dropdown', data: () => this._service.yesNoList, disableExpression: () => this.isManager },
          { columnName: 'invCost', size: 3, labelCode: 'costCal', maxlength: 1, type: 'dropdown', data: () => this._service.inventoryCostLovData, disableExpression: () => this.isManager },
          { columnName: 'invSign', size: 3, labelCode: 'invSign', type: 'dropdown', data: () => this._service.inventorySignLovData, disableExpression: () => this.isManager },
          { columnName: 'curType', size: 3, labelCode: 'curType', maxlength: 1, type: 'dropdown', data: () => this._service.currencyFilterLovData, disableExpression: () => this.isManager },
          { columnName: 'overrideDateChk', size: 3, labelCode: 'overrideDateChk', maxlength: 1, type: 'dropdown', data: () => this._service.yesNoList },
          { columnName: 'printSave', size: 3, labelCode: 'printAfterSave', maxlength: 1, type: 'dropdown', data: () => this._service.yesNoList },
          { columnName: 'isprintYn', size: 3, labelCode: 'printControl', type: 'dropdown', data: () => this._service.printControlLovData, disableExpression: () => this.isManager },
          { columnName: 'newmodeSave', size: 3, labelCode: 'newmodeSave', type: 'dropdown', data: () => this._service.yesNoList },
          { columnName: 'newmodeDelete', size: 3, labelCode: 'newmodeDelete', maxlength: 2, type: 'dropdown', data: () => this._service.yesNoList },
          { columnName: 'acFilter', labelCode: 'acFilter', size: 3, type: 'dropdown', data: () => this._service.yesNoList },
          { columnName: 'notifyYn', labelCode: 'nofityEmail', size: 3, type: 'dropdown', data: () => this._service.yesNoList, disableExpression: () => this.isManager },
          { columnName: 'verifyYn', labelCode: 'defaultVerify', size: 3, type: 'dropdown', data: () => this._service.yesNoList },
          { columnName: 'readonly', labelCode: 'readonly', size: 3, type: 'dropdown', data: () => this._service.readOrDeleteLovData, disableExpression: () => this.isManager },
          // { columnName: 'layout', size: 6, labelCode: 'headerLayout', maxlength: 50, isDisabled: true },
        ]
      }
    ]

    this.refDocMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Referece Document Details", groupColumnMetaData: [
              // { columnName: 'refIntMandatory', labelCode: 'refIntMandatory', size: 4, type: 'dropdown', data: () => this.yesNoList },
              { columnName: 'refInt', size: 5, labelCode: 'iintCodes', maxlength: 50, disableExpression: () => this.isManager },
              { columnName: 'refIntMandatory', labelCode: 'refIntMandatory', size: 3, type: 'dropdown', data: () => this._service.yesNoList, disableExpression: () => this.isManager },
              { columnName: 'refTable', labelCode: 'tableName', size: 4, maxlength: 1000, disableExpression: () => this.isManager },
            ]
          }
        ]
      }
    ]
  }

  getLovData() {

    this._service.userModeLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("singleUser"), labelPl: this._lang.first("singleUser"), labelSl: this._lang.second("singleUser"), value: "S" },
      { label: this._lang.first("multiUser"), labelPl: this._lang.first("multiUser"), labelSl: this._lang.second("multiUser"), value: "M" },
      { label: this._lang.first("userMode"), labelPl: this._lang.first("userMode"), labelSl: this._lang.second("userMode"), value: "U" }
    ];

    this._service.currencyFilterLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("all"), labelPl: this._lang.first("all"), labelSl: this._lang.second("all"), value: "A" },
      { label: this._lang.first("foreign"), labelPl: this._lang.first("foreign"), labelSl: this._lang.second("foreign"), value: "F" },
      { label: this._lang.first("local"), labelPl: this._lang.first("local"), labelSl: this._lang.second("local"), value: "L" }
    ];

    this._service.drCrLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("Dr"), labelPl: this._lang.first("Dr"), labelSl: this._lang.second("Dr"), value: 1 },
      { label: this._lang.first("Cr"), labelPl: this._lang.first("Cr"), labelSl: this._lang.second("Cr"), value: -1 },
    ];

    this._service.yesNoList = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("yes"), labelPl: this._lang.first("yes"), labelSl: this._lang.second("yes"), value: "Y" },
      { label: this._lang.first("no"), labelPl: this._lang.first("no"), labelSl: this._lang.second("no"), value: "N" }
    ];

    this._service.accountVisibleLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },

      { label: this._lang.first("all"), labelPl: this._lang.first("all"), labelSl: this._lang.second("all"), value: "L" },
      { label: this._lang.first("accounts"), labelPl: this._lang.first("accounts"), labelSl: this._lang.second("accounts"), value: "A" },
      { label: this._lang.first("inventory"), labelPl: this._lang.first("inventory"), labelSl: this._lang.second("inventory"), value: "I" },
      { label: this._lang.first("partyExpense"), labelPl: this._lang.first("partyExpense"), labelSl: this._lang.second("partyExpense"), value: "P" },
      { label: this._lang.first("invoice"), labelPl: this._lang.first("invoice"), labelSl: this._lang.second("invoice"), value: "N" }
    ];

    this._service.printControlLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("noControl"), labelPl: this._lang.first("noControl"), labelSl: this._lang.second("noControl"), value: -1 },
      { label: this._lang.first("allowOnce"), labelPl: this._lang.first("allowOnce"), labelSl: this._lang.second("allowOnce"), value: 0 },
      { label: this._lang.first("duplicateCount"), labelPl: this._lang.first("duplicateCount"), labelSl: this._lang.second("duplicateCount"), value: 1 },
    ];

    this._service.inventoryCostLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("userEntered"), labelPl: this._lang.first("userEntered"), labelSl: this._lang.second("userEntered"), value: "U" },
      { label: this._lang.first("calculated"), labelPl: this._lang.first("calculated"), labelSl: this._lang.second("calculated"), value: "C" },
      { label: this._lang.first("noCosting"), labelPl: this._lang.first("noCosting"), labelSl: this._lang.second("noCosting"), value: "N" },
      { label: this._lang.first("+Calculated"), labelPl: this._lang.first("+Calculated"), labelSl: this._lang.second("+Calculated"), value: "+" },
      { label: this._lang.first("-Calculated"), labelPl: this._lang.first("-Calculated"), labelSl: this._lang.second("-Calculated"), value: "-" }
    ];

    this._service.inventorySignLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("+"), labelPl: this._lang.first("+"), labelSl: this._lang.second("+"), value: 1 },
      { label: this._lang.first("-"), labelPl: this._lang.first("-"), labelSl: this._lang.second("-"), value: -1 },
      { label: this._lang.first("0"), labelPl: this._lang.first("0"), labelSl: this._lang.second("0"), value: 0 }
    ];

    this._service.readOrDeleteLovData = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("readOnly"), labelPl: this._lang.first("readOnly"), labelSl: this._lang.second("readOnly"), value: "R" },
      { label: this._lang.first("normal"), labelPl: this._lang.first("normal"), labelSl: this._lang.second("normal"), value: "N" },
      { label: this._lang.first("deleteOnly"), labelPl: this._lang.first("deleteOnly"), labelSl: this._lang.second("deleteOnly"), value: "D" },
      { label: this._lang.first("fullyUtilizedReadOnly"), labelPl: this._lang.first("fullyUtilizedReadOnly"), labelSl: this._lang.second("fullyUtilizedReadOnly"), value: "F" },
      { label: this._lang.first("partiallyProcessedReadOnly"), labelPl: this._lang.first("partiallyProcessedReadOnly"), labelSl: this._lang.second("partiallyProcessedReadOnly"), value: "P" }
    ]

    this._ui.getDataInLovFormat(apiUrl.iintobject, 2, null, {
      labelFeild: "objectDesc", secondryFeild: 'objectDesc', codeFeilds: "objectName",
      dataFetchExpression: { getMethodExpression: "where[type]=E" }
    }, true).then(res => {
      this._service.iintobjectLovData = res;
    })

    this._ui.getDataInLovFormat(`${apiUrl.fullAccounts}?${apiFilterProperties.iac4LovFilter}`, 2, null,
      { labelFeild: "acName", codeFeilds: "acCode", dataFetchExpression: { getMethodExpression: `where[coCode]=${this.icoService.currentCompanyDetails}` } }, false).then(res => {
        this._service.iac4LovData = res;
      })

    // Modified By  :Aswathy
    // Modified for :(07/12/2021) had suggession for change description to interface Code

    this._ui.getDataInLovFormat(apiUrl.iintlogic, 2, null, { labelFeild: "code", codeFeilds: "code" }, true).then(res => {
      this._service.iintlogicLovData = res;
    })
  }

}
