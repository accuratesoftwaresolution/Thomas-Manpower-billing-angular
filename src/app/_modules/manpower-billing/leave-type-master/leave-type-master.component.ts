import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPLTypeCo } from 'src/app/_dto/leave-type-master/TbldPLTypeCo.dto';
import { TblHPLTypeMaster } from 'src/app/_dto/leave-type-master/TblHPLTypeMaster.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-leave-type-master',
  templateUrl: './leave-type-master.component.html',
  styleUrls: ['./leave-type-master.component.scss']
})
export class LeaveTypeMasterComponent implements OnInit {

showListButton: boolean = false;

  TblHPLTypeMaster: TblHPLTypeMaster = new TblHPLTypeMaster()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showTermsConditionsList: boolean = false

  tableIndex: any;

  HPLType_SysID: any;

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
    this.TblHPLTypeMaster.TbldPLTypeCo = [new TbldPLTypeCo()]
    this.showListButton =true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPLType_SysID = Number(id);
        this.TblHPLTypeMaster.HPLType_SysID = Number(id);
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
        const isExist = this.TblHPLTypeMaster.TbldPLTypeCo.some(item => item.DcpLType_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Employee Module  Master' });
          return;
        }
        this.TblHPLTypeMaster.TbldPLTypeCo[this.tableIndex].DcpLType_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPLTypeMaster.TbldPLTypeCo[this.tableIndex].DcpLType_SingleCo_Code = event.SingleCo_Code;
        this.TblHPLTypeMaster.TbldPLTypeCo[this.tableIndex].DcpLType_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPLTypeMaster.HPLType_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPLTypeMaster.HPLType_AcDe_Code = event.HActDeactive_Code
        this.TblHPLTypeMaster.HPLType_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHPLTypeMaster.HPLType_SysID && rowData.DcpLType_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.leaveType, `company?where[DcpLType_GridSysID]=${this.TblHPLTypeMaster.TbldPLTypeCo[0].DcpLType_GridSysID}&where[DcpLType_SingleCo_SysID]=${rowData.DcpLType_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.showListButton = true;

              if (table === 'TbldPLTypeCo') {
                this.TblHPLTypeMaster.TbldPLTypeCo.splice(index, 1);
                if (this.TblHPLTypeMaster.TbldPLTypeCo.length === 0) {
                  this.addRow('TbldPLTypeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPLTypeCo') {
            this.TblHPLTypeMaster.TbldPLTypeCo.splice(index, 1);
            if (this.TblHPLTypeMaster.TbldPLTypeCo.length === 0) {
              this.addRow('TbldPLTypeCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPLTypeCo') {
      const newRow = new TbldPLTypeCo()
      this.TblHPLTypeMaster.TbldPLTypeCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPLTypeMaster.HPLType_Code == null || this.TblHPLTypeMaster.HPLType_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee Module  Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPLTypeMaster.HPLType_Name == null || this.TblHPLTypeMaster.HPLType_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee Module  Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPLTypeMaster.TbldPLTypeCo[0].DcpLType_SingleCo_Code == null || this.TblHPLTypeMaster.TbldPLTypeCo[0].DcpLType_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee Module  Master Single Company Code Cannot Be Null' });
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
    this.TblHPLTypeMaster.TbldPLTypeCo = this.TblHPLTypeMaster.TbldPLTypeCo.filter(
      row => row.DcpLType_SingleCo_Code && row.DcpLType_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.leaveType, this.TblHPLTypeMaster).then((res) => {
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
        this.TblHPLTypeMaster = new TblHPLTypeMaster();
        this.TblHPLTypeMaster.TbldPLTypeCo = [new TbldPLTypeCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/leave-type-master/']);

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
    if (this.TblHPLTypeMaster.HPLType_SysID || this.HPLType_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.leaveType, this.TblHPLTypeMaster.HPLType_SysID).then((res) => {
        this.TblHPLTypeMaster = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPLTypeMaster.TbldPLTypeCo.length == 0) {
          this.TblHPLTypeMaster.TbldPLTypeCo = [new TbldPLTypeCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPLTypeMaster = new TblHPLTypeMaster()
          this.TblHPLTypeMaster.TbldPLTypeCo = [new TbldPLTypeCo()]
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
        this.masterService.deleteData(apiUrl.leaveType, this.TblHPLTypeMaster.HPLType_SysID).then((res) => {

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
    this.TblHPLTypeMaster = new TblHPLTypeMaster()
    this.TblHPLTypeMaster.TbldPLTypeCo = [new TbldPLTypeCo()]
    this.router.navigate(['Manpower/leave-type-master/']);

  }
  cancel() {
    this.TblHPLTypeMaster = new TblHPLTypeMaster()
    this.TblHPLTypeMaster.TbldPLTypeCo = [new TbldPLTypeCo()]
    this.router.navigate(['Manpower/leave-type-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showTermsConditionsList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.leaveType).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPLType_Code || item.HPLType_Name || item.HPLType_SysID;
      const matchesQuery =
        (item.HPLType_Code || '').toLowerCase().includes(query) ||
        (item.HPLType_Name || '').toLowerCase().includes(query) ||
        item.HPLType_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showTermsConditionsList = false
    this.showListButton = true;

    this.router.navigate(['Manpower/leave-type-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/leave-type-master/' + rowData.HPLType_SysID]);
    this.showListButton = false;

  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;

        this.masterService.deleteData(apiUrl.leaveType, rowData.HPLType_SysID).then((res) => {

          if (res.success == false) {
        this.showListButton = true;

            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showTermsConditionsList = true
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

