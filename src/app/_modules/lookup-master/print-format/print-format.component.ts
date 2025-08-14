import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPFormatCo } from 'src/app/_dto/TbldPFormatCo.dto';
import { TblHPFormat } from 'src/app/_dto/TblHPFormat.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-print-format',
  templateUrl: './print-format.component.html',
  styleUrls: ['./print-format.component.scss']
})
export class PrintFormatComponent implements OnInit {
  activatedeactivate:any;

  singleCompany:any;

  isSaving: boolean = false;

  progressValue: number = 0;

  TblHPFormat: TblHPFormat = new TblHPFormat()

  tableIndex: any;

  HPFormat_SysID: any;

  showDeleteButton: boolean = false;

  add: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  PrintList: boolean = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHPFormat.TbldPFormatCo = [new TbldPFormatCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPFormat_SysID = Number(id);
        this.TblHPFormat.HPFormat_SysID = Number(id);
        this.getdata()
      }
    });
    this.getlovdata()
  }
  getlovdata() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activatedeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCompany).then((res) => {
      this.singleCompany = res
    })
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCompany
        break;
      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activatedeactivate
        break;
      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {

      case 'ApplicableCompanyCode':

        const selectedCode = event.SingleCo_Code
        const isExist = this.TblHPFormat.TbldPFormatCo.some(item => item.DcPFormat_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Print Format' });
          return;
        }
        this.TblHPFormat.TbldPFormatCo[this.tableIndex].DcPFormat_SingleCo_SysID = event.SingleCo_SysID
        this.TblHPFormat.TbldPFormatCo[this.tableIndex].DcPFormat_SingleCo_Code = event.SingleCo_Code
        this.TblHPFormat.TbldPFormatCo[this.tableIndex].DcPFormat_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHPFormat.HPFormat_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPFormat.HPFormat_AcDe_Code = event.HActDeactive_Code
        this.TblHPFormat.HPFormat_AcDe_Name = event.HActDeactive_Name
        break;


      default:
        break;
    }

  }

  deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (this.TblHPFormat.HPFormat_SysID && rowData.DcPFormat_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.printFormat, `company?where[DcPFormat_SysID]=${this.TblHPFormat.TbldPFormatCo[0].DcPFormat_SysID}&where[DcPFormat_SingleCo_SysID]=${rowData.DcPFormat_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldPFormatCo') {
                this.TblHPFormat.TbldPFormatCo.splice(index, 1);
                if (this.TblHPFormat.TbldPFormatCo.length === 0) {
                  this.addRow('TbldPFormatCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPFormatCo') {
            this.TblHPFormat.TbldPFormatCo.splice(index, 1);
            if (this.TblHPFormat.TbldPFormatCo.length === 0) {
              this.addRow('TbldPFormatCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPFormatCo') {
      const newRow = new TbldPFormatCo()
      this.TblHPFormat.TbldPFormatCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPFormat.HPFormat_Code == null || this.TblHPFormat.HPFormat_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Print Format Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPFormat.HPFormat_Name == null || this.TblHPFormat.HPFormat_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Print Format Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) return;

    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      this.progressValue += 10;
      if (this.progressValue >= 90) clearInterval(interval);
    }, 200);
    this.TblHPFormat.TbldPFormatCo = this.TblHPFormat.TbldPFormatCo.filter(
      row => row.DcPFormat_SingleCo_Code && row.DcPFormat_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.printFormat, this.TblHPFormat).then((res) => {
      clearInterval(interval);

      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHPFormat = (new TblHPFormat())
        this.TblHPFormat.TbldPFormatCo = [new TbldPFormatCo()]
        this.router.navigate(['l-master/print-format-master/']);
        this.progressValue += 100;


      }

      setTimeout(() => {
        this.isSaving = false;
        this.progressValue = 50;
      }, 800);
    }).catch(() => {
      clearInterval(interval);
      this.progressValue = 50;
      this.isSaving = false;
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Save failed' });
    });
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHPFormat.HPFormat_SysID || this.HPFormat_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.printFormat, this.TblHPFormat.HPFormat_SysID).then((res) => {
        this.TblHPFormat = res
        this.showDeleteButton = true;

        if (this.TblHPFormat.TbldPFormatCo.length == 0) {
          this.TblHPFormat.TbldPFormatCo = [new TbldPFormatCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPFormat = new TblHPFormat()
          this.TblHPFormat.TbldPFormatCo = [new TbldPFormatCo()]
        }
      })
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.printFormat, this.TblHPFormat.HPFormat_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()


          }

        }, err => {
          if (err.error.statusCode == 409) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        });
      }

    });
  }

  Refresh() {
    this.TblHPFormat = new TblHPFormat()
    this.TblHPFormat.TbldPFormatCo = [new TbldPFormatCo()]
    this.router.navigate(['l-master/print-format-master/']);

  }
  cancel() {
    this.TblHPFormat = new TblHPFormat()
    this.TblHPFormat.TbldPFormatCo = [new TbldPFormatCo()]
    this.router.navigate(['l-master/print-format-master/']);

  }
  // ---------------------------------------------------------------------List--------------------------
  PrintFormatList() {
    this.PrintList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.printFormat).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPFormat_Code || item.HPFormat_Name || item.HPFormat_SysID;
      const matchesQuery =
        (item.HPFormat_Code || '').toLowerCase().includes(query) ||
        (item.HPFormat_Name || '').toLowerCase().includes(query) ||
        item.HPFormat_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.PrintList = false
    this.router.navigate(['l-master/print-format-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/print-format-master/' + rowData.HPFormat_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.printFormat, rowData.HPFormat_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.PrintList = false

            this.getListData()
          }

        });
      }
    });
  }



}
