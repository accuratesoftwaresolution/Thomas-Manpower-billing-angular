import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPEmpSeleCritCo } from 'src/app/_dto/employee-correction-criteria-master/TbldPEmpSeleCritCo.dto';
import { TblHpEmpSeleCrit } from 'src/app/_dto/employee-correction-criteria-master/TblHpEmpSeleCrit.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-employee-selection-criteria-master',
  templateUrl: './employee-selection-criteria-master.component.html',
  styleUrls: ['./employee-selection-criteria-master.component.scss']
})
export class EmployeeSelectionCriteriaMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHpEmpSeleCrit: TblHpEmpSeleCrit = new TblHpEmpSeleCrit()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPEmpSeleCrit_SysID: any;

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
    this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo = [new TbldPEmpSeleCritCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPEmpSeleCrit_SysID = Number(id);
        this.TblHpEmpSeleCrit.HPEmpSeleCrit_SysID = Number(id);
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
        const isExist = this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.some(item => item.DcpEmpSeleCrit_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Employee selection Criteria  Master' });
          return;
        }
        this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo[this.tableIndex].DcpEmpSeleCrit_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo[this.tableIndex].DcpEmpSeleCrit_SingleCo_Code = event.SingleCo_Code;
        this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo[this.tableIndex].DcpEmpSeleCrit_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHpEmpSeleCrit.HPEmpSeleCrit_AcDe_SysID = event.HActDeactive_SysID
        this.TblHpEmpSeleCrit.HPEmpSeleCrit_AcDe_Code = event.HActDeactive_Code
        this.TblHpEmpSeleCrit.HPEmpSeleCrit_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHpEmpSeleCrit.HPEmpSeleCrit_SysID && rowData.DcpEmpSeleCrit_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.employeeSelectionCriteria, `company?where[DcpEmpSeleCrit_GridSysID]=${this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo[0].DcpEmpSeleCrit_GridSysID}&where[DcpEmpSeleCrit_SingleCo_SysID]=${rowData.DcpEmpSeleCrit_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPEmpSeleCritCo') {
                this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.splice(index, 1);
                if (this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.length === 0) {
                  this.addRow('TbldPEmpSeleCritCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPEmpSeleCritCo') {
            this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.splice(index, 1);
            if (this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.length === 0) {
              this.addRow('TbldPEmpSeleCritCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPEmpSeleCritCo') {
      const newRow = new TbldPEmpSeleCritCo()
      this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHpEmpSeleCrit.HPEmpSeleCrit_Code == null || this.TblHpEmpSeleCrit.HPEmpSeleCrit_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee selection Criteria  Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHpEmpSeleCrit.HPEmpSeleCrit_Name == null || this.TblHpEmpSeleCrit.HPEmpSeleCrit_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee selection Criteria  Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo[0].DcpEmpSeleCrit_SingleCo_Code == null || this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo[0].DcpEmpSeleCrit_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee selection Criteria  Master Single Company Code Cannot Be Null' });
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
    this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo = this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.filter(
      row => row.DcpEmpSeleCrit_SingleCo_Code && row.DcpEmpSeleCrit_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.employeeSelectionCriteria, this.TblHpEmpSeleCrit).then((res) => {
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
        this.TblHpEmpSeleCrit = new TblHpEmpSeleCrit();
        this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo = [new TbldPEmpSeleCritCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/employee-selection-criteria-master/']);

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
    if (this.TblHpEmpSeleCrit.HPEmpSeleCrit_SysID || this.HPEmpSeleCrit_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.employeeSelectionCriteria, this.TblHpEmpSeleCrit.HPEmpSeleCrit_SysID).then((res) => {
        this.TblHpEmpSeleCrit = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo.length == 0) {
          this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo = [new TbldPEmpSeleCritCo()]
        this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHpEmpSeleCrit = new TblHpEmpSeleCrit()
          this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo = [new TbldPEmpSeleCritCo()]
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
        this.masterService.deleteData(apiUrl.employeeSelectionCriteria, this.TblHpEmpSeleCrit.HPEmpSeleCrit_SysID).then((res) => {

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
    this.TblHpEmpSeleCrit = new TblHpEmpSeleCrit()
    this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo = [new TbldPEmpSeleCritCo()]
    this.router.navigate(['Manpower/employee-selection-criteria-master/']);

  }
  cancel() {
    this.TblHpEmpSeleCrit = new TblHpEmpSeleCrit()
    this.TblHpEmpSeleCrit.TbldPEmpSeleCritCo = [new TbldPEmpSeleCritCo()]
    this.router.navigate(['Manpower/employee-selection-criteria-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.employeeSelectionCriteria).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPEmpSeleCrit_Code || item.HPEmpSeleCrit_Name || item.HPEmpSeleCrit_SysID;
      const matchesQuery =
        (item.HPEmpSeleCrit_Code || '').toLowerCase().includes(query) ||
        (item.HPEmpSeleCrit_Name || '').toLowerCase().includes(query) ||
        item.HPEmpSeleCrit_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/employee-selection-criteria-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/employee-selection-criteria-master/' + rowData.HPEmpSeleCrit_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.employeeSelectionCriteria, rowData.HPEmpSeleCrit_SysID).then((res) => {

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
