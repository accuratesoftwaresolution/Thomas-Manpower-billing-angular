import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldSmanCo } from 'src/app/_dto/masters/salesman/TbldSmanCo.dto';
import { TblHSman } from 'src/app/_dto/masters/salesman/TblHSman.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-salesman',
  templateUrl: './salesman.component.html',
  styleUrls: ['./salesman.component.scss']
})
export class SalesmanComponent implements OnInit {

  // TbldSmanCo: any[] = [new TbldSmanCo()];

  TblHSman: TblHSman = new TblHSman()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showsalesManList: boolean = false

  tableIndex: any;

  HSman_SysID: any;

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
    this.TblHSman.TbldSmanCo = [new TbldSmanCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HSman_SysID = Number(id);
        this.TblHSman.HSman_SysID = Number(id);
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
        const isExist = this.TblHSman.TbldSmanCo.some(item => item.DcSman_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Sales man Master' });
          return;
        }
        this.TblHSman.TbldSmanCo[this.tableIndex].DcSman_SingleCo_SysID = event.SingleCo_SysID
        this.TblHSman.TbldSmanCo[this.tableIndex].DcSman_SingleCo_Code = event.SingleCo_Code
        this.TblHSman.TbldSmanCo[this.tableIndex].DcSman_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHSman.HSman_AcDe_SysID = event.HActDeactive_SysID
        this.TblHSman.HSman_AcDe_Code = event.HActDeactive_Code
        this.TblHSman.HSman_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHSman.HSman_SysID && rowData.DcSman_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.salesMan, `company?where[DcSman_SysID]=${this.TblHSman.TbldSmanCo[0].DcSman_SysID}&where[DcSman_SingleCo_SysID]=${rowData.DcSman_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldSmanCo') {
                this.TblHSman.TbldSmanCo.splice(index, 1);
                if (this.TblHSman.TbldSmanCo.length === 0) {
                  this.addRow('TbldSmanCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldSmanCo') {
            this.TblHSman.TbldSmanCo.splice(index, 1);
            if (this.TblHSman.TbldSmanCo.length === 0) {
              this.addRow('TbldSmanCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldSmanCo') {
      const newRow = new TbldSmanCo()
      this.TblHSman.TbldSmanCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHSman.HSman_Code == null || this.TblHSman.HSman_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Salesman Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHSman.HSman_Name == null || this.TblHSman.HSman_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Salesman Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHSman.TbldSmanCo[0].DcSman_SingleCo_Code == null || this.TblHSman.TbldSmanCo[0].DcSman_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Salesman Single Company Code Cannot Be Null' });
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
    this.TblHSman.TbldSmanCo = this.TblHSman.TbldSmanCo.filter(
      row => row.DcSman_SingleCo_Code && row.DcSman_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.salesMan, this.TblHSman).then((res) => {
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
        this.TblHSman = new TblHSman();
        this.TblHSman.TbldSmanCo = [new TbldSmanCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/salesman/']);

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
    if (this.TblHSman.HSman_SysID || this.HSman_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.salesMan, this.TblHSman.HSman_SysID).then((res) => {
        this.TblHSman = res
        this.showDeleteButton = true;

        if (this.TblHSman.TbldSmanCo.length == 0) {
          this.TblHSman.TbldSmanCo = [new TbldSmanCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHSman = new TblHSman()
          this.TblHSman.TbldSmanCo = [new TbldSmanCo()]
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
        this.masterService.deleteData(apiUrl.salesMan, this.TblHSman.HSman_SysID).then((res) => {

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
    this.TblHSman = new TblHSman()
    this.TblHSman.TbldSmanCo = [new TbldSmanCo()]
    this.router.navigate(['l-master/salesman/']);

  }
  cancel() {
    this.TblHSman = new TblHSman()
    this.TblHSman.TbldSmanCo = [new TbldSmanCo()]
    this.router.navigate(['l-master/salesman']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displaysalesManList() {
    this.showsalesManList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.salesMan).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HSman_Code || item.HSman_Name || item.HSman_SysID;
      const matchesQuery =
        (item.HSman_Code || '').toLowerCase().includes(query) ||
        (item.HSman_Name || '').toLowerCase().includes(query) ||
        item.HSman_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showsalesManList = false
    this.router.navigate(['l-master/salesman']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/salesman/' + rowData.HSman_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.salesMan, rowData.HSman_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showsalesManList = false

            this.getListData()
          }

        });
      }
    });
  }
}


