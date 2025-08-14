import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assets-group',
  templateUrl: './assets-group.component.html',
  styleUrls: ['./assets-group.component.scss']
})
export class AssetsGroupComponent implements OnInit {

  AssetsCategoryTable = [
    {
      categorySysID: 'CAT001',
      fixedAssetsAccountCode: 'FAAC001',
      fixedAssetsAccountName: 'Fixed Asset - Equipment',
      accumulatedDepreciationAccountCode: 'ADAC001',
      accumulatedDepreciationAccountName: 'Accumulated Depreciation - Equipment',
      depreciationExpensesAccountCode: 'DEAC001',
      depreciationExpensesAccountName: 'Depreciation Expense - Equipment',
      assetsGainAccount: 'GA001',
      assetsLossAccount: 'LA001'
    },
    {
      categorySysID: 'CAT002',
      fixedAssetsAccountCode: 'FAAC002',
      fixedAssetsAccountName: 'Fixed Asset - Furniture',
      accumulatedDepreciationAccountCode: 'ADAC002',
      accumulatedDepreciationAccountName: 'Accumulated Depreciation - Furniture',
      depreciationExpensesAccountCode: 'DEAC002',
      depreciationExpensesAccountName: 'Depreciation Expense - Furniture',
      assetsGainAccount: 'GA002',
      assetsLossAccount: 'LA002'
    },
    {
      categorySysID: 'CAT003',
      fixedAssetsAccountCode: 'FAAC003',
      fixedAssetsAccountName: 'Fixed Asset - Vehicles',
      accumulatedDepreciationAccountCode: 'ADAC003',
      accumulatedDepreciationAccountName: 'Accumulated Depreciation - Vehicles',
      depreciationExpensesAccountCode: 'DEAC003',
      depreciationExpensesAccountName: 'Depreciation Expense - Vehicles',
      assetsGainAccount: 'GA003',
      assetsLossAccount: 'LA003'
    }
  ];



  ApplicableCompaniesTable = [
    {
      sysID: 'SYS001',
      companyCode: 'COM001',
      companyName: 'Company A'
    },
    {
      sysID: 'SYS002',
      companyCode: 'COM002',
      companyName: 'Company B'
    },
    {
      sysID: 'SYS003',
      companyCode: 'COM003',
      companyName: 'Company C'
    }
  ];



  CompanyCodeTable = [
    { sysID: 'SYS001', companyCode: 'COM001', companyName: 'Company A' },
    { sysID: 'SYS002', companyCode: 'COM002', companyName: 'Company B' },
    { sysID: 'SYS003', companyCode: 'COM003', companyName: 'Company C' }
  ];
  
  DepreciationExpensesAccountCodeTable = [
    { accountCode: 'DE001', accountName: 'Depreciation Account A' },
    { accountCode: 'DE002', accountName: 'Depreciation Account B' }
  ];
  
  AssetsGainAccountTable = [
    { accountCode: 'AG001', accountName: 'Assets Gain Account A' },
    { accountCode: 'AG002', accountName: 'Assets Gain Account B' }
  ];
  
  FixedAssetsAccountCodeTable = [
    { accountCode: 'FA001', accountName: 'Fixed Assets Account A' },
    { accountCode: 'FA002', accountName: 'Fixed Assets Account B' }
  ];
  


  CompanyCodeData = {
    id: 'CompanyCode',
    name: 'Company Code Details',
    TableData: this.CompanyCodeTable, // Use your Company Code table data
    columns: [
      { header: 'SysID', field: 'sysID', width: '4rem' },
      { header: 'Company Code', field: 'companyCode', width: '6rem' },
      { header: 'Company Name', field: 'companyName', width: '8rem' }
    ]
  };
  
