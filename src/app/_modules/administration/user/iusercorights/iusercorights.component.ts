import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit } from '@angular/core';
import { IusercorightsDto } from 'src/app/_dto/iusercorights.dto';
import { IbrLovDto } from 'src/app/_dto/lov/ibr-lov.dto';
import { LovDto } from 'src/app/_dto/lov/lov.dto';
import { IbrService } from 'src/app/_providers/ibr.service';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iusercorights',
  templateUrl: './iusercorights.component.html',
  styleUrls: ['./iusercorights.component.scss']
})
export class IusercorightsComponent implements OnInit {
  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IusercorightsDto;

  idvLovData: IbrLovDto[] = [];
  idvLovColumns = [
    { field: 'coCode', header: 'CO', width: '5em' },
    { field: 'dvCode', header: 'DV', width: '5em' },
    { field: 'brCode', header: 'BR', width: '5em' },
    { field: 'brName', header: 'Name', width: '10em' },
    { field: 'brShrtName', header: 'Short Name', width: '6em' }
  ];

  drCrLovData: LovDto[] = [
    { label: 'Yes', value: 'Y' },
    { label: 'No', value: 'N' }
  ];
  newRow: any;
  // selectedRow: any;

  constructor(
    public service: FormService,
    private actionService: ActionService,
    public popUpLovService: PopUpLovService,
    public branchService: IbrService,
  ) { }

  ngOnInit(): void {
    this.initialize();

  }
  async createInsertRow() {
    this.actionService.detailPropertyName = "iusercorights";
    this.actionService.detailDto = IusercorightsDto;
    await this.actionService.currentComponent.createInsertRow();
    this.selectedDetailRow = this.service.selectedDetailRow;


  }

  deleteRow() {
    // this.actionService.currentComponent.deleteDetailRow();
    let ri = -1;
    ri = this.service.header.iusercorights.indexOf(this.selectedDetailRow);
    this.service.header.iusercorights.splice(ri, 1);
  }

  async onDvCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.idvLovData, this.idvLovColumns);
    ref.onClose.subscribe((data: IusercorightsDto) => {
      if (data) {
        this.service.header.iusercorights[rowIndex].dvCode = data.dvCode;
        this.service.header.iusercorights[rowIndex].brCode = data.brCode;
        this.service.header.iusercorights[rowIndex].brName = data.brName;
      }
    });
  }

  async initialize() {
    await this.branchService.getIbrLov().then(data => {
      this.idvLovData = data;
    }, (err) => {
      // console.warn("===err==", err);
    });
  }
}
