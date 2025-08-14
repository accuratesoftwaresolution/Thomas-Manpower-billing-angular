import { MessageService } from 'primeng/api';
import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { ErrorTranslateService, LangaugeTranslateService } from '@accurate/providers';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.scss']
})
export class CategoryGroupComponent implements OnInit {

  titleCode = "categoryGroup";
  popUpHeadingCode = "categoryGroup";
  apiEndUrl = apiUrl.iacatgroup;
  dataKey: string = "code";
  helpCode: string = "categoryGroupHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  type: SelectItem[] = [];
  expType: SelectItem[] = [];
  hideCsvButton = true;

  constructor(
    public _masterdesignService: MasterDesignService,
    public _lang: LangaugeTranslateService,
    private _messageService: MessageService,
    private _errorTanslateService: ErrorTranslateService
  ) {

    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'catCodeHelp', maxlength: 10 ,disableAfterSave: true},
      { field: 'name', headerCode: 'name', helpCode: 'catNameHelp', maxlength: 50 },
      { field: 'type', headerCode: 'type', helpCode: 'typeHelp', maxlength: 2, type: 'dropdown', dropdownData: () => this.type },
      { field: 'expType', headerCode: 'expType', helpCode: 'expTypeHelp', maxlength: 2, type: 'dropdown', dropdownData: () => this.expType }
    ]


    this.type = [
      { label: 'Please Select', value: '' },
      { label: 'Asset', value: 'A ' },
      { label: 'Liabilities', value: 'L ' },
      { label: 'Income', value: 'I ' },
      { label: 'Expenses', value: 'E ' },
      { label: 'Equity', value: 'Q ' }
    ];

    this.expType = [
      { label: 'Please Select', value: '' },
      { label: 'Direct', value: 'D ' },
      { label: 'Indirect', value: 'I ' },
      { label: 'None', value: 'N ' },
      { label: 'Equity', value: 'E ' }
    ];

  }

  ngOnInit(): void {
    // this._masterdesignService.hideCsvButton = true;
    // this._masterdesignService.hideExcelButton = true;
  }

 async perSave(): Promise <boolean> {
    if(!'coCode'){
      await this._messageService.add({ severity: 'info', summary: 'Info', detail: this._errorTanslateService.translate('divisionNotNull') });
      return false
    }
    return true
  }

}
