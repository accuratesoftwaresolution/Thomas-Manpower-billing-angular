/*
    Created By  : Arun Joy
    Created On  : 14-01-2020
    Created For : For sepcifying the Api end urls and its filters.
*/

import { OurContactDesignationMasterComponent } from "../_modules/manpower-billing/our-contact-designation-master/our-contact-designation-master.component";

export const apiUrl = {
  login: "auth/signin",
  googleSignIn: "auth/google",
  userInfo: "user/user-info",
  menu: "menu",
  igenmenu: "igenmenu",
  igenconfig: "igen-config",
  // country: "iccountry",
  // area: "icarea",
  areaAll: "icarea/all",
  company: "ico",
  branch: "ibr",
  // division: "idv",
  divisionAll: "idv/all",
  salesman: "icsalesman",
  salesmanAll: "icsalesman/all",
  employeeLov: "ipempmain",
  companyLov: "ico",
  divisionLov: "idv",
  terms: "iiterms",
  // job: "ijjob",
  ijmainjob: "ijmainjob",
  territory: "icterritory",
  companytype: "iccompanytype",
  debtCollector: "icdebtcollector",
  debtCollectorAll: "icdebtcollector/all",
  dept: "idept",
  isetup: "isetup/cash_bank",
  userMaster: "user-master",
  userAccounts: "user-accounts",
  // accountMaster: "account-master",
  accountMaster : "account-master-one",

  iuserpwd: "iuserpwd",
  bank: "ipempbank",
  commondesc: "idescriptions",
  ipempdoc: "ipempdoc",
  item: "iiitem",
  ibrstore: "ibrstore",
  itemMaster: "item-master",
  store: "iistore",
  unit: "iiunit",
  cashBankSetup: "isetup/cash_bank",
  setup: "isetup",
  imodule: "imodule",
  iisoterms: "iisoterms",
  iipoterms: "iipoterms",
  iiterms: "iiterms",
  iicolour: "iicolour",
  aiiterms: "aiiterms",
  iheaderReport: "iheader/report",

  financeSearch: "finance/search",
  financeSearchList: "finance/search-list",
  finance: "finance",

  inventorySearch: "inventory/search",
  inventorySearchList: "inventory/search-list",
  inventory: "inventory",
  tblhareacode: "tblhareacode",

  purchaseOrderSearch: "purchase-order/search",
  purchaseOrderSearchList: "purchase-order/search-list",
  purchaseOrder: "purchase-order",

  nonInventoryPurchase: "non-inv-purchase-order",
  nonInventoryPurchaseList: "non-inv-purchase-order/search-list",
  nonInventoryPurchaseSearch: "non-inv-purchase-order/search",
  salesOrderSearch: "sales-order/search",
  salesOrderSearchList: "sales-order/search-list",
  salesOrder: "sales-order",
  directPurchase: "inventory",
  noninvPurchaseorderSearch: "non-inv-purchase-order/search",
  noninvPurchaseorderSearchList: "non-inv-purchase-order/search-list",
  noninvPurchaseorder: "non-inv-purchase-order",
  stockTransferOut: "stock-transfer-out",
  grnReport: "grn-invoice/report",

  iacat: "iacat",
  iacatgroup: "iacatgroup",
  vatCat: "icvatcat",

  iac1: "iac1",
  iac1All: "iac1/all",
  iac2: "iac2",
  iac3: "iac3",
  iac4: "iac4",
  Iac4bank: "Iac4bank",
  headerAccountsLov: "iac4/header",
  detailAccountsLov: "iac4/detail",
  pendingBills: "finance/pendingBills",
  billAccountsLov: "iac4/bill_Accounts",
  fullAccounts: "iac4/all",

  // iint: "iint", old inetrface admin api
  iint: "inteface-transaction",
  iintobject: "iintobject",
  iintlogic: "iintlogic",
  iintvrno: "iintvrno",
  iintaccounts: "iintfilter/intaccounts",
  iintfilter: "iintfilter",
  iintfilterAccounts: "iintfilter/accounts",

  inventoryReport: "inventory-reports/vr-print",
  vrPrintReports: "report",
  irepparam: "irepparam",

  accountName: "iac4/getAcName",

  grp1: "iigrp1",
  grp2: "iigrp2",
  grp3: "iigrp3",
  grp4: "iigrp4",
  grp5: "iigrp5",
  grp6: "iigrp6",
  grp7: "iigrp7",
  grp8: "iigrp8",

  interfacelogic: "iintlogic",
  interfaceobject: "iintobject",
  igissueSummary: "igissue-summary",
  igIssueDetail: "igissue-detail",
  issueTracker: "public/issue-tracker",
  igIssueDetailPublic: "public/igissue-detail",
  issuetracker: "issue-tracker",

  vatInOut: "icvatinout",
  groupComp: "groupCompany",

  statusChange: "iac4/update-cat-status",
  addressEdit: "iac4/update-address",
  creditLimitEntry: "iac4/update-limit",
  iccreditcard: "iccreditcard",
  iaexpgroupcat: "iaexpgroupcat",
  iaexpheadcat: "iaexpheadcat",
  iaexpgroup: "iaexpgroup",
  iaexphead: "iaexphead",
  iaexpsubgroup: "iaexpsubgroup",

  reportMenuId: "irepparam/menuid",
  reportParam: "irepparam",
  fileUpload: "file-upload/issue-image",
  igdeveloper: "igdeveloper",
  budgetallocation: "iabudget/allocation",
  apempBank: "apempbank",
  apcategory: "apcategory",
  apdepartment: "apdepartment",
  apdesignation: "apdesignation",
  apairsector: "apairsector",
  apempdocument: "apempdocument",
  apattjobheader: "apattjobheader",
  apempstatus: "apempstatus",
  apgrade: "apgrade",
  apempfamily: "apempfamily",
  apempskilllevel: "apempskilllevel",
  apsalheader: "apsalheader",
  apattendanceSalary: "attendance-salary",
  apsalcategory: "apsalcategory",
  apgenattendancedtls: "gen-attendence-dtls",
  apreligion: "apreligion",
  apsaldetail: "apsaldetail",
  aplcdesignation: "aplcdesignation",
  apvisacompany: "apvisacompany",
  apsalaryprocess: "salary-process",
  apempmain: "emp-master",
  apsalpost: "apsalpost",
  apleavetype: "apleavetype",
  payrollReport: "payroll-reports/salary-register",
  apleaveentry: "apleaveentry",
  apleaveentryavailed: "apleaveentry/leave-availed",
  apleaveentryeligible: "apleaveentry/eligible-leaves",



  ///////////thomas ERP



  accountOne: "account-master-one",
  salAgree: "tblhsalagree",
  prodModule: "tblhprodmodule",
  currencyComb: "currency",
  copyDocTemp: "tblhcopydoctemp",
  paymentTerms: "tblhpayterm",
  incoTerms: "inco-terms",
  // tax: "tblhfirsttax",

  product: "product-master",

  authCompanyLov: "auth/company",

  divisionlov: "tblhdivision",
  departmentlov: "tblhdept",
  joblov: "tblhjob",
  otherCenter: "tblhothcentre",
  salesOrglov: "tblhsalesorg",
  distChannel: "tblhdistchanel",
  salesOff: "tblhsoffice",
  salesGrp: "tblhsalgroup",
  placeOfSupply: "tblhplacesupply",
  // jurisdiction:"tblhjurisd",

  hPosting: "tblHPosting",
  dPosting: "tblDPosting",
  fieldAlert: "tblHAlert",
  fieldNarration: "tblHRemMast",
  fieldMaster: "tblHFieldMast",
  tabForm: "tblHTabForm",
  tempLogin: "login",
  prodMaster: "tblhprodmaster",
  remMaster: "tblhremmast",

   tax: "tax-master",

  // currencyMaster:"currency-master",
  prodModuleTransaction: "product-module",



  // Transaction //

  salesEnquiry: "sales-enquiry",

  // Masters Lov //

  areaMaster: "area-master",
  groupCoMaster: "tblhgroupco",
  singleCoMaster: "single-company",
  productmaster: "product",
  currency: "tblhcurrfirst",
  accType: "account-type",
  accModule: "account-module",
  costCenter: "cost-center",
  profitCenter: "profit-center",
  salesMan: "salesman-master",
  division: "division-master",
  department: "department",
  job: "job",
  otherCentre: "other-centre",
  salesOrganization: "sales-organization",
  distributionChannel: "distribution-chanel",
  salesOffice: "sales-office",
  salesGroup: "sales-group",
  placeOfsupply: "place-of-supply",
  jurisdiction: "jurisdiction",
  warehouse: "warehouse",
  narration: "narration",
  copydocTemplate: "copy-doc-from-template",
  area: "area-code",
  city: "city-code",
  country: "country-code",
  suppliercategory: "supplier-category",
  unitmaster: "product-unit-first-master",
  productGroup: "Product-group",
  ProductModule: "product-module",
  messageMaster: "message-master",
  remarksMaster: "remarks",
  voucherType: "voucher-type",
  document: "document",
  applicableDate: "applicable-date",
  currencyMaster: "currency-master",
  corporatTax: "corporate-tax",
  payrollAddition: "payroll-addition",
  payrollDeduction: "payroll-deduction",
  payrollDesignationGroup: "payroll-designation-group",
  billedToMaster: 'billed-to',
  shippedToMaster: 'shipped-to',
  purchaseRateAgreement: 'purchase-rate-agreement',
  salesRateAgreement: 'sales-rate-agreement',
  amendment: 'amendment',
  interCompanyMargin: 'inter-company-margin',
  lcNumber: 'lc-number',
  menuCode: 'menu-code',
  printFormat: 'print-format',
  taxMaster: 'tax-master',
 
  termandConditions: 'terms-and-conditions',
  activateAndDeactivate: 'active-deactivate',
  paymentTermsMaster: 'payment-terms-master',
  TaxMaster : 'tax-master',
  accGroup: 'account-group',
  shippedTo: "shipped-to",
  billedTo: "billed-to",
  LandedCostExpense: "landed-cost-expense",
  alertCode :'alert-code',
  tabDisplayMaster:'tab-display-master',
  fieldHideDisplay:'field-hide-display-master',


  //Masters Documents Uplaod 

  mastersDocumentUpload: 'file-upload/masters-documents',
  mastersDocumentDownload: 'file-upload/masters-documents/:file',
  apiUrl: 'https://api.euroclouderp.com/api/v1',

  //Transaction Documents Uplaod 

  transactionDocumentUpload: 'file-upload/transaction-documents',
  transactionDocumentDownload: 'file-upload/transaction-documents/:file',

  //Single company

  singleCompany: "single-company",

  // logo Upload for single company

  logoupload: 'company-logo',


  // GroupCompany

  groupCompany: "group-company",

  accountGroup: "account-group",
  
  accountGroupMaster:"account-master-one",

  productGroupMaster: "product-group",

  userCreation: "user-creation",

  employeeCreation:"employee-creation",



  //middle screen - Transactions Used Master Data

  SalesMiddleScreen:"transaction-validation-screen",
  MiddleCompany :"transaction-validation-screen/company",
  MiddleVoucherType :"transaction-validation-screen/voucher",
  MiddleSalesAcc :"transaction-validation-screen/sales-account",
  MiddleCustomerAcc :"transaction-validation-screen/customer-data",
  MiddleShippedTo :"transaction-validation-screen/shipped-data",
  MiddleBilledTo :"transaction-validation-screen/billed-data",
  MiddleNarration :"transaction-validation-screen/narration-data",
  MiddleSalesRateAgree :"transaction-validation-screen/sale-agree-data",
  MiddleCurrency :"transaction-validation-screen/currency",
  MiddleProductModule :"transaction-validation-screen/module",
  MiddleCopyDoc :"transaction-validation-screen/cop-doc",
  MiddleProduct :"transaction-validation-screen/product-code",
  MiddleProductUnit :"transaction-validation-screen/unit",
  MiddleVoucherNo :"transaction-validation-screen/voucherno",

  MiddleWarehouseOne :"transaction-validation-screen/warehouse",
  MiddleAdditionalExpensesCustomerAcc :"transaction-validation-screen/addexp-customer-acc",
  MiddlePaymentTerms :"transaction-validation-screen/payment-term",
  MiddleIncoTerms :"transaction-validation-screen/inco-terms",

  MiddleMainTax :"transaction-validation-screen/main-tax",
  MiddleAdditionalTax :"transaction-validation-screen/additional-tax",
  MiddleTaxAcc :"transaction-validation-screen/tax-acc",

  MiddlecostCenter: "transaction-validation-screen/cost-center",
  MiddleprofitCenter: "transaction-validation-screen/profit-center",
  MiddlesalesMan: "transaction-validation-screen/salesman",
  Middledivision: "transaction-validation-screen/division",
  Middledepartment: "transaction-validation-screen/department",
  Middlejob: "transaction-validation-screen/job",
  MiddleotherCentre: "transaction-validation-screen/other-center",
  MiddlesalesOrganization: "transaction-validation-screen/sales-organization",
  MiddledistributionChannel: "transaction-validation-screen/distribution-channel",
  MiddlesalesOffice: "transaction-validation-screen/sales-office",
  MiddlesalesGroup: "transaction-validation-screen/sales-group",
  MiddleplaceOfsupply: "transaction-validation-screen/place-of-supply",
  Middlejurisdiction: "transaction-validation-screen/jurisdiction",
  MiddleHideOrDisplayTab: "transaction-validation-screen/hide-display-tab",
  MiddleDocument: "transaction-validation-screen/doc-master",
  MiddleEmp: "transaction-validation-screen/employee",




//New project 
agencyMaster: "agency-master",
visaQuotaDesignationMaster: "visa-quota-designation-master",
nationalityMaster:'nationality-master',
visaTypeMaster: "visa-type-master",
employeeSelectionCriteria: "employee-selection-criteria",
customerSiteCriteria: "customer-site-creation",
designationMaster:"designation-master",
offerLetterIssued:"offer-letter-issued",
signedOfferLetter:"signed-offer-letter",
visaRequestStatus:'visa-request-status',
visaAppliedStatus:'visa-applied-status',
qvcStatus:'qvc-status',
criteriaMaster :'criteria-master',
qatarID:'qatar-id',
gpExpMaster:'gp-exp-master',
locationMaster:'location',
jobCreation:'job-creation',
creatorMaster:'creator-master',
siteExecutive :'site-executive',
clientDesignationMaster:'client-designaton-master',
OurContactDesignationMaster:'our-contact-designation-master',
labourCampMaster:'labour-camp',
projectCompany:'project-company',
ppExpMaster:'ppexp',
clientMaster:'client',
projectMaster:'project',
visaStatusMaster :'visa-status',
gplocationMaster:'gp-location',
gateNumberMaster:'gate-number',
gpMaster:'gp-master',
employeeModule:'employee-module',
leaveType:'leave-type',
customerJobSiteCreation:'customer-job-site-creation'

};

export const apiFilterProperties = {
  login: "coCode=01",
  iac4LovFilter: "select=acCode&select=acName&select=curCode",
  ibrLovFilter: "select=coCode&select=dvCode&select=brCode&select=brName&select=brShtName",
  ijjobLovFilter: "select=jobCode&select=jobName&select=mJobCode&select=aliasName",
  iuserLovFilter: "select=userId&select=userName&select=coCode",
  isetupLovFilter: "select=coCode&select=dvCode&select=brCode&select=purpose&select=shortName&select=name",
};