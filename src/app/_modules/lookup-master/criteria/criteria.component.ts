import { MasterService } from '@accurate/providers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TblApplicableCoDto } from 'src/app/_dto/masters/tblapplicableco.dto';
import { CriteriaDto } from 'src/app/_dto/masters/tblcriteria.dto';
import { EmpDeptDto } from 'src/app/_dto/masters/tblempdept.dto';
import { TbldCriteriaCo } from 'src/app/_dto/TbldCriteriaCo.dto';
import { TblDigiDetailDto } from 'src/app/_dto/tbldigidetail.dto';
import { TblDigiHeadDto } from 'src/app/_dto/tbldigihead.dto';
import { TblHCriteria } from 'src/app/_dto/TblHCriteria.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {


  TblHCriteria: TblHCriteria[] = [new TblHCriteria()]
 applicableCo: TbldCriteriaCo[] = [new TbldCriteriaCo()]
 
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
         this.applicableCo[this.tableIndex].DcCriteria_SingleCo_Code= event.code
         this.applicableCo[this.tableIndex].DcCriteria_SingleCo_Name= event.name
         break;
 
 
       case 'ActAndDeactCode':
         this.TblHCriteria[0].HCriteria_AcDe_Code = event.code
         this.TblHCriteria[0].HCriteria_AcDe_Name = event.name
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
         const newRow = new TbldCriteriaCo()
         this.applicableCo.splice(index + 1, 0, newRow);
   
       }
   
     }

}