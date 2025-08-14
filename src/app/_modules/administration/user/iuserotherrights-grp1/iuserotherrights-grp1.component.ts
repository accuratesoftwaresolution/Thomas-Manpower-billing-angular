import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { Iigrp1Dto } from 'src/app/_dto/iigrp1.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-grp1',
  templateUrl: './iuserotherrights-grp1.component.html',
  styleUrls: ['./iuserotherrights-grp1.component.scss']
})
export class IuserotherrightsGrp1Component implements OnInit {

  @Input('parentData') public grp1Right;

  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  iigrp1LovData: Iigrp1Dto[] = [];
  iigrpColumns = [
    { field: 'code', header: 'Code', width: '5em' },
    { field: 'name', header: 'Name', width: '7em' },
  ];

  newRow: any;
  // selectedRow: any

  constructor(
    public service: FormService,
    private actionService: ActionService,
    public popUpService: PopUpLovService,
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  createInsertRow() {
    this.actionService.detailPropertyName = "iuserotherrights";
    this.actionService.detailDto = IuserotherrightsDto;
    const newRow = new this.actionService.detailDto();
    newRow.type = "GRP1";
    this.grp1Right.push(newRow);
    this.selectedDetailRow = newRow;
  }

  deleteRow() {
    // this.actionService.currentComponent.deleteDetailRow();
    let ri = -1;
    ri = this.grp1Right.indexOf(this.selectedDetailRow);
    this.grp1Right.splice(ri, 1);
  }
  async onGrpCode(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.iigrp1LovData, this.iigrpColumns);
    ref.onClose.subscribe((data: Iigrp1Dto) => {
      if (data) {
        this.grp1Right[rowIndex].code = data.code;
        this.grp1Right[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getGrp1Lov().then(data => {
      this.iigrp1LovData = data;
    });
  }

}
