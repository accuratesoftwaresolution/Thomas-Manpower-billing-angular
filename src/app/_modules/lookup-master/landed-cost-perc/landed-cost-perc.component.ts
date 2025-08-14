import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblDLandCost } from 'src/app/_dto/masters/landed-cost-perc/TblDLandCost.dto';
import { TbldLandCostCo } from 'src/app/_dto/masters/landed-cost-perc/TbldLandCostCo.dto';
import { TblHLandCost } from 'src/app/_dto/masters/landed-cost-perc/TblHLandCost.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-landed-cost-perc',
  templateUrl: './landed-cost-perc.component.html',
  styleUrls: ['./landed-cost-perc.component.scss']
})
export class LandedCostPercComponent implements OnInit {


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showlandedcostList: boolean = false


  TblHLandCost: TblHLandCost = new TblHLandCost();
  tableIndex: any;
  currencyData: any;
  activateAndDeactivate: any;
  singleCoMaster: any;
  accountMaster: any;
  narration: any;


  constructor(
    private router: Router,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    private _masterService: MasterService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.TblHLandCost.TblDLandCost.push(new TblDLandCost())
    this.TblHLandCost.applicableCo.push(new TbldLandCostCo())

    this.getLovData()
  }

  getLovData() {
    this._masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this._masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
    this._masterService.getMasterData(apiUrl.currencyMaster).then((res) => {
      this.currencyData = res
    })

    this._masterService.getMasterData(apiUrl.accountMaster).then((res) => {
      this.accountMaster = res
    })

    this._masterService.getMasterData(apiUrl.narration).then((res) => {
      this.narration = res
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
      case 'CurrencyCode':
        this.popUpService.popUpData = this.currencyData
        break;
      case 'NarrationCode':
        this.popUpService.popUpData = this.narration
        break;
      case 'AccountFirstCode':
        this.popUpService.popUpData = this.accountMaster
        break;
      case 'CustomerCode':
        this.popUpService.popUpData = this.accountMaster
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
        this.TblHLandCost.applicableCo[this.tableIndex].DcLmCost_SingleCo_SysID = event.SingleCo_SysID
        this.TblHLandCost.applicableCo[this.tableIndex].DcLmCost_SingleCo_Code = event.SingleCo_Code
        this.TblHLandCost.applicableCo[this.tableIndex].DcLmCost_SingleCo_Name = event.SingleCo_Name
        break;

      case 'ActAndDeactCode':
        this.TblHLandCost.HLmCost_AcDe_SysID = event.HActDeactive_SysID
        this.TblHLandCost.HLmCost_AcDe_Code = event.HActDeactive_Code
        this.TblHLandCost.HLmCost_AcDe_Name = event.HActDeactive_Name
        break;

      case 'AccountFirstCode':
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_DrASysID = event.HAccOne_SysID
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_DrACode = event.HAccOne_Code
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_DrAName = event.HAccOne_Name
        break;
      case 'CurrencyCode':
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCurr_SysID = event.HCurrFirst_SysID
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCurr_Code = event.HCurrFirst_Code
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCurr_Name = event.HCurrFirst_Name
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCurr_Rate = event.HCurrFirst_Rate
        break;
      case 'CustomerCode':
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_CrASysID = event.HAccOne_SysID
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_CrACode = event.HAccOne_Code
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_CrAName = event.HAccOne_Name
        break;
      case 'NarrationCode':
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_NarraSysID = event.code
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_NarraCode = event.code
        this.TblHLandCost.TblDLandCost[this.tableIndex].DLmCost_AccNarraName = event.name
        break;


      default:
        break;
    }







  }

  deleteRow(table: any, index: number) {

    if (table == 'applicableCo') {
      // this.applicableCo.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'applicableCo') {
            this.TblHLandCost.applicableCo.splice(index, 1);
            if (this.TblHLandCost.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      });
    }
    if (table == 'TblDLandCost') {
      // this.TblDLandCost.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TblDLandCost') {
            this.TblHLandCost.TblDLandCost.splice(index, 1);
            if (this.TblHLandCost.TblDLandCost.length === 0) {
              this.addRow('TblDLandCost', -1);
            }
          }
        }
      });
    }
  }

  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldLandCostCo()
      this.TblHLandCost.applicableCo.splice(index + 1, 0, newRow);

    }
    if (table == 'TblDLandCost') {
      const newRow = new TblDLandCost()
      this.TblHLandCost.TblDLandCost.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate([screen]);
  }
  ConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Only delete if user confirms
      }
    });
  }








  async savelandedcostexpense() {

    // if (!(await this.preSave())) {
    //   return;
    // }
    console.log("🚚")
    console.log(this.TblHLandCost)
    // else {

    this._masterService.saveMasterData(apiUrl.LandedCostExpense, this.TblHLandCost).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHLandCost = new TblHLandCost()
      this.TblHLandCost.applicableCo = [new TbldLandCostCo()]
      this.router.navigate(['/l-master/billed-to'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }



  LandedCostExpenseList() {
    this.showlandedcostList = true
    this.getListData()
  }

  getListData() {
    this._masterService.getMasterData('account-module').then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HLmCost_Code || item.HLmCost_Name || item.HLmCost_SysID;
      const matchesQuery =
        (item.HLmCost_Code || '').toLowerCase().includes(query) ||
        (item.HLmCost_Name || '').toLowerCase().includes(query) ||
        item.HLmCost_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showlandedcostList = false
    this.router.navigate(['l-master/landed-cost-perc']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/landed-cost-perc/' + rowData.HLmCost_SysID]);
  }


}



