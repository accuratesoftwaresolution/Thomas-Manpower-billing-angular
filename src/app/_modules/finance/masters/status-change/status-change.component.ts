import { MessageService } from 'primeng/api';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { StatusChangeService } from './../../../../_providers/status-change.service';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { MasterDesignService, UiService } from '@accurate/ui';

/*
created by sruthin ps
date: 15-11-2021

modified by sruthin 
date: 16/12/2021
pagination and search filter
 */

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss']
})
export class StatusChangeComponent implements OnInit {


  titleCode = "statusChange";
  helpCode: string = "statusChangeHelp";
  statusChangeData: Iac4Dto[] = [];
  statusChangeData2: Iac4Dto[] = [];
  apiEndUrl: string = apiUrl.iac4;
  updateEndUrl: string = apiUrl.statusChange;
  status: SelectItem[] = [];
  yesNo: SelectItem[] = [];
  acCategory: SelectItem[] = [];
  countryList: SelectItem[] = [];
  territoryList: SelectItem[] = [];
  selectedStatusChange: Iac4Dto;
  clonedStatusChangeData: { [s: string]: Iac4Dto; } = {};
  updatingStatusShange: Iac4Dto[] = [];
  statusChange2: Iac4Dto[];
  rowActiveIndex: number;
  disabled: boolean = true;
  isUpdate: boolean = false;
  exportColumns: any[];
  columnMetaData: any[];
  columnPrintData: any[];
  printData: any[];
  totalRecords: number;
  take = 10;
  count: number;
  where: string;
  sortKey: string = '!acCode';
  searchTimer: any;
  searchValue: string = '';
  selecetedColumnForSearch: string = "acName";
  searchColumnsList: SelectItem[];

  constructor(
    private _statusChange: StatusChangeService,
    private _messageService: MessageService,
    private _errorTranslateService: ErrorTranslateService,
    private _uiService: UiService,
    public _lang: LangaugeTranslateService,
    public _masterdesignService: MasterDesignService,
  ) {
    this.getAllLovData();
  }

  ngOnInit(): void {
    // this.selectedStatusChange = new Iac4Dto();
    // this._statusChange.getMasterData(this.apiEndUrl).then(res => {
  
    //   this.statusChangeData = res.data;
    // })

   
  }

  loadData(event, where, skip: number, take) {
    this._statusChange.getMasterData(`${apiUrl.iac4}?${where ? (where + "&") : ""}skip=${skip}&take=${take}`).then((res: any) => {
      this.statusChangeData = res.data;
      this.totalRecords = res.count
    }, (err) => {
      // console.warn("===err===", err);
    })
    this.exportColumns = this.columnMetaData.map(col => ({ title: col.type != 'file' ? this._lang.first(col.headerCode) : null, dataKey: col.field }));

  }




  searchTimeOut() {
    if (this.searchTimer) clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(() => {
      this.updateResults(null)
    }, 1000);
  }

  async updateResults(event) {

    let skip
    if (!event || event == null) {
      skip = 0;
    }
    else
      skip = event.first;
    let where
    if (this.searchValue) {
      this.searchValue = this.searchValue.toUpperCase();
      if (where)
        where = `&where[${this.selecetedColumnForSearch}]=${this.searchValue}`
      else
        where = `where[${this.selecetedColumnForSearch}]=${this.searchValue}`
    }
    if (this.sortKey) {
      if (this.sortKey == '!acCode') {
        let key = 'acCode'
        if (where)
          where = where + `&order[${key}]=DESC`
        else
          where = `order[${key}]=DESC`
      } else {

        if (where)
          where = where + `&order[${this.sortKey}]=ASC`
        else
          where = `order[${this.sortKey}]=ASC`
      }
    }
    this.loadData(null, where, skip, this.take)
  }

  clearSearch() {
    this.searchValue = '';
    this.searchTimeOut();
  }




  getStatusLabel(type: string) {
    const contactLabel = this.status.find((row) => row.value == type);
    if (contactLabel)
      return contactLabel.label;
  }

  getacCatLabel(type: number) {
    const contactLabel = this.acCategory.find((row) => row.value == type);
    if (contactLabel)
      return contactLabel.label;
  }

  
  getCountryLabel(type: string) {
    const contactLabel = this.countryList.find((row) => row.value == type);
    if (contactLabel)
      return contactLabel.label;
  }

  getYesNoLabel(type: string) {
    const contactLabel = this.yesNo.find((row) => row.value == type);
    if (contactLabel)
      return contactLabel.label;
  }

  onRowEditInit(statusChange: Iac4Dto) {
    this.disabled = false;
    this.isUpdate = true;
    this.selectedStatusChange = { ...statusChange };
    this.clonedStatusChangeData[statusChange.acCode] = {...statusChange};
  }

  replaceCatFromL3(event) {
    if (event.checked == false) {
      this.selectedStatusChange.acCatFromAc3 = 'N';
    } else if (event.checked == true) {
      this.selectedStatusChange.acCatFromAc3 = 'Y';
    }
  }

