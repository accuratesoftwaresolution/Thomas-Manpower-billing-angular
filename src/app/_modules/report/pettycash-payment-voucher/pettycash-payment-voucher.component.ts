import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pettycash-payment-voucher',
  templateUrl: './pettycash-payment-voucher.component.html',
  styleUrls: ['./pettycash-payment-voucher.component.scss']
})
export class PettycashPaymentVoucherComponent implements OnInit {

  accountDataTable = [
    {
      slNo: 1,
      accountCode: 'ACC001',
      accountName: 'Cash',
      taxableAmount: 1000,
      taxableTypeCode: 'TC01',
      taxableTypeName: 'Goods',
      taxCode: 'TX01',
      taxName: 'VAT',
      taxPercentage: 5,
      taxAmount: 50,
      totalInclVAT: 1050,
      interCoCode: 'IC01',
      interCoName: 'Inter Company A',
      voucherNo: 'V001',
      remarksCode: 'RC01',
      remarksName: 'Opening Balance'
    },
    {
      slNo: 2,
      accountCode: 'ACC002',
      accountName: 'Bank',
      taxableAmount: 2000,
      taxableTypeCode: 'TC02',
      taxableTypeName: 'Services',
      taxCode: 'TX02',
      taxName: 'Service Tax',
      taxPercentage: 10,
      taxAmount: 200,
      totalInclVAT: 2200,
      interCoCode: 'IC02',
      interCoName: 'Inter Company B',
      voucherNo: 'V002',
      remarksCode: 'RC02',
      remarksName: 'Deposit'
    },
    {
      slNo: 1,
      accountCode: 'ACC001',
      accountName: 'Cash',
      taxableAmount: 1000,
      taxableTypeCode: 'TC01',
      taxableTypeName: 'Goods',
      taxCode: 'TX01',
      taxName: 'VAT',
      taxPercentage: 5,
      taxAmount: 50,
      totalInclVAT: 1050,
      interCoCode: 'IC01',
      interCoName: 'Inter Company A',
      voucherNo: 'V001',
      remarksCode: 'RC01',
      remarksName: 'Opening Balance'
    },
    {
      slNo: 2,
      accountCode: 'ACC002',
      accountName: 'Bank',
      taxableAmount: 2000,
      taxableTypeCode: 'TC02',
      taxableTypeName: 'Services',
      taxCode: 'TX02',
      taxName: 'Service Tax',
      taxPercentage: 10,
      taxAmount: 200,
      totalInclVAT: 2200,
      interCoCode: 'IC02',
      interCoName: 'Inter Company B',
      voucherNo: 'V002',
      remarksCode: 'RC02',
      remarksName: 'Deposit'
    },
    // Add more rows as needed
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