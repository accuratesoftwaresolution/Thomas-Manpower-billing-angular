import { Directive, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BranchSelectionService } from '@accurate/branch-selection';
// import { BranchSelectionService } from '../branch-selection.service';

/*
    Created By    : Arun Joy
    Created On    : 20-03-2020
    Created For   : For Amount feilds decimal formatting.
*/

@Directive({
  selector: '[ictAmount]',
  host: {
    '[value]': 'ictAmount',
    '(change)': 'change($event.target.value)',
  }
})
export class AmountDirective {

  @Input() ictAmount: number;
  @Output() ictAmountChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _decimalPipe: DecimalPipe,
    private _branchSelection: BranchSelectionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.format(this.ictAmount);
  }

  change(value) {
    this.format(value, "C");
  }

  format(value, flag?: string) {
    value = (value && value.toString()) ? (value.toString().replace(/,/gi, "")) : 0;
    let pattern = "1."+this._branchSelection.icoValues.amtDecPts+"-"+this._branchSelection.icoValues.amtDecPts;
    value = this._decimalPipe.transform(value, pattern);
    value = value.replace(/,/gi, "");
    this.ictAmountChange.next(value);
    if (!flag || flag != "C")
      this._cdr.detectChanges();
  }
}
