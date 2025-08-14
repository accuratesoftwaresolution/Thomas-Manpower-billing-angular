import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblHWh } from 'src/app/_dto/masters/tblHWh.dto';
import { TbldWhCo } from 'src/app/_dto/TbldWhCo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  TblHWh: TblHWh = new TblHWh()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showwarehouseList: boolean = false

  tableIndex: any;

  HWh_SysID: any;

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
    this.TblHWh.TbldWhCo = [new TbldWhCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HWh_SysID = Number(id);
        this.TblHWh.HWh_SysID = Number(id);
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
        const isExist = this.TblHWh.TbldWhCo.some(item => item.DcWh_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Warehouse Master' });
          return;
        }
        this.TblHWh.TbldWhCo[this.tableIndex].DcWh_SingleCo_SysID = event.SingleCo_SysID
        this.TblHWh.TbldWhCo[this.tableIndex].DcWh_SingleCo_Code = event.SingleCo_Code
        this.TblHWh.TbldWhCo[this.tableIndex].DcWh_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHWh.HWh_AcDe_SysID = event.HActDeactive_SysID
        this.TblHWh.HWh_AcDe_Code = event.HActDeactive_Code
        this.TblHWh.HWh_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHWh.HWh_SysID && rowData.DcWh_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.warehouse, `company?where[DcWh_SysID]=${this.TblHWh.TbldWhCo[0].DcWh_SysID}&where[DcWh_SingleCo_SysID]=${rowData.DcWh_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldWhCo') {
                this.TblHWh.TbldWhCo.splice(index, 1);
                if (this.TblHWh.TbldWhCo.length === 0) {
                  this.addRow('TbldWhCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldWhCo') {
            this.TblHWh.TbldWhCo.splice(index, 1);
            if (this.TblHWh.TbldWhCo.length === 0) {
              this.addRow('TbldWhCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldWhCo') {
      const newRow = new TbldWhCo()
      this.TblHWh.TbldWhCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHWh.HWh_Code == null || this.TblHWh.HWh_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Warehouse Code Cannot Be Null' });
      return false;
    }

    if (this.TblHWh.HWh_Name == null || this.TblHWh.HWh_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Warehouse Name Cannot Be Null' });
      return false;
    }

    if (this.TblHWh.TbldWhCo[0].DcWh_SingleCo_Code == null || this.TblHWh.TbldWhCo[0].DcWh_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Warehouse Single Company Code Cannot Be Null' });
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
    this.TblHWh.TbldWhCo = this.TblHWh.TbldWhCo.filter(
      row => row.DcWh_SingleCo_Code && row.DcWh_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.warehouse, this.TblHWh).then((res) => {
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
        this.TblHWh = new TblHWh();
        this.TblHWh.TbldWhCo = [new TbldWhCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/warehouse/']);

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
    if (this.TblHWh.HWh_SysID || this.HWh_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.warehouse, this.TblHWh.HWh_SysID).then((res) => {
        this.TblHWh = res
        this.showDeleteButton = true;

        if (this.TblHWh.TbldWhCo.length == 0) {
          this.TblHWh.TbldWhCo = [new TbldWhCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHWh = new TblHWh()
          this.TblHWh.TbldWhCo = [new TbldWhCo()]
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
        this.masterService.deleteData(apiUrl.warehouse, this.TblHWh.HWh_SysID).then((res) => {

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
    this.TblHWh = new TblHWh()
    this.TblHWh.TbldWhCo = [new TbldWhCo()]
    this.router.navigate(['l-master/warehouse/']);

  }
  cancel() {
    this.TblHWh = new TblHWh()
    this.TblHWh.TbldWhCo = [new TbldWhCo()]
    this.router.navigate(['l-master/warehouse']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displaywarehouseList() {
    this.showwarehouseList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.warehouse).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HWh_Code || item.HWh_Name || item.HWh_SysID;
      const matchesQuery =
        (item.HWh_Code || '').toLowerCase().includes(query) ||
        (item.HWh_Name || '').toLowerCase().includes(query) ||
        item.HWh_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showwarehouseList = false
    this.router.navigate(['l-master/warehouse']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/warehouse/' + rowData.HWh_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.warehouse, rowData.HWh_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showwarehouseList = false

            this.getListData()
          }

        });
      }
    });
  }

}



