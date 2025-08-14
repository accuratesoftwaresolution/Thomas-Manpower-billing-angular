import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPVisaReq } from 'src/app/_dto/visa-request-status/TbldPVisaReq.dto';
import { TblHPVisaReq } from 'src/app/_dto/visa-request-status/TblHPVisaReq.sto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-visa-request-master',
  templateUrl: './visa-request-master.component.html',
  styleUrls: ['./visa-request-master.component.scss']
})
export class VisaRequestMasterComponent implements OnInit {

 showListButton: boolean = true;

  TblHPVisaReq: TblHPVisaReq = new TblHPVisaReq()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPVisaReq_SysID: any;

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
    this.TblHPVisaReq.TbldPVisaReq = [new TbldPVisaReq()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPVisaReq_SysID = Number(id);
        this.TblHPVisaReq.HPVisaReq_SysID = Number(id);
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
        const isExist = this.TblHPVisaReq.TbldPVisaReq.some(item => item.DcpVisaReq_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Visa Request Status Master' });
          return;
        }
        this.TblHPVisaReq.TbldPVisaReq[this.tableIndex].DcpVisaReq_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPVisaReq.TbldPVisaReq[this.tableIndex].DcpVisaReq_SingleCo_Code = event.SingleCo_Code;
        this.TblHPVisaReq.TbldPVisaReq[this.tableIndex].DcpVisaReq_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPVisaReq.HPVisaReq_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPVisaReq.HPVisaReq_AcDe_Code = event.HActDeactive_Code
        this.TblHPVisaReq.HPVisaReq_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPVisaReq.HPVisaReq_SysID && rowData.DcpVisaReq_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.visaRequestStatus, `company?where[DcpVisaReq_GridSysID]=${this.TblHPVisaReq.TbldPVisaReq[0].DcpVisaReq_GridSysID}&where[DcpVisaReq_SingleCo_SysID]=${rowData.DcpVisaReq_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPVisaReq') {
                this.TblHPVisaReq.TbldPVisaReq.splice(index, 1);
                if (this.TblHPVisaReq.TbldPVisaReq.length === 0) {
                  this.addRow('TbldPVisaReq', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPVisaReq') {
            this.TblHPVisaReq.TbldPVisaReq.splice(index, 1);
            if (this.TblHPVisaReq.TbldPVisaReq.length === 0) {
              this.addRow('TbldPVisaReq', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPVisaReq') {
      const newRow = new TbldPVisaReq()
      this.TblHPVisaReq.TbldPVisaReq.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPVisaReq.HPVisaReq_Code == null || this.TblHPVisaReq.HPVisaReq_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Request Status Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPVisaReq.HPVisaReq_Name == null || this.TblHPVisaReq.HPVisaReq_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Request Status Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPVisaReq.TbldPVisaReq[0].DcpVisaReq_SingleCo_Code == null || this.TblHPVisaReq.TbldPVisaReq[0].DcpVisaReq_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Request Status Master Single Company Code Cannot Be Null' });
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
    this.TblHPVisaReq.TbldPVisaReq = this.TblHPVisaReq.TbldPVisaReq.filter(
      row => row.DcpVisaReq_SingleCo_Code && row.DcpVisaReq_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.visaRequestStatus, this.TblHPVisaReq).then((res) => {
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
        this.TblHPVisaReq = new TblHPVisaReq();
        this.TblHPVisaReq.TbldPVisaReq = [new TbldPVisaReq()];

        // Navigate to list screen
        this.router.navigate(['Manpower/visa-request-status/']);

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
    if (this.TblHPVisaReq.HPVisaReq_SysID || this.HPVisaReq_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.visaRequestStatus, this.TblHPVisaReq.HPVisaReq_SysID).then((res) => {
        this.TblHPVisaReq = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPVisaReq.TbldPVisaReq.length == 0) {
          this.TblHPVisaReq.TbldPVisaReq = [new TbldPVisaReq()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPVisaReq = new TblHPVisaReq()
          this.TblHPVisaReq.TbldPVisaReq = [new TbldPVisaReq()]
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
        this.masterService.deleteData(apiUrl.visaRequestStatus, this.TblHPVisaReq.HPVisaReq_SysID).then((res) => {

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
    this.TblHPVisaReq = new TblHPVisaReq()
    this.TblHPVisaReq.TbldPVisaReq = [new TbldPVisaReq()]
    this.router.navigate(['Manpower/visa-request-status/']);

  }
  cancel() {
    this.TblHPVisaReq = new TblHPVisaReq()
    this.TblHPVisaReq.TbldPVisaReq = [new TbldPVisaReq()]
    this.router.navigate(['Manpower/visa-request-status']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.visaRequestStatus).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPVisaReq_Code || item.HPVisaReq_Name || item.HPVisaReq_SysID;
      const matchesQuery =
        (item.HPVisaReq_Code || '').toLowerCase().includes(query) ||
        (item.HPVisaReq_Name || '').toLowerCase().includes(query) ||
        item.HPVisaReq_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/visa-request-status']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/visa-request-status/' + rowData.HPVisaReq_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.visaRequestStatus, rowData.HPVisaReq_SysID).then((res) => {

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
