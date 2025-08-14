import { ErrorTranslateService } from '@accurate/providers';
import { ActionService, FormService } from '@accurate/toolbar';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IntrpttitleDto } from 'src/app/_dto/iintrpttitle.dto';
import { InterfaceAdminService } from 'src/app/_modules/administration/interface-admin/interface-admin.service';
// import { InterfaceAdminService } from '../interface-admin.service';

@Component({
  selector: 'app-iintrpttitle',
  templateUrl: './iintrpttitle.component.html',
  styleUrls: ['./iintrpttitle.component.scss']
})
export class IintrpttitleComponent implements OnInit {
  columns: { field: string; header: string; width: string, sort?: boolean, disabled?: boolean, filter?: boolean; disableAfterSave?: boolean; }[] = [];

  @Input('service') mainService: any;

  selectedDetailRow: IntrpttitleDto = new IntrpttitleDto();
  searchDisplay: boolean = false;
  selectedIndex: any = -1;
  constructor(
    public service: FormService,
    public _mainService: InterfaceAdminService,
  ) { }

  ngOnInit(): void {
  }

  deleteRow(selectedDetailRow: IntrpttitleDto) {
    let ri = -1;
    ri = this.service.header.iintrpttitle.indexOf(this.selectedDetailRow);
    this.service.header.iintrpttitle.splice(ri, 1);

  }

  // createInsertRow() {
  //   this.actionService.detailPropertyName = "iintrpttitle";
  //   this.actionService.detailDto = IntrpttitleDto;
  //   this.actionService.currentComponent.createInsertRow();
  //   this.selectedIndex = this.mainService.header.iintrpttitle.length;
  // }

  update(ri) {
    this.selectedIndex = ri;
    this.selectedDetailRow = this.mainService.header.iintrpttitle[ri];
    // this.mainService.header.iintrpttitle
  }

  save() {
    // let i = this.mainService.header.iintrpttitle.length;
    this.mainService.header.iintrpttitle[this.selectedIndex] = (this.selectedDetailRow);
  }
}
