import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService, MasterService } from '@accurate/providers';
import { ActionService, FormService, ICTFormPageBean } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IintfilterDto } from 'src/app/_dto/iintfilter.dto';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-account-filter-entry',
  templateUrl: './account-filter-entry.component.html',
  styleUrls: ['./account-filter-entry.component.scss']
})
export class AccountFilterEntryComponent extends ICTFormPageBean implements OnInit {

  DIALOG_TITLE = "Account Filter(Entry)"
  API_END_URL = apiUrl.iintaccounts;
  PRIMARY_KEYS = ["coCode", "intUser", "intCode", "filterSet", "acCode"];
  key: string = "acCode";
  intSearchPopupColumns = [
    { field: 'intCode', header: 'Code', width: '3em' },
    { field: 'intName', header: 'Interface Name', width: '4em' }
  ];

  userSearchPopupColumns = [
    { field: 'userId', header: 'Code', width: '3em' },
    { field: 'userName', header: 'User Name', width: '4em' }
  ];
  pagination = true;

  accountList: any[];
  selectedAccounts: any[];
  filteredAccounts: any[];
  nonFiltered: any[];
  columnMetaData: FormAlignerDto[] = [];
  typeLovData: SelectItem[] = [];
  userLovData: SelectItem[] = [];
  intCodeLovData: SelectItem[] = [];
  filterSetLovData: SelectItem[] = [];
  viewLovData: SelectItem[] = [];
  selectLovData: SelectItem[] = [];

  constructor(
    public actionService: ActionService,
    public service: FormService,
    private _ui: UiService,
    private _masterService: MasterService,
    private _lang: LangaugeTranslateService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService
  ) {
    super(service, actionService);
    this.actionService.currentComponent = this;
    actionService.headerDto = IintfilterDto;
    this.actionService.toolbarButton.delete = false;
    this.getColumnInfo();
    this.getLovData();
  }

  ngOnInit(): void {
    this.service.header = new IintfilterDto();
  }

  async searchPopUp() {
    if (!(await this.preSearchPopUp()))
      return;

    await this.service.searchList(this.service.header.intUser == 'INT' ? apiUrl.iint : apiUrl.userMaster).then((data) => {
      this.searchPopUpData = data['data'];
    }, (err) => {
      // console.warn("===error=", err.error.message);
    });

    const ref = this.actionService.showPopUp(this.searchPopUpData, this.service.header.intUser == 'INT' ? this.intSearchPopupColumns : this.userSearchPopupColumns);
    ref.onClose.subscribe((selectedRow: any) => {
      if (selectedRow) {
        this.service.header.intCode = this.service.header.intUser == 'INT' ? selectedRow.intCode : selectedRow.userId;
        if (this.service.header.intCode) {
          this._masterService.getMasterData(apiUrl.iintaccounts).then(res => {
            let accounts = res.filter(data => data.intCode == this.service.header.intCode)
            this.selectedAccounts = [];
            accounts.forEach(data => {
              this.accountList.filter(res => {
                if (res.acCode == data.acCode) { this.selectedAccounts.push(res); }
              })
            })
            this.setFilteredAccounts();
          })
        }
      }
    })
    await this.postSearchPopUp();
  }

  async postCreateInsert() {
    this.selectedAccounts = [];
  }

  getColumnInfo() {
    this.columnMetaData = [
      { columnName: 'code', size: 2, labelCode: 'code', },
      { columnName: 'name', size: 3, labelCode: 'name', },
    ]
  }

