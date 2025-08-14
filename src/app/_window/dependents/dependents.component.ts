import { ActionService, FormService } from '@accurate/toolbar';
import { UiService } from '@accurate/ui';
import { Component, OnInit , Input} from '@angular/core';
import { EmpDependentsDto } from 'src/app/_dto/empdependents.dto';
// import { ItemMasterDetailService } from 'src/app/_modules/inventory/masters/item-master/item-master.service';
import { AccountsService } from 'src/app/_providers/accounts.service';
import { EmployeeMasterService } from 'src/app/_providers/employee-master.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-dependents',
  templateUrl: './dependents.component.html',
  styleUrls: ['./dependents.component.scss']
})
export class DependentsComponent implements OnInit {

  @Input('service') mainService: any;

  @Input('parentData') isManager: boolean;

  titleCode="dependents"
  helpCode="dependents"

  allempDep:EmpDependentsDto[];

  empDependentloading:boolean=false;

  columnMetaData:any[];

  selectedempDependent:EmpDependentsDto;

  isupdate: boolean = false;

  isEditable: boolean = true;




  totalRecords:any;
  ROWS_PER_PAGE_OPTIONS:any[]=[5,10,20,50]


  constructor( private _uiService: UiService,
    public accService: AccountsService,
    public service: FormService,
    public actionService: ActionService,
    // public _mainService: ItemMasterDetailService,
    private _employeeMasterService:EmployeeMasterService) { }

  ngOnInit(): void {
  }


  first: number = 0;

  rows: number = 5;

  onPageChange(event) {
    this.first = event.first;
    this.rows = event.rows;
    console.log(" this.first", this.first);
    console.log(" this.rows", this.rows);
    console.log("eventttt",event);
    
    
 this._employeeMasterService.getAllData(`${apiUrl.apempfamily}`).then((res) => {
console.log("finalres",res)
this.allempDep = res['data']

})


    
}

createNew() {
  this.empDependentloading = true;
  this.isupdate = false;
  this.isEditable = false;
  this.selectedempDependent = new EmpDependentsDto();

}


}
