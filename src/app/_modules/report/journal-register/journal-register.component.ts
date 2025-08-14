import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journal-register',
  templateUrl: './journal-register.component.html',
  styleUrls: ['./journal-register.component.scss']
})
export class JournalRegisterComponent implements OnInit {

  showFilterOption:boolean = false

   journalRegisterTable = [
    { slNo: 1, date: '2024-11-01', documentType: 'Invoice', voucher: 'VCH001', code: 'C001', name: 'John Doe', narrationName: 'Monthly Rent Payment', interCompanyTransaction: 'No', debit: 5000.00, credit: 0.00 },
    { slNo: 2, date: '2024-11-02', documentType: 'Receipt', voucher: 'VCH002', code: 'C002', name: 'Jane Smith', narrationName: 'Consultation Fees', interCompanyTransaction: 'Yes', debit: 0.00, credit: 3000.00 },
    { slNo: 3, date: '2024-11-03', documentType: 'Payment', voucher: 'VCH003', code: 'C003', name: 'Acme Corp', narrationName: 'Office Supplies', interCompanyTransaction: 'No', debit: 1200.00, credit: 0.00 },
    { slNo: 4, date: '2024-11-04', documentType: 'Invoice', voucher: 'VCH004', code: 'C004', name: 'XYZ Ltd', narrationName: 'Project Advance', interCompanyTransaction: 'Yes', debit: 0.00, credit: 15000.00 },
    { slNo: 5, date: '2024-11-05', documentType: 'Journal', voucher: 'VCH005', code: 'C005', name: 'Alpha Inc', narrationName: 'Salary Payment', interCompanyTransaction: 'No', debit: 20000.00, credit: 0.00 },
    { slNo: 6, date: '2024-11-06', documentType: 'Payment', voucher: 'VCH006', code: 'C006', name: 'Beta LLC', narrationName: 'Service Charges', interCompanyTransaction: 'No', debit: 500.00, credit: 0.00 },
    { slNo: 7, date: '2024-11-07', documentType: 'Receipt', voucher: 'VCH007', code: 'C007', name: 'Gamma Pvt', narrationName: 'Rent Received', interCompanyTransaction: 'Yes', debit: 0.00, credit: 7000.00 },
    { slNo: 8, date: '2024-11-08', documentType: 'Invoice', voucher: 'VCH008', code: 'C008', name: 'Delta Co', narrationName: 'Consultation Fees', interCompanyTransaction: 'No', debit: 0.00, credit: 4500.00 },
    { slNo: 9, date: '2024-11-09', documentType: 'Journal', voucher: 'VCH009', code: 'C009', name: 'Epsilon LLC', narrationName: 'Travel Expenses', interCompanyTransaction: 'No', debit: 1500.00, credit: 0.00 },
    { slNo: 10, date: '2024-11-10', documentType: 'Receipt', voucher: 'VCH010', code: 'C010', name: 'Zeta Pvt', narrationName: 'Maintenance Charges', interCompanyTransaction: 'Yes', debit: 0.00, credit: 2500.00 },
    { slNo: 11, date: '2024-11-11', documentType: 'Invoice', voucher: 'VCH011', code: 'C011', name: 'Kappa Co', narrationName: 'Project Income', interCompanyTransaction: 'No', debit: 0.00, credit: 8000.00 },
    { slNo: 12, date: '2024-11-12', documentType: 'Journal', voucher: 'VCH012', code: 'C012', name: 'Sigma Ltd', narrationName: 'Utility Expenses', interCompanyTransaction: 'No', debit: 3000.00, credit: 0.00 },
    { slNo: 13, date: '2024-11-13', documentType: 'Payment', voucher: 'VCH013', code: 'C013', name: 'Omicron Corp', narrationName: 'Freelance Payment', interCompanyTransaction: 'Yes', debit: 5000.00, credit: 0.00 },
    { slNo: 14, date: '2024-11-14', documentType: 'Receipt', voucher: 'VCH014', code: 'C014', name: 'Lambda Pvt', narrationName: 'Service Revenue', interCompanyTransaction: 'No', debit: 0.00, credit: 4000.00 },
    { slNo: 15, date: '2024-11-15', documentType: 'Invoice', voucher: 'VCH015', code: 'C015', name: 'Omega Co', narrationName: 'Office Rent', interCompanyTransaction: 'No', debit: 0.00, credit: 2000.00 },
    { slNo: 16, date: '2024-11-16', documentType: 'Payment', voucher: 'VCH016', code: 'C016', name: 'Theta Ltd', narrationName: 'Consultancy Fees', interCompanyTransaction: 'Yes', debit: 12000.00, credit: 0.00 },
    { slNo: 17, date: '2024-11-17', documentType: 'Receipt', voucher: 'VCH017', code: 'C017', name: 'Eta Corp', narrationName: 'Interest Income', interCompanyTransaction: 'No', debit: 0.00, credit: 600.00 },
    { slNo: 18, date: '2024-11-18', documentType: 'Journal', voucher: 'VCH018', code: 'C018', name: 'Phi Inc', narrationName: 'Miscellaneous Expenses', interCompanyTransaction: 'No', debit: 800.00, credit: 0.00 },
    { slNo: 19, date: '2024-11-19', documentType: 'Invoice', voucher: 'VCH019', code: 'C019', name: 'Chi Pvt', narrationName: 'Utility Bills', interCompanyTransaction: 'Yes', debit: 0.00, credit: 900.00 },
    { slNo: 20, date: '2024-11-20', documentType: 'Receipt', voucher: 'VCH020', code: 'C020', name: 'Psi Ltd', narrationName: 'Consultancy Income', interCompanyTransaction: 'No', debit: 0.00, credit: 11000.00 }
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