  DepreciationExpensesAccountCodeData = {
    id: 'DepreciationExpensesAccountCode',
    name: 'Depreciation Expenses Account Code Details',
    TableData: this.DepreciationExpensesAccountCodeTable, // Assign the actual array
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '6rem' },
      { header: 'Account Name', field: 'accountName', width: '10rem' }
    ]
  };
  
  AssetsGainAccountData = {
    id: 'AssetsGainAccount',
    name: 'Assets Gain Account Details',
    TableData: this.AssetsGainAccountTable, // Assign the actual array
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '6rem' },
      { header: 'Account Name', field: 'accountName', width: '10rem' }
    ]
  };
  
  FixedAssetsAccountCodeData = {
    id: 'FixedAssetsAccountCode',
    name: 'Fixed Assets Account Code Details',
    TableData: this.FixedAssetsAccountCodeTable, // Assign the actual array
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '6rem' },
      { header: 'Account Name', field: 'accountName', width: '10rem' }
    ]
  };
  
  
  




























  
  selectedVendorCode: string = '';
  selectedVendorName: string = '';

  selectedVendorPlantLocationCode: string = '';
  selectedVendorPlantLocationName: string = '';

  selectedVendorStoreLocationCode: string = '';
  selectedVendorStoreLocationName: string = '';

  selectedPurchaseOrganizationCode: string = '';
  selectedPurchaseOrganizationName: string = '';

  selectedMaterialsRequesterEmployeeCode: string = '';
  selectedMaterialsRequesterEmployeeName: string = '';

  selectedPurchaseAgreementCode: string = '';
  selectedPurchaseAgreementName: string = '';

  selectedLandedCostCode: string = '';
  selectedLandedCostName: string = '';
  selectedLandedCostRate: string = '';

  selectedProductModuleCode: string = '';
  selectedProductModuleName: string = '';

  
  activeState: boolean[] = [false, false, false];

  activeIndex: number = 0;

  display: boolean = false;

  // pop-up/look-up starts

  ShowLookUp: boolean = false

  // Voucher Type
  selectedVocherType: string;
  selectedVocherNumber: string;

  // Sales Account
  selectedAccountCode: string;
  selectedAccountName: string;

  // Customer Code
  selectedCustomerCode: string;
  selectedCustomerName: string;

  // Shipped To
  selectedShippedToCode: string;
  selectedShippedToName: string;

  // Billed To
  selectedBilledToCode: string;
  selectedBilledToName: string;

  // Narration Code
  selectedNarrationCode: string;
  selectedNarrationDescription: string;

  // Currency Code
  selectedCurrencyCode: string;
  selectedCurrencyName: string;
  selectedConversionRate: number;

  selectedSalesAgreementCode: string;
  selectedSalesAgreementName: string;


  selectedCopyDocFromTemplateCode: string;
  selectedCopyDocFromTemplateName: string;


  selectedLinkRecords: any;
