import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-register',
  templateUrl: './purchase-register.component.html',
  styleUrls: ['./purchase-register.component.scss']
})
export class PurchaseRegisterComponent implements OnInit {

   salesRegisterTable = [
    { slNo: 1, voucherType: 'Sales', voucherNumber: '001', date: '2024-11-15', customerCode: 'CUST1001', customerName: 'John Doe', grossAmount: 1000.00, headerDiscount: 50.00, detailsDiscount: 30.00, netAmount: 920.00, taxOutput: 92.00, totalAmount: 1012.00 },
    { slNo: 2, voucherType: 'Sales', voucherNumber: '002', date: '2024-11-15', customerCode: 'CUST1002', customerName: 'Jane Smith', grossAmount: 2000.00, headerDiscount: 100.00, detailsDiscount: 60.00, netAmount: 1840.00, taxOutput: 184.00, totalAmount: 2024.00 },
    { slNo: 3, voucherType: 'Sales', voucherNumber: '003', date: '2024-11-15', customerCode: 'CUST1003', customerName: 'Alice Brown', grossAmount: 1500.00, headerDiscount: 75.00, detailsDiscount: 45.00, netAmount: 1380.00, taxOutput: 138.00, totalAmount: 1518.00 },
    { slNo: 4, voucherType: 'Sales', voucherNumber: '004', date: '2024-11-16', customerCode: 'CUST1004', customerName: 'Bob White', grossAmount: 1200.00, headerDiscount: 60.00, detailsDiscount: 36.00, netAmount: 1104.00, taxOutput: 110.40, totalAmount: 1214.40 },
    { slNo: 5, voucherType: 'Sales', voucherNumber: '005', date: '2024-11-16', customerCode: 'CUST1005', customerName: 'Carol Green', grossAmount: 1800.00, headerDiscount: 90.00, detailsDiscount: 54.00, netAmount: 1656.00, taxOutput: 165.60, totalAmount: 1821.60 },
    { slNo: 6, voucherType: 'Sales', voucherNumber: '006', date: '2024-11-17', customerCode: 'CUST1006', customerName: 'David Blue', grossAmount: 2100.00, headerDiscount: 105.00, detailsDiscount: 63.00, netAmount: 1932.00, taxOutput: 193.20, totalAmount: 2125.20 },
    { slNo: 7, voucherType: 'Sales', voucherNumber: '007', date: '2024-11-17', customerCode: 'CUST1007', customerName: 'Eva Gray', grossAmount: 2300.00, headerDiscount: 115.00, detailsDiscount: 69.00, netAmount: 2116.00, taxOutput: 211.60, totalAmount: 2327.60 },
    { slNo: 8, voucherType: 'Sales', voucherNumber: '008', date: '2024-11-18', customerCode: 'CUST1008', customerName: 'Frank Black', grossAmount: 2500.00, headerDiscount: 125.00, detailsDiscount: 75.00, netAmount: 2300.00, taxOutput: 2300.00, totalAmount: 2530.00 },
    { slNo: 9, voucherType: 'Sales', voucherNumber: '009', date: '2024-11-18', customerCode: 'CUST1009', customerName: 'Grace Pink', grossAmount: 2700.00, headerDiscount: 135.00, detailsDiscount: 81.00, netAmount: 2484.00, taxOutput: 248.40, totalAmount: 2732.40 },
    { slNo: 10, voucherType: 'Sales', voucherNumber: '010', date: '2024-11-19', customerCode: 'CUST1010', customerName: 'Henry Orange', grossAmount: 3000.00, headerDiscount: 150.00, detailsDiscount: 90.00, netAmount: 2760.00, taxOutput: 276.00, totalAmount: 3036.00 },
    { slNo: 11, voucherType: 'Sales', voucherNumber: '011', date: '2024-11-19', customerCode: 'CUST1011', customerName: 'Ivy Purple', grossAmount: 3200.00, headerDiscount: 160.00, detailsDiscount: 96.00, netAmount: 2944.00, taxOutput: 294.40, totalAmount: 3238.40 },
    { slNo: 12, voucherType: 'Sales', voucherNumber: '012', date: '2024-11-20', customerCode: 'CUST1012', customerName: 'Jack Silver', grossAmount: 3400.00, headerDiscount: 170.00, detailsDiscount: 102.00, netAmount: 3128.00, taxOutput: 312.80, totalAmount: 3440.80 },
    { slNo: 13, voucherType: 'Sales', voucherNumber: '013', date: '2024-11-20', customerCode: 'CUST1013', customerName: 'Kara Gold', grossAmount: 3600.00, headerDiscount: 180.00, detailsDiscount: 108.00, netAmount: 3312.00, taxOutput: 331.20, totalAmount: 3643.20 },
    { slNo: 14, voucherType: 'Sales', voucherNumber: '014', date: '2024-11-21', customerCode: 'CUST1014', customerName: 'Leo Bronze', grossAmount: 3800.00, headerDiscount: 190.00, detailsDiscount: 114.00, netAmount: 3496.00, taxOutput: 349.60, totalAmount: 3845.60 },
    { slNo: 15, voucherType: 'Sales', voucherNumber: '015', date: '2024-11-21', customerCode: 'CUST1015', customerName: 'Mia White', grossAmount: 4000.00, headerDiscount: 200.00, detailsDiscount: 120.00, netAmount: 3680.00, taxOutput: 368.00, totalAmount: 4048.00 },
    { slNo: 16, voucherType: 'Sales', voucherNumber: '016', date: '2024-11-22', customerCode: 'CUST1016', customerName: 'Noah Brown', grossAmount: 4200.00, headerDiscount: 210.00, detailsDiscount: 126.00, netAmount: 3864.00, taxOutput: 386.40, totalAmount: 4250.40 },
    { slNo: 17, voucherType: 'Sales', voucherNumber: '017', date: '2024-11-22', customerCode: 'CUST1017', customerName: 'Olivia Black', grossAmount: 4400.00, headerDiscount: 220.00, detailsDiscount: 132.00, netAmount: 4048.00, taxOutput: 404.80, totalAmount: 4452.80 },
    { slNo: 18, voucherType: 'Sales', voucherNumber: '018', date: '2024-11-23', customerCode: 'CUST1018', customerName: 'Paul Blue', grossAmount: 4600.00, headerDiscount: 230.00, detailsDiscount: 138.00, netAmount: 4232.00, taxOutput: 423.20, totalAmount: 4655.20 },
    { slNo: 19, voucherType: 'Sales', voucherNumber: '019', date: '2024-11-23', customerCode: 'CUST1019', customerName: 'Quinn Red', grossAmount: 4800.00, headerDiscount: 240.00, detailsDiscount: 144.00, netAmount: 4416.00, taxOutput: 441.60, totalAmount: 4857.60 },
    { slNo: 20, voucherType: 'Sales', voucherNumber: '020', date: '2024-11-24', customerCode: 'CUST1020', customerName: 'Ray Green', grossAmount: 5000.00, headerDiscount: 250.00, detailsDiscount: 150.00, netAmount: 4600.00, taxOutput: 460.00, totalAmount: 5060.00 },
    { slNo: 21, voucherType: 'Sales', voucherNumber: '021', date: '2024-11-24', customerCode: 'CUST1021', customerName: 'Sara Yellow', grossAmount: 5200.00, headerDiscount: 260.00, detailsDiscount: 156.00, netAmount: 4768.00, taxOutput: 476.80, totalAmount: 5244.80 },
    { slNo: 24, voucherType: 'Sales', voucherNumber: '024', date: '2024-11-25', customerCode: 'CUST1024', customerName: 'Tom Purple', grossAmount: 5400.00, headerDiscount: 270.00, detailsDiscount: 162.00, netAmount: 4968.00, taxOutput: 496.80, totalAmount: 5464.80 },
    { slNo: 25, voucherType: 'Sales', voucherNumber: '025', date: '2024-11-25', customerCode: 'CUST1025', customerName: 'Uma Pink', grossAmount: 5600.00, headerDiscount: 280.00, detailsDiscount: 168.00, netAmount: 5144.00, taxOutput: 514.40, totalAmount: 5658.40 },
    { slNo: 26, voucherType: 'Sales', voucherNumber: '026', date: '2024-11-26', customerCode: 'CUST1026', customerName: 'Vera Gray', grossAmount: 5800.00, headerDiscount: 290.00, detailsDiscount: 174.00, netAmount: 5236.00, taxOutput: 523.60, totalAmount: 5826.60 },
    { slNo: 27, voucherType: 'Sales', voucherNumber: '027', date: '2024-11-26', customerCode: 'CUST1027', customerName: 'Walter Black', grossAmount: 6000.00, headerDiscount: 300.00, detailsDiscount: 180.00, netAmount: 5400.00, taxOutput: 540.00, totalAmount: 5940.00 },
    { slNo: 28, voucherType: 'Sales', voucherNumber: '028', date: '2024-11-27', customerCode: 'CUST1028', customerName: 'Xena Silver', grossAmount: 6200.00, headerDiscount: 310.00, detailsDiscount: 186.00, netAmount: 5596.00, taxOutput: 559.60, totalAmount: 6755.60 },
    { slNo: 29, voucherType: 'Sales', voucherNumber: '029', date: '2024-11-27', customerCode: 'CUST1029', customerName: 'Yara Orange', grossAmount: 6400.00, headerDiscount: 320.00, detailsDiscount: 192.00, netAmount: 5776.00, taxOutput: 577.60, totalAmount: 6973.60 },
    { slNo: 30, voucherType: 'Sales', voucherNumber: '030', date: '2024-11-28', customerCode: 'CUST1030', customerName: 'Zane Gold', grossAmount: 6600.00, headerDiscount: 330.00, detailsDiscount: 198.00, netAmount: 5940.00, taxOutput: 594.00, totalAmount: 7196.00 }
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