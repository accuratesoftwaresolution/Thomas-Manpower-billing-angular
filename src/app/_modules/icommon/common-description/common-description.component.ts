import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { LangaugeTranslateService } from '@accurate/providers';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { InterfaceObjectService } from 'src/app/_providers/interface-object.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-common-description',
  templateUrl: './common-description.component.html',
  styleUrls: ['./common-description.component.scss']
})
export class CommonDescriptionComponent implements OnInit {


  titleCode = "commonDescription";
  popUpHeadingCode = "commonDescription";
  apiEndUrl = apiUrl.commondesc;
  dataKey: string = "code";
  helpCode: string = "commonDescriptionHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  hidden: boolean = false;
  type: SelectItem[] = [];

  constructor(
    public _masterdesignService: MasterDesignService,
    public _lang: LangaugeTranslateService,
    private _intObjectService: InterfaceObjectService,
  ) {

    this.type = [
      { label: 'Please Select', value: '' },
      { label: 'PDO Expense', value: 'PE' },
    ];

    this.columnMetaData = [
      { field: 'code', headerCode: 'code', helpCode: 'descCodeHelp', maxlength: 6, width: '20%', disableAfterSave: true },
      { field: 'name', headerCode: 'name', helpCode: 'descNameHelp', maxlength: 250 },
      { field: 'descType', headerCode: 'descType', helpCode: 'descTypeHelp', maxlength: 2, type: 'dropdown', dropdownData: () => this.type, width: '20%', },
      { field: 'calcPer', headerCode: 'calcPer', helpCode: 'calcPerHelp', width: '15%' },
      // { field: 'nameAr', headerCode: 'nameAr', helpCode: 'nameArHelp', maxlength: 250, hideColumn: this.hidden  },
    ]
  }

  async ngOnInit(): Promise<void> {
    // await this._intObjectService.getCompanyDetails().then(data => {
    //   if (data.isArabic == 'Y') {
    //     this.hidden = false;
    //   } else if (data.isArabic == 'N') {
    //     this.hidden = true;
    //   }
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });

   
  }

}
