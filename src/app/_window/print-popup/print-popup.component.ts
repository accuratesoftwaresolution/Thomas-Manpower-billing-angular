import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-popup',
  templateUrl: './print-popup.component.html',
  styleUrls: ['./print-popup.component.scss']
})
export class PrintPopupComponent implements OnInit {


  @Input() PrintFormatType: any = '';

  
  constructor() { }

  ngOnInit(): void {
  }

}
