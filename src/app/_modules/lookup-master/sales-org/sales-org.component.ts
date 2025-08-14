import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldSalesOrgCo } from 'src/app/_dto/masters/sales-org/TbldSalesOrgCo.dto';
import { TblHSalesOrg } from 'src/app/_dto/masters/sales-org/TblHSalesOrg.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-sales-org',
  templateUrl: './sales-org.component.html',
  styleUrls: ['./sales-org.component.scss']
})
export class SalesOrgComponent implements OnInit {
  // TbldSalesOrgCo: any[] = [new TbldSalesOrgCo()];

  TblHSalesOrg: TblHSalesOrg = new TblHSalesOrg()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showsalesOrganizationList: boolean = false

  tableIndex: any;

  HSalesOrg_SysID: any;

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
    this.TblHSalesOrg.TbldSalesOrgCo = [new TbldSalesOrgCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HSalesOrg_SysID = Number(id);
        this.TblHSalesOrg.HSalesOrg_SysID = Number(id);
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
        const isExist = this.TblHSalesOrg.TbldSalesOrgCo.some(item => item.DcSalesOrg_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Sales Organization Master' });
          return;
        }
        this.TblHSalesOrg.TbldSalesOrgCo[this.tableIndex].DcSalesOrg_SingleCo_SysID = event.SingleCo_SysID
        this.TblHSalesOrg.TbldSalesOrgCo[this.tableIndex].DcSalesOrg_SingleCo_Code = event.SingleCo_Code
        this.TblHSalesOrg.TbldSalesOrgCo[this.tableIndex].DcSalesOrg_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHSalesOrg.HSalesOrg_AcDe_SysID = event.HActDeactive_SysID
        this.TblHSalesOrg.HSalesOrg_AcDe_Code = event.HActDeactive_Code
        this.TblHSalesOrg.HSalesOrg_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHSalesOrg.HSalesOrg_SysID && rowData.DcSalesOrg_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.salesOrganization, `company?where[DcSalesOrg_SysID]=${this.TblHSalesOrg.TbldSalesOrgCo[0].DcSalesOrg_SysID}&where[DcSalesOrg_SingleCo_SysID]=${rowData.DcSalesOrg_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldSalesOrgCo') {
                this.TblHSalesOrg.TbldSalesOrgCo.splice(index, 1);
                if (this.TblHSalesOrg.TbldSalesOrgCo.length === 0) {
                  this.addRow('TbldSalesOrgCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldSalesOrgCo') {
            this.TblHSalesOrg.TbldSalesOrgCo.splice(index, 1);
            if (this.TblHSalesOrg.TbldSalesOrgCo.length === 0) {
              this.addRow('TbldSalesOrgCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldSalesOrgCo') {
      const newRow = new TbldSalesOrgCo()
      this.TblHSalesOrg.TbldSalesOrgCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHSalesOrg.HSalesOrg_Code == null || this.TblHSalesOrg.HSalesOrg_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Organization  Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHSalesOrg.HSalesOrg_Name == null || this.TblHSalesOrg.HSalesOrg_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Organization Master Name Cannot Be Null' });
      return false;
    }

     if (this.TblHSalesOrg.TbldSalesOrgCo[0].DcSalesOrg_SingleCo_Code == null || this.TblHSalesOrg.TbldSalesOrgCo[0].DcSalesOrg_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Organization Single Company Code Cannot Be Null' });
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
    this.TblHSalesOrg.TbldSalesOrgCo = this.TblHSalesOrg.TbldSalesOrgCo.filter(
      row => row.DcSalesOrg_SingleCo_Code && row.DcSalesOrg_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.salesOrganization, this.TblHSalesOrg).then((res) => {
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
        this.TblHSalesOrg = new TblHSalesOrg();
        this.TblHSalesOrg.TbldSalesOrgCo = [new TbldSalesOrgCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/sales-organization/']);

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
    if (this.TblHSalesOrg.HSalesOrg_SysID || this.HSalesOrg_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.salesOrganization, this.TblHSalesOrg.HSalesOrg_SysID).then((res) => {
        this.TblHSalesOrg = res
        this.showDeleteButton = true;

        if (this.TblHSalesOrg.TbldSalesOrgCo.length == 0) {
          this.TblHSalesOrg.TbldSalesOrgCo = [new TbldSalesOrgCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHSalesOrg = new TblHSalesOrg()
          this.TblHSalesOrg.TbldSalesOrgCo = [new TbldSalesOrgCo()]
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
        this.masterService.deleteData(apiUrl.salesOrganization, this.TblHSalesOrg.HSalesOrg_SysID).then((res) => {

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
    this.TblHSalesOrg = new TblHSalesOrg()
    this.TblHSalesOrg.TbldSalesOrgCo = [new TbldSalesOrgCo()]
    this.router.navigate(['l-master/sales-organization/']);

  }
  cancel() {
    this.TblHSalesOrg = new TblHSalesOrg()
    this.TblHSalesOrg.TbldSalesOrgCo = [new TbldSalesOrgCo()]
    this.router.navigate(['l-master/sales-organization']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displaysalesOrganizationList() {
    this.showsalesOrganizationList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.salesOrganization).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HSalesOrg_Code || item.HSalesOrg_Name || item.HSalesOrg_SysID;
      const matchesQuery =
        (item.HSalesOrg_Code || '').toLowerCase().includes(query) ||
        (item.HSalesOrg_Name || '').toLowerCase().includes(query) ||
        item.HSalesOrg_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showsalesOrganizationList = false
    this.router.navigate(['l-master/sales-organization']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/sales-organization/' + rowData.HSalesOrg_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.salesOrganization, rowData.HSalesOrg_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showsalesOrganizationList = false

            this.getListData()
          }

        });
      }
    });
  }
}