  async preSave(): Promise<boolean> {
    if (this.isUpdate == true) {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('confirmEditedData') });
      return false;
    }
    return true;
  }

  onRowEditSave(statusChange: Iac4Dto, index: number) {
    const newRow = statusChange;
    if (this.selectedStatusChange.acCatFromAc3) {
      newRow.acCatFromAc3 = this.selectedStatusChange.acCatFromAc3;
    }
    (this.updatingStatusShange).push(newRow);
    this.rowActiveIndex = (this.updatingStatusShange).length - 1;
    this.isUpdate = false;
  }

  onRowEditCancel(statusChange: Iac4Dto, index: number) {
    this.disabled = true;
    this.statusChangeData[index] = this.clonedStatusChangeData[statusChange.acCode];
    delete this.clonedStatusChangeData[statusChange.acCode];
}


  async save() {
    if (!(await this.preSave())) {
      return
    }
    await this._statusChange.updateData(this.updateEndUrl, this.updatingStatusShange).then(res => {
      this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate('updateSuccess') });
      this.searchTimeOut();
    }, (err) => {
      this._uiService.handleError(err.error.message);
      // console.warn("===err===", err);
    })
  }


  getAllLovData() {

    this.searchColumnsList = [
      { label: this._lang.first('acName'), value: 'acName' },
      { label: this._lang.first('acCode'), value: 'acCode' },
      { label: this._lang.first('vatRegNo'), value: 'vatRegNo' },
      { label: this._lang.first('countryCode'), value: 'countryCode' },
      { label: this._lang.first('territoryCode'), value: 'territoryCode' },
    ];

    this.columnMetaData = [
      { field: 'acCode', headerCode: 'ac/Code' },
      { field: 'acName', headerCode: 'ac/Name'},
      { field: 'acCat', headerCode: 'ac/Cat'},
      { field: 'acCatFromAc3', headerCode: 'replaceCatFromL3'},
      { field: 'status', headerCode: 'status'},
      { field: 'statusRemarks', headerCode: 'statusRemarks'},
      { field: 'remarks', headerCode: 'remarks'},
      { field: 'vatRegNo', headerCode: 'vatRegNo'},
      { field: 'countryCode', headerCode: 'countryCode'},
      { field: 'territoryCode', headerCode: 'territoryCode'}
    ];

    this.status = [
      {label: this._lang.first("select"), labelPl: this._lang.first("select"), labelSl: this._lang.second("select"), value: ""},
      {label: this._lang.first("active"), labelPl: this._lang.first("active"), labelSl: this._lang.second("active"), value: "A"},
      {label: this._lang.first("inactive"), labelPl: this._lang.first("inactive"), labelSl: this._lang.second("inactive"), value: "I"},
    ]

    this.yesNo = [ 
      {label: this._lang.first("select"), labelPl: this._lang.first("select"), labelSl: this._lang.second("select"), value: ""},
      { label: this._lang.first("yes"), labelPl: this._lang.first("yes"), labelSl: this._lang.second("yes"), value: "Y" },
      { label: this._lang.first("no"), labelPl: this._lang.first("no"), labelSl: this._lang.second("no"), value: "N" }
    ]

    this._statusChange.getDataInLovFormat1(apiUrl.iacat, 2, null, {labelFeild: "name",codeFeilds: "code"}).then( res => {
      this.acCategory = res;
    })

    this._statusChange.getDataInLovFormat1(apiUrl.country, 2, null, {labelFeild: "name",codeFeilds: "code"}).then( res => {
      this.countryList = res;
    })

    this._statusChange.getDataInLovFormat1(apiUrl.territory, 2, null, {labelFeild: "name",codeFeilds: "code"}).then( res => {
      this.territoryList = res;
    })

  }


  exportPdf() {
    document.title = this.titleCode;
    window.print();
  }
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getMasterDatas());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      //this.saveAsExcelFile(excelBuffer, this._menuService.selectedMenu.label);
      this.saveAsExcelFile(excelBuffer, "Excel");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getMasterDatas() {
    let datas = [];
    for (let coun of this.columnPrintData) {
      let data = {};
      for (let columData of this.columnMetaData) {
        data[this._lang.first(columData.headerCode)] = coun[columData.field];
      }
      datas.push(data);
    }
    return datas;
  }

  exportCSV() {
    let data: any[] = this.printData;
    data.forEach(col => {
      for (let j = 0; j < this.exportColumns.length; j++) {
        let cname: string = this.exportColumns[j].dataKey;
        if (col[cname] == null || !col[cname]) {
          col[cname] = "";
        }
      }
    })
    this.downloadFile(this.printData, "CSV");
  }

  downloadFile(data, filename) {
    this.exportColumns = this.exportColumns.filter(data => data.title != "");
    let csvData = this.ConvertToCSV(data, this.exportColumns);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'Sr No.,';

    for (let index in headerList) {
      row += headerList[index].title + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index].dataKey;
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }
    return str;
  }

  paginateScrollUp(event) {
    window.scrollTo(0, 0);
  }

}
