import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interco-purchase-order',
  templateUrl: './interco-purchase-order.component.html',
  styleUrls: ['./interco-purchase-order.component.scss']
})
export class IntercoPurchaseOrderComponent implements OnInit {

  salesDataTable = [
    {
      slNo: 1,
      productCode: 'P001',
      productDescription: 'Product A',
      qty: 10,
      transferRate: 50.00,
      taxCode: 'T001',
      taxName: 'VAT',
      taxInputPercentage: 5.00,
      taxAmount: 25.00,
      taxableAmount: 500.00,
      totalInclVAT: 525.00
    },
    {
      slNo: 2,
      productCode: 'P002',
      productDescription: 'Product B',
      qty: 5,
      transferRate: 100.00,
      taxCode: 'T002',
      taxName: 'GST',
      taxInputPercentage: 12.00,
      taxAmount: 60.00,
      taxableAmount: 500.00,
      totalInclVAT: 560.00
    }
    ,{
      slNo: 1,
      productCode: 'P001',
      productDescription: 'Product A',
      qty: 10,
      transferRate: 50.00,
      taxCode: 'T001',
      taxName: 'VAT',
      taxInputPercentage: 5.00,
      taxAmount: 25.00,
      taxableAmount: 500.00,
      totalInclVAT: 525.00
    },
    {
      slNo: 2,
      productCode: 'P002',
      productDescription: 'Product B',
      qty: 5,
      transferRate: 100.00,
      taxCode: 'T002',
      taxName: 'GST',
      taxInputPercentage: 12.00,
      taxAmount: 60.00,
      taxableAmount: 500.00,
      totalInclVAT: 560.00
    }
    // Add more entries as needed
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