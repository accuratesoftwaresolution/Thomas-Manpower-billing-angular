import { DatePipe } from '@angular/common';
import { Directive, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';

/*
    Created By    : Arun Joy
    Created On    : 20-03-2020
    Created For   : For Date feilds date conversions.
*/

@Directive({
  selector: '[ictDate]',
  host: {
    '(blur)': 'change($event)',
  }
})
export class DateDirective {
  // '[value]': 'ictDate',
  @Input() ictDate: Date;
  @Output() ictDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  constructor(
    private _datePipe: DatePipe,
    private _cdr: ChangeDetectorRef
  ) { }

  ngOnInt(){
    new Date(this.transformDate(this.ictDate));
    this.ictDateChange.next(this.ictDate);
    this._cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const preValue = this.transformDate(changes.ictDate.previousValue);
    const curValue = this.transformDate(changes.ictDate.currentValue);
    if(preValue.toString()==curValue.toString())
      {     
        this._cdr.detectChanges(); 
        return;
      }
    // this._actionService.transformDate(changes.
    this.format(changes.ictDate.currentValue);
  }

  change(value) {
    // this.format(value);
  }

  format(value) {
    value = new Date(this.transformDate(value));
    this.ictDateChange.next(value);
    this._cdr.detectChanges();
  }

  transformDate(date: Date): Date {
    return new Date(this._datePipe.transform(date, 'yyyy-MM-dd'));
  }

}
