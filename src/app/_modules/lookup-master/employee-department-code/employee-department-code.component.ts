import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TbldEmpDeptCo } from 'src/app/_dto/TbldEmpDeptCo.dto';
import { TblHEmpDept } from 'src/app/_dto/TblHEmpDept.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';

@Component({
  selector: 'app-employee-department-code',
  templateUrl: './employee-department-code.component.html',
  styleUrls: ['./employee-department-code.component.scss']
})
export class EmployeeDepartmentCodeComponent implements OnInit {

 
  TblHEmpDept: TblHEmpDept[] = [new TblHEmpDept()]
 applicableCo: TbldEmpDeptCo[] = [new TbldEmpDeptCo()]
 
   tableIndex: any;
 
 
   constructor(public popUpService: CommonPopupService,
         private lookupService: LookupDialogService,
         public _salesService: SalesService,
        private confirmationService: ConfirmationService) { }
 
 
   ngOnInit(): void {
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
         this.applicableCo[this.tableIndex].DcEmpDep_SingleCo_Code= event.code
         this.applicableCo[this.tableIndex].DcEmpDep_SingleCo_Name= event.name
         break;
 
 
       case 'ActAndDeactCode':
         this.TblHEmpDept[0].HEmpDept_AcDe_Code = event.code
         this.TblHEmpDept[0].HEmpDept_AcDe_Name = event.name
         break;
     }
   }
   deleteRow(table: any, index: number) {
 
     this.confirmationService.confirm({
       message: 'Are you sure you want to delete this row?',
       header: 'Confirm Delete',
       icon: 'pi pi-exclamation-triangle',
       accept: () => {
         if (table === 'applicableCo') {
           this.applicableCo.splice(index, 1);
           if (this.applicableCo.length === 0) {
             this.addRow('applicableCo', -1);
           }
         }
       }
     });
 
    
   }
 
   ConfirmDialog(){
     this.confirmationService.confirm({
       message: 'Are you sure you want to delete?',
       header: 'Confirm Delete',
       icon: 'pi pi-exclamation-triangle',
       accept: () => {
         // Only delete if user confirms
       }
     });
   }
     addRow(table: any, index: number) {
       if (table == 'applicableCo') {
         const newRow = new TbldEmpDeptCo()
         this.applicableCo.splice(index + 1, 0, newRow);
   
       }
   
     }


}
