import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-purchase',
  templateUrl: './service-purchase.component.html',
  styleUrls: ['./service-purchase.component.scss']
})
export class ServicePurchaseComponent implements OnInit {

  purchaseDataTable = [
    {
        slNo: 1,
        productCode: 'P001',
        productDescription: 'Product A',
        accountCode: 'AC001',
        accountName: 'Account A',
        taxableTypeCode: 'TX01',
        taxableTypeName: 'Standard Tax',
        qty: 10,
        rate: 100,
        taxPercentage: 10,
        taxableAmount: 1000,
        taxAmount: 100,
        totalInclTax: 1100
    },
    {
        slNo: 2,
        productCode: 'P002',
        productDescription: 'Product B',
        accountCode: 'AC002',
        accountName: 'Account B',
        taxableTypeCode: 'TX02',
        taxableTypeName: 'Reduced Tax',
        qty: 5,
        rate: 200,
        taxPercentage: 8,
        taxableAmount: 1000,
        taxAmount: 80,
        totalInclTax: 1080
    }
];
subTableData = [
  { accountCode: '1001', accountName: 'Custom Duty', amount: 5000.00, narrationCode: '', narrationName: '' },
  { accountCode: '1002', accountName: 'Freight', amount: 3000.00, narrationCode: '', narrationName: '' },
  { accountCode: '1003', accountName: 'Clearing', amount: 1500.00, narrationCode: '', narrationName: '' },
];

// Additional variables for footer
totalAmount = this.subTableData.reduce((sum, item) => sum + item.amount, 0);
percentageOnGrossAmount = 19.00;
percentageOnNetAmount = 21.11;





  
  
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
