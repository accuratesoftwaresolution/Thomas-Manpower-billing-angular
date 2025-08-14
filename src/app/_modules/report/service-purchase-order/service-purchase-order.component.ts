import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-purchase-order',
  templateUrl: './service-purchase-order.component.html',
  styleUrls: ['./service-purchase-order.component.scss']
})
export class ServicePurchaseOrderComponent implements OnInit {


  purchaseDataTable = [
    {
        slNo: 1,
        productCode: 'P001',
        productDescription: 'Product A',
        taxableTypeCode: 'TX01',
        taxableTypeName: 'Standard Tax',
        qty: 10,
        rate: 100,
        taxPercentage: 10,
        taxableAmount: 1000,
        taxAmount: 100,
        totalInclVAT: 1100
    },
    {
        slNo: 2,
        productCode: 'P002',
        productDescription: 'Product B',
        taxableTypeCode: 'TX02',
        taxableTypeName: 'Reduced Tax',
        qty: 5,
        rate: 200,
        taxPercentage: 8,
        taxableAmount: 1000,
        taxAmount: 80,
        totalInclVAT: 1080
    },
    {
      slNo: 1,
      productCode: 'P001',
      productDescription: 'Product A',
      taxableTypeCode: 'TX01',
      taxableTypeName: 'Standard Tax',
      qty: 10,
      rate: 100,
      taxPercentage: 10,
      taxableAmount: 1000,
      taxAmount: 100,
      totalInclVAT: 1100
  },
  {
      slNo: 2,
      productCode: 'P002',
      productDescription: 'Product B',
      taxableTypeCode: 'TX02',
      taxableTypeName: 'Reduced Tax',
      qty: 5,
      rate: 200,
      taxPercentage: 8,
      taxableAmount: 1000,
      taxAmount: 80,
      totalInclVAT: 1080
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