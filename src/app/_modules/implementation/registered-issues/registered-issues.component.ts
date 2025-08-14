import { SelectItem, SelectItemDto } from '@accurate/dto';
import { AuthService, LangaugeTranslateService, MasterService } from '@accurate/providers';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IgissueSummaryDto } from 'src/app/_dto/igissue-summary.dto';
import { RegisteredIssueService } from 'src/app/_providers/registered-issue.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-registered-issues',
  templateUrl: './registered-issues.component.html',
  styleUrls: ['./registered-issues.component.scss']
})
export class RegisteredIssuesComponent implements OnInit {

  titleCode: string = "registeredIssues";
  helpCode: string = "registeredIssuesHelp";
  loading: boolean = false;
  sortField: string;
  sortOrder: number;
  sortOptions: SelectItem[];
  filterOptions: SelectItem[];
  sortOptions2: SelectItem[];
  serachColumnsList: SelectItem[];
  serachColumnsList2: SelectItem[];
  filteredItems: any[];
  searchTimer: any;
  issueData: any[];
  skip = 0;
  take = 10;
  count: number;
  totalRecords: number;
  orderOptions: SelectItem[];
  assignedToList: SelectItemDto[] = [];
  issueTrackerData: IgissueSummaryDto[];
  statusList: SelectItem[] = [];
  key: string;
  viewIssue: boolean =false;
  issueId: number;

  constructor(
    public _registeredIssueService: RegisteredIssueService,
    public _lang: LangaugeTranslateService,
    private _masterService: MasterService,
    private _authService: AuthService
  ) {
    this.serachColumnsList = [
      { label: this._lang.first('name'), value: 'name' },
      { label: this._lang.first('subject'), value: 'summary' },
      { label: this._lang.first('issueId'), value: 'code' },
      { label: this._lang.first('assignedTo'), value: 'assignedTo' },
    ]
    this.serachColumnsList2 = [
      { label: this._lang.first('name'), value: 'name' },
      { label: this._lang.first('subject'), value: 'summary' },
      { label: this._lang.first('issueId'), value: 'code' }
    ]
    this.sortOptions = [
      { label: this._lang.first('newestFirst'), value: '!code' },
      { label: this._lang.first('oldestFirst'), value: 'code' },
      { label: this._lang.first('assigned'), value: 'assignedTo' },
      { label: this._lang.first('unAssigned'), value: '!assignedTo' },
    ];

    this.filterOptions = [
      { label: "All", value: "" },
      { label: "Open", value: "O" },
      { label: "Hold", value: "H" },
      { label: "WIP", value: "W" },
      { label: "Closed", value: "C" },
      { label: "Cancelled", value: "CN" },
    ];

    this.sortOptions2 = [
      { label: this._lang.first('newestFirst'), value: '!code' },
      { label: this._lang.first('oldestFirst'), value: 'code' },
    ];
  }

  ngOnInit(): void {
    this._registeredIssueService.getDataInLovFormat(apiUrl.igdeveloper, 1, null, null, null).then(res => {
      this.assignedToList = res;
    }, (err) => {
      // console.warn("==err==", err);
    });
    this._authService.getUserInfo().then((res: any) => {

      if (res.userType == 'N') {
        this._registeredIssueService.notSuperUser = true;
      }
    })
  }



  goToViewPage(issue: IgissueSummaryDto) {
    this.issueId = issue.code;
    // this.router.navigate(['registered_issues/', issue.code]);
    this.viewIssue = true;
  }

  searchTimeOut() {
    if (this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.updateResults(null)
    }, 1000);
  }

  loadData(event, where, skip: number, take: number, order) {
    this.loading = true;
    this._registeredIssueService.getMasterData(`${apiUrl.igissueSummary}/pagination?${where ? (where + "&") : ""}skip=${skip}&take=${this.take}`).then((data: any) => {
      this.loading = false;
      this.issueData = data.data;
      this.filteredItems = data.data;
      this.totalRecords = data.count;

    }, (err) => {
      // console.warn("===err===", err);
    })
  }

  async updateResults(event) {
    // console.warn(event);
    let skip;
    if (!event || event == null) {
      skip = 0;
    }
    else
      skip = event.first;
    let where
    let order
    if (this._registeredIssueService.searchValue) {
      if(this._registeredIssueService.selecetedColumnForSearch == "assignedTo"){
        this._registeredIssueService.searchByStatus='W';
      }
      if (where)
        where = `&where[${this._registeredIssueService.selecetedColumnForSearch}]=${this._registeredIssueService.searchValue}`
      else
        where = `where[${this._registeredIssueService.selecetedColumnForSearch}]=${this._registeredIssueService.searchValue}`
    }

    if (this._registeredIssueService.sortKey) {
      if (this._registeredIssueService.sortKey == '!code') {
        let key = 'code';
        this._registeredIssueService.orderKey = 'DESC';
        if (where)
          where = where + `&order[${key}]=${this._registeredIssueService.orderKey}`
        else
          where = `order[${key}]=${this._registeredIssueService.orderKey}`
      }
      else if (this._registeredIssueService.sortKey == 'assignedTo') {
        this._registeredIssueService.orderKey = 'ASC';
        this._registeredIssueService.searchByStatus = 'W'
        if (where)
          where = where + `&order[${this._registeredIssueService.sortKey}]=${this._registeredIssueService.orderKey}`
        else
          where = `order[${this._registeredIssueService.sortKey}]=${this._registeredIssueService.orderKey}`
      }
      else if (this._registeredIssueService.sortKey == '!assignedTo') {
        this._registeredIssueService.searchByStatus = 'O'
        let key = 'assignedTo';
        this._registeredIssueService.orderKey = 'DESC';
        if (where)
          where = where + `&order[${key}]=${this._registeredIssueService.orderKey}`
        else
          where = `order[${key}]=${this._registeredIssueService.orderKey}`
      }
      else {
        this._registeredIssueService.orderKey = 'ASC';
        if (where)
          where = where + `&order[${this._registeredIssueService.sortKey}]=${this._registeredIssueService.orderKey}`
        else
          where = `order[${this._registeredIssueService.sortKey}]=${this._registeredIssueService.orderKey}`
      }

    }
    if (this._registeredIssueService.searchByStatus) {
      if (where)
        where = where + `&where[${this._registeredIssueService.selecetedKeyForSearch}]=${this._registeredIssueService.searchByStatus}`
      else
        where = `where[${this._registeredIssueService.selecetedKeyForSearch}]=${this._registeredIssueService.searchByStatus}`
    }

    this.loadData(null,where, skip, this.take, order)
  }
  clearSearch() {
    this._registeredIssueService.searchValue = '';
  }
  clearKey() {
    this._registeredIssueService.orderKey = '';
  }

  clearSort() {
    if (this._registeredIssueService.sortKey == 'assignedTo' || this._registeredIssueService.sortKey == '!assignedTo') {
      this._registeredIssueService.sortKey = ''
    }
    if (this._registeredIssueService.selecetedColumnForSearch == 'assignedTo') {
      this._registeredIssueService.selecetedColumnForSearch = 'name';
      this._registeredIssueService.searchValue = '';
    }
  }

  clearFilter() {
    this._registeredIssueService.orderKey = '';
    this._registeredIssueService.searchValue = '';
    this._registeredIssueService.searchByStatus = 'O';
    this._registeredIssueService.sortKey = '!code';
    this._registeredIssueService.selecetedColumnForSearch = "name";
    this.updateResults(null)

  }

  getDev(code: number) {
    const developer: any = this.assignedToList.find((row) => row.value == code);
    return developer.label;
  }

}
