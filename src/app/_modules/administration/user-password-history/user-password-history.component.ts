import { MasterColumnMetaDataDto } from '@accurate/dto';
import { MasterDesignService } from '@accurate/ui';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-user-password-history',
  templateUrl: './user-password-history.component.html',
  styleUrls: ['./user-password-history.component.scss']
})
export class UserPasswordHistoryComponent implements OnInit {

  titleCode = "userPasswordHistory";
  apiEndUrl = apiUrl.iuserpwd;
  columnMetaData: MasterColumnMetaDataDto[] = [];
  helpCode: string = "userPasswordHistoryHelp";
  popUpHeadingCode: string = "userPasswordHistory";
  dataKey: string = "userId";

  constructor(
    private _masterDesignService: MasterDesignService
  ) {
    this.columnMetaData = [
      { field: 'coCode', headerCode: 'co', helpCode: 'coCodeColHelp', maxlength: 2, width: '10em' },
      { field: 'userId', headerCode: 'userId', helpCode: 'userIdColHelp', maxlength: 12, isDisabled: true, width: '20em' },
      { field: 'sysuser', headerCode: 'sys_user', helpCode: 'sysuserColHelp', maxlength: 12, width: '20em' },
      { field: 'pwdChangedDate', headerCode: 'pwdChangedDate', helpCode: 'pwdChangedDateColHelp', type: 'date' },
      { field: 'oldPwd', headerCode: 'oldPwd', helpCode: 'oldPwdColHelp', maxlength: 500, isDisabled: true, width: '20em' , type: 'password'},
      { field: 'newPwd', headerCode: 'newPwd', helpCode: 'newPwdColHelp', maxlength: 500, width: '20em' , type: 'password'},
    ];
  }

  ngOnInit(): void {
    this._masterDesignService.hideCreateButton = true;
    this._masterDesignService.hideDeleteButton = true;
    this._masterDesignService.hideEditButton = true
  }

}
