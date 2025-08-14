import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPSiteExeCo } from 'src/app/_dto/site-executive-master/TbldPSiteExeCo.dto';
import { TblHPSiteExe } from 'src/app/_dto/site-executive-master/TblHPSiteExe.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-site-executive-master',
  templateUrl: './site-executive-master.component.html',
  styleUrls: ['./site-executive-master.component.scss']
})
export class SiteExecutiveMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHPSiteExe: TblHPSiteExe = new TblHPSiteExe()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPSiteExe_SysID: any;

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
    this.TblHPSiteExe.TbldPSiteExeCo = [new TbldPSiteExeCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPSiteExe_SysID = Number(id);
        this.TblHPSiteExe.HPSiteExe_SysID = Number(id);
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
        const isExist = this.TblHPSiteExe.TbldPSiteExeCo.some(item => item.DcpSiteExe_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Site Executive Master' });
          return;
        }
        this.TblHPSiteExe.TbldPSiteExeCo[this.tableIndex].DcpSiteExe_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPSiteExe.TbldPSiteExeCo[this.tableIndex].DcpSiteExe_SingleCo_Code = event.SingleCo_Code;
        this.TblHPSiteExe.TbldPSiteExeCo[this.tableIndex].DcpSiteExe_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPSiteExe.HPSiteExe_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPSiteExe.HPSiteExe_AcDe_Code = event.HActDeactive_Code
        this.TblHPSiteExe.HPSiteExe_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPSiteExe.HPSiteExe_SysID && rowData.DcpSiteExe_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.siteExecutive, `company?where[DcpSiteExe_GridSysID]=${this.TblHPSiteExe.TbldPSiteExeCo[0].DcpSiteExe_GridSysID}&where[DcpSiteExe_SingleCo_SysID]=${rowData.DcpSiteExe_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPSiteExeCo') {
                this.TblHPSiteExe.TbldPSiteExeCo.splice(index, 1);
                if (this.TblHPSiteExe.TbldPSiteExeCo.length === 0) {
                  this.addRow('TbldPSiteExeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPSiteExeCo') {
            this.TblHPSiteExe.TbldPSiteExeCo.splice(index, 1);
            if (this.TblHPSiteExe.TbldPSiteExeCo.length === 0) {
              this.addRow('TbldPSiteExeCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPSiteExeCo') {
      const newRow = new TbldPSiteExeCo()
      this.TblHPSiteExe.TbldPSiteExeCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPSiteExe.HPSiteExe_Code == null || this.TblHPSiteExe.HPSiteExe_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Site Executive Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPSiteExe.HPSiteExe_Name == null || this.TblHPSiteExe.HPSiteExe_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Site Executive Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPSiteExe.TbldPSiteExeCo[0].DcpSiteExe_SingleCo_Code == null || this.TblHPSiteExe.TbldPSiteExeCo[0].DcpSiteExe_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Site Executive Master Single Company Code Cannot Be Null' });
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
    this.TblHPSiteExe.TbldPSiteExeCo = this.TblHPSiteExe.TbldPSiteExeCo.filter(
      row => row.DcpSiteExe_SingleCo_Code && row.DcpSiteExe_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.siteExecutive, this.TblHPSiteExe).then((res) => {
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
        this.TblHPSiteExe = new TblHPSiteExe();
        this.TblHPSiteExe.TbldPSiteExeCo = [new TbldPSiteExeCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/site-executive-master/']);

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
    if (this.TblHPSiteExe.HPSiteExe_SysID || this.HPSiteExe_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.siteExecutive, this.TblHPSiteExe.HPSiteExe_SysID).then((res) => {
        this.TblHPSiteExe = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPSiteExe.TbldPSiteExeCo.length == 0) {
          this.TblHPSiteExe.TbldPSiteExeCo = [new TbldPSiteExeCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPSiteExe = new TblHPSiteExe()
          this.TblHPSiteExe.TbldPSiteExeCo = [new TbldPSiteExeCo()]
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
        this.masterService.deleteData(apiUrl.siteExecutive, this.TblHPSiteExe.HPSiteExe_SysID).then((res) => {

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
    this.TblHPSiteExe = new TblHPSiteExe()
    this.TblHPSiteExe.TbldPSiteExeCo = [new TbldPSiteExeCo()]
    this.router.navigate(['Manpower/site-executive-master/']);

  }
  cancel() {
    this.TblHPSiteExe = new TblHPSiteExe()
    this.TblHPSiteExe.TbldPSiteExeCo = [new TbldPSiteExeCo()]
    this.router.navigate(['Manpower/site-executive-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.siteExecutive).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPSiteExe_Code || item.HPSiteExe_Name || item.HPSiteExe_SysID;
      const matchesQuery =
        (item.HPSiteExe_Code || '').toLowerCase().includes(query) ||
        (item.HPSiteExe_Name || '').toLowerCase().includes(query) ||
        item.HPSiteExe_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/site-executive-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/site-executive-master/' + rowData.HPSiteExe_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.siteExecutive, rowData.HPSiteExe_SysID).then((res) => {

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
