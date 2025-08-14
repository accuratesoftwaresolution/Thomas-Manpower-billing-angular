
import { ActionService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { IiitemDto } from 'src/app/_dto/iiitem.dto';
import { IiunitLovDto } from 'src/app/_dto/lov/iiunit-lov.dto';
import { IjjobLovDto } from 'src/app/_dto/lov/ijjob-lov.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';

@Component({
  selector: 'app-iisodetail',
  templateUrl: './iisodetail.component.html',
  styleUrls: ['./iisodetail.component.scss']
})
export class IisodetailComponent implements OnInit {

  columns: { field: string; header: string; width: string, sort?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  itemLovColumns: any = [];
  ijjobLovCols: any = [];
  unitLovColumns: any = [];
  lumpSumLovData = [];
  itemData: IiitemDto[] = [];
  ijjobLovData: IjjobLovDto[] = [];
  vatTypeLovData = [];
  unitData: IiunitLovDto[] = [];
  service = this.actionService.currentComponent.service;

  constructor(
    public actionService: ActionService,
    private popUpLovService: PopUpLovService,
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

    this.vatTypeLovData = [
      { label: 'Refund', value: 'R' },
      { label: 'Cost', value: 'C' },
      { label: 'No VAT', value: 'N' }
    ]

    this.columns = [];
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
        this.service.header.iisodetail[rowIndex].uom = selectedRow.code;
        // this.service.header.iisodetail[rowIndex].unitName = selectedRow.name;
      }
    });
  }

  async onItemSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.itemData, this.itemLovColumns);
    ref.onClose.subscribe((iiitem: IiitemDto) => {
      if (iiitem) {
        this.service.header.iisodetail[rowIndex].itemCode = iiitem.itemCode;
        this.service.header.iisodetail[rowIndex].itemName = iiitem.itemName;
        this.service.header.iisodetail[rowIndex].uom = iiitem.baseUnit;
      }
    });
  }
  async onJobSelection(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.ijjobLovData, this.ijjobLovCols);
    ref.onClose.subscribe((selectedRow: IjjobLovDto) => {
      if (selectedRow) {
        this.service.header.iisodetail[rowIndex].jobCode = selectedRow.jobCode;
      }
    });
  }

  changeDetailDiscount(rowIndex: number, flag: string) {
    const selectedRow = this.service.header.iisodetail[rowIndex];
    const amount = (selectedRow.itemQty != null ? selectedRow.itemQty : 0) * (selectedRow.baseRate != null ? selectedRow.baseRate : 0);
    if (flag === 'P')
      selectedRow.disAmt = amount * (selectedRow.disPer != null ? selectedRow.disPer : 0) / 100;
    else (flag == 'A' && amount > 0)
    selectedRow.disPer = (selectedRow.disAmt != null ? selectedRow.disAmt : 0) * 100 / amount;

    const totalDiscAmt = this.getDiscTotal();
    const totalAmt = this.getTotalAmount();
    this.service.header.discAmt = this.actionService.round(totalDiscAmt != null ? totalDiscAmt : 0, this.service.amtDecPts);
    if (totalAmt > 0)
      this.service.header.discPer = this.actionService.round((totalDiscAmt != null ? totalDiscAmt : 0) * 100 / totalAmt, this.service.amtDecPts);
    if (this.service.header.discPer > 100){

    }
  }


  getTotalAmount(): number {
    if (this.service.header.iisodetail && this.service.header.iisodetail.length > 0) {
      const total = this.service.header.iisodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.itemQty * current.baseRate).toString()), 0);
      return total;
    }
    return 0;
  }

  getNetTotal(): number {
    if (this.service.header.iisodetail && this.service.header.iisodetail.length > 0) {
      const total = this.service.header.iisodetail.reduce((sum, current) =>
        parseFloat(sum.toString()) + parseFloat((current.itemQty * current.baseRate).toString())
        - parseFloat(current.disAmt.toString()), 0);
      return total;
    }
    return 0;
  }

  getDiscTotal(): number {
    if (this.service.header.iisodetail && this.service.header.iisodetail.length > 0) {
      const total = this.service.header.iisodetail.reduce((sum, current) =>
        (sum ? parseFloat(sum.toString()) : 0) + (current.disAmt ? parseFloat(current.disAmt.toString()) : 0), 0);
      return total;
    }
    return 0;
  }

  convertToFloat(value): number {
    return parseFloat(value)
  }

  getUnitName(unit: string) {
    const unitRow = this.unitData.find((row) => row.code == unit);
    if (unitRow)
      return unitRow.name;
    else
      return null;
  }
}
