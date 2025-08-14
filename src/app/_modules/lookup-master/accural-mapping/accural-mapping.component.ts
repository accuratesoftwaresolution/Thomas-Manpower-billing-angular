import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldMastAccruCo } from 'src/app/_dto/masters/accural-mapping/TbldMastAccruCo.dto';
import { TblHDetAccru } from 'src/app/_dto/masters/accural-mapping/TblHDetAccru.dto';
import { TblHMastAccru } from 'src/app/_dto/masters/accural-mapping/TblHMastAccru.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-accural-mapping',
  templateUrl: './accural-mapping.component.html',
  styleUrls: ['./accural-mapping.component.scss']
})
export class AccuralMappingComponent implements OnInit {

  TblHMastAccru: TblHMastAccru = new TblHMastAccru();

  tableIndex: any;

  listData = []

  searchText: string = '';
  showAccrualList: boolean = false

  filteredfilteredlistData = [...this.listData];

  constructor(
    private router: Router,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    private _masterService: MasterService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.TblHMastAccru.applicableCo.push(new TbldMastAccruCo())
    this.TblHMastAccru.TblHDetAccru.push(new TblHDetAccru())
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
        this.TblHMastAccru.applicableCo[this.tableIndex].DAccru_SingleCo_Code = event.code
        this.TblHMastAccru.applicableCo[this.tableIndex].DAccru_SingleCo_Name = event.name
        break;

      case 'ActAndDeactCode':
        this.TblHMastAccru.HAccru_AcDe_Code = event.code
        this.TblHMastAccru.HAccru_AcDe_Name = event.name
        break;
      case 'NarrationCode':
        this.TblHMastAccru.HAccru_Narra_Code = event.code
        this.TblHMastAccru.HAccru_Narra_Name = event.name
        break;
      case 'AccountFirstCode':
        this.TblHMastAccru.TblHDetAccru[this.tableIndex].DAccru_AccCode = event.HAccOne_Code
        this.TblHMastAccru.TblHDetAccru[this.tableIndex].DAccru_AccName = event.HAccOne_Name
        break;
      case 'AccountFirstCode2':
        this.TblHMastAccru.TblHDetAccru[this.tableIndex].DAccru_ExpCode = event.HAccOne_Code
        this.TblHMastAccru.TblHDetAccru[this.tableIndex].DAccru_ExpName = event.HAccOne_Name
        break;
      case 'RemarksCode':
        this.TblHMastAccru.TblHDetAccru[this.tableIndex].DAccru_RemCode = event.HRemMast_Code
        this.TblHMastAccru.TblHDetAccru[this.tableIndex].DAccru_RemName = event.HRemMast_Name
        break;
      default:
        break;
    }

  }

  deleteRow(table: any, index: number) {

    if (table == 'applicableCo') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'applicableCo') {
            this.TblHMastAccru.applicableCo.splice(index, 1);
            if (this.TblHMastAccru.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      });
    }
    if (table == 'TblHDetAccru') {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TblHDetAccru') {
            this.TblHMastAccru.TblHDetAccru.splice(index, 1);
            if (this.TblHMastAccru.TblHDetAccru.length === 0) {
              this.addRow('TblHDetAccru', -1);
            }
          }
        }
      });
    }
  }

  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldMastAccruCo()
      this.TblHMastAccru.applicableCo.splice(index + 1, 0, newRow);
    }
    if (table == 'TblHDetAccru') {
      const newRow = new TblHDetAccru()
      this.TblHMastAccru.TblHDetAccru.splice(index + 1, 0, newRow);

    }
  }

  onRowClick(rowData: any, rowIndex: number): void {
    console.log('Row clicked:', rowData, 'Index:', rowIndex);
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


  async saveAccrualMaster() {

    // if (!(await this.preSave())) {
    //   return;
    // }
    console.log(this.TblHMastAccru)
    // else {

    this._masterService.saveMasterData(apiUrl.productGroup, this.TblHMastAccru).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHMastAccru = new TblHMastAccru()
      this.TblHMastAccru.applicableCo = [new TbldMastAccruCo()]
      this.router.navigate(['/l-master/accural'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }

  AccrualList() {
    this.showAccrualList = true
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
      const hasData = item.HAccru_Code || item.HAccru_Name || item.HAccru_SysID;
      const matchesQuery =
        (item.HAccru_Code || '').toLowerCase().includes(query) ||
        (item.HAccru_Name || '').toLowerCase().includes(query) ||
        item.HAccru_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showAccrualList = false
    this.router.navigate(['l-master/accural']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/accural/' + rowData.HAccru_SysID]);
  }



}