selectedInterCompanyCode: any;
selectedInterCompanyName: any;
selectedInterCompanyPlantLocationCode: any;
selectedInterCompanyPlantLocationName: any;
selectedInterCompanyStoreLocationCode: any;
selectedInterCompanyStoreLocationName: any;


  // Define your data arrays
  VocherTypeTableData = [
    { vocherType: 'Payment', vocherNumber: 'V001' },
    { vocherType: 'Receipt', vocherNumber: 'V002' },
    { vocherType: 'Journal', vocherNumber: 'V003' },
    { vocherType: 'Contra', vocherNumber: 'V004' }
  ];

  // Dummy data for Sales Account
  SalesAccountTableData = [
    { accountCode: 'AC001', accountName: 'Sales Revenue' },
    { accountCode: 'AC002', accountName: 'Accounts Receivable' },
    { accountCode: 'AC003', accountName: 'Sales Discount' },
    { accountCode: 'AC004', accountName: 'Sales Tax Payable' }
  ];

  // Dummy data for Customer Code
  CustomerCodeTableData = [
    { customerCode: 'CUST001', customerName: 'John Doe' },
    { customerCode: 'CUST002', customerName: 'Jane Smith' },
    { customerCode: 'CUST003', customerName: 'Acme Corporation' },
    { customerCode: 'CUST004', customerName: 'XYZ Ltd.' }
  ];

  // Dummy data for Shipped To
  ShippedToTableData = [
    { shippedToCode: 'ST001', shippedToName: 'Warehouse A' },
    { shippedToCode: 'ST002', shippedToName: 'Warehouse B' },
    { shippedToCode: 'ST003', shippedToName: 'Client Office' },
    { shippedToCode: 'ST004', shippedToName: 'Distribution Center' }
  ];

  // Dummy data for Billed To
  BilledToTableData = [
    { billedToCode: 'BT001', billedToName: 'John Doe Enterprises' },
    { billedToCode: 'BT002', billedToName: 'Jane Smith LLC' },
    { billedToCode: 'BT003', billedToName: 'Acme Inc.' },
    { billedToCode: 'BT004', billedToName: 'XYZ Holdings' }
  ];

  // Dummy data for Narration Code
  NarrationCodeTableData = [
    { narrationCode: 'NARR001', narrationDescription: 'Payment for Invoice #001' },
    { narrationCode: 'NARR002', narrationDescription: 'Refund for Order #002' },
    { narrationCode: 'NARR003', narrationDescription: 'Adjustment for Account #003' },
    { narrationCode: 'NARR004', narrationDescription: 'Fee for Service #004' }
  ];

  // Dummy data for Currency Code
  CurrencyCodeTableData = [
    { currencyCode: 'USD', currencyName: 'United States Dollar', conversionRate: 1.0 },
    { currencyCode: 'EUR', currencyName: 'Euro', conversionRate: 0.85 },
    { currencyCode: 'GBP', currencyName: 'British Pound', conversionRate: 0.75 },
    { currencyCode: 'JPY', currencyName: 'Japanese Yen', conversionRate: 110.0 }
  ];

  DefaultCurrencyCodeTableData = [
    {
      currencyCode: 'USD',
      currencyName: 'United States Dollar',
      currencySymbol: '$',
      conversionRate: '1.00'
    },
    {
      currencyCode: 'EUR',
      currencyName: 'Euro',
      currencySymbol: '€',
      conversionRate: '0.85'
    },
    {
      currencyCode: 'INR',
      currencyName: 'Indian Rupee',
      currencySymbol: '₹',
      conversionRate: '74.50'
    },
    {
      currencyCode: 'GBP',
      currencyName: 'British Pound',
      currencySymbol: '£',
      conversionRate: '0.75'
    }
  ];


  SalesAgreementCodeTableData = [
    { salesAgreementCode: 'SA001', salesAgreementName: 'Sales Agreement Standard' },
    { salesAgreementCode: 'SA002', salesAgreementName: 'Sales Agreement Premium' },
    { salesAgreementCode: 'SA003', salesAgreementName: 'Sales Agreement Enterprise', },
    { salesAgreementCode: 'SA004', salesAgreementName: 'Sales Agreement Basic' }
  ];

  CopyDocFromTemplateCodeTableData = [
    { templateCode: 'T001', templateName: 'Invoice Template A' },
    { templateCode: 'T002', templateName: 'Purchase Order Template B' },
    { templateCode: 'T003', templateName: 'Credit Note Template C' },
    { templateCode: 'T004', templateName: 'Sales Order Template D' }
  ];

  PaymentTermsTableData = [
    { paymentTermCode: 'PT001', paymentTermName: 'Net 30' },
    { paymentTermCode: 'PT002', paymentTermName: 'Net 45' },
    { paymentTermCode: 'PT003', paymentTermName: 'Cash on Delivery' },
    { paymentTermCode: 'PT004', paymentTermName: 'Prepaid' },
    { paymentTermCode: 'PT005', paymentTermName: 'Net 60' }
  ];


  IncoTermsTableData = [
    { incoTermCode: 'INC001', incoTermName: 'EXW' },
    { incoTermCode: 'INC002', incoTermName: 'FOB' },
    { incoTermCode: 'INC003', incoTermName: 'CFR' },
    { incoTermCode: 'INC004', incoTermName: 'CIF' },
    { incoTermCode: 'INC005', incoTermName: 'DDP' }
  ];

  TaxCodeTableData = [
    { taxCode: 'TX001', taxName: 'Sales Tax', taxInputPercentage: 0.07, taxOutputPercentage: 0.07 },
    { taxCode: 'TX002', taxName: 'VAT', taxInputPercentage: 0.15, taxOutputPercentage: 0.15 },
    { taxCode: 'TX003', taxName: 'Service Tax', taxInputPercentage: 0.10, taxOutputPercentage: 0.10 },
    { taxCode: 'TX004', taxName: 'Import Tax', taxInputPercentage: 0.05, taxOutputPercentage: 0.05 },
    { taxCode: 'TX005', taxName: 'Luxury Tax', taxInputPercentage: 0.20, taxOutputPercentage: 0.20 }
  ];

  AccountCodeTableData = [
    { accountCode: 'AC001', accountName: 'Cash' },
    { accountCode: 'AC002', accountName: 'Accounts Receivable' },
    { accountCode: 'AC003', accountName: 'Inventory' },
    { accountCode: 'AC004', accountName: 'Accounts Payable' },
    { accountCode: 'AC005', accountName: 'Sales Revenue' }
  ];

  // Dummy data for Cost Center Table
  CostCenterTableData = [
    { costCenterCode: 'CC001', costCenterName: 'Marketing' },
    { costCenterCode: 'CC002', costCenterName: 'Research and Development' },
    { costCenterCode: 'CC003', costCenterName: 'Human Resources' }
  ];

  // Dummy data for Profit Center Table
  ProfitCenterTableData = [
    { profitCenterCode: 'PC001', profitCenterName: 'Sales North' },
    { profitCenterCode: 'PC002', profitCenterName: 'Sales South' },
    { profitCenterCode: 'PC003', profitCenterName: 'Sales East' }
  ];

  // Dummy data for Salesman Table
  SalesmanTableData = [
    { salesmanCode: 'SM001', salesmanName: 'Alice Johnson' },
    { salesmanCode: 'SM002', salesmanName: 'Bob Smith' },
    { salesmanCode: 'SM003', salesmanName: 'Charlie Brown' }
  ];

  // Dummy data for Division Table
  DivisionTableData = [
    { divisionCode: 'DIV001', divisionName: 'Electronics' },
    { divisionCode: 'DIV002', divisionName: 'Clothing' },
    { divisionCode: 'DIV003', divisionName: 'Furniture' }
  ];

  // Dummy data for Department Table
  DepartmentTableData = [
    { departmentCode: 'DEP001', departmentName: 'Sales' },
    { departmentCode: 'DEP002', departmentName: 'Support' },
    { departmentCode: 'DEP003', departmentName: 'Finance' }
  ];

  // Dummy data for Job Table
  JobTableData = [
    { jobCode: 'JOB001', jobName: 'Software Engineer' },
    { jobCode: 'JOB002', jobName: 'Product Manager' },
    { jobCode: 'JOB003', jobName: 'Data Analyst' }
  ];

  // Dummy data for Other Centre Table
  OtherCentreTableData = [
    { otherCentreCode: 'OC001', otherCentreName: 'Remote Office' },
    { otherCentreCode: 'OC002', otherCentreName: 'Warehouse A' },
    { otherCentreCode: 'OC003', otherCentreName: 'Warehouse B' }
  ];

  // Dummy data for Sales Organization Table
  SalesOrganizationTableData = [
    { salesOrganizationCode: 'SO001', salesOrganizationName: 'North America Sales' },
    { salesOrganizationCode: 'SO002', salesOrganizationName: 'Europe Sales' },
    { salesOrganizationCode: 'SO003', salesOrganizationName: 'Asia Sales' }
  ];

  // Dummy data for Distribution Channel Table
  DistributionChannelTableData = [
    { distributionChannelCode: 'DC001', distributionChannelName: 'Online' },
    { distributionChannelCode: 'DC002', distributionChannelName: 'Retail' },
    { distributionChannelCode: 'DC003', distributionChannelName: 'Wholesale' }
  ];

  // Dummy data for Sales Office Table
  SalesOfficeTableData = [
    { salesOfficeCode: 'SOFF001', salesOfficeName: 'New York Office' },
    { salesOfficeCode: 'SOFF002', salesOfficeName: 'Los Angeles Office' },
    { salesOfficeCode: 'SOFF003', salesOfficeName: 'Chicago Office' }
  ];

  // Dummy data for Sales Group Table
  SalesGroupTableData = [
    { salesGroupCode: 'SG001', salesGroupName: 'Group A' },
    { salesGroupCode: 'SG002', salesGroupName: 'Group B' },
    { salesGroupCode: 'SG003', salesGroupName: 'Group C' }
  ];

  // Dummy data for Place of Supply Table
  PlaceOfSupplyTableData = [
    { placeOfSupplyCode: 'POS001', placeOfSupplyName: 'California' },
    { placeOfSupplyCode: 'POS002', placeOfSupplyName: 'Texas' },
    { placeOfSupplyCode: 'POS003', placeOfSupplyName: 'New York' }
  ];

  // Dummy data for Jurisdiction Table
  JurisdictionTableData = [
    { jurisdictionCode: 'JUR001', jurisdictionName: 'Federal' },
    { jurisdictionCode: 'JUR002', jurisdictionName: 'State' },
    { jurisdictionCode: 'JUR003', jurisdictionName: 'Local' }
  ];

  MrvSingleBatchNumberTableData = [
    {
      batchNumber: 'B001',
      availableQty: 500,
      nowReservingQty: 100,
      batchManufacturingDate: '2024-01-15',
      batchExpiryDate: '2025-01-15'
    },
    {
      batchNumber: 'B002',
      availableQty: 300,
      nowReservingQty: 50,
      batchManufacturingDate: '2023-11-20',
      batchExpiryDate: '2024-11-20'
    }
    // Add more records as needed
  ];


  MrvMultipleBatchNumberTableData = [
    {
      batchNumber: 'B001',
      availableQty: 500,
      nowReservingQty: 100,
      batchManufacturingDate: '2024-01-15',
      batchExpiryDate: '2025-01-15'
    },
    {
      batchNumber: 'B002',
      availableQty: 300,
      nowReservingQty: 50,
      batchManufacturingDate: '2023-11-20',
      batchExpiryDate: '2024-11-20'
    }
  ];

  WarehouseTableData = [
    { warehouseCode: 'WH001', warehouseName: 'Central Warehouse' },
    { warehouseCode: 'WH002', warehouseName: 'North Warehouse' },
    { warehouseCode: 'WH003', warehouseName: 'South Warehouse' },
    { warehouseCode: 'WH004', warehouseName: 'East Warehouse' },
  ];

  ProductTableData = [
    { productCode: 'P001', productName: 'Product A', productLongName: 'Product A Full Description' },
    { productCode: 'P002', productName: 'Product B', productLongName: 'Product B Full Description' },
    { productCode: 'P003', productName: 'Product C', productLongName: 'Product C Full Description' },
  ];

  InterCompanyTransTypeTableData = [
    {
      sysId: '001',
      interCompanyTransTypeCode: 'ICT001',
      interCompanyMessageTransTypeName: 'Inter-Company Purchase Order'
    },
    {
      sysId: '002',
      interCompanyTransTypeCode: 'ICT002',
      interCompanyMessageTransTypeName: 'Inter-Company Sales Order'
    },
    {
      sysId: '003',
      interCompanyTransTypeCode: 'ICT003',
      interCompanyMessageTransTypeName: 'Inter-Company Transfer'
    }
    // Add more objects as per your requirements
  ];

  PostingTableData = [
    { postingCode: 'PC001', postingName: 'Type 1' },
    { postingCode: 'PC002', postingName: 'Type 2' },
    { postingCode: 'PC003', postingName: 'Type 3' },
    { postingCode: 'PC004', postingName: 'Type 4' }
  ];
  

  debitAccountTableData = [
    { debitAccountFirstCode: 'D001', debitAccountFirstName: 'Debit Account 1' },
    { debitAccountFirstCode: 'D002', debitAccountFirstName: 'Debit Account 2' },
    { debitAccountFirstCode: 'D003', debitAccountFirstName: 'Debit Account 3' },
    { debitAccountFirstCode: 'D004', debitAccountFirstName: 'Debit Account 4' }
  ];

  creditAccountTableData = [
    { creditAccountSecondCode: 'C001', creditAccountSecondName: 'Credit Account 1' },
    { creditAccountSecondCode: 'C002', creditAccountSecondName: 'Credit Account 2' },
    { creditAccountSecondCode: 'C003', creditAccountSecondName: 'Credit Account 3' },
    { creditAccountSecondCode: 'C004', creditAccountSecondName: 'Credit Account 4' }
  ];


  // Dummy data for Vendor Table
