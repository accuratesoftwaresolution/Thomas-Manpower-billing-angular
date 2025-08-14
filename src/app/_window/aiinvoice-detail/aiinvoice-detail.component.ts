import { BranchSelectionService } from "@accurate/branch-selection";
import { IcvatcatDto } from "./../../_dto/icvatcat.dto";
import { ActionService } from "@accurate/toolbar";
import { Component, Input, OnInit } from "@angular/core";
import { Iac4Dto } from "src/app/_dto/iac4.dto";
import { IbrDto } from "src/app/_dto/ibr.dto";
import { IccurrencyDto } from "src/app/_dto/iccurrency.dto";
import { IiitemDto } from "src/app/_dto/iiitem.dto";
import { IiunitLovDto } from "src/app/_dto/lov/iiunit-lov.dto";
import { IjjobLovDto } from "src/app/_dto/lov/ijjob-lov.dto";
import { IbrService } from "src/app/_providers/ibr.service";
import { IccurrencyService } from "src/app/_providers/iccurrency.service";
import { ItemMasterService } from "src/app/_providers/item-master.service";
import { PopUpLovService } from "src/app/_providers/pop-up-lov.service";
import { ErrorTranslateService, MasterService } from "@accurate/providers";
import { MessageService } from "primeng/api";
import { apiUrl } from "src/app/_resources/api-url.properties";
import { DatePipe } from "@angular/common";


@Component({
  selector: 'app-aiinvoice-detail',
  templateUrl: './aiinvoice-detail.component.html',
  styleUrls: ['./aiinvoice-detail.component.scss']
})
export class AiinvoiceDetailComponent implements OnInit {

  isSaLogic:boolean=false

  @Input() newData: any;
 
   columns: { field: string; header: string; width: string, sort?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];
 
     branchLovColumns: any = [];
     ijjobLovCols: any = [];
     unitLovColumns: any = [];
     vatCatLovColumns: any = [];
     lumpSumLovData = [];
     branchData: IbrDto[] = [];
     vatCatData: IcvatcatDto[] = [];
     ijjobLovData: IjjobLovDto[] = [];
     unitData: IiunitLovDto[] = [];
     vatTypeLovData = [];
     service = this.actionService.currentComponent.service;
     storeLov: any[];
     storeLovColumns: any[];
     itemLov: any;
     itemLovColumns: { field: string; header: string; width: string }[];
     itemSelected: any;
     isStock: boolean = false;  
     groups: any;
     selectedAdj:any = "";
     signIntOptions:any;
     sales: boolean = false;
     lpoLogic: boolean;
     unitColumns: any = [];
    //  allSelect:boolean= false;
 
     constructor(
         private _errorTranslateService: ErrorTranslateService,
         private _messageService: MessageService,
         protected branchSelection: BranchSelectionService,
         public actionService: ActionService,
         private popUpLovService: PopUpLovService,
         public currencyService: IccurrencyService,
         private ibrService: IbrService,
         private itemMasterService: ItemMasterService,
         private datepipe: DatePipe,
         private _masterService:MasterService
     ) {}
 
   ngOnInit(): void {
     this.getLovData();
   }
 
  
 
     getLovData() {
         this.lumpSumLovData = [
             { label: "Open", value: "O" },
             { label: "Quantity", value: "Q" },
             { label: "Lump Sum", value: "L" },
         ];
 
         this.vatTypeLovData = [
             { label: "No VAT", value: "N" },
             { label: "Refund", value: "R" },
             { label: "Cost", value: "C" },
         ];
 
         this.popUpLovService.getUnitLov().then((data) => {
             this.unitData = data["data"];
         });
         this.popUpLovService.getJobLov().then((data) => {
             this.ijjobLovData = data["data"];
         });
         this.ibrService.getIbrLov().then((res: IbrDto[]) => {
             this.branchData = res;
         });
         this.popUpLovService.getVatCatLov().then((res: IcvatcatDto[]) => {
             this.vatCatData = res["data"];
         });
         this.itemMasterService.getMasterData("item-master").then((res) => {
             this.itemLov = res["data"];
         });

     }

     allCheck(allselect){
            this.service.header.aidetail.forEach(element => {
              return element.selected = allselect;
            });
     }

     singleCheck(){
       let selected =  this.service.header.aidetail.filter(element => {
            return element.selected == true;
          });

          if(selected.length == this.service.header.aidetail.length){
            this.service.allSelect = true;
          }
          if(selected.length != this.service.header.aidetail.length){
            this.service.allSelect = false;
          }

     }
 
    
 
     
     
 
    
 
  
 
 
    
 
    
 
   
 
    

     getTotalAmount(): number {
        if (
            this.service.header.aidetail &&
            this.service.header.aidetail.length > 0
        ) {
            let total = 0;
             this.service.header.aidetail.forEach(element => {
               total = total+ parseFloat(element.ac_amt);
             });

            return total;
        }
        return 0;
    }
 
