import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { Iigrp4Dto } from 'src/app/_dto/iigrp4.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-grp4',
  templateUrl: './iuserotherrights-grp4.component.html',
  styleUrls: ['./iuserotherrights-grp4.component.scss']
})
export class IuserotherrightsGrp4Component implements OnInit {

  @Input('parentData') public grp4Right;

  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  iigrp4LovData: Iigrp4Dto[] = [];
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
    newRow.type = "GRP4";
    this.grp4Right.push(newRow);
  }

  deleteRow() {
    let ri = -1;
    ri = this.grp4Right.indexOf(this.selectedRow);
    this.grp4Right.splice(ri, 1);
  }

  async onGrpCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iigrp4LovData, this.iigrpColumns);
    ref.onClose.subscribe((data: Iigrp4Dto) => {
      if (data) {
        this.grp4Right[rowIndex].code = data.code;
        this.grp4Right[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getGrp4Lov().then(data => {
      this.iigrp4LovData = data;
    });
  }

}
