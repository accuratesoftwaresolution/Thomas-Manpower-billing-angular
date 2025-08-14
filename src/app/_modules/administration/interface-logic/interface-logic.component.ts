import { FilterMasterDataDto, MasterColumnMetaDataDto } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-interface-logic',
  templateUrl: './interface-logic.component.html',
  styleUrls: ['./interface-logic.component.scss']
})
export class InterfaceLogicComponent implements OnInit {
  titleCode = "interfaceLogic";
  apiEndUrl = apiUrl.iintlogic;
  columnMetaData: MasterColumnMetaDataDto[] = [];
  popUpHeadingCode: string = "interfaceLogic";
  helpCode: string = "interfaceLogicHelp";
  filter: FilterMasterDataDto = { getFilter: "order[name]=ASC" };
  constructor(
    // private breadcrumbService: BreadcrumbService
  ) {
    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'codeColHelp', maxlength: 5, width: '20%', disableAfterSave: true },
      { field: 'name', headerCode: 'name', helpCode: 'nameColHelp', maxlength: 50 }
    ];
  }

  ngOnInit(): void {

  }
}