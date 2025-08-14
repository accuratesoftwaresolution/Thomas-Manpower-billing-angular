import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblHAlert } from 'src/app/_dto/masters/tblhAlert.dto';
import { TbldAlertCo } from 'src/app/_dto/TbldAlertCo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
 showListButton: boolean = true;

  TblHAlert: TblHAlert = new TblHAlert()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HAlert_SysID: any;

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
    this.TblHAlert.TbldAlertCo = [new TbldAlertCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAlert_SysID = Number(id);
        this.TblHAlert.HAlert_SysID = Number(id);
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
        const isExist = this.TblHAlert.TbldAlertCo.some(item => item.DcAlert_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Alert Master' });
          return;
        }
        this.TblHAlert.TbldAlertCo[this.tableIndex].DcAlert_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHAlert.TbldAlertCo[this.tableIndex].DcAlert_SingleCo_Code = event.SingleCo_Code;
        this.TblHAlert.TbldAlertCo[this.tableIndex].DcAlert_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHAlert.HAlert_AcDe_SysID = event.HActDeactive_SysID
        this.TblHAlert.HAlert_AcDe_Code = event.HActDeactive_Code
        this.TblHAlert.HAlert_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHAlert.HAlert_SysID && rowData.DcAlert_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.alertCode, `company?where[DcAlert_SysID]=${this.TblHAlert.TbldAlertCo[0].DcAlert_SysID}&where[DcAlert_SingleCo_SysID]=${rowData.DcAlert_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldAlertCo') {
                this.TblHAlert.TbldAlertCo.splice(index, 1);
                if (this.TblHAlert.TbldAlertCo.length === 0) {
                  this.addRow('TbldAlertCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldAlertCo') {
            this.TblHAlert.TbldAlertCo.splice(index, 1);
            if (this.TblHAlert.TbldAlertCo.length === 0) {
              this.addRow('TbldAlertCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldAlertCo') {
      const newRow = new TbldAlertCo()
      this.TblHAlert.TbldAlertCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHAlert.HAlert_Code == null || this.TblHAlert.HAlert_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Alert Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHAlert.HAlert_Name == null || this.TblHAlert.HAlert_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Alert Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHAlert.TbldAlertCo[0].DcAlert_SingleCo_Code == null || this.TblHAlert.TbldAlertCo[0].DcAlert_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Alert Master Single Company Code Cannot Be Null' });
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
    this.TblHAlert.TbldAlertCo = this.TblHAlert.TbldAlertCo.filter(
      row => row.DcAlert_SingleCo_Code && row.DcAlert_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.alertCode, this.TblHAlert).then((res) => {
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
        this.TblHAlert = new TblHAlert();
        this.TblHAlert.TbldAlertCo = [new TbldAlertCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/alert/']);

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
    if (this.TblHAlert.HAlert_SysID || this.HAlert_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.alertCode, this.TblHAlert.HAlert_SysID).then((res) => {
        this.TblHAlert = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHAlert.TbldAlertCo.length == 0) {
          this.TblHAlert.TbldAlertCo = [new TbldAlertCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHAlert = new TblHAlert()
          this.TblHAlert.TbldAlertCo = [new TbldAlertCo()]
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
        this.masterService.deleteData(apiUrl.alertCode, this.TblHAlert.HAlert_SysID).then((res) => {

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
    this.TblHAlert = new TblHAlert()
    this.TblHAlert.TbldAlertCo = [new TbldAlertCo()]
    this.router.navigate(['l-master/alert/']);

  }
  cancel() {
    this.TblHAlert = new TblHAlert()
    this.TblHAlert.TbldAlertCo = [new TbldAlertCo()]
    this.router.navigate(['l-master/alert']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.alertCode).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HAlert_Code || item.HAlert_Name || item.HAlert_SysID;
      const matchesQuery =
        (item.HAlert_Code || '').toLowerCase().includes(query) ||
        (item.HAlert_Name || '').toLowerCase().includes(query) ||
        item.HAlert_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['l-master/alert']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/alert/' + rowData.HAlert_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.alertCode, rowData.HAlert_SysID).then((res) => {

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
