import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-wise',
  templateUrl: './company-wise.component.html',
  styleUrls: ['./company-wise.component.scss']
})
export class CompanyWiseComponent implements OnInit {



  activeIndex: number = 0;

  activeState: boolean[] = [false, false, false];

  displayLookupDialog: boolean = false;

  MainTabs: any[] = [
    { title: "Company Codes", content: "Content for Company Codes" },
    { title: "Bins", content: "Content for Bins" },
    { title: "Integration", content: "Content for Integration" },
    { title: "VAT Basic Details", content: "Content for VAT Basic Details" },
    { title: "VAT Configuration", content: "Content for VAT Configuration" },
    { title: "Corporate Tax", content: "Content for Corporate Tax" },
    { title: "Info", content: "Content for Info" },
    { title: "Tags", content: "Content for Tags" },
    { title: "Accounts", content: "Content for Accounts" },
    { title: "Inventory", content: "Content for Inventory" },
    { title: "Currency", content: "Content for Currency" },
    { title: "Miscellaneous Print", content: "Content for Miscellaneous Print" },
    { title: "Internet", content: "Content for Internet" },
    { title: "Master", content: "Content for Master" },
    { title: "Workflow Definition", content: "Content for Workflow Definition" },
    { title: "POS", content: "Content for POS" },
    { title: "External Modules", content: "Content for External Modules" },
    { title: "Allocations", content: "Content for Allocations" },
    { title: "Applicable Company", content: "Content for Applicable Company" },
    { title: "Links", content: "Content for Links" },
    { title: "Master Forms", content: "Content for Master Forms" },

  ];

  MasterDataLookupConfiguration: any[] = [
    { masterName: "Account", lookupConfiguration: "Configuration Button" },
    { masterName: "Cost Center", lookupConfiguration: "Configuration Button" },
    { masterName: "Profit Center", lookupConfiguration: "Configuration Button" },
    { masterName: "Products", lookupConfiguration: "Configuration Button" },
    { masterName: "Salesman", lookupConfiguration: "Configuration Button" },
    { masterName: "Division", lookupConfiguration: "Configuration Button" },
    { masterName: "Department", lookupConfiguration: "Configuration Button" },
    { masterName: "Job", lookupConfiguration: "Configuration Button" },
    { masterName: "Warehouse", lookupConfiguration: "Configuration Button" },
    { masterName: "Other Centre", lookupConfiguration: "Configuration Button" },
    { masterName: "Sales Organization", lookupConfiguration: "Configuration Button" },
    { masterName: "Distribution Channel", lookupConfiguration: "Configuration Button" },
    { masterName: "Sales Office", lookupConfiguration: "Configuration Button" },
    { masterName: "Sales Group", lookupConfiguration: "Configuration Button" },
    { masterName: "Employee Master", lookupConfiguration: "Configuration Button" },
    { masterName: "Place of Supply", lookupConfiguration: "Configuration Button" },
    { masterName: "Jurisdiction", lookupConfiguration: "Configuration Button" }
  ];

  lookupConfigurations = [
    { masterCode: 5001, description: 'Company System ID', fieldName: 'Allh_Co_SysID', width: 0 },
    { masterCode: 5002, description: 'Company Code', fieldName: 'Allh_Co_Cod', width: 0 },
    { masterCode: 5003, description: 'Group Company Code', fieldName: 'Allh_GroupCo_Code', width: 25 },
    { masterCode: 5004, description: 'Account Code', fieldName: 'Allh_First_Acc_Code', width: 25 },
    { masterCode: 5005, description: 'Account Name', fieldName: 'Allh_First_Acc_Name', width: 45 },
    { masterCode: 5006, description: 'Credit Limit', fieldName: 'Allh_CrLimit_Amount', width: 10 },
    { masterCode: 5007, description: 'Credit Days', fieldName: 'Allh_Credit_Number_Days_Block', width: 10 },
  ];

