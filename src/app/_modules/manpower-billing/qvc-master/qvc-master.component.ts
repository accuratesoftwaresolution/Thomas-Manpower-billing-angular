import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPQVCStatusCo } from 'src/app/_dto/qvc-master/TbldPQVCStatusCo.dto';
import { TblHPQVCStatus } from 'src/app/_dto/qvc-master/TblHPQVCStatus.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-qvc-master',
  templateUrl: './qvc-master.component.html',
  styleUrls: ['./qvc-master.component.scss']
})
export class QvcMasterComponent implements OnInit {

 showListButton: boolean = true;

  TblHPQVCStatus: TblHPQVCStatus = new TblHPQVCStatus()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPQVCStatus_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHPQVCStatus.TbldPQVCStatusCo = [new TbldPQVCStatusCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPQVCStatus_SysID = Number(id);
        this.TblHPQVCStatus.HPQVCStatus_SysID = Number(id);
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
        this.popUpService.popUpData = this.singleCompany;
        break;
      case 'AccDirectExpCode':
        break;
      default:
        break;
      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activatedeactivate;
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {


      case 'ApplicableCompanyCode':
        const selectedCode = event.SingleCo_Code;
        const isExist = this.TblHPQVCStatus.TbldPQVCStatusCo.some(item => item.DcpQVCStatus_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for QVC Status Master' });
          return;
        }
        this.TblHPQVCStatus.TbldPQVCStatusCo[this.tableIndex].DcpQVCStatus_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPQVCStatus.TbldPQVCStatusCo[this.tableIndex].DcpQVCStatus_SingleCo_Code = event.SingleCo_Code;
        this.TblHPQVCStatus.TbldPQVCStatusCo[this.tableIndex].DcpQVCStatus_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPQVCStatus.HPQVCStatus_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPQVCStatus.HPQVCStatus_AcDe_Code = event.HActDeactive_Code
        this.TblHPQVCStatus.HPQVCStatus_AcDe_Name = event.HActDeactive_Name
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
        this.showListButton = true;

        if (this.TblHPQVCStatus.HPQVCStatus_SysID && rowData.DcpQVCStatus_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.qvcStatus, `company?where[DcpQVCStatus_GridSysID]=${this.TblHPQVCStatus.TbldPQVCStatusCo[0].DcpQVCStatus_GridSysID}&where[DcpQVCStatus_SingleCo_SysID]=${rowData.DcpQVCStatus_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPQVCStatusCo') {
                this.TblHPQVCStatus.TbldPQVCStatusCo.splice(index, 1);
                if (this.TblHPQVCStatus.TbldPQVCStatusCo.length === 0) {
                  this.addRow('TbldPQVCStatusCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPQVCStatusCo') {
            this.TblHPQVCStatus.TbldPQVCStatusCo.splice(index, 1);
            if (this.TblHPQVCStatus.TbldPQVCStatusCo.length === 0) {
              this.addRow('TbldPQVCStatusCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPQVCStatusCo') {
      const newRow = new TbldPQVCStatusCo()
      this.TblHPQVCStatus.TbldPQVCStatusCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPQVCStatus.HPQVCStatus_Code == null || this.TblHPQVCStatus.HPQVCStatus_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'QVC Status Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPQVCStatus.HPQVCStatus_Name == null || this.TblHPQVCStatus.HPQVCStatus_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'QVC Status Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPQVCStatus.TbldPQVCStatusCo[0].DcpQVCStatus_SingleCo_Code == null || this.TblHPQVCStatus.TbldPQVCStatusCo[0].DcpQVCStatus_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'QVC Status Master Single Company Code Cannot Be Null' });
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
    this.TblHPQVCStatus.TbldPQVCStatusCo = this.TblHPQVCStatus.TbldPQVCStatusCo.filter(
      row => row.DcpQVCStatus_SingleCo_Code && row.DcpQVCStatus_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.qvcStatus, this.TblHPQVCStatus).then((res) => {
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

        this.showListButton = true;

        // Reset form
        this.TblHPQVCStatus = new TblHPQVCStatus();
        this.TblHPQVCStatus.TbldPQVCStatusCo = [new TbldPQVCStatusCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/qvc-status-master/']);

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
    if (this.TblHPQVCStatus.HPQVCStatus_SysID || this.HPQVCStatus_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.qvcStatus, this.TblHPQVCStatus.HPQVCStatus_SysID).then((res) => {
        this.TblHPQVCStatus = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPQVCStatus.TbldPQVCStatusCo.length == 0) {
          this.TblHPQVCStatus.TbldPQVCStatusCo = [new TbldPQVCStatusCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPQVCStatus = new TblHPQVCStatus()
          this.TblHPQVCStatus.TbldPQVCStatusCo = [new TbldPQVCStatusCo()]
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
        this.masterService.deleteData(apiUrl.qvcStatus, this.TblHPQVCStatus.HPQVCStatus_SysID).then((res) => {

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
    this.TblHPQVCStatus = new TblHPQVCStatus()
    this.TblHPQVCStatus.TbldPQVCStatusCo = [new TbldPQVCStatusCo()]
    this.router.navigate(['Manpower/qvc-status-master/']);

  }
  cancel() {
    this.TblHPQVCStatus = new TblHPQVCStatus()
    this.TblHPQVCStatus.TbldPQVCStatusCo = [new TbldPQVCStatusCo()]
    this.router.navigate(['Manpower/qvc-status-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.qvcStatus).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPQVCStatus_Code || item.HPQVCStatus_Name || item.HPQVCStatus_SysID;
      const matchesQuery =
        (item.HPQVCStatus_Code || '').toLowerCase().includes(query) ||
        (item.HPQVCStatus_Name || '').toLowerCase().includes(query) ||
        item.HPQVCStatus_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/qvc-status-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/qvc-status-master/' + rowData.HPQVCStatus_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.qvcStatus, rowData.HPQVCStatus_SysID).then((res) => {

          if (res.success == false) {
            this.showListButton = true;
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

            this.showListButton = true;

            this.getListData()
          }

        });
      }
    });
  }
}
function getlovdata() {
  throw new Error('Function not implemented.');
}
