import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-group-by-vendor',
  templateUrl: './purchase-group-by-vendor.component.html',
  styleUrls: ['./purchase-group-by-vendor.component.scss']
})
export class PurchaseGroupByVendorComponent implements OnInit {

  salesRegisterTable = [
    { slNo: 1, customerCode: 'C001', customerName: 'Customer A', qty: 10, grossAmount: 1500.50, headerDiscount: 100.25, detailsDiscount: 50.75, netAmount: 1349.50, taxOutput: 135.00, totalAmount: 1484.50 },
    { slNo: 2, customerCode: 'C002', customerName: 'Customer B', qty: 20, grossAmount: 3000.00, headerDiscount: 200.00, detailsDiscount: 100.00, netAmount: 2700.00, taxOutput: 270.00, totalAmount: 2970.00 },
    { slNo: 3, customerCode: 'C003', customerName: 'Customer C', qty: 5, grossAmount: 750.00, headerDiscount: 50.00, detailsDiscount: 25.00, netAmount: 675.00, taxOutput: 67.50, totalAmount: 742.50 },
    { slNo: 4, customerCode: 'C004', customerName: 'Customer D', qty: 15, grossAmount: 2250.75, headerDiscount: 150.50, detailsDiscount: 75.00, netAmount: 2025.25, taxOutput: 202.53, totalAmount: 2227.78 },
    { slNo: 5, customerCode: 'C005', customerName: 'Customer E', qty: 12, grossAmount: 1800.40, headerDiscount: 120.00, detailsDiscount: 60.00, netAmount: 1620.40, taxOutput: 162.04, totalAmount: 1782.44 },
    { slNo: 6, customerCode: 'C006', customerName: 'Customer F', qty: 8, grossAmount: 1200.30, headerDiscount: 80.00, detailsDiscount: 40.00, netAmount: 1080.30, taxOutput: 108.03, totalAmount: 1188.33 },
    { slNo: 7, customerCode: 'C007', customerName: 'Customer G', qty: 25, grossAmount: 3750.00, headerDiscount: 250.00, detailsDiscount: 125.00, netAmount: 3375.00, taxOutput: 337.50, totalAmount: 3712.50 },
    { slNo: 8, customerCode: 'C008', customerName: 'Customer H', qty: 30, grossAmount: 4500.60, headerDiscount: 300.00, detailsDiscount: 150.00, netAmount: 4050.60, taxOutput: 405.06, totalAmount: 4455.66 },
    { slNo: 9, customerCode: 'C009', customerName: 'Customer I', qty: 40, grossAmount: 6000.80, headerDiscount: 400.00, detailsDiscount: 200.00, netAmount: 5400.80, taxOutput: 540.08, totalAmount: 5940.88 },
    { slNo: 10, customerCode: 'C010', customerName: 'Customer J', qty: 22, grossAmount: 3300.45, headerDiscount: 220.00, detailsDiscount: 110.00, netAmount: 2970.45, taxOutput: 297.05, totalAmount: 3267.50 },
    { slNo: 11, customerCode: 'C011', customerName: 'Customer K', qty: 18, grossAmount: 2700.30, headerDiscount: 180.00, detailsDiscount: 90.00, netAmount: 2430.30, taxOutput: 243.03, totalAmount: 2673.33 },
    { slNo: 12, customerCode: 'C012', customerName: 'Customer L', qty: 28, grossAmount: 4200.50, headerDiscount: 280.00, detailsDiscount: 140.00, netAmount: 3780.50, taxOutput: 378.05, totalAmount: 4158.55 },
    { slNo: 13, customerCode: 'C013', customerName: 'Customer M', qty: 14, grossAmount: 2100.75, headerDiscount: 140.00, detailsDiscount: 70.00, netAmount: 1890.75, taxOutput: 189.08, totalAmount: 2079.83 },
    { slNo: 14, customerCode: 'C014', customerName: 'Customer N', qty: 35, grossAmount: 5250.90, headerDiscount: 350.00, detailsDiscount: 175.00, netAmount: 4725.90, taxOutput: 472.59, totalAmount: 5198.49 },
    { slNo: 15, customerCode: 'C015', customerName: 'Customer O', qty: 50, grossAmount: 7500.00, headerDiscount: 500.00, detailsDiscount: 250.00, netAmount: 6750.00, taxOutput: 675.00, totalAmount: 7425.00 },
    { slNo: 16, customerCode: 'C016', customerName: 'Customer P', qty: 19, grossAmount: 2850.90, headerDiscount: 190.00, detailsDiscount: 95.00, netAmount: 2565.90, taxOutput: 256.59, totalAmount: 2822.49 },
    { slNo: 17, customerCode: 'C017', customerName: 'Customer Q', qty: 24, grossAmount: 3600.40, headerDiscount: 240.00, detailsDiscount: 120.00, netAmount: 3240.40, taxOutput: 324.04, totalAmount: 3564.44 },
    { slNo: 18, customerCode: 'C018', customerName: 'Customer R', qty: 33, grossAmount: 4950.00, headerDiscount: 330.00, detailsDiscount: 165.00, netAmount: 4455.00, taxOutput: 445.50, totalAmount: 4900.50 },
    { slNo: 19, customerCode: 'C019', customerName: 'Customer S', qty: 16, grossAmount: 2400.80, headerDiscount: 160.00, detailsDiscount: 80.00, netAmount: 2160.80, taxOutput: 216.08, totalAmount: 2376.88 },
    { slNo: 20, customerCode: 'C020', customerName: 'Customer T', qty: 11, grossAmount: 1650.90, headerDiscount: 110.00, detailsDiscount: 55.00, netAmount: 1485.90, taxOutput: 148.59, totalAmount: 1634.49 },
    { slNo: 21, customerCode: 'C021', customerName: 'Customer U', qty: 27, grossAmount: 4050.75, headerDiscount: 270.00, detailsDiscount: 135.00, netAmount: 3645.75, taxOutput: 364.58, totalAmount: 4010.33 },
    { slNo: 22, customerCode: 'C022', customerName: 'Customer V', qty: 13, grossAmount: 1950.50, headerDiscount: 130.00, detailsDiscount: 65.00, netAmount: 1755.50, taxOutput: 175.55, totalAmount: 1931.05 },
    { slNo: 23, customerCode: 'C023', customerName: 'Customer W', qty: 9, grossAmount: 1350.25, headerDiscount: 90.00, detailsDiscount: 45.00, netAmount: 1215.25, taxOutput: 121.53, totalAmount: 1336.78 },
    { slNo: 24, customerCode: 'C024', customerName: 'Customer X', qty: 38, grossAmount: 5700.60, headerDiscount: 380.00, detailsDiscount: 190.00, netAmount: 5130.60, taxOutput: 513.06, totalAmount: 5643.66 },
    { slNo: 25, customerCode: 'C025', customerName: 'Customer Y', qty: 23, grossAmount: 3450.80, headerDiscount: 230.00, detailsDiscount: 115.00, netAmount: 3105.80, taxOutput: 310.58, totalAmount: 3416.38 }
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