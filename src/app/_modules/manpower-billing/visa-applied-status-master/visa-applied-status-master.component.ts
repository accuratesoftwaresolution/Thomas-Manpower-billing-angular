import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPVisaAppStatus } from 'src/app/_dto/visa-applied-status/TbldPVisaAppStatus.dto';
import { TblHPVisaAppStatus } from 'src/app/_dto/visa-applied-status/TblHPVisaAppStatus.sto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-visa-applied-status-master',
  templateUrl: './visa-applied-status-master.component.html',
  styleUrls: ['./visa-applied-status-master.component.scss']
})
export class VisaAppliedStatusMasterComponent implements OnInit {


 showListButton: boolean = true;

  TblHPVisaAppStatus: TblHPVisaAppStatus = new TblHPVisaAppStatus()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPVisaAppStatus_SysID: any;

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
    this.TblHPVisaAppStatus.TbldPVisaAppStatus = [new TbldPVisaAppStatus()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPVisaAppStatus_SysID = Number(id);
        this.TblHPVisaAppStatus.HPVisaAppStatus_SysID = Number(id);
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
        const isExist = this.TblHPVisaAppStatus.TbldPVisaAppStatus.some(item => item.DcpVisaAppStatus_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Visa Applied Status Master' });
          return;
        }
        this.TblHPVisaAppStatus.TbldPVisaAppStatus[this.tableIndex].DcpVisaAppStatus_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPVisaAppStatus.TbldPVisaAppStatus[this.tableIndex].DcpVisaAppStatus_SingleCo_Code = event.SingleCo_Code;
        this.TblHPVisaAppStatus.TbldPVisaAppStatus[this.tableIndex].DcpVisaAppStatus_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPVisaAppStatus.HPVisaAppStatus_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPVisaAppStatus.HPVisaAppStatus_AcDe_Code = event.HActDeactive_Code
        this.TblHPVisaAppStatus.HPVisaAppStatus_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPVisaAppStatus.HPVisaAppStatus_SysID && rowData.DcpVisaAppStatus_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.visaAppliedStatus, `company?where[DcpVisaAppStatus_GridSysID]=${this.TblHPVisaAppStatus.TbldPVisaAppStatus[0].DcpVisaAppStatus_GridSysID}&where[DcpVisaAppStatus_SingleCo_SysID]=${rowData.DcpVisaAppStatus_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPVisaAppStatus') {
                this.TblHPVisaAppStatus.TbldPVisaAppStatus.splice(index, 1);
                if (this.TblHPVisaAppStatus.TbldPVisaAppStatus.length === 0) {
                  this.addRow('TbldPVisaAppStatus', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPVisaAppStatus') {
            this.TblHPVisaAppStatus.TbldPVisaAppStatus.splice(index, 1);
            if (this.TblHPVisaAppStatus.TbldPVisaAppStatus.length === 0) {
              this.addRow('TbldPVisaAppStatus', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPVisaAppStatus') {
      const newRow = new TbldPVisaAppStatus()
      this.TblHPVisaAppStatus.TbldPVisaAppStatus.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPVisaAppStatus.HPVisaAppStatus_Code == null || this.TblHPVisaAppStatus.HPVisaAppStatus_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Applied Status Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPVisaAppStatus.HPVisaAppStatus_Name == null || this.TblHPVisaAppStatus.HPVisaAppStatus_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Applied Status Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPVisaAppStatus.TbldPVisaAppStatus[0].DcpVisaAppStatus_SingleCo_Code == null || this.TblHPVisaAppStatus.TbldPVisaAppStatus[0].DcpVisaAppStatus_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Applied Status Master Single Company Code Cannot Be Null' });
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
    this.TblHPVisaAppStatus.TbldPVisaAppStatus = this.TblHPVisaAppStatus.TbldPVisaAppStatus.filter(
      row => row.DcpVisaAppStatus_SingleCo_Code && row.DcpVisaAppStatus_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.visaAppliedStatus, this.TblHPVisaAppStatus).then((res) => {
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
        this.TblHPVisaAppStatus = new TblHPVisaAppStatus();
        this.TblHPVisaAppStatus.TbldPVisaAppStatus = [new TbldPVisaAppStatus()];

        // Navigate to list screen
        this.router.navigate(['Manpower/visa-applied-status/']);

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
    if (this.TblHPVisaAppStatus.HPVisaAppStatus_SysID || this.HPVisaAppStatus_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.visaAppliedStatus, this.TblHPVisaAppStatus.HPVisaAppStatus_SysID).then((res) => {
        this.TblHPVisaAppStatus = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPVisaAppStatus.TbldPVisaAppStatus.length == 0) {
          this.TblHPVisaAppStatus.TbldPVisaAppStatus = [new TbldPVisaAppStatus()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPVisaAppStatus = new TblHPVisaAppStatus()
          this.TblHPVisaAppStatus.TbldPVisaAppStatus = [new TbldPVisaAppStatus()]
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
        this.masterService.deleteData(apiUrl.visaAppliedStatus, this.TblHPVisaAppStatus.HPVisaAppStatus_SysID).then((res) => {

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
    this.TblHPVisaAppStatus = new TblHPVisaAppStatus()
    this.TblHPVisaAppStatus.TbldPVisaAppStatus = [new TbldPVisaAppStatus()]
    this.router.navigate(['Manpower/visa-applied-status/']);

  }
  cancel() {
    this.TblHPVisaAppStatus = new TblHPVisaAppStatus()
    this.TblHPVisaAppStatus.TbldPVisaAppStatus = [new TbldPVisaAppStatus()]
    this.router.navigate(['Manpower/visa-applied-status']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.visaAppliedStatus).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPVisaAppStatus_Code || item.HPVisaAppStatus_Name || item.HPVisaAppStatus_SysID;
      const matchesQuery =
        (item.HPVisaAppStatus_Code || '').toLowerCase().includes(query) ||
        (item.HPVisaAppStatus_Name || '').toLowerCase().includes(query) ||
        item.HPVisaAppStatus_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/visa-applied-status']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/visa-applied-status/' + rowData.HPVisaAppStatus_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.visaAppliedStatus, rowData.HPVisaAppStatus_SysID).then((res) => {

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
