import { PrintColumnGroupByMetaDataDto, PrintColumnMetaDataDto } from '@accurate/dto';
import { IcoService, LangaugeTranslateService, MasterService, MenuService } from '@accurate/providers';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'report-designer-balancesheet',
  templateUrl: './report-designer-balancesheet.component.html',
  styleUrls: ['./report-designer-balancesheet.component.scss']
})
export class ReportDesignerBalancesheetComponent implements OnInit {

  // @Input('pdfColumnMetaData') pdfColumnMetaData: PrintColumnMetaDataDto[];
  @Input('printColumnMetaData') printColumnMetaData: PrintColumnMetaDataDto[] | PrintColumnGroupByMetaDataDto | any;
  @Input('data') data: any[];
  @Input('orgData') orgData: any[];
  @Input('reportHeading') reportHeading: string;
  @Input('detail') detail: boolean;
  @Input('detailPropertyName') detailPropertyName: boolean;
  @Input('detailPrintColumnMetaData') detailPrintColumnMetaData: PrintColumnMetaDataDto[];
  @Input('rptLanguage') rptLanguage: string;
  @Input('company') company: any;
  @Input('reportId') reportId: string;
  @Input('fromDate') fromDate: Date = new Date();
  @Input('toDate') toDate: Date = new Date();
  @Output('closeReportView') closeReportView: EventEmitter<any> = new EventEmitter();
  @Input('groupBy') groupBy: string;

  exportColumns = [];
  pdfColumns: PrintColumnGroupByMetaDataDto | PrintColumnMetaDataDto[] | any = [];
  pdfDetailColumns: PrintColumnMetaDataDto[] = [];

  coinDecFormat: string;
  totalTrading: any;
  totalIncome: any;

  constructor(
    public _lang: LangaugeTranslateService,
    public _menuService: MenuService,
    private _service: MasterService,
    private _icoService: IcoService,
    private datepipe: DatePipe
  ) {
  }

  async ngOnInit(): Promise<void> {
   

    if ((!this._lang.secondryLangauge) || (this._lang.secondryLangauge && this.rptLanguage == 'E')) {
      if (this.groupBy) {
        this.printColumnMetaData["detailMetaData"] = this.printColumnMetaData["detailMetaData"].filter((row) => { return !row.secondryFeild });
        this.printColumnMetaData["headerMetaData"] = this.printColumnMetaData["headerMetaData"].filter((row) => { return !row.secondryFeild });
      }
      else {
        this.printColumnMetaData = (this.printColumnMetaData && this.printColumnMetaData > 0) ? this.printColumnMetaData.filter((row) => { return !row.secondryFeild }) : '';
      }
      if (this.detailPrintColumnMetaData)
        this.detailPrintColumnMetaData = this.detailPrintColumnMetaData.filter((row) => { return !row.secondryFeild });

    }
    if (this._lang.secondryLangauge && this.rptLanguage == 'A') {
      if (this.groupBy) {
        this.printColumnMetaData["detailMetaData"] = this.printColumnMetaData["detailMetaData"].filter((row) => { return !row.hasSecondryFeild });
        this.printColumnMetaData["headerMetaData"] = this.printColumnMetaData["headerMetaData"].filter((row) => { return !row.hasSecondryFeild });
        this.printColumnMetaData["detailMetaData"] = this.printColumnMetaData["detailMetaData"].reverse();
        this.printColumnMetaData["headerMetaData"] = this.printColumnMetaData["headerMetaData"].reverse();
      } else {
        this.printColumnMetaData = this.printColumnMetaData.filter((row) => { return !row.hasSecondryFeild });
        this.printColumnMetaData = this.printColumnMetaData.reverse();
      }
      if (this.detailPrintColumnMetaData) {
        this.detailPrintColumnMetaData = this.detailPrintColumnMetaData.filter((row) => { return !row.hasSecondryFeild });
        this.detailPrintColumnMetaData = this.detailPrintColumnMetaData.reverse();
      }
    }

    if (this.groupBy) {
      this.pdfColumns["detailMetaData"] = this.printColumnMetaData["detailMetaData"].filter((row) => { return !row.isExcel && !row.hidden });
      this.pdfColumns["headerMetaData"] = this.printColumnMetaData["headerMetaData"].filter((row) => { return !row.isExcel && !row.hidden });
    } else {
      this.exportColumns = this.printColumnMetaData ? this.printColumnMetaData.map(col => ({ title: (this.rptLanguage == 'A' && !col.hasSecondryFeild) ? this._lang.second(col.columnHeading) : (this.rptLanguage == 'E' && !col.secondryFeild) ? this._lang.first(col.columnHeading) : '', dataKey: col.column, hidden: col.hidden })) : '';
      this.exportColumns = this.exportColumns ? this.exportColumns.filter((row) => { return !row.hidden }) : [];
      this.pdfColumns = this.printColumnMetaData ? this.printColumnMetaData.filter((row) => { return !row.isExcel && !row.hidden }) : '';
      this.pdfDetailColumns = this.detailPrintColumnMetaData ? this.detailPrintColumnMetaData.filter((row) => { return !row.isExcel && !row.hidden }) : [];
    }

    const coinDec = this._icoService.currentCompanyDetails.baseCurCodeD ? this._icoService.currentCompanyDetails.baseCurCodeD.coinDec : 0;
    this.coinDecFormat = `1.${coinDec}-${coinDec}`;
    this.totalTrading = this.getTotalGross('D');
    this.totalIncome = this.getTotalGross('I');
  }
  ngOnDestroy() {
    document.title = "Accurate";
  }

