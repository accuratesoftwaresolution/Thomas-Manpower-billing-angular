import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TblDigiHeadDto } from 'src/app/_dto/tbldigihead.dto';
import { TblHAccOneDto } from 'src/app/_dto/tblaccone.dto';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

import { TblExpDto } from 'src/app/_dto/tblexp.dto';
import { TbltaxDto } from 'src/app/_dto/tbltax.dto';
import { TblTransDetailDto } from 'src/app/_dto/tbltransdetail.dto';
import { SalesService } from 'src/app/_providers/sales.service';
//
import { TblTransHeadDto } from 'src/app/_dto/tbltranshead.dto';
import { tblJournalDto } from 'src/app/_dto/tbljournal.dto';
//
import { tblTaxDetailDto } from 'src/app/_dto/tbltaxdetail.dto';
import { TblLCMasterDto } from 'src/app/_dto/tbllcmaster.dto';
import { TblLCDetailsDto } from 'src/app/_dto/tbllcdetails.dto';
import { TblDocAttachDto } from 'src/app/_dto/tbldocattch.dto';
import { TblVesDocAttachDto } from 'src/app/_dto/tblvesdocattach.dto';
import { TblPTermDto } from 'src/app/_dto/tblpterm.dto';
import { TblPoDetailDto } from 'src/app/_dto/tblpodetail.dto';
import { TblIncoDto } from 'src/app/_dto/tblinc.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { TbltaxAddDto } from 'src/app/_dto/tbltaxadd.dto';
import { TblLandedExpDto } from 'src/app/_dto/TblCusVenExp.dto';
import { HTransLCostDto } from 'src/app/_dto/HTransLCostDto.dto';
import { StockService } from 'src/app/_providers/stock.service';
import { TblFirstTransHeadDto } from 'src/app/_dto/tblFirstTransHeadDto.dto';
import { TblSecTransHeadDto } from 'src/app/_dto/tblSecTransHeadDto.dto';
import { TblProjTransHead } from 'src/app/_dto/transaction-header-detail-singleco/TblProjTransHead.sto';
import { TblProjSingleCo } from 'src/app/_dto/transaction-header-detail-singleco/TblProjSingleCo.dto';
import { TblProjTransDetail } from 'src/app/_dto/transaction-header-detail-singleco/TblProjTransDetail.dto';
import { TblClientContact } from 'src/app/_dto/transaction-header-detail-singleco/TblClientContact.dto';
import { TblOurContact } from 'src/app/_dto/transaction-header-detail-singleco/TblOurContact.dto';
import { TblProjTransCriteria } from 'src/app/_dto/transaction-header-detail-singleco/TblProjTransCriteria.dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MasterService } from 'src/app/_providers/master.service';
@Component({
  selector: 'app-customer-job-site-creation',
  templateUrl: './customer-job-site-creation.component.html',
  styleUrls: ['./customer-job-site-creation.component.scss']
})
export class CustomerJobSiteCreationComponent implements OnInit {


  showListButton: boolean = false;


  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showTermsConditionsList: boolean = false

  tableIndex: any;

  HPAgency_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;

  remarksMaster: any;

  criteriaMaster: any;

  jobCreation: any;

  designationMaster: any;

  paymentTermsMaster: any;

  currencyMaster: any;

  customerSiteCriteria: any;


  locationMaster: any;

  narration: any;

  FinanceSteps = [
    { name: 'Name1', status: 'Approved' },
    { name: 'Name2', status: 'Rejected' },
    { name: 'Name3', status: 'Rejected' },
  ];

  TransactionSteps = [
    { name: 'Name4', status: 'Approved' },
    { name: 'Name5', status: 'Rejected' },
    { name: 'Name6', status: 'Rejected' },
    { name: 'Name7', status: 'Approved' },
    { name: 'Name8', status: 'Rejected' },
    { name: 'Name9', status: 'Rejected' },
  ];

  currentStep = 3;

  FinanceApprovalStatus = [
    { name: 'Name1', status: 'Approved' },
    { name: 'Name2', status: 'Rejected' },
    { name: 'Name3', status: 'Rejected' },
  ];

  TransactionApprovalStatus = [
    { name: 'Name4', status: 'Approved' },
    { name: 'Name5', status: 'Rejected' },
    { name: 'Name6', status: 'Rejected' },
    { name: 'Name7', status: 'Approved' },
    { name: 'Name8', status: 'Rejected' },
    { name: 'Name9', status: 'Rejected' },
  ];


  toolbarData = {
    title: 'Sales Invoice',
    screen: 'SalesInvoice',
    buttons: [
      { label: 'Add', functionName: 'onAdd', isHide: false, isDisabled: false },
      { label: 'Edit', functionName: 'onEdit', isHide: false, isDisabled: false },
      { label: 'Delete', functionName: 'onDelete', isHide: false },
      { label: 'Previous', functionName: 'onPrevious', isHide: false },
      { label: 'Next', functionName: 'onNext', isHide: false, isDisabled: false },
      { label: 'List', functionName: 'onList', isHide: false },
      { label: 'Print', functionName: 'onPrint', isHide: false },
      { label: 'Suspended', functionName: 'onSuspend', isHide: false },
      { label: 'Authorize', functionName: 'onAuthorize', isHide: false },
      { label: 'Reject', functionName: 'onReject', isHide: false },
    ],
  };


  headerData = {
    title: 'Sales Invoice',
    screen: 'SalesInvoice',
    voucherSysId: null

  }

  transactionhead: TblProjTransHead = new TblProjTransHead()


  showContextMenu = false;

  menuPosition = { x: 0, y: 0 };

  selectedRow: any;

  shippedTo: any[] = [];

  billedTo: any[] = [];

  // narration: any[] = [];

  voucherType: any[] = [];

  salesAgreement: any[] = []

  prodModule: any[] = [];

  voucherSysId: string;

