import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldHPayAddCo } from 'src/app/_dto/TbldHPayAddCo.dto';
import { TblHPayAdd } from 'src/app/_dto/TblHPayAdd.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-payroll-addition',
  templateUrl: './payroll-addition.component.html',
  styleUrls: ['./payroll-addition.component.scss']
})
export class PayrollAdditionComponent implements OnInit {
  TblHPayAdd: TblHPayAdd = new TblHPayAdd()
  
    tableIndex: any;

      listData = []

    searchText: string = '';

    filteredfilteredlistData = [...this.listData];

    showPayrollAdditionList :boolean = false
  
    HPayroll_Add_SysID: any;
  
    showDeleteButton: boolean = false;
  
  
    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      public popUpService: CommonPopupService,
      private lookupService: LookupDialogService,
      private confirmationService: ConfirmationService,
      public masterService: MasterService,
      private _messageService: MessageService) { }
  
  
    ngOnInit(): void {
      this.TblHPayAdd.TbldHPayAddCo = [new TbldHPayAddCo()]
      this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('id');
  
        if (id) {
          this.showDeleteButton = true;
          this.HPayroll_Add_SysID = Number(id);
          this.TblHPayAdd.HPayroll_Add_SysID = Number(id);
          this.getdata()
        }
      });
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
  
          const selectedCode = event.code
          const isExist = this.TblHPayAdd.TbldHPayAddCo.some(item => item.DcPayroll_SingleCo_Code === selectedCode)
  
          if (isExist) {
            this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Remarks Master' });
            return;
          }
          this.TblHPayAdd.TbldHPayAddCo[this.tableIndex].DcPayroll_SingleCo_SysID = event.sysId
          this.TblHPayAdd.TbldHPayAddCo[this.tableIndex].DcPayroll_SingleCo_Code = event.code
          this.TblHPayAdd.TbldHPayAddCo[this.tableIndex].DcPayroll_SingleCo_Name = event.name
          break;
  
  
        case 'ActAndDeactCode':
          this.TblHPayAdd.HPayroll_AcDe_Code = event.code
          this.TblHPayAdd.HPayroll_AcDe_Name = event.name
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
  
  
          if (this.TblHPayAdd.HPayroll_Add_SysID && rowData.DcPayroll_SingleCo_SysID) {
            this.masterService.deleteData(apiUrl.payrollAddition, `company?where[DcPayroll_Add_SysID]=${this.TblHPayAdd.TbldHPayAddCo[0].DcPayroll_Add_SysID}&where[DcPayroll_SingleCo_SysID]=${rowData.DcPayroll_SingleCo_SysID}`).then((res) => {
  
              if (res.success == false) {
                this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
  
              } else {
                this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                if (table === 'TbldHPayAddCo') {
                  this.TblHPayAdd.TbldHPayAddCo.splice(index, 1);
                  if (this.TblHPayAdd.TbldHPayAddCo.length === 0) {
                    this.addRow('TbldHPayAddCo', -1);
                  }
                }
  
              }
  
            });
          } else {
            if (table === 'TbldHPayAddCo') {
              this.TblHPayAdd.TbldHPayAddCo.splice(index, 1);
              if (this.TblHPayAdd.TbldHPayAddCo.length === 0) {
                this.addRow('TbldHPayAddCo', -1);
              }
            }
          }
        }
      });
    }
  
  
    addRow(table: any, index: number) {
      if (table == 'TbldHPayAddCo') {
        const newRow = new TbldHPayAddCo()
        this.TblHPayAdd.TbldHPayAddCo.splice(index + 1, 0, newRow);
  
      }
    }
  
    routeTo(screen) {
      this.router.navigate(['payroll/' + screen]);
    }
  
    preSave(): boolean {
      if (this.TblHPayAdd.HPayroll_Add_Code == null || this.TblHPayAdd.HPayroll_Add_Code.toString().trim() === '') {
        this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Addition Code Cannot Be Null' });
        return false;
      }
  
      if (this.TblHPayAdd.HPayroll_Add_Name == null || this.TblHPayAdd.HPayroll_Add_Name.toString().trim() === '') {
        this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Addition Name Cannot Be Null' });
        return false;
      }
  
      return true;
    }
  
  
    save() {
      if (!this.preSave()) {
        return;
      }
      this.TblHPayAdd.TbldHPayAddCo = this.TblHPayAdd.TbldHPayAddCo.filter(
        row => row.DcPayroll_SingleCo_Code && row.DcPayroll_SingleCo_Code.trim() !== ''
      );
  
      this.masterService.saveMasterData(apiUrl.payrollAddition, this.TblHPayAdd).then((res) => {
        if (res.success == false && !res.error) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
  
        } else if (res.success == false && res.error) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
        }
        else {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.TblHPayAdd = new TblHPayAdd()
          this.TblHPayAdd.TbldHPayAddCo = [new TbldHPayAddCo()]
  
        }
      })
    }
  
    funcSearch() {
      this.getdata()
    }
  
  
    getdata() {
      if (this.TblHPayAdd.HPayroll_Add_SysID || this.HPayroll_Add_SysID) {
        this.masterService.getMasterDatabyId(apiUrl.payrollAddition, this.TblHPayAdd.HPayroll_Add_SysID).then((res) => {
          this.TblHPayAdd = res
          this.showDeleteButton = true;
  
          if (this.TblHPayAdd.TbldHPayAddCo.length == 0) {
            this.TblHPayAdd.TbldHPayAddCo = [new TbldHPayAddCo()]
          }
  
        }, err => {
          if (err.error.statusCode == 404) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            this.TblHPayAdd = new TblHPayAdd()
            this.TblHPayAdd.TbldHPayAddCo = [new TbldHPayAddCo()]
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
          this.masterService.deleteData(apiUrl.payrollAddition, this.TblHPayAdd.HPayroll_Add_SysID).then((res) => {
  
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
      this.TblHPayAdd = new TblHPayAdd()
      this.TblHPayAdd.TbldHPayAddCo = [new TbldHPayAddCo()]
      this.router.navigate(['payroll/payroll-addition/']);
  
    }
    cancel(){
      this.TblHPayAdd = new TblHPayAdd()
            this.TblHPayAdd.TbldHPayAddCo = [new TbldHPayAddCo()]
    }

      //***************************************LIST********************************
    displayPayrollAdditionList() {
      this.showPayrollAdditionList = true
      this.getListData()
    }

    getListData() {
      this.masterService.getMasterData(apiUrl.payrollAddition).then((res) => {
        this.listData = res
        this.filterTable()
      })
    }

    filterTable() {
      const query = this.searchText?.toLowerCase() || '';
      this.filteredfilteredlistData = this.listData.filter(item => {
        const hasData = item.HPayroll_Add_Code || item.HPayroll_Add_Name || item.HPayroll_Add_SysID;
        const matchesQuery =
          (item.HPayroll_Add_Code || '').toLowerCase().includes(query) ||
          (item.HPayroll_Add_Name || '').toLowerCase().includes(query) ||
          item.HPayroll_Add_SysID?.toString().includes(query);
        return hasData && matchesQuery;
      });
    }

    Back() {
      this.showPayrollAdditionList = false
      this.router.navigate(['payroll/payroll-addition']);


    }
      editRow(rowData: any) {
      this.router.navigate(['payroll/payroll-addition/' + rowData.HPayroll_Add_SysID]);
    }


 
}
