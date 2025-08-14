import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { Iigrp3Dto } from 'src/app/_dto/iigrp3.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-grp3',
  templateUrl: './iuserotherrights-grp3.component.html',
  styleUrls: ['./iuserotherrights-grp3.component.scss']
})
export class IuserotherrightsGrp3Component implements OnInit {
  
  @Input('parentData') public grp3Right;

  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  iigrp3LovData: Iigrp3Dto[] = [];
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
    newRow.type = "GRP3";
    this.grp3Right.push(newRow);
  }

  deleteRow() {
    // this.actionService.currentComponent.deleteDetailRow();
    let ri = -1;
    ri = this.grp3Right.indexOf(this.selectedRow);
    this.grp3Right.splice(ri, 1);
  }

  async onGrpCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iigrp3LovData, this.iigrpColumns);
    ref.onClose.subscribe((data: Iigrp3Dto) => {
      if (data) {
        this.grp3Right[rowIndex].code = data.code;
        this.grp3Right[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getGrp3Lov().then(data => {
      this.iigrp3LovData = data;
    });
  }


}
