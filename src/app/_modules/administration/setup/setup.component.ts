import { SetupService } from './../../../_providers/setup.service';
import { filter } from 'rxjs/operators';
import { DivisionService } from './../../../_providers/division.service';
import { IsetupDto } from './../../../_dto/isetup.dto';
import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { ErrorTranslateService, IcoService, LangaugeTranslateService, MasterService } from '@accurate/providers';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MasterDesignService } from '@accurate/ui';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  allSetup: IsetupDto[]
  loading: boolean = false;
  setupoading: boolean = false;
  saveLoading: boolean = false;
  submitted: boolean;
  selectedSetup: IsetupDto;
  selectedUsers: IsetupDto[];
  titleCode = "setup";
  dataKey: string = "id";
  helpCode: string = "setupHelp";
  exportColumns: any[];
  columnMetaData: any[];
  columnPrintData: any[];
  printData: any[];
  isEditable: boolean = true;
  isupdate: boolean = false;
  icoData: any;
  brList: SelectItem[] = [];
  dvList: any[] = [];
  seleCtedBranch: any;
  totalRecords:any;
  ROWS_PER_PAGE_OPTIONS:any[]=[10,20,50]
  constructor(
    private _setupService: SetupService,
    private _errorTranslateService: ErrorTranslateService,
    private _messageService: MessageService,
    public _masterdesignService: MasterDesignService,
    public _lang: LangaugeTranslateService,
    private _confirmationService: ConfirmationService,
    private _masterService: MasterService
  ) {
    this.columnMetaData = [
      { field: 'name', headerCode: 'name' },
      { field: 'shortName', headerCode: 'shortName'},
      { field: 'acCode', headerCode: 'acCode'}
    ];


    // this._setupService.getCompanyDetails().then(data => {
    //   this.icoData = data;
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });

    this._setupService.getDataInLovFormat(apiUrl.branch, 2, null, { labelFeild: "brName", codeFeilds: "brCode" }).then(res => {
      this.brList = res;
    })


    this._setupService.getMasterData(apiUrl.division).then(res => {
      let selectRow = { dvName: "Please Select", dvCode: '', data: [] };
      this.dvList = [selectRow].concat(res.data);
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this._setupService.getAllData(`${apiUrl.setup}?where[purpose]=SETUP`).then((res) => {
      this.loading = false
      this.totalRecords = res.count

      this.allSetup = res.data;
      console.log("loggg",this.allSetup);
      
      this.columnPrintData = res.data;
      this.printData = res.data;
    }, (err) => {
      // console.warn("err", err);
    })
    this.exportColumns = this.columnMetaData.map(col => ({ title: col.type != 'file' ? this._lang.first(col.headerCode) : null, dataKey: col.field }));

  }

  editSetUp(setUp: IsetupDto) {
    this.isupdate = true;
    this.isEditable = true;
    this.selectedSetup = { ...setUp };
    this.setupoading = true;
  }

  createNew() {
    this.setupoading = true;
    this.isupdate = false;
    this.isEditable = false;
    this.selectedSetup = new IsetupDto();
    this.selectedSetup.purpose = 'SETUP';
  }


  hideDialog() {
    this.setupoading = false;
    this.submitted = false;
  }

  first: number = 0;

  rows: number = 10;

  onPageChange(event) {
      this.first = event.first;
      this.rows = event.rows;
      console.log(" this.first", this.first);
      console.log(" this.rows", this.rows);
      console.log("eventttt",event);
      
      
   this._setupService.getAllData(`${apiUrl.setup}?where[purpose]=SETUP&take=${event.rows}&skip=${event.first}`).then((res) => {
console.log("finalres",res)
this.allSetup = res['data']

})


      //where[purpose]=SETUP
      
  }

  async preSave(): Promise<boolean> {
    if (!this.selectedSetup.shortName || this.selectedSetup.shortName == '') {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('shtNameNotNull') });
      return false;
    }
    if (!this.selectedSetup.acCode || this.selectedSetup.acCode == '') {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('acCodeNotNull') });
      return false;
    }
    if (!this.selectedSetup.brCode || this.selectedSetup.brCode == '') {
      this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('brNotNull') });
      return false;
    }
    // if (!this.selectedSetup.dvCode || this.selectedSetup.dvCode == '') {
    //   this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTranslateService.translate('divisionNotNull') });
    //   return false;
    // }
    return true;
  }

  async saveUser() {
    if (!(await this.preSave())) {
      return
    }
    if (this.isupdate == true) {
      this.saveLoading = true;
      await this._setupService.updateData(this.selectedSetup, this.selectedSetup.acCode).then(async res => {
        
        this.setupoading = false;
        this.saveLoading = false;
        this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate("saveSuccess") })
        await this._setupService.getAllData(`${apiUrl.setup}?where[purpose]=SETUP`).then((res) => {
          this.loading = false
          this.allSetup = res.data;
           
          
        }, (err) => {
          // console.warn("err", err);
        })
      }, (err) => {
        this.saveLoading = false;
        // console.warn("err", err);
      })
    }
    else if (this.isupdate == false) {
      await this._setupService.saveSetup(this.selectedSetup).then(async res => {
        this.setupoading = false;
        this.saveLoading = false;
        this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate("updateSuccess") })
        await this._setupService.getAllData(`${apiUrl.setup}?where[purpose]=SETUP`).then((res) => {
          this.loading = false
          this.allSetup = res.data;
          this.totalRecords = res.count;
        }, (err) => {
          // console.warn("err", err);
        })
      }, (err) => {
        this.saveLoading = false;
        // console.warn("==err==", err);
      })
    }
  }

  async delete(setUp: IsetupDto) {
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        await this._setupService.deleteSetup(`isetup/${setUp.acCode}?where[coCode]=${setUp.coCode}&where[dvCode]=${setUp.dvCode}&where[brCode]=${setUp.brCode}&where[shortName]=${setUp.shortName}`).then(async (res) => {
          setTimeout(async () => {
            await this._messageService.add({ severity: 'success', summary: 'Success', detail: this._errorTranslateService.translate('deleteSuccess') });
          }, 1000);
          await this._setupService.getAllData(`${apiUrl.setup}?where[purpose]=SETUP`).then((res) => {
            this.loading = false
            this.allSetup = res.data;
            this.totalRecords = res.count
          }, (err) => {
            // console.warn("err", err);
          })
        }, (err) => {
          // console.warn("==er===", err);
        }
        );
      }
    });
  }


  async branchChange(event) {
    await this._setupService.getOneMasterData(apiUrl.branch, event.value).then(res => {
      this.selectedSetup.dvCode = res.dvCode;
      this.selectedSetup.coCode = res.coCode;
      this.seleCtedBranch = res;
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


}
