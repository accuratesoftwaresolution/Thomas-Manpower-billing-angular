import { MasterColumnMetaDataDto } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-exp-group-category',
  templateUrl: './exp-group-category.component.html',
  styleUrls: ['./exp-group-category.component.scss']
})
export class ExpGroupCategoryComponent implements OnInit {

  titleCode = "expGroupCat";
  popUpHeadingCode = "expGroupCat";
  apiEndUrl = apiUrl.iaexpgroupcat;
  dataKey: string = "code";
  helpCode: string = "expGroupCatHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];

  constructor(
  ) {

    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'expGroupCatCodeHelp', maxlength: 20, disableAfterSave: true, width: '30%' },
      { field: 'name', headerCode: 'name', helpCode: 'expGroupCatNameHelp', maxlength: 250 },
    ]

  }

  ngOnInit(): void {
  }

}
