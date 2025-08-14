import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldTabDispHideCo } from 'src/app/_dto/TbldTabDispHideCo.dto';
import { TblHTabDispHide } from 'src/app/_dto/TblHTabDispHide.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-tab-display-master',
  templateUrl: './tab-display-master.component.html',
  styleUrls: ['./tab-display-master.component.scss']
})
export class TabDisplayMasterComponent implements OnInit {

   showListButton: boolean = true;

  TblHTabDispHide: TblHTabDispHide = new TblHTabDispHide()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HTabDispHide_SysID: any;

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
    this.TblHTabDispHide.TbldTabDispHideCo = [new TbldTabDispHideCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HTabDispHide_SysID = Number(id);
        this.TblHTabDispHide.HTabDispHide_SysID = Number(id);
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
        const isExist = this.TblHTabDispHide.TbldTabDispHideCo.some(item => item.DcTabDispHide_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Tab Display Master' });
          return;
        }
        this.TblHTabDispHide.TbldTabDispHideCo[this.tableIndex].DcTabDispHide_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHTabDispHide.TbldTabDispHideCo[this.tableIndex].DcTabDispHide_SingleCo_Code = event.SingleCo_Code;
        this.TblHTabDispHide.TbldTabDispHideCo[this.tableIndex].DcTabDispHide_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHTabDispHide.HTabDispHide_AcDe_SysID = event.HActDeactive_SysID
        this.TblHTabDispHide.HTabDispHide_AcDe_Code = event.HActDeactive_Code
        this.TblHTabDispHide.HTabDispHide_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHTabDispHide.HTabDispHide_SysID && rowData.DcTabDispHide_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.tabDisplayMaster, `company?where[DcTabDispHide_SysID]=${this.TblHTabDispHide.TbldTabDispHideCo[0].DcTabDispHide_SysID}&where[DcTabDispHide_SingleCo_SysID]=${rowData.DcTabDispHide_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldTabDispHideCo') {
                this.TblHTabDispHide.TbldTabDispHideCo.splice(index, 1);
                if (this.TblHTabDispHide.TbldTabDispHideCo.length === 0) {
                  this.addRow('TbldTabDispHideCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldTabDispHideCo') {
            this.TblHTabDispHide.TbldTabDispHideCo.splice(index, 1);
            if (this.TblHTabDispHide.TbldTabDispHideCo.length === 0) {
              this.addRow('TbldTabDispHideCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldTabDispHideCo') {
      const newRow = new TbldTabDispHideCo()
      this.TblHTabDispHide.TbldTabDispHideCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHTabDispHide.HTabDispHide_Code == null || this.TblHTabDispHide.HTabDispHide_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Tab Display Code Cannot Be Null' });
      return false;
    }

    if (this.TblHTabDispHide.HTabDispHide_Name == null || this.TblHTabDispHide.HTabDispHide_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Tab Display Name Cannot Be Null' });
      return false;
    }

    if (this.TblHTabDispHide.TbldTabDispHideCo[0].DcTabDispHide_SingleCo_Code == null || this.TblHTabDispHide.TbldTabDispHideCo[0].DcTabDispHide_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Tab Display Single Company Code Cannot Be Null' });
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
    this.TblHTabDispHide.TbldTabDispHideCo = this.TblHTabDispHide.TbldTabDispHideCo.filter(
      row => row.DcTabDispHide_SingleCo_Code && row.DcTabDispHide_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.tabDisplayMaster, this.TblHTabDispHide).then((res) => {
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
        this.TblHTabDispHide = new TblHTabDispHide();
        this.TblHTabDispHide.TbldTabDispHideCo = [new TbldTabDispHideCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/tab-display-master']);

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
    if (this.TblHTabDispHide.HTabDispHide_SysID || this.HTabDispHide_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.tabDisplayMaster, this.TblHTabDispHide.HTabDispHide_SysID).then((res) => {
        this.TblHTabDispHide = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHTabDispHide.TbldTabDispHideCo.length == 0) {
          this.TblHTabDispHide.TbldTabDispHideCo = [new TbldTabDispHideCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHTabDispHide = new TblHTabDispHide()
          this.TblHTabDispHide.TbldTabDispHideCo = [new TbldTabDispHideCo()]
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
        this.masterService.deleteData(apiUrl.tabDisplayMaster, this.TblHTabDispHide.HTabDispHide_SysID).then((res) => {

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
    this.TblHTabDispHide = new TblHTabDispHide()
    this.TblHTabDispHide.TbldTabDispHideCo = [new TbldTabDispHideCo()]
    this.router.navigate(['l-master/tab-display-master']);

  }
  cancel() {
    this.TblHTabDispHide = new TblHTabDispHide()
    this.TblHTabDispHide.TbldTabDispHideCo = [new TbldTabDispHideCo()]
    this.router.navigate(['l-master/tab-display-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.tabDisplayMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HTabDispHide_Code || item.HTabDispHide_Name || item.HTabDispHide_SysID;
      const matchesQuery =
        (item.HTabDispHide_Code || '').toLowerCase().includes(query) ||
        (item.HTabDispHide_Name || '').toLowerCase().includes(query) ||
        item.HTabDispHide_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['l-master/tab-display-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/tab-display-master/' + rowData.HTabDispHide_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.tabDisplayMaster, rowData.HTabDispHide_SysID).then((res) => {

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
