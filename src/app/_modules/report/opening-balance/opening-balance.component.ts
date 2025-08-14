import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opening-balance',
  templateUrl: './opening-balance.component.html',
  styleUrls: ['./opening-balance.component.scss']
})
export class OpeningBalanceComponent implements OnInit {

  accountDataTable = [
    {
      slNo: 1,
      accountCode: 'ACC001',
      accountName: 'Cash',
      taxableAmount: 1000,
      taxableTypeCode: 'TC01',
      taxableTypeName: 'Goods',
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
      remarksCode: 'RC02',
      remarksName: 'Deposit'
    },{ slNo: 2,},{ slNo: 2,},{ slNo: 2,}
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