import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { LangaugeTranslateService } from '@accurate/providers';
import { MasterDesignService, UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-set-expense-code',
  templateUrl: './set-expense-code.component.html',
  styleUrls: ['./set-expense-code.component.scss']
})
export class SetExpenseCodeComponent implements OnInit {
  titleCode = "setExpenseCode";
  popUpHeadingCode = "setExpenseCode";
  apiEndUrl = apiUrl.iac4;
  dataKey: string = "acCode";
  helpCode: string = "setExpenseCodeHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  expGroupLov: SelectItem[] = [];
  expHeadLov: SelectItem[] = [];

  constructor(
    private _ui: UiService,
    private _masterDesignService: MasterDesignService
  ) {
    this.columnMetaData = [
      { field: 'acCode', headerCode: 'acCode', helpCode: '', isDisabled: true },
      { field: 'acName', headerCode: 'acName', helpCode: '', isDisabled: true },
      { field: 'expGrpCode', headerCode: 'expGroup', helpCode: '', type: 'dropdown', dropdownData: () => this.expGroupLov, width: '20%' },
      { field: 'expHead', headerCode: 'expHead', helpCode: '', type: 'dropdown', dropdownData: () => this.expHeadLov, default: 'A', width: '20%' },
    ];

    _ui.getDataInLovFormat(apiUrl.iaexpsubgroup, 2, null, null, true).then(res => this.expGroupLov = res);
    _ui.getDataInLovFormat(apiUrl.iaexphead, 2, null, null, true).then(res => this.expHeadLov = res);

  }

  ngOnInit(): void {
    this._masterDesignService.hideCreateButton = true;
    this._masterDesignService.hideDeleteButton = true;
  }

}
