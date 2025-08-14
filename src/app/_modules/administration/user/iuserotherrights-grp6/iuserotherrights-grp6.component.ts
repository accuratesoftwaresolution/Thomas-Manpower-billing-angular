import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { Iigrp6Dto } from 'src/app/_dto/iigrp6.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-grp6',
  templateUrl: './iuserotherrights-grp6.component.html',
  styleUrls: ['./iuserotherrights-grp6.component.scss']
})
export class IuserotherrightsGrp6Component implements OnInit {

  @Input('parentData') public grp6Right;

  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  iigrp6LovData: Iigrp6Dto[] = [];
  iigrpColumns = [
    { field: 'code', header: 'Code', width: '5em' },
    { field: 'name', header: 'Name', width: '7em' },
  ];
  newRow: any;
  selectedRow: any;

  constructor(
    public service: FormService,
    private actionService: ActionService,
    public popUpService: PopUpLovService,
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  createInsertRow() {

    const newRow = new this.actionService.detailDto();
    this.actionService.detailPropertyName = "iuserotherrights";
    this.actionService.detailDto = IuserotherrightsDto;
    newRow.type = "GRP6";
    this.grp6Right.push(newRow);
  }

  deleteRow() {  
    let ri = -1;
    ri = this.grp6Right.indexOf(this.selectedRow);
    this.grp6Right.splice(ri, 1);
  }

  async onGrpCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iigrp6LovData, this.iigrpColumns);
    ref.onClose.subscribe((data: Iigrp6Dto) => {
      if (data) {
        this.grp6Right[rowIndex].code = data.code;
        this.grp6Right[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getGrp6Lov().then(data => {
      this.iigrp6LovData = data;
    });
  }

}
