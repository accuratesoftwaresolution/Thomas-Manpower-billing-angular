import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPGateNoCo } from 'src/app/_dto/gate-number-master/TbldPGateNoCo.dto';
import { TblHPGateNo } from 'src/app/_dto/gate-number-master/TblHPGateNo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-gate-number-master',
  templateUrl: './gate-number-master.component.html',
  styleUrls: ['./gate-number-master.component.scss']
})
export class GateNumberMasterComponent implements OnInit {
showListButton: boolean = true;

  TblHPGateNo: TblHPGateNo = new TblHPGateNo()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPGateNo_SysID: any;

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
    this.TblHPGateNo.TbldPGateNoCo = [new TbldPGateNoCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPGateNo_SysID = Number(id);
        this.TblHPGateNo.HPGateNo_SysID = Number(id);
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
        const isExist = this.TblHPGateNo.TbldPGateNoCo.some(item => item.DcpGateNo_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Gate Number Master' });
          return;
        }
        this.TblHPGateNo.TbldPGateNoCo[this.tableIndex].DcpGateNo_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPGateNo.TbldPGateNoCo[this.tableIndex].DcpGateNo_SingleCo_Code = event.SingleCo_Code;
        this.TblHPGateNo.TbldPGateNoCo[this.tableIndex].DcpGateNo_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPGateNo.HPGateNo_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPGateNo.HPGateNo_AcDe_Code = event.HActDeactive_Code
        this.TblHPGateNo.HPGateNo_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPGateNo.HPGateNo_SysID && rowData.DcpGateNo_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.gateNumberMaster, `company?where[DcpGateNo_GridSysID]=${this.TblHPGateNo.TbldPGateNoCo[0].DcpGateNo_GridSysID}&where[DcpGateNo_SingleCo_SysID]=${rowData.DcpGateNo_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPGateNoCo') {
                this.TblHPGateNo.TbldPGateNoCo.splice(index, 1);
                if (this.TblHPGateNo.TbldPGateNoCo.length === 0) {
                  this.addRow('TbldPGateNoCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPGateNoCo') {
            this.TblHPGateNo.TbldPGateNoCo.splice(index, 1);
            if (this.TblHPGateNo.TbldPGateNoCo.length === 0) {
              this.addRow('TbldPGateNoCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPGateNoCo') {
      const newRow = new TbldPGateNoCo()
      this.TblHPGateNo.TbldPGateNoCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPGateNo.HPGateNo_Code == null || this.TblHPGateNo.HPGateNo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Gate Number Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPGateNo.HPGateNo_Name == null || this.TblHPGateNo.HPGateNo_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Gate Number Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPGateNo.TbldPGateNoCo[0].DcpGateNo_SingleCo_Code == null || this.TblHPGateNo.TbldPGateNoCo[0].DcpGateNo_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Gate Number Master Single Company Code Cannot Be Null' });
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
    this.TblHPGateNo.TbldPGateNoCo = this.TblHPGateNo.TbldPGateNoCo.filter(
      row => row.DcpGateNo_SingleCo_Code && row.DcpGateNo_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.gateNumberMaster, this.TblHPGateNo).then((res) => {
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
        this.TblHPGateNo = new TblHPGateNo();
        this.TblHPGateNo.TbldPGateNoCo = [new TbldPGateNoCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/gate-number-master/']);

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
    if (this.TblHPGateNo.HPGateNo_SysID || this.HPGateNo_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.gateNumberMaster, this.TblHPGateNo.HPGateNo_SysID).then((res) => {
        this.TblHPGateNo = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPGateNo.TbldPGateNoCo.length == 0) {
          this.TblHPGateNo.TbldPGateNoCo = [new TbldPGateNoCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPGateNo = new TblHPGateNo()
          this.TblHPGateNo.TbldPGateNoCo = [new TbldPGateNoCo()]
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
        this.masterService.deleteData(apiUrl.gateNumberMaster, this.TblHPGateNo.HPGateNo_SysID).then((res) => {

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
    this.TblHPGateNo = new TblHPGateNo()
    this.TblHPGateNo.TbldPGateNoCo = [new TbldPGateNoCo()]
    this.router.navigate(['Manpower/gate-number-master/']);

  }
  cancel() {
    this.TblHPGateNo = new TblHPGateNo()
    this.TblHPGateNo.TbldPGateNoCo = [new TbldPGateNoCo()]
    this.router.navigate(['Manpower/gate-number-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.gateNumberMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPGateNo_Code || item.HPGateNo_Name || item.HPGateNo_SysID;
      const matchesQuery =
        (item.HPGateNo_Code || '').toLowerCase().includes(query) ||
        (item.HPGateNo_Name || '').toLowerCase().includes(query) ||
        item.HPGateNo_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/gate-number-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/gate-number-master/' + rowData.HPGateNo_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.gateNumberMaster, rowData.HPGateNo_SysID).then((res) => {

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
