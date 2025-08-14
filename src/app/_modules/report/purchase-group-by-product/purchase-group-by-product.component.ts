import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-group-by-product',
  templateUrl: './purchase-group-by-product.component.html',
  styleUrls: ['./purchase-group-by-product.component.scss']
})
export class PurchaseGroupByProductComponent implements OnInit {

  salesRegisterTable = [
    { vendorCode: 'V001', vendorName: 'Vendor A', productCode: 'P001', productName: 'Product A', qty: 10, grossAmount: 1500.50, headerDiscount: 100.25, detailsDiscount: 50.75, netAmount: 1349.50, taxInputAmount: 135.00, taxOutputAmount: 135.00, totalAmount: 1484.50 },
    { vendorCode: 'V002', vendorName: 'Vendor B', productCode: 'P002', productName: 'Product B', qty: 5, grossAmount: 700.00, headerDiscount: 70.00, detailsDiscount: 35.00, netAmount: 595.00, taxInputAmount: 59.50, taxOutputAmount: 59.50, totalAmount: 654.50 },
    { vendorCode: 'V003', vendorName: 'Vendor C', productCode: 'P003', productName: 'Product C', qty: 20, grossAmount: 2500.75, headerDiscount: 150.25, detailsDiscount: 75.50, netAmount: 2274.00, taxInputAmount: 227.40, taxOutputAmount: 227.40, totalAmount: 2501.40 },
    { vendorCode: 'V004', vendorName: 'Vendor D', productCode: 'P004', productName: 'Product D', qty: 15, grossAmount: 1200.00, headerDiscount: 120.00, detailsDiscount: 60.00, netAmount: 1020.00, taxInputAmount: 102.00, taxOutputAmount: 102.00, totalAmount: 1122.00 },
    { vendorCode: 'V005', vendorName: 'Vendor E', productCode: 'P005', productName: 'Product E', qty: 8, grossAmount: 850.00, headerDiscount: 85.00, detailsDiscount: 42.50, netAmount: 722.50, taxInputAmount: 72.25, taxOutputAmount: 72.25, totalAmount: 794.75 },
    { vendorCode: 'V006', vendorName: 'Vendor F', productCode: 'P006', productName: 'Product F', qty: 30, grossAmount: 3600.00, headerDiscount: 200.00, detailsDiscount: 100.00, netAmount: 3300.00, taxInputAmount: 330.00, taxOutputAmount: 330.00, totalAmount: 3630.00 },
    { vendorCode: 'V007', vendorName: 'Vendor G', productCode: 'P007', productName: 'Product G', qty: 25, grossAmount: 2000.00, headerDiscount: 150.00, detailsDiscount: 75.00, netAmount: 1775.00, taxInputAmount: 177.50, taxOutputAmount: 177.50, totalAmount: 1952.50 },
    { vendorCode: 'V008', vendorName: 'Vendor H', productCode: 'P008', productName: 'Product H', qty: 18, grossAmount: 2200.00, headerDiscount: 130.00, detailsDiscount: 65.00, netAmount: 2005.00, taxInputAmount: 200.50, taxOutputAmount: 200.50, totalAmount: 2205.50 },
    { vendorCode: 'V009', vendorName: 'Vendor I', productCode: 'P009', productName: 'Product I', qty: 12, grossAmount: 1500.00, headerDiscount: 100.00, detailsDiscount: 50.00, netAmount: 1350.00, taxInputAmount: 135.00, taxOutputAmount: 135.00, totalAmount: 1485.00 },
    { vendorCode: 'V010', vendorName: 'Vendor J', productCode: 'P010', productName: 'Product J', qty: 40, grossAmount: 5000.00, headerDiscount: 300.00, detailsDiscount: 150.00, netAmount: 4550.00, taxInputAmount: 455.00, taxOutputAmount: 455.00, totalAmount: 5005.00 },
    { vendorCode: 'V011', vendorName: 'Vendor K', productCode: 'P011', productName: 'Product K', qty: 22, grossAmount: 1800.00, headerDiscount: 120.00, detailsDiscount: 60.00, netAmount: 1620.00, taxInputAmount: 162.00, taxOutputAmount: 162.00, totalAmount: 1782.00 },
    { vendorCode: 'V012', vendorName: 'Vendor L', productCode: 'P012', productName: 'Product L', qty: 14, grossAmount: 1400.00, headerDiscount: 80.00, detailsDiscount: 40.00, netAmount: 1280.00, taxInputAmount: 128.00, taxOutputAmount: 128.00, totalAmount: 1408.00 },
    { vendorCode: 'V013', vendorName: 'Vendor M', productCode: 'P013', productName: 'Product M', qty: 10, grossAmount: 1000.00, headerDiscount: 60.00, detailsDiscount: 30.00, netAmount: 910.00, taxInputAmount: 91.00, taxOutputAmount: 91.00, totalAmount: 1001.00 },
    { vendorCode: 'V014', vendorName: 'Vendor N', productCode: 'P014', productName: 'Product N', qty: 28, grossAmount: 2800.00, headerDiscount: 160.00, detailsDiscount: 80.00, netAmount: 2560.00, taxInputAmount: 256.00, taxOutputAmount: 256.00, totalAmount: 2816.00 },
    { vendorCode: 'V015', vendorName: 'Vendor O', productCode: 'P015', productName: 'Product O', qty: 19, grossAmount: 1900.00, headerDiscount: 110.00, detailsDiscount: 55.00, netAmount: 1735.00, taxInputAmount: 173.50, taxOutputAmount: 173.50, totalAmount: 1908.50 },
    { vendorCode: 'V016', vendorName: 'Vendor P', productCode: 'P016', productName: 'Product P', qty: 6, grossAmount: 700.00, headerDiscount: 70.00, detailsDiscount: 35.00, netAmount: 595.00, taxInputAmount: 59.50, taxOutputAmount: 59.50, totalAmount: 654.50 },
    { vendorCode: 'V017', vendorName: 'Vendor Q', productCode: 'P017', productName: 'Product Q', qty: 13, grossAmount: 1300.00, headerDiscount: 90.00, detailsDiscount: 45.00, netAmount: 1165.00, taxInputAmount: 116.50, taxOutputAmount: 116.50, totalAmount: 1281.50 },
    { vendorCode: 'V018', vendorName: 'Vendor R', productCode: 'P018', productName: 'Product R', qty: 24, grossAmount: 2400.00, headerDiscount: 150.00, detailsDiscount: 75.00, netAmount: 2175.00, taxInputAmount: 217.50, taxOutputAmount: 217.50, totalAmount: 2392.50 },
    { vendorCode: 'V019', vendorName: 'Vendor S', productCode: 'P019', productName: 'Product S', qty: 9, grossAmount: 950.00, headerDiscount: 95.00, detailsDiscount: 47.50, netAmount: 807.50, taxInputAmount: 80.75, taxOutputAmount: 80.75, totalAmount: 888.00 },
    { vendorCode: 'V020', vendorName: 'Vendor T', productCode: 'P020', productName: 'Product T', qty: 17, grossAmount: 1700.00, headerDiscount: 110.00, detailsDiscount: 55.00, netAmount: 1535.00, taxInputAmount: 153.50, taxOutputAmount: 153.50, totalAmount: 1688.50 }
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