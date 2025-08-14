import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPProjectCo } from 'src/app/_dto/project-master/TbldPProjectCo.dto';
import { TblHPProject } from 'src/app/_dto/project-master/TblHPProject.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-project-master',
  templateUrl: './project-master.component.html',
  styleUrls: ['./project-master.component.scss']
})
export class ProjectMasterComponent implements OnInit {

  
 showListButton: boolean = true;

  TblHPProject: TblHPProject = new TblHPProject()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPProject_SysID: any;

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
    this.TblHPProject.TbldPProjectCo = [new TbldPProjectCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPProject_SysID = Number(id);
        this.TblHPProject.HPProject_SysID = Number(id);
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
        const isExist = this.TblHPProject.TbldPProjectCo.some(item => item.DcpProject_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Our Project Master' });
          return;
        }
        this.TblHPProject.TbldPProjectCo[this.tableIndex].DcpProject_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPProject.TbldPProjectCo[this.tableIndex].DcpProject_SingleCo_Code = event.SingleCo_Code;
        this.TblHPProject.TbldPProjectCo[this.tableIndex].DcpProject_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPProject.HPProject_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPProject.HPProject_AcDe_Code = event.HActDeactive_Code
        this.TblHPProject.HPProject_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPProject.HPProject_SysID && rowData.DcpProject_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.projectMaster, `company?where[DcpProject_GridSysID]=${this.TblHPProject.TbldPProjectCo[0].DcpProject_GridSysID}&where[DcpProject_SingleCo_SysID]=${rowData.DcpProject_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPProjectCo') {
                this.TblHPProject.TbldPProjectCo.splice(index, 1);
                if (this.TblHPProject.TbldPProjectCo.length === 0) {
                  this.addRow('TbldPProjectCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPProjectCo') {
            this.TblHPProject.TbldPProjectCo.splice(index, 1);
            if (this.TblHPProject.TbldPProjectCo.length === 0) {
              this.addRow('TbldPProjectCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPProjectCo') {
      const newRow = new TbldPProjectCo()
      this.TblHPProject.TbldPProjectCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPProject.HPProject_Code == null || this.TblHPProject.HPProject_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our Project Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPProject.HPProject_Name == null || this.TblHPProject.HPProject_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our Project Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPProject.TbldPProjectCo[0].DcpProject_SingleCo_Code == null || this.TblHPProject.TbldPProjectCo[0].DcpProject_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our Project Master Single Company Code Cannot Be Null' });
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
    this.TblHPProject.TbldPProjectCo = this.TblHPProject.TbldPProjectCo.filter(
      row => row.DcpProject_SingleCo_Code && row.DcpProject_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.projectMaster, this.TblHPProject).then((res) => {
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
        this.TblHPProject = new TblHPProject();
        this.TblHPProject.TbldPProjectCo = [new TbldPProjectCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/project-master/']);

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
    if (this.TblHPProject.HPProject_SysID || this.HPProject_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.projectMaster, this.TblHPProject.HPProject_SysID).then((res) => {
        this.TblHPProject = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPProject.TbldPProjectCo.length == 0) {
          this.TblHPProject.TbldPProjectCo = [new TbldPProjectCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPProject = new TblHPProject()
          this.TblHPProject.TbldPProjectCo = [new TbldPProjectCo()]
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
        this.masterService.deleteData(apiUrl.projectMaster, this.TblHPProject.HPProject_SysID).then((res) => {

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
    this.TblHPProject = new TblHPProject()
    this.TblHPProject.TbldPProjectCo = [new TbldPProjectCo()]
    this.router.navigate(['Manpower/project-master/']);

  }
  cancel() {
    this.TblHPProject = new TblHPProject()
    this.TblHPProject.TbldPProjectCo = [new TbldPProjectCo()]
    this.router.navigate(['Manpower/project-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.projectMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPProject_Code || item.HPProject_Name || item.HPProject_SysID;
      const matchesQuery =
        (item.HPProject_Code || '').toLowerCase().includes(query) ||
        (item.HPProject_Name || '').toLowerCase().includes(query) ||
        item.HPProject_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/project-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/project-master/' + rowData.HPProject_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.projectMaster, rowData.HPProject_SysID).then((res) => {

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
