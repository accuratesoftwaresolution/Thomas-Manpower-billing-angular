import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-register',
  templateUrl: './stock-register.component.html',
  styleUrls: ['./stock-register.component.scss']
})
export class StockRegisterComponent implements OnInit {

  showFilterOption:boolean = false

  stockRegisterTable = [
    { date: '2024-11-01', voucherType: 'Purchase', voucherNo: 'V001', unit: 'Kg', receiptQty: 50.00, receiptRate: 120.50, issueQty: 0.00, issueRate: 0.00, averageRate: 120.50, balanceQty: 50.00 },
    { date: '2024-11-02', voucherType: 'Sale', voucherNo: 'V002', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 10.00, issueRate: 125.00, averageRate: 120.80, balanceQty: 40.00 },
    { date: '2024-11-03', voucherType: 'Purchase', voucherNo: 'V003', unit: 'Kg', receiptQty: 30.00, receiptRate: 118.75, issueQty: 0.00, issueRate: 0.00, averageRate: 119.75, balanceQty: 70.00 },
    { date: '2024-11-04', voucherType: 'Sale', voucherNo: 'V004', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 20.00, issueRate: 121.00, averageRate: 119.50, balanceQty: 50.00 },
    { date: '2024-11-05', voucherType: 'Purchase', voucherNo: 'V005', unit: 'Kg', receiptQty: 40.00, receiptRate: 119.25, issueQty: 0.00, issueRate: 0.00, averageRate: 119.40, balanceQty: 90.00 },
    { date: '2024-11-06', voucherType: 'Sale', voucherNo: 'V006', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 15.00, issueRate: 122.50, averageRate: 119.85, balanceQty: 75.00 },
    { date: '2024-11-07', voucherType: 'Purchase', voucherNo: 'V007', unit: 'Kg', receiptQty: 25.00, receiptRate: 117.80, issueQty: 0.00, issueRate: 0.00, averageRate: 118.90, balanceQty: 100.00 },
    { date: '2024-11-08', voucherType: 'Sale', voucherNo: 'V008', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 30.00, issueRate: 120.00, averageRate: 118.60, balanceQty: 70.00 },
    { date: '2024-11-09', voucherType: 'Purchase', voucherNo: 'V009', unit: 'Kg', receiptQty: 35.00, receiptRate: 118.90, issueQty: 0.00, issueRate: 0.00, averageRate: 118.75, balanceQty: 105.00 },
    { date: '2024-11-10', voucherType: 'Sale', voucherNo: 'V010', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 25.00, issueRate: 121.50, averageRate: 119.10, balanceQty: 80.00 },
    { date: '2024-11-11', voucherType: 'Purchase', voucherNo: 'V011', unit: 'Kg', receiptQty: 20.00, receiptRate: 119.50, issueQty: 0.00, issueRate: 0.00, averageRate: 119.25, balanceQty: 100.00 },
    { date: '2024-11-12', voucherType: 'Sale', voucherNo: 'V012', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 10.00, issueRate: 120.75, averageRate: 119.40, balanceQty: 90.00 },
    { date: '2024-11-13', voucherType: 'Purchase', voucherNo: 'V013', unit: 'Kg', receiptQty: 50.00, receiptRate: 120.20, issueQty: 0.00, issueRate: 0.00, averageRate: 119.90, balanceQty: 140.00 },
    { date: '2024-11-14', voucherType: 'Sale', voucherNo: 'V014', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 40.00, issueRate: 122.00, averageRate: 120.10, balanceQty: 100.00 },
    { date: '2024-11-15', voucherType: 'Purchase', voucherNo: 'V015', unit: 'Kg', receiptQty: 30.00, receiptRate: 119.75, issueQty: 0.00, issueRate: 0.00, averageRate: 120.00, balanceQty: 130.00 },
    { date: '2024-11-16', voucherType: 'Sale', voucherNo: 'V016', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 20.00, issueRate: 123.00, averageRate: 120.50, balanceQty: 110.00 },
    { date: '2024-11-17', voucherType: 'Purchase', voucherNo: 'V017', unit: 'Kg', receiptQty: 15.00, receiptRate: 118.60, issueQty: 0.00, issueRate: 0.00, averageRate: 119.75, balanceQty: 125.00 },
    { date: '2024-11-18', voucherType: 'Sale', voucherNo: 'V018', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 35.00, issueRate: 121.25, averageRate: 120.00, balanceQty: 90.00 },
    { date: '2024-11-19', voucherType: 'Purchase', voucherNo: 'V019', unit: 'Kg', receiptQty: 40.00, receiptRate: 119.30, issueQty: 0.00, issueRate: 0.00, averageRate: 119.65, balanceQty: 130.00 },
    { date: '2024-11-20', voucherType: 'Sale', voucherNo: 'V020', unit: 'Kg', receiptQty: 0.00, receiptRate: 0.00, issueQty: 50.00, issueRate: 122.75, averageRate: 120.50, balanceQty: 80.00 },
];

StockFilterTable = [
  { code: 'S001', name: 'Stock Item 1' },
  { code: 'S002', name: 'Stock Item 2' },
  { code: 'S003', name: 'Stock Item 3' },
  { code: 'S004', name: 'Stock Item 4' },
  { code: 'S005', name: 'Stock Item 5' }
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