  accountFields = [
    { label: 'VAT Input Account', input1: '', input2: '' },
    { label: 'VAT Output Account', input1: '', input2: '' },
    { label: 'Consignment Sales', input1: '', input2: '' },
    { label: 'Export Sales', input1: '', input2: '' },
    { label: 'Intercompany Sales', input1: '', input2: '' },
    { label: 'Sat Sales', input1: '', input2: '' },
    { label: 'Interstate Purchase', input1: '', input2: '' },
    { label: 'Sat Purchase', input1: '', input2: '' },
    { label: 'Cash Account', input1: '', input2: '' },
    { label: 'Consignment Purchase', input1: '', input2: '' },
    { label: 'Capital Purchase', input1: '', input2: '' },
    { label: 'Fuel Account', input1: '', input2: '' },
];

divisionFields = [
  { label: 'VAT Input Account', input1: '', input2: '' },
  { label: 'Tax Office', input1: '', input2: '' },
  { label: 'Lov Code', input1: '', input2: '' },
  { label: 'CSRTC', input1: '', input2: '' },
  { label: 'Style of Business', input1: '', input2: '' },
  { label: 'Branch Sales', input1: '', input2: '' },
  { label: 'Import Purchase', input1: '', input2: '' },
  { label: 'Sales To Dealers', input1: '', input2: '' },
  { label: 'Sales Of EOU', input1: '', input2: '' },
  { label: 'Service Tax', input1: '', input2: '' },
  { label: '', input1: '', input2: '' },
  { label: '', input1: '', input2: '' },
];

CurrencyData = [{},{},{}]

CurrencyTable = [
  { field: 'code', header: 'Currency Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: 'name', header: 'Currency Name', hide: false, mandatory: false, width: '9rem', data: '1234567891234512345678912345', manual: false },
  { field: 'symbol', header: 'Symbol', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: 'conversionRate', header: 'Conversion Rate', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: 'decimal', header: 'Decimal', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: 'groupCompanyCurrency', header: 'Group Company Currency', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false, options: ['Yes', 'No'] },
  { field: 'baseCurrency', header: 'Base Currency', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false, options: ['Yes', 'No'] }
];


ApplicableCompanyTable = [
  { field: 'code', header: 'Currency Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: 'name', header: 'Currency Name', hide: false, mandatory: false, width: '9rem', data: '1234567891234512345678912345', manual: false },
  
];

AllocationTable = [
  { field: '12345678912345', header: 'Field Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: '12345678912345', header: 'Field Description', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: '12345678912345', header: 'Field Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  { field: '12345678912345', header: 'Display Width', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  ];

  LinkCreationTable = [
    { field: '12345678912345', header: 'Link Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Base Document Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Linked Document Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: '1st Linking Field', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: '2nd Linking Field', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Balance Qty', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Link Voucher Number 01', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Link Voucher Number 02', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Link Voucher Number 03', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    // { field: '12345678912345', header: 'Link Open/Closed', hide: false, mandatory: false, width: '5rem', data: '', manual: false },
    ];

    MasterFormTable = [
      { field: '12345678912345', header: 'Posting Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Posting Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'SQL_Field_Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Symbol', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Amount', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Formula', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Debit Account First Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Debit Account First Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Credit Account Second Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Credit Account Second Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      ];

      DetailFormulaTable = [
        { field: '12345678912345', header: 'Posting Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Posting Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'SQL_Field_Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Symbol', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Amount', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Formula', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Debit Account First Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Debit Account First Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Credit Account Second Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        { field: '12345678912345', header: 'Credit Account Second Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
        ];
    LinkCreationTableData = [
      { field: '12345678912345', header: 'Link Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Base Document Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Linked Document Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: '1st Linking Field', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: '2nd Linking Field', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Balance Qty', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Link Voucher Number 01', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Link Voucher Number 02', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      { field: '12345678912345', header: 'Link Voucher Number 03', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
      // { field: '12345678912345', header: 'Link Open/Closed', hide: false, mandatory: false, width: '5rem', data: '', manual: false },
      ];



  constructor() { }

  ngOnInit(): void {
  }


  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }

  showLookupDialog() {
    this.displayLookupDialog = true;
  }

}
