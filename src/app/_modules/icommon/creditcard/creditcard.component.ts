import { FilterMasterDataDto, MasterColumnMetaDataDto } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.scss']
})
export class CreditcardComponent implements OnInit {
  titleCode = "creditcard";
  apiEndUrl = apiUrl.iccreditcard;
  columnMetaData: MasterColumnMetaDataDto[] = [];
  popUpHeadingCode: string = "creditcard";
  helpCode: string = "creditcard";
  filter: FilterMasterDataDto = { getFilter: "order[name]=ASC" };
  constructor() {
    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'codeColHelp' },
      { field: 'name', headerCode: 'name', helpCode: 'nameColHelp' },

    ];
  }

  ngOnInit(): void {
  }

}
