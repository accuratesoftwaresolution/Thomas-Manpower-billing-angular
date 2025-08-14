import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  SalesScreenValData = [
    {SysID: 1, ValidationCode: 'VAL001', ValidationName: 'Required Fields Check', ApplicableCoCode: 'C001', ApplicableCoName: 'ABC Corp'},
    {SysID: 2, ValidationCode: 'VAL002', ValidationName: 'Numeric Value Check', ApplicableCoCode: 'C002', ApplicableCoName: 'XYZ Ltd'},
    {SysID: 3, ValidationCode: 'VAL003', ValidationName: 'Date Format Check', ApplicableCoCode: 'C003', ApplicableCoName: 'LMN Pvt Ltd'},
    {SysID: 4, ValidationCode: 'VAL004', ValidationName: 'Duplicate Entry Check', ApplicableCoCode: 'C004', ApplicableCoName: 'PQR Enterprises'},
    {SysID: 5, ValidationCode: 'VAL005', ValidationName: 'Mandatory Field Check', ApplicableCoCode: 'C005', ApplicableCoName: 'DEF Industries'}
  ];

  searchText: string = '';

  filteredSalesScreenValData = [...this.SalesScreenValData];
  

  constructor() { }

  ngOnInit(): void {
  }

  filterTable() {
    this.filteredSalesScreenValData = this.SalesScreenValData.filter(item =>
      item.ValidationCode.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.ValidationName.toLowerCase().includes(this.searchText.toLowerCase())||
      item.ApplicableCoCode.toLowerCase().includes(this.searchText.toLowerCase())||
      item.ApplicableCoName.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  editRow(rowData: any) {
    console.log('Editing:', rowData);
  }
  
  deleteRow(rowData: any) {
    console.log('Deleting:', rowData);
  }
  
  viewRow(rowData: any) {
    console.log('Viewing:', rowData);
  }

}
