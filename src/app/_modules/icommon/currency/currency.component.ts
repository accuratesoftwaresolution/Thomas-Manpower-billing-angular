import { MasterColumnMetaDataDto } from '@accurate/dto';
import { LangaugeTranslateService } from '@accurate/providers';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  titleCode = "currency";
  popUpHeadingCode = "currency";
  apiEndUrl = apiUrl.currency;
  dataKey: string = "code";
  helpCode: string = "currencyHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];

  constructor(
    public _masterdesignService: MasterDesignService,
    public _lang: LangaugeTranslateService,
  ) {

    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'codeHelp', maxlength: 5 },
      { field: 'name', headerCode: 'name', helpCode: 'nameHelp', maxlength: 30 },
      { field: 'curRate', headerCode: 'curRate', helpCode: 'curRateHelp' },
      { field: 'coin', headerCode: 'coin', helpCode: 'coinHelp', maxlength: 15 },
      { field: 'coinDec', headerCode: 'coinDec', helpCode: 'coinDecHelp' },
      { field: 'sign', headerCode: 'sign', helpCode: 'signHelp', maxlength: 5 , optional: true},
      // { field: 'nameAr', headerCode: 'nameAr', helpCode: 'nameArHelp', maxlength: 100 },
      // { field: 'coinAr', headerCode: 'coinAr', helpCode: 'coinArHelp', maxlength: 50 }
    ]

  }

  ngOnInit(): void {
  }

}