     getTotalDisc(): number {
         if (
             this.service.header.aidetail &&
             this.service.header.aidetail.length > 0
         ) {
             let total = 0;
              this.service.header.aidetail.forEach(element => {
                total = total+ parseFloat(element.disc_amt);
              });
 
             return total;
         }
         return 0;
     }
 
    
     getCrprTotal(): number {
         if (
             this.service.header.aidetail &&
             this.service.header.aidetail.length > 0
         ) {
            let total = 0;
              this.service.header.aidetail.forEach(element => {
                total = total+parseFloat(element.cr_period);
              });
              
             return total;
         }
         return 0;
     }
 
   async  generateInvoice(){

      let tempDetail 
     let temp =   this.service.header.aidetail.filter(element => {
        return element.selected == true;
      });
      tempDetail = temp.map(x => Object.assign({}, x));

   
   //validations start
      if(this.service.header.aidetail.length <1){
        this._messageService.add({ severity: 'warn', summary: 'Warning', detail: this._errorTranslateService.translate('invoicesCannotBeBlank') });
        return
        }
    
      if(tempDetail.length <1){
        this._messageService.add({ severity: 'warn', summary: 'Warning', detail: this._errorTranslateService.translate('selectInvoices') });
        return
        }

      if(!this.service.header.billNo || this.service.header.billNo == null || this.service.header.billNo == '' || this.service.header.billNo == undefined){
            this._messageService.add({ severity: 'warn', summary: 'Warning', detail: this._errorTranslateService.translate(`can'tSaveWithoutHeaderBillNo`) });
            return
        }

      if(!this.service.header.billDate || this.service.header.billDate == null || this.service.header.billDate == '' || this.service.header.billDate == undefined){
            this._messageService.add({ severity: 'warn', summary: 'Warning', detail: this._errorTranslateService.translate(`can'tSaveWithoutHeaderBillDate`) });
            return
        }
   //validations ends



   this.service.loading = true;

      try {
        // Wait for filtering operation to complete
        await Promise.resolve(tempDetail);
        // Filtering is complete, now do remaining()
        tempDetail.forEach(element => {
            return delete element.selected;
        });


        let tempHeader= JSON.parse(JSON.stringify(this.service.header));
        
        
        tempHeader.aidetail = tempDetail;

        this.service.save(tempHeader).then(res=>{
            console.log("🚀 ~res:", res)
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.data });
            this.service.loading = false;
            this.service.header.aidetail = [];
            this.service.header.billNo = null;
            this.service.header.billDate = null;
            this.service.header.All = false;
            this.service.header.narration = null;
            this.service.allSelect = false;
            this.retrieve();
        },err=>{
            this.service.loading = false;
            console.log("🚀 ~err:", err)
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            return
        })
        
        } catch (error) {
            this.service.loading = false;
        console.error("Error occurred during filtering:", error);
        }
     }
 
     createInsertRow() {
         this.actionService.currentComponent.createInsertRow().then(res=>{
           for (let i = 0; i < this.service.header.aidetail.length; i++) {
 
             this.service.header.aidetail[i].interBrCode = this.service.header.brCode;
         }
         });
        
 
     // this.actionService.currentComponent.detailPropertyName = "aidetail";
     // this.actionService.detailPropertyName = "aidetail";
 
 
   }
 
     deleteRow() {
         this.actionService.currentComponent.deleteDetailRow();
     }
 
     retrieve(){
      
      let currentDate = new Date()
      if(!this.service.header.fromDate || this.service.header.fromDate==undefined){
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('fromDateCannotBeBlank') });
          return
      }
      if(!this.service.header.toDate || this.service.header.toDate==undefined){
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('toDateCannotBeBlank') });
          return
      }
      if(this.service.header.fromDate > this.service.header.toDate){
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('InValidToDate') });
          return
      }
      if( this.service.header.toDate > currentDate){
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('toDateCannotBeGreaterThanCurrentDate') });
          return
      }
      if(!this.service.header.acCode || this.service.header.acCode==undefined){
          this._messageService.add({ severity: 'info', summary: 'info', detail: this._errorTranslateService.translate('acCodeNotNull') });
          return
      }
      else{
          this.service.loading = true;
          let filter = `where[fromDate]=${this.datepipe.transform(this.service.header.fromDate, 'yyyy-MM-dd')}&where[toDate]=${this.datepipe.transform(this.service.header.toDate, 'yyyy-MM-dd')}&where[accCode]=${this.service.header.acCode}&where[brCode]=${this.service.header.brCode}&where[coCode]=${this.service.header.coCode}&where[dvCode]=${this.service.header.dvCode}&where[intCode]=${this.service.intCode}`;
          this._masterService.getMasterData(apiUrl.iheaderReport,filter).then(res=>{
              this.service.allSelect = false
              this.service.loading = false;
              // this.GRNDisabled = false
              this.service.header.aidetail = res
          },err=>{
              this.service.loading = false;
              this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
              return
              
          })
  
      }
    }
 
 }
 
