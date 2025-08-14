import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, Toast } from '@accurate/toolbar';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { IadetailDto } from 'src/app/_dto/iadetail.dto';
import { IbillDto } from 'src/app/_dto/ibill.dto';
import { PendingBillDto } from 'src/app/_dto/other/pendingBill.dto';
import { AccountsService } from 'src/app/_providers/accounts.service';


@Component({
  selector: 'app-ibill',
  templateUrl: './ibill.component.html',
  styleUrls: ['./ibill.component.scss']
})
export class IbillComponent implements OnInit {

  @Input() display: boolean;
  @Input() selectedIndex: number;
  @Output() public returnValue = new EventEmitter();

  @ViewChild(Table, { static: false }) billDt: Table;

  service = this.actionService.currentComponent.service;

  billCols = [];
  billTable: PendingBillDto[] = [];

  selectedBill: PendingBillDto;

  showAllBrBill: boolean = false;
  getTotalFAllocate: number;
  enableEdit: boolean = false;
  icoData: any;
  lazyLoadEnable: boolean = false;
  selectedRowData: any;

  constructor(
    // private service: FinanceService,
    public actionService: ActionService,
    private _errorTanslateService: ErrorTranslateService,
    private _messageService: MessageService,
    private accountsService: AccountsService,
  ) { }

  ngOnInit() {
    this.initization();
  }

  popUpEvent($event) {
    this.showAllBrBill = false;
    this.getBillPopUp();
  }

  handleInsert($event) {
    const iadetail = this.service.header.iadetail[this.selectedIndex];
    // commented for the proper working of ibill componet
    let newRow = new PendingBillDto();
    newRow.acAmt = 0;
    newRow.acCode = iadetail.acCode;
    newRow.allocate = 0;
    // newRow.billDate = new Date(this.datePipe.transform(new Date(), "dd/MM/yyyy"));
    newRow.billDate = new Date();
    newRow.billNo = "";
    newRow.curCode = iadetail.curCode;
    newRow.curRate = iadetail.curRate;
    // newRow.dueDate = new Date(this.datePipe.transform(new Date(), "dd/MM/yyyy"));;
    newRow.dueDate = new Date();
    newRow.fAcAmt = 0;
    newRow.fAllocate = 0;
    newRow.fSignInt = iadetail.signInt;
    newRow.fToAllocate = 0;
    newRow.fToAllocateSignInt = iadetail.signInt;
    newRow.iadetailIndex = this.selectedIndex;
    newRow.interBrCode = iadetail.interBrCode;
    newRow.refBr = iadetail.brCode;
    newRow.refCo = iadetail.coCode;
    newRow.refDv = iadetail.dvCode;
    newRow.refInt = iadetail.intCode;
    newRow.refVrNo = iadetail.vrNo;
    newRow.signInt = iadetail.signInt;
    newRow.toAllocate = 0;
    newRow.toAllocateSignInt = iadetail.signInt;
    newRow = this.calculateBillBalance(newRow);

    // let newRow: IccountryDto = new IccountryDto();
    // this.country.splice(this.getSelectedRowIndex()+1, 0, newRow);
    let idx = this.billTable.indexOf(this.selectedBill);
    this.billTable.splice(idx + 1, 0, newRow);
    // this.billTable.push(newRow);
  }

  loadDataLazy(event: LazyLoadEvent) {
    this.service.getFilteredData(event).subscribe(res => {
      this.billTable = res.data;
    });
  }

