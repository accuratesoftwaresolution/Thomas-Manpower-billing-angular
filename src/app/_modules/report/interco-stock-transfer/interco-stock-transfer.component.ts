import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-interco-stock-transfer',
  templateUrl: './interco-stock-transfer.component.html',
  styleUrls: ['./interco-stock-transfer.component.scss']
})
export class IntercoStockTransferComponent implements OnInit {

  salesDataTable = [
    {
      slNo: 1,
      productCode: 'P001',
      productDescription: 'Product A',
      warehouseCode: 'W001',
      warehouseName: 'Main Warehouse',
      warehouseNumber: '1234',
      batch: 'B001',
      qty: 10,
      transferRate: 50.00,
      total: 500.00,
      interCoCode: 'IC001',
      interCoName: 'Inter Company A',
      interCoVoucherNo: 'V12345',
      interCoWHCode: 'WH001',
      interCoWHName: 'Inter Co Warehouse',
      remarksCode: 'R001',
      remarksName: 'Sample Remark'
    },
    {
      slNo: 2,
      productCode: 'P002',
      productDescription: 'Product B',
      warehouseCode: 'W002',
      warehouseName: 'Secondary Warehouse',
      warehouseNumber: '5678',
      batch: 'B002',
      qty: 5,
      transferRate: 100.00,
      total: 500.00,
      interCoCode: 'IC002',
      interCoName: 'Inter Company B',
      interCoVoucherNo: 'V67890',
      interCoWHCode: 'WH002',
      interCoWHName: 'Inter Co Secondary Warehouse',
      remarksCode: 'R002',
      remarksName: 'Additional Remark'
    },
    {slNo: 2,},
    {slNo: 2,},
    {slNo: 2,},
    {slNo: 2,},
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