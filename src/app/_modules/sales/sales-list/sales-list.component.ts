import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/_providers/master.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  SalesData: any[] = []

  searchText: string = '';

  filteredfilteredSalesData = [...this.SalesData];


  constructor(
    private _masterService: MasterService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getAllData()
  }

filterTable() {
  const search = this.searchText?.toLowerCase() || '';
  this.filteredfilteredSalesData = this.SalesData.filter(item =>
    (item.Allh_Vend_Store_Code?.toLowerCase() || '').includes(search) ||
    (item.Allh_Vend_Store_Name?.toLowerCase() || '').includes(search)
  );
}


  getAllData() {
    this._masterService.getMasterData(apiUrl.salesEnquiry).then((res) => {
      console.log(res);
      this.SalesData = res
      this.filterTable()

    })
  }

  editRow(rowData: any) {

    this.router.navigate(['/sales/sales-enquiry' + '/' + rowData.Allh_SysID]);
  }

  deleteRow(rowData: any) {
    console.log('Deleting:', rowData);
  }

  viewRow(rowData: any) {
    console.log('Viewing:', rowData);
  }

}
