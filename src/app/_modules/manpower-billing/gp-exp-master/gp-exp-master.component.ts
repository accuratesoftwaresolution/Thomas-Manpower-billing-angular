import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPGpExpCo } from 'src/app/_dto/gp-exp-master/TbldPGpExpCo.dto';
import { TblHPGpExp } from 'src/app/_dto/gp-exp-master/TblHPGpExp.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-gp-exp-master',
  templateUrl: './gp-exp-master.component.html',
  styleUrls: ['./gp-exp-master.component.scss']
})
export class GpExpMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHPGpExp: TblHPGpExp = new TblHPGpExp()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPGpExp_SysID: any;

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
    this.TblHPGpExp.TbldPGpExpCo = [new TbldPGpExpCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPGpExp_SysID = Number(id);
        this.TblHPGpExp.HPGpExp_SysID = Number(id);
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
        const isExist = this.TblHPGpExp.TbldPGpExpCo.some(item => item.DcpGpExp_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for GP Exp Master' });
          return;
        }
        this.TblHPGpExp.TbldPGpExpCo[this.tableIndex].DcpGpExp_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPGpExp.TbldPGpExpCo[this.tableIndex].DcpGpExp_SingleCo_Code = event.SingleCo_Code;
        this.TblHPGpExp.TbldPGpExpCo[this.tableIndex].DcpGpExp_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPGpExp.HPGpExp_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPGpExp.HPGpExp_AcDe_Code = event.HActDeactive_Code
        this.TblHPGpExp.HPGpExp_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPGpExp.HPGpExp_SysID && rowData.DcpGpExp_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.gpExpMaster, `company?where[DcpGpExp_GridSysID]=${this.TblHPGpExp.TbldPGpExpCo[0].DcpGpExp_GridSysID}&where[DcpGpExp_SingleCo_SysID]=${rowData.DcpGpExp_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPGpExpCo') {
                this.TblHPGpExp.TbldPGpExpCo.splice(index, 1);
                if (this.TblHPGpExp.TbldPGpExpCo.length === 0) {
                  this.addRow('TbldPGpExpCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPGpExpCo') {
            this.TblHPGpExp.TbldPGpExpCo.splice(index, 1);
            if (this.TblHPGpExp.TbldPGpExpCo.length === 0) {
              this.addRow('TbldPGpExpCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPGpExpCo') {
      const newRow = new TbldPGpExpCo()
      this.TblHPGpExp.TbldPGpExpCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPGpExp.HPGpExp_Code == null || this.TblHPGpExp.HPGpExp_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Exp Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPGpExp.HPGpExp_Name == null || this.TblHPGpExp.HPGpExp_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Exp Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPGpExp.TbldPGpExpCo[0].DcpGpExp_SingleCo_Code == null || this.TblHPGpExp.TbldPGpExpCo[0].DcpGpExp_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Exp Master Single Company Code Cannot Be Null' });
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
    this.TblHPGpExp.TbldPGpExpCo = this.TblHPGpExp.TbldPGpExpCo.filter(
      row => row.DcpGpExp_SingleCo_Code && row.DcpGpExp_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.gpExpMaster, this.TblHPGpExp).then((res) => {
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
        this.TblHPGpExp = new TblHPGpExp();
        this.TblHPGpExp.TbldPGpExpCo = [new TbldPGpExpCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/gp-exp-master/']);

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
    if (this.TblHPGpExp.HPGpExp_SysID || this.HPGpExp_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.gpExpMaster, this.TblHPGpExp.HPGpExp_SysID).then((res) => {
        this.TblHPGpExp = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPGpExp.TbldPGpExpCo.length == 0) {
          this.TblHPGpExp.TbldPGpExpCo = [new TbldPGpExpCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPGpExp = new TblHPGpExp()
          this.TblHPGpExp.TbldPGpExpCo = [new TbldPGpExpCo()]
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
        this.masterService.deleteData(apiUrl.gpExpMaster, this.TblHPGpExp.HPGpExp_SysID).then((res) => {

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
    this.TblHPGpExp = new TblHPGpExp()
    this.TblHPGpExp.TbldPGpExpCo = [new TbldPGpExpCo()]
    this.router.navigate(['Manpower/gp-exp-master/']);

  }
  cancel() {
    this.TblHPGpExp = new TblHPGpExp()
    this.TblHPGpExp.TbldPGpExpCo = [new TbldPGpExpCo()]
    this.router.navigate(['Manpower/gp-exp-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.gpExpMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPGpExp_Code || item.HPGpExp_Name || item.HPGpExp_SysID;
      const matchesQuery =
        (item.HPGpExp_Code || '').toLowerCase().includes(query) ||
        (item.HPGpExp_Name || '').toLowerCase().includes(query) ||
        item.HPGpExp_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/gp-exp-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/gp-exp-master/' + rowData.HPGpExp_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.gpExpMaster, rowData.HPGpExp_SysID).then((res) => {

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
