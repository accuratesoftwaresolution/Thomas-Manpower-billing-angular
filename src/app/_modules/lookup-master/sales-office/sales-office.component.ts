import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldSofficeCo } from 'src/app/_dto/masters/sales-office/TbldSofficeCo.dto';
import { TblHSoffice } from 'src/app/_dto/masters/sales-office/TblHSoffice.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-sales-office',
  templateUrl: './sales-office.component.html',
  styleUrls: ['./sales-office.component.scss']
})
export class SalesOfficeComponent implements OnInit {
 // TbldSofficeCo: any[] = [new TbldSofficeCo()];

  TblHSoffice: TblHSoffice = new TblHSoffice()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showSalesOfficeList: boolean = false

  tableIndex: any;

  HSoffice_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  activateAndDeactivate: any;
  singleCoMaster: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHSoffice.TbldSofficeCo = [new TbldSofficeCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HSoffice_SysID = Number(id);
        this.TblHSoffice.HSoffice_SysID = Number(id);
        this.getdata()
      }
    });
  this.getLovData()
  }

  getLovData() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCoMaster;
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
        const isExist = this.TblHSoffice.TbldSofficeCo.some(item => item.DcSoffice_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Sales Office Master' });
          return;
        }
        this.TblHSoffice.TbldSofficeCo[this.tableIndex].DcSoffice_SingleCo_SysID = event.SingleCo_SysID
        this.TblHSoffice.TbldSofficeCo[this.tableIndex].DcSoffice_SingleCo_Code = event.SingleCo_Code
        this.TblHSoffice.TbldSofficeCo[this.tableIndex].DcSoffice_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHSoffice.HSoffice_AcDe_SysID = event.HActDeactive_SysID
        this.TblHSoffice.HSoffice_AcDe_Code = event.HActDeactive_Code
        this.TblHSoffice.HSoffice_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHSoffice.HSoffice_SysID && rowData.DcSoffice_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.salesOffice, `company?where[DcSoffice_SysID]=${this.TblHSoffice.TbldSofficeCo[0].DcSoffice_SysID}&where[DcSoffice_SingleCo_SysID]=${rowData.DcSoffice_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldSofficeCo') {
                this.TblHSoffice.TbldSofficeCo.splice(index, 1);
                if (this.TblHSoffice.TbldSofficeCo.length === 0) {
                  this.addRow('TbldSofficeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldSofficeCo') {
            this.TblHSoffice.TbldSofficeCo.splice(index, 1);
            if (this.TblHSoffice.TbldSofficeCo.length === 0) {
              this.addRow('TbldSofficeCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldSofficeCo') {
      const newRow = new TbldSofficeCo()
      this.TblHSoffice.TbldSofficeCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHSoffice.HSoffice_Code == null || this.TblHSoffice.HSoffice_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Office Code Cannot Be Null' });
      return false;
    }

    if (this.TblHSoffice.HSoffice_Name == null || this.TblHSoffice.HSoffice_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Office Name Cannot Be Null' });
      return false;
    }

     if (this.TblHSoffice.TbldSofficeCo[0].DcSoffice_SingleCo_Code == null || this.TblHSoffice.TbldSofficeCo[0].DcSoffice_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Office Single Company Code Cannot Be Null' });
      return false;
    }

    return true;
  }

  save() {
    if (!this.preSave()) return;

    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      if (this.progressValue < 90) {
        this.progressValue += 10;
      } else {
        clearInterval(interval);
      }
    }, 500);

    // Trim empty rows
    this.TblHSoffice.TbldSofficeCo = this.TblHSoffice.TbldSofficeCo.filter(
      row => row.DcSoffice_SingleCo_Code && row.DcSoffice_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.salesOffice, this.TblHSoffice).then((res) => {
      clearInterval(interval);

      if (res.success === false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      if (res.success === false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      // If success
      this.progressValue = 100;

      // Delay for smooth progress bar animation
      setTimeout(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });

        // Reset form
        this.TblHSoffice = new TblHSoffice();
        this.TblHSoffice.TbldSofficeCo = [new TbldSofficeCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/sales-office/']);

        // Finally reset flags
        this.isSaving = false;
        this.progressValue = 0;
      }, 500);
    }).catch(() => {
      clearInterval(interval);
      this.progressValue = 0;
      this.isSaving = false;
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Save failed'
      });
    });
  }





  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHSoffice.HSoffice_SysID || this.HSoffice_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.salesOffice, this.TblHSoffice.HSoffice_SysID).then((res) => {
        this.TblHSoffice = res
        this.showDeleteButton = true;

        if (this.TblHSoffice.TbldSofficeCo.length == 0) {
          this.TblHSoffice.TbldSofficeCo = [new TbldSofficeCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHSoffice = new TblHSoffice()
          this.TblHSoffice.TbldSofficeCo = [new TbldSofficeCo()]
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
        this.masterService.deleteData(apiUrl.salesOffice, this.TblHSoffice.HSoffice_SysID).then((res) => {

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
    this.TblHSoffice = new TblHSoffice()
    this.TblHSoffice.TbldSofficeCo = [new TbldSofficeCo()]
    this.router.navigate(['l-master/sales-office/']);

  }
  cancel() {
    this.TblHSoffice = new TblHSoffice()
    this.TblHSoffice.TbldSofficeCo = [new TbldSofficeCo()]
    this.router.navigate(['l-master/sales-office']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displaySalesOfficeList() {
    this.showSalesOfficeList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.salesOffice).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HSoffice_Code || item.HSoffice_Name || item.HSoffice_SysID;
      const matchesQuery =
        (item.HSoffice_Code || '').toLowerCase().includes(query) ||
        (item.HSoffice_Name || '').toLowerCase().includes(query) ||
        item.HSoffice_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showSalesOfficeList = false
    this.router.navigate(['l-master/sales-office']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/sales-office/' + rowData.HSoffice_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.salesOffice, rowData.HSoffice_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showSalesOfficeList = false

            this.getListData()
          }

        });
      }
    });
  }

}