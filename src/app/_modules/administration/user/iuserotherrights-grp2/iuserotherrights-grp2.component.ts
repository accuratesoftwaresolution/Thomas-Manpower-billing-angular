import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { Iigrp2Dto } from 'src/app/_dto/iigrp2.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-grp2',
  templateUrl: './iuserotherrights-grp2.component.html',
  styleUrls: ['./iuserotherrights-grp2.component.scss']
})
export class IuserotherrightsGrp2Component implements OnInit {

  
  @Input('parentData') public grp2Right;

  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  iigrp2LovData: Iigrp2Dto[] = [];
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
    newRow.type = "GRP2";
    this.grp2Right.push(newRow);
  }

   deleteRow() {
    // this.actionService.currentComponent.deleteDetailRow();
    let ri = -1;
    ri = this.grp2Right.indexOf(this.selectedRow);
    this.grp2Right.splice(ri, 1);
  }

  async onGrpCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iigrp2LovData, this.iigrpColumns);
    ref.onClose.subscribe((data: Iigrp2Dto) => {
      if (data) {
        this.grp2Right[rowIndex].code = data.code;
        this.grp2Right[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getGrp2Lov().then(data => {
      this.iigrp2LovData = data;
    });
  }

}
