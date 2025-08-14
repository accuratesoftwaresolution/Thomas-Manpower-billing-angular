import { MasterColumnMetaDataDto } from '@accurate/dto';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {

  titleCode = "branchDetails";
  apiEndUrl = apiUrl.branch;
  columnMetaData: MasterColumnMetaDataDto[] = [];
  helpCode: string = "branchDetailsHelp";
  popUpHeadingCode: string = "branchDetails";
  dataKey: string = "brCode";

  constructor(
    private _masterDesignService: MasterDesignService
  ) {
    this.columnMetaData = [
      // { field: 'coCode', headerCode: 'company', helpCode: 'coCodeColHelp', maxlength: 2 },
      // { field: 'dvCode', headerCode: 'division', helpCode: 'dvCodeColHelp', maxlength: 2 }
      { field: 'brCode', headerCode: 'branch', helpCode: 'brCodeColHelp', maxlength: 2, isDisabled: true },
      { field: 'brName', headerCode: 'brName', helpCode: 'brNameColHelp', maxlength: 50, isDisabled: true },
      { field: 'brShrtName', headerCode: 'ShrtName', helpCode: 'brShrtNameColHelp', maxlength: 10, isDisabled: true },
      { field: 'entrySDt', headerCode: 'entrySDt', helpCode: 'entrySDtColHelp', type: 'date' },
      { field: 'entryEDt', headerCode: 'entryEDt', helpCode: 'entryEDtColHelp', type: 'date' },
    ];
  }

  ngOnInit(): void {
    this._masterDesignService.hideCreateButton = true

  }

}
