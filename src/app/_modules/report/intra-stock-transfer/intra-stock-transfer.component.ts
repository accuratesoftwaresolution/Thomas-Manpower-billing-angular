import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intra-stock-transfer',
  templateUrl: './intra-stock-transfer.component.html',
  styleUrls: ['./intra-stock-transfer.component.scss']
})
export class IntraStockTransferComponent implements OnInit {

  salesDataTable = [
    {
      slNo: 1,
      productCode: 'P001',
      productDescription: 'Product A',
      warehouseFirstCode: 'WFC001',
      warehouseFirstName: 'Main Warehouse',
      warehouseSecondCode: 'WSC001',
      warehouseSecondName: 'Secondary Warehouse',
      warehouseNumber: '1234',
      batch: 'B001',
      qty: 10,
      transferRate: 50.00,
      total: 500.00,
      remarksCode: 'R001',
      remarksName: 'Sample Remark'
    },
    {
      slNo: 2,
      productCode: 'P002',
      productDescription: 'Product B',
      warehouseFirstCode: 'WFC002',
      warehouseFirstName: 'Central Warehouse',
      warehouseSecondCode: 'WSC002',
      warehouseSecondName: 'Auxiliary Warehouse',
      warehouseNumber: '5678',
      batch: 'B002',
      qty: 5,
      transferRate: 100.00,
      total: 500.00,
      remarksCode: 'R002',
      remarksName: 'Additional Remark'
    },
    {slNo: 2,},
    {slNo: 2,},
    {slNo: 2,},
    {slNo: 2,},
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
