import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() displayData: any;

  @Output() backClick = new EventEmitter<any>();


  showDialog: boolean = false;
  popUpData: any = { id: '', name: '', TableData: [], columns: [] };
  popupType: string = '';
  tableData: any;
  searchString: string = '';
  RemarkCodeData: any;

  AccountGroupCodeData: any;


  // Define your data arrays
  VocherTypeTableData = [
    { vocherType: 'Payment', vocherNumber: 'V001' },
    { vocherType: 'Receipt', vocherNumber: 'V002' },
    { vocherType: 'Journal', vocherNumber: 'V003' },
    { vocherType: 'Contra', vocherNumber: 'V004' }
  ];

  // Dummy data for Sales Account


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

  PostingTableData = [
    { postingCode: 'PC001', postingName: 'Type 1' },
    { postingCode: 'PC002', postingName: 'Type 2' },
    { postingCode: 'PC003', postingName: 'Type 3' },
    { postingCode: 'PC004', postingName: 'Type 4' }
  ];


  VocherTypeData: any

  CustomerCodeData: any

  ExpAccountCodeData: any;

  ShippedToData: any

  BilledToData: any

  NarrationCodeData: any

  CurrencyCodeData: any;

  PaymentTermsData: any;

  IncoTermsData: any;

  TaxCodeData: any;
  TaxACodeData: any;

  TaxAddAccountCodeData: any;

  TaxAccountCodeCodeData: any;

  JurisdictionData: any;

  PlaceOfSupplyData: any;

  SalesGroupData: any;

  SalesOfficeData: any;

  DistributionChannelData: any;

  SalesOrganizationData: any;

  OtherCentreData: any;

  JobData: any;

  DepartmentData: any;

  DivisionData: any;

  SalesmanData: any;

  ProfitCenterData: any;

  CostCenterData: any;

  SingleCompanyData: any;

  EmployeeGroupCodeData: any;
  validationscreencodeData: any;
  selectionSalesGroupCodeData: any;




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

  SalesAgreementData: any;

  PurchaseAgreementData: any;

  CopyDocFromTemplateCodeData: any;

  JournalAccountCodeData: any;




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


  MrvSingleBatchNumberData: any

  MrvMultipleBatchNumberData: any

  WarehouseData: any


  ProductData: any

  InterCompanyTransTypeData: any;

  InterCoNarrationCodeData: any;

  ExpNarrationCodeData: any;

  ExpDefaultCurrencyCodeData: any;

  PostingHCodeData: any;

  PostingDCodeData: any;

  debitAccountFirstCodeData: any

  creditAccountSecondCodeData: any

  ProductModuleData: any

  AlertCodeData: any

  FieldMasterCodeData: any

  TabFormCodeData: any;

  AuthMsgAlertCodeData: any;

  RejectMsgAlertCodeData: any;

  AuthMsgEmpCodeData: any;

  RejectMsgEmpCodeData: any;

  SaveMsgAlertCodeData: any;

  DocAlertCodeData: any;

  DocEmployeeCodeData: any;

  DocDocumnetCodeData: any;

  VesFactoryCodeData: any;

  VesProdPlantCodeData: any;

  VesPickupPointCodeData: any;

  VesSwitchBLPortCodeData: any

  VesSwitchBLAgentData: any

  VesBookAgentCodeData: any

  VesShipLineCodeData: any

  VesLoadingPortCodeData: any

  VesTransitPortCodeData: any

  VesPortDisCodeData: any

  VesClearingAgentData: any;

  VesECSAccCodeData: any

  VesECSCurrCodeData: any

  VesECSRemCodeData: any

  CityCodeData: any

  CountryCodeData: any;

  AreaCodeData: any

  AccTypeCodeData: any

  AccTaxableCodeData: any

  BankAccTypeCodeData: any


  AccPurAcctypeCodeData: any

  AccSalesAccCodeData: any

  AccCustAccTypeCodeData: any

  AccVendorAccTypeCodeData: any

  AccTaxTypeCodeData: any

  AccDirectExpCodeData: any

  ApplicableCompanyCodeData: any

  ActAndDeactCodeData: any


  EmpGrpCodeMData: any

  EmpCataCodeMData: any

  EmpTypCodeMData: any

  EmpLeavePolCodeMData: any

  AlertsEmpCodeMData: any

  AuthorizerCodeDataData: any

  EmployeeDeptCodeData: any

  LandedCostCodeData: any

  CriteriaCodeData: any

  HideOrDispFieldData: any


  CustomerGroupData: any

  LcNegotiatingBankCodeData: any

  LcAdvisingBankCodeData: any

  LcCurrencyCodeData: any

  LcIssuingBankCodeData: any

  LcAlertCodeData: any

  LcEmpCodeData: any;

  GroupCoCodeData: any;

  VoucherTypeCodeData: any;

  VoucherTypeMenuCodeData: any;

  ProductGroupCodeData: any;

  CityCodeDataPop: any;

  CountryCodeDataPop: any;
  EmployeeCodeData: any;
  SalaryAdditionCodeData: any;



  PriceListGroupCodeData: any;
  accountFirstCodeData: any;
  PaidToData: any;
  RemarksCodeData: any;
  TaxableTypeCodeData: any
  MenuCodeData: any;
  GratuityTypeCodeData: any
  CorporateTaxAccountGroupData: any
  BaseUnitGroupData: any;
  FirstAccGroupData: any;
  AdditionalExpGroupData: any;
  ExpenseAddToCustSupplierData: any;
  InterCoGroupData: any;
  DirectExpAccGroupData: any;
  InDirectExpAccGroupData: any;
  SecondAccGroupData: any;
  CustomerGroupCodeData: any;
  VendorGroupCodeData: any;
  CustomerAccGroupCodeData: any;
  TaxGroupData: any;
  AdditionalTaxGroupOneData: any;
  AdditionalTaxGroupTwoData: any;
  TaxAccGroupCodeData: any;
  TaxAccGroupOneCodeData: any;
  TaxAccGroupTwoCodeData: any;
  DTaxCodeData: any;
  InventoryAccCodeData: any;
  SalesAccCodeData: any;
  CostOfSalesAccCodeData: any;
  PurcahseAccCodeData: any;
  VatInputAccCodeData: any;
  VatOutputAccCodeData: any;
  VatAdvAccCodeData: any;
  OtherTaxInputAccCodeData: any;
  OtherTaxOutputAccCodeData: any;
  AreaCode2Data: any;
  CityCode2Data: any;
  CountryCode2Data: any;
  AccTypeCode2Data: any;
  SupplierCodeData: any;
  ProductUnitData: any;
  ProductUnit2Data: any;
  accountFirstCode2Data: any;
  BomJobData: any;
  BomProductionBatchData: any;
  BomProductModuleData: any;
  ProductionProcessData: any;
  ManpowerCodeData: any;
  ManpowerModuleData: any;
  EmployeeData: any;
  EmployeeModuleData: any;
  EmployeeCategoryData: any;
  EmployeePayrollData: any;
  EmployeeAccountData: any;
  EmployeeTypeData: any;
  SummaryDetailData: any;
  SalaryRemarksCodeData: any;
  OvertimeCalculationCodeData: any;
  LeaveSalaryCalculationCodeData: any;
  GratuityCalculationCodeData: any;
  payrolldesignationcodeData: any;
  AccountAdditionCodeData: any;
  SalaryDeductionCodeData: any;
  AccountDeductionCodeData: any;
  LeaveTypeCodeData: any;
  LeavePolicyCodeData: any;
  leaveappTypeCodeData: any;
  LeaveSummaryCodeData: any;
  LeaveTypeCodeDataCode: any;
  AccrualMasterData: any;
  AdditionCodeData: any;
  TaxReferanceData: any;
  ReferanceData: any;
  PrepaidMasterData: any;
  FixAssetsCodeData: any;
  CompanySalesData: any;
  PurchaseAccountData: any
  CompanyExpenseData: any;
  SupplierCustomerData: any
  SalesAgreementCodeData: any;
  DepreciationExpensesCodeData: any;
  UnitData: any;


  UsrRoleCodeData: any;
  UsrLanguageCodeData: any;
  UsrEmpCodeData: any;
  UsrActAndDeactCodeData: any;
  printFormatCodeData: any;
  salesGroupSelectionData: any;
  ProfitandLossData: any;
  TransactionMenuData: any;
  ValidationMenuCodeData: any;
  CompanyCodeData: any;
  BilledToCodeData: any;
  ShippedToCodeData: any;
  ApplicationDateCodeData: any;

  MidValidationMenuCodeData: any;
  MidTransactionMenuCodeData: any;
  AccountModule: {
    id: string; name: string; TableData: any; // Replace with relevant data source
    columns: { header: string; field: string; width: string; }[];
  };
  AccGroupCode: any;
  AccountGroup: any;
  AccountGroupCompanyWise: any;
  DocumentCodeData: any;

  //Manpower biling

  customersitecodedata: any;
  locationcodedata: any;
  designationcodedata: any;
  jobcreationcodedata: any;
  criteriamanpowerdata: any;


  constructor(private lookupService: LookupDialogService, public popUpService: CommonPopupService) { }

  ngOnInit(): void {

    this.lookupService.dialogState$.subscribe((state) => {
      this.tableData = this.popUpService.popUpData


      this.criteriamanpowerdata = {
        id: 'criteriacode',
        name: 'Criteria Details',
        TableData: this.tableData,
        columns: [
          { header: 'Criteria SysID', field: 'HPCriMaster_SysID', width: '2rem' },
          { header: 'Criteria Code', field: 'HPCriMaster_Code', width: '2rem' },
          { header: 'Criteria Name', field: 'HPCriMaster_Name', width: '6rem' },
        ]
      }


      this.RemarksCodeData = {
        id: 'RemarksCode',
        name: 'Remarks Details',
        TableData: this.tableData,
        columns: [
          { header: 'Remarks SysID', field: 'HRemMast_SysID', width: '2rem' },
          { header: 'Remarks Code', field: 'HRemMast_Code', width: '2rem' },
          { header: 'Remarks Name', field: 'HRemMast_Name', width: '6rem' },
        ]
      }

      this.jobcreationcodedata = {
        id: 'jobcreationcode',
        name: 'Job Creation Details',

        TableData: this.tableData,
        columns: [
          { header: 'Job Creation SysID', field: 'HPJobCrea_SysID', width: '2rem' },
          { header: 'Job Creation Code', field: 'HPJobCrea_Code', width: '2rem' },
          { header: 'Job Creation Name', field: 'HPJobCrea_Name', width: '6rem' },
        ]
      };


      this.designationcodedata = {
        id: 'designationcode',
        name: 'Designation Details',

        TableData: this.tableData,
        columns: [
          { header: 'Designation SysID', field: 'HPDesig_SysID', width: '2rem' },
          { header: 'Designation Code', field: 'HPDesig_Code', width: '2rem' },
          { header: 'Designation Name', field: 'HPDesig_Name', width: '6rem' },
        ]
      };



      this.customersitecodedata = {
        id: 'customersitecode',
        name: 'Customer Site Code Details',

        TableData: this.tableData,
        columns: [
          { header: 'Customer Site SysID', field: 'HPCustSite_SysID', width: '2rem' },
          { header: 'Customer Site Code', field: 'HPCustSite_Code', width: '2rem' },
          { header: 'Customer Site Name', field: 'HPCustSite_Name', width: '6rem' },
        ]
      };

      this.locationcodedata = {
        id: 'locationcode',
        name: 'Location  Details',

        TableData: this.tableData,
        columns: [
          { header: 'Location SysID', field: 'HPLocation_SysID', width: '2rem' },
          { header: 'Location Code', field: 'HPLocation_Code', width: '2rem' },
          { header: 'Location Name', field: 'HPLocation_Name', width: '6rem' },
        ]
      };



      //////////////////////////////////////////////////////////////////////////////////////////////////

      this.GroupCoCodeData = {
        id: 'GroupCoCode',
        name: 'Group Company Details',
        TableData: this.tableData,
        columns: [
          { header: 'Group Company Sys ID', field: 'HAccOne_SysID', width: '2rem' },
          { header: 'Group Company Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Group Company Name', field: 'HAccOne_Name', width: '6rem' },
        ]
      }


      this.EmployeeAccountData = {
        id: 'EmployeeAccountCode',
        name: 'Employee Account Details',
        TableData: [
          { HEmpl_Acc_Code: "ACC001", HEmpl_Acc_Name: "Salary Account" },
          { HEmpl_Acc_Code: "ACC002", HEmpl_Acc_Name: "Expense Account" },
          { HEmpl_Acc_Code: "ACC003", HEmpl_Acc_Name: "Travel Allowance" },
          { HEmpl_Acc_Code: "ACC004", HEmpl_Acc_Name: "Medical Reimbursement" },
        ],
        columns: [
          { header: 'Employee Code', field: 'HEmpl_Acc_Code', width: '2rem' },
          { header: 'Employee Name', field: 'HEmpl_Acc_Name', width: '6rem' }
        ]
      };

      this.CustomerCodeData = {
        id: 'CustomerCode',
        name: 'Customer Code Details',
        TableData: [
          { HAccOne_Code: "HAC001", HAccOne_Name: "Main Ledger" },
          { HAccOne_Code: "HAC002", HAccOne_Name: "Sub Ledger" },
          { HAccOne_Code: "HAC003", HAccOne_Name: "Fixed Assets" },
          { HAccOne_Code: "HAC004", HAccOne_Name: "Operating Expenses" },
        ],
        columns: [
          { header: 'Customer Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Customer Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      };


      this.accountFirstCodeData = {
        id: 'AccountFirstCode',
        name: 'Account Details',
        TableData: [
          { HAccOne_Code: 'P001', HAccOne_Name: 'Supplier A' },
          { HAccOne_Code: 'P002', HAccOne_Name: 'Vendor B' },
          { HAccOne_Code: 'P003', HAccOne_Name: 'Employee C' },
          { HAccOne_Code: 'P004', HAccOne_Name: 'Consultant D' },
          { HAccOne_Code: 'P005', HAccOne_Name: 'Partner E' }
        ],
        columns: [
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      };
      this.LeaveSummaryCodeData = {
        id: 'LeaveSummaryCode',
        name: 'Leave Summary Code Details',
        TableData: [
          { "leaveCode": "AL", "leaveName": "Annual Leave", "days": 15 },
          { "leaveCode": "SL", "leaveName": "Sick Leave", "days": 10 },
          { "leaveCode": "CL", "leaveName": "Casual Leave", "days": 5 },
          { "leaveCode": "PL", "leaveName": "Paternity Leave", "days": 7 },
        ],
        columns: [
          { header: 'Leave Summary Code', field: 'leaveCode', width: '2rem' },
          { header: 'Leave Summary Name', field: 'leaveName', width: '6rem' }
        ]
      };

      this.accountFirstCode2Data = {
        id: 'AccountFirstCode2',
        name: 'Account Details',
        TableData: [
          { HAccOne_Code: 'P001', HAccOne_Name: 'Supplier A' },
          { HAccOne_Code: 'P002', HAccOne_Name: 'Vendor B' },
          { HAccOne_Code: 'P003', HAccOne_Name: 'Employee C' },
          { HAccOne_Code: 'P004', HAccOne_Name: 'Consultant D' },
          { HAccOne_Code: 'P005', HAccOne_Name: 'Partner E' }
        ],
        columns: [
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      };

      this.EmployeeCodeData = {
        id: 'EmployeeCode',
        name: 'Employee Details',
        TableData: this.tableData,
        columns: [
          { header: 'Employee SysID', field: 'HEmpl_SysID', width: '2rem' },
          { header: 'Employee Code', field: 'HEmpl_Code', width: '2rem' },
          { header: 'Employee Name', field: 'HEmpl_Name', width: '6rem' }
        ]
      }
      this.payrolldesignationcodeData = {
        id: 'PayrollDesignationCode',
        name: 'Payroll Designation Details',
        TableData: [
          { "HPayroll_DesGroup_Code": "DG001", "HPayroll_DesGroup_Name": "Senior Management" },
          { "HPayroll_DesGroup_Code": "DG002", "HPayroll_DesGroup_Name": "Middle Management" },
          { "HPayroll_DesGroup_Code": "DG003", "HPayroll_DesGroup_Name": "Team Leaders" },
          { "HPayroll_DesGroup_Code": "DG004", "HPayroll_DesGroup_Name": "Software Engineers" },
          { "HPayroll_DesGroup_Code": "DG005", "HPayroll_DesGroup_Name": "HR & Admin" },
        ],
        columns: [
          { header: 'Payroll Designation Group Code', field: 'HPayroll_DesGroup_Code', width: '2rem' },
          { header: 'Payroll Designation Group name', field: 'HPayroll_DesGroup_Name', width: '6rem' }
        ]

      }

      this.SalaryDeductionCodeData = {
        id: 'SalaryDeductionCode',
        name: 'Salary Deduction Details',
        TableData: [
          { "SalaryDeductionCode": "SD001", "SalaryDeductionName": "Income Tax" },
          { "SalaryDeductionCode": "SD002", "SalaryDeductionName": "Provident Fund" },
          { "SalaryDeductionCode": "SD003", "SalaryDeductionName": "Health Insurance" },
          { "SalaryDeductionCode": "SD004", "SalaryDeductionName": "Loan Repayment" },
          { "SalaryDeductionCode": "SD005", "SalaryDeductionName": "Late Penalty" },
        ],
        columns: [
          { header: 'Salary Deduction Code', field: 'SalaryDeductionCode', width: '2rem' },
          { header: 'Salary Deduction Name', field: 'SalaryDeductionName', width: '6rem' }
        ]

      }
      this.SupplierCodeData = {
        id: 'SupplierCode',
        name: 'Supplier Details',
        TableData: [
          { HAccOne_Code: 'P001', HAccOne_Name: 'Supplier A' },
          { HAccOne_Code: 'P002', HAccOne_Name: 'Vendor B' },
          { HAccOne_Code: 'P003', HAccOne_Name: 'Employee C' },
          { HAccOne_Code: 'P004', HAccOne_Name: 'Consultant D' },
          { HAccOne_Code: 'P005', HAccOne_Name: 'Partner E' }
        ],
        columns: [
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      };



      this.ProductData = {
        id: 'ProductCode',
        name: 'Product Details',
        TableData: this.popUpService.popUpData,
        columns: [
          { header: 'Product SysID', field: 'HProd_SysID', width: '2rem' },
          { header: 'Product Code', field: 'HProd_Code', width: '2rem' },
          { header: 'Product Name', field: 'HProd_Short_Name', width: '6rem' },
          { header: 'Product Long Name', field: 'HProd_Long_Name', width: '6rem' }
        ]
      };


      this.AccountModule = {
        id: 'AccountModule',
        name: 'Account Module',
        TableData: this.popUpService.popUpData,
        columns: [
          { header: 'Account Module SysID', field: 'HAccModule_SysID', width: '2rem' },
          { header: 'Account Module Code', field: 'HAccModule_Code', width: '6rem' },
          { header: 'Account Module Name', field: 'HAccModule_Name', width: '6rem' },
        ]
      };

      this.AccountGroup = {
        id: 'AccountGroup',
        name: 'Account Group',
        TableData: this.popUpService.popUpData,
        columns: [
          { header: 'Account Group SysID', field: 'HAccGroup_Group_SysID', width: '2rem' },
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '6rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.AccountGroupCompanyWise = {
        id: 'AccountGroupCompanyWise',
        name: 'Account Details',
        TableData: this.popUpService.popUpData,
        columns: [
          { header: 'Account SysID', field: 'HAccOne_SysID', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '6rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' },
        ]
      };


      this.RemarkCodeData = {
        id: 'RemarkCode',
        name: 'Remark Details',
        TableData: [
          { HRemark_Code: 'R001', HRemark_Name: 'Remark A' },
          { HRemark_Code: 'R002', HRemark_Name: 'Remark B' },
          { HRemark_Code: 'R003', HRemark_Name: 'Remark C' },
          { HRemark_Code: 'R004', HRemark_Name: 'Remark D' },
          { HRemark_Code: 'R005', HRemark_Name: 'Remark E' }
        ],
        columns: [
          { header: 'Remarks Code', field: 'HRemark_Code', width: '2rem' },
          { header: 'Remarks  Name', field: 'HRemark_Name', width: '6rem' },

        ]
      }

      this.EmployeePayrollData = {
        id: 'EmployeePayrollCode',
        name: 'Tax Codes Details',
        TableData: [
          { HAppl_PaySetup_Code: "PAY001", HAppl_PaySetup_Name: "Monthly Salary" },
          { HAppl_PaySetup_Code: "PAY002", HAppl_PaySetup_Name: "Hourly Wages" },
          { HAppl_PaySetup_Code: "PAY003", HAppl_PaySetup_Name: "Contract Payment" },
          { HAppl_PaySetup_Code: "PAY004", HAppl_PaySetup_Name: "Overtime Pay" },
          { HAppl_PaySetup_Code: "PAY005", HAppl_PaySetup_Name: "Commission-Based" },
        ],
        columns: [
          { header: 'Tax Code', field: 'HAppl_PaySetup_Code', width: '2rem' },
          { header: 'Tax Name', field: 'HAppl_PaySetup_Name', width: '3rem' },

        ]
      };

      this.AccountDeductionCodeData = {
        id: 'AccountDeductionCode',
        name: 'Account Deduction Code',
        TableData:
          [
            { "AccountDeductionCode": "ADC001", "AccountDeductionName": "Income Tax Deduction" },
            { "AccountDeductionCode": "ADC002", "AccountDeductionName": "Provident Fund Contribution" },
            { "AccountDeductionCode": "ADC003", "AccountDeductionName": "Loan Repayment Deduction" },
            { "AccountDeductionCode": "ADC004", "AccountDeductionName": "Health Insurance Deduction" },
            { "AccountDeductionCode": "ADC005", "AccountDeductionName": "Late Fee Penalty" },
          ],
        columns: [
          { header: 'Account Deduction Code', field: 'AccountDeductionCode', width: '2rem' },
          { header: 'Account Deduction Name', field: 'AccountDeductionName', width: '3rem' },
        ]

      }

      this.AccountAdditionCodeData = {
        id: 'AccountAdditionCode',
        name: 'Account Addition Code Details',
        TableData:
          [
            { "DPayroll_AccAdd_Code": "AA001", "DPayroll_AccAdd_Name": "Basic Allowance" },
            { "DPayroll_AccAdd_Code": "AA002", "DPayroll_AccAdd_Name": "House Rent Allowance" },
            { "DPayroll_AccAdd_Code": "AA003", "DPayroll_AccAdd_Name": "Medical Allowance" },
            { "DPayroll_AccAdd_Code": "AA004", "DPayroll_AccAdd_Name": "Travel Allowance" },
            { "DPayroll_AccAdd_Code": "AA005", "DPayroll_AccAdd_Name": "Food Allowance" },
          ],
        columns: [
          { header: 'Account Addition Code', field: 'DPayroll_AccAdd_Code', width: '2rem' },
          { header: 'Account Addition Name', field: 'DPayroll_AccAdd_Name', width: '3rem' },
        ]

      }

      this.TaxCodeData = {
        id: 'TaxCode',
        name: 'Tax Codes Details',
        TableData: this.tableData,
        columns: [
          { header: 'Tax SysID', field: 'HFirstRateTax_SysID', width: '2rem' },
          { header: 'Tax Code', field: 'HFirstRateTax_Code', width: '2rem' },
          { header: 'Tax Name', field: 'HFirstRateTax_Name', width: '4rem' },
          { header: 'Tax Input %', field: 'HFirstTax_InputPerc', width: '2rem' },
          { header: 'Tax Output %', field: 'HFirstTax_OutputPerc', width: '2rem' },


        ]
      };

      this.DTaxCodeData = {
        id: 'DTaxCode',
        name: 'Tax Codes Details',
        TableData: [
          { HTax_Code_SysID: 1, HTax_Code: 'TX001', HTax_Name: 'VAT', HTax_InputPerc: 5, HTax_OutputPerc: 0 },
          { HTax_Code_SysID: 2, HTax_Code: 'TX002', HTax_Name: 'GST', HTax_InputPerc: 0, HTax_OutputPerc: 2 },
          { HTax_Code_SysID: 3, HTax_Code: 'TX003', HTax_Name: 'Service Tax', HTax_InputPerc: 6, HTax_OutputPerc: 5 },
        ],
        columns: [
          { header: 'Tax Code', field: 'HTax_Code', width: '2rem' },
          { header: 'Tax Name', field: 'HTax_Name', width: '3rem' },
          { header: 'Tax Input %', field: 'HTax_InputPerc', width: '2rem' },
          { header: 'Tax Output %', field: 'HTax_OutputPerc', width: '2rem' }
        ]
      };


      this.SalaryRemarksCodeData = {
        id: 'SalaryRemarksCode',
        name: 'Salary Remarks Code Details',
        TableData: [
          { HSalStop_Rem_Code: "SR1001", HSalStop_Rem_Name: "Salary Hold - Pending Documentation" },
          { HSalStop_Rem_Code: "SR1002", HSalStop_Rem_Name: "Salary Hold - Performance Review" },
          { HSalStop_Rem_Code: "SR1003", HSalStop_Rem_Name: "Salary Hold - Leave Without Notice" },
          { HSalStop_Rem_Code: "SR1004", HSalStop_Rem_Name: "Salary Hold - Compliance Issue" },
        ],
        columns: [
          { header: 'Salary Calculation Remarks Code', field: 'HSalStop_Rem_Code', width: '2rem' },
          { header: 'Salary Calculation Remarks Name', field: 'HSalStop_Rem_Name', width: '3rem' },

        ]
      }


      this.LeaveSalaryCalculationCodeData = {
        id: 'LeaveSalaryCalculationCode',
        name: 'Leave Salary Code Details',
        TableData: [
          { HLSalStop_Rem_Code: "LS3001", HLSalStop_Rem_Name: "Leave Salary Approved" },
          { HLSalStop_Rem_Code: "LS3002", HLSalStop_Rem_Name: "Pending HR Verification" },
          { HLSalStop_Rem_Code: "LS3003", HLSalStop_Rem_Name: "Leave Exceeded - Deduction Applied" },
          { HLSalStop_Rem_Code: "LS3004", HLSalStop_Rem_Name: "Awaiting Finance Approval" },
          { HLSalStop_Rem_Code: "LS3005", HLSalStop_Rem_Name: "Hold Due to Policy Violation" }
        ],
        columns: [
          { header: 'Leave Salary Calculation Remarks Code', field: 'HLSalStop_Rem_Code', width: '2rem' },
          { header: 'Leave Salary  Calculation Remarks Name', field: 'HLSalStop_Rem_Name', width: '3rem' },


        ]
      }

      this.GratuityCalculationCodeData = {
        id: 'GratuityCalculationCode',
        name: 'Gratuity Calculation Code Details',
        TableData: [
          { HGratStop_Rem_Code: "G4001", HGratStop_Rem_Name: "Gratuity Approved" },
          { HGratStop_Rem_Code: "G4002", HGratStop_Rem_Name: "Pending Tenure Verification" },
          { HGratStop_Rem_Code: "G4003", HGratStop_Rem_Name: "Gratuity Hold - Compliance Issue" },
          { HGratStop_Rem_Code: "G4004", HGratStop_Rem_Name: "Awaiting Final Approval" },
          { HGratStop_Rem_Code: "G4005", HGratStop_Rem_Name: "Gratuity Rejected - Incomplete Service" }
        ],
        columns: [
          { header: 'Gratuity Calculation Remarks Code', field: 'HGratStop_Rem_Code', width: '2rem' },
          { header: 'Gratuity Calculation Remarks Name', field: 'HGratStop_Rem_Name', width: '3rem' },


        ]


      }

      this.OvertimeCalculationCodeData = {
        id: 'OvertimeCalculationCode',
        name: 'Overtime Calculation Code Details',
        TableData: [
          { HOverStop_Rem_Code: "OT2001", HOverStop_Rem_Name: "Extra Hours Approved" },
          { HOverStop_Rem_Code: "OT2002", HOverStop_Rem_Name: "Limit Exceeded - Overtime Denied" },
          { HOverStop_Rem_Code: "OT2003", HOverStop_Rem_Name: "Awaiting Manager Approval" },
          { HOverStop_Rem_Code: "OT2004", HOverStop_Rem_Name: "Correction Needed - Overtime Entry" },
          { HOverStop_Rem_Code: "OT2005", HOverStop_Rem_Name: "Hold Due to Budget Restrictions" }
        ],
        columns: [
          { header: 'Overtime Calculation Remarks Code', field: 'HOverStop_Rem_Code', width: '2rem' },
          { header: 'Overtime Calculation Remarks Name', field: 'HOverStop_Rem_Name', width: '3rem' },


        ]

      }
      this.SummaryDetailData = {
        id: 'SummaryDetail',
        name: 'Summary Details',
        TableData: [
          { DLSum_Emp_Code: 'EMP001', DLSum_Emp_Name: 'John Doe', DLSum_Absen_Days: 2 },
          { DLSum_Emp_Code: 'EMP002', DLSum_Emp_Name: 'Jane Smith', DLSum_Absen_Days: 5 },
          { DLSum_Emp_Code: 'EMP003', DLSum_Emp_Name: 'Alice Johnson', DLSum_Absen_Days: 3 },
          { DLSum_Emp_Code: 'EMP004', DLSum_Emp_Name: 'Robert Brown', DLSum_Absen_Days: 1 },
          { DLSum_Emp_Code: 'EMP005', DLSum_Emp_Name: 'Emily Davis', DLSum_Absen_Days: 4 },
        ],
        columns: [
          { header: 'Employee Code', field: 'DLSum_Emp_Code', width: '2rem' },
          { header: 'Employee Name', field: 'DLSum_Emp_Name', width: '3rem' },
          { header: 'Absence Days', field: 'DLSum_Absen_Days', width: '2rem' },

        ]
      }


      this.CurrencyCodeData = {
        id: 'CurrencyCode',
        name: 'Currency Code Details',
        TableData: this.tableData,
        columns: [
          { header: 'Currency SysID', field: 'HCurrFirst_SysID', width: '2rem' },
          { header: 'Currency Code', field: 'HCurrFirst_Code', width: '2rem' },
          { header: 'Currency Name', field: 'HCurrFirst_Name', width: '4rem' },
          { header: 'Convertion Rate', field: 'HCurrFirst_Rate', width: '4rem' },
        ]
      };

      this.LeavePolicyCodeData = {
        id: 'LeavePolicyCode',
        name: 'Leave policy Details',
        TableData: [
          { LPolicy_Code: 1, LPolicy_Name: 'Annual Leave' },
          { LPolicy_Code: 2, LPolicy_Name: 'Sick Leave' },
          { LPolicy_Code: 3, LPolicy_Name: 'Maternity Leave' },
          { LPolicy_Code: 4, LPolicy_Name: 'Paternity Leave' },
          { LPolicy_Code: 5, LPolicy_Name: 'Unpaid Leave' },
        ],
        columns: [
          { header: 'Leave  Policy Code', field: 'LPolicy_Code', width: '2rem' },
          { header: 'Leave  Policy Code', field: 'LPolicy_Name', width: '4rem' },

        ]
      };




      this.SingleCompanyData = {
        id: 'SingleCoCode',
        name: 'Company Details',
        TableData: [
          { "SingleCo_SysID": 1, "SingleCo_Code": "SC001", "SingleCo_Name": "Alpha Corporation" },
          { "SingleCo_SysID": 2, "SingleCo_Code": "SC002", "SingleCo_Name": "Beta Enterprises" },
          { "SingleCo_SysID": 3, "SingleCo_Code": "SC003", "SingleCo_Name": "Gamma Solutions" },
          { "SingleCo_SysID": 4, "SingleCo_Code": "SC004", "SingleCo_Name": "Delta Innovations" },
          { "SingleCo_SysID": 5, "SingleCo_Code": "SC005", "SingleCo_Name": "Epsilon Industries" }
        ],
        columns: [
          { header: 'Company Code', field: 'SingleCo_Code', width: '2rem' },
          { header: 'Company Name', field: 'SingleCo_Name', width: '6rem' }
        ]
      }


      this.TaxableTypeCodeData = {
        id: 'TaxableTypeCode',
        name: 'Tax Type Details',
        TableData: [
          { HTaxType_SysID: '201', HTaxtType_Code: 'TX001', HTaxType_Name: 'VAT' },
          { HTaxType_SysID: '202', HTaxtType_Code: 'TX002', HTaxType_Name: 'GST' },
          { HTaxType_SysID: '203', HTaxtType_Code: 'TX003', HTaxType_Name: 'Service Tax' },
          { HTaxType_SysID: '204', HTaxtType_Code: 'TX004', HTaxType_Name: 'Excise Duty' },
          { HTaxType_SysID: '205', HTaxtType_Code: 'TX005', HTaxType_Name: 'Sales Tax' }
        ],
        columns: [
          { header: 'Tax Type Code', field: 'HTaxtType_Code', width: '2rem' },
          { header: 'Tax Type Name', field: 'HTaxType_Name', width: '6rem' }
        ]
      }

      this.ShippedToData = {
        id: 'ShippedTo',
        name: 'Shipped To Details',
        TableData: this.tableData,
        columns: [
          { header: 'Shipped To SysID', field: 'HShippedto_SysID', width: '2rem' },
          { header: 'Shipped To Code', field: 'HShippedto_Code', width: '2rem' },
          { header: 'Shipped To Name', field: 'HShippedto_Name', width: '6rem' }
        ]
      };

      this.BilledToData = {
        id: 'BilledTo',
        name: 'Billed To Details',
        TableData: this.tableData,
        columns: [
          { header: 'Billed To Code', field: 'HBilledto_SysID', width: '2rem' },
          { header: 'Billed To Code', field: 'HBilledto_Code', width: '2rem' },
          { header: 'Billed To Name', field: 'HBilledto_Name', width: '6rem' }
        ]
      };

      this.NarrationCodeData = {
        id: 'NarrationCode',
        name: 'Narration Code Details',
        TableData: this.tableData,
        columns: [
          { header: 'Narration SysID', field: 'HNarraMast_SysID', width: '2rem' },
          { header: 'Narration Code', field: 'HNarraMast_Code', width: '2rem' },
          { header: 'Narration Name', field: 'HNarraMast_Name', width: '6rem' }
        ]
      };


      this.PaidToData = {
        id: 'PaidTo',
        name: 'Paid To Details',
        TableData: [
          { paidToCode: 'P001', paidToName: 'Supplier A' },
          { paidToCode: 'P002', paidToName: 'Vendor B' },
          { paidToCode: 'P003', paidToName: 'Employee C' },
          { paidToCode: 'P004', paidToName: 'Consultant D' },
          { paidToCode: 'P005', paidToName: 'Partner E' }
        ],
        columns: [
          { header: 'Paid To Code', field: 'paidToCode', width: '2rem' },
          { header: 'Paid To Name', field: 'paidToName', width: '6rem' }
        ]
      };




      this.VocherTypeData = {
        id: 'VocherType',
        name: 'Vocher Type Details',
        TableData: this.tableData,
        columns: [
          { header: 'Vocher Type Code', field: 'HVouType_SysID', width: '2rem' },
          { header: 'Vocher Type Code', field: 'HVouType_Code', width: '2rem' },
          { header: 'Vocher Type Name', field: 'HVouType_Name', width: '6rem' }
        ]
      };

      this.SalesAgreementData = {
        id: 'SalesAgreement',
        name: 'Sales Agreement Details',
        TableData: this.tableData, // Changed to TableData
        columns: [
          { header: 'Agreement SyID', field: 'HSalAgree_SysID', width: '2rem' },
          { header: 'Agreement Code', field: 'HSalAgree_Code', width: '2rem' },
          { header: 'Agreement Name', field: 'HSalAgree_Name', width: '6rem' },
        ]
      };

      this.PurchaseAgreementData = {
        id: 'PurchaseAgreement',
        name: 'Purchase Agreement Details',
        TableData: [
          { HPur_Agree_SysID: 1, HPur_Agree_Code: "PA001", HPur_Agree_Name: "Purchase Agreement Type A" },
          { HPur_Agree_SysID: 2, HPur_Agree_Code: "PA002", HPur_Agree_Name: "Purchase Agreement Type B" },
          { HPur_Agree_SysID: 3, HPur_Agree_Code: "PA003", HPur_Agree_Name: "Purchase Agreement Type C" }
        ], // Changed to TableData
        columns: [
          { header: 'Purchase Agreement SyID', field: 'HPur_Agree_SysID', width: '2rem' },
          { header: 'Purchase Agreement Code', field: 'HPur_Agree_Code', width: '2rem' },
          { header: 'Purchase Agreement Name', field: 'HPur_Agree_Name', width: '6rem' },
        ]
      };

      this.ProductModuleData = {
        id: 'ProductModuleCode',
        name: 'Module Details',
        TableData: this.tableData, // Changed to TableData
        columns: [
          { header: 'Module SyID', field: 'HProdModule_SysID', width: '2rem' },
          { header: 'Module Code', field: 'HProdModule_Code', width: '2rem' },
          { header: 'Module Name', field: 'HProdModule_Name', width: '6rem' },
        ]
      };



      this.CopyDocFromTemplateCodeData = {
        id: 'CopyDocFromTemplateCode',
        name: 'Copy Document From Template',
        TableData: this.tableData,
        columns: [
          { header: 'Template SysID', field: 'HCDTemp_SysID', width: '2rem' },
          { header: 'Template Code', field: 'HCDTemp_Code', width: '2rem' },
          { header: 'Template Name', field: 'HCDTemp_Name', width: '6rem' },

        ]
      };



      this.WarehouseData = {
        id: 'WarehouseCode',
        name: 'Warehouse Details',
        TableData: this.tableData,
        columns: [
          { header: 'Warehouse SysID', field: 'HWh_SysID', width: '2rem' },
          { header: 'Warehouse Code', field: 'HWh_Code', width: '2rem' },
          { header: 'Warehouse Name', field: 'HWh_Name', width: '6rem' }
        ]
      };



      this.MrvSingleBatchNumberData = {
        id: 'MrvSingleBatchNumber',
        name: 'MRV Single Batch Details',
        TableData: [
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
        ],
        columns: [
          { header: 'Batch Number', field: 'batchNumber', width: '4rem' },
          { header: 'Batch Manufacturing Date', field: 'batchManufacturingDate', width: '4rem' },
          { header: 'Batch Expiry Date', field: 'batchExpiryDate', width: '4rem' },
          { header: 'Available Qty', field: 'availableQty', width: '3rem' },
          { header: 'Now Reserving Qty', field: 'nowReservingQty', width: '3rem' },
        ]
      };

      this.MrvMultipleBatchNumberData = {
        id: 'MrvMultipleBatchNumber',
        name: 'MRV Multiple Batch Details',
        TableData: [
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
        ],
        columns: [
          { header: 'Batch Number', field: 'batchNumber', width: '4rem' },
          { header: 'Batch Manufacturing Date', field: 'batchManufacturingDate', width: '4rem' },
          { header: 'Batch Expiry Date', field: 'batchExpiryDate', width: '4rem' },
          { header: 'Available Qty', field: 'availableQty', width: '3rem' },
          { header: 'Now Reserving Qty', field: 'nowReservingQty', width: '3rem' },
        ]
      };



      this.PaymentTermsData = {
        id: 'PaymentTerms',
        name: 'Terms And Condition Details',
        TableData: this.tableData,
        columns: [
          { header: 'Payment Terms  SysID', field: 'HPayTerm_SysID', width: '4rem' },
          { header: 'Payment Terms  Code', field: 'HPayTerm_Code', width: '4rem' },
          { header: 'Payment Terms  Name', field: 'HPayTerm_Name', width: '6rem' },
          { header: 'Payment Terms  Days', field: 'HPayTerm_Days', width: '4rem' },

        ]
      };

      this.IncoTermsData = {
        id: 'IncoTerms',
        name: 'Incoterms Details',
        TableData: this.tableData,
        columns: [
          { header: 'Incoterm SysID', field: 'HInco_SysID', width: '2rem' },
          { header: 'Incoterm Code', field: 'HInco_Code', width: '2rem' },
          { header: 'Incoterm Name', field: 'HInco_Name', width: '6rem' },
          { header: 'Incoterm Days', field: 'HInco_Days', width: '2rem' },

        ]
      };



      this.TaxAddAccountCodeData = {
        id: 'TaxAddAccountCode',
        name: 'Account Codes Details',
        TableData: [
          {
            "id": "1",
            "accountCode": "AC001",
            "accountName": "Account A",

          },
          {
            "id": "2",
            "accountCode": "AC002",
            "accountName": "Account B",

          }
        ],
        columns: [
          { header: 'Account Code', field: 'accountCode', width: '2rem' },
          { header: 'Account Name', field: 'accountName', width: '6rem' }
        ]
      };

      this.TaxAccountCodeCodeData = {
        id: 'TaxAddAccountCode',
        name: 'Account Codes Details',
        TableData: [
          {
            "id": "1",
            "accountCode": "AC001",
            "accountName": "Account A",

          },
          {
            "id": "2",
            "accountCode": "AC002",
            "accountName": "Account B",

          }
        ],
        columns: [
          { header: 'Account Code', field: 'accountCode', width: '2rem' },
          { header: 'Account Name', field: 'accountName', width: '6rem' }
        ]
      };

      this.CostCenterData = {
        id: 'CostCenterCode',
        name: 'Cost Center Details',
        TableData: this.tableData,
        columns: [
          { header: 'Cost Center SysID', field: 'HCostCent_SysID', width: '2rem' },
          { header: 'Cost Center Code', field: 'HCostCent_Code', width: '2rem' },
          { header: 'Cost Center Name', field: 'HCostCent_Name', width: '4rem' },
        ]
      };

      this.ProfitCenterData = {
        id: 'ProfitCenterCode',
        name: 'Profit Center Details',
        TableData: this.tableData,
        columns: [
          { header: 'Profit Center SysID', field: 'HProfCent_SysID', width: '2rem' },
          { header: 'Profit Center Code', field: 'HProfCent_Code', width: '2rem' },
          { header: 'Profit Center Name', field: 'HProfCent_Name', width: '4rem' },

        ]
      };
      console.log(this.tableData);

      this.SalesmanData = {
        id: 'SalesmanCode',
        name: 'Salesman Details',
        TableData: this.tableData,
        columns: [
          { header: 'Salesman SysID', field: 'HSman_SysID', width: '2rem' },
          { header: 'Salesman Code', field: 'HSman_Code', width: '2rem' },
          { header: 'Salesman Name', field: 'HSman_Name', width: '4rem' },

        ]

      };

      this.DivisionData = {
        id: 'DivisionCode',
        name: 'Division Details',
        TableData: this.tableData,
        columns: [
          { header: 'Division SysID', field: 'HDivision_SysID', width: '2rem' },
          { header: 'Division Code', field: 'HDivision_Code', width: '2rem' },
          { header: 'Division Name', field: 'HDivision_Name', width: '4rem' },

        ]
      };

      this.DepartmentData = {
        id: 'DepartmentCode',
        name: 'Department Details',
        TableData: this.tableData,
        columns: [
          { header: 'Department SysID', field: 'HDept_SysID', width: '2rem' },
          { header: 'Department Code', field: 'HDept_Code', width: '2rem' },
          { header: 'Department Name', field: 'HDept_Name', width: '6rem' },

        ]
      };

      this.JobData = {
        id: 'JobCode',
        name: 'Job Details',
        TableData: this.tableData,
        columns: [
          { header: 'Job SysID', field: 'HJob_SysID', width: '2rem' },
          { header: 'Job Code', field: 'HJob_Code', width: '2rem' },
          { header: 'Job Name', field: 'HJob_Name', width: '6rem' },

        ]
      };

      this.OtherCentreData = {
        id: 'OtherCentreCode',
        name: 'Other Centre Details',
        TableData: this.tableData,
        columns: [
          { header: 'Other Centre SysID', field: 'HOthCentre_SysID', width: '2rem' },
          { header: 'Other Centre Code', field: 'HOthCentre_Code', width: '2rem' },
          { header: 'Other Centre Name', field: 'HOthCentre_Name', width: '6rem' },

        ]
      };

      this.SalesOrganizationData = {
        id: 'SalesOrganizationCode',
        name: 'Sales Organization Details',
        TableData: this.tableData,
        columns: [
          { header: 'Sales Organization SysID', field: 'HSalesOrg_SysID', width: '2rem' },
          { header: 'Sales Organization Code', field: 'HSalesOrg_Code', width: '2rem' },
          { header: 'Sales Organization Name', field: 'HSalesOrg_Name', width: '6rem' },

        ]
      };

      this.DistributionChannelData = {
        id: 'DistributionChannelCode',
        name: 'Distribution Channel Details',
        TableData: this.tableData,
        columns: [
          { header: 'Distribution Channel SysID', field: 'HDistChanel_SysID', width: '2rem' },
          { header: 'Distribution Channel Code', field: 'HDistChanel_Code', width: '2rem' },
          { header: 'Distribution Channel Name', field: 'HDistChanel_Name', width: '6rem' },

        ]
      };

      this.SalesOfficeData = {
        id: 'SalesOfficeCode',
        name: 'Sales Office Details',
        TableData: this.tableData,
        columns: [
          { header: 'Sales Office SysID', field: 'HSoffice_SysID', width: '2rem' },
          { header: 'Sales Office Code', field: 'HSoffice_Code', width: '2rem' },
          { header: 'Sales Office Name', field: 'HSoffice_Name', width: '6rem' },

        ]
      };

      this.SalesGroupData = {
        id: 'SalesGroupCode',
        name: 'Sales Group Details',
        TableData: this.tableData,
        columns: [
          { header: 'Sales Group SysID', field: 'HSalGroup_SysID', width: '2rem' },
          { header: 'Sales Group Code', field: 'HSalGroup_Code', width: '2rem' },
          { header: 'Sales Group Name', field: 'HSalGroup_Name', width: '6rem' },

        ]
      };

      this.PlaceOfSupplyData = {
        id: 'PlaceOfSupplyCode',
        name: 'Place of Supply Details',
        TableData: this.tableData,
        columns: [
          { header: 'Place of Supply SysID', field: 'HPlaceSupply_SysID', width: '2rem' },
          { header: 'Place of Supply Code', field: 'HPlaceSupply_Code', width: '2rem' },
          { header: 'Place of Supply Name', field: 'HPlaceSupply_Name', width: '6rem' },

        ]
      };

      this.JurisdictionData = {
        id: 'JurisdictionCode',
        name: 'Jurisdiction Details',
        TableData: this.tableData,
        columns: [
          { header: 'Jurisdiction SysID', field: 'HJurisd_SysID', width: '2rem' },
          { header: 'Jurisdiction Code', field: 'HJurisd_Code', width: '2rem' },
          { header: 'Jurisdiction Name', field: 'HJurisd_Name', width: '6rem' },

        ]
      };

      this.JournalAccountCodeData = {
        id: 'JournalAccountCode',
        name: 'Account Codes Details',
        TableData: this.AccountCodeTableData,
        columns: [
          { header: 'Account Code', field: 'accountCode', width: '2rem' },
          { header: 'Account Name', field: 'accountName', width: '6rem' }
        ]
      };

      this.PostingHCodeData = {
        id: 'PostingHCode',
        name: 'Posting Header Details',
        TableData: [
          {
            "postingHCode": "PH001",
            "postingHName": "Posting Name",
            "postingSQLFieldName": "Allh_Curr_Code",
            "postingFormula": "Allh_Net_Amount + Allge_Exp_Total",
            "postingSymbol": "+",
            "postingAmount": 15000,
            "id": "12d4"
          },
          {
            "postingHCode": "PH002",
            "postingHName": "Purchase Amount",
            "postingSQLFieldName": "Allh_Curr_Name",
            "postingFormula": "Allh_Net_Amount + Allge_Exp_Amount",
            "postingSymbol": "+",
            "postingAmount": 12000,
            "id": "027c"
          },
          {
            "postingHCode": "PH003",
            "postingHName": "Cost of Sales",
            "postingSQLFieldName": "Allh_Curr_Rate",
            "postingFormula": "Allh_Gross_Amt",
            "postingSymbol": "+",
            "postingAmount": 9000,
            "id": "afe5"
          },
          {
            "postingHCode": "PH004",
            "postingHName": "Supplier Amount",
            "postingSQLFieldName": "Allh_PurAgre_SysID",
            "postingFormula": "Allh_Head_Discount + Allh_Detail_Discount",
            "postingSymbol": "+",
            "postingAmount": 8000,
            "id": "4151"
          },
          {
            "postingHCode": "PH005",
            "postingHName": "Gross Amount",
            "postingSQLFieldName": "Allh_PurAgre_Code",
            "postingFormula": "Allh_Net_Amount",
            "postingSymbol": "+",
            "postingAmount": 11000,
            "id": "2938"
          },
          {
            "postingHCode": "PH006",
            "postingHName": "Discount Amount",
            "postingSQLFieldName": "Allh_PurAgre_Name",
            "postingFormula": "Allge_Exp_Amount",
            "postingSymbol": "-",
            "postingAmount": 2000,
            "id": "d307"
          },
          {
            "postingHCode": "PH007",
            "postingHName": "Net Amount",
            "postingSQLFieldName": "Allh_DocTemp_SysID",
            "postingFormula": "Allge_Exp_Total",
            "postingSymbol": "+",
            "postingAmount": 13000,
            "id": "314d"
          },
          {
            "postingHCode": "PH008",
            "postingHName": "Total Expenses Add to Supplier",
            "postingSQLFieldName": "Allh_PurAgre_SysID",
            "postingFormula": "Allge_Exp_Total",
            "postingSymbol": "+",
            "postingAmount": 5000,
            "id": "db74"
          },
          {
            "postingHCode": "PH009",
            "postingHName": "Total Expenses Amount",
            "postingSQLFieldName": "Allh_PurAgre_Code",
            "postingFormula": "Tax 1 Diff Amount + Alld_Tax1_RCDiff_Amt",
            "postingSymbol": "+",
            "postingAmount": 4500,
            "id": "1d59"
          },
          {
            "postingHCode": "PH010",
            "postingHName": "Purchase Control Account",
            "postingSQLFieldName": "Allh_Curr_Name",
            "postingFormula": "Tax 1 Diff Amount + Alld_Tax1_RCDiff_Amt",
            "postingSymbol": "-",
            "postingAmount": 3000,
            "id": "d520"
          },
          {
            "postingHCode": "PH011",
            "postingHName": "VAT Input Amount",
            "postingSQLFieldName": "Allh_Curr_Code",
            "postingFormula": "Allh_Gross_Amt",
            "postingSymbol": "+",
            "postingAmount": 2500,
            "id": "0aab"
          },
          {
            "postingHCode": "PH012",
            "postingHName": "VAT Output Amount",
            "postingSQLFieldName": "Allh_Curr_Rate",
            "postingFormula": "Allh_Net_Amount",
            "postingSymbol": "-",
            "postingAmount": 1500,
            "id": "9a7c"
          },
          {
            "postingHCode": "PH013",
            "postingHName": "VAT Advance Amount",
            "postingSQLFieldName": "Allh_PurAgre_Name",
            "postingFormula": "Allge_Exp_Amount",
            "postingSymbol": "+",
            "postingAmount": 3500,
            "id": "184f"
          }
        ],
        columns: [
          { header: 'Posting Header Code', field: 'postingHCode', width: '2rem' },
          { header: 'Posting Header Name', field: 'postingHName', width: '6rem' },
          { header: 'SQL Field Name', field: 'postingSQLFieldName', width: '6rem' },
          { header: 'Posting Formula', field: 'postingFormula', width: '6rem' },
          { header: 'Posting Symbol', field: 'postingSymbol', width: '2rem' },
          { header: 'Posting Amount', field: 'postingAmount', width: '4rem' },

        ]
      };

      this.PostingDCodeData = {
        id: 'PostingDCode',
        name: 'Posting Details',
        TableData: [
          {
            "postingDCode": "PD001",
            "postingDName": "Gross",
            "postingSQLFieldName": "Alld_Gross",
            "postingFormula": "Alld_QtyxAlld_Rate",
            "postingSymbol": "+",
            "postingAmount": 5000,
            "id": "cedb"
          },
          {
            "postingDCode": "PD002",
            "postingDName": "Discount",
            "postingSQLFieldName": "Alld_Discount",
            "postingFormula": "Alld_Discount",
            "postingSymbol": "-",
            "postingAmount": 500,
            "id": "320f"
          },
          {
            "postingDCode": "PD003",
            "postingDName": "Net Amount",
            "postingSQLFieldName": "Alld_Net_Amount",
            "postingFormula": "(Alld_QtyxAlld_Rate) - Alld_Discount",
            "postingSymbol": "+",
            "postingAmount": 4500,
            "id": "2002"
          },
          {
            "postingDCode": "PD004",
            "postingDName": "Landed Cost",
            "postingSQLFieldName": "Alld_Landed_Cost",
            "postingFormula": "Alld_Landed_Cost",
            "postingSymbol": "+",
            "postingAmount": 2000,
            "id": "cd9e"
          },
          {
            "postingDCode": "PD005",
            "postingDName": "Tax Total",
            "postingSQLFieldName": "Tax Total",
            "postingFormula": "Tax Total",
            "postingSymbol": "+",
            "postingAmount": 300,
            "id": "a092"
          },
          {
            "postingDCode": "PD006",
            "postingDName": "Item Level Landed Cost",
            "postingSQLFieldName": "",
            "postingFormula": "Allge_Exp_Total / Allh_Net_Amount x Alld_Net_Amount",
            "postingSymbol": "+",
            "postingAmount": 1000,
            "id": "3a8f"
          }
        ],
        columns: [
          { header: 'Posting Code', field: 'postingDCode', width: '2rem' },
          { header: 'Posting Name', field: 'postingDName', width: '6rem' },
          { header: 'SQL Field Name', field: 'postingSQLFieldName', width: '6rem' },
          { header: 'Posting Formula', field: 'postingFormula', width: '6rem' },
          { header: 'Posting Symbol', field: 'postingSymbol', width: '2rem' },
          { header: 'Posting Amount', field: 'postingAmount', width: '4rem' },

        ]
      };

      this.debitAccountFirstCodeData = {
        id: 'DebitAccountFirstCode',
        name: 'Debit Account First Code',
        TableData: [
          { debitAccountFirstCode: 'D001', debitAccountFirstName: 'Debit Account 1' },
          { debitAccountFirstCode: 'D002', debitAccountFirstName: 'Debit Account 2' },
          { debitAccountFirstCode: 'D003', debitAccountFirstName: 'Debit Account 3' },
          { debitAccountFirstCode: 'D004', debitAccountFirstName: 'Debit Account 4' }
        ],
        columns: [
          { header: 'Debit Account First Code', field: 'debitAccountFirstCode', width: '2rem' },
          { header: 'Debit Account First Name', field: 'debitAccountFirstName', width: '6rem' }
        ]
      };

      this.creditAccountSecondCodeData = {
        id: 'CreditAccountSecondCode',
        name: 'Credit Account Second Code',
        TableData: [
          { creditAccountSecondCode: 'C001', creditAccountSecondName: 'Credit Account 1' },
          { creditAccountSecondCode: 'C002', creditAccountSecondName: 'Credit Account 2' },
          { creditAccountSecondCode: 'C003', creditAccountSecondName: 'Credit Account 3' },
          { creditAccountSecondCode: 'C004', creditAccountSecondName: 'Credit Account 4' }
        ],
        columns: [
          { header: 'Credit Account Second Code', field: 'creditAccountSecondCode', width: '2rem' },
          { header: 'Credit Account Second Name', field: 'creditAccountSecondName', width: '6rem' }
        ]
      };

      this.AlertCodeData = {
        id: 'AlertCode',
        name: 'Alert Code Details',
        TableData: this.tableData,
        columns: [
          { header: 'Alert SysID', field: 'HAlert_SysID', width: '2rem' },
          { header: 'Alert Code', field: 'HAlert_Code', width: '2rem' },
          { header: 'Alert Name', field: 'HAlert_Name', width: '6rem' }
        ]
      };


      this.FieldMasterCodeData = {
        id: 'FieldMasterCode',
        name: 'Master Code Details',
        TableData: [
          {
            "fieldMasterSettingsSysID": "FS001",
            "fieldMasterSettingsCode": "FIELD001",
            "fieldMasterSettingsName": "Enable Notifications",
            "id": "4625"
          },
          {
            "fieldMasterSettingsSysID": "FS002",
            "fieldMasterSettingsCode": "FIELD002",
            "fieldMasterSettingsName": "Display User Role",
            "id": "104f"
          },
          {
            "fieldMasterSettingsSysID": "FS003",
            "fieldMasterSettingsCode": "FIELD003",
            "fieldMasterSettingsName": "Set Default Language",
            "id": "0215"
          },
          {
            "fieldMasterSettingsSysID": "FS004",
            "fieldMasterSettingsCode": "FIELD004",
            "fieldMasterSettingsName": "Enable Dark Mode",
            "id": "6c79"
          },
          {
            "fieldMasterSettingsSysID": "FS005",
            "fieldMasterSettingsCode": "FIELD005",
            "fieldMasterSettingsName": "Allow Guest Access",
            "id": "4de7"
          }
        ],
        columns: [
          { header: 'Master Code', field: 'fieldMasterSettingsCode', width: '2rem' },
          { header: 'Master Name', field: 'fieldMasterSettingsName', width: '6rem' }
        ]
      };

      this.TabFormCodeData = {
        id: 'TabFormCode',
        name: 'Tab Form Code Details',
        TableData: [
          {
            "sysId": "TF001",
            "tabFormCode": "FORM001",
            "tabFormName": "User Management",
            "id": "ad8f"
          },
          {
            "sysId": "TF002",
            "tabFormCode": "FORM002",
            "tabFormName": "Notification Settings",
            "id": "fe0c"
          },
          {
            "sysId": "TF003",
            "tabFormCode": "FORM003",
            "tabFormName": "Access Control",
            "id": "7684"
          },
          {
            "sysId": "TF004",
            "tabFormCode": "FORM004",
            "tabFormName": "Audit Logs",
            "id": "daba"
          }
        ],
        columns: [
          { header: 'Tab Form Code', field: 'tabFormCode', width: '2rem' },
          { header: 'Tab Form Name', field: 'tabFormName', width: '6rem' }
        ]
      };

      this.SaveMsgAlertCodeData = {
        id: 'SaveMsgAlertCode',
        name: 'Alert Code Details',
        TableData: [
          {
            "alertsMasterSysID": "A001",
            "alertsMasterCode": "ALERT001",
            "alertsName": "Low Stock Alert",
            "alertsEmail": "stockalert@example.com",
            "id": "f028"
          },
          {
            "alertsMasterSysID": "A002",
            "alertsMasterCode": "ALERT002",
            "alertsName": "System Downtime Alert",
            "alertsEmail": "systemalert@example.com",
            "id": "13e2"
          },
          {
            "alertsMasterSysID": "A003",
            "alertsMasterCode": "ALERT003",
            "alertsName": "New User Registration Alert",
            "alertsEmail": "useralert@example.com",
            "id": "967e"
          },
          {
            "alertsMasterSysID": "A004",
            "alertsMasterCode": "ALERT004",
            "alertsName": "Payment Confirmation Alert",
            "alertsEmail": "paymentalert@example.com",
            "id": "ed8f"
          },
          {
            "alertsMasterSysID": "A005",
            "alertsMasterCode": "ALERT005",
            "alertsName": "Overdue Payment Alert",
            "alertsEmail": "overduealert@example.com",
            "id": "9140"
          }
        ],
        columns: [
          { header: 'Alert Code', field: 'alertsMasterCode', width: '2rem' },
          { header: 'Alert Name', field: 'alertsName', width: '6rem' }
        ]
      };

      this.AuthMsgAlertCodeData = {
        id: 'AuthMsgAlertCode',
        name: 'Alert Code Details',
        TableData: [
          {
            "alertsMasterSysID": "A001",
            "alertsMasterCode": "ALERT001",
            "alertsName": "Low Stock Alert",
            "alertsEmail": "stockalert@example.com",
            "id": "f028"
          },
          {
            "alertsMasterSysID": "A002",
            "alertsMasterCode": "ALERT002",
            "alertsName": "System Downtime Alert",
            "alertsEmail": "systemalert@example.com",
            "id": "13e2"
          },
          {
            "alertsMasterSysID": "A003",
            "alertsMasterCode": "ALERT003",
            "alertsName": "New User Registration Alert",
            "alertsEmail": "useralert@example.com",
            "id": "967e"
          },
          {
            "alertsMasterSysID": "A004",
            "alertsMasterCode": "ALERT004",
            "alertsName": "Payment Confirmation Alert",
            "alertsEmail": "paymentalert@example.com",
            "id": "ed8f"
          },
          {
            "alertsMasterSysID": "A005",
            "alertsMasterCode": "ALERT005",
            "alertsName": "Overdue Payment Alert",
            "alertsEmail": "overduealert@example.com",
            "id": "9140"
          }
        ],
        columns: [
          { header: 'Alert Code', field: 'alertsMasterCode', width: '2rem' },
          { header: 'Alert Name', field: 'alertsName', width: '6rem' }
        ]
      };

      this.RejectMsgAlertCodeData = {
        id: 'RejectMsgAlertCode',
        name: 'Alert Code Details',
        TableData: [
          {
            "alertsMasterSysID": "A001",
            "alertsMasterCode": "ALERT001",
            "alertsName": "Low Stock Alert",
            "alertsEmail": "stockalert@example.com",
            "id": "f028"
          },
          {
            "alertsMasterSysID": "A002",
            "alertsMasterCode": "ALERT002",
            "alertsName": "System Downtime Alert",
            "alertsEmail": "systemalert@example.com",
            "id": "13e2"
          },
          {
            "alertsMasterSysID": "A003",
            "alertsMasterCode": "ALERT003",
            "alertsName": "New User Registration Alert",
            "alertsEmail": "useralert@example.com",
            "id": "967e"
          },
          {
            "alertsMasterSysID": "A004",
            "alertsMasterCode": "ALERT004",
            "alertsName": "Payment Confirmation Alert",
            "alertsEmail": "paymentalert@example.com",
            "id": "ed8f"
          },
          {
            "alertsMasterSysID": "A005",
            "alertsMasterCode": "ALERT005",
            "alertsName": "Overdue Payment Alert",
            "alertsEmail": "overduealert@example.com",
            "id": "9140"
          }
        ],
        columns: [
          { header: 'Alert Code', field: 'alertsMasterCode', width: '2rem' },
          { header: 'Alert Name', field: 'alertsName', width: '6rem' }
        ]
      };

      this.AuthMsgEmpCodeData = {
        id: 'AuthMsgEmpCode',
        name: 'Employee Details',
        TableData: [
          { employeeCode: 'EMP001', employeeName: 'Alice Johnson', employeeEmail: 'test@i.com' },
          { employeeCode: 'EMP002', employeeName: 'Bob Smith', employeeEmail: 'test@i.com' },
          { employeeCode: 'EMP003', employeeName: 'Charlie Brown', employeeEmail: 'test@i.com' },
        ],
        columns: [
          { header: 'Employee Code', field: 'employeeCode', width: '2rem' },
          { header: 'Employee Name', field: 'employeeName', width: '6rem' },
          { header: 'Employee Email', field: 'employeeEmail', width: '6rem' },
        ]
      };

      this.RejectMsgEmpCodeData = {
        id: 'RejectMsgEmpCode',
        name: 'Employee Details',
        TableData: [
          { employeeCode: 'EMP001', employeeName: 'Alice Johnson', employeeEmail: 'test@i.com' },
          { employeeCode: 'EMP002', employeeName: 'Bob Smith', employeeEmail: 'test@i.com' },
          { employeeCode: 'EMP003', employeeName: 'Charlie Brown', employeeEmail: 'test@i.com' },
        ],
        columns: [
          { header: 'Employee Code', field: 'employeeCode', width: '2rem' },
          { header: 'Employee Name', field: 'employeeName', width: '6rem' },
          { header: 'Employee Email', field: 'employeeEmail', width: '6rem' },
        ]
      };


      this.SalaryAdditionCodeData = {
        id: 'SalaryAdditionCode',
        name: 'Salary Addition Details',
        TableData: [
          { DPayroll_Add_Code: "P7001", DPayroll_Add_Name: "Housing Allowance" },
          { DPayroll_Add_Code: "P7002", DPayroll_Add_Name: "Transportation Allowance" },
          { DPayroll_Add_Code: "P7003", DPayroll_Add_Name: "Meal Allowance" },
          { DPayroll_Add_Code: "P7004", DPayroll_Add_Name: "Medical Reimbursement" },
          { DPayroll_Add_Code: "P7005", DPayroll_Add_Name: "Performance Bonus" }
        ],
        columns: [
          { header: 'Salary Addition Code', field: 'DPayroll_Add_Code', width: '2rem' },
          { header: 'Salary Addition Name', field: 'DPayroll_Add_Name', width: '6rem' },

        ]
      }

      this.DocumentCodeData = {
        id: 'DocumentCode',
        name: 'Document Details',
        TableData: this.tableData,
        columns: [
          { header: 'Document Code', field: 'HDocMaster_SysID', width: '2rem' },
          { header: 'Document Code', field: 'HDocMaster_Code', width: '2rem' },
          { header: 'Document Name', field: 'HDocMaster_Name', width: '6rem' },
        ]
      };

      this.DocDocumnetCodeData = {
        id: 'DocDocumnetCode',
        name: 'Document Details',
        TableData: [
          { documentCode: 'DOC001', documentName: 'Passport', documentType: 'Identity Proof' },
          { documentCode: 'DOC002', documentName: 'Driver License', documentType: 'Identity Proof' },
          { documentCode: 'DOC003', documentName: 'Electricity Bill', documentType: 'Address Proof' },
        ],
        columns: [
          { header: 'Document Code', field: 'documentCode', width: '2rem' },
          { header: 'Document Name', field: 'documentName', width: '6rem' },
          { header: 'Document Type', field: 'documentType', width: '6rem' },
        ]
      };

      this.InterCompanyTransTypeData = {
        id: 'InterCompanyTransType',
        name: 'Inter-Company Transaction Details',
        TableData: [
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
        ],
        columns: [
          { header: 'SysID', field: 'sysId', width: '2rem' },
          { header: 'Inter Company Trans Type Code', field: 'interCompanyTransTypeCode', width: '4rem' },
          { header: 'Inter Company Message Trans Type Name', field: 'interCompanyMessageTransTypeName', width: '6rem' }
        ]
      };



      this.InterCoNarrationCodeData = {
        id: 'InterCoNarrationCode',
        name: 'Narration Code Details',
        TableData: [
          { narrationMasterSysID: 1, narrationMasterCode: "NARR001", narrationMasterName: "Purchase Order Created" },
          { narrationMasterSysID: 2, narrationMasterCode: "NARR002", narrationMasterName: "Invoice Payment Received" },
          { narrationMasterSysID: 3, narrationMasterCode: "NARR003", narrationMasterName: "Shipment Dispatch" }
        ],
        columns: [
          { header: 'Narration Code', field: 'narrationMasterCode', width: '2rem' },
          { header: 'Narration Name', field: 'narrationMasterName', width: '6rem' }
        ]
      };





      // vessel booking lookups

      this.VesFactoryCodeData = {
        id: 'VesFactoryCode',
        name: 'Factory Code Details',
        TableData: [
          { factoryCode: 'FAC001', factoryName: 'Factory A' },
          { factoryCode: 'FAC002', factoryName: 'Factory B' },
          { factoryCode: 'FAC003', factoryName: 'Factory C' },
          { factoryCode: 'FAC004', factoryName: 'Factory D' }
        ],
        columns: [
          { header: 'Factory Code', field: 'factoryCode', width: '2rem' },
          { header: 'Factory Name', field: 'factoryName', width: '6rem' }
        ]
      };

      this.VesProdPlantCodeData = {
        id: 'VesProdPlantCode',
        name: 'Production Plant Code Details',
        TableData: [
          { prodPlantCode: 'PLANT001', prodPlantName: 'Plant X' },
          { prodPlantCode: 'PLANT002', prodPlantName: 'Plant Y' },
          { prodPlantCode: 'PLANT003', prodPlantName: 'Plant Z' },
          { prodPlantCode: 'PLANT004', prodPlantName: 'Plant W' }
        ],
        columns: [
          { header: 'Production Plant Code', field: 'prodPlantCode', width: '2rem' },
          { header: 'Production Plant Name', field: 'prodPlantName', width: '6rem' }
        ]
      };


      this.VesPickupPointCodeData = {
        id: 'VesPickupPointCode',
        name: 'Pickup Point Code Details',
        TableData: [
          { sysID: '1', pickupPointCode: 'PICK001', pickupPointName: 'Point A' },
          { sysID: '2', pickupPointCode: 'PICK002', pickupPointName: 'Point B' },
          { sysID: '3', pickupPointCode: 'PICK003', pickupPointName: 'Point C' },
          { sysID: '4', pickupPointCode: 'PICK004', pickupPointName: 'Point D' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Pickup Point Code', field: 'pickupPointCode', width: '2rem' },
          { header: 'Pickup Point Name', field: 'pickupPointName', width: '6rem' }
        ]
      };

      this.VesSwitchBLPortCodeData = {
        id: 'VesSwitchBLPortCode',
        name: 'Switch BL Port Code Details',
        TableData: [
          { sysID: '1', switchPortCode: 'PORT001', switchPortName: 'Port Alpha' },
          { sysID: '2', switchPortCode: 'PORT002', switchPortName: 'Port Beta' },
          { sysID: '3', switchPortCode: 'PORT003', switchPortName: 'Port Gamma' },
          { sysID: '4', switchPortCode: 'PORT004', switchPortName: 'Port Delta' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Switch BL Port Code', field: 'switchPortCode', width: '2rem' },
          { header: 'Switch BL Port Name', field: 'switchPortName', width: '6rem' }
        ]
      };

      this.VesSwitchBLAgentData = {
        id: 'VesSwitchBLAgent',
        name: 'Switch BL Agent Details',
        TableData: [
          { sysID: '1', switchAgentCode: 'AGENT001', switchAgentName: 'Agent One' },
          { sysID: '2', switchAgentCode: 'AGENT002', switchAgentName: 'Agent Two' },
          { sysID: '3', switchAgentCode: 'AGENT003', switchAgentName: 'Agent Three' },
          { sysID: '4', switchAgentCode: 'AGENT004', switchAgentName: 'Agent Four' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Switch BL Agent Code', field: 'switchAgentCode', width: '2rem' },
          { header: 'Switch BL Agent Name', field: 'switchAgentName', width: '6rem' }
        ]
      };




      this.selectionSalesGroupCodeData = {
        id: 'selectionSalesGroupCode',
        name: 'selection Sales Group Details',
        TableData: [
          { code: 'SG001', name: 'North Region Sales' },
          { code: 'SG002', name: 'South Region Sales' },
          { code: 'SG003', name: 'East Region Sales' },
          { code: 'SG004', name: 'West Region Sales' },
          { code: 'SG005', name: 'Online Sales Group' },
        ],
        columns: [
          { header: 'Selection Code', field: 'code', width: '2rem' },
          { header: 'Selection Name', field: 'name', width: '2rem' },

        ]
      };
      this.VesBookAgentCodeData = {
        id: 'VesBookAgentCode',
        name: 'Booking Agent Code Details',
        TableData: [
          { sysID: '1', bookAgentCode: 'BAG001', bookAgentName: 'Agent A' },
          { sysID: '2', bookAgentCode: 'BAG002', bookAgentName: 'Agent B' },
          { sysID: '3', bookAgentCode: 'BAG003', bookAgentName: 'Agent C' },
          { sysID: '4', bookAgentCode: 'BAG004', bookAgentName: 'Agent D' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Booking Agent Code', field: 'bookAgentCode', width: '2rem' },
          { header: 'Booking Agent Name', field: 'bookAgentName', width: '6rem' }
        ]
      };

      this.VesShipLineCodeData = {
        id: 'VesShipLineCode',
        name: 'Shipping Line Code Details',
        TableData: [
          { sysID: '1', shipLineCode: 'LINE001', shipLineName: 'Line Alpha' },
          { sysID: '2', shipLineCode: 'LINE002', shipLineName: 'Line Beta' },
          { sysID: '3', shipLineCode: 'LINE003', shipLineName: 'Line Gamma' },
          { sysID: '4', shipLineCode: 'LINE004', shipLineName: 'Line Delta' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Shipping Line Code', field: 'shipLineCode', width: '2rem' },
          { header: 'Shipping Line Name', field: 'shipLineName', width: '6rem' }
        ]
      };

      this.VesLoadingPortCodeData = {
        id: 'VesLoadingPortCode',
        name: 'Loading Port Code Details',
        TableData: [
          { sysID: '1', loadingPortCode: 'LOAD001', loadingPortName: 'Port 1' },
          { sysID: '2', loadingPortCode: 'LOAD002', loadingPortName: 'Port 2' },
          { sysID: '3', loadingPortCode: 'LOAD003', loadingPortName: 'Port 3' },
          { sysID: '4', loadingPortCode: 'LOAD004', loadingPortName: 'Port 4' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Loading Port Code', field: 'loadingPortCode', width: '2rem' },
          { header: 'Loading Port Name', field: 'loadingPortName', width: '6rem' }
        ]
      };

      this.VesTransitPortCodeData = {
        id: 'VesTransitPortCode',
        name: 'Transit Port Code Details',
        TableData: [
          { sysID: '1', transitPortCode: 'TRANS001', transitPortName: 'Transit A' },
          { sysID: '2', transitPortCode: 'TRANS002', transitPortName: 'Transit B' },
          { sysID: '3', transitPortCode: 'TRANS003', transitPortName: 'Transit C' },
          { sysID: '4', transitPortCode: 'TRANS004', transitPortName: 'Transit D' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Transit Port Code', field: 'transitPortCode', width: '2rem' },
          { header: 'Transit Port Name', field: 'transitPortName', width: '6rem' }
        ]
      };

      this.VesPortDisCodeData = {
        id: 'VesPortDisCode',
        name: 'Port Discharge Code Details',
        TableData: [
          { sysID: '1', portDisCode: 'DIS001', portDisName: 'Discharge A' },
          { sysID: '2', portDisCode: 'DIS002', portDisName: 'Discharge B' },
          { sysID: '3', portDisCode: 'DIS003', portDisName: 'Discharge C' },
          { sysID: '4', portDisCode: 'DIS004', portDisName: 'Discharge D' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Port Discharge Code', field: 'portDisCode', width: '2rem' },
          { header: 'Port Discharge Name', field: 'portDisName', width: '6rem' }
        ]
      };

      this.VesClearingAgentData = {
        id: 'VesClearingAgent',
        name: 'Clearing Agent Details',
        TableData: [
          { sysID: 'SYS001', clearingAgentCode: 'CAG001', clearingAgentName: 'Clearing Agent A' },
          { sysID: 'SYS002', clearingAgentCode: 'CAG002', clearingAgentName: 'Clearing Agent B' },
          { sysID: 'SYS003', clearingAgentCode: 'CAG003', clearingAgentName: 'Clearing Agent C' },
          { sysID: 'SYS004', clearingAgentCode: 'CAG004', clearingAgentName: 'Clearing Agent D' }
        ],
        columns: [
          { header: 'SysID', field: 'sysID', width: '2rem' },
          { header: 'Clearing Agent Code', field: 'clearingAgentCode', width: '2rem' },
          { header: 'Clearing Agent Name', field: 'clearingAgentName', width: '6rem' }
        ]
      };

      this.LeaveTypeCodeData = {
        id: 'LeaveTypeCode',
        name: 'Leave Type Code Details',
        TableData: [
          { dlPolicyCode: "POL001", dlPolicyName: "Standard Policy" },
          { dlPolicyCode: "POL002", dlPolicyName: "Premium Policy" },
          { dlPolicyCode: "POL003", dlPolicyName: "Basic Policy" }
        ],
        columns: [

          { header: 'Leave Policy Type Code', field: 'dlPolicyCode', width: '2rem' },
          { header: 'Leave Policy Type Name', field: 'dlPolicyName', width: '6rem' }
        ]
      }
      this.LeaveTypeCodeDataCode = {
        id: 'LeaveTypeCodeData',
        name: 'Leave Type Code Details',
        TableData: [
          { dlPolicyCode: "POL001", dlPolicyName: "Standard Policy" },
          { dlPolicyCode: "POL002", dlPolicyName: "Premium Policy" },
          { dlPolicyCode: "POL003", dlPolicyName: "Basic Policy" }
        ],
        columns: [

          { header: 'Leave Policy Type Code', field: 'dlPolicyCode', width: '2rem' },
          { header: 'Leave Policy Type Name', field: 'dlPolicyName', width: '6rem' }
        ]
      }
      this.GratuityTypeCodeData = {
        id: 'LeaveTypeCode',
        name: 'Gratuity Type Code Details',
        TableData: [
          { dlPolicyCode: "GL001", dlPolicyName: "Standard Policy" },
          { dlPolicyCode: "GL002", dlPolicyName: "Premium Policy" },
          { dlPolicyCode: "GL003", dlPolicyName: "Basic Policy" }
        ],
        columns: [

          { header: 'Gratuity Policy Type Code', field: 'dlPolicyCode', width: '2rem' },
          { header: 'Gratuity Policy Type Name', field: 'dlPolicyName', width: '6rem' }
        ]
      }

      this.leaveappTypeCodeData = {
        id: 'LeaveTypeCodedata',
        name: 'Leave Type Code Details',
        TableData: [
          { dlPolicyCode: "GL001", dlPolicyName: "Standard Policy" },
          { dlPolicyCode: "GL002", dlPolicyName: "Premium Policy" },
          { dlPolicyCode: "GL003", dlPolicyName: "Basic Policy" }
        ],
        columns: [

          { header: 'Leave Type Code', field: 'dlPolicyCode', width: '2rem' },
          { header: 'Leave Type Name', field: 'dlPolicyName', width: '6rem' }
        ]
      }
      this.VesECSAccCodeData = {
        id: 'VesECSAccCode',
        name: ' Account Details',
        TableData: [
          {
            "id": "1",
            "accountCode": "AC001",
            "accountName": "Account A",
            "accountAddressOne": "123 Birch St",
            "accountAddressTwo": "Suite 101",
            "accountAddressThree": "Central Park",
            "accountAddressFour": "Near Post Office",
            "trnNumber": "TRN005",
            "areaCode": "AC005",
            "areaName": "Area E",
            "cityCode": "CT005",
            "cityName": "City E",
            "countryCode": "US",
            "countryName": "United States",
            "phoneNumber": "+1-800-9876543",
            "faxNumber": "+1-800-1234567",
            "emailAddress": "accountA@example.com",
            "accountTypeCode": "AT001",
            "accountTypeName": "Business",
            "taxableCode": "TC001",
            "taxableName": "Taxable",
            "billwiseAnalysis": "Analysis A",
            "creditLimit": 100000,
            "creditLimitDays": 30,
            "insuranceCreditLimit": 50000,
            "insuranceCreditLimitDays": 60,
            "blockCreditLimit": 20000,
            "blockCreditLimitDays": 10,
            "bankAccountTypeCode": "BAT001",
            "bankAccountTypeName": "Current"
          },
          {
            "id": "2",
            "accountCode": "AC002",
            "accountName": "Account B",
            "accountAddressOne": "456 Cedar St",
            "accountAddressTwo": "Suite 202",
            "accountAddressThree": "Near River",
            "accountAddressFour": "Opposite Mall",
            "trnNumber": "TRN006",
            "areaCode": "AC006",
            "areaName": "Area F",
            "cityCode": "CT006",
            "cityName": "City F",
            "countryCode": "IN",
            "countryName": "India",
            "phoneNumber": "+91-9876543211",
            "faxNumber": "+91-9876501235",
            "emailAddress": "accountB@example.com",
            "accountTypeCode": "AT002",
            "accountTypeName": "Individual",
            "taxableCode": "TC002",
            "taxableName": "Exempt",
            "billwiseAnalysis": "Analysis B",
            "creditLimit": 50000,
            "creditLimitDays": 15,
            "insuranceCreditLimit": 30000,
            "insuranceCreditLimitDays": 45,
            "blockCreditLimit": 10000,
            "blockCreditLimitDays": 5,
            "bankAccountTypeCode": "BAT002",
            "bankAccountTypeName": "Savings"
          }
        ],
        columns: [
          { header: 'Account Code', field: 'accountCode', width: '2rem' },
          { header: 'Account Name', field: 'accountName', width: '6rem' }
        ]
      };

      this.VesECSCurrCodeData = {
        id: 'VesECSCurrCode',
        name: 'Currency Code Details',
        TableData: [
          { HCurr_Code: 1, HCurr_Name: 'TX001', HCurr_Rate: '1', },
          { HCurr_Code: 2, HCurr_Name: 'TX002', HCurr_Rate: '2', },
          { HCurr_Code: 3, HCurr_Name: 'TX003', HCurr_Rate: '3', },
        ],
        columns: [
          { header: 'Currency Code', field: 'HCurr_Code', width: '2rem' },
          { header: 'Currency Name', field: 'HCurr_Name', width: '4rem' },
          { header: 'Convertion Rate', field: 'HCurr_Rate', width: '4rem' },
        ]
      };

      this.VesECSRemCodeData = {
        id: 'VesECSRemCode',
        name: 'Remarks Code Details',
        TableData: [
          {
            "remarksCodeSysID": "R001",
            "remarksCode": "REMARK001",
            "remarksName": "General Remark",
            "id": "a1b2"
          },
          {
            "remarksCodeSysID": "R002",
            "remarksCode": "REMARK002",
            "remarksName": "Payment Pending",
            "id": "c3d4"
          },
          {
            "remarksCodeSysID": "R003",
            "remarksCode": "REMARK003",
            "remarksName": "Inspection Required",
            "id": "e5f6"
          },
          {
            "remarksCodeSysID": "R004",
            "remarksCode": "REMARK004",
            "remarksName": "Urgent Approval",
            "id": "g7h8"
          },
          {
            "remarksCodeSysID": "R005",
            "remarksCode": "REMARK005",
            "remarksName": "Follow-Up Required",
            "id": "i9j0"
          }
        ],
        columns: [
          { header: 'Remarks Code SysID', field: 'remarksCodeSysID', width: '4rem' },
          { header: 'Remarks Code', field: 'remarksCode', width: '4rem' },
          { header: 'Remarks Name', field: 'remarksName', width: '6rem' }
        ]
      };

      this.CityCodeData = {
        id: 'CityCode',
        name: 'City Details',
        TableData: this.tableData,
        columns: [
          { header: 'City SysID', field: 'HCity_SysID', width: '2rem' },
          { header: 'City Code', field: 'HCity_Code', width: '2rem' },
          { header: 'City Name', field: 'HCity_Name', width: '6rem' }
        ]
      };

      this.CountryCodeData = {
        id: 'CountryCode',
        name: 'Country Details',
        TableData: this.tableData,
        columns: [
          { header: 'Country SysID', field: 'HCountry_SysID', width: '2rem' },
          { header: 'Country Code', field: 'HCountry_Code', width: '2rem' },
          { header: 'Country Name', field: 'HCountry_Name', width: '6rem' }
        ]
      };

      this.AreaCodeData = {
        id: 'AreaCode',
        name: 'Area Code Details',
        TableData: this.tableData,
        columns: [
          { header: 'Area SysID', field: 'HAreaCode_SysID', width: '2rem' },
          { header: 'Area Code', field: 'HAreaCode_Code', width: '2rem' },
          { header: 'Area Name', field: 'HAreaCode_Name', width: '6rem' }
        ]
      };


      this.AccTypeCodeData = {
        id: 'AccTypeCode',
        name: ' Account Details',
        TableData: this.tableData,
        columns: [
          { header: 'Account Type SysID', field: 'HAccType_SysID', width: '2rem' },
          { header: 'Account Type Code', field: 'HAccType_Code', width: '2rem' },
          { header: 'Account Type Name', field: 'HAccType_Name', width: '6rem' }
        ]
      };

      this.AccTaxableCodeData = {
        id: 'AccTaxableCode',
        name: ' Account Details',
        TableData: [
          {
            "id": 1,
            "accountCode": "AC001",
            "accountName": "Account A",
            "accountAddressOne": "123 Birch St",
            "accountAddressTwo": "Suite 101",
            "accountAddressThree": "Central Park",
            "accountAddressFour": "Near Post Office",
            "trnNumber": "TRN005",
            "areaCode": "AC005",
            "areaName": "Area E",
            "cityCode": "CT005",
            "cityName": "City E",
            "countryCode": "US",
            "countryName": "United States",
            "phoneNumber": "+1-800-9876543",
            "faxNumber": "+1-800-1234567",
            "emailAddress": "accountA@example.com",
            "accountTypeCode": "AT001",
            "accountTypeName": "Business",
            "taxableCode": "TC001",
            "taxableName": "Taxable",
            "billwiseAnalysis": "Analysis A",
            "creditLimit": 100000,
            "creditLimitDays": 30,
            "insuranceCreditLimit": 50000,
            "insuranceCreditLimitDays": 60,
            "blockCreditLimit": 20000,
            "blockCreditLimitDays": 10,
            "bankAccountTypeCode": "BAT001",
            "bankAccountTypeName": "Current"
          },
          {
            "id": 2,
            "accountCode": "AC002",
            "accountName": "Account B",
            "accountAddressOne": "456 Cedar St",
            "accountAddressTwo": "Suite 202",
            "accountAddressThree": "Near River",
            "accountAddressFour": "Opposite Mall",
            "trnNumber": "TRN006",
            "areaCode": "AC006",
            "areaName": "Area F",
            "cityCode": "CT006",
            "cityName": "City F",
            "countryCode": "IN",
            "countryName": "India",
            "phoneNumber": "+91-9876543211",
            "faxNumber": "+91-9876501235",
            "emailAddress": "accountB@example.com",
            "accountTypeCode": "AT002",
            "accountTypeName": "Individual",
            "taxableCode": "TC002",
            "taxableName": "Exempt",
            "billwiseAnalysis": "Analysis B",
            "creditLimit": 50000,
            "creditLimitDays": 15,
            "insuranceCreditLimit": 30000,
            "insuranceCreditLimitDays": 45,
            "blockCreditLimit": 10000,
            "blockCreditLimitDays": 5,
            "bankAccountTypeCode": "BAT002",
            "bankAccountTypeName": "Savings"
          }
        ],
        columns: [
          { header: 'Taxable SysID', field: 'id', width: '2rem' },
          { header: 'Taxable Code', field: 'taxableCode', width: '2rem' },
          { header: 'Taxable Name', field: 'taxableName', width: '6rem' }
        ]
      };

      this.BankAccTypeCodeData = {
        id: 'BankAccTypeCode',
        name: 'Account Details',
        TableData: [
          {
            "id": 1,
            "accountCode": "AC001",
            "accountName": "Account A",
            "accountAddressOne": "123 Birch St",
            "accountAddressTwo": "Suite 101",
            "accountAddressThree": "Central Park",
            "accountAddressFour": "Near Post Office",
            "trnNumber": "TRN005",
            "areaCode": "AC005",
            "areaName": "Area E",
            "cityCode": "CT005",
            "cityName": "City E",
            "countryCode": "US",
            "countryName": "United States",
            "phoneNumber": "+1-800-9876543",
            "faxNumber": "+1-800-1234567",
            "emailAddress": "accountA@example.com",
            "accountTypeCode": "AT001",
            "accountTypeName": "Business",
            "taxableCode": "TC001",
            "taxableName": "Taxable",
            "billwiseAnalysis": "Analysis A",
            "creditLimit": 100000,
            "creditLimitDays": 30,
            "insuranceCreditLimit": 50000,
            "insuranceCreditLimitDays": 60,
            "blockCreditLimit": 20000,
            "blockCreditLimitDays": 10,
            "bankAccountTypeCode": "BAT001",
            "bankAccountTypeName": "Current"
          },
          {
            "id": 2,
            "accountCode": "AC002",
            "accountName": "Account B",
            "accountAddressOne": "456 Cedar St",
            "accountAddressTwo": "Suite 202",
            "accountAddressThree": "Near River",
            "accountAddressFour": "Opposite Mall",
            "trnNumber": "TRN006",
            "areaCode": "AC006",
            "areaName": "Area F",
            "cityCode": "CT006",
            "cityName": "City F",
            "countryCode": "IN",
            "countryName": "India",
            "phoneNumber": "+91-9876543211",
            "faxNumber": "+91-9876501235",
            "emailAddress": "accountB@example.com",
            "accountTypeCode": "AT002",
            "accountTypeName": "Individual",
            "taxableCode": "TC002",
            "taxableName": "Exempt",
            "billwiseAnalysis": "Analysis B",
            "creditLimit": 50000,
            "creditLimitDays": 15,
            "insuranceCreditLimit": 30000,
            "insuranceCreditLimitDays": 45,
            "blockCreditLimit": 10000,
            "blockCreditLimitDays": 5,
            "bankAccountTypeCode": "BAT002",
            "bankAccountTypeName": "Savings"
          }
        ],
        columns: [
          { header: 'Bank Acount Type SyID', field: 'id', width: '2rem' },
          { header: 'Bank Acount Type Code', field: 'bankAccountTypeCode', width: '2rem' },
          { header: 'Bank Acount Type Name', field: 'bankAccountTypeName', width: '6rem' }
        ]
      };


      this.AccPurAcctypeCodeData = {
        id: 'AccPurAcctypeCode',
        name: 'Purchase Account Type Details',
        TableData: [
          { sysId: '101', code: 'PAC001', name: 'Purchase Account Type 1' },
          { sysId: '102', code: 'PAC002', name: 'Purchase Account Type 2' },
          { sysId: '103', code: 'PAC003', name: 'Purchase Account Type 3' }
        ],
        columns: [
          { header: 'SysID', field: 'sysId', width: '2rem' },
          { header: 'Code', field: 'code', width: '6rem' },
          { header: 'Name', field: 'name', width: '6rem' }
        ]
      };

      this.AccSalesAccCodeData = {
        id: 'AccSalesAccCode',
        name: 'Sales Account Code Details',
        TableData: [
          { sysId: '201', code: 'SAC001', name: 'Sales Account Type 1' },
          { sysId: '202', code: 'SAC002', name: 'Sales Account Type 2' },
          { sysId: '203', code: 'SAC003', name: 'Sales Account Type 3' }
        ],
        columns: [
          { header: 'SysID', field: 'sysId', width: '2rem' },
          { header: 'Code', field: 'code', width: '6rem' },
          { header: 'Name', field: 'name', width: '6rem' }
        ]
      };

      this.AccCustAccTypeCodeData = {
        id: 'AccCustAccTypeCode',
        name: 'Customer Account Type Details',
        TableData: [
          { sysId: '301', code: 'CAC001', name: 'Customer Account Type 1' },
          { sysId: '302', code: 'CAC002', name: 'Customer Account Type 2' },
          { sysId: '303', code: 'CAC003', name: 'Customer Account Type 3' }
        ],
        columns: [
          { header: 'SysID', field: 'sysId', width: '2rem' },
          { header: 'Code', field: 'code', width: '6rem' },
          { header: 'Name', field: 'name', width: '6rem' }
        ]
      };

      this.CityCodeDataPop = {
        id: 'CityCodeDataPopup',
        name: 'City Code Details',
        TableData: [
          { HEAdd_City_Code: "CTY001", HEAdd_City_Name: "New York" },
          { HEAdd_City_Code: "CTY002", HEAdd_City_Name: "Los Angeles" },
          { HEAdd_City_Code: "CTY003", HEAdd_City_Name: "Chicago" },
          { HEAdd_City_Code: "CTY004", HEAdd_City_Name: "Houston" },
          { HEAdd_City_Code: "CTY005", HEAdd_City_Name: "Miami" },
          { HEAdd_City_Code: "CTY006", HEAdd_City_Name: "San Francisco" },
        ],
        columns: [
          { header: 'City Code', field: 'HEAdd_City_Code', width: '2rem' },
          { header: 'City Name', field: 'HEAdd_City_Name', width: '6rem' },

        ]
      }

      this.CountryCodeDataPop = {
        id: 'CountryCodeDataPopup',
        name: 'Country Code Details',
        TableData: [
          { HEAdd_Country_Code: "US", HEAdd_Country_Name: "United States" },
          { HEAdd_Country_Code: "CA", HEAdd_Country_Name: "Canada" },
          { HEAdd_Country_Code: "GB", HEAdd_Country_Name: "United Kingdom" },
          { HEAdd_Country_Code: "AU", HEAdd_Country_Name: "Australia" },
          { HEAdd_Country_Code: "IN", HEAdd_Country_Name: "India" },
        ],
        columns: [
          { header: 'Country Code', field: 'HEAdd_Country_Code', width: '2rem' },
          { header: 'Country Name', field: 'HEAdd_Country_Name', width: '6rem' },

        ]


      }




      this.AccTaxTypeCodeData = {
        id: 'AccTaxTypeCode',
        name: 'Tax Type Code Details',
        TableData: [
          { sysId: 501, code: 'TTC001', name: 'Tax Type 1' },
          { sysId: 502, code: 'TTC002', name: 'Tax Type 2' },
          { sysId: 503, code: 'TTC003', name: 'Tax Type 3' }
        ],
        columns: [
          { header: 'SysID', field: 'sysId', width: '2rem' },
          { header: 'Code', field: 'code', width: '6rem' },
          { header: 'Name', field: 'name', width: '6rem' }
        ]
      };

      this.AccDirectExpCodeData = {
        id: 'AccDirectExpCode',
        name: 'Direct Expense Code Details',
        TableData: [
          { sysId: 601, code: 'DEC001', name: 'Direct Expense Type 1' },
          { sysId: 602, code: 'DEC002', name: 'Direct Expense Type 2' },
          { sysId: 603, code: 'DEC003', name: 'Direct Expense Type 3' }
        ],
        columns: [
          { header: 'SysID', field: 'sysId', width: '2rem' },
          { header: 'Code', field: 'code', width: '6rem' },
          { header: 'Name', field: 'name', width: '6rem' }
        ]
      };

      this.ApplicableCompanyCodeData = {
        id: 'ApplicableCompanyCode',
        name: 'Applicable Company Code Details',
        TableData: this.tableData,
        columns: [
          { header: 'SysID', field: 'SingleCo_SysID', width: '2rem' },
          { header: 'Code', field: 'SingleCo_Code', width: '6rem' },
          { header: 'Name', field: 'SingleCo_Name', width: '6rem' }
        ]
      };

      this.ActAndDeactCodeData = {
        id: 'ActAndDeactCode',
        name: 'Activate & Deactivate Code Details',
        TableData: this.tableData,
        columns: [
          { header: 'SysID', field: 'HActDeactive_SysID', width: '2rem' },
          { header: 'Code', field: 'HActDeactive_Code', width: '6rem' },
          { header: 'Name', field: 'HActDeactive_Name', width: '6rem' }
        ]
      };


      this.EmpGrpCodeMData = {
        id: 'EmpGrpCodeM',
        name: 'Employee Group Details',
        TableData: [
          { groupCode: 'GRP001', groupName: 'Admin Group', groupDescription: 'Group for admin staff' },
          { groupCode: 'GRP002', groupName: 'IT Group', groupDescription: 'Group for IT staff' },
          { groupCode: 'GRP003', groupName: 'HR Group', groupDescription: 'Group for HR staff' },
        ],
        columns: [
          { header: 'Group Code', field: 'groupCode', width: '2rem' },
          { header: 'Group Name', field: 'groupName', width: '6rem' },
          { header: 'Group Description', field: 'groupDescription', width: '6rem' },
        ]
      };

      this.EmployeeCategoryData = {
        id: 'EmployeeCategoryCode',
        name: 'Employee Category Details',
        TableData: [
          { categoryCode: 'CAT001', categoryName: 'Full-Time' },
          { categoryCode: 'CAT002', categoryName: 'Part-Time' },
          { categoryCode: 'CAT003', categoryName: 'Contract' },
        ],
        columns: [
          { header: 'Category Code', field: 'categoryCode', width: '2rem' },
          { header: 'Category Name', field: 'categoryName', width: '6rem' },

        ]
      };


      this.EmpCataCodeMData = {
        id: 'EmpCataCodeM',
        name: 'Employee Category Details',
        TableData: [
          { categoryCode: 'CAT001', categoryName: 'Full-Time', categoryDescription: 'Full-time employees' },
          { categoryCode: 'CAT002', categoryName: 'Part-Time', categoryDescription: 'Part-time employees' },
          { categoryCode: 'CAT003', categoryName: 'Contract', categoryDescription: 'Contract employees' },
        ],
        columns: [
          { header: 'Category Code', field: 'categoryCode', width: '2rem' },
          { header: 'Category Name', field: 'categoryName', width: '6rem' },
          { header: 'Category Description', field: 'categoryDescription', width: '8rem' },
        ]
      };

      this.EmployeeTypeData = {
        id: 'EmployeeTypeCode',
        name: 'Employee Type Details',
        TableData: [
          { typeCode: 'TYP001', typeName: 'Permanent', },
          { typeCode: 'TYP002', typeName: 'Temporary', },
          { typeCode: 'TYP003', typeName: 'Intern', },
        ],
        columns: [
          { header: 'Employee Code', field: 'typeCode', width: '2rem' },
          { header: 'Employee Name', field: 'typeName', width: '6rem' },

        ]
      };

      this.EmpTypCodeMData = {
        id: 'EmpTypCodeM',
        name: 'Employee Type Details',
        TableData: [
          { typeCode: 'TYP001', typeName: 'Permanent', typeDescription: 'Permanent employees' },
          { typeCode: 'TYP002', typeName: 'Temporary', typeDescription: 'Temporary employees' },
          { typeCode: 'TYP003', typeName: 'Intern', typeDescription: 'Intern employees' },
        ],
        columns: [
          { header: 'Type Code', field: 'typeCode', width: '2rem' },
          { header: 'Type Name', field: 'typeName', width: '6rem' },
          { header: 'Type Description', field: 'typeDescription', width: '8rem' },
        ]
      };

      this.EmpLeavePolCodeMData = {
        id: 'EmpLeavePolCodeM',
        name: 'Employee Leave Policy Details',
        TableData: [
          { policyCode: 'LPC001', policyName: 'Annual Leave', policyDescription: 'Policy for annual leave' },
          { policyCode: 'LPC002', policyName: 'Sick Leave', policyDescription: 'Policy for sick leave' },
          { policyCode: 'LPC003', policyName: 'Maternity Leave', policyDescription: 'Policy for maternity leave' },
        ],
        columns: [
          { header: 'Policy Code', field: 'policyCode', width: '2rem' },
          { header: 'Policy Name', field: 'policyName', width: '6rem' },
          { header: 'Policy Description', field: 'policyDescription', width: '8rem' },
        ]
      };


      this.AlertsEmpCodeMData = {
        id: 'AlertsEmpCodeM',
        name: 'Alerts Employee Code Details',
        TableData: [
          { empCode: 'EMP001', empName: 'Alice Johnson' },
          { empCode: 'EMP002', empName: 'Bob Smith' },
          { empCode: 'EMP003', empName: 'Charlie Brown' },
        ],
        columns: [
          { header: 'Employee Code', field: 'empCode', width: '2rem' },
          { header: 'Employee Name', field: 'empName', width: '6rem' },
        ]
      };


      this.AuthorizerCodeDataData = {
        id: 'AuthorizerCode',
        name: 'Authorization Codes',
        TableData: [
          { authorizerSysID: 1001, authorizerCode: 'AUTH001', authorizerName: 'Manager', authorizerDescription: 'Authorized for all managerial decisions' },
          { authorizerSysID: 1002, authorizerCode: 'AUTH002', authorizerName: 'HR', authorizerDescription: 'Authorized for HR-related decisions' },
          { authorizerSysID: 1003, authorizerCode: 'AUTH003', authorizerName: 'Finance', authorizerDescription: 'Authorized for financial approvals' },
        ],
        columns: [
          { header: 'Authorizer SysID', field: 'authorizerSysID', width: '2rem' },
          { header: 'Authorizer Code', field: 'authorizerCode', width: '2rem' },
          { header: 'Authorizer Name', field: 'authorizerName', width: '6rem' },
        ]
      };




      this.EmployeeDeptCodeData = {
        id: 'EmployeeDeptCode',
        name: 'Employee Department Codes',
        TableData: [
          { deptSysID: 2001, deptCode: 'DEP001', deptName: 'Human Resources', deptDescription: 'Handles all HR-related tasks' },
          { deptSysID: 2002, deptCode: 'DEP002', deptName: 'Finance', deptDescription: 'Manages the company’s financials' },
          { deptSysID: 2003, deptCode: 'DEP003', deptName: 'IT', deptDescription: 'Responsible for company’s technology infrastructure' },
        ],
        columns: [
          { header: 'Department SysId', field: 'deptSysID', width: '2rem' },
          { header: 'Department Code', field: 'deptCode', width: '2rem' },
          { header: 'Department Name', field: 'deptName', width: '6rem' },
        ]
      };

      this.LandedCostCodeData = {
        id: 'LandedCostCode',
        name: 'Landed Cost Codes',
        TableData: this.tableData,
        columns: [
          { header: 'Landed Cost SysID', field: 'HLmCost_SysID', width: '2rem' },
          { header: 'Landed Cost Code', field: 'HLmCost_Code', width: '2rem' },
          { header: 'Landed Cost Name', field: 'HLmCost_Name', width: '6rem' },
          { header: 'Landed Cost %', field: 'HLmCost_Perce', width: '2rem' },

        ]
      };




      this.CriteriaCodeData = {
        id: 'CriteriaCode',
        name: 'Criteria Codes',
        TableData: [
          { criteriaSysID: 3001, criteriaCode: 'CRIT001', criteriaName: 'Performance', criteriaDescription: 'Employee performance evaluation' },
          { criteriaSysID: 3002, criteriaCode: 'CRIT002', criteriaName: 'Attendance', criteriaDescription: 'Attendance records evaluation' },
          { criteriaSysID: 3003, criteriaCode: 'CRIT003', criteriaName: 'Skills', criteriaDescription: 'Skills and qualifications evaluation' },
        ],
        columns: [
          { header: 'Criteria SysID', field: 'criteriaSysID', width: '2rem' },
          { header: 'Criteria Code', field: 'criteriaCode', width: '2rem' },
          { header: 'Criteria Name', field: 'criteriaName', width: '6rem' },
        ]
      };
      this.HideOrDispFieldData = {
        id: 'FieldHideOrDisCode',
        name: 'Hide or Display',
        TableData: this.tableData,
        columns: [
          { header: 'Hide Or Display SysID', field: 'HFieldDispHide_SysID', width: '2rem' },
          { header: 'Hide Or Display Code', field: 'HFieldDispHide_Code', width: '2rem' },
          { header: 'Hide Or Display Name', field: 'HFieldDispHide_Name', width: '6rem' },
          // { header: 'Data Field Name', field: 'dataFieldName', width: '6rem' },
        ]
      }





      this.MenuCodeData = {
        id: 'MenuCode',
        name: 'Menu Details',
        TableData: this.tableData,
        columns: [
          { header: 'Menu SysID', field: 'HMenu_SysID', width: '4rem' },
          { header: 'Menu Code', field: 'HMenu_Code', width: '4rem' },
          { header: 'Menu Name', field: 'HMenu_Name', width: '10rem' },
        ],
      };

      this.CustomerGroupData = {
        id: 'CustomerGroupCode',
        name: 'Customer Group Details',
        TableData: [
          {
            "id": "1",
            "sysId": 1,
            "CustomerGroupCode": "SG001",
            "CustomerGroupName": "Group A"
          },
          {
            "id": "2",
            "sysId": 2,
            "CustomerGroupCode": "SG002",
            "CustomerGroupName": "Group B"
          }
        ],
        columns: [
          { header: 'Customer Group Code', field: 'CustomerGroupCode', width: '2rem' },
          { header: 'Customer Group Name', field: 'CustomerGroupName', width: '6rem' }
        ]
      };

      this.LcCurrencyCodeData = {
        id: 'LcCurrencyCode',
        name: 'Currency Code Details',
        TableData: [
          { HCurr_Code: 1, HCurr_Name: 'TX001', HCurr_Rate: '1', },
          { HCurr_Code: 2, HCurr_Name: 'TX002', HCurr_Rate: '2', },
          { HCurr_Code: 3, HCurr_Name: 'TX003', HCurr_Rate: '3', },
        ],
        columns: [
          { header: 'Currency Code', field: 'HCurr_Code', width: '2rem' },
          { header: 'Currency Name', field: 'HCurr_Name', width: '4rem' },
          { header: 'Convertion Rate', field: 'HCurr_Rate', width: '4rem' },
        ]
      };
      this.LcIssuingBankCodeData = {
        id: 'LcIssuingBankCode',
        name: 'LC Issuing Bank Code',
        TableData: [
          { HLCIssuBank_Code: 'IB001', HLCIssuBank_Name: 'Bank of America' },
          { HLCIssuBank_Code: 'IB002', HLCIssuBank_Name: 'HSBC' },
          { HLCIssuBank_Code: 'IB003', HLCIssuBank_Name: 'Citibank' },
          { HLCIssuBank_Code: 'IB004', HLCIssuBank_Name: 'Standard Chartered' },
          { HLCIssuBank_Code: 'IB005', HLCIssuBank_Name: 'Deutsche Bank' },
        ],
        columns: [
          { header: 'Bank Code', field: 'HLCIssuBank_Code', width: '4rem' },
          { header: 'Bank Name', field: 'HLCIssuBank_Name', width: '10rem' },
        ],
      };
      this.LcAdvisingBankCodeData = {
        id: 'LcAdvisingBankCode',
        name: 'LC Advising Bank Code',
        TableData: [
          { HLCAdvBank_Code: 'AB001', HLCAdvBank_Name: 'JPMorgan Chase' },
          { HLCAdvBank_Code: 'AB002', HLCAdvBank_Name: 'Barclays' },
          { HLCAdvBank_Code: 'AB003', HLCAdvBank_Name: 'Wells Fargo' },
          { HLCAdvBank_Code: 'AB004', HLCAdvBank_Name: 'UBS' },
          { HLCAdvBank_Code: 'AB005', HLCAdvBank_Name: 'Credit Suisse' },
        ],
        columns: [
          { header: 'Bank Code', field: 'HLCAdvBank_Code', width: '4rem' },
          { header: 'Bank Name', field: 'HLCAdvBank_Name', width: '10rem' },
        ],
      };
      this.LcNegotiatingBankCodeData = {
        id: 'LcNegotiatingBankCode',
        name: 'LC Negotiating Bank Code',
        TableData: [
          { HLCNegBank_Code: 'NB001', HLCNegBank_Name: 'BNP Paribas' },
          { HLCNegBank_Code: 'NB002', HLCNegBank_Name: 'Santander' },
          { HLCNegBank_Code: 'NB003', HLCNegBank_Name: 'Royal Bank of Canada' },
          { HLCNegBank_Code: 'NB004', HLCNegBank_Name: 'Scotiabank' },
          { HLCNegBank_Code: 'NB005', HLCNegBank_Name: 'Toronto-Dominion Bank' },
        ],
        columns: [
          { header: 'Bank Code', field: 'HLCNegBank_Code', width: '4rem' },
          { header: 'Bank Name', field: 'HLCNegBank_Name', width: '10rem' },
        ],
      };


      this.LcAlertCodeData = {
        id: 'LcAlertCode',
        name: 'Alert Code Details',
        TableData: [
          {
            "alertsMasterSysID": "A001",
            "alertsMasterCode": "ALERT001",
            "alertsName": "Low Stock Alert",
            "alertsEmail": "stockalert@example.com",
            "id": "f028"
          },
          {
            "alertsMasterSysID": "A002",
            "alertsMasterCode": "ALERT002",
            "alertsName": "System Downtime Alert",
            "alertsEmail": "systemalert@example.com",
            "id": "13e2"
          },
          {
            "alertsMasterSysID": "A003",
            "alertsMasterCode": "ALERT003",
            "alertsName": "New User Registration Alert",
            "alertsEmail": "useralert@example.com",
            "id": "967e"
          },
          {
            "alertsMasterSysID": "A004",
            "alertsMasterCode": "ALERT004",
            "alertsName": "Payment Confirmation Alert",
            "alertsEmail": "paymentalert@example.com",
            "id": "ed8f"
          },
          {
            "alertsMasterSysID": "A005",
            "alertsMasterCode": "ALERT005",
            "alertsName": "Overdue Payment Alert",
            "alertsEmail": "overduealert@example.com",
            "id": "9140"
          }
        ],
        columns: [
          { header: 'Alert Code', field: 'alertsMasterCode', width: '2rem' },
          { header: 'Alert Name', field: 'alertsName', width: '6rem' }
        ]
      };

      this.LcEmpCodeData = {
        id: 'LcEmpCode',
        name: 'Employee Details',
        TableData: [
          { employeeCode: 'EMP001', employeeName: 'Alice Johnson', employeeEmail: 'test@i.com' },
          { employeeCode: 'EMP002', employeeName: 'Bob Smith', employeeEmail: 'test@i.com' },
          { employeeCode: 'EMP003', employeeName: 'Charlie Brown', employeeEmail: 'test@i.com' },
        ],
        columns: [
          { header: 'Employee Code', field: 'employeeCode', width: '2rem' },
          { header: 'Employee Name', field: 'employeeName', width: '6rem' },
          { header: 'Employee Email', field: 'employeeEmail', width: '6rem' },
        ]
      };



      this.VoucherTypeCodeData = {
        id: 'VoucherTypeCode',
        name: 'Voucher Type Details',
        TableData: this.tableData,
        columns: [
          { header: 'Voucher SysID', field: 'HVouType_SysID', width: '2rem' },
          { header: 'Voucher Code', field: 'HVouType_Code', width: '2rem' },
          { header: 'Voucher Name', field: 'HVouType_Name', width: '6rem' },
          // { header: 'Start Number', field: 'voucherDescription', width: '6rem' },
        ]
      };

      this.VoucherTypeMenuCodeData = {
        id: 'VoucherTypeMenuCode',
        name: 'Voucher Type Restriction Menu Details',
        TableData: [
          { voucherCode: 'V001', voucherName: 'Sales Voucher' },
          { voucherCode: 'V002', voucherName: 'Purchase Voucher' },
          { voucherCode: 'V003', voucherName: 'Expense Voucher' },
          { voucherCode: 'V004', voucherName: 'Journal Voucher' },
          { voucherCode: 'V005', voucherName: 'Credit Note' },
          { voucherCode: 'V006', voucherName: 'Debit Note' }
        ],
        columns: [
          { header: 'Voucher Type Menu Code', field: 'voucherCode', width: '8rem' },
          { header: 'Voucher Type Menu Name', field: 'voucherName', width: '16rem' }
        ]
      };


      this.ProductGroupCodeData = {
        id: 'ProductGroupCode',
        name: 'Product Group Details',
        TableData: this.tableData,
        columns: [
          { header: 'Group SysID', field: 'HProdGroup_SysID', width: '2rem' },
          { header: 'Group Code', field: 'HProdGroup_Code', width: '2rem' },
          { header: 'Group Name', field: 'HProdGroup_Short_Name', width: '6rem' }
        ]
      };

      this.PriceListGroupCodeData = {
        id: 'PriceListGroupCode',
        name: 'Price List Group Details',
        TableData: [
          { listCode: 'PL001', listName: 'Retail Prices', listDescription: 'Pricing list for retail customers' },
          { listCode: 'PL002', listName: 'Wholesale Prices', listDescription: 'Pricing list for wholesale buyers' },
          { listCode: 'PL003', listName: 'Discounted Prices', listDescription: 'Pricing list for promotional discounts' },
        ],
        columns: [
          { header: 'List Code', field: 'listCode', width: '2rem' },
          { header: 'List Name', field: 'listName', width: '6rem' }
        ]
      };



      this.CorporateTaxAccountGroupData = {
        id: 'CorporateTaxAccountGroup',
        name: 'Corporate Tax Details',
        TableData: this.tableData,
        columns: [
          { header: 'Corporate Tax SysID', field: 'HCorpTax_SysID', width: '2rem' },
          { header: 'Corporate Tax Code', field: 'HCorpTax_Code', width: '2rem' },
          { header: 'Corporate Tax Name', field: 'HCorpTax_Name', width: '6rem' },
        ]
      }


      this.BaseUnitGroupData = {
        id: 'BaseUnit',
        name: 'Base Unit Details',
        TableData: this.tableData,
        columns: [
          { header: 'Base Unit SysID', field: 'HFirstUnit_SysID', width: '2rem' },
          { header: 'Base Unit', field: 'HFirstUnit_Base_Unit', width: '2rem' },
          { header: 'Base Unit Fraction', field: 'HFirstUnit_Unit_Frac', width: '6rem' },
        ]
      }


      this.FirstAccGroupData = {
        id: 'FirstAccGroup',
        name: 'First Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.AdditionalExpGroupData = {
        id: 'AdditionalExpGroup',
        name: 'Additional Expense Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.InterCoGroupData = {
        id: 'InterCoGroup',
        name: 'Inter Company Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.ExpenseAddToCustSupplierData = {
        id: 'ExpenseAddToCustSupplier',
        name: 'Expense Add To Customer Supplier Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.DirectExpAccGroupData = {
        id: 'DirectExpAccGroup',
        name: 'Direct Expense Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.InDirectExpAccGroupData = {
        id: 'InDirectExpAccGroup',
        name: 'Indirect Expense Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.SecondAccGroupData = {
        id: 'SecondAccGroup',
        name: 'Second Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.CustomerAccGroupCodeData = {
        id: 'CustomerAccGroupCode',
        name: 'Customer Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.VendorGroupCodeData = {
        id: 'VendorGroupCode',
        name: 'Vendor Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.TaxGroupData = {
        id: 'TaxGroup',
        name: 'Tax Group Details',
        TableData: [
          { HFirstTaxGroup_SysID: 1, HFirstTaxGroup_Code: "TAX001", HFirstTaxGroup_Name: "VAT Group" },
          { HFirstTaxGroup_SysID: 2, HFirstTaxGroup_Code: "TAX002", HFirstTaxGroup_Name: "Sales Tax Group" },
          { HFirstTaxGroup_SysID: 3, HFirstTaxGroup_Code: "TAX003", HFirstTaxGroup_Name: "Service Tax Group" },
          { HFirstTaxGroup_SysID: 4, HFirstTaxGroup_Code: "TAX004", HFirstTaxGroup_Name: "Import Duty Group" },
          { HFirstTaxGroup_SysID: 5, HFirstTaxGroup_Code: "TAX005", HFirstTaxGroup_Name: "GST Group" }
        ],
        columns: [
          { header: 'Tax Group Code', field: 'HFirstTaxGroup_Code', width: '2rem' },
          { header: 'Tax Group Name', field: 'HFirstTaxGroup_Name', width: '6rem' },
        ]
      };

      this.AdditionalTaxGroupOneData = {
        id: 'AdditionalTaxGroupOne',
        name: 'Additional Tax Group Details',
        TableData: [
          { HFirstTaxGroup_SysID: 1, HFirstTaxGroup_Code: "TAX001", HFirstTaxGroup_Name: "VAT Group" },
          { HFirstTaxGroup_SysID: 2, HFirstTaxGroup_Code: "TAX002", HFirstTaxGroup_Name: "Sales Tax Group" },
          { HFirstTaxGroup_SysID: 3, HFirstTaxGroup_Code: "TAX003", HFirstTaxGroup_Name: "Service Tax Group" },
          { HFirstTaxGroup_SysID: 4, HFirstTaxGroup_Code: "TAX004", HFirstTaxGroup_Name: "Import Duty Group" },
          { HFirstTaxGroup_SysID: 5, HFirstTaxGroup_Code: "TAX005", HFirstTaxGroup_Name: "GST Group" }
        ],
        columns: [
          { header: 'Tax Group Code', field: 'HFirstTaxGroup_Code', width: '2rem' },
          { header: 'Tax Group Name', field: 'HFirstTaxGroup_Name', width: '6rem' },
        ]
      };


      this.AdditionalTaxGroupTwoData = {
        id: 'AdditionalTaxGroupTwo',
        name: 'Additional Tax Group Details',
        TableData: [
          { HFirstTaxGroup_SysID: 1, HFirstTaxGroup_Code: "TAX001", HFirstTaxGroup_Name: "VAT Group" },
          { HFirstTaxGroup_SysID: 2, HFirstTaxGroup_Code: "TAX002", HFirstTaxGroup_Name: "Sales Tax Group" },
          { HFirstTaxGroup_SysID: 3, HFirstTaxGroup_Code: "TAX003", HFirstTaxGroup_Name: "Service Tax Group" },
          { HFirstTaxGroup_SysID: 4, HFirstTaxGroup_Code: "TAX004", HFirstTaxGroup_Name: "Import Duty Group" },
          { HFirstTaxGroup_SysID: 5, HFirstTaxGroup_Code: "TAX005", HFirstTaxGroup_Name: "GST Group" }
        ],
        columns: [
          { header: 'Tax Group Code', field: 'HFirstTaxGroup_Code', width: '2rem' },
          { header: 'Tax Group Name', field: 'HFirstTaxGroup_Name', width: '6rem' },
        ]
      };

      this.TaxAccGroupCodeData = {
        id: 'TaxAccGroupCode',
        name: 'Tax Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.TaxAccGroupOneCodeData = {
        id: 'TaxAccGroupOneCode',
        name: 'Tax Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };

      this.TaxAccGroupTwoCodeData = {
        id: 'TaxAccGroupTwoCode',
        name: 'Tax Account Group Details',
        // TableData: [
        //   { HAccOne_Group_SysID: 1, HAccOne_Group_Code: "AG001", HAccOne_Group_Name: "Assets Group" },
        //   { HAccOne_Group_SysID: 2, HAccOne_Group_Code: "AG002", HAccOne_Group_Name: "Liabilities Group" },
        //   { HAccOne_Group_SysID: 3, HAccOne_Group_Code: "AG003", HAccOne_Group_Name: "Revenue Group" },
        //   { HAccOne_Group_SysID: 4, HAccOne_Group_Code: "AG004", HAccOne_Group_Name: "Expense Group" },
        //   { HAccOne_Group_SysID: 5, HAccOne_Group_Code: "AG005", HAccOne_Group_Name: "Equity Group" }
        // ],
        TableData: this.tableData,
        columns: [
          { header: 'Account Group Code', field: 'HAccGroup_Group_Code', width: '2rem' },
          { header: 'Account Group Name', field: 'HAccGroup_Group_Name', width: '6rem' },
        ]
      };




      this.InventoryAccCodeData = {
        id: 'InventoryAccCode',
        name: 'Inventory Account Details',
        TableData: [
          { HAccOne_Code: "AC001", HAccOne_Name: "Cash", SysId: 1001 },
          { HAccOne_Code: "AC002", HAccOne_Name: "Accounts Receivable", SysId: 1001 },
          { HAccOne_Code: "AC003", HAccOne_Name: "Inventory", SysId: 1001 },
          { HAccOne_Code: "AC004", HAccOne_Name: "Fixed Assets", SysId: 1001 }
        ],
        columns: [
          { header: 'Account Code', field: 'SysId', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }
      this.CostOfSalesAccCodeData = {
        id: 'CostOfSalesAccCode',
        name: 'Cost Of Sales Account Details',
        TableData: [
          { HAccOne_Code: "AC001", HAccOne_Name: "Cash", SysId: 1001 },
          { HAccOne_Code: "AC002", HAccOne_Name: "Accounts Receivable", SysId: 1001 },
          { HAccOne_Code: "AC003", HAccOne_Name: "Inventory", SysId: 1001 },
          { HAccOne_Code: "AC004", HAccOne_Name: "Fixed Assets", SysId: 1001 }
        ],
        columns: [
          { header: 'Account SysID', field: 'SysId', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }
      this.PurcahseAccCodeData = {
        id: 'PurcahseAccCode',
        name: 'Purchase Account Details',
        TableData: [
          { HAccOne_Code: "PA001", HAccOne_Name: "Raw Material Purchases", SysId: 3001 },
          { HAccOne_Code: "PA002", HAccOne_Name: "Consumables Purchases", SysId: 3002 },
          { HAccOne_Code: "PA003", HAccOne_Name: "Capital Goods Purchases", SysId: 3003 },
          { HAccOne_Code: "PA004", HAccOne_Name: "Import Purchases", SysId: 3004 },
          { HAccOne_Code: "PA005", HAccOne_Name: "Local Purchases", SysId: 3005 }
        ],
        columns: [
          { header: 'Purchase Account SysID', field: 'SysId', width: '2rem' },
          { header: 'Purchase Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: ' Purchase Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }

      this.SalesAccCodeData = {
        id: 'SalesAccCode',
        name: 'Sales Account Details',
        TableData: [
          { HAccOne_Code: "SA001", HAccOne_Name: "Domestic Sales", SysId: 2001 },
          { HAccOne_Code: "SA002", HAccOne_Name: "Export Sales", SysId: 2002 },
          { HAccOne_Code: "SA003", HAccOne_Name: "Online Sales", SysId: 2003 },
          { HAccOne_Code: "SA004", HAccOne_Name: "Retail Sales", SysId: 2004 },
          { HAccOne_Code: "SA005", HAccOne_Name: "Wholesale Sales", SysId: 2005 }
        ],
        columns: [
          { header: 'Sales Account SysID', field: 'SysId', width: '2rem' },
          { header: 'Sales Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Sales Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }

      this.VatInputAccCodeData = {
        id: 'VatInputAccCode',
        name: 'Vat Input Account Details',
        TableData: [
          { HAccOne_Code: "VAT001", HAccOne_Name: "VAT Input", SysId: 4001 },
          { HAccOne_Code: "VAT002", HAccOne_Name: "VAT Output", SysId: 4002 },
          { HAccOne_Code: "VAT003", HAccOne_Name: "VAT Payable", SysId: 4003 },
          { HAccOne_Code: "VAT004", HAccOne_Name: "VAT Receivable", SysId: 4004 }
        ],
        columns: [
          { header: 'Account SysID', field: 'SysId', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }
      this.VatOutputAccCodeData = {
        id: 'VatOutputAccCode',
        name: 'Vat OutputAccount Details',
        TableData: [
          { HAccOne_Code: "VATOUT001", HAccOne_Name: "VAT Output - Domestic Sales", SysId: 4101 },
          { HAccOne_Code: "VATOUT002", HAccOne_Name: "VAT Output - Export Sales", SysId: 4102 },
          { HAccOne_Code: "VATOUT003", HAccOne_Name: "VAT Output - Services", SysId: 4103 },
          { HAccOne_Code: "VATOUT004", HAccOne_Name: "VAT Output - Retail", SysId: 4104 },
          { HAccOne_Code: "VATOUT005", HAccOne_Name: "VAT Output - Wholesale", SysId: 4105 }
        ],
        columns: [
          { header: 'Account SysID', field: 'SysId', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }

      this.AdditionCodeData = {
        id: 'AdditionCode',
        name: 'Addition Code Details',
        TableData: [
          { code: "A001", name: "Item One" },
          { code: "A002", name: "Item Two" },
          { code: "A003", name: "Item Three" },
          { code: "A004", name: "Item Four" },
          { code: "A005", name: "Item Five" }
        ],
        columns: [
          { header: 'Addition Code', field: 'code', width: '2rem' },
          { header: 'Addition Name', field: 'name', width: '6rem' }
        ]
      }
      this.VatAdvAccCodeData = {
        id: 'VatAdvAccCode',
        name: 'Vat Advance Account Details',
        TableData: [
          { HAccOne_Code: "VATADV001", HAccOne_Name: "VAT Advance - Import", SysId: 4201 },
          { HAccOne_Code: "VATADV002", HAccOne_Name: "VAT Advance - Capital Goods", SysId: 4202 },
          { HAccOne_Code: "VATADV003", HAccOne_Name: "VAT Advance - Services", SysId: 4203 },
          { HAccOne_Code: "VATADV004", HAccOne_Name: "VAT Advance - Local Purchases", SysId: 4204 }
        ],
        columns: [
          { header: 'Account SyID', field: 'SysId', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }
      this.OtherTaxInputAccCodeData = {
        id: 'OtherTaxInputAccCode',
        name: 'Other Tax Input Account Details',
        TableData: [
          { HAccOne_Code: "OTI001", HAccOne_Name: "Service Tax Input", SysId: 4301 },
          { HAccOne_Code: "OTI002", HAccOne_Name: "Excise Duty Input", SysId: 4302 },
          { HAccOne_Code: "OTI003", HAccOne_Name: "Customs Duty Input", SysId: 4303 },
          { HAccOne_Code: "OTI004", HAccOne_Name: "Cess Input", SysId: 4304 },
          { HAccOne_Code: "OTI005", HAccOne_Name: "Environmental Tax Input", SysId: 4305 }
        ],
        columns: [
          { header: 'Account SysID', field: 'SysId', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }
      this.OtherTaxOutputAccCodeData = {
        id: 'OtherTaxOutputAccCode',
        name: 'Other Tax Output Account Details',
        TableData: [
          { HAccOne_Code: "OTO001", HAccOne_Name: "Service Tax Output", SysId: 4401 },
          { HAccOne_Code: "OTO002", HAccOne_Name: "Excise Duty Output", SysId: 4402 },
          { HAccOne_Code: "OTO003", HAccOne_Name: "Customs Duty Output", SysId: 4403 },
          { HAccOne_Code: "OTO004", HAccOne_Name: "Cess Output", SysId: 4404 },
          { HAccOne_Code: "OTO005", HAccOne_Name: "Environmental Tax Output", SysId: 4405 }
        ],
        columns: [
          { header: 'Account SyID', field: 'SysId', width: '2rem' },
          { header: 'Account Code', field: 'HAccOne_Code', width: '2rem' },
          { header: 'Account Name', field: 'HAccOne_Name', width: '6rem' }
        ]
      }


      this.ProductUnitData = {
        id: 'ProductUnit',
        name: 'Product Unit Details',
        TableData: this.tableData,
        columns: [
          { header: 'System ID', field: 'HFirstUnit_SysID', width: '2rem' },
          { header: 'Base Unit', field: 'HFirstUnit_Base_Unit', width: '6rem' },
          { header: 'Unit Fraction', field: 'HFirstUnit_Unit_Frac', width: '6rem' },
        ]
      };


      this.BomJobData = {
        id: 'BomJob',
        name: 'BOM Job Details',
        TableData: [
          { HBJob_SysID: 1, HBJob_Code: 'JB101', HBJob_Name: 'Welding' },
          { HBJob_SysID: 2, HBJob_Code: 'JB102', HBJob_Name: 'Assembling' },
          { HBJob_SysID: 3, HBJob_Code: 'JB103', HBJob_Name: 'Painting' }
        ],
        columns: [
          { header: 'System ID', field: 'HBJob_SysID', width: '2rem' },
          { header: 'Job Code', field: 'HBJob_Code', width: '6rem' },
          { header: 'Job Name', field: 'HBJob_Name', width: '8rem' }
        ]
      };


      this.BomProductionBatchData = {
        id: 'BomProductionBatch',
        name: 'BOM Production Batch Details',
        TableData: [
          { HBBatch_SysID: 1, HBBatch_Code: 'BT101', HBBatch_Name: 'Batch A' },
          { HBBatch_SysID: 2, HBBatch_Code: 'BT102', HBBatch_Name: 'Batch B' },
          { HBBatch_SysID: 3, HBBatch_Code: 'BT103', HBBatch_Name: 'Batch C' }
        ],
        columns: [
          { header: 'System ID', field: 'HBBatch_SysID', width: '2rem' },
          { header: 'Batch Code', field: 'HBBatch_Code', width: '6rem' },
          { header: 'Batch Name', field: 'HBBatch_Name', width: '8rem' }
        ]
      };

      this.BomProductModuleData = {
        id: 'BomProductModule',
        name: 'BOM Product Module Details',
        TableData: [
          { HBProdModu_SysID: 1, HBProdModu_Code: 'PM001', HBProdModu_Name: 'Module A' },
          { HBProdModu_SysID: 2, HBProdModu_Code: 'PM002', HBProdModu_Name: 'Module B' },
          { HBProdModu_SysID: 3, HBProdModu_Code: 'PM003', HBProdModu_Name: 'Module C' },
          { HBProdModu_SysID: 4, HBProdModu_Code: 'PM004', HBProdModu_Name: 'Module D' }
        ],
        columns: [
          { header: 'System ID', field: 'HBProdModu_SysID', width: '2rem' },
          { header: 'Module Code', field: 'HBProdModu_Code', width: '6rem' },
          { header: 'Module Name', field: 'HBProdModu_Name', width: '8rem' }
        ]
      };

      this.ProductionProcessData = {
        id: 'ProductionProcess',
        name: 'Production Process Details',
        TableData: [
          { HProdProce_SysID: 1, HProdProce_Code: 'PP101', HProdProce_Name: 'Cutting' },
          { HProdProce_SysID: 2, HProdProce_Code: 'PP102', HProdProce_Name: 'Molding' },
          { HProdProce_SysID: 3, HProdProce_Code: 'PP103', HProdProce_Name: 'Polishing' }
        ],
        columns: [
          { header: 'System ID', field: 'HProdProce_SysID', width: '2rem' },
          { header: 'Process Code', field: 'HProdProce_Code', width: '6rem' },
          { header: 'Process Name', field: 'HProdProce_Name', width: '8rem' }
        ]
      };

      this.ManpowerCodeData = {
        id: 'ManpowerCode',
        name: 'Manpower Details',
        TableData: [
          { HManpow_SysID: 1, HManpow_Code: 'MP001', HManpow_Name: 'John Doe', HManpow_HrRate: 25.5, HManpowModu_SysID: 101, HManpowModu_Code: 'MOD001', HManpowModu_Name: 'Assembly Line A' },
          { HManpow_SysID: 2, HManpow_Code: 'MP002', HManpow_Name: 'Jane Smith', HManpow_HrRate: 30.0, HManpowModu_SysID: 102, HManpowModu_Code: 'MOD002', HManpowModu_Name: 'Welding Section' },
          { HManpow_SysID: 3, HManpow_Code: 'MP003', HManpow_Name: 'Michael Johnson', HManpow_HrRate: 28.75, HManpowModu_SysID: 103, HManpowModu_Code: 'MOD003', HManpowModu_Name: 'Painting Unit' },
          { HManpow_SysID: 4, HManpow_Code: 'MP004', HManpow_Name: 'Emily Davis', HManpow_HrRate: 27.0, HManpowModu_SysID: 104, HManpowModu_Code: 'MOD004', HManpowModu_Name: 'Quality Check' }
        ],
        columns: [
          { header: 'System ID', field: 'HManpow_SysID', width: '2rem' },
          { header: 'Manpower Code', field: 'HManpow_Code', width: '6rem' },
          { header: 'Manpower Name', field: 'HManpow_Name', width: '8rem' },
          { header: 'Hourly Rate', field: 'HManpow_HrRate', width: '4rem' },

        ]
      };


      this.ManpowerModuleData = {
        id: 'ManpowerModule',
        name: 'Manpower Module Details',
        TableData: [
          { HManpow_SysID: 1, HManpow_Code: 'MP001', HManpow_Name: 'John Doe', HManpow_HrRate: 25.5, HManpowModu_SysID: 101, HManpowModu_Code: 'MOD001', HManpowModu_Name: 'Assembly Line A' },
          { HManpow_SysID: 2, HManpow_Code: 'MP002', HManpow_Name: 'Jane Smith', HManpow_HrRate: 30.0, HManpowModu_SysID: 102, HManpowModu_Code: 'MOD002', HManpowModu_Name: 'Welding Section' },
          { HManpow_SysID: 3, HManpow_Code: 'MP003', HManpow_Name: 'Michael Johnson', HManpow_HrRate: 28.75, HManpowModu_SysID: 103, HManpowModu_Code: 'MOD003', HManpowModu_Name: 'Painting Unit' },
          { HManpow_SysID: 4, HManpow_Code: 'MP004', HManpow_Name: 'Emily Davis', HManpow_HrRate: 27.0, HManpowModu_SysID: 104, HManpowModu_Code: 'MOD004', HManpowModu_Name: 'Quality Check' }
        ],
        columns: [

          { header: 'Module System ID', field: 'HManpowModu_SysID', width: '3rem' },
          { header: 'Module Code', field: 'HManpowModu_Code', width: '6rem' },
          { header: 'Module Name', field: 'HManpowModu_Name', width: '8rem' }
        ]
      };


      this.EmployeeGroupCodeData = {
        id: 'EmployeeGroupCode',
        name: 'Employee Details',
        TableData: [
          { HEmpl_SysID: 1, HEmpl_Code: 'EMP101', HEmpl_Name: 'John Doe', HEmpl_Group_SysID: 1, HEmpl_Group_Code: 'GRP001', HEmpl_Group_Name: 'Manufacturing', HEmpl_Categ_SysID: 1, HEmpl_Categ_Code: 'CAT001', HEmpl_Categ_Name: 'Technician', HEmpl_Modu_SysID: 1, HEmpl_Modu_Code: 'MOD001', HEmpl_Modu_Name: 'Welding', HEmpl_Type_SysID: 1, HEmpl_Type_Code: 'TYP001', HEmpl_Type_Name: 'Full-Time', HEmpl_Acc_SysID: 1, HEmpl_Acc_Code: 'ACC001', HEmpl_Acc_Name: 'Payroll', HEmpl_LPolicy_SysID: 1, HEmpl_LPolicy_Code: 'LPO001', HEmpl_LPolicy_Name: 'Standard Leave' },
          { HEmpl_SysID: 2, HEmpl_Code: 'EMP102', HEmpl_Name: 'Jane Smith', HEmpl_Group_SysID: 2, HEmpl_Group_Code: 'GRP002', HEmpl_Group_Name: 'Assembly', HEmpl_Categ_SysID: 2, HEmpl_Categ_Code: 'CAT002', HEmpl_Categ_Name: 'Operator', HEmpl_Modu_SysID: 2, HEmpl_Modu_Code: 'MOD002', HEmpl_Modu_Name: 'Assembly Line', HEmpl_Type_SysID: 2, HEmpl_Type_Code: 'TYP002', HEmpl_Type_Name: 'Contract', HEmpl_Acc_SysID: 2, HEmpl_Acc_Code: 'ACC002', HEmpl_Acc_Name: 'HR', HEmpl_LPolicy_SysID: 2, HEmpl_LPolicy_Code: 'LPO002', HEmpl_LPolicy_Name: 'Flexible Leave' }
        ],
        columns: [

          { header: 'Group Code', field: 'HEmpl_Group_Code', width: '6rem' },
          { header: 'Group Name', field: 'HEmpl_Group_Name', width: '8rem' },
          // { header: 'Category Code', field: 'HEmpl_Categ_Code', width: '6rem' },  
          // { header: 'Category Name', field: 'HEmpl_Categ_Name', width: '8rem' },  
          // { header: 'Module Code', field: 'HEmpl_Modu_Code', width: '6rem' },  
          // { header: 'Module Name', field: 'HEmpl_Modu_Name', width: '8rem' },  
          // { header: 'Type Code', field: 'HEmpl_Type_Code', width: '6rem' },  
          // { header: 'Type Name', field: 'HEmpl_Type_Name', width: '8rem' },  
          // { header: 'Account Code', field: 'HEmpl_Acc_Code', width: '6rem' },  
          // { header: 'Account Name', field: 'HEmpl_Acc_Name', width: '8rem' },  
          // { header: 'Leave Policy Code', field: 'HEmpl_LPolicy_Code', width: '6rem' },  
          // { header: 'Leave Policy Name', field: 'HEmpl_LPolicy_Name', width: '8rem' }  
        ]
      };


      this.AccountGroupCodeData = {
        id: 'AccGroupCodeData',
        name: 'Account Group',
        TableData: this.popUpService.popUpData,
        columns: [
          { header: 'Account Group SysID', field: 'HMAccGroup_SysID', width: '2rem' },
          { header: 'Account Group Code', field: 'HMAccGroup_Code', width: '6rem' },
          { header: 'Account Group Name', field: 'HMAccGroup_Name', width: '6rem' },
        ]
      };


      this.EmployeeData = {
        id: 'Employee',
        name: 'Employee Details',
        TableData: [
          { HEmpl_SysID: 1, HEmpl_Code: 'EMP101', HEmpl_Name: 'John Doe', HEmpl_Group_SysID: 1, HEmpl_Group_Code: 'GRP001', HEmpl_Group_Name: 'Manufacturing', HEmpl_Categ_SysID: 1, HEmpl_Categ_Code: 'CAT001', HEmpl_Categ_Name: 'Technician', HEmpl_Modu_SysID: 1, HEmpl_Modu_Code: 'MOD001', HEmpl_Modu_Name: 'Welding', HEmpl_Type_SysID: 1, HEmpl_Type_Code: 'TYP001', HEmpl_Type_Name: 'Full-Time', HEmpl_Acc_SysID: 1, HEmpl_Acc_Code: 'ACC001', HEmpl_Acc_Name: 'Payroll', HEmpl_LPolicy_SysID: 1, HEmpl_LPolicy_Code: 'LPO001', HEmpl_LPolicy_Name: 'Standard Leave' },
          { HEmpl_SysID: 2, HEmpl_Code: 'EMP102', HEmpl_Name: 'Jane Smith', HEmpl_Group_SysID: 2, HEmpl_Group_Code: 'GRP002', HEmpl_Group_Name: 'Assembly', HEmpl_Categ_SysID: 2, HEmpl_Categ_Code: 'CAT002', HEmpl_Categ_Name: 'Operator', HEmpl_Modu_SysID: 2, HEmpl_Modu_Code: 'MOD002', HEmpl_Modu_Name: 'Assembly Line', HEmpl_Type_SysID: 2, HEmpl_Type_Code: 'TYP002', HEmpl_Type_Name: 'Contract', HEmpl_Acc_SysID: 2, HEmpl_Acc_Code: 'ACC002', HEmpl_Acc_Name: 'HR', HEmpl_LPolicy_SysID: 2, HEmpl_LPolicy_Code: 'LPO002', HEmpl_LPolicy_Name: 'Flexible Leave' }
        ],
        columns: [
          { header: 'System ID', field: 'HEmpl_SysID', width: '2rem' },
          { header: 'Employee Code', field: 'HEmpl_Code', width: '6rem' },
          { header: 'Employee Name', field: 'HEmpl_Name', width: '8rem' },
          // { header: 'Group Code', field: 'HEmpl_Group_Code', width: '6rem' },  
          // { header: 'Group Name', field: 'HEmpl_Group_Name', width: '8rem' },  
          // { header: 'Category Code', field: 'HEmpl_Categ_Code', width: '6rem' },  
          // { header: 'Category Name', field: 'HEmpl_Categ_Name', width: '8rem' },  
          { header: 'Module Code', field: 'HEmpl_Modu_Code', width: '6rem' },
          { header: 'Module Name', field: 'HEmpl_Modu_Name', width: '8rem' },
          // { header: 'Type Code', field: 'HEmpl_Type_Code', width: '6rem' },  
          // { header: 'Type Name', field: 'HEmpl_Type_Name', width: '8rem' },  
          // { header: 'Account Code', field: 'HEmpl_Acc_Code', width: '6rem' },  
          // { header: 'Account Name', field: 'HEmpl_Acc_Name', width: '8rem' },  
          // { header: 'Leave Policy Code', field: 'HEmpl_LPolicy_Code', width: '6rem' },  
          // { header: 'Leave Policy Name', field: 'HEmpl_LPolicy_Name', width: '8rem' }  
        ]
      };

      this.EmployeeModuleData = {
        id: 'EmployeeModule',
        name: 'Employee Details',
        TableData: [
          { HEmpl_SysID: 1, HEmpl_Code: 'EMP101', HEmpl_Name: 'John Doe', HEmpl_Group_SysID: 1, HEmpl_Group_Code: 'GRP001', HEmpl_Group_Name: 'Manufacturing', HEmpl_Categ_SysID: 1, HEmpl_Categ_Code: 'CAT001', HEmpl_Categ_Name: 'Technician', HEmpl_Modu_SysID: 1, HEmpl_Modu_Code: 'MOD001', HEmpl_Modu_Name: 'Welding', HEmpl_Type_SysID: 1, HEmpl_Type_Code: 'TYP001', HEmpl_Type_Name: 'Full-Time', HEmpl_Acc_SysID: 1, HEmpl_Acc_Code: 'ACC001', HEmpl_Acc_Name: 'Payroll', HEmpl_LPolicy_SysID: 1, HEmpl_LPolicy_Code: 'LPO001', HEmpl_LPolicy_Name: 'Standard Leave' },
          { HEmpl_SysID: 2, HEmpl_Code: 'EMP102', HEmpl_Name: 'Jane Smith', HEmpl_Group_SysID: 2, HEmpl_Group_Code: 'GRP002', HEmpl_Group_Name: 'Assembly', HEmpl_Categ_SysID: 2, HEmpl_Categ_Code: 'CAT002', HEmpl_Categ_Name: 'Operator', HEmpl_Modu_SysID: 2, HEmpl_Modu_Code: 'MOD002', HEmpl_Modu_Name: 'Assembly Line', HEmpl_Type_SysID: 2, HEmpl_Type_Code: 'TYP002', HEmpl_Type_Name: 'Contract', HEmpl_Acc_SysID: 2, HEmpl_Acc_Code: 'ACC002', HEmpl_Acc_Name: 'HR', HEmpl_LPolicy_SysID: 2, HEmpl_LPolicy_Code: 'LPO002', HEmpl_LPolicy_Name: 'Flexible Leave' }
        ],
        columns: [
          { header: 'System ID', field: 'HEmpl_SysID', width: '2rem' },
          // { header: 'Employee Code', field: 'HEmpl_Code', width: '6rem' },  
          // { header: 'Employee Name', field: 'HEmpl_Name', width: '8rem' },  
          // { header: 'Group Code', field: 'HEmpl_Group_Code', width: '6rem' },  
          // { header: 'Group Name', field: 'HEmpl_Group_Name', width: '8rem' },  
          // { header: 'Category Code', field: 'HEmpl_Categ_Code', width: '6rem' },  
          // { header: 'Category Name', field: 'HEmpl_Categ_Name', width: '8rem' },  
          { header: 'Module Code', field: 'HEmpl_Modu_Code', width: '6rem' },
          { header: 'Module Name', field: 'HEmpl_Modu_Name', width: '8rem' },
          // { header: 'Type Code', field: 'HEmpl_Type_Code', width: '6rem' },  
          // { header: 'Type Name', field: 'HEmpl_Type_Name', width: '8rem' },  
          // { header: 'Account Code', field: 'HEmpl_Acc_Code', width: '6rem' },  
          // { header: 'Account Name', field: 'HEmpl_Acc_Name', width: '8rem' },  
          // { header: 'Leave Policy Code', field: 'HEmpl_LPolicy_Code', width: '6rem' },  
          // { header: 'Leave Policy Name', field: 'HEmpl_LPolicy_Name', width: '8rem' }  
        ]
      };
      this.AccrualMasterData = {
        id: 'AccrualMaster',
        name: 'Accrual Master Details',
        TableData: [
          { HAccru_SysID: 1, HAccru_Code: "ACR001", HAccru_Name: "Accrual Type A" },
          { HAccru_SysID: 2, HAccru_Code: "ACR002", HAccru_Name: "Accrual Type B" },
          { HAccru_SysID: 3, HAccru_Code: "ACR003", HAccru_Name: "Accrual Type C" },
          { HAccru_SysID: 4, HAccru_Code: "ACR004", HAccru_Name: "Accrual Type D" },
          { HAccru_SysID: 5, HAccru_Code: "ACR005", HAccru_Name: "Accrual Type E" }
        ],
        columns: [
          { header: 'Accrual System ID', field: 'HAccru_SysID', width: '2rem' },
          { header: 'Accrual Code', field: 'HAccru_Code', width: '2rem' },
          { header: 'Accrual Name', field: 'HAccru_Name', width: '3rem' }
        ]
      }


      this.PrepaidMasterData = {
        id: 'PrepaidMaster',
        name: 'Prepaid Master Details',
        TableData: [
          { HPre_SysID: 1, HPre_Code: "ACR001", HPre_Name: "Prepaid Type A" },
          { HPre_SysID: 2, HPre_Code: "ACR002", HPre_Name: "Prepaid Type B" },
          { HPre_SysID: 3, HPre_Code: "ACR003", HPre_Name: "Prepaid Type C" },
          { HPre_SysID: 4, HPre_Code: "ACR004", HPre_Name: "Prepaid Type D" },
          { HPre_SysID: 5, HPre_Code: "ACR005", HPre_Name: "Prepaid Type E" }
        ],
        columns: [
          { header: 'Prepaid System ID', field: 'HPre_SysID', width: '2rem' },
          { header: 'Prepaid Code', field: 'HPre_Code', width: '2rem' },
          { header: 'Prepaid Name', field: 'HPre_Name', width: '3rem' }
        ]
      }

      this.TaxReferanceData = {
        id: 'TaxReferanceCode',
        name: 'Tax Referance Details',
        TableData: [
          { code: "TAX001", name: "Value Added Tax (VAT)" },
          { code: "TAX002", name: "Goods & Services Tax (GST)" },
          { code: "TAX003", name: "Service Tax" },
          { code: "TAX004", name: "Sales Tax" },
          { code: "TAX005", name: "Corporate Tax" },
          { code: "TAX006", name: "Excise Duty" },
          { code: "TAX007", name: "Custom Duty" },
          { code: "TAX008", name: "Import Tax" },
        ],
        columns: [
          { header: 'Tax Referance Code', field: 'code', width: '2rem' },
          { header: 'Tax Referance Name', field: 'name', width: '6rem' },

        ]
      };
      this.ReferanceData = {
        id: 'ReferanceCode',
        name: ' Referance Details',
        TableData: [
          { code: "TAX001", name: "Value Added Tax (VAT)" },
          { code: "TAX002", name: "Goods & Services Tax (GST)" },
          { code: "TAX003", name: "Service Tax" },
          { code: "TAX004", name: "Sales Tax" },
          { code: "TAX005", name: "Corporate Tax" },
          { code: "TAX006", name: "Excise Duty" },
          { code: "TAX007", name: "Custom Duty" },
          { code: "TAX008", name: "Import Tax" },
        ],
        columns: [
          { header: ' Referance Code', field: 'code', width: '2rem' },
          { header: 'Referance Name', field: 'name', width: '6rem' },

        ]
      };
      this.FixAssetsCodeData = {
        id: 'FixAssetsCode',
        name: ' Fix Assets Code Details',
        TableData: [
          { "code": "FA-001", "name": "Office Desk" },
          { "code": "FA-002", "name": "Laptop - Dell XPS 15" },
          { "code": "FA-003", "name": "Projector - Epson EB-X49" },
          { "code": "FA-004", "name": "Conference Room Table" },
          { "code": "FA-005", "name": "Air Conditioner - Daikin 1.5 Ton" },
          { "code": "FA-006", "name": "Office Chair - Ergonomic" },
          { "code": "FA-007", "name": "Printer - HP LaserJet Pro" },
        ],
        columns: [
          { header: ' Fix  Assets Code', field: 'code', width: '2rem' },
          { header: 'Fix  Assets Name', field: 'name', width: '6rem' },

        ]
      };

      this.DepreciationExpensesCodeData = {
        id: 'DepreciationExpensesCode',
        name: ' Depreciation Expenses Code Details',
        TableData: [
          { DFixAss_DepCode: "DEP001", DFixAss_DepName: "Building Depreciation" },
          { DFixAss_DepCode: "DEP002", DFixAss_DepName: "Machinery Depreciation" },
          { DFixAss_DepCode: "DEP003", DFixAss_DepName: "Vehicle Depreciation" },
          { DFixAss_DepCode: "DEP004", DFixAss_DepName: "Equipment Depreciation" },
          { DFixAss_DepCode: "DEP005", DFixAss_DepName: "Furniture Depreciation" }
        ],
        columns: [
          { header: ' Depreciation  Expenses Code', field: 'DFixAss_DepCode', width: '2rem' },
          { header: 'Depreciation  Expenses name', field: 'DFixAss_DepName', width: '6rem' },

        ]
      };


      this.UnitData = {
        id: 'Unit',
        name: 'Unit Details',
        TableData: [
          { Unit_SysID: 1, Unit_Code: 'U001', Unit_Name: 'Kilogram' },
          { Unit_SysID: 2, Unit_Code: 'U002', Unit_Name: 'Litre' },
          { Unit_SysID: 3, Unit_Code: 'U003', Unit_Name: 'Meter' },
          { Unit_SysID: 4, Unit_Code: 'U004', Unit_Name: 'Piece' },
          { Unit_SysID: 5, Unit_Code: 'U005', Unit_Name: 'Box' }
        ],
        columns: [
          { header: 'Unit Code', field: 'Unit_Code', width: '2rem' },
          { header: 'Unit Name', field: 'Unit_Name', width: '6rem' }
        ]
      };



      this.UsrRoleCodeData = {
        id: 'UsrRoleCode',
        name: 'User Role Details',
        TableData: [
          { User_SysID: 101, User_Code: 'CEO001', User_Name: 'Grace Thompson' },
          { User_SysID: 102, User_Code: 'ACC001', User_Name: 'Thomas Glenn' },
          { User_SysID: 103, User_Code: 'ACC002', User_Name: 'Shyla Mathews' },
          { User_SysID: 104, User_Code: 'SLM001', User_Name: 'Kiran Rao' },
          { User_SysID: 105, User_Code: 'SLM002', User_Name: 'Tanvir Sheikh' },
          { User_SysID: 106, User_Code: 'STR001', User_Name: 'Denison Paul' },
        ],
        columns: [
          { header: 'User Role Code', field: 'User_Code', width: '2rem' },
          { header: 'User Role Name', field: 'User_Name', width: '6rem' }
        ]
      };

      this.UsrLanguageCodeData = {
        id: 'UsrLanguageCode',
        name: 'User Language Details',
        TableData: [
          { Language_SysID: 1, Language_Code: 'EN', Language_Name: 'English' },
          { Language_SysID: 2, Language_Code: 'FR', Language_Name: 'French' },
          { Language_SysID: 3, Language_Code: 'ES', Language_Name: 'Spanish' },
          { Language_SysID: 4, Language_Code: 'DE', Language_Name: 'German' },
          { Language_SysID: 5, Language_Code: 'ZH', Language_Name: 'Chinese' },
        ],
        columns: [
          { header: 'User Language Code', field: 'Language_Code', width: '2rem' },
          { header: 'User Language Name', field: 'Language_Name', width: '6rem' }
        ]
      };

      this.UsrEmpCodeData = {
        id: 'UsrEmpCode',
        name: 'User Employee  Details',
        TableData: [
          { Employee_SysID: 1, Employee_Code: 'EMP001', Employee_Name: 'Grace Thompson' },
          { Employee_SysID: 2, Employee_Code: 'EMP002', Employee_Name: 'Thomas Glenn' },
          { Employee_SysID: 3, Employee_Code: 'EMP003', Employee_Name: 'Shyla Mathews' },
          { Employee_SysID: 4, Employee_Code: 'EMP004', Employee_Name: 'Kiran Rao' },
          { Employee_SysID: 5, Employee_Code: 'EMP005', Employee_Name: 'Tanvir Sheikh' },
          { Employee_SysID: 6, Employee_Code: 'EMP006', Employee_Name: 'Denison Paul' },
          { Employee_SysID: 7, Employee_Code: 'EMP007', Employee_Name: 'K. Grewal' },
        ],
        columns: [
          { header: 'User Employee Code', field: 'Employee_Code', width: '2rem' },
          { header: 'User Employee Name', field: 'Employee_Name', width: '6rem' }
        ]
      };



      this.validationscreencodeData = {
        id: 'validationscreencode',
        name: 'Validation Screen code Details',
        TableData: [
          { sysId: 1001, code: 'VAL001', name: 'Customer Validation' },
          { sysId: 1002, code: 'VAL002', name: 'Vendor Validation' },
          { sysId: 1003, code: 'VAL003', name: 'Inventory Check' },
          { sysId: 1004, code: 'VAL004', name: 'Invoice Matching' },
          { sysId: 1005, code: 'VAL005', name: 'Delivery Confirmation' },
          { sysId: 1006, code: 'VAL006', name: 'Tax Validation' },
          { sysId: 1007, code: 'VAL007', name: 'Payment Reconciliation' }
        ],
        columns: [
          { header: 'Validation SysID', field: 'sysId', width: '4rem' },
          { header: 'Validation Code', field: 'code', width: '4rem' },
          { header: 'Validation Name', field: 'name', width: '10rem' },
        ],
      };
      this.printFormatCodeData = {
        id: 'printFormatCode',
        name: 'Print Format  code Details',
        TableData: this.tableData,
        columns: [
          { header: 'Print Format SysID', field: 'HPFormat_SysID', width: '4rem' },
          { header: 'Print Format Code', field: 'HPFormat_Code', width: '4rem' },
          { header: 'Print Format  Name', field: 'HPFormat_Name', width: '10rem' },
        ],
      };


      this.salesGroupSelectionData = {
        id: 'salesGroupSelection',
        name: 'Selection Group Details',
        TableData: [
          { code: 'SG001', name: 'North Region Sales' },
          { code: 'SG002', name: 'South Region Sales' },
          { code: 'SG003', name: 'East Region Sales' },
          { code: 'SG004', name: 'West Region Sales' },
          { code: 'SG005', name: 'Online Sales Group' },
        ],
        columns: [
          { header: 'Sales Group Code', field: 'code', width: '4rem' },
          { header: 'Sales Group Name', field: 'name', width: '10rem' },
        ],
      };






      this.TransactionMenuData = {
        id: 'TransactionMenuCode',
        name: 'Transaction Menu Code Details',
        TableData: this.tableData,
        columns: [
          { header: 'Transaction Menu SysID', field: 'HMenu_SysID', width: '4rem' },
          { header: 'Transaction Menu Code', field: 'HMenu_Code', width: '4rem' },
          { header: 'Transaction Menu Name', field: 'HMenu_Name', width: '10rem' },
        ],
      };

      // Permanent values used for middle screen.not make changes
      this.ValidationMenuCodeData = {
        id: 'ValidationMenuCode',
        name: 'Validation Menu  and Code Details',
        TableData: [

          { sysId: 1001, code: '5001', name: 'CRM' },
          { sysId: 1002, code: '5002', name: 'Sales Enquiry' },
          { sysId: 1003, code: '5003', name: 'Sales Order' },
          { sysId: 1004, code: '5004', name: 'Inter Co Sales Order' },
          { sysId: 1005, code: '5005', name: 'Delivery Notes' },
          { sysId: 1006, code: '5006', name: 'Inter Co Sales Order' },
          { sysId: 1007, code: '5007', name: 'Delivery Notes' },
          { sysId: 1008, code: '5009', name: 'Sales Invoice' },
          { sysId: 1009, code: '5010', name: 'Sales Return' },
          { sysId: 1010, code: '5011', name: 'SRM' },
          { sysId: 1011, code: '5012', name: 'Purchase Requisition' },
          { sysId: 1012, code: '5013', name: 'Purchase Enquiry' },
          { sysId: 1013, code: '5014', name: 'Purchase Order' },
          { sysId: 1014, code: '5015', name: 'Inter Co Purchase Order' },
          { sysId: 1015, code: '5016', name: 'Material Receipt Voucher' },
          { sysId: 1016, code: '5017', name: 'Purchase Voucher' },
          { sysId: 1017, code: '5018', name: 'Purchase Return' }
        ],
        columns: [
          { header: 'Validation Menu SysID', field: 'sysId', width: '4rem' },
          { header: 'Validation Menu Code', field: 'code', width: '4rem' },
          { header: 'Validation Menu Name', field: 'name', width: '10rem' },
        ],
      };



      //fixed not need to change
      this.MidValidationMenuCodeData = {
        id: 'MidValidationMenuCode',
        name: 'Master Validation Menu  and Code Details',
        TableData:

          [
            { MiddValid_SysID: 100001, MiddValid_Code: '1000', MiddValid_Name: 'Single Company Creation' },
            { MiddValid_SysID: 100002, MiddValid_Code: '1001', MiddValid_Name: 'Group Company Creation' },

            { MiddValid_SysID: 100003, MiddValid_Code: '1200', MiddValid_Name: 'Transaction Validation Screen' },
            { MiddValid_SysID: 100004, MiddValid_Code: '1201', MiddValid_Name: 'Payroll Validation Screen' },
            { MiddValid_SysID: 100005, MiddValid_Code: '1202', MiddValid_Name: 'Production Validation Screen' },
            { MiddValid_SysID: 100006, MiddValid_Code: '1203', MiddValid_Name: 'Assembly Validation Screen' },
            { MiddValid_SysID: 100007, MiddValid_Code: '1204', MiddValid_Name: 'Menu Master' },
            { MiddValid_SysID: 100008, MiddValid_Code: '1205', MiddValid_Name: 'Authorization Message' },
            { MiddValid_SysID: 100009, MiddValid_Code: '1206', MiddValid_Name: 'Voucher Type' },

            { MiddValid_SysID: 100010, MiddValid_Code: '1301', MiddValid_Name: 'Create Roles' },
            { MiddValid_SysID: 100011, MiddValid_Code: '1302', MiddValid_Name: 'Create Users' },
            { MiddValid_SysID: 100012, MiddValid_Code: '1303', MiddValid_Name: 'Users Login' },
            { MiddValid_SysID: 100013, MiddValid_Code: '1304', MiddValid_Name: 'Users Logout' },
            { MiddValid_SysID: 100014, MiddValid_Code: '1305', MiddValid_Name: 'Change Password' },

            { MiddValid_SysID: 100015, MiddValid_Code: '1401', MiddValid_Name: 'Exit' },

            { MiddValid_SysID: 100016, MiddValid_Code: '1501', MiddValid_Name: 'Account Master One' },
            { MiddValid_SysID: 100017, MiddValid_Code: '1502', MiddValid_Name: 'Account Module' },
            { MiddValid_SysID: 100018, MiddValid_Code: '1503', MiddValid_Name: 'Account Group' },
            { MiddValid_SysID: 100019, MiddValid_Code: '1504', MiddValid_Name: 'Account Type' },
            { MiddValid_SysID: 100020, MiddValid_Code: '1505', MiddValid_Name: 'Area Code' },
            { MiddValid_SysID: 100021, MiddValid_Code: '1506', MiddValid_Name: 'City Code' },
            { MiddValid_SysID: 100022, MiddValid_Code: '1507', MiddValid_Name: 'Country Code' },

            { MiddValid_SysID: 100023, MiddValid_Code: '1601', MiddValid_Name: 'Supplier Category' },

            { MiddValid_SysID: 100024, MiddValid_Code: '1701', MiddValid_Name: 'LC Creation' },
            { MiddValid_SysID: 100025, MiddValid_Code: '1702', MiddValid_Name: 'LC Issuing Bank Code' },
            { MiddValid_SysID: 100026, MiddValid_Code: '1703', MiddValid_Name: 'LC Advising Bank' },
            { MiddValid_SysID: 100027, MiddValid_Code: '1704', MiddValid_Name: 'LC Negotiating Bank' },

            { MiddValid_SysID: 100028, MiddValid_Code: '1801', MiddValid_Name: 'Product' },
            { MiddValid_SysID: 100029, MiddValid_Code: '1802', MiddValid_Name: 'Product Unit Master' },
            { MiddValid_SysID: 100030, MiddValid_Code: '1803', MiddValid_Name: 'Product Group' },
            { MiddValid_SysID: 100031, MiddValid_Code: '1804', MiddValid_Name: 'Product Module' },
            { MiddValid_SysID: 100032, MiddValid_Code: '1805', MiddValid_Name: 'Purchase Rate Agreement' },
            { MiddValid_SysID: 100033, MiddValid_Code: '1806', MiddValid_Name: 'Message Master' },

            { MiddValid_SysID: 100034, MiddValid_Code: '1901', MiddValid_Name: 'Remark Master' },
            { MiddValid_SysID: 100035, MiddValid_Code: '1902', MiddValid_Name: 'Narration Master' },
            { MiddValid_SysID: 100036, MiddValid_Code: '1903', MiddValid_Name: 'Active &Deactivate' },
            { MiddValid_SysID: 100037, MiddValid_Code: '1904', MiddValid_Name: 'Amendment' },
            { MiddValid_SysID: 100038, MiddValid_Code: '1905', MiddValid_Name: 'Voucher Type' },
            { MiddValid_SysID: 100039, MiddValid_Code: '1906', MiddValid_Name: 'Inter Company Message' },

            { MiddValid_SysID: 100040, MiddValid_Code: '2000', MiddValid_Name: 'Menu Code' },

            { MiddValid_SysID: 100041, MiddValid_Code: '2100', MiddValid_Name: 'Cost Center' },
            { MiddValid_SysID: 100042, MiddValid_Code: '2101', MiddValid_Name: 'Profit Center' },
            { MiddValid_SysID: 100043, MiddValid_Code: '2102', MiddValid_Name: 'Salesman ' },
            { MiddValid_SysID: 100044, MiddValid_Code: '2103', MiddValid_Name: 'Division' },
            { MiddValid_SysID: 100045, MiddValid_Code: '2104', MiddValid_Name: 'Department' },
            { MiddValid_SysID: 100046, MiddValid_Code: '2105', MiddValid_Name: 'Other Centre ' },

            { MiddValid_SysID: 100041, MiddValid_Code: '2106', MiddValid_Name: 'Sales Organization' },
            { MiddValid_SysID: 100042, MiddValid_Code: '2107', MiddValid_Name: 'Distribution Chanel' },
            { MiddValid_SysID: 100043, MiddValid_Code: '2108', MiddValid_Name: 'Sales Office ' },
            { MiddValid_SysID: 100044, MiddValid_Code: '2109', MiddValid_Name: 'Sales Group ' },
            { MiddValid_SysID: 100045, MiddValid_Code: '2110', MiddValid_Name: 'Place of Supply ' },
            { MiddValid_SysID: 100046, MiddValid_Code: '2111', MiddValid_Name: 'Jurisdiction ' },
            { MiddValid_SysID: 100047, MiddValid_Code: '2112', MiddValid_Name: 'Warehouse' },











          ]

        ,
        columns: [
          { header: 'Validation Menu SysID', field: 'MiddValid_SysID', width: '4rem' },
          { header: 'Validation Menu Code', field: 'MiddValid_Code', width: '4rem' },
          { header: 'Validation Menu Name', field: 'MiddValid_Name', width: '10rem' },
        ],
      };




      this.ApplicationDateCodeData = {
        id: 'ApplicationDateCode',
        name: 'Application Date Details',
        TableData: this.tableData,
        columns: [
          { header: 'Application Date SysID', field: 'HAppDate_SysID', width: '4rem' },
          { header: 'Application Date Code', field: 'HAppDate_Code', width: '4rem' },
          { header: 'Application Date Name', field: 'HAppDate_Name', width: '6rem' },
        ],
      };

      this.showDialog = state;
    });




    this.lookupService.popupType$.subscribe((type) => {
      this.popupType = type;
      if (this.popupType) {
        setTimeout(() => {

          this.ShowPopUp(this.popupType);
        }, 50);
      }
    });
  }


  closeDialog() {
    this.searchString = ''
    this.lookupService.closeDialog();
    this.popUpData = []

  }

  chooseLookup(rowData: any) {
    this.backClick.emit(rowData)
    this.closeDialog();

  }

  ShowPopUp(Type) {
    if (Type == 'EmployeeGroupCode') {
      this.popUpData = this.EmployeeGroupCodeData
    }

    if (Type == 'VocherType') {
      this.popUpData = this.VocherTypeData
    }
    else if (Type == 'SalesAccount') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'CustomerCode') {
      this.popUpData = this.AccountGroupCompanyWise

    }
    else if (Type == 'ShippedTo') {
      this.popUpData = this.ShippedToData

    }
    else if (Type == 'BilledTo') {
      this.popUpData = this.BilledToData

    }
    else if (Type == 'NarrationCode') {
      this.popUpData = this.NarrationCodeData

    }
    else if (Type == 'ProductModuleCode') {
      this.popUpData = this.ProductModuleData

    }
    else if (Type == 'CurrencyCode') {
      this.popUpData = this.CurrencyCodeData

    }
    else if (Type == 'ExpDefaultCurrencyCode') {
      this.popUpData = this.CurrencyCodeData
    }
    else if (Type == 'LandedExpDefaultCurrencyCode') {
      this.popUpData = this.CurrencyCodeData
    }
    else if (Type == 'SalesAgreement') {
      this.popUpData = this.SalesAgreementData

    }
    else if (Type == 'PurchaseAgreement') {
      this.popUpData = this.PurchaseAgreementData

    }
    else if (Type == 'CopyDocFromTemplateCode') {
      this.popUpData = this.CopyDocFromTemplateCodeData

    }
    else if (Type == 'PaymentTerms') {
      this.popUpData = this.PaymentTermsData

    }
    else if (Type == 'PaymentCode') {
      this.popUpData = this.PaymentTermsData

    }
    else if (Type == 'IncoTerms') {
      this.popUpData = this.IncoTermsData

    }
    else if (Type == 'TaxCode') {
      this.popUpData = this.TaxCodeData
    }
    else if (Type == 'DTaxCode') {
      this.popUpData = this.TaxCodeData
    }
    else if (Type == 'TaxACode') {
      this.popUpData = this.TaxCodeData
    }
    else if (Type == 'TaxAddAccountCode') {
      this.popUpData = this.AccountGroupCompanyWise

    }
    else if (Type == 'TaxAccountCodeCode') {
      this.popUpData = this.TaxAccountCodeCodeData

    }

    else if (Type == 'ExpAccountCode') {
      this.popUpData = this.AccountGroupCompanyWise

    }
    else if (Type === 'ExpNarrationCode') {
      this.popUpData = this.NarrationCodeData
    }


    else if (Type == 'LandedExpAccountCode') {
      this.popUpData = this.AccountGroupCompanyWise

    }
    else if (Type === 'LandedExpNarrationCode') {
      this.popUpData = this.NarrationCodeData
    }



    else if (Type === 'VesClearingAgent') {
      this.popUpData = this.VesClearingAgentData;
    }
    else if (Type === 'VesClearingAgent') {
      this.popUpData = this.VesClearingAgentData;
    }

    else if (Type === 'CityCode') {
      this.popUpData = this.CityCodeData;
    }
    else if (Type === 'CountryCode') {
      this.popUpData = this.CountryCodeData;
    }

    else if (Type === 'CityCode2') {
      this.popUpData = this.CityCodeData
    }
    else if (Type === 'CountryCode2') {
      this.popUpData = this.CountryCodeData;
    }

    else if (Type === 'AreaCode') {
      this.popUpData = this.AreaCodeData;
    }

    else if (Type === 'AreaCode2') {
      this.popUpData = this.AreaCodeData
    }

    else if (Type === 'AccTypeCode') {
      this.popUpData = this.AccTypeCodeData;
    }

    else if (Type === 'AccTypeCode2') {
      this.popUpData = this.AccTypeCodeData;
    }

    else if (Type === 'AccModuleCode') {
      this.popUpData = this.AccountModule
    }
    else if (Type === 'AccGroupCode') {
      this.popUpData = this.AccountGroup
    }
    else if (Type === 'AccTaxableCode') {
      this.popUpData = this.AccTaxableCodeData;
    }

    else if (Type === 'BankAccTypeCode') {
      this.popUpData = this.BankAccTypeCodeData;
    }

    else if (Type === 'TaxNarrationCode') {
      this.popUpData = this.NarrationCodeData
    }

    else if (Type == 'AccountCode') {
      this.popUpData = this.AccountCodeData

    }
    else if (Type == 'DetailAccountCode') {
      this.popUpData = this.AccountCodeData

    }


    else if (Type === 'CostCenterCode') {
      this.popUpData = this.CostCenterData;
    }
    else if (Type === 'PayrollDesignationCode') {
      this.popUpData = this.payrolldesignationcodeData;
    }
    else if (Type === 'ProfitCenterCode') {
      this.popUpData = this.ProfitCenterData;
    }
    else if (Type === 'SalesmanCode') {
      this.popUpData = this.SalesmanData;
    }
    else if (Type === 'DivisionCode') {
      this.popUpData = this.DivisionData;
    }
    else if (Type === 'DepartmentCode') {
      this.popUpData = this.DepartmentData;
    }
    else if (Type === 'EmployeeModuleCode') {
      this.popUpData = this.EmployeeModuleData;
    }
    else if (Type === 'EmployeeModule') {
      this.popUpData = this.EmployeeModuleData;
    }

    else if (Type === 'JobCode') {
      this.popUpData = this.JobData;
    }
    else if (Type === 'OtherCentreCode') {
      this.popUpData = this.OtherCentreData;
    }
    else if (Type === 'SalesOrganizationCode') {
      this.popUpData = this.SalesOrganizationData;
    }
    else if (Type === 'DistributionChannelCode') {
      this.popUpData = this.DistributionChannelData;
    }
    else if (Type === 'SalesOfficeCode') {
      this.popUpData = this.SalesOfficeData;
    }
    else if (Type === 'SalesGroupCode') {
      this.popUpData = this.SalesGroupData;
    }
    // else if (Type === 'selectionSalesGroupCode') {
    //   this.popUpData = this.SalesGroupData;
    // }

    else if (Type === 'PlaceOfSupplyCode') {
      this.popUpData = this.PlaceOfSupplyData;
    }

    else if (Type === 'CityCodeDataPopUp') {
      this.popUpData = this.CityCodeDataPop;
    }

    else if (Type === 'CityCodeDataPopUp2') {
      this.popUpData = this.CityCodeDataPop;
    }
    else if (Type === 'CityCodeDataPopUp3') {
      this.popUpData = this.CityCodeDataPop;
    }
    else if (Type === 'CityCodeDataPopUp4') {
      this.popUpData = this.CityCodeDataPop;
    }
    else if (Type === 'CityCodeDataPopUp5') {
      this.popUpData = this.CityCodeDataPop;
    }
    else if (Type === 'CityCodeDataPopUp6') {
      this.popUpData = this.CityCodeDataPop;
    }
    else if (Type === 'CityCodeDataPopUp7') {
      this.popUpData = this.CityCodeDataPop;
    }
    else if (Type === 'CityCodeDataPopUp8') {
      this.popUpData = this.CityCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp2') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp3') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp4') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp5') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp6') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp7') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'CountryCodeDataPopUp8') {
      this.popUpData = this.CountryCodeDataPop;
    }
    else if (Type === 'JurisdictionCode') {
      this.popUpData = this.JurisdictionData;
    }
    else if (Type === 'MrvSingleBatchNumber') {
      this.popUpData = this.MrvSingleBatchNumberData;
    }
    else if (Type === 'MrvMultipleBatchNumber') {
      this.popUpData = this.MrvMultipleBatchNumberData;
    }
    else if (Type === 'WarehouseCode') {
      this.popUpData = this.WarehouseData;
    }
    else if (Type === 'ProductCode') {
      this.popUpData = this.ProductData;
    }
    else if (Type === 'InterCompanyTransType') {
      this.popUpData = this.InterCompanyTransTypeData;
    }
    else if (Type === 'InterCoNarrationCode') {
      this.popUpData = this.InterCoNarrationCodeData;
    }
    else if (Type === 'EmployeeAccountCode') {
      this.popUpData = this.EmployeeAccountData;
    }
    else if (Type === 'PostingHCode') {
      this.popUpData = this.PostingHCodeData;
    }
    else if (Type === 'PostingDCode') {
      this.popUpData = this.PostingDCodeData;
    }
    else if (Type === 'DebitAccountFirstCode') {
      this.popUpData = this.debitAccountFirstCodeData;
    }
    else if (Type === 'CreditAccountSecondCode') {
      this.popUpData = this.creditAccountSecondCodeData;
    }
    else if (Type === 'FieldAlertCode') {
      this.popUpData = this.AlertCodeData;
    }
    else if (Type === 'FieldNarrationCode') { //Popup For FieldNarrationCode in 'Form Parameters' Tab tab 
      this.popUpData = this.NarrationCodeData;
    }
    else if (Type === 'FieldMasterCode') {  //Popup For FieldMasterCode in 'Form Parameters' Tab tab 
      this.popUpData = this.FieldMasterCodeData;
    }
    else if (Type === 'TabFormCode') {   //Popup For Tab form Code and name in 'Hide or display' Tab tab 
      this.popUpData = this.MenuCodeData;
    }
    else if (Type === 'AuthMsgAlertCode') {
      this.popUpData = this.AuthMsgAlertCodeData;
    }
    else if (Type === 'RejectMsgAlertCode') {
      this.popUpData = this.RejectMsgAlertCodeData;
    }
    else if (Type === 'AuthMsgEmpCode') {
      this.popUpData = this.AuthMsgEmpCodeData;
    }
    else if (Type === 'RejectMsgEmpCode') {
      this.popUpData = this.RejectMsgEmpCodeData;
    }
    else if (Type === 'DocAlertCode') {
      this.popUpData = this.AlertCodeData;
    }
    else if (Type === 'DocEmployeeCode') {
      this.popUpData = this.EmployeeCodeData;
    }
    else if (Type === 'DocDocumnetCode') {
      this.popUpData = this.DocumentCodeData;
    }
    else if (Type === 'VesFactoryCode') {
      this.popUpData = this.VesFactoryCodeData;

    }
    else if (Type === 'VesProdPlantCode') {
      this.popUpData = this.VesProdPlantCodeData;
    }
    else if (Type === 'VesPickupPointCode') {
      this.popUpData = this.VesPickupPointCodeData;
    }
    else if (Type === 'VesSwitchBLPortCode') {
      this.popUpData = this.VesSwitchBLPortCodeData;
    }
    else if (Type === 'VesSwitchBLAgent') {
      this.popUpData = this.VesSwitchBLAgentData;
    }
    else if (Type === 'VesBookAgentCode') {
      this.popUpData = this.VesBookAgentCodeData;
    }
    else if (Type === 'VesShipLineCode') {
      this.popUpData = this.VesShipLineCodeData;
    }
    else if (Type === 'VesLoadingPortCode') {
      this.popUpData = this.VesLoadingPortCodeData;
    }
    else if (Type === 'VesTransitPortCode') {
      this.popUpData = this.VesTransitPortCodeData;
    }
    else if (Type === 'VesPortDisCode') {
      this.popUpData = this.VesPortDisCodeData;
    }
    else if (Type === 'VesECSAccCode') {
      this.popUpData = this.VesECSAccCodeData;
    }
    else if (Type === 'VesECSCurrCode') {
      this.popUpData = this.VesECSCurrCodeData;
    }
    else if (Type === 'VesECSRemCode') {
      this.popUpData = this.VesECSRemCodeData;
    }

    else if (Type === 'AccPurAcctypeCode') {
      this.popUpData = this.AccPurAcctypeCodeData;
    }
    else if (Type === 'AccSalesAccCode') {
      this.popUpData = this.AccSalesAccCodeData;
    }
    else if (Type === 'AccCustAccTypeCode') {
      this.popUpData = this.AccCustAccTypeCodeData;
    }
    else if (Type === 'AccVendorAccTypeCode') {
      this.popUpData = this.AccVendorAccTypeCodeData;
    }
    else if (Type === 'AccTaxTypeCode') {
      this.popUpData = this.AccTaxTypeCodeData;
    }
    else if (Type === 'AccDirectExpCode') {
      this.popUpData = this.AccDirectExpCodeData;
    }
    else if (Type === 'ApplicableCompanyCode') {
      this.popUpData = this.ApplicableCompanyCodeData;
    }
    else if (Type === 'ActAndDeactCode') {
      this.popUpData = this.ActAndDeactCodeData;
    }
    else if (Type === 'ActAndDeactCodeCompany') {
      this.popUpData = this.ActAndDeactCodeData;
    }

    else if (Type === 'EmpGrpCodeM') {
      this.popUpData = this.EmpGrpCodeMData;
    }
    else if (Type === 'EmpCataCodeM') {
      this.popUpData = this.EmpCataCodeMData;
    }
    else if (Type === 'EmpTypCodeM') {
      this.popUpData = this.EmpTypCodeMData;
    }
    else if (Type === 'EmpLeavePolCodeM') {
      this.popUpData = this.EmpLeavePolCodeMData;
    }
    else if (Type === 'AlertsEmpCodeM') {
      this.popUpData = this.AlertsEmpCodeMData;
    }
    else if (Type === 'AuthorizerCode') {
      this.popUpData = this.AuthorizerCodeDataData;
    }
    else if (Type === 'SummaryDetail') {
      this.popUpData = this.SummaryDetailData;
    }
    else if (Type === 'OvertimeCalculationCode') {
      this.popUpData = this.OvertimeCalculationCodeData;
    }
    else if (Type === 'GratuityCalculationCode') {
      this.popUpData = this.GratuityCalculationCodeData;
    }
    else if (Type === 'LeaveSalaryCalculationCode') {
      this.popUpData = this.LeaveSalaryCalculationCodeData;
    }
    else if (Type === 'SalaryRemarksCode') {
      this.popUpData = this.SalaryRemarksCodeData;
    }
    else if (Type === 'CriteriaCode') {
      this.popUpData = this.CriteriaCodeData;
    }
    else if (Type === 'FieldHideOrDisCode') {
      this.popUpData = this.HideOrDispFieldData;
    }
    else if (Type === 'TabMenuCode') {
      this.popUpData = this.MenuCodeData;
    }
    else if (Type === 'LinkingFromScreenCode') {
      this.popUpData = this.MenuCodeData;
    }
    else if (Type === 'LinkingToScreenCode') {
      this.popUpData = this.MenuCodeData
    }

    else if (Type === 'CustomerGroupCode') {
      this.popUpData = this.CustomerGroupData;
    }

    else if (Type == 'LcCurrencyCode') {
      this.popUpData = this.LcCurrencyCodeData;
    }
    else if (Type == 'LcIssuingBankCode') {
      this.popUpData = this.LcIssuingBankCodeData;
    }
    else if (Type == 'LcAdvisingBankCode') {
      this.popUpData = this.LcAdvisingBankCodeData;
    }
    else if (Type == 'LcNegotiatingBankCode') {
      this.popUpData = this.LcNegotiatingBankCodeData;
    }

    else if (Type == 'LcAlertCode') {
      this.popUpData = this.LcAlertCodeData;
    }
    else if (Type == 'LcEmpCode') {
      this.popUpData = this.LcEmpCodeData;
    }
    else if (Type == 'EmployeeCategoryCode') {
      this.popUpData = this.EmployeeCategoryData;
    }


    else if (Type == 'GroupCoCode') {
      this.popUpData = this.AccountGroupCompanyWise;
    }

    else if (Type == 'SingleCoCode') {
      this.popUpData = this.SingleCompanyData;
    }

    else if (Type == 'VoucherTypeCode') {
      this.popUpData = this.VoucherTypeCodeData;
    }

    else if (Type == 'VoucherTypeMenuCode') {
      this.popUpData = this.VoucherTypeMenuCodeData;
    }

    else if (Type == 'DocumentVoucherTypeCode') {
      this.popUpData = this.VoucherTypeCodeData;
    }

    else if (Type == 'ProductGroupCode') {
      this.popUpData = this.ProductGroupCodeData;
    }
    else if (Type == 'PriceListGroupCode') {
      this.popUpData = this.PriceListGroupCodeData;
    }


    else if (Type == 'AccountFirstCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'AccountFirstCode2') {
      this.popUpData = this.accountFirstCode2Data;
    }
    else if (Type == 'PaidTo') {
      this.popUpData = this.PaidToData;
    }
    else if (Type == 'RemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }
    else if (Type == 'DInterCoCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TaxableTypeCode') {
      this.popUpData = this.TaxableTypeCodeData;
    }
    else if (Type == 'EmployeeTypeCode') {
      this.popUpData = this.EmployeeTypeData;
    }
    else if (Type == 'LandedCostCode') {
      this.popUpData = this.LandedCostCodeData;
    }
    else if (Type == 'MenuCode') {
      this.popUpData = this.MenuCodeData;
    }
    else if (Type == 'DocumentMenuCode') {
      this.popUpData = this.MenuCodeData;
    }
    else if (Type == 'AccountMenuCode') {
      this.popUpData = this.MenuCodeData;
    }



    else if (Type == 'CorporateTaxAccountGroup') {
      this.popUpData = this.CorporateTaxAccountGroupData
    }
    else if (Type == 'BaseUnit') {
      this.popUpData = this.BaseUnitGroupData
    }
    else if (Type == 'WarehouseOneCode') {
      this.popUpData = this.WarehouseData;
    }
    else if (Type == 'WarehouseTwoCode') {
      this.popUpData = this.WarehouseData;
    }



    else if (Type == 'FirstAccGroup') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'SecondAccGroup') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'AdditionalExpGroup') {
      this.popUpData = this.AdditionalExpGroupData
    }
    else if (Type == 'ExpenseAddToCustSupplier') {
      this.popUpData = this.ExpenseAddToCustSupplierData
    }
    else if (Type == 'InterCoGroup') {
      this.popUpData = this.InterCoGroupData
    }
    //
    else if (Type == 'DirectExpAccGroup') {
      this.popUpData = this.DirectExpAccGroupData
    }
    else if (Type == 'InDirectExpAccGroup') {
      this.popUpData = this.InDirectExpAccGroupData
    }
    //

    else if (Type == 'CustomerAccGroupCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'VendorGroupCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    //
    else if (Type == 'TaxGroup') {
      this.popUpData = this.TaxGroupData
    }
    else if (Type == 'AdditionalTaxGroupOne') {
      this.popUpData = this.AdditionalTaxGroupOneData
    }
    else if (Type == 'AdditionalTaxGroupTwo') {
      this.popUpData = this.AdditionalTaxGroupTwoData
    }
    //
    else if (Type == 'TaxAccGroupCode') {
      this.popUpData = this.TaxAccGroupCodeData
    }
    else if (Type == 'TaxAccGroupOneCode') {
      this.popUpData = this.TaxAccGroupOneCodeData
    }
    else if (Type == 'TaxAccGroupTwoCode') {
      this.popUpData = this.TaxAccGroupTwoCodeData
    }
    //

    else if (Type == 'InventoryAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'CostOfSalesAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'SalesAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'PurcahseAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'VatInputAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'VatOutputAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'VatAdvAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'OtherTaxInputAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'OtherTaxOutputAccCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'SupplierCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'ProductUnit') {
      this.popUpData = this.ProductUnitData
    }
    else if (Type == 'ProductUnit2') {
      this.popUpData = this.ProductUnitData
    }

    else if (Type == 'BomProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'BomProductModule2') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'ProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'ProductCode2') {
      this.popUpData = this.ProductData;
    }
    else if (Type == 'WarehouseOneCode2') {
      this.popUpData = this.WarehouseData;
    }

    else if (Type == 'BomJob') {
      this.popUpData = this.BomJobData
    }
    else if (Type == 'BomProductionBatch') {
      this.popUpData = this.BomProductionBatchData
    }


    else if (Type == 'FinishedGoodsProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'FinishedGoodsProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'FinishedGoodsProductCode') {
      this.popUpData = this.ProductData;
    }
    else if (Type == 'FinishedGoodsWarehouseOneCode') {
      this.popUpData = this.WarehouseData;
    }
    else if (Type == 'FinishedGoodsRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }


    else if (Type == 'EmployeePayrollCode') {
      this.popUpData = this.EmployeePayrollData
    }
    else if (Type == 'EmployeeCode') {
      this.popUpData = this.EmployeeCodeData
    }
    else if (Type == 'AlertEmployeeCode') {
      this.popUpData = this.EmployeeCodeData
    }
    else if (Type == 'JoiningEmployeeCode') {
      this.popUpData = this.EmployeeCodeData
    }

    else if (Type == 'processMaterialsProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'processMaterialsProductModule2') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'processMaterialsProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'processMaterialsProductCode') {
      this.popUpData = this.ProductData;
    }
    else if (Type == 'processMaterialsWarehouseOneCode') {
      this.popUpData = this.WarehouseData;
    }


    else if (Type == 'ConsumablesProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'ConsumablesProductModule2') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'ConsumablesProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'ConsumablesProductCode') {
      this.popUpData = this.ProductData;
    }
    else if (Type == 'ConsumablesWarehouseOneCode') {
      this.popUpData = this.WarehouseData;
    }
    else if (Type == 'LeaveTypeCodeData') {
      this.popUpData = this.LeaveTypeCodeDataCode
    }
    else if (Type == 'LeaveTypeCodeData1') {
      this.popUpData = this.LeaveTypeCodeDataCode
    }




    else if (Type == 'PackingMaterialsProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'PackingMaterialsProductModule2') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'PackingMaterialsProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'PackingMaterialsProductCode') {
      this.popUpData = this.ProductData;
    }
    else if (Type == 'PackingMaterialsWarehouseOneCode') {
      this.popUpData = this.WarehouseData;
    }


    else if (Type == 'ManpowerModule') {
      this.popUpData = this.ManpowerModuleData
    }
    else if (Type == 'ManpowerModule2') {
      this.popUpData = this.ManpowerModuleData
    }
    else if (Type == 'ManpowerProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'ManpowerCode') {
      this.popUpData = this.ManpowerCodeData;
    }
    else if (Type == 'ManpowerRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }


    else if (Type == 'BomEmployeeModule') {
      this.popUpData = this.EmployeeModuleData
    }
    else if (Type == 'BomEmployeeModule2') {
      this.popUpData = this.EmployeeModuleData
    }
    else if (Type === 'BomEmployeeCode') {
      this.popUpData = this.EmployeeData
    }
    else if (Type == 'BomEmpRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }

    else if (Type == 'ScrapProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'ScrapProductModule2') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'ScrapProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'ScrapProductCode') {
      this.popUpData = this.ProductData;
    }
    else if (Type == 'ScrapWarehouseOneCode') {
      this.popUpData = this.WarehouseData;
    }


    else if (Type == 'ExpenseProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'ExpenseProductModule2') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'ExpenseProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'ExpenseAccountFirstCode') {
      this.popUpData = this.accountFirstCodeData;
    }
    else if (Type == 'ExpenseCurrencyCode') {
      this.popUpData = this.CurrencyCodeData
    }
    else if (Type == 'ExpenseNarrationCode') {
      this.popUpData = this.NarrationCodeData
    }

    else if (Type == 'AssemblyMaterialsProductModule') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'AssemblyMaterialsProductModule2') {
      this.popUpData = this.BomProductModuleData
    }
    else if (Type == 'AssemblyMaterialsProductionProcess') {
      this.popUpData = this.ProductionProcessData
    }
    else if (Type === 'AssemblyMaterialsProductCode') {
      this.popUpData = this.ProductData;
    }
    else if (Type == 'AssemblyMaterialsWarehouseOneCode') {
      this.popUpData = this.WarehouseData;
    }

    else if (Type == 'ProcessMaterialsRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }
    else if (Type == 'ConsumablesRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }
    else if (Type == 'PackingMaterialsRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }
    else if (Type == 'ScrapRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }
    else if (Type == 'ExpenseRemarksCode') {
      this.popUpData = this.RemarksCodeData;
    }

    else if (Type == 'SalaryAdditionCode') {
      this.popUpData = this.SalaryAdditionCodeData
    }
    else if (Type == 'AccountAdditionCode') {
      this.popUpData = this.AccountAdditionCodeData
    }
    else if (Type == 'SalaryDeductionCode') {
      this.popUpData = this.SalaryDeductionCodeData
    }
    else if (Type == 'AccountDeductionCode') {
      this.popUpData = this.AccountDeductionCodeData
    }
    else if (Type == 'RemarkCodePayroll') {
      this.popUpData = this.RemarksCodeData
    }
    else if (Type == 'LeaveTypeCode') {
      this.popUpData = this.LeaveTypeCodeData
    }
    else if (Type == 'PolicyRemarkCode') {
      this.popUpData = this.RemarksCodeData
    }
    else if (Type == 'GratuityRemarkCode') {
      this.popUpData = this.RemarksCodeData
    }
    else if (Type == 'LeaveRemarksCode') {
      this.popUpData = this.RemarksCodeData
    }
    else if (Type == 'LeaveSummaryRemarksCode') {
      this.popUpData = this.RemarksCodeData
    }
    else if (Type == 'GratuityTypeCode') {
      this.popUpData = this.GratuityTypeCodeData
    }

    else if (Type == 'AccuralAccountFirstCode') {
      this.popUpData = this.accountFirstCodeData;
    }
    else if (Type == 'AccuralAccountFirstCode2') {
      this.popUpData = this.accountFirstCodeData;
    }
    else if (Type == 'AccuralRemarksCode') {
      this.popUpData = this.RemarksCodeData
    }
    else if (Type == 'RemarksCodeJoining') {
      this.popUpData = this.RemarksCodeData
    }
    else if (Type == 'LeaveApprovedCode') {
      this.popUpData = this.RemarksCodeData
    }

    else if (Type == 'LeavePolicyCode') {
      this.popUpData = this.LeavePolicyCodeData
    }
    else if (Type == 'LeaveTypeCodeData') {
      this.popUpData = this.leaveappTypeCodeData
    }
    else if (Type == 'ApprovalLeaveTypeCode') {
      this.popUpData = this.LeaveTypeCodeData
    }
    else if (Type == 'LeaveSummaryCode') {
      this.popUpData = this.LeaveSummaryCodeData
    }
    else if (Type == 'AccrualMaster') {
      this.popUpData = this.AccrualMasterData
    }
    else if (Type == 'PrepaidMaster') {
      this.popUpData = this.PrepaidMasterData
    }
    else if (Type == 'RemarkCode') {
      this.popUpData = this.RemarkCodeData
    }
    else if (Type == 'RemarkCode1') {
      this.popUpData = this.RemarkCodeData
    }
    else if (Type == ' AttendanceCopyDocFromTemplateCodeData') {
      this.popUpData = this.RemarkCodeData
    }
    else if (Type == ' AttendanceNarrationCode') {
      this.popUpData = this.NarrationCodeData
    }
    else if (Type === 'DetailAccountFirstCode') {
      this.popUpData = this.accountFirstCodeData;
    }
    else if (Type === 'AdditionCode') {
      this.popUpData = this.AdditionCodeData;
    }
    else if (Type === 'TaxReferanceCode') {
      this.popUpData = this.TaxReferanceData;
    }
    else if (Type === 'ReferanceCode') {
      this.popUpData = this.ReferanceData;
    }
    else if (Type === 'AccGroupCodeData') {
      this.popUpData = this.AccountGroupCodeData
    }
    else if (Type === 'DepreciationExpensesCode') {
      this.popUpData = this.DepreciationExpensesCodeData;
    }
    else if (Type === 'FixAssetsCode') {
      this.popUpData = this.FixAssetsCodeData;
    }

    else if (Type == 'CompGrpWiseAccTypeCode') {
      this.popUpData = this.AccTypeCodeData
    }

    else if (Type == 'CompWiseAccModule') {
      this.popUpData = this.AccountModule
    }
    else if (Type == 'CompWiseBankAccTypeCode') {
      this.popUpData = this.AccountGroup
    }
    else if (Type == 'CompWiseGroupCode') {
      this.popUpData = this.AccountGroupCodeData
    }
    else if (Type == 'CompWiseAccTypeCode') {
      this.popUpData = this.AccTypeCodeData
    }
    else if (Type == 'PurchaseAccountCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'CompanySalesCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'CompanyExpenseCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'SupplierCustomerCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }

    else if (Type == 'Unit') {
      this.popUpData = this.UnitData
    }
    // this.ShowLookUp = true
    else if (Type == 'SalesAgreementCode') {
      this.popUpData = this.SalesAgreementData
    }
    else if (Type == 'UsrRoleCode') {
      this.popUpData = this.UsrRoleCodeData
    }
    else if (Type == 'UsrLanguageCode') {
      this.popUpData = this.UsrLanguageCodeData
    }
    else if (Type == 'UsrEmpCode') {
      this.popUpData = this.UsrEmpCodeData
    }
    else if (Type == 'UsrActAndDeactCode') {
      this.popUpData = this.ActAndDeactCodeData
    }
    else if (Type == 'validationscreencode') {
      this.popUpData = this.validationscreencodeData
    }
    else if (Type == 'printFormatCode') {
      this.popUpData = this.printFormatCodeData
    }
    else if (Type == 'PdcConvBankCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }

    else if (Type == 'selectionSalesGroupCode') {
      this.popUpData = this.selectionSalesGroupCodeData
    }

    else if (Type == 'AdditionalExpenseCustomerCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'AdditionalExpenseCurrencyCode') {
      this.popUpData = this.CurrencyCodeData
    }
    else if (Type == 'AdditionalExpenseNarrationCode') {
      this.popUpData = this.NarrationCodeData
    }


    else if (Type == 'AdditionalExpenseVendorCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TaxAccount') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'AdditionalExpenseVendorCurrCode') {
      this.popUpData = this.CurrencyCodeData
    }
    else if (Type == 'AdditionalExpenseVendorNarraCode') {
      this.popUpData = this.NarrationCodeData
    }



    else if (Type == 'TaxGroupOneCode') {
      this.popUpData = this.TaxCodeData
    }
    else if (Type == 'TaxGroupTwoCode') {
      this.popUpData = this.TaxCodeData
    }
    else if (Type == 'TaxGroupThreeCode') {
      this.popUpData = this.TaxCodeData
    }


    else if (Type == 'TblHMBAccDrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TblHMBAccCrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TblHMBPAccDrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TblHMBPAccCrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TblHMPettyDrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TblHMPettyCrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TblHMJouDrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TblHMJouCrCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }



    else if (Type == 'ProfitandLossCode') {
      this.popUpData = this.AccountGroupCompanyWise
    }
    else if (Type == 'TransactionMenuCode') {
      this.popUpData = this.TransactionMenuData
    }
    else if (Type == 'ValidationMenuCode') {
      this.popUpData = this.ValidationMenuCodeData
    }
    else if (Type == 'EmployeeDeptCode') {
      this.popUpData = this.EmployeeDeptCodeData
    }
    else if (Type == 'ShippedToCode') {
      this.popUpData = this.ShippedToData
    }
    else if (Type == 'BilledToCode') {
      this.popUpData = this.BilledToData
    }
    else if (Type == 'ApplicationDateCode') {
      this.popUpData = this.ApplicationDateCodeData
    }
    else if (Type == 'MidValidationMenuCode') {
      this.popUpData = this.MidValidationMenuCodeData
    }

    else if (Type == 'MidTransactionMenuCode') {
      this.popUpData = this.MidValidationMenuCodeData
    }
    else if (Type == 'DocumentCode') {
      this.popUpData = this.DocumentCodeData
    }



    //Manpower billing
    else if (Type == 'customersitecode') {
      this.popUpData = this.customersitecodedata
    }
    else if (Type == 'customersitedetailcode') {
      this.popUpData = this.customersitecodedata
    }

    else if (Type == 'locationcode') {
      this.popUpData = this.locationcodedata
    }
    else if (Type == 'designationcode') {
      this.popUpData = this.designationcodedata
    }
    else if (Type == 'designationcodeclient') {
      this.popUpData = this.designationcodedata
    }
    else if (Type == 'designationcodesite') {
      this.popUpData = this.designationcodedata
    }
    else if (Type == 'jobcreationcode') {
      this.popUpData = this.jobcreationcodedata
    }
    else if (Type == 'remarkscodeclient') {
      this.popUpData = this.RemarksCodeData;
    }
    else if (Type == 'remarkscodesite') {
      this.popUpData = this.RemarksCodeData;
    }
    else if (Type == 'criteriacode') {
      this.popUpData = this.criteriamanpowerdata;
    }

    else if (Type == 'remarkscodecriteria') {
      this.popUpData = this.RemarksCodeData;
    }
  }
  get filteredTableData() {
    if (!this.searchString) {
      return this.popUpData.TableData;
    }
    const searchLower = this.searchString.toLowerCase();
    return this.popUpData.TableData.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(searchLower)
      )
    );
  }
}
