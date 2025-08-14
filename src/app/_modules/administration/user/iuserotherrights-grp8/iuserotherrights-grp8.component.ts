import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { Iigrp8Dto } from 'src/app/_dto/iigrp8.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-grp8',
  templateUrl: './iuserotherrights-grp8.component.html',
  styleUrls: ['./iuserotherrights-grp8.component.scss']
})
export class IuserotherrightsGrp8Component implements OnInit {

  @Input('parentData') public grp8Right;

  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  iigrp8LovData: Iigrp8Dto[] = [];
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
    newRow.type = "GRP8";
    this.grp8Right.push(newRow);
  }

  deleteRow() {
    let ri = -1;
    ri = this.grp8Right.indexOf(this.selectedRow);
    this.grp8Right.splice(ri, 1);
  }


  async onGrpCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iigrp8LovData, this.iigrpColumns);
    ref.onClose.subscribe((data: Iigrp8Dto) => {
      if (data) {
        this.grp8Right[rowIndex].code = data.code;
        this.grp8Right[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getGrp8Lov().then(data => {
      this.iigrp8LovData = data;
    });
  }

}
