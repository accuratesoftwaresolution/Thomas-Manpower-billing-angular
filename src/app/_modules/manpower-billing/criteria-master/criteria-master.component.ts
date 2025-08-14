import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPCriMasterCo } from 'src/app/_dto/criteria-master/TbldPCriMasterCo.dto';
import { TblHPCriMaster } from 'src/app/_dto/criteria-master/TblHPCriMaster.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-criteria-master',
  templateUrl: './criteria-master.component.html',
  styleUrls: ['./criteria-master.component.scss']
})
export class CriteriaMasterComponent implements OnInit {


 showListButton: boolean = true;

  TblHPCriMaster: TblHPCriMaster = new TblHPCriMaster()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPCriMaster_SysID: any;

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
    this.TblHPCriMaster.TbldPCriMasterCo = [new TbldPCriMasterCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPCriMaster_SysID = Number(id);
        this.TblHPCriMaster.HPCriMaster_SysID = Number(id);
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
        const isExist = this.TblHPCriMaster.TbldPCriMasterCo.some(item => item.DcpCriMaster_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Criteria Master' });
          return;
        }
        this.TblHPCriMaster.TbldPCriMasterCo[this.tableIndex].DcpCriMaster_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPCriMaster.TbldPCriMasterCo[this.tableIndex].DcpCriMaster_SingleCo_Code = event.SingleCo_Code;
        this.TblHPCriMaster.TbldPCriMasterCo[this.tableIndex].DcpCriMaster_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPCriMaster.HPCriMaster_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPCriMaster.HPCriMaster_AcDe_Code = event.HActDeactive_Code
        this.TblHPCriMaster.HPCriMaster_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPCriMaster.HPCriMaster_SysID && rowData.DcpCriMaster_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.criteriaMaster, `company?where[DcpCriMaster_GridSysID]=${this.TblHPCriMaster.TbldPCriMasterCo[0].DcpCriMaster_GridSysID}&where[DcpCriMaster_SingleCo_SysID]=${rowData.DcpCriMaster_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPCriMasterCo') {
                this.TblHPCriMaster.TbldPCriMasterCo.splice(index, 1);
                if (this.TblHPCriMaster.TbldPCriMasterCo.length === 0) {
                  this.addRow('TbldPCriMasterCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPCriMasterCo') {
            this.TblHPCriMaster.TbldPCriMasterCo.splice(index, 1);
            if (this.TblHPCriMaster.TbldPCriMasterCo.length === 0) {
              this.addRow('TbldPCriMasterCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPCriMasterCo') {
      const newRow = new TbldPCriMasterCo()
      this.TblHPCriMaster.TbldPCriMasterCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPCriMaster.HPCriMaster_Code == null || this.TblHPCriMaster.HPCriMaster_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Criteria Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPCriMaster.HPCriMaster_Name == null || this.TblHPCriMaster.HPCriMaster_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Criteria Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPCriMaster.TbldPCriMasterCo[0].DcpCriMaster_SingleCo_Code == null || this.TblHPCriMaster.TbldPCriMasterCo[0].DcpCriMaster_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Criteria Master Single Company Code Cannot Be Null' });
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
    this.TblHPCriMaster.TbldPCriMasterCo = this.TblHPCriMaster.TbldPCriMasterCo.filter(
      row => row.DcpCriMaster_SingleCo_Code && row.DcpCriMaster_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.criteriaMaster, this.TblHPCriMaster).then((res) => {
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
        this.TblHPCriMaster = new TblHPCriMaster();
        this.TblHPCriMaster.TbldPCriMasterCo = [new TbldPCriMasterCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/criteria-master/']);

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
    if (this.TblHPCriMaster.HPCriMaster_SysID || this.HPCriMaster_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.criteriaMaster, this.TblHPCriMaster.HPCriMaster_SysID).then((res) => {
        this.TblHPCriMaster = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPCriMaster.TbldPCriMasterCo.length == 0) {
          this.TblHPCriMaster.TbldPCriMasterCo = [new TbldPCriMasterCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPCriMaster = new TblHPCriMaster()
          this.TblHPCriMaster.TbldPCriMasterCo = [new TbldPCriMasterCo()]
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
        this.masterService.deleteData(apiUrl.criteriaMaster, this.TblHPCriMaster.HPCriMaster_SysID).then((res) => {

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
    this.TblHPCriMaster = new TblHPCriMaster()
    this.TblHPCriMaster.TbldPCriMasterCo = [new TbldPCriMasterCo()]
    this.router.navigate(['Manpower/criteria-master/']);

  }
  cancel() {
    this.TblHPCriMaster = new TblHPCriMaster()
    this.TblHPCriMaster.TbldPCriMasterCo = [new TbldPCriMasterCo()]
    this.router.navigate(['Manpower/criteria-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.criteriaMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPCriMaster_Code || item.HPCriMaster_Name || item.HPCriMaster_SysID;
      const matchesQuery =
        (item.HPCriMaster_Code || '').toLowerCase().includes(query) ||
        (item.HPCriMaster_Name || '').toLowerCase().includes(query) ||
        item.HPCriMaster_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/criteria-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/criteria-master/' + rowData.HPCriMaster_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.criteriaMaster, rowData.HPCriMaster_SysID).then((res) => {

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


