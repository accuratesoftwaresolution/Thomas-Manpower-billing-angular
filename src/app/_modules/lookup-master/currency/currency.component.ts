import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldCurrFirstCo } from 'src/app/_dto/TbldCurrFirstCo.dto';
import { TblHCurrFirst } from 'src/app/_dto/TblHCurrFirst.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

TblHCurrFirst: TblHCurrFirst = new TblHCurrFirst()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showCurrencyList: boolean = false

  tableIndex: any;

  HCurrFirst_SysID: any;

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
    this.TblHCurrFirst.TbldCurrFirstCo = [new TbldCurrFirstCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HCurrFirst_SysID = Number(id);
        this.TblHCurrFirst.HCurrFirst_SysID = Number(id);
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
        const isExist = this.TblHCurrFirst.TbldCurrFirstCo.some(item => item.DcCurrFirst_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Currency Master' });
          return;
        }
        this.TblHCurrFirst.TbldCurrFirstCo[this.tableIndex].DcCurrFirst_SingleCo_SysID = event.SingleCo_SysID
        this.TblHCurrFirst.TbldCurrFirstCo[this.tableIndex].DcCurrFirst_SingleCo_Code = event.SingleCo_Code
        this.TblHCurrFirst.TbldCurrFirstCo[this.tableIndex].DcCurrFirst_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHCurrFirst.HCurrFirst_AcDe_SysID = event.HActDeactive_SysID
        this.TblHCurrFirst.HCurrFirst_AcDe_Code = event.HActDeactive_Code
        this.TblHCurrFirst.HCurrFirst_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHCurrFirst.HCurrFirst_SysID && rowData.DcCurrFirst_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.currencyMaster, `company?where[DcCurrFirst_SysID]=${this.TblHCurrFirst.TbldCurrFirstCo[0].DcCurrFirst_SysID}&where[DcCurrFirst_SingleCo_SysID]=${rowData.DcCurrFirst_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldCurrFirstCo') {
                this.TblHCurrFirst.TbldCurrFirstCo.splice(index, 1);
                if (this.TblHCurrFirst.TbldCurrFirstCo.length === 0) {
                  this.addRow('TbldCurrFirstCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldCurrFirstCo') {
            this.TblHCurrFirst.TbldCurrFirstCo.splice(index, 1);
            if (this.TblHCurrFirst.TbldCurrFirstCo.length === 0) {
              this.addRow('TbldCurrFirstCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldCurrFirstCo') {
      const newRow = new TbldCurrFirstCo()
      this.TblHCurrFirst.TbldCurrFirstCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHCurrFirst.HCurrFirst_Code == null || this.TblHCurrFirst.HCurrFirst_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Currency master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHCurrFirst.HCurrFirst_Name == null || this.TblHCurrFirst.HCurrFirst_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Currency master Name Cannot Be Null' });
      return false;
    }

     if (this.TblHCurrFirst.TbldCurrFirstCo[0].DcCurrFirst_SingleCo_Code == null || this.TblHCurrFirst.TbldCurrFirstCo[0].DcCurrFirst_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Currency master Single Company Code Cannot Be Null' });
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
    this.TblHCurrFirst.TbldCurrFirstCo = this.TblHCurrFirst.TbldCurrFirstCo.filter(
      row => row.DcCurrFirst_SingleCo_Code && row.DcCurrFirst_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.currencyMaster, this.TblHCurrFirst).then((res) => {
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
        this.TblHCurrFirst = new TblHCurrFirst();
        this.TblHCurrFirst.TbldCurrFirstCo = [new TbldCurrFirstCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/currency/']);

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
    if (this.TblHCurrFirst.HCurrFirst_SysID || this.HCurrFirst_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.currencyMaster, this.TblHCurrFirst.HCurrFirst_SysID).then((res) => {
        this.TblHCurrFirst = res
        this.showDeleteButton = true;

        if (this.TblHCurrFirst.TbldCurrFirstCo.length == 0) {
          this.TblHCurrFirst.TbldCurrFirstCo = [new TbldCurrFirstCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHCurrFirst = new TblHCurrFirst()
          this.TblHCurrFirst.TbldCurrFirstCo = [new TbldCurrFirstCo()]
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
        this.masterService.deleteData(apiUrl.currencyMaster, this.TblHCurrFirst.HCurrFirst_SysID).then((res) => {

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
    this.TblHCurrFirst = new TblHCurrFirst()
    this.TblHCurrFirst.TbldCurrFirstCo = [new TbldCurrFirstCo()]
    this.router.navigate(['l-master/currency/']);

  }
  cancel() {
    this.TblHCurrFirst = new TblHCurrFirst()
    this.TblHCurrFirst.TbldCurrFirstCo = [new TbldCurrFirstCo()]
    this.router.navigate(['l-master/currency']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayCurrencyList() {
    this.showCurrencyList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.currencyMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCurrFirst_Code || item.HCurrFirst_Name || item.HCurrFirst_SysID;
      const matchesQuery =
        (item.HCurrFirst_Code || '').toLowerCase().includes(query) ||
        (item.HCurrFirst_Name || '').toLowerCase().includes(query) ||
        item.HCurrFirst_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showCurrencyList = false
    this.router.navigate(['l-master/currency']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/currency/' + rowData.HCurrFirst_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.currencyMaster, rowData.HCurrFirst_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showCurrencyList = false

            this.getListData()
          }

        });
      }
    });
  }
onDateChange (type, value: string) {
  const dateObj = value ? new Date(value) : null;
  const digiLock = this.TblHCurrFirst;
   if (type === 'Curr1stRateDate') {
    digiLock.HCurrFirst_Date = dateObj;
  } 
}
  
}


