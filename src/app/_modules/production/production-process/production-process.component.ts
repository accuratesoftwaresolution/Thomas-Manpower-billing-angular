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
import { ReceiptAndPaymentService } from 'src/app/_providers/receipt-and-payment.service';
import { tbldProdModuleDTO } from 'src/app/_dto/tbldProdModule.dto';
import { TblSecTransDetailDto } from 'src/app/_dto/TblSecTransDetailDto.dto';
import { TblFirstTransHeadDto } from 'src/app/_dto/tblFirstTransHeadDto.dto';
import { TblSecTransHeadDto } from 'src/app/_dto/tblSecTransHeadDto.dto';


@Component({
  selector: 'app-production-process',
  templateUrl: './production-process.component.html',
  styleUrls: ['./production-process.component.scss']
})
export class ProductionProcessComponent implements OnInit {

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
    title: 'Receipt',
    screen: 'Receipt',
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
    title: 'Receipt',
    screen: 'Receipt',
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


  mainGroupOptions = [
    { code: '1001', name: '1001 High' },
    { code: '1002', name: '1002 Normal' }
  ];

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

  MainActiveIndex: number = 0;

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

  MainTabs: any[] = [
    { id: 0, title: "Main", content: "", visible: true },
    { id: 1, title: "Production Process Materials", content: "", visible: true },
    { id: 2, title: "Production Process Consumables", content: "", visible: true },
    { id: 3, title: "Production Process Packing Materials", content: "", visible: true },
    { id: 4, title: "Production Process Manpower", content: "", visible: true },
    { id: 5, title: "Production Process Scrap", content: "", visible: true },
    { id: 6, title: "Production Process Expenses", content: "", visible: true },
    { id: 6, title: "QA / QC", content: "", visible: true },
    { id: 6, title: "Costing", content: "", visible: true },
  ]

  scrollableTabs: any[] = [
    { id: 0, title: "Main", content: "", visible: true },
    { id: 1, title: "Other Expenses", content: "Content for Other Expenses", visible: false },
    { id: 2, title: "Payment Terms", content: "", visible: true }, // Hidden tab example
    { id: 3, title: "PO Number", content: "", visible: true },
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

  subTableData: any[] = [
    {
      qty: '00', grossAmount: '000.00', discount: '00.00', netAmount: '800.00', costOfSales: '000.00',
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


  //finished goods

  FinishedGoodsJobWise: any[] = [new tbldProdModuleDTO()]

  FinishedGoodsFlow: any[] = [new tbldProdModuleDTO()]

  FinishedGoodsDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  FinishedGoodsTableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: "1", manual: false, bind: "Alld_SysID", type: 'text', key: "Alldp_SysID" },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: "G001", manual: false, bind: "Alld_Grid_SysID", type: 'text', key: "Alldp_Grid_SysID" },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text', key: "Alldp_SlNo" },
    { header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: 'P001', manual: true, bind: "Alld_Prod_Code", type: 'text', key: "Alldp_Prod_Code", PopUp: true, PopUpData: 'FinishedGoodsProductCode' },
    { header: 'Product Name', hide: false, mandatory: false, width: '12rem', data: 'Product A', manual: false, bind: "Alld_ProdShort_Name", type: 'text', key: "Alldp_ProdShort_Name", affects: [], readOnly: false },
    { header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: 'Product Alpha XYZ', manual: false, bind: "Alld_ProdLong_Name", type: 'text', key: "Alldp_ProdLong_Name", readOnly: false },
    { header: 'Unit', hide: false, mandatory: false, width: '6rem', data: 'Kg', manual: false, bind: "Alld_Prod_Unit", type: 'text', key: "Alldp_Prod_Unit" },
    { header: 'Warehouse SysID', hide: false, mandatory: false, width: '6rem', data: 'WH001', manual: false, bind: "Alld_WhOne_SysID", type: 'text', key: "Alldp_WhOne_SysID" },
    { header: 'Warehouse Code', hide: false, mandatory: false, width: '8rem', data: 'W001', manual: false, bind: "Alld_WhOne_Code", type: 'text', key: "Alldp_WhOne_Code", PopUp: true, PopUpData: 'FinishedGoodsWarehouseOneCode' },
    { header: 'Warehouse Name', hide: false, mandatory: false, width: '12rem', data: 'Main Warehouse', manual: false, bind: "Alld_WhOne_Name", type: 'text', key: "Alldp_WhOne_Name" },
    { header: 'BOM Account Module SysID', hide: false, mandatory: false, width: '6rem', data: 'BAM001', manual: false, bind: "Alld_BOMProdModu_SysID", type: 'text', key: "Alldp_BOMProdModu_SysID" },
    { header: 'BOM Account Module Code', hide: false, mandatory: false, width: '8rem', data: 'BOM-101', manual: false, bind: "Alld_BOMProdModu_Code", type: 'text', key: "Alldp_BOMProdModu_Code", PopUp: true, PopUpData: 'FinishedGoodsProductModule' },
    { header: 'BOM Account Module Name', hide: false, mandatory: false, width: '12rem', data: 'BOM Processing', manual: false, bind: "Alld_BOMProdModu_Name", type: 'text', key: "Alldp_BOMProdModu_Name" },
    { header: 'Required Production Qty', hide: false, mandatory: false, width: '10rem', data: '500', manual: false, bind: "Alld_Prod_Qty", type: 'number', key: "Alldp_Prod_Qty" },
    { header: 'Batch Number', hide: false, mandatory: false, width: '10rem', data: 'B-123', manual: false, bind: "Alld_Multiple_Batch", type: 'text', key: "Alldp_Multiple_Batch", PopUp: true, PopUpData: 'MrvMultipleBatchNumber' },
    { header: 'Product Serial Number', hide: false, mandatory: false, width: '10rem', data: 'SN-001234', manual: false, bind: "Alld_BOMFinishPro_SlNo", type: 'text', key: "Alldp_BOMFinishPro_SlNo" },
    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "Alldp_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "Alldp_Remark_Code", PopUp: true, PopUpData: 'FinishedGoodsRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "Alldp_Remark_Name" },

    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "Alldp_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "Alldp_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "Alldp_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "Alldp_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "Alldp_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "Alldp_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "Alldp_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "Alldp_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "Alldp_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "Alldp_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "Alldp_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "Alldp_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "Alldp_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "Alldp_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "Alldp_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "Alldp_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "Alldp_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "Alldp_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "Alldp_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "Alldp_20_Other" },
  ];

  ProdMethodProdFlowDetail: any[] = [{}]


  //Process Materials


  processMaterialsBomProductModule: any[] = [new tbldProdModuleDTO()]

  MaterialsProdFlow: any[] = [new tbldProdModuleDTO()]

  MaterialsDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  ProcessMaterialsTableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: "1", manual: false, bind: "Alld_SysID", type: 'text', key: "AlldPs_SysID" },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: "G001", manual: false, bind: "Alld_Grid_SysID", type: 'text', key: "AlldPs_Grid_SysID" },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text', key: "AlldPs_SlNo" },
    { header: 'Product SysID', hide: false, mandatory: true, width: '6rem', data: 'P001', manual: false, bind: "Alld_Prod_SysID", type: 'text', key: "AlldPs_Prod_SysID" },
    { header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: 'P001', manual: true, bind: "Alld_Prod_Code", type: 'text', PopUp: true, PopUpData: 'processMaterialsProductCode', key: "AlldPw_Prod_Code" },
    { header: 'Product Short Name', hide: false, mandatory: false, width: '12rem', data: 'Prod A', manual: false, bind: "Alld_ProdShort_Name", type: 'text', key: "AlldPw_ProdShort_Name" },
    { header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: 'Product Alpha XYZ', manual: false, bind: "Alld_ProdLong_Name", type: 'text', key: "AlldPw_ProdLong_Name" },
    { header: 'BOM Product Module SysID', hide: false, mandatory: false, width: '6rem', data: 'BPM001', manual: false, bind: "Alld_BOMProdModu_SysID", type: 'text', key: "AlldPw_BOMProdModu_SysID" },
    { header: 'BOM Product Module Code', hide: false, mandatory: false, width: '8rem', data: 'BPM-101', manual: false, bind: "Alld_BOMProdModu_Code", type: 'text', PopUp: true, PopUpData: 'processMaterialsProductModule2', key: "AlldPw_BOMProdModu_Code" },
    { header: 'BOM Product Module Name', hide: false, mandatory: false, width: '12rem', data: 'BOM Processing', manual: false, bind: "Alld_BOMProdModu_Name", type: 'text', key: "AlldPw_BOMProdModu_Name" },
    { header: 'Unit', hide: false, mandatory: false, width: '6rem', data: 'Kg', manual: false, bind: "Alld_Prod_Unit", type: 'text', key: "AlldPw_Prod_Unit" },
    { header: 'Wh SysID', hide: false, mandatory: false, width: '6rem', data: 'WH001', manual: false, bind: "Alld_WhOne_SysID", type: 'text', key: "AlldPw_WhOne_SysID" },
    { header: 'Wh Code', hide: false, mandatory: false, width: '8rem', data: 'W001', manual: false, bind: "Alld_WhOne_Code", type: 'text', PopUp: true, PopUpData: 'processMaterialsWarehouseOneCode', key: "AlldPw_WhOne_Code" },
    { header: 'Wh Name', hide: false, mandatory: false, width: '12rem', data: 'Main Warehouse', manual: false, bind: "Alld_WhOne_Name", type: 'text', key: "AlldPw_WhOne_Name" },
    { header: 'Qty', hide: false, mandatory: false, width: '10rem', data: '500', manual: false, bind: "Alld_Prod_Qty", type: 'number', key: "AlldPw_Prod_Qty" },
    { header: 'Rate', hide: false, mandatory: false, width: '10rem', data: '100', manual: false, bind: "Alld_Prod_Rate", type: 'number', key: "AlldPw_Prod_Rate" },
    { header: 'Batch Number', hide: false, mandatory: false, width: '10rem', data: 'B-123', manual: false, bind: "Alld_Multiple_Batch", type: 'text', PopUp: true, PopUpData: 'MrvMultipleBatchNumber', key: "AlldPw_SysID" },
    { header: 'Amount', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_Gross_Amount", type: 'number', key: "AlldPw_Gross_Amount" },
    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "AlldPw_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "AlldPw_Remark_Code", PopUp: true, PopUpData: 'ProcessMaterialsRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "AlldPw_Remark_Name" },

    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "AlldPw_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "AlldPw_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "AlldPw_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "AlldPw_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "AlldPw_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "AlldPw_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "AlldPw_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "AlldPw_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "AlldPw_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "AlldPw_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "AlldPw_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "AlldPw_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "AlldPw_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "AlldPw_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "AlldPw_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "AlldPw_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "AlldPw_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "AlldPw_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "AlldPw_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "AlldPw_20_Other" },
  ];



  //Process Consumables

  ConsumablesProductModule: any[] = [new tbldProdModuleDTO()]

  ConsumablesProdFlow: any[] = [new tbldProdModuleDTO()]

  ConsumablesDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  ConsumablesTableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: "1", manual: false, bind: "Alld_SysID", type: 'text', key: "AlldPc_SysID" },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: "G001", manual: false, bind: "Alld_Grid_SysID", type: 'text', key: "AlldPc_Grid_SysID" },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text', key: "AlldPc_SlNo" },
    { header: 'Product SysID', hide: false, mandatory: true, width: '6rem', data: 'P001', manual: false, bind: "Alld_Prod_SysID", type: 'text', key: "AlldPc_Prod_SysID" },
    { header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: 'P001', manual: true, bind: "Alld_Prod_Code", type: 'text', PopUp: true, PopUpData: 'ConsumablesProductCode', key: "AlldPc_Prod_Code" },
    { header: 'Product Short Name', hide: false, mandatory: false, width: '12rem', data: 'Prod A', manual: false, bind: "Alld_ProdShort_Name", type: 'text', key: "AlldPc_ProdShort_Name" },
    { header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: 'Product Alpha XYZ', manual: false, bind: "Alld_ProdLong_Name", type: 'text', key: "AlldPc_ProdLong_Name" },
    { header: 'BOM Product Module SysID', hide: false, mandatory: false, width: '6rem', data: 'BPM001', manual: false, bind: "Alld_BOMProdModu_SysID", type: 'text', key: "AlldPc_BOMProdModu_SysID" },
    { header: 'BOM Product Module Code', hide: false, mandatory: false, width: '8rem', data: 'BPM-101', manual: false, bind: "Alld_BOMProdModu_Code", type: 'text', PopUp: true, PopUpData: 'ConsumablesProductModule2', key: "AlldPc_BOMProdModu_Code" },
    { header: 'BOM Product Module Name', hide: false, mandatory: false, width: '12rem', data: 'BOM Processing', manual: false, bind: "Alld_BOMProdModu_Name", type: 'text', key: "AlldPc_BOMProdModu_Name" },
    { header: 'Unit', hide: false, mandatory: false, width: '6rem', data: 'Kg', manual: false, bind: "Alld_Prod_Unit", type: 'text', key: "AlldPc_Prod_Unit" },
    { header: 'Wh SysID', hide: false, mandatory: false, width: '6rem', data: 'WH001', manual: false, bind: "Alld_WhOne_SysID", type: 'text', key: "AlldPc_WhOne_SysID" },
    { header: 'Wh Code', hide: false, mandatory: false, width: '8rem', data: 'W001', manual: false, bind: "Alld_WhOne_Code", type: 'text', PopUp: true, PopUpData: 'ConsumablesWarehouseOneCode', key: "AlldPc_WhOne_Code" },
    { header: 'Wh Name', hide: false, mandatory: false, width: '12rem', data: 'Main Warehouse', manual: false, bind: "Alld_WhOne_Name", type: 'text', key: "AlldPc_WhOne_Name" },
    { header: 'Qty', hide: false, mandatory: false, width: '10rem', data: '500', manual: false, bind: "Alld_Prod_Qty", type: 'number', key: "AlldPc_Prod_Qty" },
    { header: 'Rate', hide: false, mandatory: false, width: '10rem', data: '100', manual: false, bind: "Alld_Prod_Rate", type: 'number', key: "AlldPc_Prod_Rate" },
    { header: 'Batch Number', hide: false, mandatory: false, width: '10rem', data: 'B-123', manual: false, bind: "Alld_Multiple_Batch", type: 'text', PopUp: true, PopUpData: 'MrvMultipleBatchNumber', key: "AlldPc_SysID" },
    { header: 'Amount', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_Gross_Amount", type: 'number', key: "AlldPc_Gross_Amount" },
    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "AlldPc_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "AlldPc_Remark_Code", PopUp: true, PopUpData: 'ConsumablesRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "AlldPc_Remark_Name" },
    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "AlldPc_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "AlldPc_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "AlldPc_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "AlldPc_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "AlldPc_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "AlldPc_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "AlldPc_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "AlldPc_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "AlldPc_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "AlldPc_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "AlldPc_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "AlldPc_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "AlldPc_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "AlldPc_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "AlldPc_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "AlldPc_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "AlldPc_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "AlldPc_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "AlldPc_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "AlldPc_20_Other" },
  ];


  //Packing Materials

  packingMaterialsProductModule: any[] = [new tbldProdModuleDTO()]

  packingMaterialsProdFlow: any[] = [new tbldProdModuleDTO()]

  packingMaterialsDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  packingMaterialsTableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: "1", manual: false, bind: "Alld_SysID", type: 'text', key: "AlldPk_SysID" },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: "G001", manual: false, bind: "Alld_Grid_SysID", type: 'text', key: "AlldPk_Grid_SysID" },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text', key: "AlldPk_SlNo" },
    { header: 'Product SysID', hide: false, mandatory: true, width: '6rem', data: 'P001', manual: false, bind: "Alld_Prod_SysID", type: 'text', key: "AlldPk_Prod_SysID" },
    { header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: 'P001', manual: true, bind: "Alld_Prod_Code", type: 'text', PopUp: true, PopUpData: 'PackingMaterialsProductCode', key: "AlldPk_Prod_Code" },
    { header: 'Product Short Name', hide: false, mandatory: false, width: '12rem', data: 'Prod A', manual: false, bind: "Alld_ProdShort_Name", type: 'text', key: "AlldPk_ProdShort_Name" },
    { header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: 'Product Alpha XYZ', manual: false, bind: "Alld_ProdLong_Name", type: 'text', key: "AlldPk_ProdLong_Name" },
    { header: 'BOM Product Module SysID', hide: false, mandatory: false, width: '6rem', data: 'BPM001', manual: false, bind: "Alld_BOMProdModu_SysID", type: 'text', key: "AlldPk_BOMProdModu_SysID" },
    { header: 'BOM Product Module Code', hide: false, mandatory: false, width: '8rem', data: 'BPM-101', manual: false, bind: "Alld_BOMProdModu_Code", type: 'text', PopUp: true, PopUpData: 'PackingMaterialsProductModule2', key: "AlldPk_BOMProdModu_Code" },
    { header: 'BOM Product Module Name', hide: false, mandatory: false, width: '12rem', data: 'BOM Processing', manual: false, bind: "Alld_BOMProdModu_Name", type: 'text', key: "AlldPk_BOMProdModu_Name" },
    { header: 'Unit', hide: false, mandatory: false, width: '6rem', data: 'Kg', manual: false, bind: "Alld_Prod_Unit", type: 'text', key: "AlldPk_Prod_Unit" },
    { header: 'Wh SysID', hide: false, mandatory: false, width: '6rem', data: 'WH001', manual: false, bind: "Alld_WhOne_SysID", type: 'text', key: "AlldPk_WhOne_SysID" },
    { header: 'Wh Code', hide: false, mandatory: false, width: '8rem', data: 'W001', manual: false, bind: "Alld_WhOne_Code", type: 'text', PopUp: true, PopUpData: 'PackingMaterialsWarehouseOneCode', key: "AlldPk_WhOne_Code" },
    { header: 'Wh Name', hide: false, mandatory: false, width: '12rem', data: 'Main Warehouse', manual: false, bind: "Alld_WhOne_Name", type: 'text', key: "AlldPk_WhOne_Name" },
    { header: 'Qty', hide: false, mandatory: false, width: '10rem', data: '500', manual: false, bind: "Alld_Prod_Qty", type: 'number', key: "AlldPk_Prod_Qty" },
    { header: 'Rate', hide: false, mandatory: false, width: '10rem', data: '100', manual: false, bind: "Alld_Prod_Rate", type: 'number', key: "AlldPk_Prod_Rate" },
    { header: 'Batch Number', hide: false, mandatory: false, width: '10rem', data: 'B-123', manual: false, bind: "Alld_Multiple_Batch", type: 'text', PopUp: true, PopUpData: 'MrvMultipleBatchNumber', key: "AlldPk_SysID" },
    { header: 'Amount', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_Gross_Amount", type: 'number', key: "AlldPk_Gross_Amount" },
    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "AlldPk_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "AlldPk_Remark_Code", PopUp: true, PopUpData: 'PackingMaterialsRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "AlldPk_Remark_Name" },
    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "AlldPk_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "AlldPk_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "AlldPk_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "AlldPk_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "AlldPk_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "AlldPk_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "AlldPk_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "AlldPk_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "AlldPk_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "AlldPk_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "AlldPk_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "AlldPk_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "AlldPk_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "AlldPk_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "AlldPk_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "AlldPk_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "AlldPk_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "AlldPk_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "AlldPk_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "AlldPk_20_Other" },
  ];


  //Manpower

  ManpowerProductModule: any[] = [new tbldProdModuleDTO()]

  ManpowerProdFlow: any[] = [new tbldProdModuleDTO()]

  ManpowerDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  ManpowerTableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: "1", manual: false, bind: "Alld_SysID", type: 'text', key: "AlldPm_SysID" },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: "G001", manual: false, bind: "Alld_Grid_SysID", type: 'text', key: "AlldPm_Grid_SysID" },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text', key: "AlldPm_SlNo" },
    { header: 'Manpower SysID', hide: false, mandatory: true, width: '6rem', data: 'P001', manual: false, bind: "Alld_BOMEmp_SysID", type: 'text', key: "AlldPm_BOMEmp_SysID" },
    { header: 'Manpower Code', hide: false, mandatory: true, width: '8rem', data: 'P001', manual: true, bind: "Alld_BOMEmp_Code", type: 'text', PopUp: true, PopUpData: 'ManpowerCode', key: "AlldPm_BOMEmp_Code" },

    { header: 'Manpower  Name', hide: false, mandatory: false, width: '12rem', data: 'Prod A', manual: false, bind: "Alld_BOMEmp_Name", type: 'text', key: "AlldPm_BOMEmp_Name" },
    { header: 'BOM Manpower Module SysID', hide: false, mandatory: false, width: '6rem', data: 'BPM001', manual: false, bind: "Alld_ManPowModu_SysID", type: 'text', key: "AlldPm_ManPowModu_SysID" },
    { header: 'BOM Manpower Module Code', hide: false, mandatory: false, width: '8rem', data: 'BPM-101', manual: false, bind: "Alld_ManPowModu_Code", type: 'text', PopUp: true, PopUpData: 'ManpowerModule2', key: "AlldPm_ManPowModu_Code" },
    { header: 'BOM Manpower Module Name', hide: false, mandatory: false, width: '12rem', data: 'BOM Processing', manual: false, bind: "Alld_ManPowModu_Name", type: 'text', key: "AlldPm_ManPowModu_Name" },
    { header: 'Number Of Hrs', hide: false, mandatory: false, width: '10rem', data: 'B-123', manual: false, bind: "Alld_BOMMan_Hrs", type: 'text', key: "AlldPm_BOMMan_Hrs" },

    { header: 'Rate', hide: false, mandatory: false, width: '10rem', data: '100', manual: false, bind: "Alld_Prod_Rate", type: 'number', key: "AlldPm_Prod_Rate" },
    { header: 'Amount', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_Gross_Amount", type: 'number', key: "AlldPm_Gross_Amount" },
    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "AlldPm_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "AlldPm_Remark_Code", PopUp: true, PopUpData: 'ManpowerRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "AlldPm_Remark_Name" },

    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "AlldPm_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "AlldPm_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "AlldPm_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "AlldPm_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "AlldPm_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "AlldPm_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "AlldPm_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "AlldPm_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "AlldPm_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "AlldPm_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "AlldPm_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "AlldPm_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "AlldPm_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "AlldPm_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "AlldPm_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "AlldPm_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "AlldPm_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "AlldPm_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "AlldPm_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "AlldPm_20_Other" },
  ];


  //Manpower - Job Card / Employee 

  EmployeeProductModule: any[] = [new tbldProdModuleDTO()]

  EmployeeDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  EmployeeTableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: "1", manual: false, bind: "Alld_SysID", type: 'text', key: "AlldPe_SysID" },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: "G001", manual: false, bind: "Alld_Grid_SysID", type: 'text', key: "AlldPe_Grid_SysID" },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text', key: "AlldPe_SlNo" },

    { header: 'Employee SysID', hide: false, mandatory: true, width: '6rem', data: 'P001', manual: false, bind: "Alld_BOMEmp_SysID", type: 'text', key: "AlldPe_BOMEmp_SysID" },
    { header: 'Employee Code', hide: false, mandatory: true, width: '8rem', data: 'P001', manual: true, bind: "Alld_BOMEmp_Code", type: 'text', PopUp: true, PopUpData: 'BomEmployeeCode', key: "AlldPe_BOMEmp_Code" },
    { header: 'Employee  Name', hide: false, mandatory: false, width: '12rem', data: 'Prod A', manual: false, bind: "Alld_BOMEmp_Name", type: 'text', key: "AlldPe_BOMEmp_Name" },

    { header: 'BOM Employee Module SysID', hide: false, mandatory: false, width: '6rem', data: 'BPM001', manual: false, bind: "Alld_BOMEmpModu_SysID", type: 'text', key: "AlldPe_BOMEmpModu_SysID" },
    { header: 'BOM Employee Module Code', hide: false, mandatory: false, width: '8rem', data: 'BPM-101', manual: false, bind: "Alld_BOMEmpModu_Code", type: 'text', PopUp: true, PopUpData: 'BomEmployeeModule2', key: "AlldPe_BOMEmpModu_Code" },
    { header: 'BOM Employee Module Name', hide: false, mandatory: false, width: '12rem', data: 'BOM Processing', manual: false, bind: "Alld_BOMEmpModu_Name", type: 'text', key: "AlldPe_BOMEmpModu_Name" },

    { header: 'To Date', hide: false, mandatory: false, width: '10rem', data: 'B-123', manual: false, bind: "Alld_BOMEmp_ToDate", type: 'text', key: "AlldPe_BOMEmp_ToDate" },
    { header: 'From Hours', hide: false, mandatory: false, width: '10rem', data: '100', manual: false, bind: "Alld_BOMEmp_FromHrs", type: 'number', key: "AlldPe_BOMEmp_FromHrs" },
    { header: 'To Hours', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_BOMEmp_ToHrs", type: 'number', key: "AlldPe_BOMEmp_ToHrs" },
    { header: 'Estimated Hours', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_BOMEmp_EstHrs", type: 'number', key: "AlldPe_BOMEmp_EstHrs" },
    { header: 'Actual Manhours', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_BOMEmp_ActuHrs", type: 'number', key: "AlldPe_BOMEmp_ActuHrs" },


    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "AlldPe_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "AlldPe_Remark_Code", PopUp: true, PopUpData: 'BomEmpRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "AlldPe_Remark_Name" },

    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "AlldPe_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "AlldPe_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "AlldPe_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "AlldPe_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "AlldPe_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "AlldPe_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "AlldPe_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "AlldPe_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "AlldPe_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "AlldPe_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "AlldPe_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "AlldPe_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "AlldPe_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "AlldPe_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "AlldPe_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "AlldPe_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "AlldPe_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "AlldPe_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "AlldPe_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "AlldPe_20_Other" },
  ];


  //Scrap 


  ScrapProductModule: any[] = [new tbldProdModuleDTO()]

  ScrapProdFlow: any[] = [new tbldProdModuleDTO()]

  ScrapDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  ScrapTableData = [
    { header: 'SysID', hide: false, mandatory: true, width: '3rem', data: "1", manual: false, bind: "Alld_SysID", type: 'text', key: "AlldPs_SysID" },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: "G001", manual: false, bind: "Alld_Grid_SysID", type: 'text', key: "AlldPs_Grid_SysID" },
    { header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text', key: "AlldPs_SlNo" },
    { header: 'Product SysID', hide: false, mandatory: true, width: '6rem', data: 'P001', manual: false, bind: "Alld_Prod_SysID", type: 'text', key: "AlldPs_Prod_SysID" },
    { header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: 'P001', manual: true, bind: "Alld_Prod_Code", type: 'text', PopUp: true, PopUpData: 'ScrapProductCode', key: "AlldPs_Prod_Code" },
    { header: 'Product Short Name', hide: false, mandatory: false, width: '12rem', data: 'Prod A', manual: false, bind: "Alld_ProdShort_Name", type: 'text', key: "AlldPs_ProdShort_Name" },
    { header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: 'Product Alpha XYZ', manual: false, bind: "Alld_ProdLong_Name", type: 'text', key: "AlldPs_ProdLong_Name" },
    { header: 'BOM Product Module SysID', hide: false, mandatory: false, width: '6rem', data: 'BPM001', manual: false, bind: "Alld_BOMProdModu_SysID", type: 'text', key: "AlldPs_BOMProdModu_SysID" },
    { header: 'BOM Product Module Code', hide: false, mandatory: false, width: '8rem', data: 'BPM-101', manual: false, bind: "Alld_BOMProdModu_Code", type: 'text', PopUp: true, PopUpData: 'ScrapProductModule2', key: "AlldPs_BOMProdModu_Code" },
    { header: 'BOM Product Module Name', hide: false, mandatory: false, width: '12rem', data: 'BOM Processing', manual: false, bind: "Alld_BOMProdModu_Name", type: 'text', key: "AlldPs_BOMProdModu_Name" },
    { header: 'Unit', hide: false, mandatory: false, width: '6rem', data: 'Kg', manual: false, bind: "Alld_Prod_Unit", type: 'text', key: "AlldPs_Prod_Unit" },
    { header: 'Wh SysID', hide: false, mandatory: false, width: '6rem', data: 'WH001', manual: false, bind: "Alld_WhOne_SysID", type: 'text', key: "AlldPs_WhOne_SysID" },
    { header: 'Wh Code', hide: false, mandatory: false, width: '8rem', data: 'W001', manual: false, bind: "Alld_WhOne_Code", type: 'text', PopUp: true, PopUpData: 'ScrapWarehouseOneCode', key: "AlldPs_WhOne_Code" },
    { header: 'Wh Name', hide: false, mandatory: false, width: '12rem', data: 'Main Warehouse', manual: false, bind: "Alld_WhOne_Name", type: 'text', key: "AlldPs_WhOne_Name" },
    { header: 'Qty', hide: false, mandatory: false, width: '10rem', data: '500', manual: false, bind: "Alld_Prod_Qty", type: 'number', key: "AlldPs_Prod_Qty" },
    { header: 'Rate', hide: false, mandatory: false, width: '10rem', data: '100', manual: false, bind: "Alld_Prod_Rate", type: 'number', key: "AlldPs_Prod_Rate" },
    { header: 'Batch Number', hide: false, mandatory: false, width: '10rem', data: 'B-123', manual: false, bind: "Alld_Multiple_Batch", type: 'text', PopUp: true, PopUpData: 'MrvMultipleBatchNumber', key: "AlldPs_SysID" },
    { header: 'Amount', hide: false, mandatory: false, width: '10rem', data: '50000', manual: false, bind: "Alld_Gross_Amount", type: 'number', key: "AlldPs_Gross_Amount" },
    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "AlldPs_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "AlldPs_Remark_Code", PopUp: true, PopUpData: 'ScrapRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "AlldPs_Remark_Name" },
    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "AlldPs_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "AlldPs_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "AlldPs_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "AlldPs_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "AlldPs_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "AlldPs_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "AlldPs_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "AlldPs_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "AlldPs_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "AlldPs_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "AlldPs_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "AlldPs_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "AlldPs_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "AlldPs_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "AlldPs_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "AlldPs_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "AlldPs_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "AlldPs_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "AlldPs_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "AlldPs_20_Other" },
  ];


  //Expense 


  ExpenseProductModule: any[] = [new tbldProdModuleDTO()]

  ExpenseProdFlow: any[] = [new tbldProdModuleDTO()]

  ExpenseDetails: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto(),]

  ExpenseTableData = [
    { header: 'Sys ID', hide: false, mandatory: true, width: '3rem', data: '1', manual: false, bind: 'Alld_SysID', type: 'text', key: 'AlldPx_SysID' },
    { header: 'Grid SysID', hide: false, mandatory: true, width: '3rem', data: 'G001', manual: false, bind: 'Alld_Grid_Sys', type: 'text', key: 'AlldPx_Grid_SysID' },
    { header: 'Account SysID', hide: false, mandatory: true, width: '6rem', data: 'A001', manual: false, bind: 'Alld_AccFirst_SysID', type: 'text', key: 'AlldPx_AccFirst_SysID' },
    { header: 'Account Code', hide: false, mandatory: true, width: '8rem', data: 'AC001', manual: true, bind: 'Alld_AccFirst_Code', type: 'text', PopUp: true, PopUpData: 'ExpenseAccountFirstCode', key: 'AlldPx_AccFirst_Code' },
    { header: 'Account Name', hide: false, mandatory: false, width: '12rem', data: 'Cleaning', manual: false, bind: 'Alld_AccFirst_Name', type: 'text', key: 'AlldPx_AccFirst_Name' },
    { header: 'FC Amount', hide: false, mandatory: false, width: '10rem', data: '500', manual: false, bind: 'Alld_FC_Amount', type: 'number', key: 'AlldPx_FC_Amount' },
    { header: 'Account Module SysID', hide: false, mandatory: false, width: '6rem', data: 'AM001', manual: false, bind: 'Alld_BOMProdModu_SysID', type: 'text', key: 'AlldPx_BOMProdModu_SysID' },
    { header: 'Account Module Code', hide: false, mandatory: false, width: '8rem', data: 'AMC-101', manual: false, bind: 'Alld_BOMProdModu_Code', type: 'text', key: 'AlldPx_BOMProdModu_Code', popUp: true, PopUpData: 'ExpenseProductModule2' },
    { header: 'Account Module Name', hide: false, mandatory: false, width: '12rem', data: 'Module Alpha', manual: false, bind: 'Alld_BOMProdModu_Name', type: 'text', key: 'AlldPx_BOMProdModu_Name' },
    { header: 'Currency SysID', hide: false, mandatory: false, width: '6rem', data: 'C001', manual: false, bind: 'Alld_Curr_SysID', type: 'text', key: 'AlldPx_Curr_SysID' },
    { header: 'Currency Code', hide: false, mandatory: false, width: '8rem', data: 'AED', manual: false, bind: 'Alld_Curr_Code', type: 'text', key: 'AlldPx_Curr_Code', PopUp: true, PopUpData: 'ExpenseCurrencyCode' },
    { header: 'Currency Name', hide: false, mandatory: false, width: '10rem', data: 'Emirati Dirham', manual: false, bind: 'Alld_Curr_Name', type: 'text', key: 'AlldPx_Curr_Name' },
    { header: 'Currency Rate', hide: false, mandatory: false, width: '10rem', data: '1', manual: false, bind: 'Alld_Curr_Rate', type: 'number', key: 'AlldPx_Curr_Rate' },
    { header: 'Expenses Amount', hide: false, mandatory: false, width: '10rem', data: '500', manual: false, bind: 'Alld_Expenses_Amount', type: 'number', key: 'AlldPx_Expenses_Amount' },
    // { header: 'Narration Code', hide: false, mandatory: false, width: '8rem', data: '1001', manual: false, bind: 'Alld_Narra_Code', type: 'text', key: 'AlldPx_Narra_Code', PopUp: true, PopUpData: 'ExpenseNarrationCode' },
    // { header: 'Narration Name', hide: false, mandatory: false, width: '12rem', data: 'Cleaning', manual: false, bind: 'Alld_Narra_Name', type: 'text', key: 'AlldPx_Narra_Name' },
    { header: 'Remark SysID', hide: false, mandatory: false, width: '6rem', data: 'R001', manual: false, bind: "Alld_Remark_SysID", type: 'text', key: "AlldPx_Remark_SysID" },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', key: "AlldPx_Remark_Code", PopUp: true, PopUpData: 'ExpenseRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789', manual: false, bind: "Alld_Remark_Name", type: 'text', key: "AlldPx_Remark_Name" },


    { field: 'other1Fields', header: 'Other 1 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text', key: "AlldPx_1_Other" },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text', key: "AlldPx_2_Other" },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text', key: "AlldPx_3_Other" },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text', key: "AlldPx_4_Other" },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text', key: "AlldPx_5_Other" },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text', key: "AlldPx_6_Other" },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text', key: "AlldPx_7_Other" },
    { field: 'other8Fields', header: 'Other 8 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text', key: "AlldPx_8_Other" },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text', key: "AlldPx_9_Other" },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text', key: "AlldPx_10_Other" },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text', key: "AlldPx_11_Other" },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text', key: "AlldPx_12_Other" },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text', key: "AlldPx_13_Other" },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text', key: "AlldPx_14_Other" },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text', key: "AlldPx_15_Other" },
    { field: 'other10Fields', header: 'Other 16 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_16_Other", type: 'text', key: "AlldPx_16_Other" },
    { field: 'other11Fields', header: 'Other 17 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_17_Other", type: 'text', key: "AlldPx_17_Other" },
    { field: 'other12Fields', header: 'Other 18 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_18_Other", type: 'text', key: "AlldPx_18_Other" },
    { field: 'other13Fields', header: 'Other 19 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_19_Other", type: 'text', key: "AlldPx_19_Other" },
    { field: 'other14Fields', header: 'Other 20 Fields', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_20_Other", type: 'text', key: "AlldPx_20_Other" },
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
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_AccFirst_Code',
      HFieldValue_Yn: true,
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
      HDataField_Name: 'Allh_AccFirst_Name',
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
      HDataField_Name: 'Allh_Curr_Code',
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
      HDataField_Name: 'Allh_Curr_Name',
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
      HDataField_Name: 'Allh_Curr_Rate',
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
      HDataField_Name: 'Allh_AllModule_Name',
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
      HDataField_Name: 'Allh_DocTemp_Name',
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
      HDataField_Name: 'Allh_BOMProdModu_Code',
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
      HDataField_Name: 'Allh_BOMProdModu_Name',
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
      HDataField_Name: 'Allh_BomStart_Date',
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
      HDataField_Name: 'Allh_BomPrior_Code',
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
      HDataField_Name: 'Allh_BomPrior_List',
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
      HDataField_Name: 'Allh_BomEnd_Date',
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
      HDataField_Name: 'Allh_BOMSoNumber',
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
      HDataField_Name: 'Allh_BOMSoQty',
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
      HDataField_Name: 'Allh_BOMSoDate',
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
      HDataField_Name: 'Allh_BOMPoNumber',
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
      HDataField_Name: 'Allh_BOMPoQty',
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
      HDataField_Name: 'Allh_BOMPODate',
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
      HDataField_Name: 'Allh_BomFinalCompl_Date',
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

    /// job wise
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HJob_SysID',
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
      HDataField_Name: 'HJob_Code',
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
      HDataField_Name: 'HJob_Name',
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
      HDataField_Name: 'HBatch_SysID',
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
      HDataField_Name: 'HBatch_Code',
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
      HDataField_Name: 'HBatch_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Create Production Flow Detail
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'ProdModule_Grid_SysID',
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
      HDataField_Name: 'HProFinsh_SysID',
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
      HDataField_Name: 'HProFinsh_Code',
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
      HDataField_Name: 'HProFinsh_Name',
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
      HDataField_Name: 'HProProce_PslNo',
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
      HDataField_Name: 'HProFinsh_PslNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // 1st tab Semi-Finished/ Finished Goods Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Alldp_SysID',
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
      HDataField_Name: 'Alldp_Grid_SysID',
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
      HDataField_Name: 'Alldp_SlNo',
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
      HDataField_Name: 'Alldp_Prod_Code',
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
      HDataField_Name: 'Alldp_ProdShort_Name',
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
      HDataField_Name: 'Alldp_ProdLong_Name',
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
      HDataField_Name: 'Alldp_Prod_Unit',
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
      HDataField_Name: 'Alldp_WhOne_SysID',
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
      HDataField_Name: 'Alldp_WhOne_Code',
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
      HDataField_Name: 'Alldp_WhOne_Name',
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
      HDataField_Name: 'Alldp_BOMProdModu_SysID',
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
      HDataField_Name: 'Alldp_BOMProdModu_Code',
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
      HDataField_Name: 'Alldp_BOMProdModu_Name',
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
      HDataField_Name: 'Alldp_Prod_Qty',
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
      HDataField_Name: 'Alldp_Multiple_Batch',
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
      HDataField_Name: 'Alldp_BOMFinishPro_SlNo',
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
      HDataField_Name: 'Alldp_Remark_SysID',
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
      HDataField_Name: 'Alldp_Remark_Code',
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
      HDataField_Name: 'Alldp_Remark_Name',
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
      HDataField_Name: 'Alldp_1_Other',
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
      HDataField_Name: 'Alldp_2_Other',
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
      HDataField_Name: 'Alldp_3_Other',
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
      HDataField_Name: 'Alldp_4_Other',
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
      HDataField_Name: 'Alldp_5_Other',
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
      HDataField_Name: 'Alldp_6_Other',
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
      HDataField_Name: 'Alldp_7_Other',
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
      HDataField_Name: 'Alldp_8_Other',
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
      HDataField_Name: 'Alldp_9_Other',
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
      HDataField_Name: 'Alldp_10_Other',
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
      HDataField_Name: 'Alldp_11_Other',
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
      HDataField_Name: 'Alldp_12_Other',
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
      HDataField_Name: 'Alldp_13_Other',
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
      HDataField_Name: 'Alldp_14_Other',
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
      HDataField_Name: 'Alldp_15_Other',
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
      HDataField_Name: 'Alldp_16_Other',
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
      HDataField_Name: 'Alldp_17_Other',
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
      HDataField_Name: 'Alldp_18_Other',
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
      HDataField_Name: 'Alldp_19_Other',
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
      HDataField_Name: 'Alldp_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },







    // 2nd Main Tab Fields 

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HModuRaw_SysID',
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
      HDataField_Name: 'HModuRaw_Code',
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
      HDataField_Name: 'HModuRaw_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Create Production Flow Detail
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HProRaw_SysID',
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
      HDataField_Name: 'HProRaw_Code',
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
      HDataField_Name: 'HProRaw_Name',
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
      HDataField_Name: 'HProRaw_PslNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // 2nd Main Tab Materials Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'AlldPw_SysID',
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
      HDataField_Name: 'AlldPw_Grid_SysID',
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
      HDataField_Name: 'AlldPw_SlNo',
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
      HDataField_Name: 'AlldPw_Prod_Code',
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
      HDataField_Name: 'AlldPw_ProdShort_Name',
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
      HDataField_Name: 'AlldPw_ProdLong_Name',
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
      HDataField_Name: 'AlldPw_BOMProdModu_SysID',
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
      HDataField_Name: 'AlldPw_BOMProdModu_Code',
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
      HDataField_Name: 'AlldPw_BOMProdModu_Name',
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
      HDataField_Name: 'AlldPw_Prod_Unit',
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
      HDataField_Name: 'AlldPw_WhOne_SysID',
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
      HDataField_Name: 'AlldPw_WhOne_Code',
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
      HDataField_Name: 'AlldPw_WhOne_Name',
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
      HDataField_Name: 'AlldPw_Prod_Qty',
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
      HDataField_Name: 'AlldPw_Prod_Rate',
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
      HDataField_Name: 'AlldPw_SysID',
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
      HDataField_Name: 'AlldPw_1_Other',
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
      HDataField_Name: 'AlldPw_2_Other',
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
      HDataField_Name: 'AlldPw_3_Other',
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
      HDataField_Name: 'AlldPw_4_Other',
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
      HDataField_Name: 'AlldPw_5_Other',
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
      HDataField_Name: 'AlldPw_6_Other',
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
      HDataField_Name: 'AlldPw_7_Other',
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
      HDataField_Name: 'AlldPw_8_Other',
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
      HDataField_Name: 'AlldPw_9_Other',
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
      HDataField_Name: 'AlldPw_10_Other',
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
      HDataField_Name: 'AlldPw_11_Other',
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
      HDataField_Name: 'AlldPw_12_Other',
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
      HDataField_Name: 'AlldPw_13_Other',
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
      HDataField_Name: 'AlldPw_14_Other',
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
      HDataField_Name: 'AlldPw_15_Other',
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
      HDataField_Name: 'AlldPw_16_Other',
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
      HDataField_Name: 'AlldPw_17_Other',
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
      HDataField_Name: 'AlldPw_18_Other',
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
      HDataField_Name: 'AlldPw_19_Other',
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
      HDataField_Name: 'AlldPw_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },



    // 3rd Main Tab Fields  ( Consumables )

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HModuConsu_SysID',
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
      HDataField_Name: 'HModuConsu_Code',
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
      HDataField_Name: 'HModuConsu_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Production Flow Detail
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HProConsu_SysID',
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
      HDataField_Name: 'HProConsu_Code',
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
      HDataField_Name: 'HProConsu_Name',
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
      HDataField_Name: 'HProConsu_PslNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // Consumables Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'AlldPw_SysID',
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
      HDataField_Name: 'AlldPc_Grid_SysID',
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
      HDataField_Name: 'AlldPc_SlNo',
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
      HDataField_Name: 'AlldPc_Prod_Code',
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
      HDataField_Name: 'AlldPc_ProdShort_Name',
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
      HDataField_Name: 'AlldPc_ProdLong_Name',
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
      HDataField_Name: 'AlldPc_BOMProdModu_SysID',
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
      HDataField_Name: 'AlldPc_BOMProdModu_Code',
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
      HDataField_Name: 'AlldPc_BOMProdModu_Name',
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
      HDataField_Name: 'AlldPc_Prod_Unit',
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
      HDataField_Name: 'AlldPc_WhOne_SysID',
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
      HDataField_Name: 'AlldPc_WhOne_Code',
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
      HDataField_Name: 'AlldPc_WhOne_Name',
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
      HDataField_Name: 'AlldPc_Prod_Qty',
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
      HDataField_Name: 'AlldPc_Prod_Rate',
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
      HDataField_Name: 'AlldPc_SysID',
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
      HDataField_Name: 'AlldPc_1_Other',
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
      HDataField_Name: 'AlldPc_2_Other',
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
      HDataField_Name: 'AlldPc_3_Other',
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
      HDataField_Name: 'AlldPc_4_Other',
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
      HDataField_Name: 'AlldPc_5_Other',
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
      HDataField_Name: 'AlldPc_6_Other',
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
      HDataField_Name: 'AlldPc_7_Other',
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
      HDataField_Name: 'AlldPc_8_Other',
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
      HDataField_Name: 'AlldPc_9_Other',
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
      HDataField_Name: 'AlldPc_10_Other',
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
      HDataField_Name: 'AlldPc_11_Other',
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
      HDataField_Name: 'AlldPc_12_Other',
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
      HDataField_Name: 'AlldPc_13_Other',
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
      HDataField_Name: 'AlldPc_14_Other',
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
      HDataField_Name: 'AlldPc_15_Other',
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
      HDataField_Name: 'AlldPc_16_Other',
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
      HDataField_Name: 'AlldPc_17_Other',
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
      HDataField_Name: 'AlldPc_18_Other',
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
      HDataField_Name: 'AlldPc_19_Other',
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
      HDataField_Name: 'AlldPc_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    /////////////////////////////////////////////////////////////////////////

    // 4th Main Tab Fields  ( Packing Materials )

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HModuPack_SysID',
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
      HDataField_Name: 'HModuPack_Code',
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
      HDataField_Name: 'HModuPack_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Production Flow Detail
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HProPack_SysID',
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
      HDataField_Name: 'HProPack_Code',
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
      HDataField_Name: 'HProPack_Name',
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
      HDataField_Name: 'HProPack_PslNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // Consumables Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'AlldPk_SysID',
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
      HDataField_Name: 'AlldPk_Grid_SysID',
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
      HDataField_Name: 'AlldPk_SlNo',
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
      HDataField_Name: 'AlldPk_Prod_Code',
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
      HDataField_Name: 'AlldPk_ProdShort_Name',
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
      HDataField_Name: 'AlldPk_ProdLong_Name',
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
      HDataField_Name: 'AlldPk_BOMProdModu_SysID',
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
      HDataField_Name: 'AlldPk_BOMProdModu_Code',
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
      HDataField_Name: 'AlldPk_BOMProdModu_Name',
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
      HDataField_Name: 'AlldPk_Prod_Unit',
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
      HDataField_Name: 'AlldPk_WhOne_SysID',
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
      HDataField_Name: 'AlldPk_WhOne_Code',
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
      HDataField_Name: 'AlldPk_WhOne_Name',
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
      HDataField_Name: 'AlldPk_Prod_Qty',
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
      HDataField_Name: 'AlldPk_Prod_Rate',
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
      HDataField_Name: 'AlldPk_SysID',
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
      HDataField_Name: 'AlldPk_1_Other',
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
      HDataField_Name: 'AlldPk_2_Other',
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
      HDataField_Name: 'AlldPk_3_Other',
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
      HDataField_Name: 'AlldPk_4_Other',
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
      HDataField_Name: 'AlldPk_5_Other',
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
      HDataField_Name: 'AlldPk_6_Other',
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
      HDataField_Name: 'AlldPk_7_Other',
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
      HDataField_Name: 'AlldPk_8_Other',
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
      HDataField_Name: 'AlldPk_9_Other',
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
      HDataField_Name: 'AlldPk_10_Other',
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
      HDataField_Name: 'AlldPk_11_Other',
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
      HDataField_Name: 'AlldPk_12_Other',
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
      HDataField_Name: 'AlldPk_13_Other',
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
      HDataField_Name: 'AlldPk_14_Other',
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
      HDataField_Name: 'AlldPk_15_Other',
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
      HDataField_Name: 'AlldPk_16_Other',
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
      HDataField_Name: 'AlldPk_17_Other',
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
      HDataField_Name: 'AlldPk_18_Other',
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
      HDataField_Name: 'AlldPk_19_Other',
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
      HDataField_Name: 'AlldPk_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    /////////////////////////////////////////////////////////////////////////

    // 5th Main Tab Fields  ( Manpower )

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HModuMan_SysID',
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
      HDataField_Name: 'HModuMan_Code',
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
      HDataField_Name: 'HModuMan_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Production Flow Detail
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HProMan_SysID',
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
      HDataField_Name: 'HProMan_Code',
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
      HDataField_Name: 'HProMan_Name',
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
      HDataField_Name: 'HProMan_PslNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // Manpower Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'AlldPm_SysID',
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
      HDataField_Name: 'AlldPm_Grid_SysID',
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
      HDataField_Name: 'AlldPm_SlNo',
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
      HDataField_Name: 'AlldPm_BOMEmp_Code',
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
      HDataField_Name: 'AlldPm_BOMEmp_Name',
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
      HDataField_Name: 'AlldPm_ManPowModu_SysID',
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
      HDataField_Name: 'AlldPm_ManPowModu_Code',
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
      HDataField_Name: 'AlldPm_ManPowModu_Name',
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
      HDataField_Name: 'AlldPm_BOMMan_Hrs',
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
      HDataField_Name: 'AlldPm_Prod_Rate',
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
      HDataField_Name: 'AlldPm_Gross_Amount',
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
      HDataField_Name: 'AlldPm_Remark_SysID',
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
      HDataField_Name: 'AlldPm_Remark_Code',
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
      HDataField_Name: 'AlldPm_Remark_Name',
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
      HDataField_Name: 'AlldPm_1_Other',
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
      HDataField_Name: 'AlldPm_2_Other',
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
      HDataField_Name: 'AlldPm_3_Other',
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
      HDataField_Name: 'AlldPm_4_Other',
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
      HDataField_Name: 'AlldPm_5_Other',
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
      HDataField_Name: 'AlldPm_6_Other',
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
      HDataField_Name: 'AlldPm_7_Other',
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
      HDataField_Name: 'AlldPm_8_Other',
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
      HDataField_Name: 'AlldPm_9_Other',
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
      HDataField_Name: 'AlldPm_10_Other',
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
      HDataField_Name: 'AlldPm_11_Other',
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
      HDataField_Name: 'AlldPm_12_Other',
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
      HDataField_Name: 'AlldPm_13_Other',
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
      HDataField_Name: 'AlldPm_14_Other',
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
      HDataField_Name: 'AlldPm_15_Other',
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
      HDataField_Name: 'AlldPm_16_Other',
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
      HDataField_Name: 'AlldPm_17_Other',
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
      HDataField_Name: 'AlldPm_18_Other',
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
      HDataField_Name: 'AlldPm_19_Other',
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
      HDataField_Name: 'AlldPm_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },




    // JOB CARD ? EMPPLOYEE DETAILS

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HModuEmp_SysID',
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
      HDataField_Name: 'HModuEmp_Code',
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
      HDataField_Name: 'HModuEmp_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // // Production Flow Detail
    // {
    //   SysID: 2,
    //   HFieldMaster_SysID: 2,
    //   HFieldMaster_Code: '',
    //   HFieldMaster_Name: '',
    //   HDataField_Name: 'HProMan_SysID',
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
    //   HDataField_Name: 'HProMan_Code',
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
    //   HDataField_Name: 'HProMan_Name',
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
    //   HDataField_Name: 'HProMan_PslNo',
    //   HFieldValue_Yn: false,
    //   HFieldHide_Yn: false,
    //   HFieldDisable_Yn: false,
    //   HField_Alert_Code: 'ALRT002',
    //   HField_Alert_Name: 'Field Must Be Entered',
    //   HField_Narration_Code: '',
    //   HField_Narration_Name: '',
    // },


    // Employee Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'AlldPe_SysID',
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
      HDataField_Name: 'AlldPe_Grid_SysID',
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
      HDataField_Name: 'AlldPe_SlNo',
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
      HDataField_Name: 'AlldPe_BOMEmp_Code',
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
      HDataField_Name: 'AlldPe_BOMEmp_Name',
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
      HDataField_Name: 'AlldPe_BOMEmpModu_SysID',
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
      HDataField_Name: 'AlldPe_BOMEmpModu_Code',
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
      HDataField_Name: 'AlldPe_BOMEmpModu_Name',
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
      HDataField_Name: 'AlldPe_BOMEmp_ToDate',
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
      HDataField_Name: 'AlldPe_BOMEmp_FromHrs',
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
      HDataField_Name: 'AlldPe_BOMEmp_ToHrs',
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
      HDataField_Name: 'AlldPe_BOMEmp_EstHrs',
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
      HDataField_Name: 'AlldPe_BOMEmp_ActuHrs',
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
      HDataField_Name: 'AlldPe_Remark_SysID',
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
      HDataField_Name: 'AlldPe_Remark_Code',
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
      HDataField_Name: 'AlldPe_Remark_Name',
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
      HDataField_Name: 'AlldPe_1_Other',
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
      HDataField_Name: 'AlldPe_2_Other',
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
      HDataField_Name: 'AlldPe_3_Other',
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
      HDataField_Name: 'AlldPe_4_Other',
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
      HDataField_Name: 'AlldPe_5_Other',
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
      HDataField_Name: 'AlldPe_6_Other',
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
      HDataField_Name: 'AlldPe_7_Other',
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
      HDataField_Name: 'AlldPe_8_Other',
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
      HDataField_Name: 'AlldPe_9_Other',
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
      HDataField_Name: 'AlldPe_10_Other',
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
      HDataField_Name: 'AlldPe_11_Other',
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
      HDataField_Name: 'AlldPe_12_Other',
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
      HDataField_Name: 'AlldPe_13_Other',
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
      HDataField_Name: 'AlldPe_14_Other',
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
      HDataField_Name: 'AlldPe_15_Other',
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
      HDataField_Name: 'AlldPe_16_Other',
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
      HDataField_Name: 'AlldPe_17_Other',
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
      HDataField_Name: 'AlldPe_18_Other',
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
      HDataField_Name: 'AlldPe_19_Other',
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
      HDataField_Name: 'AlldPe_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },





    // 6th Main Tab Fields  ( Scrap )

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HModuScrap_SysID',
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
      HDataField_Name: 'HModuScrap_Code',
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
      HDataField_Name: 'HModuScrap_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Production Flow Detail
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HProScrap_SysID',
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
      HDataField_Name: 'HProScrap_Code',
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
      HDataField_Name: 'HProScrap_Name',
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
      HDataField_Name: 'HProScrap_PslNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // Scrap Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'AlldPs_SysID',
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
      HDataField_Name: 'AlldPs_Grid_SysID',
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
      HDataField_Name: 'AlldPs_SlNo',
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
      HDataField_Name: 'AlldPs_Prod_Code',
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
      HDataField_Name: 'AlldPs_ProdShort_Name',
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
      HDataField_Name: 'AlldPs_ProdLong_Name',
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
      HDataField_Name: 'AlldPs_BOMProdModu_SysID',
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
      HDataField_Name: 'AlldPs_BOMProdModu_Code',
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
      HDataField_Name: 'AlldPs_BOMProdModu_Name',
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
      HDataField_Name: 'AlldPs_Prod_Unit',
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
      HDataField_Name: 'AlldPs_WhOne_SysID',
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
      HDataField_Name: 'AlldPs_WhOne_Code',
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
      HDataField_Name: 'AlldPs_WhOne_Name',
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
      HDataField_Name: 'AlldPs_Prod_Qty',
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
      HDataField_Name: 'AlldPs_Prod_Rate',
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
      HDataField_Name: 'AlldPs_SysID',
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
      HDataField_Name: 'AlldPs_1_Other',
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
      HDataField_Name: 'AlldPs_2_Other',
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
      HDataField_Name: 'AlldPs_3_Other',
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
      HDataField_Name: 'AlldPs_4_Other',
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
      HDataField_Name: 'AlldPs_5_Other',
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
      HDataField_Name: 'AlldPs_6_Other',
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
      HDataField_Name: 'AlldPs_7_Other',
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
      HDataField_Name: 'AlldPs_8_Other',
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
      HDataField_Name: 'AlldPs_9_Other',
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
      HDataField_Name: 'AlldPs_10_Other',
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
      HDataField_Name: 'AlldPs_11_Other',
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
      HDataField_Name: 'AlldPs_12_Other',
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
      HDataField_Name: 'AlldPs_13_Other',
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
      HDataField_Name: 'AlldPs_14_Other',
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
      HDataField_Name: 'AlldPs_15_Other',
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
      HDataField_Name: 'AlldPs_16_Other',
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
      HDataField_Name: 'AlldPs_17_Other',
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
      HDataField_Name: 'AlldPs_18_Other',
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
      HDataField_Name: 'AlldPs_19_Other',
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
      HDataField_Name: 'AlldPs_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    /////////////////////////////////////////////////////////////////////////












    // 7th Main Tab Fields  ( Expenses )

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HModExp_SysID',
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
      HDataField_Name: 'HModExp_Code',
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
      HDataField_Name: 'HModExp_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    // Production Flow Detail
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'HProExp_SysID',
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
      HDataField_Name: 'HProExp_Code',
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
      HDataField_Name: 'HProExp_Name',
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
      HDataField_Name: 'HProExp_PslNo',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    // Expense Details

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'AlldPx_SysID',
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
      HDataField_Name: 'AlldPx_Grid_SysID',
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
      HDataField_Name: 'AlldPx_SlNo',
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
      HDataField_Name: 'AlldPx_AccFirst_SysID',
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
      HDataField_Name: 'AlldPx_AccFirst_Code',
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
      HDataField_Name: 'AlldPx_AccFirst_Name',
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
      HDataField_Name: 'AlldPx_FC_Amount',
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
      HDataField_Name: 'AlldPx_BOMProdModu_SysID',
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
      HDataField_Name: 'AlldPx_BOMProdModu_Code',
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
      HDataField_Name: 'AlldPx_BOMProdModu_Name',
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
      HDataField_Name: 'AlldPx_Curr_SysID',
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
      HDataField_Name: 'AlldPx_Curr_Code',
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
      HDataField_Name: 'AlldPx_Curr_Name',
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
      HDataField_Name: 'AlldPx_Curr_Rate',
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
      HDataField_Name: 'AlldPx_Expenses_Amount',
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
      HDataField_Name: 'AlldPx_Narra_Code',
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
      HDataField_Name: 'AlldPx_Narra_Name',
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
      HDataField_Name: 'AlldPx_1_Other',
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
      HDataField_Name: 'AlldPx_2_Other',
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
      HDataField_Name: 'AlldPx_3_Other',
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
      HDataField_Name: 'AlldPx_4_Other',
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
      HDataField_Name: 'AlldPx_5_Other',
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
      HDataField_Name: 'AlldPx_6_Other',
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
      HDataField_Name: 'AlldPx_7_Other',
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
      HDataField_Name: 'AlldPx_8_Other',
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
      HDataField_Name: 'AlldPx_9_Other',
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
      HDataField_Name: 'AlldPx_10_Other',
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
      HDataField_Name: 'AlldPx_11_Other',
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
      HDataField_Name: 'AlldPx_12_Other',
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
      HDataField_Name: 'AlldPx_13_Other',
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
      HDataField_Name: 'AlldPx_14_Other',
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
      HDataField_Name: 'AlldPx_15_Other',
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
      HDataField_Name: 'AlldPx_16_Other',
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
      HDataField_Name: 'AlldPx_17_Other',
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
      HDataField_Name: 'AlldPx_18_Other',
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
      HDataField_Name: 'AlldPx_19_Other',
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
      HDataField_Name: 'AlldPx_20_Other',
      HFieldValue_Yn: false,
      HFieldHide_Yn: true,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },

    /////////////////////////////////////////////////////////////////////////


    //Costing Tab 

    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_BomMatCost',
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
      HDataField_Name: 'Allh_BomConsuCost',
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
      HDataField_Name: 'Allh_BomPackCost',
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
      HDataField_Name: 'Allh_BomManCost',
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
      HDataField_Name: 'Allh_BomProdExp',
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
      HDataField_Name: 'Allh_BomTotalCost',
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
      HDataField_Name: 'Allh_BomProdScrap',
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
      HDataField_Name: 'Allh_BomNetCost',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },


    /////////////////////////////////////////////////////////////////////////






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











  ];

  fieldSettings: any = {};
  taxAllocation: boolean;
  taxAllocationH: any;
  invoiceAllocationH: any;
  invoiceAllocation: boolean;



  // Fields Hide , Mandatory , Disable , Alert  Array and Related variables Ends//



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public ReceiptPaymentService: ReceiptAndPaymentService,
    public popUpService: CommonPopupService,

    private lookupService: LookupDialogService
  ) { }

  ngOnInit(): void {

    this.filteredFields()
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead = new TblFirstTransHeadDto();
    this.ReceiptPaymentService.receiptPaymentData.tblSecTransHead = new TblSecTransHeadDto();
    this.ReceiptPaymentService.receiptPaymentData.tblTax = [new TbltaxDto()]

    this.ReceiptPaymentService.receiptPaymentData.TblPTerm = [new TblPTermDto()]
    this.ReceiptPaymentService.receiptPaymentData.TblInco = [new TblIncoDto()]
    this.ReceiptPaymentService.receiptPaymentData.TblPoDetail = [new TblPoDetailDto()]

    this.ReceiptPaymentService.receiptPaymentData.tblDigiHead = [new TblDigiHeadDto()]
    this.ReceiptPaymentService.receiptPaymentData.tblLCMaster = new TblLCMasterDto()
    this.ReceiptPaymentService.receiptPaymentData.tblLCDetails = [new TblLCDetailsDto()]
    this.tblJournal = [new tblJournalDto()]

    this.ReceiptPaymentService.receiptPaymentData.tblDocAttach = [new TblDocAttachDto()]
    this.ReceiptPaymentService.receiptPaymentData.tblVesDocAttach = [new TblVesDocAttachDto()]

    this.ReceiptPaymentService.receiptPaymentData.tblQaQcDocAttach = [new TblDocAttachDto()]
    this.ReceiptPaymentService.receiptPaymentData.tblWhDocAttach = [new TblDocAttachDto()]

    this.route.paramMap.subscribe(async (param: ParamMap) => {

      this.voucherSysId = param.get('id');
      this.headerData.voucherSysId = this.voucherSysId
      console.log("id", this.headerData.voucherSysId);
      this.id = param.get('id')
      if (this.id) {
        this.getSalesDataById()
      }


    });


    this.AddRows()
    // this.getPaymentTerms()
    // this.getIncoTerms()
    // this.getTax()
    // // this.getProduct()
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

    this.filterTableFields(this.FinishedGoodsTableData, 'key')

    this.filterTableFields(this.ProcessMaterialsTableData, 'key')

    this.filterTableFields(this.ConsumablesTableData, 'key')

    this.filterTableFields(this.packingMaterialsTableData, 'key')

    this.filterTableFields(this.ManpowerTableData, 'key')

    this.filterTableFields(this.EmployeeTableData, 'key')

    this.filterTableFields(this.ScrapTableData, 'key')


  }


  filterTableFields(tableData: any[], key?: string) {

    tableData.forEach((field) => {
      const itsName = key ? field[key] : field.bind;

      if (this.fieldSettings[itsName]) {
        field.mandatory = this.fieldSettings[itsName].mandatory;
        field.hide = this.fieldSettings[itsName].hidden;
        field.readOnly = this.fieldSettings[itsName].disabled;
      }
    });

  }

  // Data Fetching... Starts Below //

  getSalesDataById() {
    this.ReceiptPaymentService.getMasterDatabyId(apiUrl.finance, this.headerData.voucherSysId).then((res) => {
      this.ReceiptPaymentService.receiptPaymentData = res
    })
  }

  getShippedTo() {
    this.ReceiptPaymentService.getMasterData(apiUrl.shippedTo).then((res) => {
      this.shippedTo = res
    })
  }

  getBilledTo() {
    this.ReceiptPaymentService.getMasterData(apiUrl.billedTo).then((res) => {
      this.billedTo = res
    })
  }

  getVoucherType() {
    this.ReceiptPaymentService.getMasterData(apiUrl.voucherType).then((res) => {
      this.voucherType = res
    })
  }

  getSalesAgree() {
    this.ReceiptPaymentService.getMasterData(apiUrl.salAgree).then((res) => {
      this.salesAgreement = res
    })
  }

  getProdModule() {
    this.ReceiptPaymentService.getMasterData(apiUrl.prodModule).then((res) => {
      this.prodModule = res
    })
  }

  getCopyDocTemp() {
    this.ReceiptPaymentService.getMasterData(apiUrl.copyDocTemp).then((res) => {
      this.copyDocTemp = res
    })
  }

  getPaymentTerms() {
    this.ReceiptPaymentService.getMasterData(apiUrl.paymentTerms).then((res) => {
      this.paymentTerms = res.data
    })
  }

  getIncoTerms() {
    this.ReceiptPaymentService.getMasterData(apiUrl.incoTerms).then((res) => {
      this.incoTerms = res.data
    })
  }

  getTax() {
    this.ReceiptPaymentService.getMasterData(apiUrl.tax).then((res) => {
      this.tax = res.data
    })
  }

  getProduct() {
    this.ReceiptPaymentService.getMasterData(apiUrl.productmaster).then((res) => {
      this.product = res.data
    })
  }

  getCurrency() {
    this.ReceiptPaymentService.getMasterData(apiUrl.currency).then((res) => {
      this.currencyLov = res.data
    })
  }

  getAccOne() {
    this.ReceiptPaymentService.getMasterData(apiUrl.accountOne).then((res) => {
      this.accOne = res.data
    })
  }

  getMasterstabLov() {

    this.ReceiptPaymentService.getMasterData(apiUrl.costCenter).then((res) => {
      this.costCenter = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.profitCenter).then((res) => {
      this.profitCenter = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.salesMan).then((res) => {
      this.salesMan = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.divisionlov).then((res) => {
      this.divisionlov = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.departmentlov).then((res) => {
      this.departmentlov = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.joblov).then((res) => {
      this.joblov = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.otherCenter).then((res) => {
      this.otherCenter = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.salesOrglov).then((res) => {
      this.salesOrglov = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.distChannel).then((res) => {
      this.distChannel = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.salesOff).then((res) => {
      this.salesOff = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.salesGrp).then((res) => {
      this.salesGrp = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.placeOfSupply).then((res) => {
      this.placeOfSupply = res
    })
    this.ReceiptPaymentService.getMasterData(apiUrl.jurisdiction).then((res) => {
      this.jurisdiction = res
    })

  }

  getHposting() {
    this.ReceiptPaymentService.getMasterData(apiUrl.hPosting).then((res) => {
      this.hPosting = res
    })
  }

  getDposting() {
    this.ReceiptPaymentService.getMasterData(apiUrl.dPosting).then((res) => {
      this.dPosting = res
    })
  }

  getAlert() {
    this.ReceiptPaymentService.getMasterData(apiUrl.fieldAlert).then((res) => {
      this.fieldAlert = res
    })
  }

  getNarration() {
    this.ReceiptPaymentService.getMasterData(apiUrl.fieldNarration).then((res) => {
      this.fieldNarration = res
    })
  }

  getFieldMaster() {
    this.ReceiptPaymentService.getMasterData(apiUrl.fieldMaster).then((res) => {
      this.fieldMaster = res
    })
  }

  getTabForm() {
    this.ReceiptPaymentService.getMasterData(apiUrl.tabForm).then((res) => {
      this.tabForm = res
    })
  }
  // Data Fetching... Starts Below //






  // Popup Lov Data Updating ... Starts Below //

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {



      case 'PaidTo':
        break;
      case 'BilledTo':
        this.popUpService.popUpData = this.billedTo;
        break;
      case 'NarrationCode':
        this.popUpService.popUpData = this.narration;
        break;
      case 'AccountFirstCode':
        // this.popUpService.popUpData = this.accOne;
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
      case 'RemarksCode':
        // this.popUpService.popUpData = this.remarks;
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
        // this.popUpService.popUpData = this.currencyLov;
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
      case 'SingleCoCode':
        break;
      case 'DInterCoCode':
        break;
      case 'TaxableTypeCode':
        break;

      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {
    let Type = this.popUpService.selectedPopUp
    console.log(event);

    switch (Type) {
      case 'ShippedTo':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Shipto_Code = event.code
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Shipto_Name = event.addressOne
        break;
      // case 'BilledTo':
      //   this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Billto_Code = event.code
      //   this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Billto_Name = event.addressOne
      //   break;
      case 'PaidTo':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_AccSecond_Code = event.paidToCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_AccSecond_Name = event.paidToName
        break;
      case 'SingleCoCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_InterSingleCo_Code = event.SingleCo_Code
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_InterSingleCo_Name = event.SingleCo_Name
        break;
      case 'SingleCoCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_InterSingleCo_Code = event.SingleCo_Code
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_InterSingleCo_Name = event.SingleCo_Name
        break;
      case 'NarrationCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Narra_Code = event.code
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Narra_Name = event.name
        break;
      case 'AccountFirstCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_AccFirst_Code = event.HAccOne_Code
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_AccFirst_Name = event.HAccOne_Name
        break;
      case 'VocherType':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Vou_Type = event.voucherName
        break;
      // case 'SalesAgreementCode':
      //   this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SaleAgree_Code = event.salesAgreementCode
      //   this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SaleAgree_Name = event.salesAgreementName
      //   break;
      case 'ProductModuleCode':
        this.ReceiptPaymentService.receiptPaymentData.tblSecTransHead.Allh_BOMProdModu_Code = event.productModuleCode
        this.ReceiptPaymentService.receiptPaymentData.tblSecTransHead.Allh_BOMProdModu_Name = event.productModuleName
        break;
      case 'CurrencyCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Curr_Code = event.HCurr_Code
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Curr_Name = event.HCurr_Name
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Curr_Rate = event.HCurr_Rate
        this.conversionRate = this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Curr_Rate
        break;
        // case 'CustomerCode':
        //   this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_CusVen_Code = event.HAccOne_Code
        //   this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_CusVen_Name = event.HAccOne_Name

        break;
      case 'CopyDocFromTemplateCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_DocTemp_Code = event.copyDocTempCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_DocTemp_Name = event.copyDocTempName
        break;
      case 'PaymentTerms':
        // this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_PayTerm_Code = event.paymentTermCode
        // this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_PayTerm_Name = event.paymentTermName
        this.ReceiptPaymentService.receiptPaymentData.TblPTerm[0].HPay_Term_Code = event.paymentTermCode
        this.ReceiptPaymentService.receiptPaymentData.TblPTerm[0].HPay_Term_Name = event.paymentTermName
        break;
      case 'IncoTerms':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_IncoTerm_Code = event.incoTermCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_IncoTerm_Name = event.incoTermName
        this.ReceiptPaymentService.receiptPaymentData.TblInco[0].HInco_Term_Code = event.incoTermCode
        this.ReceiptPaymentService.receiptPaymentData.TblInco[0].HInco_Term_Name = event.incoTermName
        // this.ReceiptPaymentService.receiptPaymentData..voucherSysId = event.sysId
        break;
      case 'TaxCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTax[this.tableIndex].HTax_Code = event.HTax_Code
        this.ReceiptPaymentService.receiptPaymentData.tblTax[this.tableIndex].HTax_Name = event.HTax_Name
        this.ReceiptPaymentService.receiptPaymentData.tblTax[this.tableIndex].HTax_InPut_Perc = event.HTax_InputPerc
        this.ReceiptPaymentService.receiptPaymentData.tblTax[this.tableIndex].HTax_OutPut_Perc = event.HTax_OutputPerc
        this.updateTaxFields()
        // this.ReceiptPaymentService.receiptPaymentData.tblTax[0].voucherSysId = event.sysId
        break;
      case 'TaxAccountCodeCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail[this.tableIndex].TaxJS_Account_Code = event.accountCode
        this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail[this.tableIndex].TaxJS_Account_Name = event.accountName
        break;
      case 'TaxNarrationCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail[this.tableIndex].TaxJS_Narra_Code = event.narrationMasterCode
        this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail[this.tableIndex].TaxJS_Narra_Name = event.narrationMasterName
        break;

      case 'TaxableTypeCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_TaxType_Code = event.HTaxtType_Code
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_TaxType_Name = event.HTaxType_Name
        break;


      case 'DInterCoCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_InterSingleCo_Code = event.SingleCo_Code
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_InterSingleCo_Name = event.SingleCo_Name
        break;

      case 'MrvSingleBatchNumber':
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_Multiple_Batch = event.batchNumber
        break;
      case 'MrvMultipleBatchNumber':
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_Multiple_Batch = event.batchNumber
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_MulBatch_Prod_Date = event.batchManufacturingDate
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail[this.tableIndex].Alld_MulBatch_Exp_Date = event.batchExpiryDate
        break;
      case 'JournalAccountCode':
        this.tblJournal[this.tableIndex].accountCode = event.accountCode
        this.tblJournal[this.tableIndex].accountName = event.accountName
        break;

      case 'CostCenterCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_CostCent_Code = event.costCentCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_CostCent_Name = event.costCentName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'ProfitCenterCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_ProCent_Code = event.profitCenterCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_ProCent_Name = event.profitCenterName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'SalesmanCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Sman_Code = event.salesManCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Sman_Name = event.salesManName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'DivisionCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Div_Code = event.divisionCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Div_Name = event.divisionName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'DepartmentCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Dept_Code = event.deptCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Dept_Name = event.deptName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'JobCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Job_Code = event.jobCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Job_Name = event.jobName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'OtherCentreCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_OtherCent_Code = event.otherCentreCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_OtherCent_Name = event.otherCentreName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'SalesOrganizationCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SaleOrg_Code = event.salesOrganizationCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SaleOrg_Name = event.salesOrganizationName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'DistributionChannelCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_DiscChanel_Code = event.distChanelCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_DiscChanel_Name = event.distChanelName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'SalesOfficeCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SalesOffice_Code = event.salesOfficeCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SalesOffice_Name = event.salesOfficeName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'SalesGroupCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SalesGroup_Code = event.salesGroupCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_SalesGroup_Name = event.salesGroupName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'PlaceOfSupplyCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_PlaceSuppl_Code = event.placeSupplyCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_PlaceSuppl_Name = event.placeSupplyName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;
      case 'JurisdictionCode':
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Jurisd_Code = event.jurisdictionCode
        this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Jurisd_Name = event.jurisdictionName
        // this.ReceiptPaymentService.receiptPaymentData.voucherSysId = event.sysId
        break;


      // case 'FieldAlertCode':
      //   this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster[this.tableIndex].HField_Alert_Code = event.alertsMasterCode
      //   this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster[this.tableIndex].HField_Alert_Name = event.alertsName
      //   break;
      // case 'FieldNarrationCode':
      //   this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster[this.tableIndex].HField_Narration_Code = event.narrationMasterCode
      //   this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster[this.tableIndex].HField_Narration_Name = event.narrationMasterName
      //   break;

      case 'ExpAccountCode':
        this.ReceiptPaymentService.receiptPaymentData.tblExp[this.tableIndex].ExpS_Code = event.accountCode
        this.ReceiptPaymentService.receiptPaymentData.tblExp[this.tableIndex].ExpS_Name = event.accountName
        break;
      case 'ExpNarrationCode':
        this.ReceiptPaymentService.receiptPaymentData.tblExp[this.tableIndex].ExpS_Narra_Code = event.narrationMasterCode
        this.ReceiptPaymentService.receiptPaymentData.tblExp[this.tableIndex].ExpS_Narra_Name = event.narrationMasterName
        break;
      case 'ExpDefaultCurrencyCode':
        this.ReceiptPaymentService.receiptPaymentData.tblExp[this.tableIndex].ExpS_Curr_Code = event.HCurr_Code
        this.ReceiptPaymentService.receiptPaymentData.tblExp[this.tableIndex].ExpS_Curr_Name = event.HCurr_Name
        this.ReceiptPaymentService.receiptPaymentData.tblExp[this.tableIndex].ExpS_Curr_Rate = event.HCurr_Rate
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
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_Curr_Code = event.HCurr_Code
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_Curr_Name = event.HCurr_Name
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_Curr_Conv_Rate = event.HCurr_Rate
        break;
      case 'LcIssuingBankCode':
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_IssueBank_Code = event.HLCIssuBank_Code;
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_IssueBank_Name = event.HLCIssuBank_Name;
        break;
      case 'LcAdvisingBankCode':
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_AdvBank_Code = event.HLCAdvBank_Code;
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_AdvBank_Name = event.HLCAdvBank_Name;
        break;
      case 'LcNegotiatingBankCode':
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_NegoBank_Code = event.HLCNegBank_Code;
        this.ReceiptPaymentService.receiptPaymentData.tblLCMaster.LCMs_NegoBank_Name = event.HLCNegBank_Name;
        break;
      case 'LcEmpCode':
        this.ReceiptPaymentService.receiptPaymentData.tblLCDetails[this.tableIndex].LCDs_Emp_Code = event.employeeCode;
        this.ReceiptPaymentService.receiptPaymentData.tblLCDetails[this.tableIndex].LCDs_Emp_Name = event.employeeName;
        this.ReceiptPaymentService.receiptPaymentData.tblLCDetails[this.tableIndex].LCDs_Emp_Email = event.employeeEmail;
        break;
      case 'LcAlertCode':
        this.ReceiptPaymentService.receiptPaymentData.tblLCDetails[this.tableIndex].LCDs_Alert_Code = event.alertsMasterCode
        this.ReceiptPaymentService.receiptPaymentData.tblLCDetails[this.tableIndex].LCDs_Alert_Name = event.alertsName
        break;


      // BOM - Finished Goods

      case 'BomJob':
        this.FinishedGoodsJobWise[this.tableIndex].HJob_Code = event.HBJob_Code
        this.FinishedGoodsJobWise[this.tableIndex].HJob_Name = event.HBJob_Name
        break;
      case 'BomProductionBatch':
        this.FinishedGoodsJobWise[this.tableIndex].HBatch_Code = event.HBBatch_Code
        this.FinishedGoodsJobWise[this.tableIndex].HBatch_Name = event.HBBatch_Name
        break;
      case 'FinishedGoodsProductModule':
        this.FinishedGoodsDetails[this.tableIndex].Alld_BOMProdModu_Code = event.HBProdModu_Code
        this.FinishedGoodsDetails[this.tableIndex].Alld_BOMProdModu_Name = event.HBProdModu_Name
        break;
      case 'FinishedGoodsProductionProcess':
        this.FinishedGoodsFlow[this.tableIndex].HProFinsh_Code = event.HProdProce_Code
        this.FinishedGoodsFlow[this.tableIndex].HProFinsh_Name = event.HProdProce_Name
        break;
      case 'FinishedGoodsProductCode':
        this.FinishedGoodsDetails[this.tableIndex].Alld_Prod_Code = event.HProd_Code
        this.FinishedGoodsDetails[this.tableIndex].Alld_ProdShort_Name = event.HProd_Short_Name
        this.FinishedGoodsDetails[this.tableIndex].Alld_ProdLong_Name = event.HProd_Long_Name
        break;
      case 'FinishedGoodsRemarksCode':
        this.FinishedGoodsDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.FinishedGoodsDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;
      case 'FinishedGoodsWarehouseOneCode':
        this.FinishedGoodsDetails[this.tableIndex].Alld_WhOne_Code = event.HWh_Code
        this.FinishedGoodsDetails[this.tableIndex].Alld_WhOne_Name = event.HWh_Name
        break;


      //Process Materials

      case 'processMaterialsProductModule':
        this.processMaterialsBomProductModule[this.tableIndex].HModuRaw_Code = event.HBProdModu_Code
        this.processMaterialsBomProductModule[this.tableIndex].HModuRaw_Name = event.HBProdModu_Name
        break;
      case 'processMaterialsProductModule2':
        this.MaterialsDetails[this.tableIndex].Alld_BOMProdModu_Code = event.HBProdModu_Code
        this.MaterialsDetails[this.tableIndex].Alld_BOMProdModu_Name = event.HBProdModu_Name
        break;
      case 'processMaterialsProductionProcess':
        this.MaterialsProdFlow[this.tableIndex].HProRaw_Code = event.HProdProce_Code
        this.MaterialsProdFlow[this.tableIndex].HProRaw_Name = event.HProdProce_Name
        break;
      case 'processMaterialsProductCode':
        this.MaterialsDetails[this.tableIndex].Alld_Prod_Code = event.HProd_Code
        this.MaterialsDetails[this.tableIndex].Alld_ProdShort_Name = event.HProd_Short_Name
        this.MaterialsDetails[this.tableIndex].Alld_ProdLong_Name = event.HProd_Long_Name
        break;
      case 'processMaterialsWarehouseOneCode':
        this.MaterialsDetails[this.tableIndex].Alld_WhOne_Code = event.HWh_Code
        this.MaterialsDetails[this.tableIndex].Alld_WhOne_Name = event.HWh_Name
        break;
      case 'ProcessMaterialsRemarksCode':
        this.MaterialsDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.MaterialsDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;

      //Consumables

      case 'ConsumablesProductModule':
        this.ConsumablesProductModule[this.tableIndex].HModuConsu_Code = event.HBProdModu_Code
        this.ConsumablesProductModule[this.tableIndex].HModuConsu_Name = event.HBProdModu_Name
        break;
      case 'ConsumablesProductModule2':
        this.ConsumablesDetails[this.tableIndex].Alld_BOMProdModu_Code = event.HBProdModu_Code
        this.ConsumablesDetails[this.tableIndex].Alld_BOMProdModu_Name = event.HBProdModu_Name
        break;
      case 'ConsumablesProductionProcess':
        this.ConsumablesProdFlow[this.tableIndex].HProConsu_Code = event.HProdProce_Code
        this.ConsumablesProdFlow[this.tableIndex].HProConsu_Name = event.HProdProce_Name
        break;
      case 'ConsumablesProductCode':
        this.ConsumablesDetails[this.tableIndex].Alld_Prod_Code = event.HProd_Code
        this.ConsumablesDetails[this.tableIndex].Alld_ProdShort_Name = event.HProd_Short_Name
        this.ConsumablesDetails[this.tableIndex].Alld_ProdLong_Name = event.HProd_Long_Name
        break;
      case 'ConsumablesWarehouseOneCode':
        this.ConsumablesDetails[this.tableIndex].Alld_WhOne_Code = event.HWh_Code
        this.ConsumablesDetails[this.tableIndex].Alld_WhOne_Name = event.HWh_Name
        break;
      case 'ConsumablesRemarksCode':
        this.ConsumablesDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.ConsumablesDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;

      //Packing Materials

      case 'PackingMaterialsProductModule':
        this.packingMaterialsProductModule[this.tableIndex].HModuPack_Code = event.HBProdModu_Code
        this.packingMaterialsProductModule[this.tableIndex].HModuPack_Name = event.HBProdModu_Name
        break;
      case 'PackingMaterialsProductModule2':
        this.packingMaterialsDetails[this.tableIndex].Alld_BOMProdModu_Code = event.HBProdModu_Code
        this.packingMaterialsDetails[this.tableIndex].Alld_BOMProdModu_Name = event.HBProdModu_Name
        break;
      case 'PackingMaterialsProductionProcess':
        this.packingMaterialsProdFlow[this.tableIndex].HProPack_Code = event.HProdProce_Code
        this.packingMaterialsProdFlow[this.tableIndex].HProPack_Name = event.HProdProce_Name
        break;
      case 'PackingMaterialsProductCode':
        this.packingMaterialsDetails[this.tableIndex].Alld_Prod_Code = event.HProd_Code
        this.packingMaterialsDetails[this.tableIndex].Alld_ProdShort_Name = event.HProd_Short_Name
        this.packingMaterialsDetails[this.tableIndex].Alld_ProdLong_Name = event.HProd_Long_Name
        break;
      case 'PackingMaterialsWarehouseOneCode':
        this.packingMaterialsDetails[this.tableIndex].Alld_WhOne_Code = event.HWh_Code
        this.packingMaterialsDetails[this.tableIndex].Alld_WhOne_Name = event.HWh_Name
        break;
      case 'PackingMaterialsRemarksCode':
        this.packingMaterialsDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.packingMaterialsDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;


      //ManPower

      case 'ManpowerModule':
        this.ManpowerProductModule[this.tableIndex].HModuMan_Code = event.HManpowModu_Code
        this.ManpowerProductModule[this.tableIndex].HModuMan_Name = event.HManpowModu_Name
        break;
      case 'ManpowerModule2':
        this.ManpowerDetails[this.tableIndex].Alld_ManPowModu_Code = event.HManpowModu_Code
        this.ManpowerDetails[this.tableIndex].Alld_ManPowModu_Name = event.HManpowModu_Name
        break;
      case 'ManpowerProductionProcess':
        this.ManpowerProdFlow[this.tableIndex].HProMan_Code = event.HProdProce_Code
        this.ManpowerProdFlow[this.tableIndex].HProMan_Name = event.HProdProce_Name
        break;
      case 'ManpowerCode':
        this.ManpowerDetails[this.tableIndex].Alld_BOMEmp_Code = event.HManpow_Code
        this.ManpowerDetails[this.tableIndex].Alld_BOMEmp_Name = event.HManpow_Name
        break;
      case 'ManpowerRemarksCode':
        this.ManpowerDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.ManpowerDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;


      //ManPower - Job Card - Employee

      case 'BomEmployeeModule':
        this.EmployeeProductModule[this.tableIndex].HModuEmp_Code = event.HEmpl_Modu_Code
        this.EmployeeProductModule[this.tableIndex].HModuEmp_Name = event.HEmpl_Modu_Name
        break;
      case 'BomEmployeeModule2':
        this.EmployeeDetails[this.tableIndex].Alld_BOMEmpModu_Code = event.HEmpl_Modu_Code
        this.EmployeeDetails[this.tableIndex].Alld_BOMEmpModu_Name = event.HEmpl_Modu_Name
        break;

      case 'BomEmployeeCode':
        this.EmployeeDetails[this.tableIndex].Alld_BOMEmp_Code = event.HEmpl_Code
        this.EmployeeDetails[this.tableIndex].Alld_BOMEmp_Name = event.HEmpl_Name
        break;
      case 'BomEmpRemarksCode':
        this.EmployeeDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.EmployeeDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;


      // Scrap 

      case 'ScrapProductModule':
        this.ScrapProductModule[this.tableIndex].HModuScrap_Code = event.HBProdModu_Code
        this.ScrapProductModule[this.tableIndex].HModuScrap_Name = event.HBProdModu_Name
        break;
      case 'ScrapProductModule2':
        this.ScrapDetails[this.tableIndex].Alld_BOMProdModu_Code = event.HBProdModu_Code
        this.ScrapDetails[this.tableIndex].Alld_BOMProdModu_Name = event.HBProdModu_Name
        break;
      case 'ScrapProductionProcess':
        this.ScrapProdFlow[this.tableIndex].HProScrap_Code = event.HProdProce_Code
        this.ScrapProdFlow[this.tableIndex].HProScrap_Name = event.HProdProce_Name
        break;
      case 'ScrapProductCode':
        this.ScrapDetails[this.tableIndex].Alld_Prod_Code = event.HProd_Code
        this.ScrapDetails[this.tableIndex].Alld_ProdShort_Name = event.HProd_Short_Name
        this.ScrapDetails[this.tableIndex].Alld_ProdLong_Name = event.HProd_Long_Name
        break;
      case 'ScrapWarehouseOneCode':
        this.ScrapDetails[this.tableIndex].Alld_WhOne_Code = event.HWh_Code
        this.ScrapDetails[this.tableIndex].Alld_WhOne_Name = event.HWh_Name
        break;
      case 'ScrapRemarksCode':
        this.ScrapDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.ScrapDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;

      //Expenses

      case 'ExpenseProductModule':
        this.ExpenseProductModule[this.tableIndex].HModExp_Code = event.HBProdModu_Code
        this.ExpenseProductModule[this.tableIndex].HModExp_Name = event.HBProdModu_Name
        break;
      case 'ExpenseProductModule2':
        this.ExpenseDetails[this.tableIndex].Alld_BOMProdModu_Code = event.HBProdModu_Code
        this.ExpenseDetails[this.tableIndex].Alld_BOMProdModu_Name = event.HBProdModu_Name
        break;
      case 'ExpenseProductionProcess':
        this.ExpenseProdFlow[this.tableIndex].HProExp_Code = event.HProdProce_Code
        this.ExpenseProdFlow[this.tableIndex].HProExp_Name = event.HProdProce_Name
        break;
      case 'ExpenseAccountFirstCode':
        this.ExpenseDetails[this.tableIndex].Alld_AccFirst_Code = event.HAccOne_Code
        this.ExpenseDetails[this.tableIndex].Alld_AccFirst_Name = event.HAccOne_Name
        break;
      case 'ExpenseCurrencyCode':
        this.ExpenseDetails[this.tableIndex].Alld_Curr_Code = event.HCurr_Code
        this.ExpenseDetails[this.tableIndex].Alld_Curr_Name = event.HCurr_Name
        this.ExpenseDetails[this.tableIndex].Alld_Curr_Rate = event.HCurr_Rate
        break;
      case 'ExpenseNarrationCode':
        this.ExpenseDetails[this.tableIndex].Alld_Narra_Code = event.narrationMasterCode
        this.ExpenseDetails[this.tableIndex].Alld_Narra_Name = event.narrationMasterName
        break;
      case 'ExpenseRemarksCode':
        this.ExpenseDetails[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.ExpenseDetails[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;




      default:
        break;

    }
    console.log("table indexx = ", this.tableIndex, this.processMaterialsBomProductModule);

  }

  // Popup Lov Data Updating ... Ends  //



  deleteRow(table: any, index: number) {


    if (table == 'FinishedGoodsJobWise') {
      this.FinishedGoodsJobWise.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.FinishedGoodsJobWise.push(newRow);




    }
    if (table == 'FinishedGoodsFlow') {
      this.FinishedGoodsFlow.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.FinishedGoodsFlow.push(newRow);
    }


    if (table == 'processMaterialsBomProductModule') {
      this.processMaterialsBomProductModule.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.processMaterialsBomProductModule.push(newRow);
    }
    if (table == 'MaterialsProdFlow') {
      this.MaterialsProdFlow.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.MaterialsProdFlow.push(newRow);
    }

    if (table == 'ConsumablesProductModule') {
      this.ConsumablesProductModule.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ConsumablesProductModule.push(newRow);
    }
    if (table == 'ConsumablesProdFlow') {
      this.ConsumablesProdFlow.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ConsumablesProdFlow.push(newRow);
    }

    if (table == 'packingMaterialsProductModule') {
      this.packingMaterialsProductModule.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.packingMaterialsProductModule.push(newRow);
    }
    if (table == 'packingMaterialsProdFlow') {
      this.packingMaterialsProdFlow.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.packingMaterialsProdFlow.push(newRow);
    }

    if (table == 'ManpowerProductModule') {
      this.ManpowerProductModule.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ManpowerProductModule.push(newRow);
    }
    if (table == 'ManpowerProdFlow') {
      this.ManpowerProdFlow.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ManpowerProdFlow.push(newRow);
    }

    if (table == 'EmployeeProductModule') {
      this.EmployeeProductModule.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.EmployeeProductModule.push(newRow);
    }

    if (table == 'ScrapProductModule') {
      this.ScrapProductModule.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ScrapProductModule.push(newRow);
    }
    if (table == 'ScrapProdFlow') {
      this.ScrapProdFlow.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ScrapProdFlow.push(newRow);
    }

    if (table == 'ExpenseProductModule') {
      this.ExpenseProductModule.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ExpenseProductModule.push(newRow);
    }
    if (table == 'ExpenseProdFlow') {
      this.ExpenseProdFlow.splice(index, 1);
      let newRow = new tbldProdModuleDTO();
      this.ExpenseProdFlow.push(newRow);
    }



  }

  addTableRow(table: any, index: number) {

    if (table == 'FinishedGoodsFlow') {
      const newRow = new tbldProdModuleDTO();
      this.FinishedGoodsFlow.splice(index + 1, 0, newRow);
    }
  }

  // Main Calculations_ FC _ Starts //


  processApiData(): void {       // for updating the data in the form when called from the API
    if (!this.ReceiptPaymentService.receiptPaymentData || !Array.isArray(this.ReceiptPaymentService.receiptPaymentData.tblTransDetail)) {
      console.warn('No data available to process.');
      return;
    }

    this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.forEach((product: any) => {
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
    // const affects = this.TableData.find((col) => col.bind === field)?.affects;

    // if (affects) {
    //   affects.forEach((affectedField) => {
    //     if (affectedField === 'Alld_Gross_Amount') {
    //       product[affectedField] = this.calculateGrossAmount(product);
    //     }
    //     if (affectedField === 'Alld_Net_Amount') {
    //       product[affectedField] = this.calculateNetAmount(product);
    //     }
    //   });
    // }

    // product.Alld_Debit_Amount = product.Alld_Net_Amount || 0;
    // product.Alld_Credit_Amount = product.Alld_Net_Amount || 0;

    // // Calculate FC Debit and FC Credit based on conversion rate
    // if (this.conversionRate && this.conversionRate > 0) {
    //   product.Alld_Debit_OrgCurr = product.Alld_Debit_Amount / this.conversionRate;
    //   product.Alld_Credit_OrgCurr = product.Alld_Credit_Amount / this.conversionRate;
    // } else {
    //   product.Alld_Debit_OrgCurr = 0;
    //   product.Alld_Credit_OrgCurr = 0;
    // }


    // this.calculateAndUpdateTaxAmounts(product);

    // // Calculate FC values based on conversion rate
    // if (this.conversionRate && this.conversionRate > 0) {
    //   product.Alld_Gross_OrgCurr = product.Alld_Gross_Amount / this.conversionRate;
    //   product.Alld_Net_OrgCurr = product.Alld_Net_Amount / this.conversionRate;
    //   product.Alld_Discount_OrgCurr = product.Alld_Discount_Amount / this.conversionRate;
    // } else {
    //   // If no valid conversion rate, set FC values to 0
    //   product.Alld_Gross_OrgCurr = 0;
    //   product.Alld_Net_OrgCurr = 0;
    //   product.Alld_Discount_OrgCurr = 0;
    // }
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
    return this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.reduce(
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
    return this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.reduce(
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
    const taxData = this.ReceiptPaymentService.receiptPaymentData.tblTax;
    const transactionDetails = this.ReceiptPaymentService.receiptPaymentData.tblTransDetail;

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
    const taxData = this.ReceiptPaymentService.receiptPaymentData?.tblTax;

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
    return this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.reduce(
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
    this.totalTaxAddDebit = this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail.reduce(
      (total, row) => total + (row.TaxJS_Debit_Amount || 0),
      0
    );
    this.totalTaxAddCredit = this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail.reduce(
      (total, row) => total + (row.TaxJS_Credit_Amount || 0),
      0
    );
  }

  // Main Calculations _ FC _ Ends//







  // Data Saving / Updating / Deleting.... Starts //

  Save() {

    // this.ReceiptPaymentService.receiptPaymentData = new TblTransHeadDto();

    this.ReceiptPaymentService.receiptPaymentData.tblExp = []
    this.ReceiptPaymentService.receiptPaymentData.tblLCDetails = []
    this.ReceiptPaymentService.receiptPaymentData.tblDocAttach = []
 //

    this.ReceiptPaymentService.receiptPaymentData.tblVesDetail = []
    this.ReceiptPaymentService.receiptPaymentData.tblShipCost = []
    this.ReceiptPaymentService.receiptPaymentData.tblVesContDtChange = []
    this.ReceiptPaymentService.receiptPaymentData.tblVesDocAttach = []

    this.ReceiptPaymentService.receiptPaymentData.tblQaQC = []
    this.ReceiptPaymentService.receiptPaymentData.tblInspe = []
    this.ReceiptPaymentService.receiptPaymentData.tblQaQcDocAttach = []

    this.ReceiptPaymentService.receiptPaymentData.tblWhM = []
    this.ReceiptPaymentService.receiptPaymentData.tblWhMDetail = []
    this.ReceiptPaymentService.receiptPaymentData.tblWhDocAttach = []
    this.ReceiptPaymentService.receiptPaymentData.tblWhM = []

    // this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster = []
    // this.ReceiptPaymentService.receiptPaymentData.tblHTabHD = []

    this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail = []

    this.ReceiptPaymentService.receiptPaymentData.tblDigiHead = []


    const totals = this.getTotals();

    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Gross_Amount = totals.gross
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Net_Amount = totals.net
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Discount_Amount = totals.discount
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Debit_Amount = totals.debit
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Credit_Amount = totals.credit

    const Fctotals = this.getFcTotals();

    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Gross_OrgCurr = Fctotals.fcgross
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Net_OrgCurr = Fctotals.fcnet
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Discount_OrgCurr = Fctotals.fcdiscount
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Debit_OrgCurr = Fctotals.fcdebit
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_Credit_OrgCurr = Fctotals.fccredit

    const TaxTotals = this.getTaxTotals()

    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_InPut_Amount = TaxTotals.inputTaxAmount
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_OutPut_Amount = TaxTotals.outputTaxAmount
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_InPut_OrgCurr = TaxTotals.fcInputTaxAmount
    this.ReceiptPaymentService.receiptPaymentData.tblTransHead.Allh_OutPut_OrgCurr = TaxTotals.fcOutputTaxAmount

    console.log("totals === ", totals);

    console.log("Fc totals === ", Fctotals);

    console.log("Tax Totals === ", TaxTotals);

    console.log("trans Details  == ", this.ReceiptPaymentService.receiptPaymentData.tblTransDetail);



    // this.ReceiptPaymentService.receiptPaymentData.


    // if (this.receiptPaymentData.screen && this.receiptPaymentData.screen == "SalesInvoice") {

    //   if (!this.id) {
    //     this.ReceiptPaymentService.Save(this.ReceiptPaymentService.receiptPaymentData).then((res) => {
    //       window.alert('Data Saved Successfully')
    //       this.ReceiptPaymentService.receiptPaymentData = new TblTransHeadDto();
    //     })
    //   }
    //   else if (this.id) {
    //     this.ReceiptPaymentService.Save(this.ReceiptPaymentService.receiptPaymentData).then((res) => {
    //       window.alert('Data Saved Successfully')
    //       this.ReceiptPaymentService.receiptPaymentData = new TblTransHeadDto();
    //     })
    //   }



    // }
  }

  delete() {
    this.ReceiptPaymentService.deleteDataById(apiUrl.finance, this.id).then((res) => {
      window.alert('Data Deleted Successfully')
    })
  }

  // Data Saving / Updating / Deleting.... Ends //


  changeMainIndex(i) {

    if (this.MainActiveIndex == i) {
      this.MainActiveIndex = null
    }
    else
      this.MainActiveIndex = i

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
    const selectedRows = this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.filter(row => row.selected);
    console.log('Selected Rows:', selectedRows);
    this.ReceiptPaymentService.selectedDetailRows = selectedRows
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.forEach(row => {
      row.selected = isChecked;
    });
  }

  isAllSelected(): boolean {
    return this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.every(row => row.selected);
  }

  addNew() {
    this.ReceiptPaymentService.receiptPaymentData = new TblTransHeadDto();
    this.AddRows()
  }

  AddRows() {

    if (this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.length < 3) {
      const number = 3 - this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.push(new TblTransDetailDto());
      }
    }

    if (this.ReceiptPaymentService.receiptPaymentData.tblExp.length < 5) {
      const number = 5 - this.ReceiptPaymentService.receiptPaymentData.tblExp.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblExp.push(new TblExpDto());
      }
    }


    //

    if (this.ReceiptPaymentService.receiptPaymentData.tblDocAttach.length < 4) {
      const number = 4 - this.ReceiptPaymentService.receiptPaymentData.tblDocAttach.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblDocAttach.push(new TblDocAttachDto());
      }
    }
    if (this.ReceiptPaymentService.receiptPaymentData.tblWhDocAttach.length < 4) {
      const number = 4 - this.ReceiptPaymentService.receiptPaymentData.tblWhDocAttach.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblWhDocAttach.push(new TblDocAttachDto());
      }
    }
    if (this.ReceiptPaymentService.receiptPaymentData.tblVesDocAttach.length < 4) {
      const number = 4 - this.ReceiptPaymentService.receiptPaymentData.tblVesDocAttach.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblVesDocAttach.push(new TblVesDocAttachDto());
      }
    }
    if (this.ReceiptPaymentService.receiptPaymentData.tblQaQcDocAttach.length < 4) {
      const number = 4 - this.ReceiptPaymentService.receiptPaymentData.tblQaQcDocAttach.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblQaQcDocAttach.push(new TblDocAttachDto());
      }
    }

//

    if (this.ReceiptPaymentService.receiptPaymentData.tblTax.length < 1) {
      const number = 1 - this.ReceiptPaymentService.receiptPaymentData.tblTax.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblTax.push(new TbltaxDto());
      }
    }
    if (this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail.length < 1) {
      const number = 1 - this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblTaxDetail.push(new tblTaxDetailDto());
      }
    }

    if (this.tblJournal.length < 4) {
      const number = 4 - this.tblJournal.length
      for (let index = 0; index < number; index++) {
        this.tblJournal.push(new tblJournalDto());
      }
    }

    // if (this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster.length < 4) {
    //   const number = 4 - this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster.length
    //   for (let index = 0; index < number; index++) {
    //     this.ReceiptPaymentService.receiptPaymentData.tblFieldMaster.push(new TblFieldMasterDto());
    //   }
    // }

    // if (this.ReceiptPaymentService.receiptPaymentData.tblHTabHD.length < 4) {
    //   const number = 4 - this.ReceiptPaymentService.receiptPaymentData.tblHTabHD.length
    //   for (let index = 0; index < number; index++) {
    //     this.ReceiptPaymentService.receiptPaymentData.tblHTabHD.push(new TblHTabHDDto());
    //   }
    // }

    if (this.ReceiptPaymentService.receiptPaymentData.tblLCDetails.length < 4) {
      const number = 4 - this.ReceiptPaymentService.receiptPaymentData.tblLCDetails.length
      for (let index = 0; index < number; index++) {
        this.ReceiptPaymentService.receiptPaymentData.tblLCDetails.push(new TblLCDetailsDto());
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
    this.ReceiptPaymentService.receiptPaymentData.tblTransDetail.push(...newData);
    this.showLinking = false
    console.log('Updated Sales Data:', this.ReceiptPaymentService.receiptPaymentData.tblTransDetail);

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