import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldEmpModuleCo } from 'src/app/_dto/employee-module-master/TbldEmpModuleCo.dto';
import { TblHEmpModule } from 'src/app/_dto/employee-module-master/TblHEmpModule.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-employee-module-master',
  templateUrl: './employee-module-master.component.html',
  styleUrls: ['./employee-module-master.component.scss']
})
export class EmployeeModuleMasterComponent implements OnInit {
  showListButton: boolean = false;

  TblHEmpModule: TblHEmpModule = new TblHEmpModule()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showTermsConditionsList: boolean = false

  tableIndex: any;

  HEmpModule_SysID: any;

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
    this.TblHEmpModule.TbldEmpModuleCo = [new TbldEmpModuleCo()]
    this.showListButton =true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HEmpModule_SysID = Number(id);
        this.TblHEmpModule.HEmpModule_SysID = Number(id);
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
        const isExist = this.TblHEmpModule.TbldEmpModuleCo.some(item => item.DcEmpModule_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Employee Module  Master' });
          return;
        }
        this.TblHEmpModule.TbldEmpModuleCo[this.tableIndex].DcEmpModule_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHEmpModule.TbldEmpModuleCo[this.tableIndex].DcEmpModule_SingleCo_Code = event.SingleCo_Code;
        this.TblHEmpModule.TbldEmpModuleCo[this.tableIndex].DcEmpModule_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHEmpModule.HEmpModule_AcDe_SysID = event.HActDeactive_SysID
        this.TblHEmpModule.HEmpModule_AcDe_Code = event.HActDeactive_Code
        this.TblHEmpModule.HEmpModule_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHEmpModule.HEmpModule_SysID && rowData.DcEmpModule_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.employeeModule, `company?where[DcEmpModule_GridSysID]=${this.TblHEmpModule.TbldEmpModuleCo[0].DcEmpModule_GridSysID}&where[DcEmpModule_SingleCo_SysID]=${rowData.DcEmpModule_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.showListButton = true;

              if (table === 'TbldEmpModuleCo') {
                this.TblHEmpModule.TbldEmpModuleCo.splice(index, 1);
                if (this.TblHEmpModule.TbldEmpModuleCo.length === 0) {
                  this.addRow('TbldEmpModuleCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldEmpModuleCo') {
            this.TblHEmpModule.TbldEmpModuleCo.splice(index, 1);
            if (this.TblHEmpModule.TbldEmpModuleCo.length === 0) {
              this.addRow('TbldEmpModuleCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldEmpModuleCo') {
      const newRow = new TbldEmpModuleCo()
      this.TblHEmpModule.TbldEmpModuleCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHEmpModule.HEmpModule_Code == null || this.TblHEmpModule.HEmpModule_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee Module  Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHEmpModule.HEmpModule_Name == null || this.TblHEmpModule.HEmpModule_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee Module  Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHEmpModule.TbldEmpModuleCo[0].DcEmpModule_SingleCo_Code == null || this.TblHEmpModule.TbldEmpModuleCo[0].DcEmpModule_SingleCo_Code.toString().trim() === '') {
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
    this.TblHEmpModule.TbldEmpModuleCo = this.TblHEmpModule.TbldEmpModuleCo.filter(
      row => row.DcEmpModule_SingleCo_Code && row.DcEmpModule_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.employeeModule, this.TblHEmpModule).then((res) => {
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
        this.TblHEmpModule = new TblHEmpModule();
        this.TblHEmpModule.TbldEmpModuleCo = [new TbldEmpModuleCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/employee-module-master/']);

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
    if (this.TblHEmpModule.HEmpModule_SysID || this.HEmpModule_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.employeeModule, this.TblHEmpModule.HEmpModule_SysID).then((res) => {
        this.TblHEmpModule = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHEmpModule.TbldEmpModuleCo.length == 0) {
          this.TblHEmpModule.TbldEmpModuleCo = [new TbldEmpModuleCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHEmpModule = new TblHEmpModule()
          this.TblHEmpModule.TbldEmpModuleCo = [new TbldEmpModuleCo()]
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
        this.masterService.deleteData(apiUrl.employeeModule, this.TblHEmpModule.HEmpModule_SysID).then((res) => {

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
    this.TblHEmpModule = new TblHEmpModule()
    this.TblHEmpModule.TbldEmpModuleCo = [new TbldEmpModuleCo()]
    this.router.navigate(['Manpower/employee-module-master/']);

  }
  cancel() {
    this.TblHEmpModule = new TblHEmpModule()
    this.TblHEmpModule.TbldEmpModuleCo = [new TbldEmpModuleCo()]
    this.router.navigate(['Manpower/employee-module-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showTermsConditionsList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.employeeModule).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HEmpModule_Code || item.HEmpModule_Name || item.HEmpModule_SysID;
      const matchesQuery =
        (item.HEmpModule_Code || '').toLowerCase().includes(query) ||
        (item.HEmpModule_Name || '').toLowerCase().includes(query) ||
        item.HEmpModule_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showTermsConditionsList = false
    this.showListButton = true;

    this.router.navigate(['Manpower/employee-module-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/employee-module-master/' + rowData.HEmpModule_SysID]);
    this.showListButton = false;

  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;

        this.masterService.deleteData(apiUrl.employeeModule, rowData.HEmpModule_SysID).then((res) => {

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

