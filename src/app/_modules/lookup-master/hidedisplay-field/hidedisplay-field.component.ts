import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldFieldDispHideCo } from 'src/app/_dto/TbldFieldDispHideCo.dto';
import { TbHlFieldDispHide } from 'src/app/_dto/TbHlFieldDispHide.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-hidedisplay-field',
  templateUrl: './hidedisplay-field.component.html',
  styleUrls: ['./hidedisplay-field.component.scss']
})
export class HidedisplayFieldComponent implements OnInit {

   showListButton: boolean = true;

  TbHlFieldDispHide: TbHlFieldDispHide = new TbHlFieldDispHide()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HFieldDispHide_SysID: any;

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
    this.TbHlFieldDispHide.TbldFieldDispHideCo = [new TbldFieldDispHideCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HFieldDispHide_SysID = Number(id);
        this.TbHlFieldDispHide.HFieldDispHide_SysID = Number(id);
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
        const isExist = this.TbHlFieldDispHide.TbldFieldDispHideCo.some(item => item.DcFieldDispHide_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Field Hide Display Master' });
          return;
        }
        this.TbHlFieldDispHide.TbldFieldDispHideCo[this.tableIndex].DcFieldDispHide_SingleCo_SysID = event.SingleCo_SysID;
        this.TbHlFieldDispHide.TbldFieldDispHideCo[this.tableIndex].DcFieldDispHide_SingleCo_Code = event.SingleCo_Code;
        this.TbHlFieldDispHide.TbldFieldDispHideCo[this.tableIndex].DcFieldDispHide_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TbHlFieldDispHide.HFieldDispHide_AcDe_SysID = event.HActDeactive_SysID
        this.TbHlFieldDispHide.HFieldDispHide_AcDe_Code = event.HActDeactive_Code
        this.TbHlFieldDispHide.HFieldDispHide_AcDe_Name = event.HActDeactive_Name
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

        if (this.TbHlFieldDispHide.HFieldDispHide_SysID && rowData.DcFieldDispHide_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.fieldHideDisplay, `company?where[DcFieldDispHide_SysID]=${this.TbHlFieldDispHide.TbldFieldDispHideCo[0].DcFieldDispHide_SysID}&where[DcFieldDispHide_SingleCo_SysID]=${rowData.DcFieldDispHide_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldFieldDispHideCo') {
                this.TbHlFieldDispHide.TbldFieldDispHideCo.splice(index, 1);
                if (this.TbHlFieldDispHide.TbldFieldDispHideCo.length === 0) {
                  this.addRow('TbldFieldDispHideCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldFieldDispHideCo') {
            this.TbHlFieldDispHide.TbldFieldDispHideCo.splice(index, 1);
            if (this.TbHlFieldDispHide.TbldFieldDispHideCo.length === 0) {
              this.addRow('TbldFieldDispHideCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldFieldDispHideCo') {
      const newRow = new TbldFieldDispHideCo()
      this.TbHlFieldDispHide.TbldFieldDispHideCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TbHlFieldDispHide.HFieldDispHide_Code == null || this.TbHlFieldDispHide.HFieldDispHide_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Field Hide Display Code Cannot Be Null' });
      return false;
    }

    if (this.TbHlFieldDispHide.HFieldDispHide_Name == null || this.TbHlFieldDispHide.HFieldDispHide_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Field Hide Display Name Cannot Be Null' });
      return false;
    }

    if (this.TbHlFieldDispHide.TbldFieldDispHideCo[0].DcFieldDispHide_SingleCo_Code == null || this.TbHlFieldDispHide.TbldFieldDispHideCo[0].DcFieldDispHide_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Field Hide Display Single Company Code Cannot Be Null' });
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
    this.TbHlFieldDispHide.TbldFieldDispHideCo = this.TbHlFieldDispHide.TbldFieldDispHideCo.filter(
      row => row.DcFieldDispHide_SingleCo_Code && row.DcFieldDispHide_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.fieldHideDisplay, this.TbHlFieldDispHide).then((res) => {
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
        this.TbHlFieldDispHide = new TbHlFieldDispHide();
        this.TbHlFieldDispHide.TbldFieldDispHideCo = [new TbldFieldDispHideCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/hidedisplay-field']);

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
    if (this.TbHlFieldDispHide.HFieldDispHide_SysID || this.HFieldDispHide_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.fieldHideDisplay, this.TbHlFieldDispHide.HFieldDispHide_SysID).then((res) => {
        this.TbHlFieldDispHide = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TbHlFieldDispHide.TbldFieldDispHideCo.length == 0) {
          this.TbHlFieldDispHide.TbldFieldDispHideCo = [new TbldFieldDispHideCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TbHlFieldDispHide = new TbHlFieldDispHide()
          this.TbHlFieldDispHide.TbldFieldDispHideCo = [new TbldFieldDispHideCo()]
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
        this.masterService.deleteData(apiUrl.fieldHideDisplay, this.TbHlFieldDispHide.HFieldDispHide_SysID).then((res) => {

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
    this.TbHlFieldDispHide = new TbHlFieldDispHide()
    this.TbHlFieldDispHide.TbldFieldDispHideCo = [new TbldFieldDispHideCo()]
    this.router.navigate(['l-master/hidedisplay-field']);

  }
  cancel() {
    this.TbHlFieldDispHide = new TbHlFieldDispHide()
    this.TbHlFieldDispHide.TbldFieldDispHideCo = [new TbldFieldDispHideCo()]
    this.router.navigate(['l-master/hidedisplay-field']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.fieldHideDisplay).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HFieldDispHide_Code || item.HFieldDispHide_Name || item.HFieldDispHide_SysID;
      const matchesQuery =
        (item.HFieldDispHide_Code || '').toLowerCase().includes(query) ||
        (item.HFieldDispHide_Name || '').toLowerCase().includes(query) ||
        item.HFieldDispHide_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['l-master/hidedisplay-field']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/hidedisplay-field/' + rowData.HFieldDispHide_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.fieldHideDisplay, rowData.HFieldDispHide_SysID).then((res) => {

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
