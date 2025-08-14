import { ErrorTranslateService } from '@accurate/providers';
import { ActionService } from '@accurate/toolbar';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';


/*
    Created By   : Arun Joy
    Created On   : 21-01-2020
    Created For  : For Cheque popup (resubale component).
*/

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss']
})
export class ChequeComponent implements OnInit {

  chequeCols: any[];
  selectedCheque: any;
  service = this.actionService.currentComponent.service;

  @Input('display') display: boolean;
  @Output() public returnValue = new EventEmitter();

  constructor(
    // public service: FinanceService,
    public actionService: ActionService,
    private _messageService:MessageService,
    private _errorTanslateService:ErrorTranslateService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  handleClose(event) {
    this.returnValue.emit(false);
  }

  chequeCopyToAll() {
    const idx = this.getSelectedChequeIndex();
    if (idx == -1){
      this._messageService.add({ severity: 'info', summary: 'Bill', detail: this._errorTanslateService.translate("Pleaseselectanyrow") });
      return;
    }
      
    const detail = this.service.header.iadetail;
    detail.forEach((row, inx) => {
      if (idx !== inx) {
        row.chqNo = detail[idx].chqNo;
        row.chqDate = detail[idx].chqDate;
        row.chqBank = detail[idx].chqBank;
      }
    })
    this.returnValue.emit(false);
  }

  itemClick(event: Event, item: MenuItem, index: number) {

    if (item.command) {
      item.command(index);
    }
  }

  getSelectedChequeIndex() {
    return this.service.header.iadetail.indexOf(this.selectedCheque);
  }

  initialize() {

    this.chequeCols = [
      { field: 'acCode', header: 'Ac Code', style: { 'width': '7em' }, maxlength: 9 },
      { field: 'acName', header: 'Ac Name', style: { 'width': '17em' } },
      { field: 'chqNo', header: 'Cheque No', style: { 'width': '11em' }, editable: true, maxlength: 25 },
      { field: 'acAmt', header: 'Amount', style: { 'width': '10em', 'text-align': 'right' }, },
      { field: 'chqBank', header: 'Chq Bank', style: { 'width': '15em' }, editable: true, maxlength: 10 },
      { field: "chqDate", header: 'Chq Date', style: { 'width': '10em' }, pip: "| date:'dd/MM/yyyy'", editable: true, type: 'date' },
      { field: 'signInt', header: 'Dr/Cr', style: { 'width': '7em' }, exp: { val: 1, then: 'Dr', els: 'Cr' } },
      { field: 'refInt', header: 'Ref Int', style: { 'width': '7em' } },
      { field: 'refVrNo', header: 'Ref VrNo', style: { 'width': '7em', 'text-align': 'right' } },
    ];
  }


}
