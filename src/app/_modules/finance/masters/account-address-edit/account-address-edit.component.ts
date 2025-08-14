import { MasterColumnMetaDataDto, SelectItem } from '@accurate/dto';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

/*
created by sruthin ps
date: 15-11-2021
 */

@Component({
  selector: 'app-account-address-edit',
  templateUrl: './account-address-edit.component.html',
  styleUrls: ['./account-address-edit.component.scss']
})
export class AccountAddressEditComponent implements OnInit {


  titleCode = "accountAddressEdit";
  popUpHeadingCode = "accountAddressEdit";
  apiEndUrl = apiUrl.iac4;
  dataKey: string = "acCode";
  helpCode: string = "accountAddressEditHelp";
  columnMetaData: MasterColumnMetaDataDto[] = [];
  type: SelectItem[] = [];
  updateEndUrl: string = apiUrl.addressEdit;

  constructor(
    private _masterDesignService: MasterDesignService
  ) {

    this.columnMetaData = [
      { field: 'acCode', headerCode: 'ac/Code', width: '10em', helpCode: 'ac/CodeHelp', isDisabled: true, maxlength: 9 },
      { field: 'acName', headerCode: 'ac/Name', width: '25em', helpCode: 'ac/NameHelp', maxlength: 50 },
      { field: 'slYn', headerCode: 'subLedger', width: '10em', helpCode: 'subLedgerHelp', maxlength: 1, type: 'dropdown', dropdownData: () => this.type },
      { field: 'add1', headerCode: 'address1', width: '20em', helpCode: 'address1Help', optional: true, maxlength: 30 },
      { field: 'add2', headerCode: 'address2', width: '20em', helpCode: 'address2Help', optional: true, maxlength: 30 },
      { field: 'add3', headerCode: 'address3', width: '20em', helpCode: 'address3Help', optional: true, maxlength: 30 },
      { field: 'add4', headerCode: 'address4', width: '20em', helpCode: 'address4Help', optional: true, maxlength: 30 },
      { field: 'contact1', headerCode: 'contact1', width: '15em', helpCode: 'contact1Help', optional: true, maxlength: 40 },
      { field: 'contact2', headerCode: 'contact2', width: '15em', helpCode: 'contact2Help', optional: true, maxlength: 40 },

    ];



    this.type = [
      { label: 'N/A', value: 'N' },
      { label: 'Debtor', value: 'D' },
      { label: 'Creditor', value: 'C' },
      { label: 'Asset', value: 'A' },
      { label: 'Employee', value: 'E' }
    ];



  }

  ngOnInit(): void {
    this._masterDesignService.hideCreateButton = true;
    this._masterDesignService.hideDeleteButton = true;
  }

}
