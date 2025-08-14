import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPVisaStatCo } from 'src/app/_dto/visa-status-master/TbldPVisaStatCo.sto';
import { TblHPVisaStat } from 'src/app/_dto/visa-status-master/TblHPVisaStat.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-visa-status-master',
  templateUrl: './visa-status-master.component.html',
  styleUrls: ['./visa-status-master.component.scss']
})
export class VisaStatusMasterComponent implements OnInit {

    showListButton: boolean = true;

  TblHPVisaStat: TblHPVisaStat = new TblHPVisaStat()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPVisaStat_SysID: any;

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
    this.TblHPVisaStat.TbldPVisaStatCo = [new TbldPVisaStatCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPVisaStat_SysID = Number(id);
        this.TblHPVisaStat.HPVisaStat_SysID = Number(id);
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
        const isExist = this.TblHPVisaStat.TbldPVisaStatCo.some(item => item.DcpVisaStat_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Visa Status Master' });
          return;
        }
        this.TblHPVisaStat.TbldPVisaStatCo[this.tableIndex].DcpVisaStat_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPVisaStat.TbldPVisaStatCo[this.tableIndex].DcpVisaStat_SingleCo_Code = event.SingleCo_Code;
        this.TblHPVisaStat.TbldPVisaStatCo[this.tableIndex].DcpVisaStat_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPVisaStat.HPVisaStat_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPVisaStat.HPVisaStat_AcDe_Code = event.HActDeactive_Code
        this.TblHPVisaStat.HPVisaStat_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPVisaStat.HPVisaStat_SysID && rowData.DcpVisaStat_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.visaStatusMaster, `company?where[DcpVisaStat_GridSysID]=${this.TblHPVisaStat.TbldPVisaStatCo[0].DcpVisaStat_GridSysID}&where[DcpVisaStat_SingleCo_SysID]=${rowData.DcpVisaStat_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPVisaStatCo') {
                this.TblHPVisaStat.TbldPVisaStatCo.splice(index, 1);
                if (this.TblHPVisaStat.TbldPVisaStatCo.length === 0) {
                  this.addRow('TbldPVisaStatCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPVisaStatCo') {
            this.TblHPVisaStat.TbldPVisaStatCo.splice(index, 1);
            if (this.TblHPVisaStat.TbldPVisaStatCo.length === 0) {
              this.addRow('TbldPVisaStatCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPVisaStatCo') {
      const newRow = new TbldPVisaStatCo()
      this.TblHPVisaStat.TbldPVisaStatCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['Manpower/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPVisaStat.HPVisaStat_Code == null || this.TblHPVisaStat.HPVisaStat_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Status Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPVisaStat.HPVisaStat_Name == null || this.TblHPVisaStat.HPVisaStat_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Status Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPVisaStat.TbldPVisaStatCo[0].DcpVisaStat_SingleCo_Code == null || this.TblHPVisaStat.TbldPVisaStatCo[0].DcpVisaStat_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Status Master Single Company Code Cannot Be Null' });
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
    this.TblHPVisaStat.TbldPVisaStatCo = this.TblHPVisaStat.TbldPVisaStatCo.filter(
      row => row.DcpVisaStat_SingleCo_Code && row.DcpVisaStat_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.visaStatusMaster, this.TblHPVisaStat).then((res) => {
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
        this.TblHPVisaStat = new TblHPVisaStat();
        this.TblHPVisaStat.TbldPVisaStatCo = [new TbldPVisaStatCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/visa-status-master/']);

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
    if (this.TblHPVisaStat.HPVisaStat_SysID || this.HPVisaStat_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.visaStatusMaster, this.TblHPVisaStat.HPVisaStat_SysID).then((res) => {
        this.TblHPVisaStat = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPVisaStat.TbldPVisaStatCo.length == 0) {
          this.TblHPVisaStat.TbldPVisaStatCo = [new TbldPVisaStatCo()]
        this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPVisaStat = new TblHPVisaStat()
          this.TblHPVisaStat.TbldPVisaStatCo = [new TbldPVisaStatCo()]
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
        this.masterService.deleteData(apiUrl.visaStatusMaster, this.TblHPVisaStat.HPVisaStat_SysID).then((res) => {

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
    this.TblHPVisaStat = new TblHPVisaStat()
    this.TblHPVisaStat.TbldPVisaStatCo = [new TbldPVisaStatCo()]
    this.router.navigate(['Manpower/visa-status-master/']);

  }
  cancel() {
    this.TblHPVisaStat = new TblHPVisaStat()
    this.TblHPVisaStat.TbldPVisaStatCo = [new TbldPVisaStatCo()]
    this.router.navigate(['Manpower/visa-status-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.visaStatusMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPVisaStat_Code || item.HPVisaStat_Name || item.HPVisaStat_SysID;
      const matchesQuery =
        (item.HPVisaStat_Code || '').toLowerCase().includes(query) ||
        (item.HPVisaStat_Name || '').toLowerCase().includes(query) ||
        item.HPVisaStat_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/visa-status-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/visa-status-master/' + rowData.HPVisaStat_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.visaStatusMaster, rowData.HPVisaStat_SysID).then((res) => {

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

