import { BranchSelectionService } from '@accurate/branch-selection';
import { MasterService } from '@accurate/providers';
import { ActionService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { IitermsLovDto } from 'src/app/_dto/lov/iiterms-lov.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-iiposupexp',
  templateUrl: './iiposupexp.component.html',
  styleUrls: ['./iiposupexp.component.scss']
})
export class IiposupexpComponent implements OnInit {

  columns: { field: string; header: string; width: string, sort?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];
  itemLovColumns: any = [];
  service = this.actionService.currentComponent.service;

  totalAmountSign: number = this.branchSelection.iintValues.drCr;
  drCrLovData = [];
  vatTypeLovData = [];
  iitermsLovData: IitermsLovDto[] = [];
  iitermsLovCols = [
    { field: 'name', header: 'Name', width: '50%' },
    { field: 'termType', header: 'Term Type', width: '50%' }
  ];
  vatInOutLovData: any[] = [];
  vatInOutLovCols = [
    { field: 'code', header: 'Code', width: '15em' },
    { field: 'name', header: 'Name', width: '15em' },
    { field: 'inoutAc', header: 'In-Out Ac', width: '15em' },
    { field: 'rcmAc', header: 'RCM Ac', width: '15em' }
  ];

  vatCatLovData: any[] = [];
  vatCatLovCols = [
    { field: 'code', header: 'Code', width: '15em' },
    { field: 'name', header: 'VAT Category', width: '15em' },
    { field: 'vatPer', header: 'VAT %', width: '15em' },
    { field: 'status', header: 'Status', width: '15em' },
    { field: 'vatType', header: 'vatType', width: '15em' },
    { field: 'acCode', header: 'Account', width: '15em' },
  ];


  constructor(
    private actionService: ActionService,
    private branchSelection: BranchSelectionService,
    private _masterService: MasterService,
  ) {

  }
  ngOnInit(): void {
    this.getAllLovData();
  }

  getAllLovData() {
    this.drCrLovData = [
      { label: 'Dr', value: '1' },
      { label: 'Cr', value: '-1' }
    ];

    this.columns = [
      { field: 'particulars', header: 'Particulars', width: '70%', disableAfterSave: false },
      { field: 'amt', header: 'Amount', width: '25%' },
      { field: 'signInt', header: '[#]', width: '5%' },
    ];

    this.vatTypeLovData = [
      { label: 'Refund', value: 'R' },
      { label: 'Cost', value: 'C' },
      { label: 'No VAT', value: 'N' }
    ]

    this._masterService.getMasterData(apiUrl.vatCat).then(res => this.vatCatLovData = res['data']);
    this._masterService.getMasterData(apiUrl.vatInOut).then(res => this.vatInOutLovData = res['data']);
    this._masterService.getMasterData(apiUrl.terms, 'where[termType]=6').then(res => this.iitermsLovData = res['data']);
  }

  async onParticulars(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iitermsLovData, this.iitermsLovCols);
    ref.onClose.subscribe((selectedRow: IitermsLovDto) => {
      if (selectedRow) {
        this.service.header.iiposupexp[rowIndex].particulars = selectedRow.name;
      }
    });
  }

  getTotSupExpAmount(): number {
    if (this.service.header.iiposupexp && this.service.header.iiposupexp.length > 0) {
      const total = this.service.header.iiposupexp.reduce((sum, current) => parseFloat(sum ? sum.toString() : 0) + parseFloat(current.amt ? (current.amt).toString() : 0), 0);
      return total;
    }
    return 0;
  }

  vatInoutSelection(rowIndex) {
    const ref = this.actionService.showPopUp(this.vatInOutLovData, this.vatInOutLovCols);
    ref.onClose.subscribe((selectedRow: any) => {
      if (selectedRow) {
        this.service.header.iiposupexp[rowIndex].vatInout = selectedRow.code;
      }
    });
  }

  vatCatSelection(rowIndex) {
    const ref = this.actionService.showPopUp(this.vatCatLovData, this.vatCatLovCols);
    ref.onClose.subscribe((selectedRow: any) => {
      if (selectedRow) {
        this.service.header.iiposupexp[rowIndex].vatCat = selectedRow.code;
        this.service.header.iiposupexp[rowIndex].vatPer = selectedRow.vatPer;
        // this.service.header.iiposupexp[rowIndex].vatCat = selectedRow.status;
        this.service.header.iiposupexp[rowIndex].vatType = selectedRow.vatType;
        this.service.header.iiposupexp[rowIndex].vatAc = selectedRow.acCode;
      }
    });
  }
}
