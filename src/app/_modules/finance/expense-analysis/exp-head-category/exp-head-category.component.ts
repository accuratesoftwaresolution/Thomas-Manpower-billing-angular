import { MasterColumnMetaDataDto } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-exp-head-category',
  templateUrl: './exp-head-category.component.html',
  styleUrls: ['./exp-head-category.component.scss']
})
export class ExpHeadCategoryComponent implements OnInit {
  titleCode = "expHeadCat";
  popUpHeadingCode = "expHeadCat";
  apiEndUrl = apiUrl.iaexpheadcat;
  dataKey: string = "code";
  helpCode: string = "expHeadCatHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  constructor() {
    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'expHeadCatCodeHelp', maxlength: 20, disableAfterSave: true, width: '30%' },
      { field: 'name', headerCode: 'name', helpCode: 'expHeadCatNameHelp', maxlength: 255 },
    ]
   }

  ngOnInit(): void {
  }

}
