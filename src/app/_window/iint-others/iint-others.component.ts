import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { LangaugeTranslateService } from '@accurate/providers';
import { UiService } from '@accurate/ui';
import { Component, Input, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-iint-others',
  templateUrl: './iint-others.component.html',
  styleUrls: ['./iint-others.component.scss']
})
export class IintOthersComponent implements OnInit {

  @Input('service') mainService: any;

  columnMetaData: FormAlignerDto[] = [];
  chequeMetaData: FormAlignerDto[] = [];
  printFooterMeataData: FormAlignerDto[] = [];
  listMetaData: FormAlignerDto[] = [];
  registerMetaData: FormAlignerDto[] = [];

  yesNoList: SelectItem[] = [];
  hNarrationLovData: SelectItem[] = [];
  dNarrationLovData: SelectItem[] = [];
  repeatDateLovData: SelectItem[] = [];
  iintobjectLovData: SelectItem[] = [];
  headerVisibleLovData: SelectItem[] = [];

  constructor(
    private _lang: LangaugeTranslateService,
    private _ui: UiService
  ) { }

  ngOnInit(): void {
    this.getColumnInfo();
    this.getLovData();
  }


  chqMandatoryValueChange() {

  }

  getColumnInfo() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [
          { columnName: 'narrationH', size: 4, labelCode: 'narrationH', type: 'dropdown', data: () => this.hNarrationLovData },
          { columnName: 'repeatDate', size: 4, labelCode: 'repeatDate', type: 'dropdown', data: () => this.repeatDateLovData },
          { columnName: 'narrationHDef', size: 4, labelCode: 'default', maxlength: 500 },
          { columnName: 'narrationD', size: 6, labelCode: 'narrationD', type: 'dropdown', data: () => this.dNarrationLovData },  
          { columnName: 'narrationDDef', size: 6, labelCode: 'default', maxlength: 500 },//
        ]
      }
    ]

    this.chequeMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Cheque", groupColumnMetaData: [
              { columnName: 'chqNo', size: 3, labelCode: 'chqNo', type: 'dropdown', data: () => this.yesNoList, },
              { columnName: 'chqBank', size: 3, labelCode: 'chqBank', type: 'dropdown', data: () => this.yesNoList, },
              { columnName: 'chqDate', size: 3, labelCode: 'chqDate', type: 'dropdown', data: () => this.yesNoList, },
              { columnName: 'chqMandatory', size: 3, labelCode: 'Marked are Compulsory', type: 'dropdown', data: () => this.yesNoList }// valueChange: (event) => this.chqMandatoryValueChange() },
            ]
          }
        ]
      }
    ]

    this.printFooterMeataData = [{
      type: 'accordion', groupColumnMetaData: [
        {
          type: 'group', size: 12, label: "Print Footer", groupColumnMetaData: [
            { columnName: 'auth1', size: 4, labelCode: 'auth1', maxlength: 50 },
            { columnName: 'auth2', size: 4, labelCode: 'auth2', maxlength: 50 },
            { columnName: 'auth3', size: 4, labelCode: 'auth3', maxlength: 50 },
            { columnName: 'vrPrint', size: 3, labelCode: 'vrPrint', maxlength: 50, type: 'dropdown', data: () => this.iintobjectLovData },
            { columnName: 'reportTitle', size: 3, labelCode: 'title', maxlength: 100 },
            { columnName: 'layoutPrint', size: 3, labelCode: 'layout', maxlength: 50 },
            { columnName: 'printHead', size: 3, labelCode: 'headerVisible', type: 'dropdown', data: () => this.headerVisibleLovData },
            { columnName: 'vrPrint2', size: 3, labelCode: 'vrPrint2', type: 'dropdown', data: () => this.iintobjectLovData },
            { columnName: 'print2Title', size: 3, labelCode: 'title', maxlength: 100 },
            { columnName: 'layoutPrint2', size: 3, labelCode: 'layout', maxlength: 50 },
            { columnName: 'print2Head', size: 3, labelCode: 'headerVisible', type: 'dropdown', data: () => this.headerVisibleLovData },
          ]
        }
      ]
    }]

    this.listMetaData = [{
      type: 'accordion', groupColumnMetaData: [
        {
          type: 'group', size: 12, label: "List", groupColumnMetaData: [
            { columnName: 'vrList', size: 3, labelCode: 'list', type: 'dropdown', data: () => this.iintobjectLovData },
            { columnName: 'listTitle', size: 3, labelCode: 'title', maxlength: 100 },
            { columnName: 'layoutList', size: 3, labelCode: 'layout', maxlength: 50 },
            { columnName: 'listHead', size: 3, labelCode: 'headerVisible', type: 'dropdown', data: () => this.headerVisibleLovData },
          ]
        }
      ]
    }]

    this.registerMetaData = [{
      type: 'accordion', groupColumnMetaData: [
        {
          type: 'group', size: 12, label: "Register", groupColumnMetaData: [
            { columnName: 'vrReg', size: 3, labelCode: 'register', type: 'dropdown', data: () => this.iintobjectLovData },
            { columnName: 'registerTitle', size: 3, labelCode: 'title', maxlength: 100 },
            { columnName: 'layoutReg', size: 3, labelCode: 'layout', maxlength: 50 },
            { columnName: 'regHead', size: 3, labelCode: 'headerVisible', type: 'dropdown', data: () => this.headerVisibleLovData },
          ]
        }
      ]
    }]
  }


  getLovData() {
    this.yesNoList = [
      { label: this._lang.first("yes"), labelPl: this._lang.first("yes"), labelSl: this._lang.second("yes"), value: "Y" },
      { label: this._lang.first("no"), labelPl: this._lang.first("no"), labelSl: this._lang.second("no"), value: "N" }
    ];

    this.hNarrationLovData = [
      { label: this._lang.first("none"), labelPl: this._lang.first("none"), labelSl: this._lang.second("none"), value: "N" },
      { label: this._lang.first("default"), labelPl: this._lang.first("default"), labelSl: this._lang.second("default"), value: "D" },
      { label: this._lang.first("repeat"), labelPl: this._lang.first("repeat"), labelSl: this._lang.second("repeat"), value: "R" },
      { label: this._lang.first("firstAcName"), labelPl: this._lang.first("firstAcName"), labelSl: this._lang.second("firstAcName"), value: "F" }
    ];

    this.dNarrationLovData = [
      { label: this._lang.first("none"), labelPl: this._lang.first("none"), labelSl: this._lang.second("none"), value: "N" },
      { label: this._lang.first("default"), labelPl: this._lang.first("default"), labelSl: this._lang.second("default"), value: "D" },
      { label: this._lang.first("repeat"), labelPl: this._lang.first("repeat"), labelSl: this._lang.second("repeat"), value: "R" },
      { label: this._lang.first("copyFromHeaderBlank"), labelPl: this._lang.first("copyFromHeaderBlank"), labelSl: this._lang.second("copyFromHeaderBlank"), value: "C" },
      { label: this._lang.first("copyFromHeaderOverWriteDetail"), labelPl: this._lang.first("copyFromHeaderOverWriteDetail"), labelSl: this._lang.second("copyFromHeaderOverWriteDetail"), value: "P" }
    ];

    this.repeatDateLovData = [
      { label: this._lang.first("none"), labelPl: this._lang.first("none"), labelSl: this._lang.second("none"), value: "N" },
      { label: this._lang.first("default"), labelPl: this._lang.first("default"), labelSl: this._lang.second("default"), value: "D" },
      { label: this._lang.first("repeat"), labelPl: this._lang.first("repeat"), labelSl: this._lang.second("repeat"), value: "R" },
      { label: this._lang.first("firstDayoftheMonth"), labelPl: this._lang.first("firstDayoftheMonth"), labelSl: this._lang.second("firstDayoftheMonth"), value: "F" },
      { label: this._lang.first("lastDayoftheMonth"), labelPl: this._lang.first("lastDayoftheMonth"), labelSl: this._lang.second("lastDayoftheMonth"), value: "L" },
      { label: this._lang.first("previousMonth"), labelPl: this._lang.first("previousMonth"), labelSl: this._lang.second("previousMonth"), value: "P" },
      { label: this._lang.first("openingDate"), labelPl: this._lang.first("openingDate"), labelSl: this._lang.second("openingDate"), value: "O" }
    ];


    this.headerVisibleLovData = [
      { label: this._lang.first("allHeader"), labelPl: this._lang.first("allHeader"), labelSl: this._lang.second("allHeader"), value: "A" },
      { label: this._lang.first("coName"), labelPl: this._lang.first("coName"), labelSl: this._lang.second("coName"), value: "C" },
      { label: this._lang.first("reportTitle"), labelPl: this._lang.first("reportTitle"), labelSl: this._lang.second("reportTitle"), value: "R" },
      { label: this._lang.first("hideAll"), labelPl: this._lang.first("hideAll"), labelSl: this._lang.second("hideAll"), value: "H" },
    ];

    this._ui.getDataInLovFormat(apiUrl.iintobject, 2, null, { labelFeild: "objectName", secondryFeild: "objectDesc", codeFeilds: "objectName" }, true).then(res => {
      this.iintobjectLovData = res;
    })

  }
}
