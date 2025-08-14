import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldMastPrepCo } from 'src/app/_dto/masters/prepaid-mapping/TbldMastPrepCo.dto';
import { TblHDetPrep } from 'src/app/_dto/masters/prepaid-mapping/TblHDetPrep.dto';
import { TblHMastPrep } from 'src/app/_dto/masters/prepaid-mapping/TblHMastPrep.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-prepaid-mapping',
  templateUrl: './prepaid-mapping.component.html',
  styleUrls: ['./prepaid-mapping.component.scss']
})
export class PrepaidMappingComponent implements OnInit {


  TblHMastPrep: TblHMastPrep = new TblHMastPrep();
  tableIndex: any;

   listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showPrepaidList: boolean = false

  constructor(
    private router: Router,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
      private confirmationService: ConfirmationService,
      private _messageService:MessageService,
      private _masterService:MasterService
    
  ) { }

  ngOnInit(): void {
    this.TblHMastPrep.TblHDetPrep.push(new TblHDetPrep())
    this.TblHMastPrep.applicableCo.push(new TbldMastPrepCo())
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
        this.TblHMastPrep.applicableCo[this.tableIndex].DcPrep_SingleCo_Code = event.code
        this.TblHMastPrep.applicableCo[this.tableIndex].DcPrep_SingleCo_Name = event.name
        break;

      case 'ActAndDeactCode':
        this.TblHMastPrep.HPrep_AcDe_Code = event.code
        this.TblHMastPrep.HPrep_AcDe_Name = event.name
        break;
      case 'NarrationCode':
        this.TblHMastPrep.HPrep_Narra_Code = event.code
        this.TblHMastPrep.HPrep_Narra_Name = event.name
        break;
      case 'AccountFirstCode':
        this.TblHMastPrep.TblHDetPrep[this.tableIndex].DPrep_AccCode = event.HAccOne_Code
        this.TblHMastPrep.TblHDetPrep[this.tableIndex].DPrep_AccName = event.HAccOne_Name
        break;
      case 'AccountFirstCode2':
        this.TblHMastPrep.TblHDetPrep[this.tableIndex].DPrep_ExpCode = event.HAccOne_Code
        this.TblHMastPrep.TblHDetPrep[this.tableIndex].DPrep_ExpName = event.HAccOne_Name
        break;
      case 'RemarksCode':
        this.TblHMastPrep.TblHDetPrep[this.tableIndex].DPrep_RemCode = event.HRemMast_Code
        this.TblHMastPrep.TblHDetPrep[this.tableIndex].DPrep_RemName = event.HRemMast_Name
        break;


      default:
        break;
    }

  }

  deleteRow(table: any, index: number) {

    if (table == 'applicableCo') {
      // this.TblHMastPrep.applicableCo.splice(index, 1);
      this.confirmationService.confirm({
            message: 'Are you sure you want to delete this row?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (table === 'applicableCo') {
                this.TblHMastPrep.applicableCo.splice(index, 1);
                if (this.TblHMastPrep.applicableCo.length === 0) {
                  this.addRow('applicableCo', -1);
                }
              }
            }
          });
      
      
    }
    if (table == 'TblHDetPrep') {
      // this.TblHMastPrep.TblHDetPrep.splice(index, 1);
      this.confirmationService.confirm({
            message: 'Are you sure you want to delete this row?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              if (table === 'TblHDetPrep') {
                this.TblHMastPrep.TblHDetPrep.splice(index, 1);
                if (this.TblHMastPrep.TblHDetPrep.length === 0) {
                  this.addRow('TblHDetPrep', -1);
                }
              }
            }
          });
    }
  }

  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldMastPrepCo()
            this.TblHMastPrep.applicableCo.splice(index + 1, 0, newRow);

    }
    if (table == 'TblHDetPrep') {
      const newRow = new TblHDetPrep()
            this.TblHMastPrep.TblHDetPrep.splice(index + 1, 0, newRow);

    }
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

  routeTo(screen) {
    this.router.navigate([screen]);
  }


    async savePrepaidMaster() {
  
      // if (!(await this.preSave())) {
      //   return;
      // }
      console.log(this.TblHMastPrep)
      // else {
  
      this._masterService.saveMasterData(apiUrl.productGroup, this.TblHMastPrep).then((res) => {
        console.log("res", res);
        this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
        this.TblHMastPrep = new TblHMastPrep()
        this.TblHMastPrep.applicableCo = [new TbldMastPrepCo()]
        this.router.navigate(['/l-master/tax-master'])
  
      },
        err => {
          this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
        })
  
      // }
    }
  
    PrepaidList() {
      this.showPrepaidList = true
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
        const hasData = item.HPrep_Code || item.HPrep_Name || item.HPrep_SysID;
        const matchesQuery =
          (item.HPrep_Code || '').toLowerCase().includes(query) ||
          (item.HPrep_Name || '').toLowerCase().includes(query) ||
          item.HPrep_SysID?.toString().includes(query);
        return hasData && matchesQuery;
      });
    }
  
    Back() {
      this.showPrepaidList = false
      this.router.navigate(['l-master/prepaid']);
  
  
    }
    editRow(rowData: any) {
      this.router.navigate(['l-master/prepaid/' + rowData.HPrep_SysID]);
    }
  

}
