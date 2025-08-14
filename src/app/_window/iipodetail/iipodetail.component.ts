import { ActionService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { IiitemDto } from 'src/app/_dto/iiitem.dto';
import { IiunitLovDto } from 'src/app/_dto/lov/iiunit-lov.dto';
import { IjjobLovDto } from 'src/app/_dto/lov/ijjob-lov.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';

@Component({
  selector: 'app-iipodetail',
  templateUrl: './iipodetail.component.html',
  styleUrls: ['./iipodetail.component.scss']
})
export class IipodetailComponent implements OnInit {
  columns: { field: string; header: string; width: string, sort?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  itemLovColumns: any = [];
  ijjobLovCols: any = [];
  unitLovColumns: any = [];
  lumpSumLovData = [];
  itemData: IiitemDto[] = [];
  ijjobLovData: IjjobLovDto[] = [];
  unitData: IiunitLovDto[] = [];
  service = this.actionService.currentComponent.service;

  constructor(
    public actionService: ActionService,
    private popUpLovService: PopUpLovService
  ) { }

  ngOnInit(): void {
    this.getMetaDataDetails();
    this.getLovData();
  }

  getMetaDataDetails() {
    this.itemLovColumns = [
      { field: 'itemCode', header: 'Item Code', width: '10em' },
      { field: 'itemName', header: 'Item Name', width: '20em' },
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

    this.columns = [
      { field: 'sortOrder', header: '#', width: '3em' },
      { field: 'itemCode', header: 'Item Code', width: '15em' },
      { field: 'itemName', header: 'Item Name', width: '5em' },
      { field: 'uom', header: 'Uom', width: '3em' },
      { field: 'itemQty', header: 'Qty', width: '5em' },
      { field: 'baseRate', header: 'Item Rate', width: '5em' },
      { field: 'amount', header: 'Amount', width: '5em' },
      { field: 'disPer', header: 'Dis Per', width: '3em' },
      { field: 'disAmt', header: 'Dis Amt', width: '3em' },
      { field: 'addAmt', header: 'Add Amt', width: '5em' },
      { field: 'netAmount', header: 'Net Amt', width: '5em' },
      { field: 'cFactor', header: 'Factor', width: '5em' },
      { field: 'costRate', header: 'Cost Rate', width: '5em' },
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

    this.popUpLovService.getUnitLov().then(data => { this.unitData = data['data'] })
    this.popUpLovService.getJobLov().then(data => { this.ijjobLovData = data['data'] })
    this.popUpLovService.getItemsLov().then((res: IiitemDto[]) => { this.itemData = res['data']; });
  }

  async onUnitSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.unitData, this.unitLovColumns);
    ref.onClose.subscribe((selectedRow: IiunitLovDto) => {
      if (selectedRow) {
        this.service.header.iipodetail[rowIndex].uom = selectedRow.code;
        this.service.header.iipodetail[rowIndex].unitName = selectedRow.name;
      }
    });
  }

  async onItemSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.itemData, this.itemLovColumns);
    ref.onClose.subscribe((iiitem: IiitemDto) => {
      if (iiitem) {
        this.service.header.iipodetail[rowIndex].itemCode = iiitem.itemCode;
        this.service.header.iipodetail[rowIndex].itemName = iiitem.itemName;
        this.service.header.iipodetail[rowIndex].uom = iiitem.baseUnit;
      }
    });
  }
  async onJobSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.ijjobLovData, this.ijjobLovCols);
    ref.onClose.subscribe((selectedRow: IjjobLovDto) => {
      if (selectedRow) {
        this.service.header.iipodetail[rowIndex].jobCode = selectedRow.jobCode;
      }
    });
  }

  changeDetailDiscount(rowIndex: number, flag: string) {
    const selectedRow = this.service.header.iipodetail[rowIndex];
    const amount = (selectedRow.itemQty != null ? selectedRow.itemQty : 0) * (selectedRow.baseRate != null ? selectedRow.baseRate : 0);
    if (flag === 'P')
      selectedRow.disAmt = amount * (selectedRow.disPer != null ? selectedRow.disPer : 0) / 100;
    else
      selectedRow.disPer = (selectedRow.disAmt != null ? selectedRow.disAmt : 0) * 100 / amount;

    const totalDiscAmt = this.getDiscTotal();
    const totalAmt = this.getTotalAmount();
    this.service.header.discAmt = this.actionService.roundAmount(totalDiscAmt != null ? totalDiscAmt : 0);
    this.service.header.discPer = this.actionService.roundAmount((totalDiscAmt != null ? totalDiscAmt : 0) * 100 / totalAmt);
  }


  getTotalAmount(): number {
    if (this.service.header.iipodetail && this.service.header.iipodetail.length > 0) {
      const total = this.service.header.iipodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.itemQty * current.baseRate).toString()), 0);
      return total;
    }
    return 0;
  }

  getNetTotal(): number {
    if (this.service.header.iipodetail && this.service.header.iipodetail.length > 0) {
      const total = this.service.header.iipodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.itemQty * current.baseRate).toString())
        - parseFloat(current.disAmt.toString()) + parseFloat(current.addAmt.toString()), 0);
      return total;
    }
    return 0;
  }

  getDiscTotal(): number {
    if (this.service.header.iipodetail && this.service.header.iipodetail.length > 0) {
      const total = this.service.header.iipodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat(current.disAmt.toString()), 0);
      return total;
    }
    return 0;
  }

  getAddAmtTotal(): number {
    if (this.service.header.iipodetail && this.service.header.iipodetail.length > 0) {
      const total = this.service.header.iipodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat(current.addAmt.toString()), 0);
      return total;
    }
    return 0;
  }

  // createInsertRow() {
  //   this.actionService.currentComponent.createInsertRow();
  //   this.service.selectedDetailRow = new IipodetailDto();
  // }


  // deleteRow() {
  //   this.actionService.currentComponent.deleteDetailRow();
  // }

  convertToFloat(value): number {
    return parseFloat(value)
  }

  decimalClear(rowData){
    if(rowData.baseRate ==0 ||rowData.baseRate ==0.000)
    rowData.baseRate = null

  }
}
