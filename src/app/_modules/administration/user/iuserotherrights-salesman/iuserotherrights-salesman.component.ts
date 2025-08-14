import { ActionService, FormService } from '@accurate/toolbar';
import { Component, OnInit, Input } from '@angular/core';
import { IcsalesmanDto } from 'src/app/_dto/icsalesman.dto';
import { IuserotherrightsDto } from 'src/app/_dto/iuserotherrights.dto';
import { PopUpLovService } from 'src/app/_providers/pop-up-lov.service';


@Component({
  selector: 'app-iuserotherrights-salesman',
  templateUrl: './iuserotherrights-salesman.component.html',
  styleUrls: ['./iuserotherrights-salesman.component.scss']
})
export class IuserotherrightsSalesmanComponent implements OnInit {

  @Input('parentData') public salesmanRight;
  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  selectedDetailRow: IuserotherrightsDto;
  icsalesmanLovData: IcsalesmanDto[] = [];
  icsalesmanColumns = [
    { field: 'code', header: 'Code', width: '5em' },
    { field: 'name', header: 'Name', width: '7em' },
    { field: 'status', header: 'Status', width: '5em' },
    { field: 'empCode', header: 'Emp Code', width: '5em' },
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

  onRowSelect(event) {
    this.newRow = this.selectedRow;
  }

  createInsertRow() {
    const newRow = new this.actionService.detailDto();
    this.actionService.detailPropertyName = "iuserotherrights";
    this.actionService.detailDto = IuserotherrightsDto;
    newRow.type = "SALESMAN";
    this.salesmanRight.push(newRow);
  }

  deleteRow() {
    // this.actionService.currentComponent.deleteDetailRow();
    let ri = -1;
    ri = this.salesmanRight.indexOf(this.selectedRow);
    this.salesmanRight.splice(ri, 1);
  }

  async onSalesman(rowIndex: number) {
    const ref = this.actionService.showPopUp(this.icsalesmanLovData, this.icsalesmanColumns);
    ref.onClose.subscribe((data: IcsalesmanDto) => {
      if (data) {
        this.salesmanRight[rowIndex].code = data.code;
        this.salesmanRight[rowIndex].name = data.name;
      }
    });
  }

  async initialize() {
    await this.popUpService.getSalesmanLov().then(data => {
      this.icsalesmanLovData = data;
    });
  }


}
