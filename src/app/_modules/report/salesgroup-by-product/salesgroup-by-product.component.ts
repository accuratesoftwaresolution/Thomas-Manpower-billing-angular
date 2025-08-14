import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salesgroup-by-product',
  templateUrl: './salesgroup-by-product.component.html',
  styleUrls: ['./salesgroup-by-product.component.scss']
})
export class SalesgroupByProductComponent implements OnInit {

  salesRegisterTable = [
    { slNo: 1, customerCode: 'C001', customerName: 'Customer A', productCode: 'P001', productName: 'Product A', qty: 10, grossAmount: 1500.50, headerDiscount: 100.25, detailsDiscount: 50.75, netAmount: 1349.50, taxOutput: 135.00, totalAmount: 1484.50 },
    { slNo: 2, customerCode: 'C002', customerName: 'Customer B', productCode: 'P002', productName: 'Product B', qty: 20, grossAmount: 3000.00, headerDiscount: 200.00, detailsDiscount: 100.00, netAmount: 2700.00, taxOutput: 270.00, totalAmount: 2970.00 },
    { slNo: 3, customerCode: 'C003', customerName: 'Customer C', productCode: 'P003', productName: 'Product C', qty: 5, grossAmount: 750.00, headerDiscount: 50.00, detailsDiscount: 25.00, netAmount: 675.00, taxOutput: 67.50, totalAmount: 742.50 },
    { slNo: 4, customerCode: 'C004', customerName: 'Customer D', productCode: 'P004', productName: 'Product D', qty: 15, grossAmount: 2250.75, headerDiscount: 150.50, detailsDiscount: 75.00, netAmount: 2025.25, taxOutput: 202.53, totalAmount: 2227.78 },
    { slNo: 5, customerCode: 'C005', customerName: 'Customer E', productCode: 'P005', productName: 'Product E', qty: 12, grossAmount: 1800.40, headerDiscount: 120.00, detailsDiscount: 60.00, netAmount: 1620.40, taxOutput: 162.04, totalAmount: 1782.44 },
    { slNo: 6, customerCode: 'C006', customerName: 'Customer F', productCode: 'P006', productName: 'Product F', qty: 8, grossAmount: 1200.30, headerDiscount: 80.00, detailsDiscount: 40.00, netAmount: 1080.30, taxOutput: 108.03, totalAmount: 1188.33 },
    { slNo: 7, customerCode: 'C007', customerName: 'Customer G', productCode: 'P007', productName: 'Product G', qty: 25, grossAmount: 3750.00, headerDiscount: 250.00, detailsDiscount: 125.00, netAmount: 3375.00, taxOutput: 337.50, totalAmount: 3712.50 },
    { slNo: 8, customerCode: 'C008', customerName: 'Customer H', productCode: 'P008', productName: 'Product H', qty: 30, grossAmount: 4500.60, headerDiscount: 300.00, detailsDiscount: 150.00, netAmount: 4050.60, taxOutput: 405.06, totalAmount: 4455.66 },
    { slNo: 9, customerCode: 'C009', customerName: 'Customer I', productCode: 'P009', productName: 'Product I', qty: 40, grossAmount: 6000.80, headerDiscount: 400.00, detailsDiscount: 200.00, netAmount: 5400.80, taxOutput: 540.08, totalAmount: 5940.88 },
    { slNo: 10, customerCode: 'C010', customerName: 'Customer J', productCode: 'P010', productName: 'Product J', qty: 22, grossAmount: 3300.45, headerDiscount: 220.00, detailsDiscount: 110.00, netAmount: 2970.45, taxOutput: 297.05, totalAmount: 3267.50 },
    { slNo: 11, customerCode: 'C011', customerName: 'Customer K', productCode: 'P011', productName: 'Product K', qty: 18, grossAmount: 2700.60, headerDiscount: 180.00, detailsDiscount: 90.00, netAmount: 2430.60, taxOutput: 243.06, totalAmount: 2673.66 },
    { slNo: 12, customerCode: 'C012', customerName: 'Customer L', productCode: 'P012', productName: 'Product L', qty: 13, grossAmount: 1950.90, headerDiscount: 130.00, detailsDiscount: 65.00, netAmount: 1755.90, taxOutput: 175.59, totalAmount: 1931.49 },
    { slNo: 13, customerCode: 'C013', customerName: 'Customer M', productCode: 'P013', productName: 'Product M', qty: 14, grossAmount: 2100.00, headerDiscount: 140.00, detailsDiscount: 70.00, netAmount: 1890.00, taxOutput: 189.00, totalAmount: 2079.00 },
    { slNo: 14, customerCode: 'C014', customerName: 'Customer N', productCode: 'P014', productName: 'Product N', qty: 16, grossAmount: 2400.00, headerDiscount: 160.00, detailsDiscount: 80.00, netAmount: 2160.00, taxOutput: 216.00, totalAmount: 2376.00 },
    { slNo: 15, customerCode: 'C015', customerName: 'Customer O', productCode: 'P015', productName: 'Product O', qty: 17, grossAmount: 2550.40, headerDiscount: 170.00, detailsDiscount: 85.00, netAmount: 2295.40, taxOutput: 229.54, totalAmount: 2524.94 },
    { slNo: 16, customerCode: 'C016', customerName: 'Customer P', productCode: 'P016', productName: 'Product P', qty: 19, grossAmount: 2850.80, headerDiscount: 190.00, detailsDiscount: 95.00, netAmount: 2565.80, taxOutput: 256.58, totalAmount: 2822.38 },
    { slNo: 17, customerCode: 'C017', customerName: 'Customer Q', productCode: 'P017', productName: 'Product Q', qty: 21, grossAmount: 3150.60, headerDiscount: 210.00, detailsDiscount: 105.00, netAmount: 2835.60, taxOutput: 283.56, totalAmount: 3119.16 },
    { slNo: 18, customerCode: 'C018', customerName: 'Customer R', productCode: 'P018', productName: 'Product R', qty: 23, grossAmount: 3450.75, headerDiscount: 230.00, detailsDiscount: 115.00, netAmount: 3105.75, taxOutput: 310.58, totalAmount: 3416.33 },
    { slNo: 19, customerCode: 'C019', customerName: 'Customer S', productCode: 'P019', productName: 'Product S', qty: 24, grossAmount: 3600.00, headerDiscount: 240.00, detailsDiscount: 120.00, netAmount: 3240.00, taxOutput: 324.00, totalAmount: 3564.00 },
    { slNo: 20, customerCode: 'C020', customerName: 'Customer T', productCode: 'P020', productName: 'Product T', qty: 28, grossAmount: 4200.00, headerDiscount: 280.00, detailsDiscount: 140.00, netAmount: 3780.00, taxOutput: 378.00, totalAmount: 4158.00 },
    { slNo: 21, customerCode: 'C021', customerName: 'Customer U', productCode: 'P021', productName: 'Product U', qty: 26, grossAmount: 3900.00, headerDiscount: 260.00, detailsDiscount: 130.00, netAmount: 3510.00, taxOutput: 351.00, totalAmount: 3861.00 },
    { slNo: 22, customerCode: 'C022', customerName: 'Customer V', productCode: 'P022', productName: 'Product V', qty: 29, grossAmount: 4350.30, headerDiscount: 290.00, detailsDiscount: 145.00, netAmount: 3915.30, taxOutput: 391.53, totalAmount: 4306.83 },
    { slNo: 23, customerCode: 'C023', customerName: 'Customer W', productCode: 'P023', productName: 'Product W', qty: 32, grossAmount: 4800.00, headerDiscount: 320.00, detailsDiscount: 160.00, netAmount: 4320.00, taxOutput: 432.00, totalAmount: 4752.00 },
    { slNo: 24, customerCode: 'C024', customerName: 'Customer X', productCode: 'P024', productName: 'Product X', qty: 33, grossAmount: 4950.50, headerDiscount: 330.00, detailsDiscount: 165.00, netAmount: 4355.50, taxOutput: 435.55, totalAmount: 4791.05 },
    { slNo: 25, customerCode: 'C025', customerName: 'Customer Y', productCode: 'P025', productName: 'Product Y', qty: 35, grossAmount: 5250.00, headerDiscount: 350.00, detailsDiscount: 175.00, netAmount: 4725.00, taxOutput: 472.50, totalAmount: 5197.50 }
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