  async handleSave($event) {
    const index = this.selectedIndex;

    let iadetail: IadetailDto = this.service.header.iadetail[index];
    let oldBill: IbillDto[] = [];
    oldBill = iadetail.ibill;
    iadetail.ibill = [];

    let srNo = 1;

    let totalBillToAllocate: number = 0;
    let totalBillToFAllocate: number = 0;

    let interBrBill: any = new Map();

    await this.billTable.forEach((row) => {

      iadetail = this.service.header.iadetail[index];
      srNo = this.service.header.iadetail[index].ibill.length + 1
      if (row.allocate != 0 || row.fAllocate != 0) {

        let newbill: IbillDto = new IbillDto();

        if (row.interBrCode !== iadetail.interBrCode) {

          if (interBrBill.get(row.interBrCode)) {
            iadetail = interBrBill.get(row.interBrCode);
            srNo = interBrBill.get(row.interBrCode).ibill.length + 1;
            iadetail.acAmt = (iadetail.signInt * iadetail.acAmt) + (row.allocate ? parseFloat(row.allocate.toString()) : 0);
            iadetail.fAcAmt = (iadetail.signInt * iadetail.fAcAmt) + (row.fAllocate ? parseFloat(row.fAllocate.toString()) : 0);
            iadetail.signInt = iadetail.acAmt < 0 ? -1 : 1;
            iadetail.acAmt = Math.abs(iadetail.acAmt);
            iadetail.fAcAmt = Math.abs(iadetail.fAcAmt);
          } else {
            iadetail = Object.assign({}, this.service.header.iadetail[index]);
            iadetail.ibill = [];
            iadetail.interBrCode = row.interBrCode;
            srNo = 1;
            iadetail.signInt = iadetail.signInt * row.allocate <= 0 ? -1 : 1
            iadetail.acAmt = Math.abs(row.allocate ? parseFloat(row.allocate.toString()) : 0);
            iadetail.fAcAmt = Math.abs(row.fAllocate ? parseFloat(row.fAllocate.toString()) : 0);
            iadetail.srNo = interBrBill.size + ((this.service.header.iadetail.length == 0) ? 1 : ((Math.max.apply(null, this.service.header.iadetail.map(x => x.srNo))) + 1));

            interBrBill.set(row.interBrCode, iadetail);
          }
          this.service.header.iadetail[index].acAmt = this.service.header.iadetail[index].acAmt - row.allocate;
          this.service.header.iadetail[index].fAcAmt = this.service.header.iadetail[index].fAcAmt - row.fAllocate;
          this.service.header.iadetail[index].signInt = this.service.header.iadetail[index].acAmt < 0 ? (this.service.header.iadetail[index].signInt * -1) : (this.service.header.iadetail[index].signInt)
          this.service.header.iadetail[index].acAmt = Math.abs(this.service.header.iadetail[index].acAmt);
          this.service.header.iadetail[index].fAcAmt = Math.abs(this.service.header.iadetail[index].fAcAmt);
        } else {
          totalBillToAllocate += (row.allocate ? parseFloat(row.allocate.toString()) : 0)
          totalBillToFAllocate += (row.fAllocate ? parseFloat(row.fAllocate.toString()) : 0);
        }

        newbill.coCode = iadetail.coCode;
        newbill.dvCode = iadetail.dvCode;
        newbill.brCode = iadetail.brCode;
        newbill.intCode = iadetail.intCode;
        newbill.vrNo = iadetail.vrNo;
        newbill.dsrNo = iadetail.srNo;
        newbill.srNo = srNo++;
        newbill.vrDate = iadetail.vrDate;
        newbill.acCode = iadetail.acCode;
        newbill.billNo = row.billNo;
        newbill.billDate = row.billDate;
        newbill.dueDate = row.dueDate;
        newbill.acAmt = Math.abs(row.allocate);
        newbill.fAcAmt = Math.abs(row.fAllocate);
        newbill.curCode = row.curCode;
        newbill.curRate = row.curRate;
        newbill.signInt = iadetail.signInt * row.allocate <= 0 ? -1 : 1;
        newbill.hAcCode = row.acCode;
        newbill.interBrCode = row.interBrCode;
        newbill.void = iadetail.void;
        newbill.refCo = row.refCo;
        newbill.refDv = row.refDv;
        newbill.refBr = row.refBr;
        newbill.refInt = row.refInt;
        newbill.refVrNo = row.refVrNo;

        iadetail.ibill.push(newbill);
      }
    });

    for (let row of this.service.header.iadetail[index].ibill) {
      if (!row.billNo || row.billNo == null) {
        this._messageService.add({ severity: 'info', summary: 'Bill Allocation', detail: this._errorTanslateService.translate("billNoCannotbeNull") });
        return
      }
    }
    iadetail = this.service.header.iadetail[index];

    if ((totalBillToAllocate * iadetail.signInt) != (iadetail.acAmt * iadetail.signInt)) {
      iadetail.ibill = oldBill;
      this._messageService.add({ severity: 'info', summary: 'Bill Allocation', detail: this._errorTanslateService.translate("acAmtnotMatch") });
      return;
    }
    if ((totalBillToFAllocate * iadetail.signInt) != (iadetail.fAcAmt * iadetail.signInt)) {
      iadetail.ibill = oldBill;
      this._messageService.add({ severity: 'info', summary: 'Bill Allocation', detail: this._errorTanslateService.translate("facAmountnotMatch") });
      return;
    }
    interBrBill.forEach((element) => {
      this.service.header.iadetail.push(element);
    });
    this.returnValue.emit(false);
  }

