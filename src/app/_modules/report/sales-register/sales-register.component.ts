import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-register',
  templateUrl: './sales-register.component.html',
  styleUrls: ['./sales-register.component.scss']
})
export class SalesRegisterComponent implements OnInit {

  salesRegisterTable = [
    {
        voucherType: 'Sales',
        voucherNumber: '001',
        date: '2024-11-15',
        customerCode: 'CUST1001',
        customerName: 'John Doe',
        grossAmount: 1000,
        headerDiscount: 50,
        detailsDiscount: 30,
        netAmount: 920,
        taxOutput: 92,
        totalAmount: 1012
    },
    {
        voucherType: 'Sales',
        voucherNumber: '002',
        date: '2024-11-15',
        customerCode: 'CUST1002',
        customerName: 'Jane Smith',
        grossAmount: 2000,
        headerDiscount: 100,
        detailsDiscount: 60,
        netAmount: 1840,
        taxOutput: 184,
        totalAmount: 2024
    },
    { date: '2024-11-15',},
    { date: '2024-11-15',},
    { date: '2024-11-15',},
    { date: '2024-11-15',},
  ];

  showFilterOption:boolean = false

  
  
selectedLinkRecords: any;

companyName: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress1: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress2: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress3: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress4: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
phone: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
fax: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
TrnNumber: any= 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';


  constructor() { }

  ngOnInit(): void {
  }

}