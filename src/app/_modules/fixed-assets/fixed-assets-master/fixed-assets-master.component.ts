import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldMastPrepCo } from 'src/app/_dto/masters/prepaid-mapping/TbldMastPrepCo.dto';
import { TblHDetPrep } from 'src/app/_dto/masters/prepaid-mapping/TblHDetPrep.dto';
import { TblHMastPrep } from 'src/app/_dto/masters/prepaid-mapping/TblHMastPrep.dto';
import { TbldFixAss } from 'src/app/_dto/TbldFixAss.dto';
import { TbldFixAssCo } from 'src/app/_dto/TbldFixAssCo.dto';
import { TblHFixAss } from 'src/app/_dto/TblHFixAss.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-fixed-assets-master',
  templateUrl: './fixed-assets-master.component.html',
  styleUrls: ['./fixed-assets-master.component.scss']
})
export class FixedAssetsMasterComponent implements OnInit {

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showfixedassetList: boolean = false



  TblHFixAss: TblHFixAss = new TblHFixAss();
  tableIndex: any;

  TableData = [
    { field: 'DFixAss_Grid_SysID', header: 'Fixed Assets Detail SysID', hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, bind: "DFixAss_Grid_SysID", type: 'text', readOnly: true },
    { field: 'DFixAss_AccuDep_SysID', header: 'Fixed Assets Account SysID', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DFixAss_AccuDep_SysID", type: 'text' },
    { field: 'DFixAss_AccuDep_Code', header: 'Fixed Assets Account Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, PopUpData: 'AccountFirstCode', bind: "DFixAss_AccuDep_Code", type: 'text' },
    { field: 'DFixAss_AccuDep_Name', header: 'Fixed Assets Account Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "DFixAss_AccuDep_Name", type: 'text' },
    { field: 'DFixAss_DepSysID', header: 'Accu Dep Expenses SysID', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "DFixAss_DepSysID", type: 'text' },
    { field: 'DFixAss_DepCode', header: 'Accu Dep Expenses Account Code', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DFixAss_DepCode", type: 'text', PopUp: true, PopUpData: 'DepreciationExpensesCode' },
    { field: 'DFixAss_DepName', header: 'Accu Dep Expenses Account Name', hide: false, mandatory: false, width: '16rem', data: '12345678912345', manual: false, bind: "DFixAss_DepName", type: 'text' },
    { field: 'DFixAss_RemSysID', header: 'Remarks SysID', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DFixAss_RemSysID", type: 'text' },
    { field: 'DFixAss_RemCode', header: 'Remarks Code', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DFixAss_RemCode", type: 'text', PopUp: true, PopUpData: 'RemarksCode' },
    { field: 'DFixAss_RemName', header: 'Remarks Name', hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, bind: "DFixAss_RemName", type: 'text' }
  ];


  constructor(
    private router: Router,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _masterService: MasterService,
  ) { }

  ngOnInit(): void {
    this.TblHFixAss.TbldFixAss.push(new TbldFixAss())
    this.TblHFixAss.applicableCo.push(new TbldFixAssCo())
  }



  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        break;
      case 'AccDirectExpCode':
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
        this.TblHFixAss.applicableCo[this.tableIndex].DcFixAss_SingleCo_Code = event.code
        this.TblHFixAss.applicableCo[this.tableIndex].DcFixAss_SingleCo_Name = event.name
        break;

      case 'ActAndDeactCode':
        this.TblHFixAss.HFixAss_AcDe_Code = event.code
        this.TblHFixAss.HFixAss_AcDe_Name = event.name
        break;
      case 'NarrationCode':
        this.TblHFixAss.HFixAss_Narra_Code = event.code
        this.TblHFixAss.HFixAss_Narra_Name = event.name
        break;
      case 'AccountFirstCode':
        this.TblHFixAss.TbldFixAss[this.tableIndex].DFixAss_AccuDep_Code = event.HAccOne_Code
        this.TblHFixAss.TbldFixAss[this.tableIndex].DFixAss_AccuDep_Name = event.HAccOne_Name
        break;
      case 'DepreciationExpensesCode':
        this.TblHFixAss.TbldFixAss[this.tableIndex].DFixAss_DepCode = event.DFixAss_DepCode
        this.TblHFixAss.TbldFixAss[this.tableIndex].DFixAss_DepName = event.DFixAss_DepName
        break;
      case 'RemarksCode':
        this.TblHFixAss.TbldFixAss[this.tableIndex].DFixAss_RemCode = event.HRemMast_Code
        this.TblHFixAss.TbldFixAss[this.tableIndex].DFixAss_RemName = event.HRemMast_Name
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
            this.TblHFixAss.applicableCo.splice(index, 1);
            if (this.TblHFixAss.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      });

    }
    if (table == 'TbldFixAss') {
      // this.TbldFixAss.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TbldFixAss') {
            this.TblHFixAss.TbldFixAss.splice(index, 1);
            if (this.TblHFixAss.TbldFixAss.length === 0) {
              this.addRow('TbldFixAss', -1);
            }
          }
        }
      });
    }
  }

  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldFixAssCo()
      this.TblHFixAss.applicableCo.splice(index + 1, 0, newRow);

    }
    if (table == 'TbldFixAss') {
      const newRow = new TbldFixAss()
      this.TblHFixAss.TbldFixAss.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate([screen]);
  }
  mainGroupOptions = [
    { code: '1001', name: 'Straight Line Method' },
    { code: '1002', name: 'Accumulated Depreciation' },
    { code: '1002', name: 'Not Applicable' }
  ];
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


  async savefixedasset() {

    // if (!(await this.preSave())) {
    //   return;
    // }
    console.log(this.TblHFixAss)
    // else {

    this._masterService.saveMasterData(apiUrl.productGroup, this.TblHFixAss).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHFixAss = new TblHFixAss()
      this.TblHFixAss.applicableCo = [new TbldFixAssCo()]
      this.router.navigate(['/l-master/billed-to'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }



  fixedassetList() {
    this.showfixedassetList = true
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
      const hasData = item.HFixAss_Code || item.HFixAss_Name || item.HFixAss_SysID;
      const matchesQuery =
        (item.HFixAss_Code || '').toLowerCase().includes(query) ||
        (item.HFixAss_Name || '').toLowerCase().includes(query) ||
        item.HFixAss_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showfixedassetList = false
    this.router.navigate(['fixed-assets/fixed-assets-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['fixed-assets/fixed-assets-master/' + rowData.HFixAss_SysID]);
  }


}
