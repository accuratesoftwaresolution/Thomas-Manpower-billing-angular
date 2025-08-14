import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPAgencyCo } from 'src/app/_dto/agency-master/TbldPAgencyCo.dto';
import { TblHpAgency } from 'src/app/_dto/agency-master/TblHpAgency.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-agency-master',
  templateUrl: './agency-master.component.html',
  styleUrls: ['./agency-master.component.scss']
})
export class AgencyMasterComponent implements OnInit {

  showListButton: boolean = false;

  TblHpAgency: TblHpAgency = new TblHpAgency()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showTermsConditionsList: boolean = false

  tableIndex: any;

  HPAgency_SysID: any;

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
    this.TblHpAgency.TbldPAgencyCo = [new TbldPAgencyCo()]
    this.showListButton =true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPAgency_SysID = Number(id);
        this.TblHpAgency.HPAgency_SysID = Number(id);
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
        const isExist = this.TblHpAgency.TbldPAgencyCo.some(item => item.DcpAgency_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Agency Master' });
          return;
        }
        this.TblHpAgency.TbldPAgencyCo[this.tableIndex].DcpAgency_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHpAgency.TbldPAgencyCo[this.tableIndex].DcpAgency_SingleCo_Code = event.SingleCo_Code;
        this.TblHpAgency.TbldPAgencyCo[this.tableIndex].DcpAgency_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHpAgency.HPAgency_AcDe_SysID = event.HActDeactive_SysID
        this.TblHpAgency.HPAgency_AcDe_Code = event.HActDeactive_Code
        this.TblHpAgency.HPAgency_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHpAgency.HPAgency_SysID && rowData.DcpAgency_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.agencyMaster, `company?where[DcpAgency_GridSysID]=${this.TblHpAgency.TbldPAgencyCo[0].DcpAgency_GridSysID}&where[DcpAgency_SingleCo_SysID]=${rowData.DcpAgency_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.showListButton = true;

              if (table === 'TbldPAgencyCo') {
                this.TblHpAgency.TbldPAgencyCo.splice(index, 1);
                if (this.TblHpAgency.TbldPAgencyCo.length === 0) {
                  this.addRow('TbldPAgencyCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPAgencyCo') {
            this.TblHpAgency.TbldPAgencyCo.splice(index, 1);
            if (this.TblHpAgency.TbldPAgencyCo.length === 0) {
              this.addRow('TbldPAgencyCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPAgencyCo') {
      const newRow = new TbldPAgencyCo()
      this.TblHpAgency.TbldPAgencyCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHpAgency.HPAgency_Code == null || this.TblHpAgency.HPAgency_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Agency master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHpAgency.HPAgency_Name == null || this.TblHpAgency.HPAgency_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Agency master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHpAgency.TbldPAgencyCo[0].DcpAgency_SingleCo_Code == null || this.TblHpAgency.TbldPAgencyCo[0].DcpAgency_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Agency master Single Company Code Cannot Be Null' });
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
    this.TblHpAgency.TbldPAgencyCo = this.TblHpAgency.TbldPAgencyCo.filter(
      row => row.DcpAgency_SingleCo_Code && row.DcpAgency_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.agencyMaster, this.TblHpAgency).then((res) => {
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
        this.TblHpAgency = new TblHpAgency();
        this.TblHpAgency.TbldPAgencyCo = [new TbldPAgencyCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/agency-master/']);

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
    if (this.TblHpAgency.HPAgency_SysID || this.HPAgency_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.agencyMaster, this.TblHpAgency.HPAgency_SysID).then((res) => {
        this.TblHpAgency = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHpAgency.TbldPAgencyCo.length == 0) {
          this.TblHpAgency.TbldPAgencyCo = [new TbldPAgencyCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHpAgency = new TblHpAgency()
          this.TblHpAgency.TbldPAgencyCo = [new TbldPAgencyCo()]
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
        this.masterService.deleteData(apiUrl.agencyMaster, this.TblHpAgency.HPAgency_SysID).then((res) => {

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
    this.TblHpAgency = new TblHpAgency()
    this.TblHpAgency.TbldPAgencyCo = [new TbldPAgencyCo()]
    this.router.navigate(['Manpower/agency-master/']);

  }
  cancel() {
    this.TblHpAgency = new TblHpAgency()
    this.TblHpAgency.TbldPAgencyCo = [new TbldPAgencyCo()]
    this.router.navigate(['Manpower/agency-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayAgencyList() {
    this.showTermsConditionsList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.agencyMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPAgency_Code || item.HPAgency_Name || item.HPAgency_SysID;
      const matchesQuery =
        (item.HPAgency_Code || '').toLowerCase().includes(query) ||
        (item.HPAgency_Name || '').toLowerCase().includes(query) ||
        item.HPAgency_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showTermsConditionsList = false
    this.showListButton = true;

    this.router.navigate(['Manpower/agency-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/agency-master/' + rowData.HPAgency_SysID]);
    this.showListButton = false;

  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;

        this.masterService.deleteData(apiUrl.agencyMaster, rowData.HPAgency_SysID).then((res) => {

          if (res.success == false) {
        this.showListButton = true;

            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showTermsConditionsList = true
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