  getTotalGross(exptype: string) {
    let groupData = this.getGroups();
    let totalGross = 0
    for (let i = 0; i < groupData.length; i++) {
      if (this.orgData[groupData[i]].header.exptype.trim() == exptype) {
        this.orgData[groupData[i]].detail.forEach((res) => {
          totalGross = totalGross + parseFloat(res.amount2);
        })
      }
    }
    return totalGross;
  }

  print() {
    document.title = this.reportId ? `Report Id : ${this.reportId}` : "Accurate";
    window.print();
  }

  printExcel() {

  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getMasterDatas());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, document.title);
      // this.saveAsExcelFile(excelBuffer, "primengTable");
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
    for (let coun of this.orgData) {
      let data = {};
      for (let columData of this.printColumnMetaData) {
        if (!columData.hidden) {
          if (this.rptLanguage == 'A' && !columData.hasSecondryFeild) {
            if (this._lang.second(columData.columnHeading) && this._lang.second(columData.columnHeading) != "")
              if (columData.type && columData.type == 'date' && coun[columData.column]) {
                data[this._lang.second(columData.columnHeading)] = this.datepipe.transform(new Date(coun[columData.column]), 'dd-MM-yyyy'); // new Date(coun[columData.column]) ;
              }
              else if (columData.type && columData.type == 'dateTime' && coun[columData.column]) {
                data[this._lang.second(columData.columnHeading)] = this.datepipe.transform(new Date(coun[columData.column]), 'dd-MM-yyyy HH:mm'); // new Date(coun[columData.column]) ;
              }
              else
                data[this._lang.second(columData.columnHeading)] = coun[columData.column];
          }
          else if (this.rptLanguage == 'E' && !columData.secondryFeild) {
            if (columData.type && columData.type == 'date' && coun[columData.column]) {
              data[this._lang.first(columData.columnHeading)] = this.datepipe.transform(new Date(coun[columData.column]), 'dd-MM-yyyy'); // new Date(coun[columData.column]) ;
            }
            else if (columData.type && columData.type == 'dateTime' && coun[columData.column]) {
              data[this._lang.first(columData.columnHeading)] = this.datepipe.transform(new Date(coun[columData.column]), 'dd-MM-yyyy HH:mm'); // new Date(coun[columData.column]) ;
            }
            else
              data[this._lang.first(columData.columnHeading)] = coun[columData.column]
          }
        }
      }
      datas.push(data);
    }

    return datas;
  }

  exportCSV() {
    let data: any[] = this.orgData;
    data.forEach(col => {
      for (let j = 0; j < this.exportColumns.length; j++) {
        let cname: string = this.exportColumns[j].dataKey;
        if (col[cname] == null || !col[cname]) {
          col[cname] = "";
        }
      }
    })
    this.downloadFile(this.orgData, document.title);
  }

  downloadFile(data, filename) {
    this.exportColumns = this.exportColumns.filter(data => data.title != null);
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
    let row = '#,';

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

  closeReportViewButtonClick() {
    this.closeReportView.emit(null);
  }

  getGroups() {
    let groupData = [];
    for (let key in this.orgData)
      groupData.push(key);
    return groupData;
  }

}