vendorTableData = [
  { vendorCode: 'V001', vendorName: 'Vendor A' },
  { vendorCode: 'V002', vendorName: 'Vendor B' },
  { vendorCode: 'V003', vendorName: 'Vendor C' }
];

// Dummy data for Vendor Plant Location Table
vendorPlantLocationTableData = [
  { vendorPlantLocationCode: 'VPL001', vendorPlantLocationName: 'Plant A' },
  { vendorPlantLocationCode: 'VPL002', vendorPlantLocationName: 'Plant B' },
  { vendorPlantLocationCode: 'VPL003', vendorPlantLocationName: 'Plant C' }
];

// Dummy data for Vendor Store Location Table
vendorStoreLocationTableData = [
  { vendorStoreLocationCode: 'VSL001', vendorStoreLocationName: 'Store A' },
  { vendorStoreLocationCode: 'VSL002', vendorStoreLocationName: 'Store B' },
  { vendorStoreLocationCode: 'VSL003', vendorStoreLocationName: 'Store C' }
];

// Dummy data for Purchase Organization Table
purchaseOrganizationTableData = [
  { purchaseOrganizationCode: 'PO001', purchaseOrganizationName: 'Purchasing Dept A' },
  { purchaseOrganizationCode: 'PO002', purchaseOrganizationName: 'Purchasing Dept B' },
  { purchaseOrganizationCode: 'PO003', purchaseOrganizationName: 'Purchasing Dept C' }
];

