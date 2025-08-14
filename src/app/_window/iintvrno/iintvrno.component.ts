import { FormAlignerDto } from '@accurate/dto';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-iintvrno',
  templateUrl: './iintvrno.component.html',
  styleUrls: ['./iintvrno.component.scss']
})
export class IintvrnoComponent implements OnInit {

  @Input('service') mainService: any;

  columnMetaData: FormAlignerDto[] = [];
  constructor(
  ) { }

  ngOnInit(): void {
    this.getColumnInfo();
  }

  getColumnInfo() {
    // this.columnMetaData = [
    //   { columnName: 'coCode', size: 4, labelCode: 'coCode', maxlength: 2 },
    //   { columnName: 'intCode', size: 4, labelCode: 'intCode', maxlength: 2 },
    //   { columnName: 'dvCode', size: 4, labelCode: 'dvCode', maxlength: 2 },
    //   { columnName: 'brCode', size: 4, labelCode: 'brCode', maxlength: 2 },
    //   { columnName: 'vrNo', size: 4, labelCode: 'vrNo', maxlength: 2 },
    // ];
  }

}