  //modified by Ajith A pradeep
  //modified for bill selection colour change(16/12/2021)

  rowSelection( rowdata) {
    this.selectedRowData=rowdata;
  }

  handleDelete($event) {

    let idx = this.billTable.indexOf(this.selectedBill);
    this.billTable.splice(idx, 1);
  }

  handleAll($event) {
    if (this.showAllBrBill)
      return;

    this.showAllBrBill = true;
    this.getBillPopUp();
  }

  handleClose(event) {
    this.returnValue.emit(false);
  }

  getBillPopUp() {
    // this.accountsService.getCompanyDetails().then(data => {
    //   this.icoData = data;
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });


    let row = this.service.header.iadetail[this.selectedIndex];

    this.service.getPendingBills(row.coCode, row.dvCode, row.brCode, row.intCode, row.vrNo, row.acCode).then((res: PendingBillDto[]) => {

      if (this.showAllBrBill) {
        this.billTable.push.apply(this.billTable, res.filter((pendingBillRow) => pendingBillRow.interBrCode != row.interBrCode))
        this.billDt.reset();
      }
      else this.billTable = res.filter((pendingBillRow) => pendingBillRow.interBrCode === row.interBrCode);

      this.billTable.forEach((billRow) => {
        billRow.signInt = 1;
        billRow.toAllocateSignInt = 1;
        if (billRow.acAmt < 0) {
          billRow.acAmt = Math.abs(billRow.acAmt);
          billRow.signInt = -1;
          // billRow.signInt = billRow.signInt * -1;
        }

        billRow.fSignInt = 1;
        billRow.fToAllocateSignInt = 1;
        if (billRow.fAcAmt < 0) {
          billRow.fAcAmt = Math.abs(billRow.fAcAmt);
          billRow.fSignInt = -1;
          // billRow.fSignInt = billRow.fSignInt * -1;
        }

        billRow = this.calculateBillBalance(billRow);
        billRow.iadetailIndex = this.selectedIndex;
      });

      const ibill = this.service.header.iadetail[this.selectedIndex].ibill;
      if (ibill && ibill.length > 0) {
        ibill.forEach((billRow) => {
          let existFlag = false;
          this.billTable.forEach((pendingBillrow) => {
            if (billRow.interBrCode === pendingBillrow.interBrCode && billRow.billNo === pendingBillrow.billNo && billRow.refBr === pendingBillrow.refBr && billRow.refInt === pendingBillrow.refInt && billRow.refVrNo === pendingBillrow.refVrNo) {
              existFlag = true;

              pendingBillrow.allocate = billRow.acAmt * billRow.signInt * row.signInt;
              pendingBillrow.fAllocate = billRow.fAcAmt * billRow.signInt * row.signInt;

              pendingBillrow = this.calculateBillBalance(pendingBillrow);
            }
          });

          if (!existFlag) {
            let newRow: PendingBillDto = new PendingBillDto();
            newRow.acAmt = 0;
            newRow.acCode = billRow.acCode;
            newRow.allocate = billRow.acAmt * billRow.signInt * row.signInt;
            newRow.billDate = billRow.billDate;
            newRow.billNo = billRow.billNo;
            newRow.curCode = billRow.curCode;
            newRow.curRate = billRow.curRate;
            newRow.dueDate = billRow.dueDate;
            newRow.fAcAmt = 0;
            newRow.fAllocate = billRow.fAcAmt * billRow.signInt * row.signInt;
            newRow.fSignInt = 1;
            newRow.fToAllocate = 0;
            newRow.fToAllocateSignInt = 1;
            newRow.iadetailIndex = this.selectedIndex;
            newRow.interBrCode = billRow.interBrCode;
            newRow.refBr = billRow.refBr;
            newRow.refCo = billRow.refCo;
            newRow.refDv = billRow.refDv;
            newRow.refInt = billRow.refInt;
            newRow.refVrNo = billRow.refVrNo;
            newRow.signInt = 1;
            newRow.toAllocate = 0;
            newRow.toAllocateSignInt = 1;
            newRow = this.calculateBillBalance(newRow);

            this.billTable.push(newRow);
          }

        });
      }

    }, (err) => {
      // console.warn('------ err--', err);
    });
    this.lazyLoadEnable = true;
  }


  changeBillAmt(idx?: number) {
    let row: PendingBillDto = this.billTable[idx];

    if (row.curCode.trim() === this.icoData.baseCurCode)
      row.fAllocate = row.allocate;

    row = this.calculateBillBalance(row);
  }

  isDisable() {
    const index = this.selectedIndex;
    if (this.service.header) {
      if (this.service.header.iadetail[index] && this.service.header.iadetail[index].curCode.trim() === this.icoData.baseCurCode) {
        this.enableEdit = false;
      }
      else
        this.enableEdit = true;
      return this.enableEdit
    }
  }

  changeBillFAmt(idx?: number) {

    let row: PendingBillDto = this.billTable[idx];

    if (row.curCode.trim() === this.icoData.baseCurCode)
      row.allocate = row.fAllocate;
    row = this.calculateBillBalance(row);


  }

  calculateBillBalance(row: PendingBillDto): PendingBillDto {
    const iadetail = this.service.header.iadetail[this.selectedIndex];
    row.toAllocateSignInt = 1; //iadetail.signInt;

    row.toAllocate = (row.acAmt * row.signInt) + ((row.allocate ? parseFloat(row.allocate.toString()) : 0) * iadetail.signInt);

    if (row.toAllocate < 0) {
      row.toAllocate = Math.abs(row.toAllocate);
      row.toAllocateSignInt = -1
      // * iadetail.signInt;
    }

    row.fToAllocateSignInt = iadetail.signInt;
    row.fToAllocate = (row.fAcAmt * row.fSignInt) + ((row.fAllocate ? parseFloat(row.fAllocate.toString()) : 0) * iadetail.signInt);
    if (row.fToAllocate < 0) {
      row.fToAllocate = Math.abs(row.fToAllocate);
      row.fToAllocateSignInt = -1
      // * iadetail.signInt;
    }
    return row;
    /*  */
  }

  itemClick(event: Event, item: MenuItem, index: number) {
    if (item.command) {
      item.command(index);
    }
  }

  //Modified by Ajith A Pradeep 
  //Modified for F allocate field need to scroll to input data (16/12/2021) 

  initization() {
    this.billCols = [
      { field: 'interBrCode', header: 'br.', style: { 'width': '3em' } },
      { field: 'billNo', header: 'billNo', style: { 'width': '9em' }, editable: true, maxlength: 20 },
      { field: "billDate", header: 'billDate', style: { 'width': '13em' }, editable: true, pip: "| date:'dd/MM/yyyy'", type: 'date' },
      { field: 'acAmt', header: 'amount', style: { 'width': '8em', 'text-align': 'right' }, type: 'amount' },
      { field: 'signInt', header: 'drCr', style: { 'width': '3em' }, exp: { val: 1, then: 'Dr', els: 'Cr' } },
      { field: 'allocate', header: 'allocate', style: { 'width': '8em', 'text-align': 'right' }, type: 'amount', maxlength: 20, editable: true, command: (ri) => this.changeBillAmt(ri) },
      { field: 'toAllocate', header: 'balance', style: { 'width': '8em', 'text-align': 'right' }, type: 'amount' },
      { field: 'toAllocateSignInt', header: 'drCr', style: { 'width': '3em' }, exp: { val: 1, then: 'Dr', els: 'Cr' } },
      { feild: 'dueDate', header: 'dueDate', style: { 'width': '7em' }, pip: "| date:'dd/MM/yyyy'", type: 'date' },
      { field: 'fAcAmt', header: 'fAmount', style: { 'width': '8em', 'text-align': 'right' }, type: 'amount' },
      { field: 'fSignInt', header: 'drCr', style: { 'width': '3em' }, exp: { val: 1, then: 'Dr', els: 'Cr' } },
      { field: 'fAllocate', header: 'fAllocate', style: { 'width': '8em', 'text-align': 'right' }, type: 'amount', editable: this.isDisable(), command: (ri) => this.changeBillFAmt(ri) },
      { field: 'fToAllocate', header: 'fBalance', style: { 'width': '8em', 'text-align': 'right' }, type: 'amount' },
      { field: 'fToAllocateSignInt', header: 'drCr', style: { 'width': '3em' }, exp: { val: 1, then: 'Dr', els: 'Cr' } },
      { field: 'curCode', header: '$', style: { 'width': '4em' } },
      { field: 'curRate', header: 'curRate', type: 'curRate', style: { 'width': '7em', 'text-align': 'right' } },
      { field: 'refCo', header: 'refCo', style: { 'width': '5em' } },
      { field: 'refDv', header: 'refDv', style: { 'width': '5em' } },
      { field: 'refBr', header: 'refBr', style: { 'width': '5em' } },
      { field: 'refInt', header: 'refInt', style: { 'width': '5em' } },
      { field: 'refVrNo', header: 'refVrNo', style: { 'width': '5em' } },

    ];
  }

  getIadetailAmount(): number {
    if (this.service.header.iadetail[this.selectedIndex] && this.service.header.iadetail[this.selectedIndex].acAmt)
      return this.service.header.iadetail[this.selectedIndex].acAmt;
    return 0;
  }

  getIadetailFAmount(): number {
    if (this.service.header.iadetail[this.selectedIndex] && this.service.header.iadetail[this.selectedIndex].fAcAmt > 0)
      return this.service.header.iadetail[this.selectedIndex].fAcAmt;
    return 0;
  }

  getIadetailSignInt(): number {
    if (this.service.header.iadetail[this.selectedIndex] && this.service.header.iadetail[this.selectedIndex].signInt)
      return this.service.header.iadetail[this.selectedIndex].signInt;
    return 0;
  }

  getTotalAllocated(): number {
    return this.billTable.reduce((sum, current) => (sum ? parseFloat(sum.toString()) : 0) + (current.allocate ? parseFloat(current.allocate.toString()) : 0), 0);
  }

  getTotalFAllocated(): number {
    return this.billTable.reduce((sum, current) => (sum ? parseFloat(sum.toString()) : 0) + (current.fAllocate ? parseFloat(current.fAllocate.toString()) : 0), 0);
  }


}