// Dummy data for Materials Requester Employee Table
materialsRequesterEmployeeTableData = [
  { requesterCode: 'REQ001', requesterName: 'Employee A' },
  { requesterCode: 'REQ002', requesterName: 'Employee B' },
  { requesterCode: 'REQ003', requesterName: 'Employee C' }
];

// Dummy data for Purchase Agreement Table
purchaseAgreementTableData = [
  { agreementCode: 'AG001', agreementName: 'Agreement A' },
  { agreementCode: 'AG002', agreementName: 'Agreement B' },
  { agreementCode: 'AG003', agreementName: 'Agreement C' }
];

// Dummy data for Link Records Table
linkRecordsTableData = [
{ linkCode: 'L001', linkName: 'Link A' },
{ linkCode: 'L002', linkName: 'Link B' },
{ linkCode: 'L003', linkName: 'Link C' }
];

// Dummy data for Inter Company Table
interCompanyTableData = [
{ companyCode: 'IC001', companyName: 'Company A' },
{ companyCode: 'IC002', companyName: 'Company B' },
{ companyCode: 'IC003', companyName: 'Company C' }
];

// Dummy data for Inter Company Plant Location Table
interCompanyPlantLocationTableData = [
{ plantCode: 'ICPL001', plantName: 'Plant A' },
{ plantCode: 'ICPL002', plantName: 'Plant B' },
{ plantCode: 'ICPL003', plantName: 'Plant C' }
];

