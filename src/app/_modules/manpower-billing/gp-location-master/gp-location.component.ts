import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPGPLocCo } from 'src/app/_dto/gp-location-master/TbldPGPLocCo.dto';
import { TblHPGPLoc } from 'src/app/_dto/gp-location-master/TblHPGPLoc.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-gp-location',
  templateUrl: './gp-location.component.html',
  styleUrls: ['./gp-location.component.scss']
})
export class GpLocationComponent implements OnInit {
 showListButton: boolean = true;

  TblHPGPLoc: TblHPGPLoc = new TblHPGPLoc()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPGPLoc_SysID: any;

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
    this.TblHPGPLoc.TbldPGPLocCo = [new TbldPGPLocCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPGPLoc_SysID = Number(id);
        this.TblHPGPLoc.HPGPLoc_SysID = Number(id);
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
        const isExist = this.TblHPGPLoc.TbldPGPLocCo.some(item => item.DcpGPLoc_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for GP Location Master' });
          return;
        }
        this.TblHPGPLoc.TbldPGPLocCo[this.tableIndex].DcpGPLoc_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPGPLoc.TbldPGPLocCo[this.tableIndex].DcpGPLoc_SingleCo_Code = event.SingleCo_Code;
        this.TblHPGPLoc.TbldPGPLocCo[this.tableIndex].DcpGPLoc_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPGPLoc.HPGPLoc_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPGPLoc.HPGPLoc_AcDe_Code = event.HActDeactive_Code
        this.TblHPGPLoc.HPGPLoc_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPGPLoc.HPGPLoc_SysID && rowData.DcpGPLoc_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.gplocationMaster, `company?where[DcpGPLoc_GridSysID]=${this.TblHPGPLoc.TbldPGPLocCo[0].DcpGPLoc_GridSysID}&where[DcpGPLoc_SingleCo_SysID]=${rowData.DcpGPLoc_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPGPLocCo') {
                this.TblHPGPLoc.TbldPGPLocCo.splice(index, 1);
                if (this.TblHPGPLoc.TbldPGPLocCo.length === 0) {
                  this.addRow('TbldPGPLocCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPGPLocCo') {
            this.TblHPGPLoc.TbldPGPLocCo.splice(index, 1);
            if (this.TblHPGPLoc.TbldPGPLocCo.length === 0) {
              this.addRow('TbldPGPLocCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPGPLocCo') {
      const newRow = new TbldPGPLocCo()
      this.TblHPGPLoc.TbldPGPLocCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPGPLoc.HPGPLoc_Code == null || this.TblHPGPLoc.HPGPLoc_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Location Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPGPLoc.HPGPLoc_Name == null || this.TblHPGPLoc.HPGPLoc_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Location Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPGPLoc.TbldPGPLocCo[0].DcpGPLoc_SingleCo_Code == null || this.TblHPGPLoc.TbldPGPLocCo[0].DcpGPLoc_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Location Master Single Company Code Cannot Be Null' });
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
    this.TblHPGPLoc.TbldPGPLocCo = this.TblHPGPLoc.TbldPGPLocCo.filter(
      row => row.DcpGPLoc_SingleCo_Code && row.DcpGPLoc_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.gplocationMaster, this.TblHPGPLoc).then((res) => {
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
        this.TblHPGPLoc = new TblHPGPLoc();
        this.TblHPGPLoc.TbldPGPLocCo = [new TbldPGPLocCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/gp-location-master/']);

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
    if (this.TblHPGPLoc.HPGPLoc_SysID || this.HPGPLoc_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.gplocationMaster, this.TblHPGPLoc.HPGPLoc_SysID).then((res) => {
        this.TblHPGPLoc = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPGPLoc.TbldPGPLocCo.length == 0) {
          this.TblHPGPLoc.TbldPGPLocCo = [new TbldPGPLocCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPGPLoc = new TblHPGPLoc()
          this.TblHPGPLoc.TbldPGPLocCo = [new TbldPGPLocCo()]
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
        this.masterService.deleteData(apiUrl.gplocationMaster, this.TblHPGPLoc.HPGPLoc_SysID).then((res) => {

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
    this.TblHPGPLoc = new TblHPGPLoc()
    this.TblHPGPLoc.TbldPGPLocCo = [new TbldPGPLocCo()]
    this.router.navigate(['Manpower/gp-location-master/']);

  }
  cancel() {
    this.TblHPGPLoc = new TblHPGPLoc()
    this.TblHPGPLoc.TbldPGPLocCo = [new TbldPGPLocCo()]
    this.router.navigate(['Manpower/gp-location-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.gplocationMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPGPLoc_Code || item.HPGPLoc_Name || item.HPGPLoc_SysID;
      const matchesQuery =
        (item.HPGPLoc_Code || '').toLowerCase().includes(query) ||
        (item.HPGPLoc_Name || '').toLowerCase().includes(query) ||
        item.HPGPLoc_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/gp-location-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/gp-location-master/' + rowData.HPGPLoc_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.gplocationMaster, rowData.HPGPLoc_SysID).then((res) => {

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
