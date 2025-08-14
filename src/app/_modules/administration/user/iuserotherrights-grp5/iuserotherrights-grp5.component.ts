import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { Iigrp5Dto } from 'src/app/_dto/iigrp5.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-grp5',
  templateUrl: './iuserotherrights-grp5.component.html',
  styleUrls: ['./iuserotherrights-grp5.component.scss']
})
export class IuserotherrightsGrp5Component implements OnInit {

  @Input('parentData') public grp5Right;

  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  iigrp5LovData: Iigrp5Dto[] = [];
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
    newRow.type = "GRP5";
    this.grp5Right.push(newRow);
  }

  deleteRow() {  
    let ri = -1;
    ri = this.grp5Right.indexOf(this.selectedRow);
    this.grp5Right.splice(ri, 1);
  }

  async onGrpCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iigrp5LovData, this.iigrpColumns);
    ref.onClose.subscribe((data: Iigrp5Dto) => {
      if (data) {
        this.grp5Right[rowIndex].code = data.code;
        this.grp5Right[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getGrp5Lov().then(data => {
      this.iigrp5LovData = data;
    });
  }

}
