import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-vat-cat',
  templateUrl: './vat-cat.component.html',
  styleUrls: ['./vat-cat.component.scss']
})
export class VatCatComponent implements OnInit {

  titleCode = "vatCat";
  popUpHeadingCode = "vatCat";
  apiEndUrl = apiUrl.vatCat;
  dataKey: string = "code";
  helpCode: string = "vatCatHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  icoData: any;
  hidden: boolean;
  type: SelectItem[] = [];
  status: SelectItem[] = [];

  constructor(
  ) { 

    this.type = [
      { label: 'Please Select', value: '' },
      { label: 'No Vat', value: 'N' },
      { label: 'Refund', value: 'R' },
      { label: 'Post', value: 'P' },
    ];

    this.status = [
      { label: 'Please Select', value: '' },
      { label: 'Active', value: 'A' },
      { label: 'In-Active', value: 'I' },
    ]

    this.columnMetaData = [
      // { field: 'coCode', headerCode: 'co', helpCode: 'coCodeHelp', maxlength: 2 ,width: '10em'},
      // { field: 'code', headerCode: 'code', helpCode: 'vatCodeHelp' ,width: '10em'},
      { field: 'name', headerCode: 'name', helpCode: 'vatNameHelp' ,maxlength: 255 , optional: true ,width: '25em'},
      { field: 'vatPer', headerCode: 'vatPer', helpCode: 'vatPerHelp' ,width: '10em'},
      { field: 'acCode', headerCode: 'aCode', helpCode: 'acCodeHelp', maxlength: 9 , optional: true, width: '10em'},
      // { field: 'sysuser', headerCode: 'sysuser', helpCode: 'sysuserHelp', maxlength: 12, width: '20em'},
      // { field: 'sysdate', headerCode: 'sysdate', helpCode: 'sysdateHelp', type: 'date', width: '20em'},
      { field: 'vatType', headerCode: 'vatType', helpCode: 'vatTypeHelp' ,maxlength: 1, type: 'dropdown', dropdownData: () => this.type ,width: '10em'},
      // { field: 'sortOrder', headerCode: 'sortOrder', helpCode: 'sortOrderHelp' },
      { field: 'status', headerCode: 'status', helpCode: 'statusHelp', maxlength: 1 ,width: '10em', type: 'dropdown', dropdownData: () => this.status}
    ]
   }

  ngOnInit(): void {
  }

}