  paymentTerms: any = [];

  incoTerms: any = [];

  tax: any[] = [];

  product: any[] = [];

  currencyLov: any[] = [];

  accOne: TblHAccOneDto[] = [];

  costCenter: any[] = [];

  profitCenter: any[] = [];

  salesMan: any[] = [];

  divisionlov: any[] = [];

  departmentlov: any[] = [];

  joblov: any[] = [];

  otherCenter: any[] = [];

  salesOrglov: any[] = [];

  distChannel: any[] = [];

  salesOff: any[] = [];

  placeOfSupply: any[] = [];

  jurisdiction: any[] = [];

  salesGrp: any[] = [];

  id: string;


  hPosting: any[] = [];

  dPosting: any[] = [];

  fieldAlert: any[] = [];

  fieldNarration: any[] = [];

  fieldMaster: any[] = [];

  tabForm: any[] = [];

  showAuthMsg: boolean = false

  showRejectMsg: boolean = false

  showStatus: boolean = false

  showConf: boolean = false

  showSaveMsg: boolean = false

  showLinking: boolean = false

  selectedLinkingDataRows: any[] = [];

  headerConf: any = { message: '', button: '' }

  TblAuthMsg: any = [
    { employeeCode: 'EMP001', employeeName: 'Alice Johnson', alertsCode: 'ALR001', alertsName: 'System Alert', alertsEmail: 'alice.johnson@example.com' },
  ];

  TblRejectMsg: any = [
    { employeeCode: 'EMP001', employeeName: 'Alice Johnson', alertsCode: 'ALR001', alertsName: 'System Alert', alertsEmail: 'alice.johnson@example.com' },
  ];

  TblSaveMsg: any = [{}]

  tblJournal: tblJournalDto[] = [];

  conversionRate: any = 2

  totalTaxAddDebit: any = 0

  totalTaxAddCredit: any = 0

  copyDocTemp: any;

  activeState: boolean[] = [false, false, false];

  activeIndex: number = 0;

  display: boolean = false;

  ShowLookUp: boolean = false

