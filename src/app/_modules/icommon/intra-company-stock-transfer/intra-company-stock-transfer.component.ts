import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intra-company-stock-transfer',
  templateUrl: './intra-company-stock-transfer.component.html',
  styleUrls: ['./intra-company-stock-transfer.component.scss']
})
export class IntraCompanyStockTransferComponent implements OnInit {

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

  selectedIntraCompanyMarginPercCode: any;
  selectedIntraCompanyMarginPercName: any;

  selectedFromWarehouseCode: any;
  selectedFromWarehouseName: any;
  
  selectedToWarehouseCode: any;
  selectedToWarehouseName: any;


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

  salesAccountData = {
    id: 'SalesAccount',
    name: 'Sales Account Details',
    TableData: this.SalesAccountTableData, // Assign the actual array
    columns: [
      { header: 'Sales Account Code', field: 'accountCode', width: '2rem' },
      { header: 'Sales Account Name', field: 'accountName', width: '6rem' }
    ]
  };

  VocherTypeData = {
    id: 'VocherType',
    name: 'Vocher Type Details',
    TableData: this.VocherTypeTableData, // Assign the actual array
    columns: [
      { header: 'Vocher Type', field: 'vocherType', width: '2rem' },
      { header: 'Vocher Number', field: 'vocherNumber', width: '6rem' }
    ]
  };

  CustomerCodeData = {
    id: 'CustomerCode',
    name: 'Customer Code Details',
    TableData: this.CustomerCodeTableData,
    columns: [
      { header: 'Customer Code', field: 'customerCode', width: '2rem' },
      { header: 'Customer Name', field: 'customerName', width: '6rem' }
    ]
  };

  ShippedToData = {
    id: 'ShippedTo',
    name: 'Shipped To Details',
    TableData: this.ShippedToTableData,
    columns: [
      { header: 'Shipped To Code', field: 'shippedToCode', width: '2rem' },
      { header: 'Shipped To Name', field: 'shippedToName', width: '6rem' }
    ]
  };

  BilledToData = {
    id: 'BilledTo',
    name: 'Billed To Details',
    TableData: this.BilledToTableData,
    columns: [
      { header: 'Billed To Code', field: 'billedToCode', width: '2rem' },
      { header: 'Billed To Name', field: 'billedToName', width: '6rem' }
    ]
  };

  NarrationCodeData = {
    id: 'NarrationCode',
    name: 'Narration Code Details',
    TableData: this.NarrationCodeTableData,
    columns: [
      { header: 'Narration Code', field: 'narrationCode', width: '2rem' },
      { header: 'Narration Description', field: 'narrationDescription', width: '6rem' }
    ]
  };

  CurrencyCodeData = {
    id: 'CurrencyCode',
    name: 'Currency Code Details',
    TableData: this.CurrencyCodeTableData,
    columns: [
      { header: 'Currency Code', field: 'currencyCode', width: '2rem' },
      { header: 'Currency Name', field: 'currencyName', width: '4rem' },
      { header: 'Conversion Rate', field: 'conversionRate', width: '2rem' },
    ]
  };

  DefaultCurrencyCodeData = {
    id: 'DefaultCurrencyCode',
    name: 'Currency Code Details',
    TableData: this.DefaultCurrencyCodeTableData,
    columns: [
      { header: 'Default Currency Code', field: 'currencyCode', width: '2rem' },
      { header: 'Default Currency Name', field: 'currencyName', width: '4rem' },
      { header: 'Default Currency Symbol', field: 'currencySymbol', width: '2rem' },
      { header: 'Default Conversion Rate', field: 'conversionRate', width: '2rem' },
    ]
  };

  SalesAgreementData = {
    id: 'SalesAgreement',
    name: 'Sales Agreement Details',
    TableData: this.SalesAgreementCodeTableData, // Changed to TableData
    columns: [
      { header: 'Agreement Code', field: 'salesAgreementCode', width: '2rem' },
      { header: 'Agreement Name', field: 'salesAgreementName', width: '6rem' },
    ]
  };

  CopyDocFromTemplateCodeData = {
    id: 'CopyDocFromTemplateCode',
    name: 'Copy Document From Template',
    TableData: this.CopyDocFromTemplateCodeTableData, // Changed to TableData
    columns: [
      { header: 'Template Code', field: 'templateCode', width: '2rem' },
      { header: 'Template Name', field: 'templateName', width: '6rem' },

    ]
  };

  PaymentTermsData = {
    id: 'PaymentTerms',
    name: 'Payment Terms Details',
    TableData: this.PaymentTermsTableData,
    columns: [
      { header: 'Payment Term Code', field: 'paymentTermCode', width: '2rem' },
      { header: 'Payment Term Name', field: 'paymentTermName', width: '6rem' }
    ]
  };

  IncoTermsData = {
    id: 'IncoTerms',
    name: 'Incoterms Details',
    TableData: this.IncoTermsTableData,
    columns: [
      { header: 'Incoterm Code', field: 'incoTermCode', width: '2rem' },
      { header: 'Incoterm Name', field: 'incoTermName', width: '6rem' }
    ]
  };

  TaxCodeData = {
    id: 'TaxCodes',
    name: 'Tax Codes Details',
    TableData: this.TaxCodeTableData,
    columns: [
      { header: 'Tax Code', field: 'taxCode', width: '2rem' },
      { header: 'Tax Name', field: 'taxName', width: '3rem' },
      { header: 'Tax Input %', field: 'taxInputPercentage', width: '2rem' },
      { header: 'Tax Output %', field: 'taxOutputPercentage', width: '2rem' }
    ]
  };

