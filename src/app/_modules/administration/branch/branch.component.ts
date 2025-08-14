import { IbrDto } from './../../../_dto/ibr.dto';
import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/_providers/branch.service';
import { MessageService } from 'primeng/api';
import { ErrorTranslateService } from '@accurate/providers';
import { UiService } from '@accurate/ui';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { ActionService, FormService, ICTFormPageBean } from '@accurate/toolbar';


/*
created by sruthin ps
date: 08-11-2021
franch master
 */

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent extends ICTFormPageBean implements OnInit {

  columnMetaData: FormAlignerDto[] = [];
  addressMetaData: FormAlignerDto[] = [];
  loading: boolean = false;
  helpCode: string = 'branchHelp';
  titleCode: string = 'branch';
  DIALOG_TITLE = "Branch"
  API_END_URL = apiUrl.branch;
  PRIMARY_KEYS = ["brCode", "dvCode", "coCode"];
  key = "brCode";
  icoData: IbrDto;
  ishide: boolean = false;
  branchList: IbrDto[];
  dvList: SelectItem[] = [];
  accountList: SelectItem[] = [];
  searchPopupColumns = [
    { field: 'brCode', header: "Br.", width: '2em' },
    { field: 'brName', header: 'branch Name', width: '3.5em' },
    { field: 'brShrtName', header: 'Branch Short Name', width: '2em' },
  ];
  dateFields = ["entrySDt", "entryEDt"]

  constructor(
    private _branchService: BranchService,
    private _errorTanslateService: ErrorTranslateService,
    private _messageService: MessageService,
    private _uiService: UiService,
    public service: FormService,
    public actionService: ActionService,
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    actionService.headerDto = IbrDto;
    this.getAllMetaData();
  }

  ngOnInit(): void {
    this.service.header = new IbrDto();
    this._branchService.getBranch(apiUrl.branch).then(res => {
      this.branchList = res;
    })
  }


  async getAllMetaData() {
    this.columnMetaData = [
      {
        type: 'group', size: 12, label: 'Branch Details', groupColumnMetaData: [
          // { columnName: 'coCode', size: 6, labelCode: 'coCode', maxlength: 2, mandatory: true },
          { columnName: 'dvCode', size: 3, labelCode: 'division', maxlength: 2, mandatory: true, type: 'dropdown', data: () => this.dvList, valueChange: (event) => this.divisionChange(event) },
          { columnName: 'brCode', size: 3, labelCode: 'braCode', maxlength: 2, mandatory: true },
          { columnName: 'brName', size: 3, labelCode: 'brName', maxlength: 50, mandatory: true },
          { columnName: 'brShrtName', size: 3, labelCode: 'brShrtName', maxlength: 10, mandatory: true },
          // { columnName: 'brNameAr', size: 12, labelCode: 'اسم الفرع', maxlength: 100, hidden: () => this.ishide },
          { columnName: 'commisionAc', size: 3, labelCode: 'commisionAc', type: 'dropdown', data: () => this.accountList, maxlength: 9 },
          { columnName: 'discountAc', size: 3, labelCode: 'discountAc', type: 'dropdown', data: () => this.accountList, maxlength: 9 },
          { columnName: 'entrySDt', size: 3, labelCode: 'entrySDt', type: 'date', mandatory: true, yearNavigationMaxRange: (new Date).getFullYear(), maxDate: new Date() },
          { columnName: 'entryEDt', size: 3, labelCode: 'entryEDt', type: 'date', mandatory: true, minDate: new Date(), yearNavigationMinRange: new Date().getFullYear() },
        ]
      },
      {
        type: 'group', size: 12, label: 'Contact Info', groupColumnMetaData: [
          { columnName: 'tel', size: 3, labelCode: 'tel', maxlength: 60, valueChange: (event) => this.phoneValueChange(event, "tel"), keyFilter: this._uiService.getPhoneRegex() },
          { columnName: 'fax', size: 3, labelCode: 'fax', maxlength: 60, valueChange: (event) => this.phoneValueChange(event, "fax"), keyFilter: this._uiService.getPhoneRegex() },
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

          { columnName: 'add1Ar', size: 6, type: 'textarea', labelCode: 'العنوان 1 عربي', maxlength: 50, hidden: () => this.ishide },
          { columnName: 'add2Ar', size: 6, type: 'textarea', labelCode: 'العنوان 2 عربي', maxlength: 50, hidden: () => this.ishide },
          { columnName: 'add3Ar', size: 6, type: 'textarea', labelCode: 'العنوان 3 عربي', maxlength: 50, hidden: () => this.ishide },
          { columnName: 'add4Ar', size: 6, type: 'textarea', labelCode: 'العنوان 4 عربي', maxlength: 50, hidden: () => this.ishide },
        ]
      }
    ]


    // await this._branchService.getCompanyDetails().then(data => {
    //   this.icoData = data;
    //   if (data.isArabic == 'Y') {
    //     this.ishide = false
    //   } else if (data.isArabic == 'N') {
    //     this.ishide = true;
    //   }
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });

    this._branchService.getDataInLovFormat('idv', 2, null, { labelFeild: "dvName", codeFeilds: "dvCode" }).then(res => {
      this.dvList = res;
    })

    this._branchService.getDataInLovFormat('Iac4', 2, null, { labelFeild: "acName", codeFeilds: "acCode" }).then(res => {
      this.accountList = res;
    })

  }

  async divisionChange(event) {
    await this._branchService.getOneMasterData('idv', event.value).then(res => {
      this.service.header.coCode = res.coCode;
    })
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

  emailValueChange() {
    if (!this._uiService.getEmailRegex().test(this.service.header.email)
    ) {
      this._messageService.add({ severity: "info", summary: "Info", detail: this._errorTanslateService.translate("emailNotValid"), });
      this.service.header.email = '';
      return false;
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

    if (!this.service.header.dvCode || this.service.header.dvCode == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('divisionNotNull') });
      return false
    }
    if (!this.service.header.brCode || this.service.header.brCode == '' || this.service.header.brCode.trim() == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('brCodeNotnull') });
      return false
    }
    if (!this.service.header.brName || this.service.header.brName == '' || this.service.header.brName.trim() == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('brNameNotnull') });
      return false
    }
    if (!this.service.header.brShrtName || this.service.header.brShrtName == '' || this.service.header.brShrtName.trim() == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('brshNameNotNull') });
      return false
    }
    if (!this.service.header.entrySDt || this.service.header.entrySDt == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('startDateNotNull') });
      return false
    }
    if (!this.service.header.entryEDt || this.service.header.entryEDt == '') {
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('endDateNotNull') });
      return false
    }
    return true;
  }


}
