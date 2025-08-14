import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-quotation',
  templateUrl: './sales-quotation.component.html',
  styleUrls: ['./sales-quotation.component.scss']
})
export class SalesQuotationComponent implements OnInit {

  salesDataTable = [
    {
        slNo: 1,
        productCode: 'P001',
        productDescription: 'Product A',
        qty: 10,
        rate: 100,
        vatOutputPercentage: 5,
        taxableAmount: 1000,
        vatAmount: 50,
        totalInclVAT: 1050
    },
    {
        slNo: 2,
        productCode: 'P002',
        productDescription: 'Product B',
        qty: 5,
        rate: 200,
        vatOutputPercentage: 10,
        taxableAmount: 1000,
        vatAmount: 100,
        totalInclVAT: 1100
    },
    {
        slNo: 3,
        productCode: 'P003',
        productDescription: 'Product C',
        qty: 8,
        rate: 150,
        vatOutputPercentage: 8,
        taxableAmount: 1200,
        vatAmount: 96,
        totalInclVAT: 1296
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


  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}