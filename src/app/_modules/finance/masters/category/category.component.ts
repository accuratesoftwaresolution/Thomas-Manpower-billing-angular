import { InterfaceObjectService } from './../../../../_providers/interface-object.service';
import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { LangaugeTranslateService } from '@accurate/providers';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  titleCode = "category";
  popUpHeadingCode = "category";
  apiEndUrl = apiUrl.iacat;
  dataKey: string = "code";
  helpCode: string = "categoryHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  catGroup: SelectItem[] = [];

  constructor(
    public _masterdesignService: MasterDesignService,
    public _lang: LangaugeTranslateService,
    private _interfaceObjectService: InterfaceObjectService 
  ) {

    this.columnMetaData = [
      // { field: 'coCode', headerCode: 'co', helpCode: 'coCodeHelp', maxlength: 20 },
      { field: 'code', headerCode: 'code', helpCode: 'catCodeHelp', maxlength: 20 ,disableAfterSave: true},
      { field: 'groupCode', headerCode: 'groupCode', helpCode: 'groupCodeHelp', maxlength: 10, type: 'dropdown', dropdownData: () => this.catGroup},
      { field: 'name', headerCode: 'name', helpCode: 'catNameHelp', maxlength: 50 },
      
    ]

this._interfaceObjectService.getDataInLovFormat(apiUrl.iacatgroup, 2, null ,{ labelFeild: 'name', codeFeilds: 'code'}).then( res => {
  this.catGroup = res;
})

  }

  ngOnInit(): void {
  }

}
