import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterService } from 'src/app/_providers/master.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-payrolladdition-list',
  templateUrl: './payrolladdition-list.component.html',
  styleUrls: ['./payrolladdition-list.component.scss']
})
export class PayrolladditionListComponent implements OnInit {

 
   listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];


  constructor(
    public masterService: MasterService,
    private router: Router,
    private _messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

ngOnInit(): void {
  this.getData()
}

filterTable() {
  this.filteredfilteredlistData = this.listData.filter(item =>
    item.HPayroll_Add_Code.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.HPayroll_Add_Name.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.HPayroll_Add_SysID.toString().includes(this.searchText)
  );
}

getData() {
  this.masterService.getMasterData(apiUrl.payrollAddition).then((res) => {
    this.listData = res
    this.filterTable()
  })
}

editRow(rowData: any) {
  this.router.navigate(['payroll/payroll-addition/' + rowData.HPayroll_Add_SysID]);
}

deleteRow(rowData: any,index: number) {

  this.confirmationService.confirm({
    message: 'Are you sure you want to delete?',
    header: 'Confirm Delete',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.masterService.deleteData(apiUrl.payrollAddition, rowData.HPayroll_Add_SysID).then((res) => {

        if (res.success == false) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

        } else {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
           this.getData()
        }

      });
    }
  });
}

viewRow(rowData: any) {
  console.log('Viewing:', rowData);
}
Back(){
   this.router.navigate(['payroll/payroll-addition'] );
}

}
