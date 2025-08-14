import { Directive, ChangeDetectorRef, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
// import { BranchSelectionService } from '../branch-selection.service';
import { DecimalPipe } from '@angular/common';
import { BranchSelectionService } from '@accurate/branch-selection';

/*
    Created By    : Arun Joy
    Created On    : 21-03-2020
    Created For   : For Qty feilds decimal formatting.
*/

@Directive({
  selector: '[ictQty]',
  host: {
    '[value]': 'ictQty',
    '(change)': 'change($event.target.value)',
  }
})
export class QtyDirective {

  @Input() ictQty: number;
  @Output() ictQtyChange: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(
    private _cdr: ChangeDetectorRef,
    private _decimalPipe: DecimalPipe,
    private _branchSelection: BranchSelectionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.format(this.ictQty);
  }

  change(value) {
    this.format(value, "C");
  }  

  format(value, flag?: string) {
    value = (value && value.toString()) ? (value.toString().replace(/,/gi, "")) : 0;
    let pattern = "1."+this._branchSelection.idvValues.qtyDecPts+"-"+this._branchSelection.idvValues.qtyDecPts;
    value = this._decimalPipe.transform(value, pattern);
    value = value.replace(/,/gi, "");
    this.ictQtyChange.next(value);
    if (!flag || flag != "C")
      this._cdr.detectChanges();
  }

}
