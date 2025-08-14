import { Directive, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BranchSelectionService } from '@accurate/branch-selection';
// import { BranchSelectionService } from '../branch-selection.service';

/*
    Created By    : Arun Joy
    Created On    : 20-03-2020
    Created For   : For Currency Rate feilds decimal formatting.
*/

@Directive({
  selector: '[ictCurrencyRate]',
  host: {
    '[value]': 'ictCurrencyRate',
    '(change)': 'change($event.target.value)',
  }
})
export class CurrencyRateDirective {

  @Input() ictCurrencyRate: number;
  @Output() ictCurrencyRateChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _decimalPipe: DecimalPipe,
    private _branchSelection: BranchSelectionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.format(this.ictCurrencyRate);
  }

  change(value) {
    this.format(value, "C");
  }

  format(value, flag?: string) {
    if(!value){
      value=0;
    }
    value = (value && value.toString()) ? (value.toString().replace(/,/gi, "")) : 0;
    let pattern = "1.6-6";
    value = this._decimalPipe.transform(value, pattern);
    value = value.replace(/,/gi, "");
    this.ictCurrencyRateChange.next(value);
    if (!flag || flag != "C")
      this._cdr.detectChanges();
  }

}
