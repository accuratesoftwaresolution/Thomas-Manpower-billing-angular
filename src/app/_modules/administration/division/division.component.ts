import { FormAlignerDto } from '@accurate/dto';
import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, FormService, ICTFormPageBean } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IdvDto } from 'src/app/_dto/idv.dto';
import { IcoLovDto } from 'src/app/_dto/lov/ico-lov.dto';
import { DivisionService } from 'src/app/_providers/division.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent extends ICTFormPageBean implements OnInit {

  columnMetaData: FormAlignerDto[] = [];
  addressMetaData: FormAlignerDto[] = [];
  loading: boolean = false;
  helpCode: string = 'divisionHelp';
  titleCode: string = 'division';
  DIALOG_TITLE = "Division"
  API_END_URL = apiUrl.division;
  PRIMARY_KEYS = ["dvCode"];
  key = "dvCode";
  pagination: boolean = true;
  icoData: IcoLovDto;
  isHide: boolean = false;
  divisionList: IdvDto[];
  searchPopupColumns = [
    { field: 'coCode', header: 'CO.', width: '2em' },
    { field: 'dvCode', header: 'DV.', width: '2em' },
    { field: 'dvName', header: 'Division Name', width: '3.5em' },
    { field: 'dvShrtName', header: 'Division Short Name', width: '2em' }
  ];

  constructor(
    private _divisionService: DivisionService,
    private _errorTanslateService: ErrorTranslateService,
    private _messageService: MessageService,
    private _uiService: UiService,
    public service: FormService,
    public actionService: ActionService,
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    actionService.headerDto = IdvDto
    this.actionService.toolbarButton.rollback = false
    this.getAllMetaData();
  }

  ngOnInit(): void {

    this.service.header = new IdvDto();
    this._divisionService.getDivisions(apiUrl.division).then(res => {
      this.divisionList = res.data;
    })
  }


  async getAllMetaData() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: 'Division Details', groupColumnMetaData: [
          // { columnName: 'coCode', size: 6, labelCode: 'coCode', maxlength: 2, mandatory: true },
          { columnName: 'dvCode', size: 4, labelCode: 'dvCode', maxlength: 2, mandatory: true },
          { columnName: 'dvName', size: 4, labelCode: 'dvName', maxlength: 50, mandatory: true },
          { columnName: 'dvShrtName', size: 4, labelCode: 'dvShrtName', maxlength: 10, mandatory: true },
          // { columnName: 'dvNameAr', size: 12, labelCode: 'اسم', maxlength: 100, hidden: () => this.isHide },
          { columnName: 'costStyle', size: 6, labelCode: 'costStyle', maxlength: 1 },
          { columnName: 'qtyDecPts', size: 6, labelCode: 'qtyDecPts', type: 'number' },
        ]
      },
      {
        type: 'group', size: 6, label: 'Ageing Days', groupColumnMetaData: [
          { columnName: 'age_1', size: 3, labelCode: 'age1', type: 'number' },
          { columnName: 'age_2', size: 3, labelCode: 'age2', type: 'number' },
          { columnName: 'age_3', size: 3, labelCode: 'age3', type: 'number' },
          { columnName: 'age_4', size: 3, labelCode: 'age4', type: 'number' },
          { columnName: 'age_5', size: 6, labelCode: 'age5', type: 'number' },
        ]
      },
      {
        type: 'group', size: 6, label: 'Inventory Ageing Days', groupColumnMetaData: [
          { columnName: 'iAge1', size: 3, labelCode: 'iAge1', type: 'number' },
          { columnName: 'iAge2', size: 3, labelCode: 'iAge2', type: 'number' },
          { columnName: 'iAge3', size: 3, labelCode: 'iAge3', type: 'number' },
          { columnName: 'iAge4', size: 3, labelCode: 'iAge4', type: 'number' },
          { columnName: 'iAge5', size: 6, labelCode: 'iAge5', type: 'number' },
        ]
      },
      {
        type: 'group', size: 12, label: 'Contact Info', groupColumnMetaData: [
          { columnName: 'tel', size: 3, labelCode: 'tel', maxlength: 20, valueChange: (event) => this.phoneValueChange(event, "tel") , keyFilter: this._uiService.getPhoneRegex()},
          { columnName: 'fax', size: 3, labelCode: 'fax', maxlength: 20, valueChange: (event) => this.phoneValueChange(event, "fax") , keyFilter: this._uiService.getPhoneRegex()},
          { columnName: 'email', size: 3, labelCode: 'email', maxlength: 30, valueChange: () => this.emailValueChange() },
          { columnName: 'website', size: 3, labelCode: 'website', maxlength: 30, valueChange: (event) => this.webSiteValueChange(event) },
        ]
      }
    ]

    this.addressMetaData = [
      {
        type: 'group', size: 12, label: 'Address', groupColumnMetaData: [
          { columnName: 'add1', size: 6, labelCode: 'add1', maxlength: 30, type: 'textarea' },
          { columnName: 'add2', size: 6, labelCode: 'add2', maxlength: 30, type: 'textarea' },
          { columnName: 'add3', size: 6, labelCode: 'add3', maxlength: 30, type: 'textarea' },
          { columnName: 'add4', size: 6, labelCode: 'add4', maxlength: 30, type: 'textarea' },

          { columnName: 'add1Ar', size: 6, type: 'textarea', labelCode: 'العنوان 1 عربي', maxlength: 50, hidden: () => this.isHide },
          { columnName: 'add2Ar', size: 6, type: 'textarea', labelCode: 'العنوان 2 عربي', maxlength: 50, hidden: () => this.isHide },
          { columnName: 'add3Ar', size: 6, type: 'textarea', labelCode: 'العنوان 3 عربي', maxlength: 50, hidden: () => this.isHide },
          { columnName: 'add4Ar', size: 6, type: 'textarea', labelCode: 'العنوان 4 عربي', maxlength: 50, hidden: () => this.isHide },
        ]
      }
    ]


    // await this._divisionService.getCompanyDetails().then(data => {
    //   this.icoData = data;
    //   if (data.isArabic == 'Y') {
    //     this.isHide = false
    //   } else if (data.isArabic == 'N') {
    //     this.isHide = true;
    //   }
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });


  }

  emailValueChange() {
    if (!this._uiService.getEmailRegex().test(this.service.header.email)
    ) {
      this._messageService.add({ severity: "info", summary: "Info", detail: this._errorTanslateService.translate("emailNotValid"), });
      this.service.header.email = '';
      return false;
    }
  }


  phoneValueChange(event, colName) {
    if ((this.service.header.tel && colName == "tel") && (!this._uiService.getPhoneRegex().test(this.service.header.tel))) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this.service.header.translate('EnterValidTelephone') });
      this.service.header.tel = null;
    }
    if ((this.service.header.fax && colName == "fax") && (!this._uiService.getPhoneRegex().test(this.service.header.fax))) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this.service.header.translate('EnterValidFax') });
      this.service.header.fax = null;
    }
  }

  webSiteValueChange(event) {
    if (this.service.header.website && (!this._uiService.getWebsiteRegex().test(this.service.header.website))) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('EnterValidWebsite') });
      this.service.header.website = null;
      return;
    }
  }


  async preSave(): Promise<boolean> {

    // if (!this._divisionService.header.coCode || this._divisionService.header.coCode == '' || this._divisionService.header.coCode.trim() == '') {
    //   await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('coCodeNotNull') });
    //   return false
    // }
    if (!this.service.header.dvCode || this.service.header.dvCode == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('dvCodeNotNull') });
      return false
    }
    if (!this.service.header.dvName || this.service.header.dvName == '' || this.service.header.dvName.trim() == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('dvNameNotNull') });
      return false
    }
    if (!this.service.header.dvShrtName || this.service.header.dvShrtName == '' || this.service.header.dvShrtName.trim() == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('dvShrtNameNotNull') });
      return false
    }
    if (this.service.header.dvShrtName && this.service.header.dvShrtName.length > 10) {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('shnamelength') });
      return false
    }
    return true;
  }


}
