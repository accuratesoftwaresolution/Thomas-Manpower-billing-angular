import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPDesigCo } from 'src/app/_dto/designation-master/TbldPDesigCo.dto';
import { TblHPDesig } from 'src/app/_dto/designation-master/TblHPDesig.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.scss']
})
export class DesignationMasterComponent implements OnInit {
  showListButton: boolean = true;

  TblHPDesig: TblHPDesig = new TblHPDesig()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPDesig_SysID: any;

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
    this.TblHPDesig.TbldPDesigCo = [new TbldPDesigCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPDesig_SysID = Number(id);
        this.TblHPDesig.HPDesig_SysID = Number(id);
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
        const isExist = this.TblHPDesig.TbldPDesigCo.some(item => item.DcpDesig_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Designation Master' });
          return;
        }
        this.TblHPDesig.TbldPDesigCo[this.tableIndex].DcpDesig_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPDesig.TbldPDesigCo[this.tableIndex].DcpDesig_SingleCo_Code = event.SingleCo_Code;
        this.TblHPDesig.TbldPDesigCo[this.tableIndex].DcpDesig_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPDesig.HPDesig_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPDesig.HPDesig_AcDe_Code = event.HActDeactive_Code
        this.TblHPDesig.HPDesig_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPDesig.HPDesig_SysID && rowData.DcpDesig_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.designationMaster, `company?where[DcpDesig_GridSysID]=${this.TblHPDesig.TbldPDesigCo[0].DcpDesig_GridSysID}&where[DcpDesig_SingleCo_SysID]=${rowData.DcpDesig_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPDesigCo') {
                this.TblHPDesig.TbldPDesigCo.splice(index, 1);
                if (this.TblHPDesig.TbldPDesigCo.length === 0) {
                  this.addRow('TbldPDesigCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPDesigCo') {
            this.TblHPDesig.TbldPDesigCo.splice(index, 1);
            if (this.TblHPDesig.TbldPDesigCo.length === 0) {
              this.addRow('TbldPDesigCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPDesigCo') {
      const newRow = new TbldPDesigCo()
      this.TblHPDesig.TbldPDesigCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPDesig.HPDesig_Code == null || this.TblHPDesig.HPDesig_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Designation Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPDesig.HPDesig_Name == null || this.TblHPDesig.HPDesig_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Designation Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPDesig.TbldPDesigCo[0].DcpDesig_SingleCo_Code == null || this.TblHPDesig.TbldPDesigCo[0].DcpDesig_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Designation Master Single Company Code Cannot Be Null' });
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
    this.TblHPDesig.TbldPDesigCo = this.TblHPDesig.TbldPDesigCo.filter(
      row => row.DcpDesig_SingleCo_Code && row.DcpDesig_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.designationMaster, this.TblHPDesig).then((res) => {
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
        this.TblHPDesig = new TblHPDesig();
        this.TblHPDesig.TbldPDesigCo = [new TbldPDesigCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/designation-master/']);

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
    if (this.TblHPDesig.HPDesig_SysID || this.HPDesig_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.designationMaster, this.TblHPDesig.HPDesig_SysID).then((res) => {
        this.TblHPDesig = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPDesig.TbldPDesigCo.length == 0) {
          this.TblHPDesig.TbldPDesigCo = [new TbldPDesigCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPDesig = new TblHPDesig()
          this.TblHPDesig.TbldPDesigCo = [new TbldPDesigCo()]
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
        this.masterService.deleteData(apiUrl.designationMaster, this.TblHPDesig.HPDesig_SysID).then((res) => {

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
    this.TblHPDesig = new TblHPDesig()
    this.TblHPDesig.TbldPDesigCo = [new TbldPDesigCo()]
    this.router.navigate(['Manpower/designation-master/']);

  }
  cancel() {
    this.TblHPDesig = new TblHPDesig()
    this.TblHPDesig.TbldPDesigCo = [new TbldPDesigCo()]
    this.router.navigate(['Manpower/designation-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.designationMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPDesig_Code || item.HPDesig_Name || item.HPDesig_SysID;
      const matchesQuery =
        (item.HPDesig_Code || '').toLowerCase().includes(query) ||
        (item.HPDesig_Name || '').toLowerCase().includes(query) ||
        item.HPDesig_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/designation-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/designation-master/' + rowData.HPDesig_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.designationMaster, rowData.HPDesig_SysID).then((res) => {

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
