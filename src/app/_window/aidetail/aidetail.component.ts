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
import { ErrorTranslateService } from "@accurate/providers";
import { MessageService } from "primeng/api";
import { Customer } from 'src/app/_modules/dashboard/demo/domain/customer';
import { PurchaseService } from "src/app/_providers/purchase.service";


@Component({
    selector: "app-aidetail",
    templateUrl: "./aidetail.component.html",
    styleUrls: ["./aidetail.component.scss"],
})
export class AidetailComponent implements OnInit {

 isSaLogic: boolean = false;
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


    constructor(
        private _errorTranslateService: ErrorTranslateService,
        private _messageService: MessageService,
        protected branchSelection: BranchSelectionService,
        public actionService: ActionService,
        private popUpLovService: PopUpLovService,
        public currencyService: IccurrencyService,
        private ibrService: IbrService,
        private itemMasterService: ItemMasterService,
    ) {
      this.isSaLogic = this.branchSelection.iintValues.intLogic == "SA";
    }

  ngOnInit(): void {
   
    this.getMetaDataDetails();
    this.getLovData();
    this.storeLov = [
      { label: 'innovations1', code: 1 },
      { label: 'innovations2', code: 2 },
      { label: 'innovations3', code: 3 }

    ];
    if (this.branchSelection.iintValues.intLogic.trim() == "ST") {
      this.isStock = true;
    }
    if(this.branchSelection.iintValues.refInt != null && this.branchSelection.iintValues.refInt != undefined && this.branchSelection.iintValues.refInt.trim() =="LPO"){
        this.lpoLogic=true
    }
    if (this.branchSelection.iintValues.intLogic.trim() == 'SAS') {
      this.sales = true
    }
    else
      this.sales = false
  }

