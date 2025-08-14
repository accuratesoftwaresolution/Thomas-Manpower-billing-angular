import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { IcoDto } from 'src/app/_dto/ico.dto';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { AppMainComponent } from '../../dashboard/layout-components/app.main.component';
import { ActionService, AppBreadcrumbService, FormService, ICTFormPageBean } from '@accurate/toolbar';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent extends ICTFormPageBean implements OnInit {

  selectedCompany: any = new IcoDto();

  columnMetaData: FormAlignerDto[] = []; // default column stuture is name and nameSl
  buttonMetaData: FormAlignerDto[] = [];
  companyMetaData: FormAlignerDto[] = [];
  deatilMetaData: FormAlignerDto[] = [];
  poMetaData: FormAlignerDto[] = [];
  assetMetaData: FormAlignerDto[] = [];
  jobMetaData: FormAlignerDto[] = [];
  jobHeadMetaData: FormAlignerDto[] = [];
  acMetaData: FormAlignerDto[] = [];
  grpMetaData: FormAlignerDto[] = [];
  jvMetaData: FormAlignerDto[] = [];

  loading: boolean = false;
  dialogMsgs: Message[] = [];
  currencyList: SelectItem[] = [];
  registeredCountryList: SelectItem[] = [];
  yesNoList: SelectItem[] = [];
  distUnitList: SelectItem[] = [];
  fuelUnitList: SelectItem[] = [];
  levelLovData: SelectItem[] = [];

  idvLovData: SelectItem[] = [];
  ibrLovData: SelectItem[] = [];
  iac4LovData: SelectItem[] = [];
  transactionList: SelectItem[] = [];
  transactionListInd: SelectItem[] = [];
  iintLovData: SelectItem[] = [];
  titleCode: string = "company";
  helpCode: string = "companyHelp";

  // key: string = "";
  dateFields = ["yrSDt", "yrEDt", "modiCloseDate"];

  searchDisplay: boolean = false;
  isUpdate: boolean = false;

  DIALOG_TITLE = "company"
  API_END_URL = apiUrl.company;
  PRIMARY_KEYS = ["coCode"];
  key = "coCode";
  // pagination: boolean = true;
  searchPopupColumns = [
    { field: 'coCode', header: "Co.", width: '2em' },
    { field: 'coName', header: 'Company Name', width: '3.5em' },
    { field: 'coShName', header: 'Company Short Name', width: '2em' },
  ];

  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    private breadcrumbService: AppBreadcrumbService,
    private _lang: LangaugeTranslateService,
    private _messageService: MessageService,
    private _ui: UiService,
    private _errorTranslateService: ErrorTranslateService,
    public service: FormService,
    public actionService: ActionService,
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    actionService.headerDto = IcoDto;
    this.breadcrumbService.setItems([
      { label: 'Company', routerLink: ['/'] }
    ]);

    this.getColumnInfo();
  }

  async ngOnInit() {
    this.service.header = new IcoDto();
    this.getLovData();
  }
  phoneValueChange(event, colName) {
    if ((this.service.header.tel && colName == "tel") && (!this._ui.getPhoneRegex().test(this.service.header.tel))) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidTelephone') });
      this.service.header.tel = null;
    }
    if ((this.service.header.fax && colName == "fax") && (!this._ui.getPhoneRegex().test(this.service.header.fax))) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidFax') });
      this.service.header.fax = null;
    }
  }
  emailValueChange(event) {
    if (this.service.header.email && (!this._ui.getEmailRegex().test(this.service.header.email))) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidMail') });
      this.service.header.email = null
    }
  }
  webSiteValueChange(event) {
    if (this.service.header.website && (!this._ui.getWebsiteRegex().test(this.service.header.website))) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('EnterValidWebsite') });
      this.service.header.website = null;
    }
  }

  async postCreateInsert() {
    this.isUpdate = false;
  }

  async postSearch() {
    this.isUpdate = true;
  }

  async preSave(): Promise<boolean> {
    if (!this.service.header.coCode || this.service.header.coCode.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('coCodeNotNull') });
      return false;
    }

    if (!this.service.header.coName || this.service.header.coName.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('coNameNotNull') });
      return false;
    }
    // if (this.selectedCompany.isArabic == "Y" && (!this.selectedCompany.coNameAr || this.selectedCompany.coNameAr.toString().trim() == "")) {
    //   this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('coNameNotNull') });
    //   return false;
    // }
    if (!this.service.header.coShName || this.service.header.coShName.toString().trim() == "") {
      this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('coShNameNotNull') });
      return false;
    }
    this.dateFields.forEach(row => {
      // res[row] = new Date(this.datePipe.transform(res[row], 'yyyy-MM-dd'));
      this.service.header[row] = this._ui.transformDate(this.service.header[row]);
    });

    return true;
  }


  getColumnInfo() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: "Basic", groupColumnMetaData: [
          { columnName: 'coCode', size: 2, labelCode: 'code', disableExpression: () => this.isUpdate, maxlength: 2, mandatory: true },
          { columnName: 'coName', mandatory: true, size: 6, labelCode: 'coName', hasSecondryFeild: true, maxlength: 50 },
          { columnName: 'coShName', mandatory: true, size: 4, labelCode: 'shName', maxlength: 10 },
          { columnName: 'coNameAr', mandatory: true, size: 5, labelCode: 'coName', secondryFeild: true, maxlength: 50, },
          { columnName: 'baseCurCode', size: 4, labelCode: 'baseCurCode', maxlength: 6, type: 'dropdown', data: () => this.currencyList, },// type: 'dropdown', data: () => this.currencyList, 
          { columnName: 'currencyMultiple', labelCode: 'currencyMultiple', size: 4, type: 'dropdown', data: () => this.yesNoList },
          { columnName: 'multiUnit', labelCode: 'multiUnit', size: 4, type: 'dropdown', data: () => this.yesNoList },
          { columnName: 'rateDecPts', size: 4, labelCode: 'rateDecPts', },// valueExpression: () => this.getDecimalPoints(),
          { columnName: 'amtDecPts', size: 4, labelCode: 'amtDecPts', },// valueExpression: () => this.getDecimalPoints()
          { columnName: 'taxType', size: 4, labelCode: 'taxType', type: 'dropdown', data: () => this.selectedCompany.registeredCountry == "IND" ? this.transactionListInd : this.transactionList },
          { columnName: 'distanceUnit', size: 4, labelCode: 'distanceUnit', type: 'dropdown', data: () => this.distUnitList, },//isDisabled: true
          { columnName: 'fuelUnit', size: 4, labelCode: 'fuelUnit', type: 'dropdown', data: () => this.fuelUnitList, }, //isDisabled: true 
          { columnName: 'yrSDt', type: 'date', size: 4, labelCode: 'yrSDt' },
          { columnName: 'yrEDt', type: 'date', size: 4, labelCode: 'yrEDt' },
          { columnName: 'modiCloseDate', type: 'date', size: 4, labelCode: 'modiCloseDate' },
          { columnName: 'dvWiseItemsYn', labelCode: 'dvWiseItemsYn', size: 4, type: 'dropdown', data: () => this.yesNoList },
          // { columnName: 'registeredCountry', labelCode: 'registeredCountry', size: 6, type: 'dropdown', data: () => this.registeredCountryList, isDisabled: true },
        ]
      }
    ]
    this.companyMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Address", groupColumnMetaData: [
              { columnName: 'add1', type: 'textarea', size: 6, labelCode: 'address1', hasSecondryFeild: true, maxlength: 30 },
              { columnName: 'add2', type: 'textarea', size: 6, labelCode: 'address2', hasSecondryFeild: true, maxlength: 30 },
              { columnName: 'add3', type: 'textarea', size: 6, labelCode: 'address3', hasSecondryFeild: true, maxlength: 30 },
              { columnName: 'add4', type: 'textarea', size: 6, labelCode: 'address4', hasSecondryFeild: true, maxlength: 30 },

              { columnName: 'add1Ar', type: 'textarea', size: 6, labelCode: 'address1', secondryFeild: true, maxlength: 50 },
              { columnName: 'add2Ar', type: 'textarea', size: 6, labelCode: 'address2', secondryFeild: true, maxlength: 50 },
              { columnName: 'add3Ar', type: 'textarea', size: 6, labelCode: 'address3', secondryFeild: true, maxlength: 50 },
              { columnName: 'add4Ar', type: 'textarea', size: 6, labelCode: 'address4', secondryFeild: true, maxlength: 50 },

              { columnName: 'tel', size: 6, labelCode: 'tel', valueChange: (event) => this.phoneValueChange(event, "tel"), keyFilter: this._ui.getPhoneRegex(), maxlength: 15 },
              { columnName: 'fax', size: 6, labelCode: 'fax', valueChange: (event) => this.phoneValueChange(event, "fax"), keyFilter: this._ui.getPhoneRegex(), maxlength: 15 },
              { columnName: 'email', size: 6, labelCode: 'email', valueChange: (event) => this.emailValueChange(event), maxlength: 30 },
              { columnName: 'website', size: 6, labelCode: 'website', valueChange: (event) => this.webSiteValueChange(event), maxlength: 30 },
            ]
          }]
      }
    ]
    this.deatilMetaData = [
      {
        type: 'group', size: 12, label: "", groupColumnMetaData: [

          { columnName: 'tel', size: 12, labelCode: 'tel', valueChange: (event) => this.phoneValueChange(event, "tel"), keyFilter: this._ui.getPhoneRegex(), maxlength: 15 },
          { columnName: 'fax', size: 12, labelCode: 'fax', valueChange: (event) => this.phoneValueChange(event, "fax"), keyFilter: this._ui.getPhoneRegex(), maxlength: 15 },
          { columnName: 'email', size: 12, labelCode: 'email', valueChange: (event) => this.emailValueChange(event), maxlength: 30 },
          { columnName: 'website', size: 12, labelCode: 'website', valueChange: (event) => this.webSiteValueChange(event), maxlength: 30 },
        ]
      }
    ]
    this.poMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Purchase Order Level", groupColumnMetaData: [
              { columnName: 'poLevel', labelCode: 'poLevel', size: 12, type: 'dropdown', data: () => this.levelLovData },
              { columnName: 'poDefDv', labelCode: 'poDefDv', size: 12, maxlength: 2, type: 'dropdown', data: () => this.idvLovData, },
              { columnName: 'poDefBr', labelCode: 'poDefBr', size: 12, type: 'dropdown', data: () => this.ibrLovData },
            ]
          }
        ]
      }
    ]
    this.assetMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Asset Level", groupColumnMetaData: [
              { columnName: 'assetLevel', labelCode: 'poLevel', size: 12, type: 'dropdown', data: () => this.levelLovData },
              { columnName: 'assetDefDv', labelCode: 'poDefDv', size: 12, type: 'dropdown', data: () => this.idvLovData },
              { columnName: 'assetDefBr', labelCode: 'poDefBr', size: 12, type: 'dropdown', data: () => this.ibrLovData },
            ]
          }
        ]
      }
    ]
    this.jobMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Job Level", groupColumnMetaData: [
              { columnName: 'jobLevel', labelCode: 'poLevel', size: 12, type: 'dropdown', data: () => this.levelLovData },
              { columnName: 'jobDefDv', labelCode: 'poDefDv', size: 12, type: 'dropdown', data: () => this.idvLovData },
              { columnName: 'jobDefBr', labelCode: 'poDefBr', size: 12, type: 'dropdown', data: () => this.ibrLovData },
            ]
          }
        ]
      }
    ]
    this.jobHeadMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Job Head Level", groupColumnMetaData: [
              { columnName: 'jobHeadLevel', labelCode: 'poLevel', size: 12, type: 'dropdown', data: () => this.levelLovData },
              { columnName: 'jobHeadDefDv', labelCode: 'poDefDv', size: 12, type: 'dropdown', data: () => this.idvLovData },
              { columnName: 'jobHeadDefBr', labelCode: 'poDefBr', size: 12, type: 'dropdown', data: () => this.ibrLovData },
            ]
          }
        ]
      }
    ]
    this.acMetaData = [
      {
        type: 'group', size: 12, label: "Setup Account", groupColumnMetaData: [
          { columnName: 'plAc', labelCode: 'plAc', size: 12, maxlength: 9, type: 'dropdown', data: () => this.iac4LovData },// type: 'dropdown', data: () => this.levelLovData 
          { columnName: 'pdcRecAc', labelCode: 'pdcRecAc', size: 12, maxlength: 9, type: 'dropdown', data: () => this.iac4LovData },// type: 'dropdown', data: () => this.idvLovData
          { columnName: 'pdcPayAc', labelCode: 'pdcPayAc', size: 12, maxlength: 9, type: 'dropdown', data: () => this.iac4LovData },
          { columnName: 'isArabic', labelCode: 'isArabic', size: 12, type: 'dropdown', data: () => this.yesNoList, isDisabled: true },//  
        ]
      }
    ]
    this.jvMetaData = [
      {
        type: 'accordion', groupColumnMetaData: [
          {
            type: 'group', size: 12, label: "Others", groupColumnMetaData: [

              { columnName: 'pdcJv', labelCode: 'pdcJv', size: 4, maxlength: 5, type: 'dropdown', data: () => this.iintLovData },
              { columnName: 'logData', labelCode: 'logData', size: 4, type: 'dropdown', data: () => this.yesNoList },
              { columnName: 'assetsDeprInt', labelCode: 'assetsDeprInt', size: 4, maxlength: 5, },
            ]
          }
        ]
      }
    ]

    this.grpMetaData = [{
      type: 'group', size: 12, label: "Group", groupColumnMetaData: [
        { columnName: 'invGrp1Name', size: 3, labelCode: 'grp1', maxlength: 30 },
        { columnName: 'invGrp2Name', size: 3, labelCode: 'grp2', maxlength: 30 },
        { columnName: 'invGrp3Name', size: 3, labelCode: 'grp3', maxlength: 30 },
        { columnName: 'invGrp4Name', size: 3, labelCode: 'grp4', maxlength: 30 },
        { columnName: 'invGrp5Name', size: 3, labelCode: 'grp5', maxlength: 30 },
        { columnName: 'invGrp6Name', size: 3, labelCode: 'grp6', maxlength: 30 },
        { columnName: 'invGrp7Name', size: 3, labelCode: 'grp7', maxlength: 30 },
        { columnName: 'invGrp8Name', size: 3, labelCode: 'grp8', maxlength: 30 },

      ]
    }]
  }

  getLovData() {
    this.transactionList = [
      { label: this._lang.first("vat"), labelPl: this._lang.first("vat"), labelSl: this._lang.second("vat"), value: "V" },
      { label: this._lang.first("noTax"), labelPl: this._lang.first("noTax"), labelSl: this._lang.second("noTax"), value: "N" }
    ];

    this.transactionListInd = [
      { label: this._lang.first("gst"), labelPl: this._lang.first("gst"), labelSl: this._lang.second("gst"), value: "G" },
      { label: this._lang.first("noTax"), labelPl: this._lang.first("noTax"), labelSl: this._lang.second("noTax"), value: "N" }
    ];

    this.yesNoList = [
      { label: this._lang.first("yes"), labelPl: this._lang.first("yes"), labelSl: this._lang.second("yes"), value: "Y" },
      { label: this._lang.first("no"), labelPl: this._lang.first("no"), labelSl: this._lang.second("no"), value: "N" }
    ];

    this.distUnitList = [
      { label: this._lang.first("kilometer"), labelPl: this._lang.first("kilometer"), labelSl: this._lang.second("kilometer"), value: "K" },
      { label: this._lang.first("mile"), labelPl: this._lang.first("mile"), labelSl: this._lang.second("mile"), value: "M" }
    ];

    this.fuelUnitList = [
      { label: this._lang.first("litre"), labelPl: this._lang.first("litre"), labelSl: this._lang.second("litre"), value: "L" },
      { label: this._lang.first("gallon"), labelPl: this._lang.first("gallon"), labelSl: this._lang.second("gallon"), value: "G" }
    ];

    this.fuelUnitList = [
      { label: this._lang.first("litre"), labelPl: this._lang.first("litre"), labelSl: this._lang.second("litre"), value: "L" },
      { label: this._lang.first("gallon"), labelPl: this._lang.first("gallon"), labelSl: this._lang.second("gallon"), value: "G" }
    ];

    this.levelLovData = [
      { label: this._lang.first("company"), labelPl: this._lang.first("company"), labelSl: this._lang.second("company"), value: "C" },
      { label: this._lang.first("division"), labelPl: this._lang.first("division"), labelSl: this._lang.second("division"), value: "D" },
      { label: this._lang.first("branch"), labelPl: this._lang.first("branch"), labelSl: this._lang.second("branch"), value: "B" },
    ]
    this._ui.getDataInLovFormat(apiUrl.division, 2, null, {
      labelFeild: "dvName", secondryFeild: "dvNameAr", codeFeilds: "dvCode"
    }, true).then(res => {
      this.idvLovData = res;
    });
    this._ui.getDataInLovFormat(apiUrl.branch, 2, null, { labelFeild: "brName", codeFeilds: "brCode" }).then(res => {
      this.ibrLovData = res;
    })
    // Modified By  : Aswathy  
    // Modified for : (15/12/2021) to solve the pagination issue from accounts lov. replace apiUrl.iac4 with apiUrl.fullAccounts

    this._ui.getDataInLovFormat(apiUrl.fullAccounts, 2, null, { labelFeild: "acName", codeFeilds: "acCode" }).then(res => {
      this.iac4LovData = res;
    })

    this._ui.getDataInLovFormat(apiUrl.iint, 2, null, { labelFeild: "intName", codeFeilds: "intCode" }, true).then(res => {
      this.iintLovData = res;
    })

    this._ui.getDataInLovFormat(apiUrl.currency, 2, null, { labelFeild: "name", codeFeilds: "code" }, true).then(res => {
      this.currencyList = res;
    })

  }

}

