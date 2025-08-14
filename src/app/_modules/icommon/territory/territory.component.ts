import { FilterMasterDataDto, MasterColumnMetaDataDto } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.scss']
})
export class TerritoryComponent implements OnInit {
  titleCode = "territory";
  apiEndUrl = apiUrl.territory;
  columnMetaData: MasterColumnMetaDataDto[] = [];
  popUpHeadingCode: string = "territory";
  helpCode: string = "territoryHelp";
  filter: FilterMasterDataDto = { getFilter: "order[name]=ASC" };
  constructor() {
    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'codeColHelp', maxlength: 5, width: '20%', disableAfterSave: true  },
      { field: 'name', headerCode: 'name', helpCode: 'nameColHelp', maxlength: 30 }
    ];
  }

  ngOnInit(): void {
  }

}
