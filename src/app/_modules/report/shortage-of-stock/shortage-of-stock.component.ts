import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shortage-of-stock',
  templateUrl: './shortage-of-stock.component.html',
  styleUrls: ['./shortage-of-stock.component.scss']
})
export class ShortageOfStockComponent implements OnInit {
  StockDataTable = [
    {
        slNo: 1,
        productCode: 'P001',
        productDescription: 'Product A',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        batch: 'B001',
        qty: 50,
        rate: 100,
        total: 5000
    },
    {
        slNo: 2,
        productCode: 'P002',
        productDescription: 'Product B',
        warehouseCode: 'WH02',
        warehouseName: 'Secondary Warehouse',
        batch: 'B002',
        qty: 30,
        rate: 150,
        total: 4500
    },
    {
        slNo: 3,
        productCode: 'P003',
        productDescription: 'Product C',
        warehouseCode: 'WH01',
        warehouseName: 'Main Warehouse',
        batch: 'B003',
        qty: 20,
        rate: 200,
        total: 4000
    },
    {
        slNo: 4,
        productCode: 'P004',
        productDescription: 'Product D',
        warehouseCode: 'WH03',
        warehouseName: 'Remote Warehouse',
        batch: 'B004',
        qty: 10,
        rate: 250,
        total: 2500
    },
    {
        slNo: 5,
        productCode: 'P005',
        productDescription: 'Product E',
        warehouseCode: 'WH02',
        warehouseName: 'Secondary Warehouse',
        batch: 'B005',
        qty: 15,
        rate: 300,
        total: 4500
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