  showPrint: boolean = false

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
    { id: 0, title: "Applicable Rate", content: "", visible: true },
    { id: 1, title: "Client Contact Details", content: "", visible: true },
    { id: 2, title: "Our Site Contact Details", content: "", visible: true },
    { id: 3, title: "Criteria Checking", content: "", visible: true },
    { id: 4, title: "Masters", content: "Content for Masters", visible: true },
    { id: 5, title: "Document Attachment", content: "Content for Document Attachment", visible: true },
  ];

  buttons = [
    { label: 'Approval Status', action: () => this.showStatus = true, visible: true, disabled: false },
    { label: 'Tax Allo', action: () => this.showTaxAlloCation(), visible: true, disabled: false },
    { label: 'Invoice Allo', action: () => this.showInvAlloCation(), visible: true, disabled: false },
    {
      label: 'Save',
      action: () => this.save(),
      visible: true,
      disabled: false
    },
    { label: 'Cancel', visible: true, disabled: false },
    { label: 'Add', action: () => this.addNew(), visible: true, disabled: false },
    { label: 'List', action: () => this.routeTo('sales-list'), visible: true, disabled: false },
    { label: 'Print', action: () => this.showPrintFormat(), visible: true, disabled: false },
    { label: 'Suspended', visible: true, disabled: false },
    { label: 'Authorize', action: () => this.showConfirm('Authorize'), visible: true, disabled: false },
    { label: 'Reject', action: () => this.showConfirm('Reject'), visible: true, disabled: false },
    { label: 'Approve', visible: true, disabled: false }
  ];




  TblAllocation: any[] = [
    { reference: 'Ref1', dueDate: '2023-01-01', billAmount: 100, amountAdjusted: 50 },
    { reference: 'Ref2', dueDate: '2023-01-02', billAmount: 200, amountAdjusted: 100 },
    { reference: 'Ref3', dueDate: '2023-01-03', billAmount: 300, amountAdjusted: 150 },
    { reference: 'Ref4', dueDate: '2023-01-04', billAmount: 400, amountAdjusted: 200 },
    { reference: 'Ref5', dueDate: '2023-01-05', billAmount: 500, amountAdjusted: 250 },
    { reference: 'Ref6', dueDate: '2023-01-06', billAmount: 600, amountAdjusted: 300 },
  ];




  TableData = [
    { header: 'Grid SysID', hide: true, mandatory: true, width: '6rem', data: '', manual: false, bind: 'Alld_SysID', type: 'number' },
    { header: 'Designation SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Desig_SysID', type: 'number' },
    { header: 'Designation Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, PopUp: true, PopUpData: 'designationcode', bind: 'Alld_Desig_Code', type: 'text' },
    { header: 'Designation Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_Desig_Name', type: 'text' },

    { header: 'Contact Person', hide: true, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_Contact_Person', type: 'text' },

    { header: 'Billing Rates SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_BillRate_SysID', type: 'text', affects: [], readOnly: null, routeTo: "" },
    { header: 'Billing Rates Code', hide: true, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_BillRate_Code', type: 'text', PopUpData: 'AccountFirstCode', },
    { header: 'Billing Rates Name', hide: true, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_BillRate_Name', type: 'text' },

    { header: 'Number of Days for Calculation', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_NoDays_Cal', type: 'text', },
    { header: 'Fixed Hours', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_FixedHours', type: 'text' },
    { header: 'Hourly Rate', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Hourly', type: 'text' },
    { header: 'Overtime Rate', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Overtime', type: 'text' },
    { header: 'HOT Rate', hide: false, mandatory: true, width: '6rem', data: '', manual: false, bind: 'Alld_HOTRat', type: 'number' },

    { header: 'Applicable From Date', hide: false, mandatory: false, width: '10rem', data: '', manual: false, PopUp: true, bind: 'Alld_FromDate', type: 'date' },
    { header: 'Applicable to Date', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_ToDate', type: 'date' },

    { header: 'Customer Site SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Site_SysID', type: 'number' },
    { header: 'Customer Site Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_Site_Code', type: 'text', PopUp: true, PopUpData: 'customersitedetailcode', },
    { header: 'Customer Site Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_Site_Name', type: 'text' },

    { header: 'Job SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Job_SysID', type: 'number' },
    { header: 'Job Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_Job_Code', type: 'text', PopUp: true, PopUpData: 'jobcreationcode', },
    { header: 'Job Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_Job_Name', type: 'text' },

    { header: 'Remarks SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Remark_SysID', type: 'number', },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_Remark_Code', type: 'text', PopUp: true, PopUpData: 'RemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_Remark_Name', type: 'text' },
    { header: 'Grid Number SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Grid_SysID', type: 'number' },
  ];

  ClientTableData = [
    // { header: 'Grid SysID', hide: true, mandatory: true, width: '6rem', data: '', manual: false, bind: 'Alld_ClieGrid_SysID', type: 'number' },
    // { header: 'Designation SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_ClieDesig_SysID', type: 'number' },
    { header: 'Designation Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, PopUp: true, PopUpData: 'designationcodeclient', bind: 'Alld_ClieDesig_Code', type: 'text' },
    { header: 'Designation Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_ClieDesig_Name', type: 'text' },

    { header: 'Contact Person Name', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_ClieContact_Person', type: 'text' },

    { header: 'Contact Number', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_ClieContact_Number', type: 'number', affects: [], readOnly: null, routeTo: "" },
    { header: 'Mobile Number', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_ClieContact_Mob', type: 'number' },
    { header: 'Email Address', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_ClieContact_Email', type: 'text' },

    // { header: 'Remarks SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'AlldClie_Remark_SysID', type: 'number', },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_ClieRemark_Code', type: 'text', PopUp: true, PopUpData: 'remarkscodeclient' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_ClieRemark_Name', type: 'text' },
    // { header: 'Grid Number SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_ClieGrid_SysID', type: 'number' },
  ];

  SiteTableData = [
    { header: 'Grid SysID', hide: true, mandatory: true, width: '6rem', data: '', manual: false, bind: 'Alld_OurGrid_SysID', type: 'number' },
    { header: 'Designation SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_OurDesig_SysID', type: 'number' },
    { header: 'Designation Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, PopUp: true, PopUpData: 'designationcodesite', bind: 'Alld_OurDesig_Code', type: 'text' },
    { header: 'Designation Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_OurDesig_Name', type: 'text' },

    { header: 'Contact Person Name', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_OurContact_Person', type: 'text' },

    { header: 'Contact Number', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_OurContact_Number', type: 'number', affects: [], readOnly: null, routeTo: "" },
    { header: 'Mobile Number', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_OurContact_Mob', type: 'number' },
    { header: 'Email Address', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_OurContact_Email', type: 'text' },

    { header: 'Remarks SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_OurRemark_SysID', type: 'number', },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_OurRemark_Code', type: 'text', PopUp: true, PopUpData: 'remarkscodesite' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_OurRemark_Name', type: 'text' },
    { header: 'Grid Number SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Grid_SysID', type: 'number' },
  ];
  CriteriaTableData = [
    { header: 'Criteria List Grid SysID', hide: true, mandatory: true, width: '6rem', data: '', manual: false, bind: 'Alld_CritGridNo', type: 'number' },
    { header: 'Criteria List SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_CritSysID', type: 'number' },
    { header: 'Criteria List Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, PopUp: true, PopUpData: 'criteriacode', bind: 'Alld_CritCode', type: 'text' },
    { header: 'Criteria List Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_CritName', type: 'text' },

    { header: 'Values', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_CritReqYn', type: 'text' },

    { header: 'Select All', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_CritSelect', type: 'number', affects: [], readOnly: null, routeTo: "" },

    { header: 'Remarks SysID', hide: true, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_CritRem_SysID', type: 'number', },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_CritRem_Code', type: 'text', PopUp: true, PopUpData: 'remarkscodecriteria' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '14rem', data: '', manual: false, bind: 'Alld_CritRem_Name', type: 'text' },

  ];


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

  journalTabData = [
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: null, credit: 123456789 },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: 123456789, credit: null },
    { accountCode: '12345678912345', accountName: '123456789123456789123456789', debit: null, credit: 123456789 }
  ];

  LinkingData = [
    { SysID: 1, serialNo: 'S001', transactionNo: 'T12345', productCode: 'P001', productName: 'Product A', quantity: 10 },
    { SysID: 2, serialNo: 'S002', transactionNo: 'T12346', productCode: 'P002', productName: 'Product B', quantity: 20 },
    { SysID: 3, serialNo: 'S003', transactionNo: 'T12347', productCode: 'P003', productName: 'Product C', quantity: 15 },
    { SysID: 4, serialNo: 'S004', transactionNo: 'T12348', productCode: 'P004', productName: 'Product D', quantity: 30 },
    { SysID: 5, serialNo: 'S005', transactionNo: 'T12349', productCode: 'P005', productName: 'Product E', quantity: 25 }
  ];


  // Fields Hide , Mandatory , Disable , Alert  Array and Related variables Starts//


  hideOrDisplayFields = [
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Allh_Vou_Number',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: 'VoucherType',
      HFieldMaster_Name: 'Voucher Type',
      HDataField_Name: 'Allh_Vou_Type',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Voucher Type must be selected',
      HField_Narration_Code: 'NARR002',
      HField_Narration_Name: 'Type narration',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Vou_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_AccSecond_Code',
    //   HFieldValue_Yn: true,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: false,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_AccSecond_Name',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: true,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Curr_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_CusVen_Code',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: false,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_CusVen_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Curr_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_Shipto_Code',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: false,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_Shipto_Name',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: true,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Curr_Rate',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_Billto_Code',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: false,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_Billto_Name',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: true,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_AllModule_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Narra_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Narra_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_WhOne_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_WhOne_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_AllModule_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_SaleAgree_Code',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: false,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'Allh_SaleAgree_Name',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: true,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_InterSingleCo_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_InterSingleCo_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_DocTemp_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Text',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_DocTemp_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Main Tab Fields
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_SlNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Prod_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_ProdShort_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_ProdLong_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Prod_Unit',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Prod_Qty',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Prod_Rate',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Gross_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Discount_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Net_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Landed_Cost',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Link_One',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Link_Two',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Link_Three',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_WhOne_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Multiple_Batch',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Tax_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Tax_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_InPut_Perc',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_OutPut_Perc',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Delivery_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_1_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_2_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    }, {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_3_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_4_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_5_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_6_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_7_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_8_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_9_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_10_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_11_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_12_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_13_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_14_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_15_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_AccFirst_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_AccFirst_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_AccSecond_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_AccSecond_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Net_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Debit_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Credit_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Remark_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_Remark_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alld_CloseLink_Yn',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Other Expense Fields 

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_SlNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_FC_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_Curr_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_Curr_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_Curr_Rate',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_OthCharge_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_Narra_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ExpS_Narra_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Payment Terms Tab Fields 

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HPay_Term_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HPay_Term_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HPay_Term_Days',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HPay_TermDue_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HInco_Term_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HInco_Term_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // PO Number Tab Fields
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HPOS_Number',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HPOS_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HPOD_Deli_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Tax Tab Fields

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTax_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTax_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTax_InPut_Perc',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTax_OutPut_Perc',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTaxA_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTaxA_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTaxA_InPut_Perc',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTaxA_OutPut_Perc',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },





    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'TaxJS_Account_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'TaxJS_Account_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'TaxJS_Debit_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'TaxJS_Credit_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'TaxJS_Narra_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'TaxJS_Narra_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Master Tab Fields

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_CostCent_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_CostCent_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_ProCent_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_ProCent_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Sman_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Sman_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Div_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Div_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Dept_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Dept_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Job_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Job_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_OtherCent_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_OtherCent_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_SaleOrg_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_SaleOrg_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_DiscChanel_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_DiscChanel_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_SalesOffice_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_SalesOffice_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_SalesGroup_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_SalesGroup_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_PlaceSuppl_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_PlaceSuppl_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Jurisd_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Jurisd_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    // Other Fields Tab
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_1_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_2_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_3_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_4_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_5_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_6_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_7_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_8_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_9_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_10_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_11_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_12_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_13_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_14_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_15_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_16_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_17_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_18_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_19_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Lc Details Tab

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Flag',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Ref_No',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Curr_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Curr_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Issue_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Full_Value',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_Curr_Conv_Rate',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_IssueBank_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_IssueBank_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_AdvBank_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_AdvBank_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_NegoBank_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCMs_NegoBank_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Lc Details Table

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Flag',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Shipment_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Shipment_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_LastDate_Shipment',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Expiry_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Alert_Date',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Emp_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Emp_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Emp_Email',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Alert_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Alert_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'LCDs_Alert_Stop_Yn',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // Landed Cost Perce Fields 

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTransLCost_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTransLCost_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HTransLCost_Perce',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // Landed Cost Expense Fields 

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_SysID',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_SlNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_FC_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_Curr_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_Curr_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_Curr_Rate',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_OthCharge_Amount',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_OthCharge_OrgCurr',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_Narra_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'CSExp_Narra_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },











  ];

  fieldSettings: any = {};
  taxAllocation: boolean;
  taxAllocationH: any;
  invoiceAllocationH: any;
  invoiceAllocation: boolean;
  stockData: any;



  // Fields Hide , Mandatory , Disable , Alert  Array and Related variables Ends//



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _stockService: StockService,
    public popUpService: CommonPopupService,
    private confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private lookupService: LookupDialogService,
    public masterService: MasterService,

  ) { }

  ngOnInit(): void {
    this.transactionhead.TblProjSingleCo.push(new TblProjSingleCo())

    this.transactionhead.TblProjTransDetail.push(new TblProjTransDetail())

    // this.transactionhead.TblClientContact.push(new TblClientContact())

    // this.transactionhead.TblOurContact.push(new TblOurContact())

    // this.transactionhead.TblProjTransCriteria.push(new TblProjTransCriteria())

    this.transactionhead.Allh_JobQR_Code = 'assets/images/qr-code/site-qr.png';
    this.transactionhead.Allh_JobBar_Code = 'assets/images/qr-code/barcode.avif';

    this._stockService.stockData.tblTransHead = new TblFirstTransHeadDto();
    this._stockService.stockData.tblSecTransHead = new TblSecTransHeadDto();

    this.filteredFields()
    this._stockService.stockData.tblTax = [new TbltaxDto()]
    this._stockService.stockData.tblTaxAdd = [new TbltaxAddDto()]

    this._stockService.stockData.TblPTerm = [new TblPTermDto()]
    this._stockService.stockData.TblInco = [new TblIncoDto()]
    this._stockService.stockData.TblPoDetail = [new TblPoDetailDto()]

    this._stockService.stockData.tblDigiHead = [new TblDigiHeadDto()]
    this._stockService.stockData.tblLCMaster = new TblLCMasterDto()
    this._stockService.stockData.tblLCDetails = [new TblLCDetailsDto()]
    this.tblJournal = [new tblJournalDto()]

    this._stockService.stockData.tblDocAttach = [new TblDocAttachDto()]
    this._stockService.stockData.tblVesDocAttach = [new TblVesDocAttachDto()]

    this._stockService.stockData.tblQaQcDocAttach = [new TblDocAttachDto()]
    this._stockService.stockData.tblWhDocAttach = [new TblDocAttachDto()]
    this._stockService.stockData.tblLandedExp = [new TblLandedExpDto()]
    this._stockService.stockData.tblLandedCost = [new HTransLCostDto()]

    this.route.paramMap.subscribe(async (param: ParamMap) => {

      this.voucherSysId = param.get('id');
      this.stockData.voucherSysId = this.voucherSysId
      console.log("id", this.stockData.voucherSysId);
      this.id = param.get('id')
      if (this.id) {
        this.getSalesDataById()
      }


    });

    this.AddRows()
    // this.getPaymentTerms()
    // this.getIncoTerms()
    // this.getTax()
    // this.getProduct()
    // this.getcurrency()
    // this.getAccOne()
    // this.getMasterstabLov()
    // this.getHposting()
    // this.getDposting()
    // this.getAlert()
    // this.getNarration()
    // this.getFieldMaster()
    // this.getTabForm()

    this.getlovdata()

  }

  getlovdata() {
    this._stockService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activatedeactivate = res
    })
    this._stockService.getMasterData(apiUrl.singleCompany).then((res) => {
      this.singleCompany = res
    })
    this._stockService.getMasterData(apiUrl.customerSiteCriteria).then((res) => {
      this.customerSiteCriteria = res
    })
    this._stockService.getMasterData(apiUrl.locationMaster).then((res) => {
      this.locationMaster = res
    })
    this._stockService.getMasterData(apiUrl.narration).then((res) => {
      this.narration = res
    })
    this._stockService.getMasterData(apiUrl.paymentTermsMaster).then((res) => {
      this.paymentTermsMaster = res
    })
    this._stockService.getMasterData(apiUrl.currencyMaster).then((res) => {
      this.currencyMaster = res
    })
    this._stockService.getMasterData(apiUrl.designationMaster).then((res) => {
      this.designationMaster = res
    })
    this._stockService.getMasterData(apiUrl.jobCreation).then((res) => {
      this.jobCreation = res
    })
    this._stockService.getMasterData(apiUrl.remarksMaster).then((res) => {
      this.remarksMaster = res
    })
    this._stockService.getMasterData(apiUrl.criteriaMaster).then((res) => {
      this.criteriaMaster = res
    })
  }


  filteredFields() {
    this.hideOrDisplayFields.forEach((field) => {
      this.fieldSettings[field.HDataField_Name] = {
        mandatory: field.HFieldValue_Yn,
        hidden: field.HFieldHide_Yn,
        disabled: field.HFieldDisable_Yn,
        alertMessage: field.HField_Alert_Name,
      };
    });

    console.log(this.fieldSettings);

    this.TableData.forEach((field) => {
      const itsName = field.bind;
      if (this.fieldSettings[itsName]) {
        // Check if a matching key exists in fieldSettings
        field.mandatory = this.fieldSettings[itsName].mandatory;
        field.hide = this.fieldSettings[itsName].hidden;
        field.readOnly = this.fieldSettings[itsName].disabled
      }
    });

  }




  // Data Fetching... Starts Below //

  getSalesDataById() {
    this._stockService.getMasterDatabyId(apiUrl.finance, this.stockData.voucherSysId).then((res) => {
      this._stockService.stockData = res
    })
  }

  getShippedTo() {
    this._stockService.getMasterData(apiUrl.shippedTo).then((res) => {
      this.shippedTo = res
    })
  }

  getBilledTo() {
    this._stockService.getMasterData(apiUrl.billedTo).then((res) => {
      this.billedTo = res
    })
  }

  getVoucherType() {
    this._stockService.getMasterData(apiUrl.voucherType).then((res) => {
      this.voucherType = res
    })
  }

  getSalesAgree() {
    this._stockService.getMasterData(apiUrl.salAgree).then((res) => {
      this.salesAgreement = res
    })
  }

  getProdModule() {
    this._stockService.getMasterData(apiUrl.prodModule).then((res) => {
      this.prodModule = res
    })
  }

  getCopyDocTemp() {
    this._stockService.getMasterData(apiUrl.copyDocTemp).then((res) => {
      this.copyDocTemp = res
    })
  }

  getPaymentTerms() {
    this._stockService.getMasterData(apiUrl.paymentTerms).then((res) => {
      this.paymentTerms = res.data
    })
  }

  getIncoTerms() {
    this._stockService.getMasterData(apiUrl.incoTerms).then((res) => {
      this.incoTerms = res.data
    })
  }

  getTax() {
    this._stockService.getMasterData(apiUrl.tax).then((res) => {
      this.tax = res.data
    })
  }

  getProduct() {
    this._stockService.getMasterData(apiUrl.productmaster).then((res) => {
      this.product = res.data
    })
  }

  getCurrency() {
    this._stockService.getMasterData(apiUrl.currency).then((res) => {
      this.currencyLov = res.data
    })
  }

  getAccOne() {
    this._stockService.getMasterData(apiUrl.accountOne).then((res) => {
      this.accOne = res.data
    })
  }

  getMasterstabLov() {

    this._stockService.getMasterData(apiUrl.costCenter).then((res) => {
      this.costCenter = res
    })
    this._stockService.getMasterData(apiUrl.profitCenter).then((res) => {
      this.profitCenter = res
    })
    this._stockService.getMasterData(apiUrl.salesMan).then((res) => {
      this.salesMan = res
    })
    this._stockService.getMasterData(apiUrl.divisionlov).then((res) => {
      this.divisionlov = res
    })
    this._stockService.getMasterData(apiUrl.departmentlov).then((res) => {
      this.departmentlov = res
    })
    this._stockService.getMasterData(apiUrl.joblov).then((res) => {
      this.joblov = res
    })
    this._stockService.getMasterData(apiUrl.otherCenter).then((res) => {
      this.otherCenter = res
    })
    this._stockService.getMasterData(apiUrl.salesOrglov).then((res) => {
      this.salesOrglov = res
    })
    this._stockService.getMasterData(apiUrl.distChannel).then((res) => {
      this.distChannel = res
    })
    this._stockService.getMasterData(apiUrl.salesOff).then((res) => {
      this.salesOff = res
    })
    this._stockService.getMasterData(apiUrl.salesGrp).then((res) => {
      this.salesGrp = res
    })
    this._stockService.getMasterData(apiUrl.placeOfSupply).then((res) => {
      this.placeOfSupply = res
    })
    this._stockService.getMasterData(apiUrl.jurisdiction).then((res) => {
      this.jurisdiction = res
    })

  }

  getHposting() {
    this._stockService.getMasterData(apiUrl.hPosting).then((res) => {
      this.hPosting = res
    })
  }

  getDposting() {
    this._stockService.getMasterData(apiUrl.dPosting).then((res) => {
      this.dPosting = res
    })
  }

  getAlert() {
    this._stockService.getMasterData(apiUrl.fieldAlert).then((res) => {
      this.fieldAlert = res
    })
  }

  getNarration() {
    this._stockService.getMasterData(apiUrl.fieldNarration).then((res) => {
      this.fieldNarration = res
    })
  }

  getFieldMaster() {
    this._stockService.getMasterData(apiUrl.fieldMaster).then((res) => {
      this.fieldMaster = res
    })
  }

  getTabForm() {
    this._stockService.getMasterData(apiUrl.tabForm).then((res) => {
      this.tabForm = res
    })
  }
  // Data Fetching... Starts Below //






  // Popup Lov Data Updating ... Starts Below //

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {


      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCompany;
        break;
      case 'AccDirectExpCode':
        break;

      case 'customersitecode':
        this.popUpService.popUpData = this.customerSiteCriteria;
        break;
      case 'customersitedetailcode':
        this.popUpService.popUpData = this.customerSiteCriteria;
        break;
      case 'locationcode':
        this.popUpService.popUpData = this.locationMaster;
        break;
      case 'NarrationCode':
        this.popUpService.popUpData = this.narration;
        break;
      case 'designationcode':
        this.popUpService.popUpData = this.designationMaster;
        break;
      case 'designationcodeclient':
        this.popUpService.popUpData = this.designationMaster;
        break;
      case 'designationcodesite':
        this.popUpService.popUpData = this.designationMaster;
        break;
      case 'jobcreationcode':
        this.popUpService.popUpData = this.jobCreation;
        break;
      case 'RemarksCode':
        this.popUpService.popUpData = this.remarksMaster;
        break;
      case 'remarkscodeclient':
        this.popUpService.popUpData = this.remarksMaster;
        break;
      case 'remarkscodesite':
        this.popUpService.popUpData = this.remarksMaster;
        break;
      case 'remarkscodecriteria':
        this.popUpService.popUpData = this.remarksMaster;
        break;
      case 'criteriacode':
        this.popUpService.popUpData = this.criteriaMaster;
        break;

      default:
        break;
      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activatedeactivate;
        break;

      case 'PaymentTerms':
        this.popUpService.popUpData = this.paymentTermsMaster;
        break;

      case 'CurrencyCode':
        this.popUpService.popUpData = this.currencyMaster;
        break;


      ////////////////////////////////////////////////////////////


    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {
    let Type = this.popUpService.selectedPopUp
    switch (Type) {


      case 'customersitecode':
        this.transactionhead.Allh_Site_SysID = event.HPCustSite_SysID
        this.transactionhead.Allh_Site_Code = event.HPCustSite_Code
        this.transactionhead.Allh_Site_Name = event.HPCustSite_Name
        break;

      case 'customersitedetailcode':
        this.transactionhead.TblProjTransDetail[0].Alld_Site_SysID = event.HPCustSite_SysID
        this.transactionhead.TblProjTransDetail[0].Alld_Site_Code = event.HPCustSite_Code
        this.transactionhead.TblProjTransDetail[0].Alld_Site_Name = event.HPCustSite_Name
        break;
      case 'jobcreationcode':
        this.transactionhead.TblProjTransDetail[0].Alld_Job_SysID = event.HPJobCrea_SysID
        this.transactionhead.TblProjTransDetail[0].Alld_Job_Code = event.HPJobCrea_Code
        this.transactionhead.TblProjTransDetail[0].Alld_Job_Name = event.HPJobCrea_Name
        break;

      case 'locationcode':
        this.transactionhead.Allh_FromLocation_SysID = event.HPLocation_SysID
        this.transactionhead.Allh_FromLocation_Code = event.HPLocation_Code
        this.transactionhead.Allh_FromLocation_Name = event.HPLocation_Name
        break;

      case 'NarrationCode':
        this.transactionhead.Allh_Narra_SysID = event.HNarraMast_SysID
        this.transactionhead.Allh_Narra_Code = event.HNarraMast_Code
        this.transactionhead.Allh_Narra_Name = event.HNarraMast_Name
        break;


      case 'PaymentTerms':

        this.transactionhead.Allh_PayTerm_SysID = event.HPayTerm_SysID
        this.transactionhead.Allh_PayTerm_Code = event.HPayTerm_Code
        this.transactionhead.Allh_PayTerm_Name = event.HPayTerm_Name
        this.transactionhead.Allh_PayTerm_Days = event.HPayTerm_Days

        break;

      case 'CurrencyCode':
        this.transactionhead.Allh_Curr_SysID = event.HCurrFirst_SysID
        this.transactionhead.Allh_Curr_Code = event.HCurrFirst_Code
        this.transactionhead.Allh_Curr_Name = event.HCurrFirst_Name
        this.transactionhead.Allh_Curr_Rate = event.HCurrFirst_Rate
        break;

        case 'designationcode':
          this.transactionhead.TblProjTransDetail[0].Alld_Desig_SysID = event.HPDesig_SysID
          this.transactionhead.TblProjTransDetail[0].Alld_Desig_Code = event.HPDesig_Code
          this.transactionhead.TblProjTransDetail[0].Alld_Desig_Name = event.HPDesig_Name

          break;

        case 'RemarksCode':
          this.transactionhead.TblProjTransDetail[0].Alld_Remark_SysID = event.HRemMast_SysID
          this.transactionhead.TblProjTransDetail[0].Alld_Remark_Code = event.HRemMast_Code
          this.transactionhead.TblProjTransDetail[0].Alld_Remark_Name = event.HRemMast_Name

        //   break;
        // case 'designationcodeclient':
        //   this.transactionhead.TblClientContact[0].Alld_ClieDesig_SysID = event.HPDesig_SysID
        //   this.transactionhead.TblClientContact[0].Alld_ClieDesig_Code = event.HPDesig_Code
        //   this.transactionhead.TblClientContact[0].Alld_ClieDesig_Name = event.HPDesig_Name

        //   break;
        // case 'designationcodesite':
        //   this.transactionhead.TblOurContact[0].Alld_OurDesig_SysID = event.HPDesig_SysID
        //   this.transactionhead.TblOurContact[0].Alld_OurDesig_Code = event.HPDesig_Code
        //   this.transactionhead.TblOurContact[0].Alld_OurDesig_Name = event.HPDesig_Name

        //   break;
        // case 'remarkscodeclient':
        //   this.transactionhead.TblClientContact[0].Alld_ClieRemark_SysID = event.HRemMast_SysID
        //   this.transactionhead.TblClientContact[0].Alld_ClieRemark_Code = event.HRemMast_Code
        //   this.transactionhead.TblClientContact[0].Alld_ClieRemark_Name = event.HRemMast_Name

        //   break;
        // case 'remarkscodesite':
        //   this.transactionhead.TblOurContact[0].Alld_OurRemark_SysID = event.HRemMast_SysID
        //   this.transactionhead.TblOurContact[0].Alld_OurRemark_Code = event.HRemMast_Code
        //   this.transactionhead.TblOurContact[0].Alld_OurRemark_Name = event.HRemMast_Name

        //   break;
        //   case 'remarkscodecriteria':
        //   this.transactionhead.TblProjTransCriteria[0].Alld_CritRem_SysID = event.HRemMast_SysID
        //   this.transactionhead.TblProjTransCriteria[0].Alld_CritRem_Code = event.HRemMast_Code
        //   this.transactionhead.TblProjTransCriteria[0].Alld_CritRem_Name = event.HRemMast_Name

        //   break;
        // case 'criteriacode':
        //   this.transactionhead.TblProjTransCriteria[0].Alld_CritSysID = event.HPCriMaster_SysID
        //   this.transactionhead.TblProjTransCriteria[0].Alld_CritCode = event.HPCriMaster_Code
        //   this.transactionhead.TblProjTransCriteria[0].Alld_CritName = event.HPCriMaster_Name

        break;


      case 'ApplicableCompanyCode':

        const selectedCode = event.SingleCo_Code
        const isExist = this.transactionhead.TblProjSingleCo.some(item => item.Alld_SingleCo_SysID === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Customer Job Site Creation Master' });
          return;
        }
        this.transactionhead.TblProjSingleCo[this.tableIndex].Alld_SingleCo_SysID = event.SingleCo_SysID
        this.transactionhead.TblProjSingleCo[this.tableIndex].Alld_SingleCo_Code = event.SingleCo_Code
        this.transactionhead.TblProjSingleCo[this.tableIndex].Alld_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.transactionhead.Allh_MasterAcDe_SysID = event.HActDeactive_SysID
        this.transactionhead.Allh_MasterAcDe_Code = event.HActDeactive_Code
        this.transactionhead.Allh_MasterAcDe_Name = event.HActDeactive_Name
        break;


      default:
        break;
    }

  }

  preSave(): boolean {


    return true;
  }
  save() {
    if (!this.preSave()) return;

    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      if (this.progressValue < 90) {
        this.progressValue += 10;
      } else {
        clearInterval(interval);
      }
    }, 500);

    // Trim empty rows
    //  this.TblHpAgency.TbldPAgencyCo = this.TblHpAgency.TbldPAgencyCo.filter(
    //    row => row.DcpAgency_SingleCo_Code && row.DcpAgency_SingleCo_Code.trim() !== ''
    //  );

    this.masterService.saveMasterData(apiUrl.customerJobSiteCreation, this.transactionhead).then((res) => {
      clearInterval(interval);

      if (res.success === false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      if (res.success === false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      // If success
      this.progressValue = 100;

      // Delay for smooth progress bar animation
      setTimeout(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });

        this.showListButton = true;

        this.transactionhead = new TblProjTransHead();
        this.transactionhead.TblProjSingleCo.push(new TblProjSingleCo())
        this.transactionhead.Allh_JobQR_Code = 'assets/images/qr-code/site-qr.png';
        this.transactionhead.Allh_JobBar_Code = 'assets/images/qr-code/barcode.avif';

        // Navigate to list screen
        this.router.navigate(['Manpower/customer-job-site-creation/']);

        // Finally reset flags
        this.isSaving = false;
        this.progressValue = 0;
      }, 500);
    }).catch(() => {
      clearInterval(interval);
      this.progressValue = 0;
      this.isSaving = false;
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Save failed'
      });
    });
  }


  delete() {
    this._stockService.deleteDataById(apiUrl.finance, this.id).then((res) => {
      window.alert('Data Deleted Successfully')
    })
  }


  deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (this.transactionhead.Allh_SysID && rowData.Alld_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.paymentTermsMaster, `company?where[Alld_GridSysID]=${this.transactionhead.TblProjSingleCo[0].Alld_GridSysID}&where[Alld_SingleCo_SysID]=${rowData.Alld_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TblProjSingleCo') {
                this.transactionhead.TblProjSingleCo.splice(index, 1);
                if (this.transactionhead.TblProjSingleCo.length === 0) {
                  this.addRow('TblProjSingleCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TblProjSingleCo') {
            this.transactionhead.TblProjSingleCo.splice(index, 1);
            if (this.transactionhead.TblProjSingleCo.length === 0) {
              this.addRow('TblProjSingleCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TblProjSingleCo') {
      const newRow = new TblProjSingleCo()
      this.transactionhead.TblProjSingleCo.splice(index + 1, 0, newRow);

    }
  }





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

  routeTo(screen?) {

  }

  confirmConf() {
    if (this.headerConf.button === 'Save') {
      // this.showSaveMsg = true
      this.save()
    }
    else if (this.headerConf.button === 'Reject') {
      this.showRejectMsg = true
    }
    else if (this.headerConf.button === 'Authorize') {
      this.showAuthMsg = true
    }
    this.showConf = false

  }

  cancelConf() {
    this.showConf = false
  }

  showConfirm(button) {

    if (button === 'Save') {
      this.headerConf = {
        message: "Do You Want To Continue?",
        button: "Save"
      }
    }
    else if (button === 'Reject') {
      this.headerConf = {
        message: "Do You Want To Continue?",
        button: "Reject"
      }

    } else if (button === 'Authorize') {
      this.headerConf = {
        message: "Do You Want To Continue?",
        button: "Authorize"
      }
    }

    this.showConf = true

  }

  onRowClick(rowData: any, rowIndex: number): void {
    console.log('Row clicked:', rowData, 'Index:', rowIndex);
  }

  onRightClick(event: MouseEvent, rowData: any, rowIndex: number): void {
    event.preventDefault();
    this.selectedRow = rowData;
    this.menuPosition = { x: event.clientX, y: event.clientY };
    this.showContextMenu = true;
    this.displaySelectedRows()
  }

  hideContextMenu(): void {
    this.showContextMenu = false;
  }

  handleAction(screen: string, rowData: any): void {
    this.routeTo(screen); // Navigate to the desired screen with row data
    this.hideContextMenu(); // Hide the context menu after the action
  }

  displaySelectedRows() {
    const selectedRows = this._stockService.stockData.tblTransDetail.filter(row => row.selected);
    console.log('Selected Rows:', selectedRows);
    this._stockService.selectedDetailRows = selectedRows
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this._stockService.stockData.tblTransDetail.forEach(row => {
      row.selected = isChecked;
    });
  }

  isAllSelected(): boolean {
    return this._stockService.stockData.tblTransDetail.every(row => row.selected);
  }

  addNew() {
    this._stockService.stockData = new TblTransHeadDto();
    this.AddRows()
  }

  AddRows() {

    if (this._stockService.stockData.tblTransDetail.length < 3) {
      const number = 3 - this._stockService.stockData.tblTransDetail.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblTransDetail.push(new TblTransDetailDto());
      }
    }

    if (this._stockService.stockData.tblExp.length < 5) {
      const number = 5 - this._stockService.stockData.tblExp.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblExp.push(new TblExpDto());
      }
    }


    //

    if (this._stockService.stockData.tblDocAttach.length < 4) {
      const number = 4 - this._stockService.stockData.tblDocAttach.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblDocAttach.push(new TblDocAttachDto());
      }
    }
    if (this._stockService.stockData.tblWhDocAttach.length < 4) {
      const number = 4 - this._stockService.stockData.tblWhDocAttach.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblWhDocAttach.push(new TblDocAttachDto());
      }
    }
    if (this._stockService.stockData.tblVesDocAttach.length < 4) {
      const number = 4 - this._stockService.stockData.tblVesDocAttach.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblVesDocAttach.push(new TblVesDocAttachDto());
      }
    }
    if (this._stockService.stockData.tblQaQcDocAttach.length < 4) {
      const number = 4 - this._stockService.stockData.tblQaQcDocAttach.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblQaQcDocAttach.push(new TblDocAttachDto());
      }
    }

    //

    if (this._stockService.stockData.tblTax.length < 1) {
      const number = 1 - this._stockService.stockData.tblTax.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblTax.push(new TbltaxDto());
      }
    }
    if (this._stockService.stockData.tblTaxDetail.length < 1) {
      const number = 1 - this._stockService.stockData.tblTaxDetail.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblTaxDetail.push(new tblTaxDetailDto());
      }
    }

    if (this.tblJournal.length < 4) {
      const number = 4 - this.tblJournal.length
      for (let index = 0; index < number; index++) {
        this.tblJournal.push(new tblJournalDto());
      }
    }

    //

    if (this._stockService.stockData.tblLCDetails.length < 4) {
      const number = 4 - this._stockService.stockData.tblLCDetails.length
      for (let index = 0; index < number; index++) {
        this._stockService.stockData.tblLCDetails.push(new TblLCDetailsDto());
      }
    }
  }


  updateLinkingSelectedRow() {
    const newData = this.selectedLinkingDataRows.map(item => {
      const tblTransDetail = new TblTransDetailDto();

      // Only set fields that come from selectedLinkingDataRows
      tblTransDetail.Alld_SysID = item.SysID;
      tblTransDetail.Alld_Prod_Code = item.productCode;
      tblTransDetail.Alld_ProdShort_Name = item.productName;
      tblTransDetail.Alld_Prod_Qty = item.quantity; // assuming you want to use product name for this field

      return tblTransDetail;
    });

    // Push new data into the existing array
    this._stockService.stockData.tblTransDetail.push(...newData);
    this.showLinking = false
    console.log('Updated Sales Data:', this._stockService.stockData.tblTransDetail);

  }

  showTaxAlloCation() {
    this.taxAllocation = true
  }

  showInvAlloCation() {
    this.invoiceAllocation = true
  }

  showPrintFormat() {
    this.showPrint = true
  }





}