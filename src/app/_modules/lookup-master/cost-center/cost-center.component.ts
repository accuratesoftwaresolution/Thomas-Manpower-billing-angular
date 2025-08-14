import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldCostCentCo } from 'src/app/_dto/masters/cost-center/TbldCostCentCo.dto';
import { TblHCostCent } from 'src/app/_dto/masters/cost-center/TblHCostCent.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss']
})
export class CostCenterComponent implements OnInit {

  TblHCostCent: TblHCostCent = new TblHCostCent()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showCostList: boolean = false

  tableIndex: any;

  HCostCent_SysID: any;

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
    this.TblHCostCent.TbldCostCentCo = [new TbldCostCentCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HCostCent_SysID = Number(id);
        this.TblHCostCent.HCostCent_SysID = Number(id);
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
        const isExist = this.TblHCostCent.TbldCostCentCo.some(item => item.DcCostCent_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Cost Center Master' });
          return;
        }
        this.TblHCostCent.TbldCostCentCo[this.tableIndex].DcCostCent_SingleCo_SysID = event.SingleCo_SysID
        this.TblHCostCent.TbldCostCentCo[this.tableIndex].DcCostCent_SingleCo_Code = event.SingleCo_Code
        this.TblHCostCent.TbldCostCentCo[this.tableIndex].DcCostCent_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHCostCent.HCostCent_AcDe_SysID = event.HActDeactive_SysID
        this.TblHCostCent.HCostCent_AcDe_Code = event.HActDeactive_Code
        this.TblHCostCent.HCostCent_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHCostCent.HCostCent_SysID && rowData.DcCostCent_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.costCenter, `company?where[DcCostCent_SysID]=${this.TblHCostCent.TbldCostCentCo[0].DcCostCent_SysID}&where[DcCostCent_SingleCo_SysID]=${rowData.DcCostCent_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldCostCentCo') {
                this.TblHCostCent.TbldCostCentCo.splice(index, 1);
                if (this.TblHCostCent.TbldCostCentCo.length === 0) {
                  this.addRow('TbldCostCentCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldCostCentCo') {
            this.TblHCostCent.TbldCostCentCo.splice(index, 1);
            if (this.TblHCostCent.TbldCostCentCo.length === 0) {
              this.addRow('TbldCostCentCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldCostCentCo') {
      const newRow = new TbldCostCentCo()
      this.TblHCostCent.TbldCostCentCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHCostCent.HCostCent_Code == null || this.TblHCostCent.HCostCent_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cost Center Code Cannot Be Null' });
      return false;
    }

    if (this.TblHCostCent.HCostCent_Name == null || this.TblHCostCent.HCostCent_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cost Center Name Cannot Be Null' });
      return false;
    }

     if (this.TblHCostCent.TbldCostCentCo[0].DcCostCent_SingleCo_Code == null || this.TblHCostCent.TbldCostCentCo[0].DcCostCent_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Cost Center Single Company Code Cannot Be Null' });
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
    this.TblHCostCent.TbldCostCentCo = this.TblHCostCent.TbldCostCentCo.filter(
      row => row.DcCostCent_SingleCo_Code && row.DcCostCent_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.costCenter, this.TblHCostCent).then((res) => {
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
        this.TblHCostCent = new TblHCostCent();
        this.TblHCostCent.TbldCostCentCo = [new TbldCostCentCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/cost-center/']);

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
    if (this.TblHCostCent.HCostCent_SysID || this.HCostCent_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.costCenter, this.TblHCostCent.HCostCent_SysID).then((res) => {
        this.TblHCostCent = res
        this.showDeleteButton = true;

        if (this.TblHCostCent.TbldCostCentCo.length == 0) {
          this.TblHCostCent.TbldCostCentCo = [new TbldCostCentCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHCostCent = new TblHCostCent()
          this.TblHCostCent.TbldCostCentCo = [new TbldCostCentCo()]
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
        this.masterService.deleteData(apiUrl.costCenter, this.TblHCostCent.HCostCent_SysID).then((res) => {

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
    this.TblHCostCent = new TblHCostCent()
    this.TblHCostCent.TbldCostCentCo = [new TbldCostCentCo()]
    this.router.navigate(['l-master/cost-center/']);

  }
  cancel() {
    this.TblHCostCent = new TblHCostCent()
    this.TblHCostCent.TbldCostCentCo = [new TbldCostCentCo()]
    this.router.navigate(['l-master/cost-center']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayCostCentreList() {
    this.showCostList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.costCenter).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCostCent_Code || item.HCostCent_Name || item.HCostCent_SysID;
      const matchesQuery =
        (item.HCostCent_Code || '').toLowerCase().includes(query) ||
        (item.HCostCent_Name || '').toLowerCase().includes(query) ||
        item.HCostCent_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showCostList = false
    this.router.navigate(['l-master/cost-center']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/cost-center/' + rowData.HCostCent_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.costCenter, rowData.HCostCent_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showCostList = false

            this.getListData()
          }

        });
      }
    });
  }

}

