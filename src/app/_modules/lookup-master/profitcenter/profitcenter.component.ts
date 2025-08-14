import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldProfCentCo } from 'src/app/_dto/masters/profit-center/TbldProfCentCo.dto';
import { TblHProfCent } from 'src/app/_dto/masters/profit-center/TblHProfCent.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-profitcenter',
  templateUrl: './profitcenter.component.html',
  styleUrls: ['./profitcenter.component.scss']
})
export class ProfitcenterComponent implements OnInit {

  // TbldProfCentCo: any[] = [new TbldProfCentCo()];

  TblHProfCent: TblHProfCent = new TblHProfCent()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showProfitCenterList: boolean = false

  tableIndex: any;

  HProfCent_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  activateAndDeactivate: any;
  singleCoMaster: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHProfCent.TbldProfCentCo = [new TbldProfCentCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HProfCent_SysID = Number(id);
        this.TblHProfCent.HProfCent_SysID = Number(id);
        this.getdata()
      }
    });

    this.getLovData()
  }

    getLovData() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

     case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCoMaster;
        break;
      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {

      case 'ApplicableCompanyCode':

        const selectedCode = event.SingleCo_Code
        const isExist = this.TblHProfCent.TbldProfCentCo.some(item => item.DcProfCent_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Profit Center Master' });
          return;
        }
        this.TblHProfCent.TbldProfCentCo[this.tableIndex].DcProfCent_SingleCo_SysID = event.SingleCo_SysID
        this.TblHProfCent.TbldProfCentCo[this.tableIndex].DcProfCent_SingleCo_Code = event.SingleCo_Code
        this.TblHProfCent.TbldProfCentCo[this.tableIndex].DcProfCent_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHProfCent.HProfCent_AcDe_SysID = event.HActDeactive_SysID
        this.TblHProfCent.HProfCent_AcDe_Code = event.HActDeactive_Code
        this.TblHProfCent.HProfCent_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHProfCent.HProfCent_SysID && rowData.DcProfCent_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.profitCenter, `company?where[DcProfCent_SysID]=${this.TblHProfCent.TbldProfCentCo[0].DcProfCent_SysID}&where[DcProfCent_SingleCo_SysID]=${rowData.DcProfCent_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldProfCentCo') {
                this.TblHProfCent.TbldProfCentCo.splice(index, 1);
                if (this.TblHProfCent.TbldProfCentCo.length === 0) {
                  this.addRow('TbldProfCentCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldProfCentCo') {
            this.TblHProfCent.TbldProfCentCo.splice(index, 1);
            if (this.TblHProfCent.TbldProfCentCo.length === 0) {
              this.addRow('TbldProfCentCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldProfCentCo') {
      const newRow = new TbldProfCentCo()
      this.TblHProfCent.TbldProfCentCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHProfCent.HProfCent_Code == null || this.TblHProfCent.HProfCent_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Profit Center Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHProfCent.HProfCent_Name == null || this.TblHProfCent.HProfCent_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Profit Center Master Name Cannot Be Null' });
      return false;
    }

     if (this.TblHProfCent.TbldProfCentCo[0].DcProfCent_SingleCo_Code == null || this.TblHProfCent.TbldProfCentCo[0].DcProfCent_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Profit Center Single Company Code Cannot Be Null' });
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
    this.TblHProfCent.TbldProfCentCo = this.TblHProfCent.TbldProfCentCo.filter(
      row => row.DcProfCent_SingleCo_Code && row.DcProfCent_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.profitCenter, this.TblHProfCent).then((res) => {
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

        // Reset form
        this.TblHProfCent = new TblHProfCent();
        this.TblHProfCent.TbldProfCentCo = [new TbldProfCentCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/profit-center/']);

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
    if (this.TblHProfCent.HProfCent_SysID || this.HProfCent_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.profitCenter, this.TblHProfCent.HProfCent_SysID).then((res) => {
        this.TblHProfCent = res
        this.showDeleteButton = true;

        if (this.TblHProfCent.TbldProfCentCo.length == 0) {
          this.TblHProfCent.TbldProfCentCo = [new TbldProfCentCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHProfCent = new TblHProfCent()
          this.TblHProfCent.TbldProfCentCo = [new TbldProfCentCo()]
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
        this.masterService.deleteData(apiUrl.profitCenter, this.TblHProfCent.HProfCent_SysID).then((res) => {

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
    this.TblHProfCent = new TblHProfCent()
    this.TblHProfCent.TbldProfCentCo = [new TbldProfCentCo()]
    this.router.navigate(['l-master/profit-center/']);

  }
  cancel() {
    this.TblHProfCent = new TblHProfCent()
    this.TblHProfCent.TbldProfCentCo = [new TbldProfCentCo()]
    this.router.navigate(['l-master/profit-center']);


  }

  // ---------------------------------------------------------------------List--------------------------
  displayProfitCenterList() {
    this.showProfitCenterList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.profitCenter).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HProfCent_Code || item.HProfCent_Name || item.HProfCent_SysID;
      const matchesQuery =
        (item.HProfCent_Code || '').toLowerCase().includes(query) ||
        (item.HProfCent_Name || '').toLowerCase().includes(query) ||
        item.HProfCent_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showProfitCenterList = false
    this.router.navigate(['l-master/profit-center']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/profit-center/' + rowData.HProfCent_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.profitCenter, rowData.HProfCent_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showProfitCenterList = false

            this.getListData()
          }

        });
      }
    });
  }



}


