import { FilterMasterDataDto, MasterColumnMetaDataDto } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-companytype',
  templateUrl: './companytype.component.html',
  styleUrls: ['./companytype.component.scss']
})
export class CompanytypeComponent implements OnInit {
  titleCode = "companytype";
  apiEndUrl = apiUrl.companytype;
  columnMetaData: MasterColumnMetaDataDto[] = [];
  popUpHeadingCode: string = "companytype";
  helpCode: string = "companytypeHelp";
  filter: FilterMasterDataDto = { getFilter: "order[name]=ASC" };
  constructor() {
    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'codeColHelp', maxlength: 5, width: '20%', disableAfterSave: true },
      { field: 'name', headerCode: 'name', helpCode: 'nameColHelp', maxlength: 30 }
    ];
   }

  ngOnInit(): void {
  }

}
