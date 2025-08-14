import { Directive, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BranchSelectionService } from '@accurate/branch-selection';
// import { BranchSelectionService } from '../branch-selection.service';

/*
    Created By    : Arun Joy
    Created On    : 20-03-2020
    Created For   : For Rate feilds decimal formatting.
*/

@Directive({
  selector: '[ictRate]',
  host: {
    '[value]': 'ictRate',
    '(change)': 'change($event.target.value)',
  }
})
export class RateDirective {

  @Input() ictRate: number;
  @Output() ictRateChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _decimalPipe: DecimalPipe,
    private _branchSelection: BranchSelectionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.format(this.ictRate);
  }

  change(value) {
    this.format(value, "C");
  }

  format(value, flag?: string) {
    value = (value && value.toString()) ? (value.toString().replace(/,/gi, "")) : 0;
    let pattern = "1."+this._branchSelection.icoValues.amtDecPts+"-"+this._branchSelection.icoValues.amtDecPts;
    value = this._decimalPipe.transform(value, pattern);
    value = value.replace(/,/gi, "");
    this.ictRateChange.next(value);
    if (!flag || flag != "C")
      this._cdr.detectChanges();
  }

}
