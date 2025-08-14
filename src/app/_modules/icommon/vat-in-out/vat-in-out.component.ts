import { InterfaceObjectService } from './../../../_providers/interface-object.service';
import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { MasterService } from '@accurate/providers';
import { UiService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-vat-in-out',
  templateUrl: './vat-in-out.component.html',
  styleUrls: ['./vat-in-out.component.scss']
})
export class VatInOutComponent implements OnInit {

  titleCode = "vatInOut";
  popUpHeadingCode = "vatInOut";
  apiEndUrl = apiUrl.vatInOut;
  dataKey: string = "code";
  helpCode: string = "vatInOutHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  account: SelectItem[] = [];

  constructor(
    private _Service: InterfaceObjectService,
    private _masterService: MasterService
  ) {

    this.columnMetaData = [
      // { field: 'coCode', headerCode: 'co', helpCode: 'coCodeHelp', maxlength: 2 },
      { field: 'code', headerCode: 'code', helpCode: 'vatCodeHelp', maxlength: 2 },
      { field: 'name', headerCode: 'name', helpCode: 'vNameHelp', maxlength: 255 , optional: true},
      { field: 'inoutAc', headerCode: 'inoutAc', helpCode: 'inoutAcHelp', maxlength: 9, type: 'dropdown', dropdownData: () => this.account ,optional: true},
      { field: 'rcmAc', headerCode: 'rcmAc', helpCode: 'rcmAcHelp', maxlength: 9, type: 'dropdown', dropdownData: () => this.account , optional: true},
    ]

    this._Service.getDataInLovFormat('iac4', 2, null, { labelFeild: "acName", codeFeilds: "acCode" }).then(res => {
      this.account = res;
     
    })

  }

  ngOnInit(): void {
  }

}