  AccountCodeData = {
    id: 'AccountCodes',
    name: 'Account Codes Details',
    TableData: this.AccountCodeTableData,
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '2rem' },
      { header: 'Account Name', field: 'accountName', width: '6rem' }
    ]
  };

  // Dummy data for Cost Center
  CostCenterData = {
    id: 'CostCenterCode',
    name: 'Cost Center Details',
    TableData: this.CostCenterTableData,
    columns: [
      { header: 'Cost Center Code', field: 'costCenterCode', width: '2rem' },
      { header: 'Cost Center Name', field: 'costCenterName', width: '6rem' }
    ]
  };

  // Dummy data for Profit Center
  ProfitCenterData = {
    id: 'ProfitCenterCode',
    name: 'Profit Center Details',
    TableData: this.ProfitCenterTableData,
    columns: [
      { header: 'Profit Center Code', field: 'profitCenterCode', width: '2rem' },
      { header: 'Profit Center Name', field: 'profitCenterName', width: '6rem' }
    ]
  };

  // Dummy data for Salesman
  SalesmanData = {
    id: 'SalesmanCode',
    name: 'Salesman Details',
    TableData: this.SalesmanTableData,
    columns: [
      { header: 'Salesman Code', field: 'salesmanCode', width: '2rem' },
      { header: 'Salesman Name', field: 'salesmanName', width: '6rem' }
    ]
  };

  // Dummy data for Division
  DivisionData = {
    id: 'DivisionCode',
    name: 'Division Details',
    TableData: this.DivisionTableData,
    columns: [
      { header: 'Division Code', field: 'divisionCode', width: '2rem' },
      { header: 'Division Name', field: 'divisionName', width: '6rem' }
    ]
  };

  // Dummy data for Department
  DepartmentData = {
    id: 'DepartmentCode',
    name: 'Department Details',
    TableData: this.DepartmentTableData,
    columns: [
      { header: 'Department Code', field: 'departmentCode', width: '2rem' },
      { header: 'Department Name', field: 'departmentName', width: '6rem' }
    ]
  };

  // Dummy data for Job
  JobData = {
    id: 'JobCode',
    name: 'Job Details',
    TableData: this.JobTableData,
    columns: [
      { header: 'Job Code', field: 'jobCode', width: '2rem' },
      { header: 'Job Name', field: 'jobName', width: '6rem' }
    ]
  };

  // Dummy data for Other Centre
  OtherCentreData = {
    id: 'OtherCentreCode',
    name: 'Other Centre Details',
    TableData: this.OtherCentreTableData,
    columns: [
      { header: 'Other Centre Code', field: 'otherCentreCode', width: '2rem' },
      { header: 'Other Centre Name', field: 'otherCentreName', width: '6rem' }
    ]
  };

  // Dummy data for Sales Organization
  SalesOrganizationData = {
    id: 'SalesOrganizationCode',
    name: 'Sales Organization Details',
    TableData: this.SalesOrganizationTableData,
    columns: [
      { header: 'Sales Organization Code', field: 'salesOrganizationCode', width: '2rem' },
      { header: 'Sales Organization Name', field: 'salesOrganizationName', width: '6rem' }
    ]
  };

  // Dummy data for Distribution Channel
  DistributionChannelData = {
    id: 'DistributionChannelCode',
    name: 'Distribution Channel Details',
    TableData: this.DistributionChannelTableData,
    columns: [
      { header: 'Distribution Channel Code', field: 'distributionChannelCode', width: '2rem' },
      { header: 'Distribution Channel Name', field: 'distributionChannelName', width: '6rem' }
    ]
  };

  // Dummy data for Sales Office
  SalesOfficeData = {
    id: 'SalesOfficeCode',
    name: 'Sales Office Details',
    TableData: this.SalesOfficeTableData,
    columns: [
      { header: 'Sales Office Code', field: 'salesOfficeCode', width: '2rem' },
      { header: 'Sales Office Name', field: 'salesOfficeName', width: '6rem' }
    ]
  };

  // Dummy data for Sales Group
  SalesGroupData = {
    id: 'SalesGroupCode',
    name: 'Sales Group Details',
    TableData: this.SalesGroupTableData,
    columns: [
      { header: 'Sales Group Code', field: 'salesGroupCode', width: '2rem' },
      { header: 'Sales Group Name', field: 'salesGroupName', width: '6rem' }
    ]
  };

  // Dummy data for Place of Supply
  PlaceOfSupplyData = {
    id: 'PlaceOfSupplyCode',
    name: 'Place of Supply Details',
    TableData: this.PlaceOfSupplyTableData,
    columns: [
      { header: 'Place of Supply Code', field: 'placeOfSupplyCode', width: '2rem' },
      { header: 'Place of Supply Name', field: 'placeOfSupplyName', width: '6rem' }
    ]
  };

  // Dummy data for Jurisdiction
  JurisdictionData = {
    id: 'JurisdictionCode',
    name: 'Jurisdiction Details',
    TableData: this.JurisdictionTableData,
    columns: [
      { header: 'Jurisdiction Code', field: 'jurisdictionCode', width: '2rem' },
      { header: 'Jurisdiction Name', field: 'jurisdictionName', width: '6rem' }
    ]
  };

  MrvSingleBatchNumberData = {
    id: 'MrvSingleBatchNumber',
    name: 'MRV Single Batch Details',
    TableData: this.MrvSingleBatchNumberTableData,
    columns: [
      { header: 'Batch Number', field: 'batchNumber', width: '4rem' },
      { header: 'Available Qty', field: 'availableQty', width: '3rem' },
      { header: 'Now Reserving Qty', field: 'nowReservingQty', width: '3rem' },
      { header: 'Batch Manufacturing Date', field: 'batchManufacturingDate', width: '4rem' },
      { header: 'Batch Expiry Date', field: 'batchExpiryDate', width: '4rem' }
    ]
  };

  MrvMultipleBatchNumberData = {
    id: 'MrvMultipleBatchNumber',
    name: 'MRV Multiple Batch Details',
    TableData: this.MrvMultipleBatchNumberTableData,
    columns: [
      { header: 'Batch Number', field: 'batchNumber', width: '4rem' },
      { header: 'Available Qty', field: 'availableQty', width: '3rem' },
      { header: 'Now Reserving Qty', field: 'nowReservingQty', width: '3rem' },
      { header: 'Batch Manufacturing Date', field: 'batchManufacturingDate', width: '4rem' },
      { header: 'Batch Expiry Date', field: 'batchExpiryDate', width: '4rem' }
    ]
  };

  WarehouseData = {
    id: 'WarehouseCode',
    name: 'Warehouse Details',
    TableData: this.WarehouseTableData,
    columns: [
      { header: 'Warehouse Code', field: 'warehouseCode', width: '2rem' },
      { header: 'Warehouse Name', field: 'warehouseName', width: '6rem' }
    ]
  };


  ProductData = {
    id: 'ProductCode',
    name: 'Product Details',
    TableData: this.ProductTableData,
    columns: [
      { header: 'Product Code', field: 'productCode', width: '2rem' },
      { header: 'Product Name', field: 'productName', width: '6rem' },
      { header: 'Product Long Name', field: 'productLongName', width: '6rem' }
    ]
  };

  InterCompanyTransTypeData = {
    id: 'InterCompanyTransType',
    name: 'Inter-Company Transaction Details',
    TableData: this.InterCompanyTransTypeTableData,
    columns: [
      { header: 'SysID', field: 'sysId', width: '2rem' },
      { header: 'Inter Company Trans Type Code', field: 'interCompanyTransTypeCode', width: '4rem' },
      { header: 'Inter Company Message Trans Type Name', field: 'interCompanyMessageTransTypeName', width: '6rem' }
    ]
  };

  PostingCodeData = {
    id: 'PostingCode',
    name: 'Posting Details',
    TableData: this.PostingTableData,
    columns: [
      { header: 'Posting Code', field: 'postingCode', width: '2rem' },
      { header: 'Posting Name', field: 'postingName', width: '6rem' },

    ]
  };

  debitAccountFirstCodeData = {
    id: 'DebitAccountFirstCode',
    name: 'Debit Account First Code',
    TableData: this.debitAccountTableData,
    columns: [
      { header: 'Debit Account First Code', field: 'debitAccountFirstCode', width: '2rem' },
      { header: 'Debit Account First Name', field: 'debitAccountFirstName', width: '6rem' }
    ]
  };

  creditAccountSecondCodeData = {
    id: 'CreditAccountSecondCode',
    name: 'Credit Account Second Code',
    TableData: this.creditAccountTableData,
    columns: [
      { header: 'Credit Account Second Code', field: 'creditAccountSecondCode', width: '2rem' },
      { header: 'Credit Account Second Name', field: 'creditAccountSecondName', width: '6rem' }
    ]
  };

  // Vendor Data
  VendorData = {
    id: 'VendorCode',
    name: 'Vendor Details',
    TableData: this.vendorTableData,
    columns: [
      { header: 'Vendor Code', field: 'vendorCode', width: '4rem' },
      { header: 'Vendor Name', field: 'vendorName', width: '6rem' }
    ]
  };

  // Vendor Plant Location Data
  VendorPlantLocationData = {
    id: 'VendorPlantLocationCode',
    name: 'Vendor Plant Location Details',
    TableData: this.vendorPlantLocationTableData,
    columns: [
      { header: 'Plant Code', field: 'vendorPlantLocationCode', width: '4rem' },
      { header: 'Plant Name', field: 'vendorPlantLocationName', width: '6rem' }
    ]
  };

  // Vendor Store Location Data
  VendorStoreLocationData = {
    id: 'VendorStoreLocationCode',
    name: 'Vendor Store Location Details',
    TableData: this.vendorStoreLocationTableData,
    columns: [
      { header: 'Store Code', field: 'vendorStoreLocationCode', width: '4rem' },
      { header: 'Store Name', field: 'vendorStoreLocationName', width: '6rem' }
    ]
  };

  // Purchase Organization Data
  PurchaseOrganizationData = {
    id: 'PurchaseOrganizationCode',
    name: 'Purchase Organization Details',
    TableData: this.purchaseOrganizationTableData,
    columns: [
      { header: 'Org Code', field: 'purchaseOrganizationCode', width: '4rem' },
      { header: 'Org Name', field: 'purchaseOrganizationName', width: '6rem' }
    ]
  };

  // Materials Requester Employee Data
  MaterialsRequesterEmployeeData = {
    id: 'MaterialsRequesterEmployeeCode',
    name: 'Materials Requester Employee Details',
    TableData: this.materialsRequesterEmployeeTableData,
    columns: [
      { header: 'Employee Code', field: 'requesterCode', width: '4rem' },
      { header: 'Employee Name', field: 'requesterName', width: '6rem' }
    ]
  };

  // Purchase Agreement Data
  PurchaseAgreementData = {
    id: 'PurchaseAgreementCode',
    name: 'Purchase Agreement Details',
    TableData: this.purchaseAgreementTableData,
    columns: [
      { header: 'Agreement Code', field: 'agreementCode', width: '4rem' },
      { header: 'Agreement Name', field: 'agreementName', width: '6rem' }
    ]
  };

  LinkRecordsData = {
    id: 'LinkRecord',
    name: 'Link Record Details',
    TableData: this.linkRecordsTableData,
    columns: [
      { header: 'Link Code', field: 'linkCode', width: '4rem' },
      { header: 'Link Name', field: 'linkName', width: '6rem' }
    ]
  };


  // Inter Company Code Data
  InterCompanyCodeData = {
    id: 'InterCompanyCode',
    name: 'Inter Company Details',
    TableData: this.interCompanyTableData,
    columns: [
      { header: 'Inter Company Code', field: 'companyCode', width: '4rem' },
      { header: 'Inter Company Name', field: 'companyName', width: '6rem' }
    ]
  };

  // Inter Company Plant Location Code Data
  InterCompanyPlantLocationCodeData = {
    id: 'InterCompanyPlantLocationCode',
    name: 'Inter Company Plant Location Details',
    TableData: this.interCompanyPlantLocationTableData,
    columns: [
      { header: 'Inter Company Plant Code', field: 'plantCode', width: '4rem' },
      { header: 'Inter Company Plant Name', field: 'plantName', width: '6rem' }
    ]
  };

  // Inter Company Store Location Code Data
  InterCompanyStoreLocationCodeData = {
    id: 'InterCompanyStoreLocationCode',
    name: 'Inter Company Store Location Details',
    TableData: this.interCompanyStoreLocationTableData,
    columns: [
      { header: 'Inter Company Store Code', field: 'storeCode', width: '4rem' },
      { header: 'Inter Company Store Name', field: 'storeName', width: '6rem' }
    ]
  };


  // Ensure to define the other data tables like CustomerCodeTableData, ShippedToTableData, etc. as needed.

  // pop-up/look-up ends


  MastersTabArray = [
    { codeHeader: 'Cost Center Code', code: '', nameHeader: 'Cost Center Name', name: '', PopUpName: 'CostCenterCode' },
    { codeHeader: 'Profit Center Code', code: '', nameHeader: 'Profit Center Name', name: '', PopUpName: 'ProfitCenterCode' },
    { codeHeader: 'Salesman Code', code: '', nameHeader: 'Salesman Name', name: '', PopUpName: 'SalesmanCode' },
    { codeHeader: 'Division Code', code: '', nameHeader: 'Division Name', name: '', PopUpName: 'DivisionCode' },
    { codeHeader: 'Department Code', code: '', nameHeader: 'Department Name', name: '', PopUpName: 'DepartmentCode' },
    { codeHeader: 'Job Code', code: '', nameHeader: 'Job Name', name: '', PopUpName: 'JobCode' },
    { codeHeader: 'Other Centre Code', code: '', nameHeader: 'Other Centre Name', name: '', PopUpName: 'OtherCentreCode' },
    { codeHeader: 'Sales Organization Code', code: '', nameHeader: 'Sales Organization Name', name: '', PopUpName: 'SalesOrganizationCode' },
    { codeHeader: 'Distribution Channel Code', code: '', nameHeader: 'Distribution Channel Name', name: '', PopUpName: 'DistributionChannelCode' },
    { codeHeader: 'Sales Office Code', code: '', nameHeader: 'Sales Office Name', name: '', PopUpName: 'SalesOfficeCode' },
    { codeHeader: 'Sales Group Code', code: '', nameHeader: 'Sales Group Name', name: '', PopUpName: 'SalesGroupCode' },
    { codeHeader: 'Place of Supply Code', code: '', nameHeader: 'Place of Supply Name', name: '', PopUpName: 'PlaceOfSupplyCode' },
    { codeHeader: 'Jurisdiction Code', code: '', nameHeader: 'Jurisdiction Name', name: '', PopUpName: 'JurisdictionCode' }
  ];


  rights = [
    { hasRight: true, detail: 'Access', hasAction: true },
    { hasRight: true, detail: 'Edit', hasAction: true },
    { hasRight: true, detail: 'Delete', hasAction: true },
    { hasRight: true, detail: 'Print', hasAction: true },
    { hasRight: true, detail: 'Re Print Documents', hasAction: true },
    { hasRight: true, detail: 'Edit Documents Enter by Other Users', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are checked', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are Reconciled', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are Authorized by Higher groups', hasAction: true },
    { hasRight: true, detail: 'Enter Documents Exceed the limit', hasAction: true },
    { hasRight: true, detail: 'Enter Documents Make Cash and Bank Negative', hasAction: true },
    { hasRight: true, detail: 'Edit documents that are re Printed', hasAction: true },
    { hasRight: true, detail: 'Accesses though API', hasAction: true },
    { hasRight: true, detail: 'Always suspend upon saving', hasAction: true },
    { hasRight: true, detail: 'Change Print Layouts', hasAction: true },
    { hasRight: true, detail: 'Print Un authorized documents', hasAction: true },
    { hasRight: true, detail: 'Access to link Report', hasAction: true },
    { hasRight: true, detail: 'Make Cheque Void', hasAction: true },
    { hasRight: true, detail: 'Close Link', hasAction: true },
    { hasRight: true, detail: 'Access documents entered by other user', hasAction: true }
  ];

  scrollableTabs: any[] = [
    { title: "Main", content: "" },
    { title: "Other Expenses", content: "Content for Other Expenses" },
    { title: "Payment Terms", content: "" },
    { title: "PO Number", content: "" },
    { title: "Tax", content: "Content for Tax" },
    { title: "Tax Additional Entry", content: "Content for Tax Additional Entry" },
    { title: "Masters", content: "Content for Masters" },
    { title: "Quantity Reservation", content: "Content for Quantity Reservation" },
    { title: "Other Fields", content: "Content for Other Fields" },
    { title: "Journal", content: "Content for Journal" },
    { title: "User Key", content: "Content for User Key" },
    { title: "Vessel Booking", content: "Content for Vessel Booking" },
    { title: "QA/QC", content: "Content for QA/QC" },
    { title: "WH Management", content: "Content for WH Management" },
    { title: "LC Details", content: "Content for LC" },
    { title: "Document Attachment", content: "Content for Document Attachment" },
    { title: "Inter Company", content: "Content for Inter Company" },
    { title: "Form Settings", content: "Content for Form Settings" },
    { title: "Alerts And Messages", content: "" },
    { title: "DigiLock", content: "" },


  ];


  products: any[] = [
    // Sample data
    {
      slNo: 1,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    {
      slNo: 2,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    {
      slNo: 3,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    {
      slNo: 4,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    {
      slNo: 5,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    {
      slNo: 6,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    {
      slNo: 7,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    {
      slNo: 8,
      productCode: 'P001',
      productName: 'Product 1',
      productLongName: 'Product 1 Long Name',
      unit: 'pcs',
      qty: 10,
      rate: 100,
      grossAmount: 1000,
      discount: 50,
      netAmount: 950,
      landedCost: 900,
      link: 'http://example.com',
      warehouse: 'Warehouse 1',
      batchNo: 'Batch001',
      manufacturingDate: new Date('2023-01-01'),
      expiryDate: new Date('2025-01-01'),
      tax1Code: 'TAX1',
      tax1Percent: 5,
      tax1Amount: 47.5,
      tax2Code: 'TAX2',
      tax2Percent: 10,
      tax2Amount: 95,
      tax3Code: 'TAX3',
      tax3Percent: 15,
      tax3Amount: 142.5,
      tax4Code: 'TAX4',
      tax4Percent: 20,
      tax4Amount: 190,
      tax5Code: 'TAX5',
      tax5Percent: 25,
      tax5Amount: 237.5,
      taxDiff: 10,
      taxRcDiff: 5,
      otherTax: 30,
      totalTax: 50,
      remarks: 'Sample product',
      deliveryDate: new Date('2024-01-01'),
      deliveryDays: 5,
      accountFirstName: 'John',
      accountSecondCode: 'A001',
      accountSecondName: 'Account 1',
      other1Fields: 'Other 1',
      other2Fields: 'Other 2',
      other3Fields: 'Other 3',
      other4Fields: 'Other 4',
      other5Fields: 'Other 5',
      other6Fields: 'Other 6',
      other7Fields: 'Other 7',
      other8Fields: 'Other 8',
      other9Fields: 'Other 9',
      other10Fields: 'Other 10',
      other11Fields: 'Other 11',
      other12Fields: 'Other 12',
      other13Fields: 'Other 13',
      other14Fields: 'Other 14',
      other15Fields: 'Other 15',
    },
    // Add more sample data as needed...
  ];

  TableData = [
    { field: 'slNo', header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false },
    { field: 'productCode', header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: '12345678912345', manual: true, PopUp: true, PopUpData: 'ProductCode' },
    { field: 'productName', header: 'Product Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false },
    { field: 'productLongName', header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false },
    { field: 'unit', header: 'Unit', hide: false, mandatory: false, width: '4rem', data: '123456', manual: true },
    { field: 'qty', header: 'Qty', hide: false, mandatory: true, width: '7rem', data: '12345678912345', manual: true },
    { field: 'rate', header: 'Rate', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true },
    { field: 'grossAmount', header: 'Gross Amount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false },
    { field: 'discount', header: 'Discount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true },
    { field: 'netAmount', header: 'Net Amount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false },
    { field: 'landedCost', header: 'Cost Of Sales', hide: false, mandatory: false, width: '7rem', data: '123456789', manual: false },
    { field: 'linkVoucherNo1', header: 'Link Voucher No. 01', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'linkVoucherNo2', header: 'Link Voucher No. 02', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'linkVoucherNo3', header: 'Link Voucher No. 03', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'warehouse', header: 'Warehouse One Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'WarehouseCode' },
    { field: 'warehouse', header: 'Warehouse One Name', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, },
    { field: 'warehouse', header: 'Warehouse Two Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'WarehouseCode' },
    { field: 'warehouse', header: 'Warehouse Two Name', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true,  },
    { field: 'batchNo', header: 'MRV Single Batch No.', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'MrvSingleBatchNumber' },
    { field: 'batchNo', header: 'MRV Multiple Batch', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'MrvMultipleBatchNumber' },
    { field: 'manufacturingDate', header: 'Manufacturing Date', hide: false, mandatory: false, width: '6rem', data: '12/09/2024', manual: true },
    { field: 'expiryDate', header: 'Expiry Date', hide: false, mandatory: false, width: '6rem', data: '12/09/2024', manual: true },
    { field: 'tax1Code', header: 'Tax Code', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: true },
    { field: 'tax1Percent', header: 'Tax Name', hide: false, mandatory: false, width: '4rem', data: '123456', manual: false },
    { field: 'tax1Amount', header: 'Input Tax Perce', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false },
    { field: 'tax2Code', header: 'OutPut Tax Perce', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'deliveryDate', header: 'Expected Delivery Date', hide: false, mandatory: false, width: '7rem', data: '12/09/2024', manual: true },
    { field: 'other1Fields', header: 'Other 1 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false },

    { field: 'accountFirstCode', header: 'Account First Code', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false },
    { field: 'accountFirstName', header: 'Account First Name', hide: true, mandatory: false, width: '8rem', data: '123456789123456789', manual: false },
    { field: 'accountSecondCode', header: 'Account Second Code', hide: true, mandatory: false, width: '6rem', data: '12345678912345', manual: false },
    { field: 'accountSecondName', header: 'Account Second Name', hide: true, mandatory: false, width: '6rem', data: '123456789123456789', manual: false },
    { field: 'fcAmount', header: 'FC Amount', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false },
    { field: 'amountDebt', header: 'Amount Debt', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false },
    { field: 'amountCredit', header: 'Amount Credit', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false },
    { field: 'remarks', header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false },
    { field: 'remarks', header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false },
    { field: 'remarks', header: 'Close Link', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false },
  ];

  documentTableData = [
    {},
    {},
    {},
    {},
  ];

  restrictionData = [{}]

  DigiLockerFields = [{
    fieldName: "All Transaction Number",
    type: "input"
  }, {
    fieldName: "Screen number",
    type: "input"
  }, {
    fieldName: "Flag Code(A/S/R)",
    type: "input"
  }, {
    fieldName: "Transaction Entered User",
    type: "input"
  }, {
    fieldName: "Transaction Edit User Code",
    type: "input"
  }, {
    fieldName: "Log Voucher No",
    type: "input"
  }, {
    fieldName: "Log Voucher Date",
    type: "input"
  },
  {
    fieldName: "Amendment Code",
    type: "input"
  }, {
    fieldName: "Printed Yn",
    type: "input"
  }, {
    fieldName: "Re Printed Yn",
    type: "input"
  }, {
    fieldName: "Document Checked Yn",
    type: "input"
  }]


  subTableData: any[] = [
    {
      qty: '00',
      grossAmount: '000.00',
      discount: '00.00',
      netAmount: '800.00',
      costOfSales: '000.00',
      inputTaxAmount: '00.00',
      outputTaxAmount: '00.00',
      creditLimitAmount: '00.00',
      creditLimitDays: '0',
      insuranceCreditLimit: '00.00',
      insuranceCreditDays: '45',
      blockCreditLimit: '00.00',
      blockDays: '0',
      accountBalance: '00.00',
      vatAdvance: '00.00',
    },
    // Add more rows here if needed
  ];


  QuantityTabProductsTableData = [
    {
      slNo: 1,
      productCode: 'P001',
      productName: 'Product One',
      productLongName: 'Product One Long Name',
      unit: 'pcs',
      qty: 10,
      expectedDeliveryDate: '2024-10-30' // Example date
    },
    {
      slNo: 2,
      productCode: 'P002',
      productName: 'Product Two',
      productLongName: 'Product Two Long Name',
      unit: 'pcs',
      qty: 20,
      expectedDeliveryDate: '2024-11-05' // Example date
    }, {}, {}
    // Add more products as needed
  ];

  QuantityTabBlockItemsDetailsTableData = [
    {
      sysId: 1,
      warehouseLocation: 'Warehouse A',
      netBalanceQty: 100,
      stockDate: '2024-10-30',
      salesQty: 10,
      materialRequestQty: 5,
      hardReservationQty: 15,
      softReservationQty: 5,
      selectSoftReservation: false
    },
    {
      sysId: 2,
      warehouseLocation: 'Warehouse B',
      netBalanceQty: 200,
      stockDate: '2024-10-30',
      salesQty: 20,
      materialRequestQty: 10,
      hardReservationQty: 25,
      softReservationQty: 10,
      selectSoftReservation: false
    }, {}, {}
    // Add more inventory items as needed
  ];


  FormSettingsTabTableData = [
    {
      postingCode: 'PC001',
      postingName: 'Posting Type 1',
      sqlFieldName: 'sql_field_1',
      symbol: '$',
      amount: 100.50,
      formula: 'A+B',
      debitAccountFirstCode: 'D001',
      debitAccountFirstName: 'Debit Account 1',
      creditAccountSecondCode: 'C001',
      creditAccountSecondName: 'Credit Account 1'
    },
    {
      postingCode: 'PC002',
      postingName: 'Posting Type 2',
      sqlFieldName: 'sql_field_2',
      symbol: '€',
      amount: 250.75,
      formula: 'X-Y',
      debitAccountFirstCode: 'D002',
      debitAccountFirstName: 'Debit Account 2',
      creditAccountSecondCode: 'C002',
      creditAccountSecondName: 'Credit Account 2'
    }, {}, {}
    // Add more objects as needed
  ];


  MasterFormTable = [
    { field: '12345678912345', header: 'Posting Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false, PopUp: true, PopUpData: 'PostingCode' },
    { field: '12345678912345', header: 'Posting Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'SQL_Field_Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Symbol', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Amount', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Formula', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Debit Account First Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false, },
    { field: '12345678912345', header: 'Debit Account First Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Credit Account Second Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false, },
    { field: '12345678912345', header: 'Credit Account Second Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  ];

  DetailFormulaTable = [
    { field: '12345678912345', header: 'Posting Code', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: false, PopUp: true, PopUpData: 'PostingCode' },
    { field: '12345678912345', header: 'Posting Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'SQL_Field_Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Symbol', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Amount', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Formula', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Debit Account First Code', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: false, PopUp: true, PopUpData: 'AccountCode' },
    { field: '12345678912345', header: 'Debit Account First Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Credit Account Second Code', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: false, PopUp: true, PopUpData: 'AccountCode' },
    { field: '12345678912345', header: 'Credit Account Second Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
  ];

  OtherExpenseTabData: any[] = [
    {
      accountCode: '12345678912345',
      accountName: '123456789123456789123456789',
      fcAmount: '123456789',
      currencyCode: 'USD',
      currencyName: 'United States Dollar',
      currencyRate: '1.25',
      expenses: 123456789,
      addToBilling: false,
      narrationCode: '12345678912345',
      narrationName: '123456789123456789123456789'
    },
    {
      accountCode: '98765432109876',
      accountName: '987654321098765432109876543',
      fcAmount: '987654321',
      currencyCode: 'EUR',
      currencyName: 'Euro',
      currencyRate: '0.85',
      expenses: 987654321,
      addToBilling: true,
      narrationCode: '98765432109876',
      narrationName: '987654321098765432109876543'
    }
  ];

  journalTabData = [
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: null, credit: 123456789 },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: null, credit: 123456789 }
  ];


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
    if (Type == 'VocherType') {
      this.PopUpData = this.VocherTypeData


    }
    else if (Type == 'SalesAccount') {
      this.PopUpData = this.salesAccountData


    }
    else if (Type == 'CustomerCode') {
      this.PopUpData = this.CustomerCodeData

    }
    else if (Type == 'ShippedTo') {
      this.PopUpData = this.ShippedToData

    }
    else if (Type == 'BilledTo') {
      this.PopUpData = this.BilledToData

    }
    else if (Type == 'NarrationCode') {
      this.PopUpData = this.NarrationCodeData

    }
    else if (Type == 'CurrencyCode') {
      this.PopUpData = this.CurrencyCodeData

    }
    else if (Type == 'DefaultCurrencyCode') {
      this.PopUpData = this.DefaultCurrencyCodeData
    }
    else if (Type == 'SalesAgreementCode') {
      this.PopUpData = this.SalesAgreementData

    }
    else if (Type == 'CopyDocFromTemplateCode') {
      this.PopUpData = this.CopyDocFromTemplateCodeData

    }
    else if (Type == 'PaymentTerms') {
      this.PopUpData = this.PaymentTermsData

    }
    else if (Type == 'IncoTerms') {
      this.PopUpData = this.IncoTermsData

    }
    else if (Type == 'TaxCode') {
      this.PopUpData = this.TaxCodeData

    }
    else if (Type == 'AccountCode') {
      this.PopUpData = this.AccountCodeData

    }
    else if (Type === 'CostCenterCode') {
      this.PopUpData = this.CostCenterData;
    }
    else if (Type === 'ProfitCenterCode') {
      this.PopUpData = this.ProfitCenterData;
    }
    else if (Type === 'SalesmanCode') {
      this.PopUpData = this.SalesmanData;
    }
    else if (Type === 'DivisionCode') {
      this.PopUpData = this.DivisionData;
    }
    else if (Type === 'DepartmentCode') {
      this.PopUpData = this.DepartmentData;
    }
    else if (Type === 'JobCode') {
      this.PopUpData = this.JobData;
    }
    else if (Type === 'OtherCentreCode') {
      this.PopUpData = this.OtherCentreData;
    }
    else if (Type === 'SalesOrganizationCode') {
      this.PopUpData = this.SalesOrganizationData;
    }
    else if (Type === 'DistributionChannelCode') {
      this.PopUpData = this.DistributionChannelData;
    }
    else if (Type === 'SalesOfficeCode') {
      this.PopUpData = this.SalesOfficeData;
    }
    else if (Type === 'SalesGroupCode') {
      this.PopUpData = this.SalesGroupData;
    }
    else if (Type === 'PlaceOfSupplyCode') {
      this.PopUpData = this.PlaceOfSupplyData;
    }
    else if (Type === 'JurisdictionCode') {
      this.PopUpData = this.JurisdictionData;
    }
    else if (Type === 'MrvSingleBatchNumber') {
      this.PopUpData = this.MrvSingleBatchNumberData;
    }
    else if (Type === 'MrvMultipleBatchNumber') {
      this.PopUpData = this.MrvMultipleBatchNumberData;
    }
    else if (Type === 'WarehouseCode') {
      this.PopUpData = this.WarehouseData;
    }
    else if (Type === 'ProductCode') {
      this.PopUpData = this.ProductData;
    }
    else if (Type === 'InterCompanyTransType') {
      this.PopUpData = this.InterCompanyTransTypeData;
    }
    else if (Type === 'PostingCode') {
      this.PopUpData = this.PostingCodeData;
    }
    else if (Type === 'DebitAccountFirstCode') {
      this.PopUpData = this.debitAccountFirstCodeData;
    }
    else if (Type === 'CreditAccountSecondCode') {
      this.PopUpData = this.creditAccountSecondCodeData;
    }
    else if (Type === 'VendorCode') {
      this.PopUpData = this.VendorData;
    }
    else if (Type === 'VendorPlantLocationCode') {
      this.PopUpData = this.VendorPlantLocationData;
    }
    else if (Type === 'VendorStoreLocationCode') {
      this.PopUpData = this.VendorStoreLocationData;
    }
    else if (Type === 'PurchaseOrganizationCode') {
      this.PopUpData = this.PurchaseOrganizationData;
    }
    else if (Type === 'MaterialsRequesterEmployeeCode') {
      this.PopUpData = this.MaterialsRequesterEmployeeData;
    }
    else if (Type === 'PurchaseAgreementCode') {
      this.PopUpData = this.PurchaseAgreementData;
    }
    else if (Type === 'LinkRecordCode') {
      this.PopUpData = this.LinkRecordsData;
    }
    else if (Type === 'InterCompanyCode') {
      this.PopUpData = this.InterCompanyCodeData;
    }
    else if (Type === 'InterCompanyPlantLocationCode') {
      this.PopUpData = this.InterCompanyPlantLocationCodeData;
    }
    else if (Type === 'InterCompanyStoreLocationCode') {
      this.PopUpData = this.InterCompanyStoreLocationCodeData;
    }



    this.ShowLookUp = true

  }

  chooseLookup(selectedRow) {


    console.log("this.PopUpData.id ===", this.PopUpData.id);
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
    } else if (this.PopUpData.id === 'CostCenterCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'CostCenterCode');
      if (selectedField) {
        selectedField.code = selectedRow.costCenterCode;
        selectedField.name = selectedRow.costCenterName;
      }

    } else if (this.PopUpData.id === 'ProfitCenterCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'ProfitCenterCode');
      if (selectedField) {
        selectedField.code = selectedRow.profitCenterCode;
        selectedField.name = selectedRow.profitCenterName;
      }

    } else if (this.PopUpData.id === 'SalesmanCode') {
      console.log("this.PopUpData.id === 2", this.PopUpData.id);
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'SalesmanCode');
      if (selectedField) {
        selectedField.code = selectedRow.salesmanCode;
        selectedField.name = selectedRow.salesmanName;
      }

    } else if (this.PopUpData.id === 'DivisionCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'DivisionCode');
      if (selectedField) {
        selectedField.code = selectedRow.divisionCode;
        selectedField.name = selectedRow.divisionName;
      }

    } else if (this.PopUpData.id === 'DepartmentCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'DepartmentCode');
      if (selectedField) {
        selectedField.code = selectedRow.departmentCode;
        selectedField.name = selectedRow.departmentName;
      }

    } else if (this.PopUpData.id === 'JobCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'JobCode');
      if (selectedField) {
        selectedField.code = selectedRow.jobCode;
        selectedField.name = selectedRow.jobName;
      }

    } else if (this.PopUpData.id === 'OtherCentreCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'OtherCentreCode');
      if (selectedField) {
        selectedField.code = selectedRow.otherCentreCode;
        selectedField.name = selectedRow.otherCentreName;
      }

    } else if (this.PopUpData.id === 'SalesOrganizationCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'SalesOrganizationCode');
      if (selectedField) {
        selectedField.code = selectedRow.salesOrganizationCode;
        selectedField.name = selectedRow.salesOrganizationName;
      }

    } else if (this.PopUpData.id === 'DistributionChannelCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'DistributionChannelCode');
      if (selectedField) {
        selectedField.code = selectedRow.distributionChannelCode;
        selectedField.name = selectedRow.distributionChannelName;
      }

    } else if (this.PopUpData.id === 'SalesOfficeCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'SalesOfficeCode');
      if (selectedField) {
        selectedField.code = selectedRow.salesOfficeCode;
        selectedField.name = selectedRow.salesOfficeName;
      }

    } else if (this.PopUpData.id === 'SalesGroupCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'SalesGroupCode');
      if (selectedField) {
        selectedField.code = selectedRow.salesGroupCode;
        selectedField.name = selectedRow.salesGroupName;
      }

    } else if (this.PopUpData.id === 'PlaceOfSupplyCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'PlaceOfSupplyCode');
      if (selectedField) {
        selectedField.code = selectedRow.placeOfSupplyCode;
        selectedField.name = selectedRow.placeOfSupplyName;
      }

    } else if (this.PopUpData.id === 'JurisdictionCode') {
      const selectedField = this.MastersTabArray.find(field => field.PopUpName === 'JurisdictionCode');
      if (selectedField) {
        selectedField.code = selectedRow.jurisdictionCode;
        selectedField.name = selectedRow.jurisdictionName;
      }
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

  routeTo(screen) {

    if (screen == 'VesselBooking') {
      this.router.navigate(['/common/vessel-booking']);
    }
    else if (screen == 'QA/QC') {
      this.router.navigate(['/common/qa-qc']);
    }
    else if (screen == 'ApplicableDates') {
      this.router.navigate(['/common/applicable-dates']);
    }
    else if (screen == 'WHManagement') {
      this.router.navigate(['/common/wh-management']);
    }
  }

}