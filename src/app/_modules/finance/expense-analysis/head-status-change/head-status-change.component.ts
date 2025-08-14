import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { LangaugeTranslateService } from '@accurate/providers';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-head-status-change',
  templateUrl: './head-status-change.component.html',
  styleUrls: ['./head-status-change.component.scss']
})
export class HeadStatusChangeComponent implements OnInit {
  titleCode = "headStatusChange";
  popUpHeadingCode = "headStatusChange";
  apiEndUrl = apiUrl.iaexphead;
  dataKey: string = "code";
  helpCode: string = "headStatusChangeHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  statusLov: SelectItem[] = [];

  constructor(
    private _lang: LangaugeTranslateService,
    private _masterDesignService: MasterDesignService
  ) {
    this.columnMetaData = [
      { field: 'groupCode', headerCode: 'code', helpCode: '', isDisabled: true },
      { field: 'iaexpgroup.name', headerCode: 'name', helpCode: '', isDisabled: true },// need value expression
      { field: 'status', headerCode: 'status', helpCode: 'statusColHelp', type: 'dropdown', dropdownData: () => this.statusLov, default: 'A', width: '15%' },
      { field: 'code', headerCode: 'expGroup', helpCode: '', isDisabled: true },
      { field: 'name', headerCode: 'expGrpName', helpCode: '', isDisabled: true },
    ];

    this.statusLov = [
      { label: this._lang.first("dropDownDefaultMsg"), labelPl: this._lang.first("dropDownDefaultMsg"), labelSl: this._lang.second("dropDownDefaultMsg"), value: "" },
      { label: this._lang.first("open"), labelPl: this._lang.first("open"), labelSl: this._lang.second("open"), value: "O" },
      { label: this._lang.first("closed"), labelPl: this._lang.first("closed"), labelSl: this._lang.second("closed"), value: "C" }
    ];
  }

  ngOnInit(): void {
    this._masterDesignService.hideCreateButton = true;
    this._masterDesignService.hideDeleteButton = true;
  }

}
