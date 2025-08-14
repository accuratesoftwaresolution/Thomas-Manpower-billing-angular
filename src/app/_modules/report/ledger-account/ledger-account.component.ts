import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ledger-account',
  templateUrl: './ledger-account.component.html',
  styleUrls: ['./ledger-account.component.scss']
})
export class LedgerAccountComponent implements OnInit {

  showFilterOption:boolean = false

  LedgerAccountTable = [
    { date: '2024-11-01', documentType: 'Invoice', voucher: 'V001', code: 'C001', name: 'John Doe', narrationName: 'Payment for Services', chequeNo: 'CHK001', remarks: 'Approved', interCompanyTransaction: 'Yes', debit: 5000.00, credit: 0.00, balance: 5000.00 },
    { date: '2024-11-02', documentType: 'Receipt', voucher: 'V002', code: 'C002', name: 'Jane Smith', narrationName: 'Advance Payment', chequeNo: 'CHK002', remarks: 'Pending', interCompanyTransaction: 'No', debit: 0.00, credit: 3000.00, balance: 2000.00 },
    { date: '2024-11-03', documentType: 'Payment', voucher: 'V003', code: 'C003', name: 'Acme Corp', narrationName: 'Office Supplies', chequeNo: 'CHK003', remarks: 'Cleared', interCompanyTransaction: 'Yes', debit: 2000.00, credit: 0.00, balance: 4000.00 },
    { date: '2024-11-04', documentType: 'Journal', voucher: 'V004', code: 'C004', name: 'Global Ltd.', narrationName: 'Adjustment Entry', chequeNo: 'CHK004', remarks: 'Reviewed', interCompanyTransaction: 'No', debit: 0.00, credit: 1000.00, balance: 3000.00 },
    { date: '2024-11-05', documentType: 'Invoice', voucher: 'V005', code: 'C005', name: 'Alice Brown', narrationName: 'Consulting Fees', chequeNo: 'CHK005', remarks: 'Verified', interCompanyTransaction: 'Yes', debit: 4000.00, credit: 0.00, balance: 7000.00 },
    { date: '2024-11-06', documentType: 'Receipt', voucher: 'V006', code: 'C006', name: 'Bob White', narrationName: 'Loan Repayment', chequeNo: 'CHK006', remarks: 'Approved', interCompanyTransaction: 'No', debit: 0.00, credit: 2000.00, balance: 5000.00 },
    { date: '2024-11-07', documentType: 'Payment', voucher: 'V007', code: 'C007', name: 'XYZ Inc.', narrationName: 'Utility Bills', chequeNo: 'CHK007', remarks: 'Cleared', interCompanyTransaction: 'Yes', debit: 1500.00, credit: 0.00, balance: 3500.00 },
    { date: '2024-11-08', documentType: 'Journal', voucher: 'V008', code: 'C008', name: 'Delta Corp', narrationName: 'End-of-Month Adjustment', chequeNo: 'CHK008', remarks: 'Reviewed', interCompanyTransaction: 'No', debit: 0.00, credit: 500.00, balance: 3000.00 },
    { date: '2024-11-09', documentType: 'Invoice', voucher: 'V009', code: 'C009', name: 'Gamma LLC', narrationName: 'Software Development', chequeNo: 'CHK009', remarks: 'Pending', interCompanyTransaction: 'Yes', debit: 6000.00, credit: 0.00, balance: 9000.00 },
    { date: '2024-11-10', documentType: 'Receipt', voucher: 'V010', code: 'C010', name: 'Lambda Enterprises', narrationName: 'Contract Payment', chequeNo: 'CHK010', remarks: 'Approved', interCompanyTransaction: 'No', debit: 0.00, credit: 3000.00, balance: 6000.00 },
    { date: '2024-11-11', documentType: 'Payment', voucher: 'V011', code: 'C011', name: 'Sigma Associates', narrationName: 'Employee Salaries', chequeNo: 'CHK011', remarks: 'Verified', interCompanyTransaction: 'Yes', debit: 4000.00, credit: 0.00, balance: 2000.00 },
    { date: '2024-11-12', documentType: 'Journal', voucher: 'V012', code: 'C012', name: 'Theta Inc.', narrationName: 'Depreciation Adjustment', chequeNo: 'CHK012', remarks: 'Reviewed', interCompanyTransaction: 'No', debit: 0.00, credit: 500.00, balance: 1500.00 },
    { date: '2024-11-13', documentType: 'Invoice', voucher: 'V013', code: 'C013', name: 'Epsilon Ltd.', narrationName: 'IT Support', chequeNo: 'CHK013', remarks: 'Pending', interCompanyTransaction: 'Yes', debit: 2000.00, credit: 0.00, balance: 3500.00 },
    { date: '2024-11-14', documentType: 'Receipt', voucher: 'V014', code: 'C014', name: 'Alpha Systems', narrationName: 'Overdue Payment', chequeNo: 'CHK014', remarks: 'Approved', interCompanyTransaction: 'No', debit: 0.00, credit: 2500.00, balance: 1000.00 },
    { date: '2024-11-15', documentType: 'Payment', voucher: 'V015', code: 'C015', name: 'Omega Corp', narrationName: 'Office Rent', chequeNo: 'CHK015', remarks: 'Cleared', interCompanyTransaction: 'Yes', debit: 1000.00, credit: 0.00, balance: 0.00 },
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