import { IcvatcatDto } from './../../_dto/icvatcat.dto';
import { ActionService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { Iac4Dto } from 'src/app/_dto/iac4.dto';
import { IccurrencyDto } from 'src/app/_dto/iccurrency.dto';
import { IiunitLovDto } from 'src/app/_dto/lov/iiunit-lov.dto';
import { IjjobLovDto } from 'src/app/_dto/lov/ijjob-lov.dto';
import { IccurrencyService } from 'src/app/_providers/iccurrency.service';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';

@Component({
  selector: 'app-iapodetail',
  templateUrl: './iapodetail.component.html',
  styleUrls: ['./iapodetail.component.scss']
})
export class IapodetailComponent implements OnInit {

  columns: { field: string; header: string; width: string, sort?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  accountLovColumns: any = [];
  ijjobLovCols: any = [];
  unitLovColumns: any = [];
  vatCatLovColumns: any = [];
  lumpSumLovData = [];
  accountData: Iac4Dto[] = [];
  vatCatData: IcvatcatDto[] = [];
  ijjobLovData: IjjobLovDto[] = [];
  unitData: IiunitLovDto[] = [];
  vatTypeLovData = [];
  service = this.actionService.currentComponent.service;

  constructor(
    public actionService: ActionService,
    private popUpLovService: PopUpLovService,
    public currencyService: IccurrencyService
  ) {

  }

  ngOnInit(): void {
    this.getMetaDataDetails();
    this.getLovData();
  }

  getMetaDataDetails() {
    this.accountLovColumns = [
      { field: 'acCode', header: 'Account Code', width: '10em' },
      { field: 'acName', header: 'Account Name', width: '20em' },
    ];

    this.ijjobLovCols = [
      { field: 'jobCode', header: 'Job Code', width: '8em' },
      { field: 'jobName', header: 'Job Name', width: '  10em' },
      { field: 'mJobCode', header: 'M Job Name', width: '8em' },
    ];

    this.unitLovColumns = [
      { field: 'code', header: 'Unit Code', width: '10em' },
      { field: 'name', header: 'Unit Name', width: '20em' },
    ];

    this.vatCatLovColumns = [
      { field: 'code', header: 'Code', width: '15em' },
      { field: 'name', header: 'VAT Category', width: '15em' },
      { field: 'vatPer', header: 'VAT %', width: '15em' },
      { field: 'status', header: 'Status', width: '15em' },
      { field: 'vatType', header: 'vatType', width: '15em' },
      { field: 'acCode', header: 'Account', width: '15em' },
    ]

    this.columns = [
      { field: 'sortOrder', header: '#', width: '3em' },
      { field: 'acCode', header: 'Account Code', width: '15em' },
      { field: 'acName', header: 'Account Name', width: '5em' },
      { field: 'uom', header: 'Uom', width: '3em' },
      { field: 'qty', header: 'Qty', width: '5em' },
      { field: 'rate', header: 'Rate', width: '5em' },
      { field: 'amount', header: 'Amount', width: '5em' },
      { field: 'discPer', header: 'Disc Per', width: '3em' },
      { field: 'discAmt', header: 'Disc Amt', width: '3em' },
      { field: 'netAmount', header: 'Net Amt', width: '5em' },
      { field: 'edd', header: 'ED date',width:'5em'},
      { field: 'jobCode',header:'Job Code',width:'5em'},
      { field: 'lumpSum', header:'Lump Sum',width:'5em'},
      { field: 'curCode', header: 'Currency', width: '5em' },
      { field: 'curRate', header: 'Cur. Rate', width: '3em' },
      { field: 'refCo', header: 'Ref CO', width: '3em' },
      { field: 'refDv', header: 'Ref DV', width: '3em' },
      { field: 'refBr', header: 'Ref BR', width: '3em' },
      { field: 'refInt', header: 'Ref INT', width: '3em' },
      { field: 'refVrNo', header: 'Ref VRNO', width: '4em' },
      { field: 'refSrNo', header: 'Ref SRNO', width: '4em' },
      { field: 'cancel', header: 'Cancel', width: '4em' },
      { field: 'itemRate', header: 'Item Rate', width: '5em' },
      { field: 'srNo', header: 'Sr No', width: '4em' },
      { field: 'batch', header: 'Batch', width: '5em' },
      { field: 'retQty', header: 'Ret Qty', width: '5em' },
    ];
  }

  getLovData() {
    this.lumpSumLovData = [
      { label: 'Quantity', value: 'Q' },
      { label: 'Lump Sum', value: 'L' },
      { label: 'Open', value: 'O' },
    ];

    this.vatTypeLovData = [
      { label: 'Refund', value: 'R' },
      { label: 'Cost', value: 'C' },
      { label: 'No VAT', value: 'N' }
    ]

    this.popUpLovService.getUnitLov().then(data => { this.unitData = data['data'] })
    this.popUpLovService.getJobLov().then(data => { this.ijjobLovData = data['data'] })
    this.popUpLovService.getAccountsLov().then((res: Iac4Dto[]) => { this.accountData = res['data']; });
    this.popUpLovService.getVatCatLov().then((res: IcvatcatDto[]) => { this.vatCatData = res['data']; })
  }

  async onUnitSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.unitData, this.unitLovColumns);
    ref.onClose.subscribe((selectedRow: IiunitLovDto) => {
      if (selectedRow) {
        this.service.header.iapodetail[rowIndex].uom = selectedRow.code;
        this.service.header.iapodetail[rowIndex].unitName = selectedRow.name;
      }
    });
  }

 async onvatCatSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.vatCatData,this.vatCatLovColumns);
    ref.onClose.subscribe((selectedRow: IcvatcatDto) => {
      if (selectedRow) {
        this.service.header.iapodetail[rowIndex].vatCat = selectedRow.code;
        this.service.header.iapodetail[rowIndex].vatPer = selectedRow.vatPer;
        this.service.header.iapodetail[rowIndex].vatType = selectedRow.vatType;
        this.service.header.iapodetail[rowIndex].vatAc = selectedRow.acCode;
      }
    });
  }

  async onAccountSelection(rowIndex: number) {

    const ref = this.actionService.showPopUp(this.accountData, this.accountLovColumns);
    ref.onClose.subscribe((account: Iac4Dto) => {
      if (account) {
        this.service.header.iapodetail[rowIndex].acCode = account.acCode;
        this.service.header.iapodetail[rowIndex].acName = account.acName;
        this.service.header.iapodetail[rowIndex].curCode = account.curCode;
        this.currencyService.getCurrencyDetails(account.curCode).then((res: IccurrencyDto) => {
          this.service.header.iapodetail[rowIndex].curRate = res.curRate
        }, (err) => {
          // console.warn("==err==", err.error.messege);
        });
      }
    });
  }
  

  convertToFloat(value){
// console.log('value=>',value);

    if(value && value != '' && value != null && value != undefined)
    return parseFloat(value)
  }


  async onJobSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.ijjobLovData, this.ijjobLovCols);
    ref.onClose.subscribe((selectedRow: IjjobLovDto) => {
      if (selectedRow) {
        this.service.header.iapodetail[rowIndex].jobCode = selectedRow.jobCode;
      }
    });
  }

  changeDetailDiscount(rowIndex: number, flag: string) {
    const selectedRow = this.service.header.iapodetail[rowIndex];
    const amount = (selectedRow.qty != null ? selectedRow.qty : 0) * (selectedRow.rate != null ? selectedRow.rate : 0);
    if (flag === 'P')
      selectedRow.discAmt = amount * (selectedRow.discPer != null ? selectedRow.discPer : 0) / 100;
    else (flag == 'A' && amount > 0)
      selectedRow.discPer = (selectedRow.discAmt != null ? selectedRow.discAmt : 0) * 100 / amount;

    const totalDiscAmt = this.getDiscTotal();
    const totalAmt = this.getTotalAmount();
    this.service.header.discAmt = this.actionService.round(totalDiscAmt != null ? totalDiscAmt : 0, this.service.amtDecPts);
    if (totalAmt > 0)
      this.service.header.discPer = this.actionService.round((totalDiscAmt != null ? totalDiscAmt : 0) * 100 / totalAmt, this.service.amtDecPts);  
  }


  getTotalAmount(): number {
    if (this.service.header.iapodetail && this.service.header.iapodetail.length > 0) {
      const total = this.service.header.iapodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.qty * current.rate).toString()), 0);
      return total;
    }
    return 0;
  }

  getNetTotal(): number {
    if (this.service.header.iapodetail && this.service.header.iapodetail.length > 0) {
      const total = this.service.header.iapodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.qty * current.rate).toString())
          - parseFloat(current.discAmt.toString()), 0);
      return total;
    }
    return 0;
  }

  getDiscTotal(): number {
    console.log('Service => ',this.service);
    
    if (this.service.header.iapodetail && this.service.header.iapodetail.length > 0) {
      const total = this.service.header.iapodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat(current.discAmt.toString()), 0);
      return total;
    }
    return 0;
  }

  
  getUnitName(unit: string) {
    const unitRow = this.unitData.find((row) => row.code == unit);
    if (unitRow)
      return unitRow.name;
    else
      return null;
  }


  createInsertRow() {

    this.actionService.currentComponent.createInsertRow();

  }

  deleteRow() {
    this.actionService.currentComponent.deleteDetailRow();
  }

}
