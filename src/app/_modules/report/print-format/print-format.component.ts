import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-format',
  templateUrl: './print-format.component.html',
  styleUrls: ['./print-format.component.scss']
})
export class PrintFormatComponent implements OnInit {



  QuantityTabProductsTableData = [
    {
      slNo: 1,
      productCode: 'P001',
      productDescription: 'Product A Description',
      qty: 10,
      rate: 100,
      vatPercent: 5,
      taxableAmount: 1000,
      vatAmount: 50,
      totalInclVAT: 1050
  },
  {
    slNo: 2,
    productCode: 'P001',
    productDescription: 'Product A Description',
    qty: 10,
    rate: 100,
    vatPercent: 5,
    taxableAmount: 1000,
    vatAmount: 50,
    totalInclVAT: 1050
  },
  {
    slNo: 3,
    productCode: 'P001',
    productDescription: 'Product A Description',
    qty: 10,
    rate: 100,
    vatPercent: 5,
    taxableAmount: 1000,
    vatAmount: 50,
    totalInclVAT: 1050
  },
    {},{},{}
    // Add more items as needed
  ];
  
 selectedLinkRecords: any;

  constructor() { }

  ngOnInit(): void {
  }

}