  getLovData() {
    this.typeLovData = [
      { label: this._lang.first("interface"), labelPl: this._lang.first("interface"), labelSl: this._lang.second("interface"), value: "INT" },
      { label: this._lang.first("user"), labelPl: this._lang.first("user"), labelSl: this._lang.second("user"), value: "USER" },
    ]

    this.filterSetLovData = [
      { label: this._lang.first("header"), labelPl: this._lang.first("header"), labelSl: this._lang.second("header"), value: "H" },
      { label: this._lang.first("detail"), labelPl: this._lang.first("detail"), labelSl: this._lang.second("detail"), value: "D" },
      { label: this._lang.first("header1"), labelPl: this._lang.first("header1"), labelSl: this._lang.second("header1"), value: "H1" },
      { label: this._lang.first("detail1"), labelPl: this._lang.first("user"), labelSl: this._lang.second("user"), value: "D1" },
    ]

    this.selectLovData =
      [{ label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("selectAll"), labelPl: this._lang.first("selectAll"), labelSl: this._lang.second("selectAll"), value: "S" },
      { label: this._lang.first("deselectAll"), labelPl: this._lang.first("deselectAll"), labelSl: this._lang.second("deselectAll"), value: "D" },
      ]

    this.viewLovData = [
      { label: this._lang.first("all"), labelPl: this._lang.first("all"), labelSl: this._lang.second("all"), value: "A" },
      { label: this._lang.first("filtered"), labelPl: this._lang.first("filtered"), labelSl: this._lang.second("filtered"), value: "F" },
      { label: this._lang.first("notFiltered"), labelPl: this._lang.first("notFiltered"), labelSl: this._lang.second("notFiltered"), value: "N" },
    ]

    this._ui.getDataInLovFormat(apiUrl.userMaster, 2, null, { labelFeild: 'userName', codeFeilds: 'userId' }, true).then(data => this.userLovData = data)
    this._ui.getDataInLovFormat(apiUrl.iint, 2, null, { labelFeild: 'intName', codeFeilds: 'intCode' }, true).then(data => this.intCodeLovData = data)

    this._masterService.getMasterData(apiUrl.iintfilterAccounts).then(data => {
      this.accountList = data;
    })
  }

  async preSave(): Promise<boolean> {
    if (this.service.header.intUser == "INT" && (!this.service.header.intCode || this.service.header.intCode.trim() == "")) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('intCodeCannotBeBlank') });
      return false;
    }
    if (this.service.header.intUser == "USER" && (!this.service.header.intCode || this.service.header.intCode.trim() == "")) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('intUserCannotBeBlank') });
      return false;
    }
    this.selectedAccounts.forEach(data => {
      if (data.acCode)
        this.service.header.accounts.push(data.acCode)//data.acCode//
    })
    return true;
  }

  selectionChange() {
    if (this.service.header.select == "S")
      this.selectedAccounts = this.accountList;
    else
      this.selectedAccounts = [];
  }

  paginate(event) {
    window.scrollTo(0, 0);
  }

  onRowSelect(event: any) {
    if (event.level == "1") {
      let data = [];
      this.accountList.filter(res => {
        if (res.ac1Code == event.code) {
          this.selectedAccounts.push(res);
        }
      })
    }
    else if (event.level == "2") {
      this.accountList.filter(res => {
        if (res.ac2Code == event.code) {
          this.selectedAccounts.push(res);
        }
      })
    }
    else if (event.level == "3") {
      this.accountList.filter(res => {
        if (res.ac3Code == event.code) {
          this.selectedAccounts.push(res);
        }
      })
    }
    else if (event.level == "4") {
      this.accountList.filter(res => {
        if (res.acCode == event.code) {
          this.selectedAccounts.push(res);
        }
      })
    }
  }

  onRowUnselect(event: any) {
    if (event.level == "1") {
      this.selectedAccounts = this.selectedAccounts.filter(res => res.ac1Code != event.code);
    }
    else if (event.level == "2") {
      this.selectedAccounts = this.selectedAccounts.filter(res => res.ac2Code != event.code);
    }
    else if (event.level == "3") {
      this.selectedAccounts = this.selectedAccounts.filter(res => res.ac3Code != event.code);
    }
    else if (event.level == "4") {
      this.selectedAccounts = this.selectedAccounts.filter(res => res.acCode != event.code);
    }
  }

  setFilteredAccounts() {
    this.filteredAccounts = this.selectedAccounts;
    this.getNonFilteredAccounts(this.accountList, this.selectedAccounts);
  }

  getNonFilteredAccounts(totAccount, selectedAccounts) {
    if (totAccount && totAccount.length > 0 && selectedAccounts) {
      const filterByReference = (totAccount, selectedAccounts) => {
        let res = [];
        res = totAccount.filter(el => {
          return !selectedAccounts.find(element => {
            return element.acCode == el.acCode;
          });
        });
        this.nonFiltered = res;
        return res;
      }
      filterByReference(totAccount, selectedAccounts);
    }
  }
}
