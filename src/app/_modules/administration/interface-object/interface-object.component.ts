import { InterfaceObjectService } from './../../../_providers/interface-object.service';
import { MasterColumnMetaDataDto, SelectItem, SelectItemDto } from '@accurate/dto';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { IintobjectDto } from 'src/app/_dto/iintobject.dto';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { ErrorTranslateService, LangaugeTranslateService, MasterService } from '@accurate/providers';
import { ConfirmationService, MessageService } from 'primeng/api';

/*
created by sruthin ps
for interface admin
date: 9-11-2021
 */

@Component({
  selector: 'app-interface-object',
  templateUrl: './interface-object.component.html',
  styleUrls: ['./interface-object.component.scss']
})
export class InterfaceObjectComponent implements OnInit {

  titleCode = "interfaceobject";
  popUpHeadingCode = "interfaceobject";
  apiEndUrl = apiUrl.interfaceobject;
  dataKey: string = "objectName";
  helpCode: string = "interfaceobjectHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  icoData: any;
  type: SelectItem[] = [];
  yesNoLoist: SelectItem[] = [];
  dvList: any[] = [];

  constructor(
    private _intObjectService: InterfaceObjectService,
    public _masterdesignService: MasterDesignService,
    public _lang: LangaugeTranslateService,
  ) {

    this.columnMetaData = [
      { field: 'objectName', headerCode: 'objectName', helpCode: 'objectNameHelp', maxlength: 200 },
      { field: 'objectDesc', headerCode: 'objectDesc', helpCode: 'objectDescHelp', maxlength: 50 },
      { field: 'type', headerCode: 'type', helpCode: 'typeHelp', type: 'dropdown', dropdownData: () => this.type, maxlength: 1, optional: true },
      { field: 'layout', headerCode: 'layout', helpCode: 'layoutHelp', maxlength: 50, optional: true },
      { field: 'remark', headerCode: 'remark', helpCode: 'remarkHelp', maxlength: 3000, optional: true },
      // { field: 'zoomPer', headerCode: 'zoomPer' ,helpCode: 'zoomPerHelp',},
      // { field: 'isArabic', headerCode: 'isArabic', helpCode: 'isArabicHelp', type: 'dropdown',dropdownData:() => this.yesNoLoist, maxlength: 1}
    ];


    // this._intObjectService.getCompanyDetails().then(data => {
    //   this.icoData = data;
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });

    this.type = [
      { label: 'Please Select', value: '' },
      { label: 'Report', value: 'R' },
      { label: 'Entry', value: 'E' }
    ];

    this.yesNoLoist = [
      { label: 'Please Select', value: '' },
      { label: 'Yes', value: 'Y' },
      { label: 'No', value: 'N' }
    ]
  }

  ngOnInit(): void {
  }


}
