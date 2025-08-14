import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPVQuotaCo } from 'src/app/_dto/visa-quota-designation-master/TbldPVQuotaCo.dto';
import { TblHpVQuota } from 'src/app/_dto/visa-quota-designation-master/TblHpVQuota.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-visa-quota-designation-master',
  templateUrl: './visa-quota-designation-master.component.html',
  styleUrls: ['./visa-quota-designation-master.component.scss']
})
export class VisaQuotaDesignationMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHpVQuota: TblHpVQuota = new TblHpVQuota()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showTermsConditionsList: boolean = false

  tableIndex: any;

  HPVQuota_SysID: any;

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
    this.TblHpVQuota.TbldPVQuotaCo = [new TbldPVQuotaCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPVQuota_SysID = Number(id);
        this.TblHpVQuota.HPVQuota_SysID = Number(id);
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
        const isExist = this.TblHpVQuota.TbldPVQuotaCo.some(item => item.DcpVQuota_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Visa Quota Designation Master' });
          return;
        }
        this.TblHpVQuota.TbldPVQuotaCo[this.tableIndex].DcpVQuota_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHpVQuota.TbldPVQuotaCo[this.tableIndex].DcpVQuota_SingleCo_Code = event.SingleCo_Code;
        this.TblHpVQuota.TbldPVQuotaCo[this.tableIndex].DcpVQuota_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHpVQuota.HPVQuota_AcDe_SysID = event.HActDeactive_SysID
        this.TblHpVQuota.HPVQuota_AcDe_Code = event.HActDeactive_Code
        this.TblHpVQuota.HPVQuota_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHpVQuota.HPVQuota_SysID && rowData.DcpVQuota_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.visaQuotaDesignationMaster, `company?where[DcpVQuota_GridSysID]=${this.TblHpVQuota.TbldPVQuotaCo[0].DcpVQuota_GridSysID}&where[DcpVQuota_SingleCo_SysID]=${rowData.DcpVQuota_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPVQuotaCo') {
                this.TblHpVQuota.TbldPVQuotaCo.splice(index, 1);
                if (this.TblHpVQuota.TbldPVQuotaCo.length === 0) {
                  this.addRow('TbldPVQuotaCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPVQuotaCo') {
            this.TblHpVQuota.TbldPVQuotaCo.splice(index, 1);
            if (this.TblHpVQuota.TbldPVQuotaCo.length === 0) {
              this.addRow('TbldPVQuotaCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPVQuotaCo') {
      const newRow = new TbldPVQuotaCo()
      this.TblHpVQuota.TbldPVQuotaCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHpVQuota.HPVQuota_Code == null || this.TblHpVQuota.HPVQuota_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Quota Designation Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHpVQuota.HPVQuota_Name == null || this.TblHpVQuota.HPVQuota_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Quota Designation Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHpVQuota.TbldPVQuotaCo[0].DcpVQuota_SingleCo_Code == null || this.TblHpVQuota.TbldPVQuotaCo[0].DcpVQuota_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Quota Designation Master Single Company Code Cannot Be Null' });
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
    this.TblHpVQuota.TbldPVQuotaCo = this.TblHpVQuota.TbldPVQuotaCo.filter(
      row => row.DcpVQuota_SingleCo_Code && row.DcpVQuota_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.visaQuotaDesignationMaster, this.TblHpVQuota).then((res) => {
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
        this.TblHpVQuota = new TblHpVQuota();
        this.TblHpVQuota.TbldPVQuotaCo = [new TbldPVQuotaCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/visa-quota-designation-master/']);

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
    if (this.TblHpVQuota.HPVQuota_SysID || this.HPVQuota_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.visaQuotaDesignationMaster, this.TblHpVQuota.HPVQuota_SysID).then((res) => {
        this.TblHpVQuota = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHpVQuota.TbldPVQuotaCo.length == 0) {
          this.TblHpVQuota.TbldPVQuotaCo = [new TbldPVQuotaCo()]
        this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHpVQuota = new TblHpVQuota()
          this.TblHpVQuota.TbldPVQuotaCo = [new TbldPVQuotaCo()]
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
        this.masterService.deleteData(apiUrl.visaQuotaDesignationMaster, this.TblHpVQuota.HPVQuota_SysID).then((res) => {

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
    this.TblHpVQuota = new TblHpVQuota()
    this.TblHpVQuota.TbldPVQuotaCo = [new TbldPVQuotaCo()]
    this.router.navigate(['Manpower/visa-quota-designation-master/']);

  }
  cancel() {
    this.TblHpVQuota = new TblHpVQuota()
    this.TblHpVQuota.TbldPVQuotaCo = [new TbldPVQuotaCo()]
    this.router.navigate(['Manpower/visa-quota-designation-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayAgencyList() {
    this.showTermsConditionsList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.visaQuotaDesignationMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPVQuota_Code || item.HPVQuota_Name || item.HPVQuota_SysID;
      const matchesQuery =
        (item.HPVQuota_Code || '').toLowerCase().includes(query) ||
        (item.HPVQuota_Name || '').toLowerCase().includes(query) ||
        item.HPVQuota_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showTermsConditionsList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/visa-quota-designation-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/visa-quota-designation-master/' + rowData.HPVQuota_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.visaQuotaDesignationMaster, rowData.HPVQuota_SysID).then((res) => {

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
