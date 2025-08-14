import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  purchaseDataTable = [
    {
        slNo: 1,
        productCode: 'P001',
        productDescription: 'Product A',
        qty: 10,
        rate: 100,
        taxCode: 'TX01',
        taxName: 'Standard Tax',
        taxInputPercentage: 5,
        taxOutputPercentage: 10,
        taxAmount: 10,
        taxableAmount: 1000,
        taxInput: 50,
        taxOutput: 100,
        totalInclVAT: 1100
    },
    {
        slNo: 2,
        productCode: 'P002',
        productDescription: 'Product B',
        qty: 5,
        rate: 200,
        taxCode: 'TX02',
        taxName: 'Reduced Tax',
        taxInputPercentage: 3,
        taxOutputPercentage: 8,
        taxAmount: 8,
        taxableAmount: 1000,
        taxInput: 30,
        taxOutput: 80,
        totalInclVAT: 1080
    },
    {
        slNo: 3,
        productCode: 'P003',
        productDescription: 'Product C',
        qty: 15,
        rate: 150,
        taxCode: 'TX03',
        taxName: 'Zero Tax',
        taxInputPercentage: 0,
        taxOutputPercentage: 0,
        taxAmount: 0,
        taxableAmount: 2250,
        taxInput: 0,
        taxOutput: 0,
        totalInclVAT: 2250
    }
];


  
  
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