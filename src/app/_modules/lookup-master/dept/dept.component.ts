import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldDeptCo } from 'src/app/_dto/masters/department/TbldDeptCo.dto';
import { TblHDept } from 'src/app/_dto/masters/department/TblHDept.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.scss']
})
export class DeptComponent implements OnInit {

  // TbldDeptCo: any[] = [new TbldDeptCo()];

  TblHDept: TblHDept = new TblHDept()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showdepartmentList: boolean = false

  tableIndex: any;

  HDept_SysID: any;

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
    this.TblHDept.TbldDeptCo = [new TbldDeptCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HDept_SysID = Number(id);
        this.TblHDept.HDept_SysID = Number(id);
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
        const isExist = this.TblHDept.TbldDeptCo.some(item => item.DcDept_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Department Master' });
          return;
        }
        this.TblHDept.TbldDeptCo[this.tableIndex].DcDept_SingleCo_SysID = event.SingleCo_SysID
        this.TblHDept.TbldDeptCo[this.tableIndex].DcDept_SingleCo_Code = event.SingleCo_Code
        this.TblHDept.TbldDeptCo[this.tableIndex].DcDept_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHDept.HDept_AcDe_SysID = event.HActDeactive_SysID
        this.TblHDept.HDept_AcDe_Code = event.HActDeactive_Code
        this.TblHDept.HDept_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHDept.HDept_SysID && rowData.DcDept_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.department, `company?where[DcDept_SysID]=${this.TblHDept.TbldDeptCo[0].DcDept_SysID}&where[DcDept_SingleCo_SysID]=${rowData.DcDept_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldDeptCo') {
                this.TblHDept.TbldDeptCo.splice(index, 1);
                if (this.TblHDept.TbldDeptCo.length === 0) {
                  this.addRow('TbldDeptCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldDeptCo') {
            this.TblHDept.TbldDeptCo.splice(index, 1);
            if (this.TblHDept.TbldDeptCo.length === 0) {
              this.addRow('TbldDeptCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldDeptCo') {
      const newRow = new TbldDeptCo()
      this.TblHDept.TbldDeptCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHDept.HDept_Code == null || this.TblHDept.HDept_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Department Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHDept.HDept_Name == null || this.TblHDept.HDept_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Department Master Name Cannot Be Null' });
      return false;
    }

     if (this.TblHDept.TbldDeptCo[0].DcDept_SingleCo_Code == null || this.TblHDept.TbldDeptCo[0].DcDept_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Department Single Company Code Cannot Be Null' });
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
    this.TblHDept.TbldDeptCo = this.TblHDept.TbldDeptCo.filter(
      row => row.DcDept_SingleCo_Code && row.DcDept_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.department, this.TblHDept).then((res) => {
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
        this.TblHDept = new TblHDept();
        this.TblHDept.TbldDeptCo = [new TbldDeptCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/department/']);

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
    if (this.TblHDept.HDept_SysID || this.HDept_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.department, this.TblHDept.HDept_SysID).then((res) => {
        this.TblHDept = res
        this.showDeleteButton = true;

        if (this.TblHDept.TbldDeptCo.length == 0) {
          this.TblHDept.TbldDeptCo = [new TbldDeptCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHDept = new TblHDept()
          this.TblHDept.TbldDeptCo = [new TbldDeptCo()]
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
        this.masterService.deleteData(apiUrl.department, this.TblHDept.HDept_SysID).then((res) => {

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
    this.TblHDept = new TblHDept()
    this.TblHDept.TbldDeptCo = [new TbldDeptCo()]
    this.router.navigate(['l-master/department/']);

  }
  cancel() {
    this.TblHDept = new TblHDept()
    this.TblHDept.TbldDeptCo = [new TbldDeptCo()]
    this.router.navigate(['l-master/department']);


  }

  // ---------------------------------------------------------------------List--------------------------
  displaydepartmentList() {
    this.showdepartmentList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.department).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HDept_Code || item.HDept_Name || item.HDept_SysID;
      const matchesQuery =
        (item.HDept_Code || '').toLowerCase().includes(query) ||
        (item.HDept_Name || '').toLowerCase().includes(query) ||
        item.HDept_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showdepartmentList = false
    this.router.navigate(['l-master/department']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/department/' + rowData.HDept_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.department, rowData.HDept_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showdepartmentList = false

            this.getListData()
          }

        });
      }
    });
  }



}


