import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPProjCo } from 'src/app/_dto/project-company-master/TbldPProjCo.dto';
import { TblHPProjCo } from 'src/app/_dto/project-company-master/TblHPProjCo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-project-company-master',
  templateUrl: './project-company-master.component.html',
  styleUrls: ['./project-company-master.component.scss']
})
export class ProjectCompanyMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHPProjCo: TblHPProjCo = new TblHPProjCo()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPProjCo_SysID: any;

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
    this.TblHPProjCo.TbldPProjCo = [new TbldPProjCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPProjCo_SysID = Number(id);
        this.TblHPProjCo.HPProjCo_SysID = Number(id);
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
        const isExist = this.TblHPProjCo.TbldPProjCo.some(item => item.DcpProjCo_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Project Company Master' });
          return;
        }
        this.TblHPProjCo.TbldPProjCo[this.tableIndex].DcpProjCo_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPProjCo.TbldPProjCo[this.tableIndex].DcpProjCo_SingleCo_Code = event.SingleCo_Code;
        this.TblHPProjCo.TbldPProjCo[this.tableIndex].DcpProjCo_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPProjCo.HPProjCo_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPProjCo.HPProjCo_AcDe_Code = event.HActDeactive_Code
        this.TblHPProjCo.HPProjCo_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPProjCo.HPProjCo_SysID && rowData.DcpProjCo_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.projectCompany, `company?where[DcpProjCo_GridSysID]=${this.TblHPProjCo.TbldPProjCo[0].DcpProjCo_GridSysID}&where[DcpProjCo_SingleCo_SysID]=${rowData.DcpProjCo_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPProjCo') {
                this.TblHPProjCo.TbldPProjCo.splice(index, 1);
                if (this.TblHPProjCo.TbldPProjCo.length === 0) {
                  this.addRow('TbldPProjCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPProjCo') {
            this.TblHPProjCo.TbldPProjCo.splice(index, 1);
            if (this.TblHPProjCo.TbldPProjCo.length === 0) {
              this.addRow('TbldPProjCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPProjCo') {
      const newRow = new TbldPProjCo()
      this.TblHPProjCo.TbldPProjCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPProjCo.HPProjCo_Code == null || this.TblHPProjCo.HPProjCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Project Company Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPProjCo.HPProjCo_Name == null || this.TblHPProjCo.HPProjCo_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Project Company Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPProjCo.TbldPProjCo[0].DcpProjCo_SingleCo_Code == null || this.TblHPProjCo.TbldPProjCo[0].DcpProjCo_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Project Company Master Single Company Code Cannot Be Null' });
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
    this.TblHPProjCo.TbldPProjCo = this.TblHPProjCo.TbldPProjCo.filter(
      row => row.DcpProjCo_SingleCo_Code && row.DcpProjCo_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.projectCompany, this.TblHPProjCo).then((res) => {
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
        this.TblHPProjCo = new TblHPProjCo();
        this.TblHPProjCo.TbldPProjCo = [new TbldPProjCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/project-company-master/']);

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
    if (this.TblHPProjCo.HPProjCo_SysID || this.HPProjCo_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.projectCompany, this.TblHPProjCo.HPProjCo_SysID).then((res) => {
        this.TblHPProjCo = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPProjCo.TbldPProjCo.length == 0) {
          this.TblHPProjCo.TbldPProjCo = [new TbldPProjCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPProjCo = new TblHPProjCo()
          this.TblHPProjCo.TbldPProjCo = [new TbldPProjCo()]
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
        this.masterService.deleteData(apiUrl.projectCompany, this.TblHPProjCo.HPProjCo_SysID).then((res) => {

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
    this.TblHPProjCo = new TblHPProjCo()
    this.TblHPProjCo.TbldPProjCo = [new TbldPProjCo()]
    this.router.navigate(['Manpower/project-company-master/']);

  }
  cancel() {
    this.TblHPProjCo = new TblHPProjCo()
    this.TblHPProjCo.TbldPProjCo = [new TbldPProjCo()]
    this.router.navigate(['Manpower/project-company-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.projectCompany).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPProjCo_Code || item.HPProjCo_Name || item.HPProjCo_SysID;
      const matchesQuery =
        (item.HPProjCo_Code || '').toLowerCase().includes(query) ||
        (item.HPProjCo_Name || '').toLowerCase().includes(query) ||
        item.HPProjCo_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/project-company-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/project-company-master/' + rowData.HPProjCo_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.projectCompany, rowData.HPProjCo_SysID).then((res) => {

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