  getMetaDataDetails() {

    this.signIntOptions  = [
      { name: "-", value: -1 },
      { name: "+", value: 1 },
    ]

    this.branchLovColumns = [
      { field: 'brCode', header: 'Branch Code', width: '10em' },
      { field: 'brName', header: 'Branch Name', width: '20em' },
    ];

        this.itemLovColumns = [
            { field: "itemCode", header: "Item Code", width: "10em" },
            { field: "itemName", header: "Item Name", width: "20em" },
        ];

        this.storeLovColumns = [
            { field: "label", header: "Store Name", width: "10em" },
            { field: "code", header: "Store Code", width: "10em" },
        ];

        this.ijjobLovCols = [
            { field: "jobCode", header: "Job Code", width: "8em" },
            { field: "jobName", header: "Job Name", width: "  10em" },
            { field: "mJobCode", header: "M Job Name", width: "8em" },
        ];

        this.unitLovColumns = [
            { field: "code", header: "Unit Code", width: "10em" },
            { field: "name", header: "Unit Name", width: "20em" },
        ];
        this.unitColumns = [
            { field: "unitCode", header: "Unit Code", width: "10em" },
            { field: "name", header: "Unit Name", width: "20em" },
        ];

    this.vatCatLovColumns = [
      { field: 'code', header: 'Code', width: '15em' },
      { field: 'name', header: 'VAT Category', width: '15em' },
      { field: 'vatPer', header: 'VAT %', width: '15em' },
      { field: 'status', header: 'Status', width: '15em' },
      { field: 'vatType', header: 'vatType', width: '15em' },
      { field: 'acCode', header: 'Account', width: '15em' },
    ];
    
    this.columns = !this.isStock ? [
      { field: 'sortOrder', header: '#', width: '3em' },
      { field: 'brCode', header: 'Branch Code', width: '15em' },
      { field: 'storeCode', header: 'Store Code', width: '5em' },
      { field: 'rate', header: 'Rate', width: '3em' },
      { field: 'itemCode', header: 'Item Code', width: '5em' },
      { field: 'itemDesc', header: 'Item Desc', width: '5em' },
      { field: 'uom', header: 'Uom', width: '5em' },
      { field: 'itemQty', header: 'Item Qty', width: '3em' },
      { field: 'itemRate', header: 'Item Rate', width: '3em' },
      { field: 'remark', header: 'Remark', width: '3em' },

      { field: 'amount', header: 'Amount', width: '5em' },
      { field: 'disAmt', header: 'Discount Amount', width: '5em' },
      { field: 'costRate', header: 'Cost Rate', width: '5em' },
      { field: 'addAmt', header: 'Additional Amount', width: '5em' },
      { field: 'remark', header: 'Lump Sum', width: '5em' },
      { field: 'curCode', header: 'Currency', width: '5em' },
      { field: 'curRate', header: 'Cur. Rate', width: '3em' },
      { field: 'refCo', header: 'Ref CO', width: '3em' },
      { field: 'refDv', header: 'Ref DV', width: '3em' },
      { field: 'refBr', header: 'Ref BR', width: '3em' },
      { field: 'refInt', header: 'Ref INT', width: '3em' },
      { field: 'refVrNo', header: 'Ref VRNO', width: '4em' },
      { field: 'refSrNo', header: 'Ref SRNO', width: '4em' },
      { field: 'remark', header: 'Cancel', width: '4em' },
      { field: 'itemRate', header: 'Item Rate', width: '5em' },
      { field: 'srNo', header: 'Sr No', width: '4em' },
      { field: 'grnDnRetQty', header: 'Batch', width: '5em' },
      { field: 'retQty', header: 'Ret Qty', width: '5em' },
    ] : 
    [
      { field: "sortOrder", header: "#", width: "3em" },
      { field: "interBrCode", header: "Branch Code", width: "15em" },
      { field: "storeCode", header: "Store Code", width: "5em" },
      { field: "rate", header: "Rate", width: "3em" },
      { field: "itemCode", header: "Item Code", width: "5em" },
      { field: "itemDesc", header: "Item Desc", width: "5em" },
      { field: "uom", header: "Uom", width: "5em" },
      { field: "curStock", header: "Current Stock", width: "5em" },
      { field: "itemQty", header: "Item Qty", width: "3em" },
      { field: "itemRate", header: "Item Rate", width: "3em" },
      { field: "amount", header: "Amount", width: "5em" },
      { field: "disAmt", header: "Discount Amount", width: "5em" },
      { field: "costRate", header: "Cost Rate", width: "5em" },
      { field: "addAmt", header: "Additional Amount", width: "5em" },
      { field: "remark", header: "Lump Sum", width: "5em" },
      { field: "curCode", header: "Currency", width: "5em" },
      { field: "curRate", header: "Cur. Rate", width: "3em" },
      { field: "refCo", header: "Ref CO", width: "3em" },
      { field: "refDv", header: "Ref DV", width: "3em" },
      { field: "refBr", header: "Ref BR", width: "3em" },
      { field: "refInt", header: "Ref INT", width: "3em" },
      { field: "refVrNo", header: "Ref VRNO", width: "4em" },
      { field: "refSrNo", header: "Ref SRNO", width: "4em" },
      { field: "remark", header: "Cancel", width: "4em" },
      { field: "itemRate", header: "Item Rate", width: "5em" },
      { field: "srNo", header: "Sr No", width: "4em" },
      { field: "grnDnRetQty", header: "Batch", width: "5em" },
      { field: "retQty", header: "Ret Qty", width: "5em" },
  ];
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

    async onUnitSelection(rowIndex: number) {
        console.log("selected item===", this.itemSelected.itemCode);
        

        if (this.itemSelected && this.itemSelected.iiitemunit != null && this.itemSelected.iiitemunit.length > 0) {
            for (let element of this.itemSelected.iiitemunit){
               element.name = element.unitCodeD.name
            }
            
            const ref = this.actionService.showPopUp(
                this.itemSelected.iiitemunit,
                this.unitColumns
            );
            ref.onClose.subscribe((unit: IiunitLovDto) => {
                if (unit) {
                    this.service.header.aidetail[rowIndex].uom = unit.unitCode;
                }
            });
        }
    }

    async onRateTypeSelection(rowIndex: number) {}

    async onvatCatSelection(rowIndex: number) {
        // const ref = this.actionService.showPopUp(this.vatCatData,this.vatCatLovColumns);
        // ref.onClose.subscribe((selectedRow: IcvatcatDto) => {
        //   if (selectedRow) {
        //     this.service.header.aidetail[rowIndex].vatCat = selectedRow.code;
        //     this.service.header.aidetail[rowIndex].vatPer = selectedRow.vatPer;
        //     this.service.header.aidetail[rowIndex].vatType = selectedRow.vatType;
        //     this.service.header.aidetail[rowIndex].vatAc = selectedRow.acCode;
        //   }
        // });
    }

    async onBranchSelection(rowIndex: number) {
        // console.log('thi.serv===',this.service);
        
        const ref = this.actionService.showPopUp(
            this.branchData,
            this.branchLovColumns
        );
        ref.onClose.subscribe((branch: IbrDto) => {
            if (branch) {
                this.service.header.aidetail[rowIndex].interBrCode =
                    branch.brCode;
                this.service.header.aidetail[rowIndex].brName = branch.brName;
                this.service.header.aidetail[rowIndex].retQty = 0;
                this.service.header.aidetail[rowIndex].grnDnRetQty = 0;
                this.service.header.aidetail[rowIndex].vatPer = 0;
                this.service.header.aidetail[rowIndex].vatAmt = 0;
            }
        });
    }

  async onItemSelection(rowIndex: number) {

    if (!this.sales) {
      const ref = this.actionService.showPopUp(this.itemLov, this.itemLovColumns);
      ref.onClose.subscribe((item: IiitemDto) => {
        if (item) {
          this.service.header.aidetail[rowIndex].itemCode = item.itemCode;
          this.itemMasterService.getMasterData("item-master/" + item.itemCode).then(res => { 
          this.itemSelected = res; 
          for (let element of this.itemSelected.iiitembr) {
        
        
          if (parseFloat(element.brCode) == parseFloat(this.service.selectedDetailRow.brCode)) {

            this.service.header.aidetail[rowIndex].curStock = parseFloat(element.itemQty)

            this.service.header.aidetail[rowIndex].costRate = parseFloat(element.costRate)
              ;

          }
        
          
       
        }
      })

        this.service.header.aidetail[rowIndex].itemDesc = item.itemName;
          this.service.header.aidetail[rowIndex].cFactor = 1;
          this.service.header.aidetail[rowIndex].costRate = 1;
        }
      });
    }
    else {
      const ref = this.actionService.showPopUp(this.itemLov, this.itemLovColumns);
      ref.onClose.subscribe((item: IiitemDto) => {
        if (item) {
          this.service.header.aidetail[rowIndex].itemCode = item.itemCode;
          this.itemMasterService.getMasterData("item-master/" + item.itemCode).then(res => {
            this.itemSelected = res;

            if (!this.isStock) {
              for (let element of this.itemSelected.iiitembr) {
                if (parseFloat(element.brCode) == parseFloat(this.service.header.aidetail[rowIndex].brCode)) {
                  this.service.header.aidetail[rowIndex].curStock = parseFloat(element.itemQty)
                  this.service.header.aidetail[rowIndex].costRate = parseFloat(element.costRate);
                }
              }
            } else {
              for (let element of this.itemSelected.iiitembr) {

                if (
                    parseFloat(element.interBrCode) ==
                    parseFloat(
                        this.service.selectedDetailRow.interBrCode
                    )
                ) {

                    this.service.header.aidetail[
                        rowIndex
                    ].curStock = parseFloat(element.itemQty);

                    this.service.header.aidetail[
                        rowIndex
                    ].costRate = parseFloat(element.costRate);
                }
            }
            }
          })
          
          this.service.header.aidetail[rowIndex].itemDesc = item.itemName;
          this.service.header.aidetail[rowIndex].cFactor = 1;
          
        }
      });

    }
  }


    onStoreSelection(rowIndex: number) {
        const ref = this.actionService.showPopUp(
            this.storeLov,
            this.storeLovColumns
        );
        ref.onClose.subscribe((store: any) => {
            if (store) {
                this.service.header.aidetail[rowIndex].storeCode = store.code;
                //   this.service.header.aidetail[rowIndex].code = store.stCode;
            }
        });
    }

    convertToFloat(value): number {
        return parseFloat(value);
    }

    async onJobSelection(rowIndex: number) {
        const ref = this.actionService.showPopUp(
            this.ijjobLovData,
            this.ijjobLovCols
        );
        ref.onClose.subscribe((selectedRow: IjjobLovDto) => {
            if (selectedRow) {
                this.service.header.aidetail[rowIndex].jobCode =
                    selectedRow.jobCode;
            }
        });
    }

    changeDetailDiscount(rowIndex: number, flag: string) {
        const selectedRow = this.service.header.aidetail[rowIndex];
        const amount =
            (selectedRow.itemQty != null ? selectedRow.itemQty : 0) *
            (selectedRow.itemRate != null ? selectedRow.itemRate : 0);
        if (flag === "P")
            selectedRow.disAmt =
                (amount *
                    (selectedRow.discPer != null ? selectedRow.discPer : 0)) /
                100;
        else flag == "A" && amount > 0;
        selectedRow.discPer =
            ((selectedRow.disAmt != null ? selectedRow.disAmt : 0) * 100) /
            amount;

        const totalDiscAmt = this.getDiscTotal();
        const totalAmt = this.getTotalAmount();
        this.service.header.disAmt = this.actionService.round(
            totalDiscAmt != null ? totalDiscAmt : 0,
            this.service.amtDecPts
        );
        if (totalAmt > 0)
            this.service.header.discPer = this.actionService.round(
                ((totalDiscAmt != null ? totalDiscAmt : 0) * 100) / totalAmt,
                this.service.amtDecPts
            );
    }

    getTotalAmount(): number {
        if (
            this.service.header.aidetail &&
            this.service.header.aidetail.length > 0
        ) {
            const total = this.service.header.aidetail.reduce(
                (sum, current) =>
                    parseFloat(sum) +
                    (current.itemQty * current.itemRate - current.disAmt),
                0
            );

            return total;
        }
        return 0;
    }

    getNetTotal(): number {
        if (
            this.service.header.aidetail &&
            this.service.header.aidetail.length > 0
        ) {
            const total = this.service.header.aidetail.reduce(
                (sum, current) =>
                    parseFloat(sum) +
                    (current.itemQty * current.itemRate - current.disAmt),
                0
            );
            return total;
        }
        return 0;
    }

    getDiscTotal(): number {
        if (
            this.service.header.aidetail &&
            this.service.header.aidetail.length > 0
        ) {
            const total = this.service.header.aidetail.reduce(
                (sum, current) => parseFloat(sum) + current.disAmt,
                0
            );
            return total;
        }
        return 0;
    }

    getUnitName(unit: string) {
        const unitRow = this.unitData.find((row) => row.code == unit);
        if (unitRow) return unitRow.name;
        else return null;
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



}
