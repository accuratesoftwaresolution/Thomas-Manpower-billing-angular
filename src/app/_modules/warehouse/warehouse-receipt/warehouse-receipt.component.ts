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


@Component({
  selector: 'app-warehouse-receipt',
  templateUrl: './warehouse-receipt.component.html',
  styleUrls: ['./warehouse-receipt.component.scss']
})
export class WarehouseReceiptComponent implements OnInit {

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

  showContextMenu = false;

  menuPosition = { x: 0, y: 0 };

  selectedRow: any;

  shippedTo: any[] = [];

  billedTo: any[] = [];

  narration: any[] = [];

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

  tableIndex: any;

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
    { id: 0, title: "Main", content: "", visible: true },
    { id: 1, title: "Other Expenses", content: "Content for Other Expenses", visible: false },
    { id: 2, title: "Payment Terms", content: "", visible: true }, // Hidden tab example
    { id: 3, title: "PO Number", content: "", visible: false },
    { id: 4, title: "Tax", content: "Content for Tax", visible: true },
    { id: 5, title: "Masters", content: "Content for Masters", visible: true },
    { id: 6, title: "Other Fields", content: "Content for Other Fields", visible: true },
    { id: 7, title: "Journal", content: "Content for Journal", visible: false },
    { id: 8, title: "User Key", content: "Content for User Key", visible: true },
    { id: 9, title: "Vessel Booking", content: "Content for Vessel Booking", visible: false },
    { id: 10, title: "QA/QC", content: "Content for QA/QC", visible: false },
    { id: 11, title: "WH Management", content: "Content for WH Management", visible: false },
    { id: 12, title: "Document Attachment", content: "Content for Document Attachment", visible: true },
    { id: 13, title: "LC Details", content: "Content for LC", visible: false },
    { id: 14, title: "Landed Cost Expense", content: "Content for Landed Cost Expense", visible: false },
  ];

  buttons = [
    { label: 'Approval Status', action: () => this.showStatus = true, visible: true, disabled: false },
    { label: 'Tax Allo', action: () => this.showTaxAlloCation(), visible: true, disabled: false },
    { label: 'Invoice Allo', action: () => this.showInvAlloCation(), visible: true, disabled: false },
    { label: 'Save', action: () => this.showConfirm('Save'), visible: true, disabled: false },
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

  // TableData = [

  //   { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text' },
  //   { header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: '12345678912345', manual: true, PopUp: true, PopUpData: 'ProductCode', bind: "Alld_Prod_Code", routeTo: "product-master", type: 'text' },
  //   { header: 'Product Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_ProdShort_Name", type: 'text' },
  //   { header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_ProdLong_Name", type: 'text' },
  //   { header: 'Unit', hide: false, mandatory: false, width: '4rem', data: '123456', manual: true, bind: "Alld_Prod_Unit", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
  //   { header: 'Qty', hide: false, mandatory: true, width: '7rem', data: '12345678912345', manual: true, bind: "Alld_Prod_Qty", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
  //   { header: 'Batch No.', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'MrvMultipleBatchNumber', bind: "Alld_Multiple_Batch", type: 'text' },
  //   { header: 'Rate', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: "Alld_Prod_Rate", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
  //   { header: 'Gross Amount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Gross_Amount", readOnly: true, align: 'left', type: 'number' },
  //   { header: 'Discount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: "Alld_Discount_Amount", affects: ['Alld_Net_Amount'], align: 'left', type: 'number' },
  //   { header: 'Net Amount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Net_Amount", readOnly: true, align: 'left', type: 'number' },
  //   { header: 'Cost Of Sales', hide: false, mandatory: false, width: '7rem', data: '123456789', manual: false, bind: "Alld_Landed_Cost", type: 'number' },
  //   { header: 'Link Voucher No. 01', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_Link_One", type: 'text' },
  //   { header: 'Link Voucher No. 02', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_Link_Two", type: 'text' },
  //   { header: 'Link Voucher No. 03', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_Link_Three", type: 'text' },
  //   { header: 'Warehouse', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'WarehouseCode', bind: "Alld_WhOne_Code", routeTo: "warehouse", type: 'text' },
  //   { header: 'Tax Code', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: true, bind: "Alld_Tax_Code", type: 'text' },
  //   { header: 'Tax Name', hide: false, mandatory: false, width: '4rem', data: '123456', manual: false, bind: "Alld_Tax_Name", type: 'text' },
  //   { header: 'Input Tax Percentage (%)', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_InPut_Perc", type: 'text' },
  //   { header: 'OutPut Tax Percentage (%)', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_OutPut_Perc", type: 'text' },
  //   { header: 'Amount Debt', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Debit_Amount", type: 'number' },
  //   { header: 'Amount Credit', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Credit_Amount", type: 'number' },
  //   { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false, bind: "Alld_Remark_Code", type: 'text' },
  //   { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false, bind: "Alld_Remark_Name", type: 'text' },
  //   { header: 'Close Link', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false, bind: "Alld_CloseLink_Yn" },
  // ];


  TableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: '', manual: false, bind: 'Alld_SysID', type: 'text' },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: '', manual: false, bind: 'Alld_SlNo', type: 'text' },
    { header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: '', manual: true, PopUp: true, PopUpData: 'ProductCode', bind: 'Alld_Prod_Code', routeTo: 'product-master', type: 'text' },
    { header: 'Product Name', hide: false, mandatory: false, width: '16rem', data: '', manual: false, bind: 'Alld_ProdShort_Name', type: 'text' },
    { header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: '', manual: false, bind: 'Alld_ProdLong_Name', type: 'text' },
    { header: 'Unit', hide: false, mandatory: false, width: '4rem', data: '', manual: true, bind: 'Alld_Prod_Unit', type: 'text', affects: [], readOnly: null, routeTo: "" },
    { header: 'Account SysID', hide: false, mandatory: false, width: '7rem', data: '', manual: false, bind: 'HAccOne_SysID', type: 'text' },
    { header: 'Account Code', hide: false, mandatory: false, width: '7rem', data: '', manual: false, bind: 'HAccOne_Code', type: 'text', PopUpData: 'AccountFirstCode', },
    { header: 'Account Name', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'HAccOne_Name', type: 'text' },
    { header: 'From Warehouse Code', hide: false, mandatory: false, width: '8rem', data: '', manual: true, bind: 'Alld_WhOne_Code', type: 'text', PopUpData: 'WarehouseOneCode', },
    { header: 'From Warehouse Name', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_WhOne_Name', type: 'text' },
    { header: 'To Warehouse Code', hide: false, mandatory: false, width: '8rem', data: '', manual: true, bind: 'Alld_WhTwo_Code', type: 'text', PopUpData: 'WarehouseTwoCode', },
    { header: 'To Warehouse Name', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_WhTwo_Name', type: 'text' },
    { header: 'Qty', hide: false, mandatory: true, width: '7rem', data: '', manual: true, bind: 'Alld_Prod_Qty', type: 'number' },
    { header: 'Batch Number', hide: false, mandatory: false, width: '8rem', data: '', manual: true, PopUp: true, PopUpData: 'MrvMultipleBatchNumber', bind: 'Alld_Multiple_Batch', type: 'text' },
    { header: 'Weighted Average Cost', hide: false, mandatory: false, width: '8rem', data: '', manual: false, bind: 'Alld_Prod_Rate', type: 'number' },
    { header: 'Amount', hide: false, mandatory: false, width: '8rem', data: '', manual: false, bind: 'Alld_Debit_Amount', type: 'number' },
    { header: 'Inter Company Code', hide: false, mandatory: false, width: '8rem', data: '', manual: false, bind: 'Alld_InterSingleCo_Code', type: 'text', PopUp: true, PopUpData: 'DInterCoCode', },
    { header: 'Inter Company Name', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_InterSingleCo_Name', type: 'text' },
    { header: 'Link Voucher Number 01', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Link_One', type: 'text' },
    { header: 'Link Voucher Number 02', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Link_Two', type: 'text' },
    { header: 'Link Voucher Number 03', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Link_Three', type: 'text' },
    { header: 'Tax Code', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Tax_Code', type: 'text', PopUp: true, PopUpData: 'TaxCode', },
    { header: 'Tax Name', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Tax_Name', type: 'text' },
    { header: 'Tax Rate Input %', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_InPut_Perc', type: 'number' },
    { header: 'Tax Rate Output %', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_OutPut_Perc', type: 'number' },
    { header: 'Tax Amount', hide: false, mandatory: false, width: '6rem', data: '', manual: false, bind: 'Alld_Debit_Amount', type: 'number' },
    { header: 'Total Amount', hide: false, mandatory: false, width: '8rem', data: '', manual: false, bind: 'Alld_Credit_Amount', type: 'number' },
    { header: 'Tax Reference', hide: false, mandatory: false, width: '8rem', data: '', manual: false, bind: 'Alld_Tax_Ref', type: 'text' },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_Remark_Code', type: 'text', PopUp: true, PopUpData: 'RemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '', manual: false, bind: 'Alld_Remark_Name', type: 'text' }
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

    private lookupService: LookupDialogService
  ) { }

  ngOnInit(): void {

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



      case 'ShippedTo':
        this.popUpService.popUpData = this.shippedTo;
        break;
      case 'BilledTo':
        this.popUpService.popUpData = this.billedTo;
        break;
      case 'NarrationCode':
        this.popUpService.popUpData = this.narration;
        break;
      case 'SalesAccount':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'VocherType':
        this.popUpService.popUpData = this.voucherType;
        break;
      case 'SalesAgreementCode':
        this.popUpService.popUpData = this.salesAgreement;
        break;
      case 'ProductModuleCode':
        this.popUpService.popUpData = this.prodModule;
        break;
      case 'CurrencyCode':
        this.popUpService.popUpData = this.currencyLov;
        break;
      case 'CustomerCode':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'CopyDocFromTemplateCode':
        this.popUpService.popUpData = this.copyDocTemp;
        break;
      case 'PaymentTerms':
        this.popUpService.popUpData = this.paymentTerms;
        break;
      case 'IncoTerms':
        this.popUpService.popUpData = this.incoTerms;
        break;


      case 'ProductCode':
        this.popUpService.popUpData = this.product;
        break;

      case 'ExpAccountCode':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'ExpNarrationCode':
        break;

      case 'ExpDefaultCurrencyCode':
        this.popUpService.popUpData = this.currencyLov;

        break;
      case 'PaymentTerms':
        this.popUpService.popUpData = this.paymentTerms;
        break;
      case 'IncoTerms':
        this.popUpService.popUpData = this.incoTerms;
        break;
      case 'TaxCode':
        this.popUpService.popUpData = this.tax;
        break;
      case 'TaxACode':
        this.popUpService.popUpData = this.tax;
        break;
      case 'TaxAccountCodeCode':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'TaxNarrationCode':
        break;
      case 'TaxAddAccountCode':
        this.popUpService.popUpData = this.accOne;
        break;
      case 'CostCenterCode':
        this.popUpService.popUpData = this.costCenter;
        break;
      case 'ProfitCenterCode':
        this.popUpService.popUpData = this.profitCenter;
        break;
      case 'SalesmanCode':
        this.popUpService.popUpData = this.salesMan;
        break;
      case 'DivisionCode':
        this.popUpService.popUpData = this.divisionlov;
        break;
      case 'DepartmentCode':
        this.popUpService.popUpData = this.departmentlov;
        break;
      case 'JobCode':
        this.popUpService.popUpData = this.joblov;
        break;
      case 'OtherCentreCode':
        this.popUpService.popUpData = this.otherCenter;
        break;
      case 'SalesOrganizationCode':
        this.popUpService.popUpData = this.salesOrglov;
        break;
      case 'DistributionChannelCode':
        this.popUpService.popUpData = this.distChannel;
        break;
      case 'SalesOfficeCode':
        this.popUpService.popUpData = this.salesOff;
        break;
      case 'SalesGroupCode':
        this.popUpService.popUpData = this.salesGrp;
        break;
      case 'PlaceOfSupplyCode':
        this.popUpService.popUpData = this.placeOfSupply;
        break;
      case 'JurisdictionCode':
        this.popUpService.popUpData = this.jurisdiction;
        break;
      case 'JournalAccountCode':
        break;
      case 'PostingHCode':
        this.popUpService.popUpData = this.hPosting;
        break;
      case 'PostingDCode':
        this.popUpService.popUpData = this.dPosting;
        break;
      case 'DebitAccountFirstCode':
        break;
      case 'CreditAccountSecondCode':
        break;
      case 'FieldAlertCode':
        this.popUpService.popUpData = this.fieldAlert;
        break;
      case 'FieldNarrationCode':
        this.popUpService.popUpData = this.fieldNarration;
        break;
      case 'FieldMasterCode':
        this.popUpService.popUpData = this.fieldMaster;
        break;
      case 'TabFormCode':
        this.popUpService.popUpData = this.tabForm;
        break;
      case 'SaveMsgAlertCode':
        this.popUpService.popUpData = this.fieldAlert;
        break;
      case 'AuthMsgAlertCode':
        this.popUpService.popUpData = this.fieldAlert;
        break;
      case 'RejectMsgAlertCode':
        this.popUpService.popUpData = this.fieldAlert;
        break;
      case 'AuthMsgEmpCode':
        break;
      case 'RejectMsgEmpCode':
        break;
      case 'InterCompanyTransType':
        break;
      case 'InterCoNarrationCode':
        break;
      case 'LcCurrencyCode':
        this.popUpService.popUpData = this.currencyLov;
        break;
      case 'LcIssuingBankCode':
        break;
      case 'LcAdvisingBankCode':
        break;
      case 'LcNegotiatingBankCode':
        break;
      case 'LcEmpCode':
        break;
      case 'LcAlertCode':
        break;
      case 'LandedCostCode':
        break;

      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {
    let Type = this.popUpService.selectedPopUp
    switch (Type) {
      case 'ShippedTo':
        this._stockService.stockData.tblTransHead.Allh_Shipto_Code = event.code
        this._stockService.stockData.tblTransHead.Allh_Shipto_Name = event.addressOne
        break;
      case 'BilledTo':
        this._stockService.stockData.tblTransHead.Allh_Billto_Code = event.code
        this._stockService.stockData.tblTransHead.Allh_Billto_Name = event.addressOne
        break;
      case 'NarrationCode':
        this._stockService.stockData.tblTransHead.Allh_Narra_Code = event.code
        this._stockService.stockData.tblTransHead.Allh_Narra_Name = event.name
        break;
      case 'WarehouseOneCode':
        this._stockService.stockData.tblTransHead.Allh_WhOne_Code = event.HWh_Code
        this._stockService.stockData.tblTransHead.Allh_WhOne_Name = event.HWh_Name
        break;
      case 'SalesAccount':
        this._stockService.stockData.tblTransHead.Allh_AccSecond_Code = event.HAccOne_Code
        this._stockService.stockData.tblTransHead.Allh_AccSecond_Name = event.HAccOne_Name
        break;
      case 'VocherType':
        this._stockService.stockData.tblTransHead.Allh_Vou_Type = event.voucherName
        break;
      case 'SalesAgreementCode':
        this._stockService.stockData.tblTransHead.Allh_SaleAgree_Code = event.salesAgreementCode
        this._stockService.stockData.tblTransHead.Allh_SaleAgree_Name = event.salesAgreementName
        break;
      case 'ProductModuleCode':
        this._stockService.stockData.tblTransHead.Allh_AllModule_Code = event.productModuleCode
        this._stockService.stockData.tblTransHead.Allh_AllModule_Name = event.productModuleName
        break;
      case 'CurrencyCode':
        this._stockService.stockData.tblTransHead.Allh_Curr_Code = event.HCurr_Code
        this._stockService.stockData.tblTransHead.Allh_Curr_Name = event.HCurr_Name
        this._stockService.stockData.tblTransHead.Allh_Curr_Rate = event.HCurr_Rate
        this.conversionRate = this._stockService.stockData.tblTransHead.Allh_Curr_Rate
        break;
      case 'CustomerCode':
        this._stockService.stockData.tblTransHead.Allh_CusVen_Code = event.HAccOne_Code
        this._stockService.stockData.tblTransHead.Allh_CusVen_Name = event.HAccOne_Name

        break;
      case 'CopyDocFromTemplateCode':
        this._stockService.stockData.tblTransHead.Allh_DocTemp_Code = event.copyDocTempCode
        this._stockService.stockData.tblTransHead.Allh_DocTemp_Name = event.copyDocTempName
        break;
      case 'PaymentTerms':
        this._stockService.stockData.tblTransHead.Allh_PayTerm_Code = event.paymentTermCode
        this._stockService.stockData.tblTransHead.Allh_PayTerm_Name = event.paymentTermName
        this._stockService.stockData.TblPTerm[0].HPay_Term_Code = event.paymentTermCode
        this._stockService.stockData.TblPTerm[0].HPay_Term_Name = event.paymentTermName
        break;
      case 'IncoTerms':
        this._stockService.stockData.tblTransHead.Allh_IncoTerm_Code = event.incoTermCode
        this._stockService.stockData.tblTransHead.Allh_IncoTerm_Name = event.incoTermName
        this._stockService.stockData.TblInco[0].HInco_Term_Code = event.incoTermCode
        this._stockService.stockData.TblInco[0].HInco_Term_Name = event.incoTermName
        // this._stockService.stockData..voucherSysId = event.sysId
        break;
      case 'TaxCode':
        this._stockService.stockData.tblTax[this.tableIndex].HTax_Code = event.HTax_Code
        this._stockService.stockData.tblTax[this.tableIndex].HTax_Name = event.HTax_Name
        this._stockService.stockData.tblTax[this.tableIndex].HTax_InPut_Perc = event.HTax_InputPerc
        this._stockService.stockData.tblTax[this.tableIndex].HTax_OutPut_Perc = event.HTax_OutputPerc
        this.updateTaxFields()
        // this._stockService.stockData.tblTax[0].voucherSysId = event.sysId
        break;

      case 'DTaxCode':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_Tax_Code = event.HTax_Code
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_Tax_Name = event.HTax_Name
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_InPut_Perc = event.HTax_InputPerc
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_OutPut_Perc = event.HTax_OutputPerc
        // this.
        break;
      case 'RemarksCode':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;
      case 'TaxACode':
        this._stockService.stockData.tblTaxAdd[this.tableIndex].HTaxA_Code = event.HTax_Code
        this._stockService.stockData.tblTaxAdd[this.tableIndex].HTaxA_Name = event.HTax_Name
        this._stockService.stockData.tblTaxAdd[this.tableIndex].HTaxA_InPut_Perc = event.HTax_InputPerc
        this._stockService.stockData.tblTaxAdd[this.tableIndex].HTaxA_OutPut_Perc = event.HTax_OutputPerc
        break;
      case 'TaxAccountCodeCode':
        this._stockService.stockData.tblTaxDetail[this.tableIndex].TaxJS_Account_Code = event.accountCode
        this._stockService.stockData.tblTaxDetail[this.tableIndex].TaxJS_Account_Name = event.accountName
        break;
      case 'TaxNarrationCode':
        this._stockService.stockData.tblTaxDetail[this.tableIndex].TaxJS_Narra_Code = event.narrationMasterCode
        this._stockService.stockData.tblTaxDetail[this.tableIndex].TaxJS_Narra_Name = event.narrationMasterName
        break;
      case 'LandedCostCode':
        this._stockService.stockData.tblLandedCost[this.tableIndex].HTransLCost_Code = event.HLandCost_Code
        this._stockService.stockData.tblLandedCost[this.tableIndex].HTransLCost_Name = event.HLandCost_Name
        break;

      case 'ProductCode':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_Prod_Code = event.HProd_Code
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_ProdShort_Name = event.HProd_Short_Name
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_ProdLong_Name = event.HProd_Long_Name
        break;
      case 'DInterCoCode':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_InterSingleCo_Code = event.SingleCo_Code
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_InterSingleCo_Name = event.SingleCo_Name
        break;
      case 'SingleCoCode':
        this._stockService.stockData.tblTransHead.Allh_InterSingleCo_Code = event.SingleCo_Code
        this._stockService.stockData.tblTransHead.Allh_InterSingleCo_Name = event.SingleCo_Name
        break;
      case 'SingleCoCode':
        this._stockService.stockData.tblTransHead.Allh_InterSingleCo_Code = event.SingleCo_Code
        this._stockService.stockData.tblTransHead.Allh_InterSingleCo_Name = event.SingleCo_Name
        break;
      case 'WarehouseOneCode':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_WhOne_Code = event.HWh_Code
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_WhOne_Name = event.HWh_Name
        break;
      case 'WarehouseTwoCode':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_WhTwo_Code = event.HWh_Code
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_WhTwo_Name = event.HWh_Name
        break;
      case 'MrvSingleBatchNumber':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_Multiple_Batch = event.batchNumber
        break;
      case 'MrvMultipleBatchNumber':
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_Multiple_Batch = event.batchNumber
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_MulBatch_Prod_Date = event.batchManufacturingDate
        this._stockService.stockData.tblTransDetail[this.tableIndex].Alld_MulBatch_Exp_Date = event.batchExpiryDate
        break;
      case 'JournalAccountCode':
        this.tblJournal[this.tableIndex].accountCode = event.accountCode
        this.tblJournal[this.tableIndex].accountName = event.accountName
        break;

      case 'CostCenterCode':
        this._stockService.stockData.tblTransHead.Allh_CostCent_Code = event.costCentCode
        this._stockService.stockData.tblTransHead.Allh_CostCent_Name = event.costCentName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'ProfitCenterCode':
        this._stockService.stockData.tblTransHead.Allh_ProCent_Code = event.profitCenterCode
        this._stockService.stockData.tblTransHead.Allh_ProCent_Name = event.profitCenterName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'SalesmanCode':
        this._stockService.stockData.tblTransHead.Allh_Sman_Code = event.salesManCode
        this._stockService.stockData.tblTransHead.Allh_Sman_Name = event.salesManName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'DivisionCode':
        this._stockService.stockData.tblTransHead.Allh_Div_Code = event.divisionCode
        this._stockService.stockData.tblTransHead.Allh_Div_Name = event.divisionName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'DepartmentCode':
        this._stockService.stockData.tblTransHead.Allh_Dept_Code = event.deptCode
        this._stockService.stockData.tblTransHead.Allh_Dept_Name = event.deptName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'JobCode':
        this._stockService.stockData.tblTransHead.Allh_Job_Code = event.jobCode
        this._stockService.stockData.tblTransHead.Allh_Job_Name = event.jobName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'OtherCentreCode':
        this._stockService.stockData.tblTransHead.Allh_OtherCent_Code = event.otherCentreCode
        this._stockService.stockData.tblTransHead.Allh_OtherCent_Name = event.otherCentreName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'SalesOrganizationCode':
        this._stockService.stockData.tblTransHead.Allh_SaleOrg_Code = event.salesOrganizationCode
        this._stockService.stockData.tblTransHead.Allh_SaleOrg_Name = event.salesOrganizationName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'DistributionChannelCode':
        this._stockService.stockData.tblTransHead.Allh_DiscChanel_Code = event.distChanelCode
        this._stockService.stockData.tblTransHead.Allh_DiscChanel_Name = event.distChanelName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'SalesOfficeCode':
        this._stockService.stockData.tblTransHead.Allh_SalesOffice_Code = event.salesOfficeCode
        this._stockService.stockData.tblTransHead.Allh_SalesOffice_Name = event.salesOfficeName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'SalesGroupCode':
        this._stockService.stockData.tblTransHead.Allh_SalesGroup_Code = event.salesGroupCode
        this._stockService.stockData.tblTransHead.Allh_SalesGroup_Name = event.salesGroupName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'PlaceOfSupplyCode':
        this._stockService.stockData.tblTransHead.Allh_PlaceSuppl_Code = event.placeSupplyCode
        this._stockService.stockData.tblTransHead.Allh_PlaceSuppl_Name = event.placeSupplyName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      case 'JurisdictionCode':
        this._stockService.stockData.tblTransHead.Allh_Jurisd_Code = event.jurisdictionCode
        this._stockService.stockData.tblTransHead.Allh_Jurisd_Name = event.jurisdictionName
        // this._stockService.stockData.voucherSysId = event.sysId
        break;
      // case 'PostingHCode':
      //   this._stockService.stockData.tblHPosting[this.tableIndex].postingHeaderCode = event.postingHCode
      //   this._stockService.stockData.tblHPosting[this.tableIndex].postingHeaderName = event.postingHName
      //   this._stockService.stockData.tblHPosting[this.tableIndex].postingSQLFieldName = event.postingSQLFieldName
      //   this._stockService.stockData.tblHPosting[this.tableIndex].PostingFormula = event.postingFormula
      //   this._stockService.stockData.tblHPosting[this.tableIndex].PostingSymbol = event.postingSymbol
      //   this._stockService.stockData.tblHPosting[this.tableIndex].PostingAmount = event.postingAmount
      //   break;
      // case 'PostingDCode':
      //   this._stockService.stockData.tblDPosting[this.tableIndex].postingDetailCode = event.postingDCode
      //   this._stockService.stockData.tblDPosting[this.tableIndex].postingDetailName = event.postingDName
      //   this._stockService.stockData.tblDPosting[this.tableIndex].postingSQLFieldName = event.postingSQLFieldName
      //   this._stockService.stockData.tblDPosting[this.tableIndex].PostingFormula = event.postingFormula
      //   this._stockService.stockData.tblDPosting[this.tableIndex].PostingSymbol = event.postingSymbol
      //   this._stockService.stockData.tblDPosting[this.tableIndex].PostingAmount = event.postingAmount
      //   break;
      // case 'DebitAccountFirstCode':
      //   this._stockService.stockData.tblDPosting[this.tableIndex].debitAccountFirstCode = event.debitAccountFirstCode
      //   this._stockService.stockData.tblDPosting[this.tableIndex].debitAccountFirstName = event.debitAccountFirstName
      //   break;
      // case 'CreditAccountSecondCode':
      //   this._stockService.stockData.tblDPosting[this.tableIndex].creditAccountSecondCode = event.creditAccountSecondCode
      //   this._stockService.stockData.tblDPosting[this.tableIndex].creditAccountSecondName = event.creditAccountSecondName
      //   break;

//

      case 'ExpAccountCode':
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Code = event.accountCode
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Name = event.accountName
        break;
      case 'ExpNarrationCode':
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Narra_Code = event.narrationMasterCode
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Narra_Name = event.narrationMasterName
        break;
      case 'ExpDefaultCurrencyCode':
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Curr_Code = event.HCurr_Code
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Curr_Name = event.HCurr_Name
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Curr_Rate = event.HCurr_Rate
        break;


      case 'LandedExpAccountCode':
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Code = event.accountCode
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Name = event.accountName
        break;
      case 'LandedExpNarrationCode':
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Narra_Code = event.narrationMasterCode
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Narra_Name = event.narrationMasterName
        break;
      case 'LandedExpDefaultCurrencyCode':
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Curr_Code = event.HCurr_Code
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Curr_Name = event.HCurr_Name
        this._stockService.stockData.tblExp[this.tableIndex].ExpS_Curr_Rate = event.HCurr_Rate
        break;



//
      case 'AuthMsgEmpCode':
        this.TblAuthMsg[this.tableIndex].employeeCode = event.employeeCode
        this.TblAuthMsg[this.tableIndex].employeeName = event.employeeName
        this.TblAuthMsg[this.tableIndex].alertsEmail = event.employeeEmail
        break;
      case 'RejectMsgEmpCode':
        this.TblRejectMsg[this.tableIndex].employeeCode = event.employeeCode
        this.TblRejectMsg[this.tableIndex].employeeName = event.employeeName
        this.TblRejectMsg[this.tableIndex].alertsEmail = event.employeeEmail
        break;
      case 'SaveMsgAlertCode':
        this.TblSaveMsg[this.tableIndex].alertsCode = event.alertsMasterCode
        this.TblSaveMsg[this.tableIndex].alertsName = event.alertsName
        break;
      case 'AuthMsgAlertCode':
        this.TblAuthMsg[this.tableIndex].alertsCode = event.alertsMasterCode
        this.TblAuthMsg[this.tableIndex].alertsName = event.alertsName
        break;
      case 'RejectMsgAlertCode':
        this.TblRejectMsg[this.tableIndex].alertsCode = event.alertsMasterCode
        this.TblRejectMsg[this.tableIndex].alertsName = event.alertsName
        break;

      case 'LcCurrencyCode':
        this._stockService.stockData.tblLCMaster.LCMs_Curr_Code = event.HCurr_Code
        this._stockService.stockData.tblLCMaster.LCMs_Curr_Name = event.HCurr_Name
        this._stockService.stockData.tblLCMaster.LCMs_Curr_Conv_Rate = event.HCurr_Rate
        break;
      case 'LcIssuingBankCode':
        this._stockService.stockData.tblLCMaster.LCMs_IssueBank_Code = event.HLCIssuBank_Code;
        this._stockService.stockData.tblLCMaster.LCMs_IssueBank_Name = event.HLCIssuBank_Name;
        break;
      case 'LcAdvisingBankCode':
        this._stockService.stockData.tblLCMaster.LCMs_AdvBank_Code = event.HLCAdvBank_Code;
        this._stockService.stockData.tblLCMaster.LCMs_AdvBank_Name = event.HLCAdvBank_Name;
        break;
      case 'LcNegotiatingBankCode':
        this._stockService.stockData.tblLCMaster.LCMs_NegoBank_Code = event.HLCNegBank_Code;
        this._stockService.stockData.tblLCMaster.LCMs_NegoBank_Name = event.HLCNegBank_Name;
        break;
      case 'LcEmpCode':
        this._stockService.stockData.tblLCDetails[this.tableIndex].LCDs_Emp_Code = event.employeeCode;
        this._stockService.stockData.tblLCDetails[this.tableIndex].LCDs_Emp_Name = event.employeeName;
        this._stockService.stockData.tblLCDetails[this.tableIndex].LCDs_Emp_Email = event.employeeEmail;
        break;
      case 'LcAlertCode':
        this._stockService.stockData.tblLCDetails[this.tableIndex].LCDs_Alert_Code = event.alertsMasterCode
        this._stockService.stockData.tblLCDetails[this.tableIndex].LCDs_Alert_Name = event.alertsName
        break;



      default:
        break;
    }

  }

  // Popup Lov Data Updating ... Ends  //





  // Main Calculations_ FC _ Starts //


  processApiData(): void {       // for updating the data in the form when called from the API
    if (!this._stockService.stockData || !Array.isArray(this._stockService.stockData.tblTransDetail)) {
      console.warn('No data available to process.');
      return;
    }

    this._stockService.stockData.tblTransDetail.forEach((product: any) => {
      product.Alld_Gross_Amount = this.calculateGrossAmount(product);
      product.Alld_Net_Amount = this.calculateNetAmount(product);


      product.Alld_Debit_Amount = product.Alld_Net_Amount || 0;
      product.Alld_Credit_Amount = product.Alld_Net_Amount || 0;

      // Calculate FC Debit and FC Credit based on conversion rate
      if (this.conversionRate && this.conversionRate > 0) {
        product.Alld_Debit_OrgCurr = product.Alld_Debit_Amount / this.conversionRate;
        product.Alld_Credit_OrgCurr = product.Alld_Credit_Amount / this.conversionRate;
      } else {
        product.Alld_Debit_OrgCurr = 0;
        product.Alld_Credit_OrgCurr = 0;
      }

      this.calculateAndUpdateTaxAmounts(product);

      // Calculate FC values based on conversion rate
      if (this.conversionRate && this.conversionRate > 0) {
        product.Alld_Gross_OrgCurr = product.Alld_Gross_Amount / this.conversionRate;
        product.Alld_Net_OrgCurr = product.Alld_Net_Amount / this.conversionRate;
        product.Alld_Discount_OrgCurr = product.Alld_Discount_Amount / this.conversionRate;
      } else {
        product.Alld_Gross_OrgCurr = 0;
        product.Alld_Net_OrgCurr = 0;
        product.Alld_Discount_OrgCurr = 0;
      }
    });
  }

  onInputChange(product: any, field: string): void {
    const affects = this.TableData.find((col) => col.bind === field)?.affects;

    if (affects) {
      affects.forEach((affectedField) => {
        if (affectedField === 'Alld_Gross_Amount') {
          product[affectedField] = this.calculateGrossAmount(product);
        }
        if (affectedField === 'Alld_Net_Amount') {
          product[affectedField] = this.calculateNetAmount(product);
        }
      });
    }

    product.Alld_Debit_Amount = product.Alld_Net_Amount || 0;
    product.Alld_Credit_Amount = product.Alld_Net_Amount || 0;

    // Calculate FC Debit and FC Credit based on conversion rate
    if (this.conversionRate && this.conversionRate > 0) {
      product.Alld_Debit_OrgCurr = product.Alld_Debit_Amount / this.conversionRate;
      product.Alld_Credit_OrgCurr = product.Alld_Credit_Amount / this.conversionRate;
    } else {
      product.Alld_Debit_OrgCurr = 0;
      product.Alld_Credit_OrgCurr = 0;
    }


    this.calculateAndUpdateTaxAmounts(product);

    // Calculate FC values based on conversion rate
    if (this.conversionRate && this.conversionRate > 0) {
      product.Alld_Gross_OrgCurr = product.Alld_Gross_Amount / this.conversionRate;
      product.Alld_Net_OrgCurr = product.Alld_Net_Amount / this.conversionRate;
      product.Alld_Discount_OrgCurr = product.Alld_Discount_Amount / this.conversionRate;
    } else {
      // If no valid conversion rate, set FC values to 0
      product.Alld_Gross_OrgCurr = 0;
      product.Alld_Net_OrgCurr = 0;
      product.Alld_Discount_OrgCurr = 0;
    }
  }

  calculateGrossAmount(product: any): number {
    const qty = parseFloat(product.Alld_Prod_Qty) || 0;
    const rate = parseFloat(product.Alld_Prod_Rate) || 0;
    return qty * rate;
  }

  calculateNetAmount(product: any): number {
    const grossAmount = parseFloat(product.Alld_Gross_Amount) || 0;
    const discount = parseFloat(product.Alld_Discount_Amount) || 0;
    return grossAmount - discount;
  }

  getTotals(): { gross: number; net: number; discount: number; debit: number; credit: number } {
    return this._stockService.stockData.tblTransDetail.reduce(
      (totals, item) => {
        totals.gross += item.Alld_Gross_Amount || 0;
        totals.net += item.Alld_Net_Amount || 0;
        totals.discount += Number(item.Alld_Discount_Amount) || 0;
        totals.debit += item.Alld_Debit_Amount || 0;
        totals.credit += item.Alld_Credit_Amount || 0;
        return totals;
      },
      { gross: 0, net: 0, discount: 0, debit: 0, credit: 0 }
    );
  }

  getFcTotals(): { fcgross: number; fcnet: number; fcdiscount: number; fcdebit: number; fccredit: number } {
    return this._stockService.stockData.tblTransDetail.reduce(
      (totals, item) => {
        totals.fcgross += item.Alld_Gross_OrgCurr || 0;
        totals.fcnet += item.Alld_Net_OrgCurr || 0;
        totals.fcdiscount += item.Alld_Discount_OrgCurr || 0;
        totals.fcdebit += item.Alld_Debit_OrgCurr || 0;
        totals.fccredit += item.Alld_Credit_OrgCurr || 0;
        return totals;
      },
      { fcgross: 0, fcnet: 0, fcdiscount: 0, fcdebit: 0, fccredit: 0 }
    );
  }

  updateTaxFields() {  // call this function in popup when tax fields are updated and in intial screen load 
    const taxData = this._stockService.stockData.tblTax;
    const transactionDetails = this._stockService.stockData.tblTransDetail;

    if (taxData && taxData.length > 0) {
      const taxRow = taxData[0];

      transactionDetails.forEach((product) => {
        if (taxRow.HTax_Code) {
          product.Alld_Tax_Code = taxRow.HTax_Code;
        }

        if (taxRow.HTax_Name) {
          product.Alld_Tax_Name = taxRow.HTax_Name;
        }

        if (taxRow.HTax_InPut_Perc) {
          product.Alld_InPut_Perc = taxRow.HTax_InPut_Perc;
        }

        if (taxRow.HTax_OutPut_Perc) {
          product.Alld_OutPut_Perc = taxRow.HTax_OutPut_Perc;
        }
      });
    } else {
      console.warn('No data available in tblTax to update transaction details.');
    }
  }

  calculateAndUpdateTaxAmounts(product: any): void {
    const taxData = this._stockService.stockData?.tblTax;

    if (taxData && taxData.length > 0) {
      const taxRow = taxData[0];

      if (product.Alld_Net_Amount !== undefined && product.Alld_Net_Amount !== null) {
        product.Alld_InPut_Amount = taxRow.HTax_InPut_Perc
          ? (product.Alld_Net_Amount * taxRow.HTax_InPut_Perc) / 100
          : 0;

        product.Alld_OutPut_Amount = taxRow.HTax_OutPut_Perc
          ? (product.Alld_Net_Amount * taxRow.HTax_OutPut_Perc) / 100
          : 0;

        // Calculate FC values for tax amounts if conversion rate is available
        if (this.conversionRate && this.conversionRate > 0) {
          product.Alld_InPut_OrgCurr = product.Alld_InPut_Amount / this.conversionRate;
          product.Alld_OutPut_OrgCurr = product.Alld_OutPut_Amount / this.conversionRate;
        } else {
          // If no valid conversion rate, set FC tax amounts to 0
          product.Alld_InPut_OrgCurr = 0;
          product.Alld_OutPut_OrgCurr = 0;
        }
      } else {
        console.warn(`NetAmount is not defined for product: ${JSON.stringify(product)}`);
      }
    } else {
      console.warn('No tax data available to calculate tax amounts.');
    }
  }

  getTaxTotals(): { inputTaxAmount: number; outputTaxAmount: number; fcInputTaxAmount: number; fcOutputTaxAmount: number } {
    return this._stockService.stockData.tblTransDetail.reduce(
      (totals, product) => {
        totals.inputTaxAmount += product.Alld_InPut_Amount || 0;
        totals.outputTaxAmount += product.Alld_OutPut_Amount || 0;
        totals.fcInputTaxAmount += product.Alld_InPut_OrgCurr || 0;
        totals.fcOutputTaxAmount += product.Alld_OutPut_OrgCurr || 0;
        return totals;
      },
      {
        inputTaxAmount: 0,
        outputTaxAmount: 0,
        fcInputTaxAmount: 0,
        fcOutputTaxAmount: 0
      }
    );
  }

  clearTaxFields(product: any): void {
    product.Alld_Tax_Code = '';
    product.Alld_InPut_Perc = null;
    product.Alld_OutPut_Perc = null;
    this.onInputChange(product, 'Alld_Tax_Code'); // Recalculate without tax
  }


  calculateTaxAddTotals(): void {
    this.totalTaxAddDebit = this._stockService.stockData.tblTaxDetail.reduce(
      (total, row) => total + (row.TaxJS_Debit_Amount || 0),
      0
    );
    this.totalTaxAddCredit = this._stockService.stockData.tblTaxDetail.reduce(
      (total, row) => total + (row.TaxJS_Credit_Amount || 0),
      0
    );
  }

  // Main Calculations _ FC _ Ends//







  // Data Saving / Updating / Deleting.... Starts //

  Save() {

    // this._stockService.stockData = new TblTransHeadDto();

    this._stockService.stockData.tblExp = []
    this._stockService.stockData.tblLCDetails = []
    this._stockService.stockData.tblDocAttach = []
//

    this._stockService.stockData.tblVesDetail = []
    this._stockService.stockData.tblShipCost = []
    this._stockService.stockData.tblVesContDtChange = []
    this._stockService.stockData.tblVesDocAttach = []

    this._stockService.stockData.tblQaQC = []
    this._stockService.stockData.tblInspe = []
    this._stockService.stockData.tblQaQcDocAttach = []

    this._stockService.stockData.tblWhM = []
    this._stockService.stockData.tblWhMDetail = []
    this._stockService.stockData.tblWhDocAttach = []
    this._stockService.stockData.tblWhM = []

//

    this._stockService.stockData.tblTaxDetail = []

    this._stockService.stockData.tblDigiHead = []


    const totals = this.getTotals();

    this._stockService.stockData.tblTransHead.Allh_Gross_Amount = totals.gross
    this._stockService.stockData.tblTransHead.Allh_Net_Amount = totals.net
    this._stockService.stockData.tblTransHead.Allh_Discount_Amount = totals.discount
    this._stockService.stockData.tblTransHead.Allh_Debit_Amount = totals.debit
    this._stockService.stockData.tblTransHead.Allh_Credit_Amount = totals.credit

    const Fctotals = this.getFcTotals();

    this._stockService.stockData.tblTransHead.Allh_Gross_OrgCurr = Fctotals.fcgross
    this._stockService.stockData.tblTransHead.Allh_Net_OrgCurr = Fctotals.fcnet
    this._stockService.stockData.tblTransHead.Allh_Discount_OrgCurr = Fctotals.fcdiscount
    this._stockService.stockData.tblTransHead.Allh_Debit_OrgCurr = Fctotals.fcdebit
    this._stockService.stockData.tblTransHead.Allh_Credit_OrgCurr = Fctotals.fccredit

    const TaxTotals = this.getTaxTotals()

    this._stockService.stockData.tblTransHead.Allh_InPut_Amount = TaxTotals.inputTaxAmount
    this._stockService.stockData.tblTransHead.Allh_OutPut_Amount = TaxTotals.outputTaxAmount
    this._stockService.stockData.tblTransHead.Allh_InPut_OrgCurr = TaxTotals.fcInputTaxAmount
    this._stockService.stockData.tblTransHead.Allh_OutPut_OrgCurr = TaxTotals.fcOutputTaxAmount

    console.log("totals === ", totals);

    console.log("Fc totals === ", Fctotals);

    console.log("Tax Totals === ", TaxTotals);

    console.log("trans Details  == ", this._stockService.stockData.tblTransDetail);



    // this._stockService.stockData.


    // if (this.stockData.screen && this.stockData.screen == "SalesInvoice") {

    //   if (!this.id) {
    //     this._stockService.Save(this._stockService.stockData).then((res) => {
    //       window.alert('Data Saved Successfully')
    //       this._stockService.stockData = new TblTransHeadDto();
    //     })
    //   }
    //   else if (this.id) {
    //     this._stockService.Save(this._stockService.stockData).then((res) => {
    //       window.alert('Data Saved Successfully')
    //       this._stockService.stockData = new TblTransHeadDto();
    //     })
    //   }



    // }
  }

  delete() {
    this._stockService.deleteDataById(apiUrl.finance, this.id).then((res) => {
      window.alert('Data Deleted Successfully')
    })
  }

  // Data Saving / Updating / Deleting.... Ends //







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
    else if (screen == 'sales-list') {
      this.router.navigate(['/sales/sales-list']);
    }
    else if (screen) {
      this.router.navigate(['/common/' + screen]);
    }
  }

  confirmConf() {
    if (this.headerConf.button === 'Save') {
      // this.showSaveMsg = true
      this.Save()
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