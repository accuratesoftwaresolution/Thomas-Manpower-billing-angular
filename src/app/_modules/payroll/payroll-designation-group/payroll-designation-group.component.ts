import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPayrollDesigCo } from 'src/app/_dto/TbldPayrollDesigCo.dto';
import { TblHPayrollDesig } from 'src/app/_dto/TblHPayrollDesig.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-payroll-designation-group',
  templateUrl: './payroll-designation-group.component.html',
  styleUrls: ['./payroll-designation-group.component.scss']
})
export class PayrollDesignationGroupComponent implements OnInit {
  TblHPayrollDesig: TblHPayrollDesig = new TblHPayrollDesig()
 
   tableIndex: any;

     listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showPayrollDesignationList :boolean = false
 
 
   HPayrollDesig_SysID: any;
 
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
     this.TblHPayrollDesig.TbldPayrollDesigCo = [new TbldPayrollDesigCo()]
     this.activatedRoute.paramMap.subscribe(params => {
       const id = params.get('id');
 
       if (id) {
         this.showDeleteButton = true;
         this.HPayrollDesig_SysID = Number(id);
         this.TblHPayrollDesig.HPayrollDesig_SysID = Number(id);
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
         const isExist = this.TblHPayrollDesig.TbldPayrollDesigCo.some(item => item.DCPayrollDesigSingleCo_Code === selectedCode)
 
         if (isExist) {
           this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Payroll Designation Master' });
           return;
         }
         this.TblHPayrollDesig.TbldPayrollDesigCo[this.tableIndex].DcPayrollDesig_SingleCo_SysID = event.sysId
         this.TblHPayrollDesig.TbldPayrollDesigCo[this.tableIndex].DCPayrollDesigSingleCo_Code = event.code
         this.TblHPayrollDesig.TbldPayrollDesigCo[this.tableIndex].DcPayrollDesig_SingleCo_Name = event.name
         break;
 
 
       case 'ActAndDeactCode':
         this.TblHPayrollDesig.HPayrollDesig_AcDe_Code = event.code
         this.TblHPayrollDesig.HPayrollDesig_AcDe_Name = event.name
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
 
 
         if (this.TblHPayrollDesig.HPayrollDesig_SysID && rowData.DcPayrollDesig_SingleCo_SysID) {
           this.masterService.deleteData(apiUrl.payrollDesignationGroup, `company?where[DcPayrollDesig_SysID]=${this.TblHPayrollDesig.TbldPayrollDesigCo[0].DcPayrollDesig_SysID}&where[DcPayrollDesig_SingleCo_SysID]=${rowData.DcPayrollDesig_SingleCo_SysID}`).then((res) => {
 
             if (res.success == false) {
               this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
 
             } else {
               this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
               if (table === 'TbldPayrollDesigCo') {
                 this.TblHPayrollDesig.TbldPayrollDesigCo.splice(index, 1);
                 if (this.TblHPayrollDesig.TbldPayrollDesigCo.length === 0) {
                   this.addRow('TbldPayrollDesigCo', -1);
                 }
               }
 
             }
 
           });
         } else {
           if (table === 'TbldPayrollDesigCo') {
             this.TblHPayrollDesig.TbldPayrollDesigCo.splice(index, 1);
             if (this.TblHPayrollDesig.TbldPayrollDesigCo.length === 0) {
               this.addRow('TbldPayrollDesigCo', -1);
             }
           }
         }
       }
     });
   }
 
 
   addRow(table: any, index: number) {
     if (table == 'TbldPayrollDesigCo') {
       const newRow = new TbldPayrollDesigCo()
       this.TblHPayrollDesig.TbldPayrollDesigCo.splice(index + 1, 0, newRow);
 
     }
   }
 
   routeTo(screen) {
     this.router.navigate(['payroll/' + screen]);
   }
 
   preSave(): boolean {
     if (this.TblHPayrollDesig.HPayrollDesig_Code == null || this.TblHPayrollDesig.HPayrollDesig_Code.toString().trim() === '') {
       this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Designation Code Cannot Be Null' });
       return false;
     }
 
     if (this.TblHPayrollDesig.HPayrollDesig_Name == null || this.TblHPayrollDesig.HPayrollDesig_Name.toString().trim() === '') {
       this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Designation Name Cannot Be Null' });
       return false;
     }
 
     return true;
   }
 
 
   save() {
     if (!this.preSave()) {
       return;
     }
     this.TblHPayrollDesig.TbldPayrollDesigCo = this.TblHPayrollDesig.TbldPayrollDesigCo.filter(
       row => row.DCPayrollDesigSingleCo_Code && row.DCPayrollDesigSingleCo_Code.trim() !== ''
     );
 
     this.masterService.saveMasterData(apiUrl.payrollDesignationGroup, this.TblHPayrollDesig).then((res) => {
       if (res.success == false && !res.error) {
         this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
 
       } else if (res.success == false && res.error) {
         this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
       }
       else {
         this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
         this.TblHPayrollDesig = new TblHPayrollDesig()
         this.TblHPayrollDesig.TbldPayrollDesigCo = [new TbldPayrollDesigCo()]
 
       }
     })
   }
 
   funcSearch() {
     this.getdata()
   }
 
 
   getdata() {
     if (this.TblHPayrollDesig.HPayrollDesig_SysID || this.HPayrollDesig_SysID) {
       this.masterService.getMasterDatabyId(apiUrl.payrollDesignationGroup, this.TblHPayrollDesig.HPayrollDesig_SysID).then((res) => {
         this.TblHPayrollDesig = res
         this.showDeleteButton = true;
 
         if (this.TblHPayrollDesig.TbldPayrollDesigCo.length == 0) {
           this.TblHPayrollDesig.TbldPayrollDesigCo = [new TbldPayrollDesigCo()]
         }
 
       }, err => {
         if (err.error.statusCode == 404) {
           this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
           this.TblHPayrollDesig = new TblHPayrollDesig()
           this.TblHPayrollDesig.TbldPayrollDesigCo = [new TbldPayrollDesigCo()]
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
         this.masterService.deleteData(apiUrl.payrollDesignationGroup, this.TblHPayrollDesig.HPayrollDesig_SysID).then((res) => {
 
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
     this.TblHPayrollDesig = new TblHPayrollDesig()
     this.TblHPayrollDesig.TbldPayrollDesigCo = [new TbldPayrollDesigCo()]
     this.router.navigate(['payroll/payroll-designation-group/']);
 
   }
   cancel(){
    this.TblHPayrollDesig = new TblHPayrollDesig()
           this.TblHPayrollDesig.TbldPayrollDesigCo = [new TbldPayrollDesigCo()]
   }


   
     //***************************************LIST********************************
  displayPayrollDesignationList() {
    this.showPayrollDesignationList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.payrollDesignationGroup).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPayrollDesig_Code || item.HPayrollDesig_Name || item.HPayrollDesig_SysID;
      const matchesQuery =
        (item.HPayrollDesig_Code || '').toLowerCase().includes(query) ||
        (item.HPayrollDesig_Name || '').toLowerCase().includes(query) ||
        item.HPayrollDesig_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showPayrollDesignationList = false
    this.router.navigate(['payroll/payroll-designation-group']);


  }
    editRow(rowData: any) {
    this.router.navigate(['payroll/payroll-designation-group/' + rowData.HPayrollDesig_SysID]);
  }
}
