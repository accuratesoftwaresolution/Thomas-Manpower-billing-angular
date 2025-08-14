import { FormAlignerDto, SelectItem } from '@accurate/dto';
import { ActionService, FormService, ICTFormPageBean } from '@accurate/toolbar';
import { Component, OnInit,Input } from '@angular/core';
import { apiUrl } from 'src/app/_resources/api-url.properties';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { UiService } from '@accurate/ui';
// import { ItemMasterDetailService } from 'src/app/_modules/inventory/masters/item-master/item-master.service';
import { AiitembrDto } from 'src/app/_dto/aiitembr.dto';
@Component({
  selector: 'app-aitembr',
  templateUrl: './aitembr.component.html',
  styleUrls: ['./aitembr.component.scss']
})
export class AitembrComponent implements OnInit {

  @Input('service') mainService: any;

  @Input('parentData') isManager: boolean;


  selectedFile: false;
  brDetails: AiitembrDto;
  accountsData: any[] = [];

  pagination=true;

  columnMetaData: FormAlignerDto[] = [];
  loading: boolean = false;
  API_END_URL = apiUrl.iac4;
  PRIMARY_KEYS = ["coCode", "acCode"];
  key = "acCode";
  acList: SelectItem[] = [];
  newAc: SelectItem[] = [];
  accountLov: any[];
  searchPopupColumns = [
    { field: 'acCode', header: 'Ac Code.', width: '4em' },
    { field: 'acName', header: 'Ac Name', width: '6em' },
  ];


  constructor(
    private _uiService: UiService,
    public accService: AccountsService,
    public service: FormService,
    public actionService: ActionService,
    // public _mainService: ItemMasterDetailService
    ) {
   
  }

  ngOnInit(): void {
    this.brDetails = new AiitembrDto();
    this.service.header = new AiitembrDto();
    
  }
  getData(event, data) {

    
  }
}

