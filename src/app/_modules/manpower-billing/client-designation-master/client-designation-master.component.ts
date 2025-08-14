import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPCliDesigCo } from 'src/app/_dto/client-designation-master/TbldPCliDesigCo.dto';
import { TblHPCliDesig } from 'src/app/_dto/client-designation-master/TblHPCliDesig.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-client-designation-master',
  templateUrl: './client-designation-master.component.html',
  styleUrls: ['./client-designation-master.component.scss']
})
export class ClientDesignationMasterComponent implements OnInit {
 showListButton: boolean = true;

  TblHPCliDesig: TblHPCliDesig = new TblHPCliDesig()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPCliDesig_SysID: any;

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
    this.TblHPCliDesig.TbldPCliDesigCo = [new TbldPCliDesigCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPCliDesig_SysID = Number(id);
        this.TblHPCliDesig.HPCliDesig_SysID = Number(id);
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
        const isExist = this.TblHPCliDesig.TbldPCliDesigCo.some(item => item.DcpCliDesig_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Client Designation Master' });
          return;
        }
        this.TblHPCliDesig.TbldPCliDesigCo[this.tableIndex].DcpCliDesig_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPCliDesig.TbldPCliDesigCo[this.tableIndex].DcpCliDesig_SingleCo_Code = event.SingleCo_Code;
        this.TblHPCliDesig.TbldPCliDesigCo[this.tableIndex].DcpCliDesig_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPCliDesig.HPCliDesig_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPCliDesig.HPCliDesig_AcDe_Code = event.HActDeactive_Code
        this.TblHPCliDesig.HPCliDesig_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPCliDesig.HPCliDesig_SysID && rowData.DcpCliDesig_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.clientDesignationMaster, `company?where[DcpCliDesig_GridSysID]=${this.TblHPCliDesig.TbldPCliDesigCo[0].DcpCliDesig_GridSysID}&where[DcpCliDesig_SingleCo_SysID]=${rowData.DcpCliDesig_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPCliDesigCo') {
                this.TblHPCliDesig.TbldPCliDesigCo.splice(index, 1);
                if (this.TblHPCliDesig.TbldPCliDesigCo.length === 0) {
                  this.addRow('TbldPCliDesigCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPCliDesigCo') {
            this.TblHPCliDesig.TbldPCliDesigCo.splice(index, 1);
            if (this.TblHPCliDesig.TbldPCliDesigCo.length === 0) {
              this.addRow('TbldPCliDesigCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPCliDesigCo') {
      const newRow = new TbldPCliDesigCo()
      this.TblHPCliDesig.TbldPCliDesigCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPCliDesig.HPCliDesig_Code == null || this.TblHPCliDesig.HPCliDesig_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Client Designation Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPCliDesig.HPCliDesig_Name == null || this.TblHPCliDesig.HPCliDesig_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Client Designation Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPCliDesig.TbldPCliDesigCo[0].DcpCliDesig_SingleCo_Code == null || this.TblHPCliDesig.TbldPCliDesigCo[0].DcpCliDesig_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Client Designation Master Single Company Code Cannot Be Null' });
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
    this.TblHPCliDesig.TbldPCliDesigCo = this.TblHPCliDesig.TbldPCliDesigCo.filter(
      row => row.DcpCliDesig_SingleCo_Code && row.DcpCliDesig_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.clientDesignationMaster, this.TblHPCliDesig).then((res) => {
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
        this.TblHPCliDesig = new TblHPCliDesig();
        this.TblHPCliDesig.TbldPCliDesigCo = [new TbldPCliDesigCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/client-designation-master/']);

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
    if (this.TblHPCliDesig.HPCliDesig_SysID || this.HPCliDesig_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.clientDesignationMaster, this.TblHPCliDesig.HPCliDesig_SysID).then((res) => {
        this.TblHPCliDesig = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPCliDesig.TbldPCliDesigCo.length == 0) {
          this.TblHPCliDesig.TbldPCliDesigCo = [new TbldPCliDesigCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPCliDesig = new TblHPCliDesig()
          this.TblHPCliDesig.TbldPCliDesigCo = [new TbldPCliDesigCo()]
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
        this.masterService.deleteData(apiUrl.clientDesignationMaster, this.TblHPCliDesig.HPCliDesig_SysID).then((res) => {

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
    this.TblHPCliDesig = new TblHPCliDesig()
    this.TblHPCliDesig.TbldPCliDesigCo = [new TbldPCliDesigCo()]
    this.router.navigate(['Manpower/client-designation-master/']);

  }
  cancel() {
    this.TblHPCliDesig = new TblHPCliDesig()
    this.TblHPCliDesig.TbldPCliDesigCo = [new TbldPCliDesigCo()]
    this.router.navigate(['Manpower/client-designation-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.clientDesignationMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPCliDesig_Code || item.HPCliDesig_Name || item.HPCliDesig_SysID;
      const matchesQuery =
        (item.HPCliDesig_Code || '').toLowerCase().includes(query) ||
        (item.HPCliDesig_Name || '').toLowerCase().includes(query) ||
        item.HPCliDesig_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/client-designation-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/client-designation-master/' + rowData.HPCliDesig_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.clientDesignationMaster, rowData.HPCliDesig_SysID).then((res) => {

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
