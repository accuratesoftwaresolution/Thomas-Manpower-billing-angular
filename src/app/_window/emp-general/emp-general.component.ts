import { ActionService, FormService } from '@accurate/toolbar';
import { Component, Input, OnInit } from '@angular/core';
import { empgeneralDto } from 'src/app/_dto/empgeneral.dto';
// import { EmployeeMasterService } from 'src/app/_modules/payroll/masters/employee/employee-master.service';

@Component({
  selector: 'app-emp-general',
  templateUrl: './emp-general.component.html',
  styleUrls: ['./emp-general.component.scss']
})
export class EmpGeneralComponent implements OnInit {

  loading:boolean=false;
  gndetails:empgeneralDto;
@Input('service') mainService: any;

@Input('parentData') isManager: boolean;
  constructor(
    public service: FormService ,
    public actionService: ActionService,
    // public  _mainService:EmployeeMasterService
  ) { }

  ngOnInit(): void {
    this.gndetails = new empgeneralDto();
    this.service.header = new empgeneralDto();
  
  }

}
