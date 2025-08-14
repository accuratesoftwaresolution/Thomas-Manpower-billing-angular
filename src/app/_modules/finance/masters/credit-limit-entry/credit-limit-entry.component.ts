import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

/*
created by sruthin ps
date: 15-11-2021
 */

@Component({
  selector: 'app-credit-limit-entry',
  templateUrl: './credit-limit-entry.component.html',
  styleUrls: ['./credit-limit-entry.component.scss']
})
export class CreditLimitEntryComponent implements OnInit {


  titleCode = "creditLimitEntry";
  popUpHeadingCode = "creditLimitEntry";
  apiEndUrl = apiUrl.iac4;
  dataKey: string = "acCode";
  helpCode: string = "creditLimitEntryHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  type: SelectItem[] = [];
  updateEndUrl: string = apiUrl.creditLimitEntry;



  constructor(
    private _masterDesignService: MasterDesignService
  ) {
    this.columnMetaData = [
      { field: 'acCode', headerCode: 'ac/Code', width: '10em', helpCode: 'ac/CodeHelp', maxlength: 9, isDisabled: true },
      { field: 'acName', headerCode: 'ac/Name', width: '25em', helpCode: 'ac/NameHelp', maxlength: 50 },
      { field: 'salesman', headerCode: 'salesman', width: '20em', helpCode: 'salemanHelp', maxlength: 10 },
      { field: 'debtCollector', headerCode: 'debtCollector', width: '20em', helpCode: 'debtCollectorHelp', maxlength: 10 },
      { field: 'crLimit', headerCode: 'crLimit', width: '20em', helpCode: 'crLimitHelp' },
      { field: 'crPeriod', headerCode: 'crPeriod', width: '20em', helpCode: 'crPeriodHelp' },
      { field: 'remarks', headerCode: 'remarks', width: '20em', helpCode: 'remarksHelp', maxlength: 255 },
    ];
  }

  ngOnInit(): void {
    this._masterDesignService.hideCreateButton = true;
    this._masterDesignService.hideDeleteButton = true;
  }

}
