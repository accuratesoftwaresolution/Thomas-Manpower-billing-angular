import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { Component, OnInit } from '@angular/core';
import { InterfaceObjectService } from 'src/app/_providers/interface-object.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-dept-collector',
  templateUrl: './dept-collector.component.html',
  styleUrls: ['./dept-collector.component.scss']
})
export class DeptCollectorComponent implements OnInit {

  titleCode = "deptCollector";
  popUpHeadingCode = "deptCollector";
  apiEndUrl = apiUrl.debtCollector;
  dataKey: string = "code";
  helpCode: string = "deptCollectorHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  icoData: any;
  hidden: boolean;
  status: SelectItem[] = [];

  constructor(
    private _intObjectService: InterfaceObjectService,
  ) {

    this.status = [
      { label: 'Please Select', value: '' },
      { label: 'Active', value: 'A' },
      { label: 'In-Active', value: 'I' },
    ]

    this.columnMetaData = [
      // { field: 'coCode', headerCode: 'co', helpCode: 'coCodeHelp', maxlength: 2 },
      { field: 'code', headerCode: 'code', helpCode: 'dptCodeHelp', maxlength: 10, width: '15%', disableAfterSave: true },
      { field: 'name', headerCode: 'name', helpCode: 'deptNameHelp', maxlength: 30 },
      { field: 'status', headerCode: 'status', helpCode: 'statusHelp', maxlength: 1, type: 'dropdown', dropdownData: () => this.status,width: '15%',  },
      // { field: 'nameAr', headerCode: 'nameAr', helpCode: 'nameArHelp', hideColumn: this.hidden ,maxlength: 100},
    ];
  }

  async ngOnInit(): Promise<void> {
    // await this._intObjectService.getCompanyDetails().then(data => {
    //   if (data.isArabic == 'Y') {
    //     this.hidden = false
    //   } else if (data.isArabic == 'N') {
    //     this.hidden = true;
    //   }
    //   this.icoData = data;
    // }, (err) => {
    //   // console.warn('===err===', err.error.message);
    // });
  }

}