// Dummy data for Inter Company Store Location Table
interCompanyStoreLocationTableData = [
{ storeCode: 'ICSL001', storeName: 'Store A' },
{ storeCode: 'ICSL002', storeName: 'Store B' },
{ storeCode: 'ICSL003', storeName: 'Store C' }
];


  
  
  








  // Default empty object to hold the current popup's data

  PopUpData = { id: '', name: '', TableData: [], columns: [] };

  // Ensure to define the other data tables like CustomerCodeTableData, ShippedToTableData, etc. as needed.

  // pop-up/look-up ends


  constructor(private router: Router,) { }


  ngOnInit(): void { }

  changeIndex(i) {

    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i

  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }


  ShowPopUp(Type) {
  if (Type == 'CompanyCode') {
    this.PopUpData = this.CompanyCodeData;
  }
   else if (Type == 'DepreciationExpensesAccountCode') {
    this.PopUpData = this.DepreciationExpensesAccountCodeData;
  }
   else if (Type == 'AssetsGainAccount') {
    this.PopUpData = this.AssetsGainAccountData;
  } 
  else if (Type == 'FixedAssetsAccountCode') {
    this.PopUpData = this.FixedAssetsAccountCodeData;
  }

    this.ShowLookUp = true

  }

  chooseLookup(selectedRow) {
    // Handle Voucher Type selection
    if (this.PopUpData.id === 'VocherType') {
      this.selectedVocherType = selectedRow.vocherType;
      this.selectedVocherNumber = selectedRow.vocherNumber;

      // Handle Sales Account selection
    } else if (this.PopUpData.id === 'SalesAccount') {
      this.selectedAccountCode = selectedRow.accountCode;
      this.selectedAccountName = selectedRow.accountName;

      // Handle Customer Code selection
    } else if (this.PopUpData.id === 'CustomerCode') {
      this.selectedCustomerCode = selectedRow.customerCode;
      this.selectedCustomerName = selectedRow.customerName;

      // Handle Shipped To selection
    } else if (this.PopUpData.id === 'ShippedTo') {
      this.selectedShippedToCode = selectedRow.shippedToCode;
      this.selectedShippedToName = selectedRow.shippedToName;

      // Handle Billed To selection
    } else if (this.PopUpData.id === 'BilledTo') {
      this.selectedBilledToCode = selectedRow.billedToCode;
      this.selectedBilledToName = selectedRow.billedToName;

      // Handle Narration Code selection
    } else if (this.PopUpData.id === 'NarrationCode') {
      this.selectedNarrationCode = selectedRow.narrationCode;
      this.selectedNarrationDescription = selectedRow.narrationDescription;

      // Handle Currency Code selection
    } else if (this.PopUpData.id === 'CurrencyCode') {
      this.selectedCurrencyCode = selectedRow.currencyCode;
      this.selectedCurrencyName = selectedRow.currencyName;
      this.selectedConversionRate = selectedRow.conversionRate;

    } else if (this.PopUpData.id === 'SalesAgreementCode') {
      this.selectedSalesAgreementCode = selectedRow.salesAgreementCode;
      this.selectedSalesAgreementName = selectedRow.salesAgreementName;

      // Handle Currency Code selection
    } else if (this.PopUpData.id === 'CopyDocFromTemplateCode') {
      this.selectedCopyDocFromTemplateCode = selectedRow.templateCode;
      this.selectedCopyDocFromTemplateName = selectedRow.templateName;
    }

    // Handle Link Record selection
else if (this.PopUpData.id === 'LinkRecordCode') {
this.selectedLinkRecords = selectedRow.linkCode;
}

// Handle Inter Company Code selection
else if (this.PopUpData.id === 'InterCompanyCode') {
this.selectedInterCompanyCode = selectedRow.companyCode;
this.selectedInterCompanyName = selectedRow.companyName;
}

// Handle Inter Company Plant Location Code selection
else if (this.PopUpData.id === 'InterCompanyPlantLocationCode') {
this.selectedInterCompanyPlantLocationCode = selectedRow.plantCode;
this.selectedInterCompanyPlantLocationName = selectedRow.plantName;
}

// Handle Inter Company Store Location Code selection
else if (this.PopUpData.id === 'InterCompanyStoreLocationCode') {
this.selectedInterCompanyStoreLocationCode = selectedRow.storeCode;
this.selectedInterCompanyStoreLocationName = selectedRow.storeName;
}


    // Close the popup after selection
    this.ShowLookUp = false;
  }

  // routeTo(screen) {

  //   if (screen == 'VesselBooking') {
  //     this.router.navigate(['/common/vessel-booking']);
  //   }
  //   else if (screen == 'QA/QC') {
  //     this.router.navigate(['/common/qa-qc']);
  //   }
  //   else if (screen == 'ApplicableDates') {
  //     this.router.navigate(['/common/applicable-dates']);
  //   }
  //   else if (screen == 'WHManagement') {
  //     this.router.navigate(['/common/wh-management']);
  //   }
  // }

}