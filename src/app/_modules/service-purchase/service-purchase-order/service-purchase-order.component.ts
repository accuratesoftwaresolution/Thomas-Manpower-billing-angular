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
import { TblFirstTransHeadDto } from 'src/app/_dto/tblFirstTransHeadDto.dto';
import { TblSecTransHeadDto } from 'src/app/_dto/tblSecTransHeadDto.dto';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-service-purchase-order',
  templateUrl: './service-purchase-order.component.html',
  styleUrls: ['./service-purchase-order.component.scss']
})
export class ServicePurchaseOrderComponent implements OnInit {

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

  ShowLookUp: boolean = false

  showPrint: boolean = false

  selectedRoute: any;

  scrollableTabs: any[] = [
    { id: 0, title: "Main", content: "", visible: true },
    { id: 1, title: "Other Expenses", content: "Content for Other Expenses", visible: true },
    { id: 2, title: "Payment Terms", content: "", visible: true }, // Hidden tab example
    { id: 3, title: "PO Number", content: "", visible: true },
    { id: 4, title: "Tax", content: "Content for Tax", visible: true },
    { id: 5, title: "Masters", content: "Content for Masters", visible: true },
    { id: 6, title: "Other Fields", content: "Content for Other Fields", visible: true },
    { id: 7, title: "Journal", content: "Content for Journal", visible: true },
    { id: 8, title: "User Key", content: "Content for User Key", visible: true },
    { id: 9, title: "Vessel Booking", content: "Content for Vessel Booking", visible: true },
    { id: 10, title: "QA/QC", content: "Content for QA/QC", visible: true },
    { id: 11, title: "WH Management", content: "Content for WH Management", visible: true },
    { id: 12, title: "Document Attachment", content: "Content for Document Attachment", visible: true },
    { id: 13, title: "LC Details", content: "Content for LC", visible: true },
    { id: 14, title: "Landed Cost Expense", content: "Content for Landed Cost Expense", visible: true },
  ];

  buttons = [
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

  TableData = [

    { field: 'slNo', header: 'Sl. No.', hide: false, mandatory: true, width: '3rem', data: "12345", manual: false, bind: "Alld_SlNo", type: 'text' },
    { field: 'productCode', header: 'Product Code', hide: false, mandatory: true, width: '8rem', data: '12345678912345', manual: true, PopUp: true, PopUpData: 'ProductCode', bind: "Alld_Prod_Code", routeTo: "product-master", type: 'text' },
    { field: 'productName', header: 'Product Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_ProdShort_Name", type: 'text' },
    { field: 'productLongName', header: 'Product Long Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_ProdLong_Name", type: 'text' },
    { field: 'unit', header: 'Unit', hide: false, mandatory: false, width: '4rem', data: '123456', manual: true, bind: "Alld_Prod_Unit", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'qty', header: 'Qty', hide: false, mandatory: true, width: '7rem', data: '12345678912345', manual: true, bind: "Alld_Prod_Qty", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'rate', header: 'Rate', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: "Alld_Prod_Rate", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'grossAmount', header: 'Gross Amount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Gross_Amount", readOnly: true, align: 'left', type: 'number' },
    { field: 'discount', header: 'Discount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true, bind: "Alld_Discount_Amount", affects: ['Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'netAmount', header: 'Net Amount', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Net_Amount", readOnly: true, align: 'left', type: 'number' },
    { field: 'landedCost', header: 'Cost Of Sales', hide: false, mandatory: false, width: '7rem', data: '123456789', manual: false, bind: "Alld_Landed_Cost", type: 'number' },
    { field: 'linkVoucherNo1', header: 'Link Voucher No. 01', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_Link_One", type: 'text' },
    { field: 'linkVoucherNo2', header: 'Link Voucher No. 02', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_Link_Two", type: 'text' },
    { field: 'linkVoucherNo3', header: 'Link Voucher No. 03', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_Link_Three", type: 'text' },
    { field: 'warehouse', header: 'Warehouse', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'WarehouseCode', bind: "Alld_WhOne_Code", routeTo: "warehouse", type: 'text' },
    { field: 'batchNo', header: 'MRV Multiple Batch', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: true, PopUp: true, PopUpData: 'MrvMultipleBatchNumber', bind: "Alld_Multiple_Batch", type: 'text' },
    { field: 'tax1Code', header: 'Tax Code', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: true, bind: "Alld_Tax_Code", type: 'text' },
    { field: 'tax1Percent', header: 'Tax Name', hide: false, mandatory: false, width: '4rem', data: '123456', manual: false, bind: "Alld_Tax_Name", type: 'text' },
    { field: 'tax1Amount', header: 'Input Tax Percentage (%)', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_InPut_Perc", type: 'text' },
    { field: 'tax2Code', header: 'OutPut Tax Percentage (%)', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_OutPut_Perc", type: 'text' },
    { field: 'tax1Amount', header: 'Add Input Tax Percentage (%)', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_OneInPut_Perc", type: 'text' },
    { field: 'tax2Code', header: 'Add OutPut Tax Percentage (%)', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_OneOutPut_Perc", type: 'text' },
    { field: 'deliveryDate', header: 'Expected Delivery Date', hide: false, mandatory: false, width: '7rem', data: '12/09/2024', manual: false, bind: "Alld_Delivery_Date", type: 'date' },
    { field: 'other1Fields', header: 'Other 1 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_1_Other", type: 'text' },
    { field: 'other2Fields', header: 'Other 2 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_2_Other", type: 'text' },
    { field: 'other3Fields', header: 'Other 3 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_3_Other", type: 'text' },
    { field: 'other4Fields', header: 'Other 4 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_4_Other", type: 'text' },
    { field: 'other5Fields', header: 'Other 5 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_5_Other", type: 'text' },
    { field: 'other6Fields', header: 'Other 6 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_6_Other", type: 'text' },
    { field: 'other7Fields', header: 'Other 7 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_7_Other", type: 'text' },

    // Main Tab Fields
    { field: 'other8Fields', header: 'Other 8 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_8_Other", type: 'text' },
    { field: 'other9Fields', header: 'Other 9 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_9_Other", type: 'text' },
    { field: 'other10Fields', header: 'Other 10 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_10_Other", type: 'text' },
    { field: 'other11Fields', header: 'Other 11 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_11_Other", type: 'text' },
    { field: 'other12Fields', header: 'Other 12 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_12_Other", type: 'text' },
    { field: 'other13Fields', header: 'Other 13 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_13_Other", type: 'text' },
    { field: 'other14Fields', header: 'Other 14 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_14_Other", type: 'text' },
    { field: 'other15Fields', header: 'Other 15 Fields', hide: true, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "Alld_15_Other", type: 'text' },
    { field: 'accountFirstCode', header: 'Account First Code', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_AccFirst_Code", type: 'text' },
    { field: 'accountFirstName', header: 'Account First Name', hide: true, mandatory: false, width: '8rem', data: '123456789123456789', manual: false, bind: "Alld_AccFirst_Name", type: 'text' },
    { field: 'accountSecondCode', header: 'Account Second Code', hide: true, mandatory: false, width: '6rem', data: '12345678912345', manual: false, bind: "Alld_AccSecond_Code", type: 'text' },
    { field: 'accountSecondName', header: 'Account Second Name', hide: true, mandatory: false, width: '6rem', data: '123456789123456789', manual: false, bind: "Alld_AccSecond_Name", type: 'text' },
    { field: 'fcAmount', header: 'FC Amount', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Net_Amount", type: 'number' },
    { field: 'amountDebt', header: 'Amount Debt', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Debit_Amount", type: 'number' },
    { field: 'amountCredit', header: 'Amount Credit', hide: true, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "Alld_Credit_Amount", type: 'number' },
    { field: 'remarks', header: 'Remarks Code', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false, bind: "Alld_Remark_Code", type: 'text' },
    { field: 'remarks', header: 'Remarks Name', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false, bind: "Alld_Remark_Name", type: 'text' },
    { field: 'remarks', header: 'Close Link', hide: false, mandatory: false, width: '10rem', data: '123456789123456789', manual: false, bind: "Alld_CloseLink_Yn" },
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
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_AccSecond_Code',
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
      HDataField_Name: 'Allh_AccSecond_Name',
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
      HDataField_Name: 'Allh_CusVen_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
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
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Shipto_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Shipto_Name',
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
      HDataField_Name: 'Allh_Billto_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_Billto_Name',
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
      HDataField_Name: 'Allh_SaleAgree_Code',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: false,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_SaleAgree_Name',
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



  // Fields Hide , Mandatory , Disable , Alert  Array and Related variables Ends//



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private confirmationService: ConfirmationService,


    private lookupService: LookupDialogService
  ) { }

  ngOnInit(): void {


    this._salesService.headerData.tblTransHead = new TblFirstTransHeadDto();
    this._salesService.headerData.tblSecTransHead = new TblSecTransHeadDto();

    this.filteredFields()





    this._salesService.headerData.tblTax = [new TbltaxDto()]
    this._salesService.headerData.tblTaxAdd = [new TbltaxAddDto()]

    this._salesService.headerData.TblPTerm = [new TblPTermDto()]
    this._salesService.headerData.TblInco = [new TblIncoDto()]
    this._salesService.headerData.TblPoDetail = [new TblPoDetailDto()]

    this._salesService.headerData.tblDigiHead = [new TblDigiHeadDto()]
    this._salesService.headerData.tblLCMaster = new TblLCMasterDto()
    this._salesService.headerData.tblLCDetails = [new TblLCDetailsDto()]
    this.tblJournal = [new tblJournalDto()]

    this._salesService.headerData.tblDocAttach = [new TblDocAttachDto()]
    this._salesService.headerData.tblVesDocAttach = [new TblVesDocAttachDto()]

    this._salesService.headerData.tblQaQcDocAttach = [new TblDocAttachDto()]
    this._salesService.headerData.tblWhDocAttach = [new TblDocAttachDto()]
    this._salesService.headerData.tblLandedExp = [new TblLandedExpDto()]
    this._salesService.headerData.tblLandedCost = [new HTransLCostDto()]

    this.route.paramMap.subscribe(async (param: ParamMap) => {

      this.voucherSysId = param.get('id');
      this.headerData.voucherSysId = this.voucherSysId
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
    this._salesService.getMasterDatabyId(apiUrl.finance, this.headerData.voucherSysId).then((res) => {
      this._salesService.headerData = res
    })
  }

  getShippedTo() {
    this._salesService.getMasterData(apiUrl.shippedTo).then((res) => {
      this.shippedTo = res
    })
  }

  getBilledTo() {
    this._salesService.getMasterData(apiUrl.billedTo).then((res) => {
      this.billedTo = res
    })
  }

  getVoucherType() {
    this._salesService.getMasterData(apiUrl.voucherType).then((res) => {
      this.voucherType = res
    })
  }

  getSalesAgree() {
    this._salesService.getMasterData(apiUrl.salAgree).then((res) => {
      this.salesAgreement = res
    })
  }

  getProdModule() {
    this._salesService.getMasterData(apiUrl.prodModule).then((res) => {
      this.prodModule = res
    })
  }

  getCopyDocTemp() {
    this._salesService.getMasterData(apiUrl.copyDocTemp).then((res) => {
      this.copyDocTemp = res
    })
  }

  getPaymentTerms() {
    this._salesService.getMasterData(apiUrl.paymentTerms).then((res) => {
      this.paymentTerms = res.data
    })
  }

  getIncoTerms() {
    this._salesService.getMasterData(apiUrl.incoTerms).then((res) => {
      this.incoTerms = res.data
    })
  }

  getTax() {
    this._salesService.getMasterData(apiUrl.tax).then((res) => {
      this.tax = res.data
    })
  }

  getProduct() {
    this._salesService.getMasterData(apiUrl.productmaster).then((res) => {
      this.product = res.data
    })
  }

  getCurrency() {
    this._salesService.getMasterData(apiUrl.currency).then((res) => {
      this.currencyLov = res.data
    })
  }

  getAccOne() {
    this._salesService.getMasterData(apiUrl.accountOne).then((res) => {
      this.accOne = res.data
    })
  }

  getMasterstabLov() {

    this._salesService.getMasterData(apiUrl.costCenter).then((res) => {
      this.costCenter = res
    })
    this._salesService.getMasterData(apiUrl.profitCenter).then((res) => {
      this.profitCenter = res
    })
    this._salesService.getMasterData(apiUrl.salesMan).then((res) => {
      this.salesMan = res
    })
    this._salesService.getMasterData(apiUrl.divisionlov).then((res) => {
      this.divisionlov = res
    })
    this._salesService.getMasterData(apiUrl.departmentlov).then((res) => {
      this.departmentlov = res
    })
    this._salesService.getMasterData(apiUrl.joblov).then((res) => {
      this.joblov = res
    })
    this._salesService.getMasterData(apiUrl.otherCenter).then((res) => {
      this.otherCenter = res
    })
    this._salesService.getMasterData(apiUrl.salesOrglov).then((res) => {
      this.salesOrglov = res
    })
    this._salesService.getMasterData(apiUrl.distChannel).then((res) => {
      this.distChannel = res
    })
    this._salesService.getMasterData(apiUrl.salesOff).then((res) => {
      this.salesOff = res
    })
    this._salesService.getMasterData(apiUrl.salesGrp).then((res) => {
      this.salesGrp = res
    })
    this._salesService.getMasterData(apiUrl.placeOfSupply).then((res) => {
      this.placeOfSupply = res
    })
    this._salesService.getMasterData(apiUrl.jurisdiction).then((res) => {
      this.jurisdiction = res
    })

  }

  getHposting() {
    this._salesService.getMasterData(apiUrl.hPosting).then((res) => {
      this.hPosting = res
    })
  }

  getDposting() {
    this._salesService.getMasterData(apiUrl.dPosting).then((res) => {
      this.dPosting = res
    })
  }

  getAlert() {
    this._salesService.getMasterData(apiUrl.fieldAlert).then((res) => {
      this.fieldAlert = res
    })
  }

  getNarration() {
    this._salesService.getMasterData(apiUrl.fieldNarration).then((res) => {
      this.fieldNarration = res
    })
  }

  getFieldMaster() {
    this._salesService.getMasterData(apiUrl.fieldMaster).then((res) => {
      this.fieldMaster = res
    })
  }

  getTabForm() {
    this._salesService.getMasterData(apiUrl.tabForm).then((res) => {
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
        this._salesService.headerData.tblTransHead.Allh_Shipto_Code = event.code
        this._salesService.headerData.tblTransHead.Allh_Shipto_Name = event.addressOne
        break;
      case 'BilledTo':
        this._salesService.headerData.tblTransHead.Allh_Billto_Code = event.code
        this._salesService.headerData.tblTransHead.Allh_Billto_Name = event.addressOne
        break;
      case 'NarrationCode':
        this._salesService.headerData.tblTransHead.Allh_Narra_Code = event.code
        this._salesService.headerData.tblTransHead.Allh_Narra_Name = event.name
        break;
      case 'SalesAccount':
        this._salesService.headerData.tblTransHead.Allh_AccSecond_Code = event.HAccOne_Code
        this._salesService.headerData.tblTransHead.Allh_AccSecond_Name = event.HAccOne_Name
        break;
      case 'VocherType':
        this._salesService.headerData.tblTransHead.Allh_Vou_Type = event.voucherName
        break;
      case 'SalesAgreementCode':
        this._salesService.headerData.tblTransHead.Allh_SaleAgree_Code = event.salesAgreementCode
        this._salesService.headerData.tblTransHead.Allh_SaleAgree_Name = event.salesAgreementName
        break;
      case 'ProductModuleCode':
        this._salesService.headerData.tblTransHead.Allh_AllModule_Code = event.productModuleCode
        this._salesService.headerData.tblTransHead.Allh_AllModule_Name = event.productModuleName
        break;
      case 'CurrencyCode':
        this._salesService.headerData.tblTransHead.Allh_Curr_Code = event.HCurr_Code
        this._salesService.headerData.tblTransHead.Allh_Curr_Name = event.HCurr_Name
        this._salesService.headerData.tblTransHead.Allh_Curr_Rate = event.HCurr_Rate
        this.conversionRate = this._salesService.headerData.tblTransHead.Allh_Curr_Rate
        break;
      case 'CustomerCode':
        this._salesService.headerData.tblTransHead.Allh_CusVen_Code = event.HAccOne_Code
        this._salesService.headerData.tblTransHead.Allh_CusVen_Name = event.HAccOne_Name

        break;
      case 'CopyDocFromTemplateCode':
        this._salesService.headerData.tblTransHead.Allh_DocTemp_Code = event.copyDocTempCode
        this._salesService.headerData.tblTransHead.Allh_DocTemp_Name = event.copyDocTempName
        break;
      case 'PaymentTerms':
        this._salesService.headerData.tblTransHead.Allh_PayTerm_Code = event.paymentTermCode
        this._salesService.headerData.tblTransHead.Allh_PayTerm_Name = event.paymentTermName
        this._salesService.headerData.TblPTerm[0].HPay_Term_Code = event.paymentTermCode
        this._salesService.headerData.TblPTerm[0].HPay_Term_Name = event.paymentTermName
        break;
      case 'IncoTerms':
        this._salesService.headerData.tblTransHead.Allh_IncoTerm_Code = event.incoTermCode
        this._salesService.headerData.tblTransHead.Allh_IncoTerm_Name = event.incoTermName
        this._salesService.headerData.TblInco[0].HInco_Term_Code = event.incoTermCode
        this._salesService.headerData.TblInco[0].HInco_Term_Name = event.incoTermName
        // this._salesService.headerData..voucherSysId = event.sysId
        break;
      case 'TaxCode':
        this._salesService.headerData.tblTax[this.tableIndex].HTax_Code = event.HTax_Code
        this._salesService.headerData.tblTax[this.tableIndex].HTax_Name = event.HTax_Name
        this._salesService.headerData.tblTax[this.tableIndex].HTax_InPut_Perc = event.HTax_InputPerc
        this._salesService.headerData.tblTax[this.tableIndex].HTax_OutPut_Perc = event.HTax_OutputPerc
        this.updateTaxFields()
        // this._salesService.headerData.tblTax[0].voucherSysId = event.sysId
        break;
      case 'TaxACode':
        this._salesService.headerData.tblTaxAdd[this.tableIndex].HTaxA_Code = event.HTax_Code
        this._salesService.headerData.tblTaxAdd[this.tableIndex].HTaxA_Name = event.HTax_Name
        this._salesService.headerData.tblTaxAdd[this.tableIndex].HTaxA_InPut_Perc = event.HTax_InputPerc
        this._salesService.headerData.tblTaxAdd[this.tableIndex].HTaxA_OutPut_Perc = event.HTax_OutputPerc
        break;
      case 'TaxAccountCodeCode':
        this._salesService.headerData.tblTaxDetail[this.tableIndex].TaxJS_Account_Code = event.accountCode
        this._salesService.headerData.tblTaxDetail[this.tableIndex].TaxJS_Account_Name = event.accountName
        break;
      case 'TaxNarrationCode':
        this._salesService.headerData.tblTaxDetail[this.tableIndex].TaxJS_Narra_Code = event.narrationMasterCode
        this._salesService.headerData.tblTaxDetail[this.tableIndex].TaxJS_Narra_Name = event.narrationMasterName
        break;
      case 'LandedCostCode':
        this._salesService.headerData.tblLandedCost[this.tableIndex].HTransLCost_Code = event.HLandCost_Code
        this._salesService.headerData.tblLandedCost[this.tableIndex].HTransLCost_Name = event.HLandCost_Name
        break;




      case 'ProductCode':
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_Prod_Code = event.HProd_Code
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_ProdShort_Name = event.HProd_Short_Name
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_ProdLong_Name = event.HProd_Long_Name
        break;
      case 'WarehouseCode':
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_WhOne_Code = event.warehouseCode
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_WhOne_Name = event.warehouseName
        break;
      case 'MrvSingleBatchNumber':
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_Multiple_Batch = event.batchNumber
        break;
      case 'MrvMultipleBatchNumber':
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_Multiple_Batch = event.batchNumber
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_MulBatch_Prod_Date = event.batchManufacturingDate
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_MulBatch_Exp_Date = event.batchExpiryDate
        break;





      case 'JournalAccountCode':
        this.tblJournal[this.tableIndex].accountCode = event.accountCode
        this.tblJournal[this.tableIndex].accountName = event.accountName
        break;
      case 'CostCenterCode':
        this._salesService.headerData.tblTransHead.Allh_CostCent_Code = event.costCentCode
        this._salesService.headerData.tblTransHead.Allh_CostCent_Name = event.costCentName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'ProfitCenterCode':
        this._salesService.headerData.tblTransHead.Allh_ProCent_Code = event.profitCenterCode
        this._salesService.headerData.tblTransHead.Allh_ProCent_Name = event.profitCenterName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'SalesmanCode':
        this._salesService.headerData.tblTransHead.Allh_Sman_Code = event.salesManCode
        this._salesService.headerData.tblTransHead.Allh_Sman_Name = event.salesManName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'DivisionCode':
        this._salesService.headerData.tblTransHead.Allh_Div_Code = event.divisionCode
        this._salesService.headerData.tblTransHead.Allh_Div_Name = event.divisionName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'DepartmentCode':
        this._salesService.headerData.tblTransHead.Allh_Dept_Code = event.deptCode
        this._salesService.headerData.tblTransHead.Allh_Dept_Name = event.deptName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'JobCode':
        this._salesService.headerData.tblTransHead.Allh_Job_Code = event.jobCode
        this._salesService.headerData.tblTransHead.Allh_Job_Name = event.jobName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'OtherCentreCode':
        this._salesService.headerData.tblTransHead.Allh_OtherCent_Code = event.otherCentreCode
        this._salesService.headerData.tblTransHead.Allh_OtherCent_Name = event.otherCentreName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'SalesOrganizationCode':
        this._salesService.headerData.tblTransHead.Allh_SaleOrg_Code = event.salesOrganizationCode
        this._salesService.headerData.tblTransHead.Allh_SaleOrg_Name = event.salesOrganizationName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'DistributionChannelCode':
        this._salesService.headerData.tblTransHead.Allh_DiscChanel_Code = event.distChanelCode
        this._salesService.headerData.tblTransHead.Allh_DiscChanel_Name = event.distChanelName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'SalesOfficeCode':
        this._salesService.headerData.tblTransHead.Allh_SalesOffice_Code = event.salesOfficeCode
        this._salesService.headerData.tblTransHead.Allh_SalesOffice_Name = event.salesOfficeName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'SalesGroupCode':
        this._salesService.headerData.tblTransHead.Allh_SalesGroup_Code = event.salesGroupCode
        this._salesService.headerData.tblTransHead.Allh_SalesGroup_Name = event.salesGroupName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'PlaceOfSupplyCode':
        this._salesService.headerData.tblTransHead.Allh_PlaceSuppl_Code = event.placeSupplyCode
        this._salesService.headerData.tblTransHead.Allh_PlaceSuppl_Name = event.placeSupplyName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;
      case 'JurisdictionCode':
        this._salesService.headerData.tblTransHead.Allh_Jurisd_Code = event.jurisdictionCode
        this._salesService.headerData.tblTransHead.Allh_Jurisd_Name = event.jurisdictionName
        // this._salesService.headerData.voucherSysId = event.sysId
        break;

      // case 'FieldAlertCode':
      //   this._salesService.headerData.tblFieldMaster[this.tableIndex].HField_Alert_Code = event.alertsMasterCode
      //   this._salesService.headerData.tblFieldMaster[this.tableIndex].HField_Alert_Name = event.alertsName
      //   break;
      // case 'FieldNarrationCode':
      //   this._salesService.headerData.tblFieldMaster[this.tableIndex].HField_Narration_Code = event.narrationMasterCode
      //   this._salesService.headerData.tblFieldMaster[this.tableIndex].HField_Narration_Name = event.narrationMasterName
      //   break;

      case 'ExpAccountCode':
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Code = event.accountCode
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Name = event.accountName
        break;
      case 'ExpNarrationCode':
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Narra_Code = event.narrationMasterCode
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Narra_Name = event.narrationMasterName
        break;
      case 'ExpDefaultCurrencyCode':
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Curr_Code = event.HCurr_Code
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Curr_Name = event.HCurr_Name
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Curr_Rate = event.HCurr_Rate
        break;


      case 'LandedExpAccountCode':
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Code = event.accountCode
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Name = event.accountName
        break;
      case 'LandedExpNarrationCode':
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Narra_Code = event.narrationMasterCode
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Narra_Name = event.narrationMasterName
        break;
      case 'LandedExpDefaultCurrencyCode':
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Curr_Code = event.HCurr_Code
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Curr_Name = event.HCurr_Name
        this._salesService.headerData.tblExp[this.tableIndex].ExpS_Curr_Rate = event.HCurr_Rate
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
        this._salesService.headerData.tblLCMaster.LCMs_Curr_Code = event.HCurr_Code
        this._salesService.headerData.tblLCMaster.LCMs_Curr_Name = event.HCurr_Name
        this._salesService.headerData.tblLCMaster.LCMs_Curr_Conv_Rate = event.HCurr_Rate
        break;
      case 'LcIssuingBankCode':
        this._salesService.headerData.tblLCMaster.LCMs_IssueBank_Code = event.HLCIssuBank_Code;
        this._salesService.headerData.tblLCMaster.LCMs_IssueBank_Name = event.HLCIssuBank_Name;
        break;
      case 'LcAdvisingBankCode':
        this._salesService.headerData.tblLCMaster.LCMs_AdvBank_Code = event.HLCAdvBank_Code;
        this._salesService.headerData.tblLCMaster.LCMs_AdvBank_Name = event.HLCAdvBank_Name;
        break;
      case 'LcNegotiatingBankCode':
        this._salesService.headerData.tblLCMaster.LCMs_NegoBank_Code = event.HLCNegBank_Code;
        this._salesService.headerData.tblLCMaster.LCMs_NegoBank_Name = event.HLCNegBank_Name;
        break;
      case 'LcEmpCode':
        this._salesService.headerData.tblLCDetails[this.tableIndex].LCDs_Emp_Code = event.employeeCode;
        this._salesService.headerData.tblLCDetails[this.tableIndex].LCDs_Emp_Name = event.employeeName;
        this._salesService.headerData.tblLCDetails[this.tableIndex].LCDs_Emp_Email = event.employeeEmail;
        break;
      case 'LcAlertCode':
        this._salesService.headerData.tblLCDetails[this.tableIndex].LCDs_Alert_Code = event.alertsMasterCode
        this._salesService.headerData.tblLCDetails[this.tableIndex].LCDs_Alert_Name = event.alertsName
        break;



      default:
        break;
    }

  }

  // Popup Lov Data Updating ... Ends  //





  // Main Calculations_ FC _ Starts //


  processApiData(): void {       // for updating the data in the form when called from the API
    if (!this._salesService.headerData || !Array.isArray(this._salesService.headerData.tblTransDetail)) {
      console.warn('No data available to process.');
      return;
    }

    this._salesService.headerData.tblTransDetail.forEach((product: any) => {
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
    return this._salesService.headerData.tblTransDetail.reduce(
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
    return this._salesService.headerData.tblTransDetail.reduce(
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
    const taxData = this._salesService.headerData.tblTax;
    const transactionDetails = this._salesService.headerData.tblTransDetail;

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
    const taxData = this._salesService.headerData?.tblTax;

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
    return this._salesService.headerData.tblTransDetail.reduce(
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
    this.totalTaxAddDebit = this._salesService.headerData.tblTaxDetail.reduce(
      (total, row) => total + (row.TaxJS_Debit_Amount || 0),
      0
    );
    this.totalTaxAddCredit = this._salesService.headerData.tblTaxDetail.reduce(
      (total, row) => total + (row.TaxJS_Credit_Amount || 0),
      0
    );
  }

  // Main Calculations _ FC _ Ends//







  // Data Saving / Updating / Deleting.... Starts //

  Save() {

    // this._salesService.headerData = new TblTransHeadDto();

    this._salesService.headerData.tblExp = []
    this._salesService.headerData.tblLCDetails = []
    this._salesService.headerData.tblDocAttach = []
//

    this._salesService.headerData.tblVesDetail = []
    this._salesService.headerData.tblShipCost = []
    this._salesService.headerData.tblVesContDtChange = []
    this._salesService.headerData.tblVesDocAttach = []

    this._salesService.headerData.tblQaQC = []
    this._salesService.headerData.tblInspe = []
    this._salesService.headerData.tblQaQcDocAttach = []

    this._salesService.headerData.tblWhM = []
    this._salesService.headerData.tblWhMDetail = []
    this._salesService.headerData.tblWhDocAttach = []
    this._salesService.headerData.tblWhM = []

//

    this._salesService.headerData.tblTaxDetail = []

    this._salesService.headerData.tblDigiHead = []


    const totals = this.getTotals();

    this._salesService.headerData.tblTransHead.Allh_Gross_Amount = totals.gross
    this._salesService.headerData.tblTransHead.Allh_Net_Amount = totals.net
    this._salesService.headerData.tblTransHead.Allh_Discount_Amount = totals.discount
    this._salesService.headerData.tblTransHead.Allh_Debit_Amount = totals.debit
    this._salesService.headerData.tblTransHead.Allh_Credit_Amount = totals.credit

    const Fctotals = this.getFcTotals();

    this._salesService.headerData.tblTransHead.Allh_Gross_OrgCurr = Fctotals.fcgross
    this._salesService.headerData.tblTransHead.Allh_Net_OrgCurr = Fctotals.fcnet
    this._salesService.headerData.tblTransHead.Allh_Discount_OrgCurr = Fctotals.fcdiscount
    this._salesService.headerData.tblTransHead.Allh_Debit_OrgCurr = Fctotals.fcdebit
    this._salesService.headerData.tblTransHead.Allh_Credit_OrgCurr = Fctotals.fccredit

    const TaxTotals = this.getTaxTotals()

    this._salesService.headerData.tblTransHead.Allh_InPut_Amount = TaxTotals.inputTaxAmount
    this._salesService.headerData.tblTransHead.Allh_OutPut_Amount = TaxTotals.outputTaxAmount
    this._salesService.headerData.tblTransHead.Allh_InPut_OrgCurr = TaxTotals.fcInputTaxAmount
    this._salesService.headerData.tblTransHead.Allh_OutPut_OrgCurr = TaxTotals.fcOutputTaxAmount


    // this._salesService.headerData.


    // if (this.headerData.screen && this.headerData.screen == "SalesInvoice") {

    //   if (!this.id) {
    //     this._salesService.Save(this._salesService.headerData).then((res) => {
    //       window.alert('Data Saved Successfully')
    //       this._salesService.headerData = new TblTransHeadDto();
    //     })
    //   }
    //   else if (this.id) {
    //     this._salesService.Save(this._salesService.headerData).then((res) => {
    //       window.alert('Data Saved Successfully')
    //       this._salesService.headerData = new TblTransHeadDto();
    //     })
    //   }



    // }
  }

  delete() {
    this._salesService.deleteDataById(apiUrl.finance, this.id).then((res) => {
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
    const selectedRows = this._salesService.headerData.tblTransDetail.filter(row => row.selected);
    this._salesService.selectedDetailRows = selectedRows
  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this._salesService.headerData.tblTransDetail.forEach(row => {
      row.selected = isChecked;
    });
  }

  isAllSelected(): boolean {
    return this._salesService.headerData.tblTransDetail.every(row => row.selected);
  }

  addNew() {
    this._salesService.headerData = new TblTransHeadDto();
    this.AddRows()
  }

  AddRows() {  // for adding dummy row data when initail page load or when clicked 

    if (this._salesService.headerData.tblTransDetail.length < 3) {
      const number = 3 - this._salesService.headerData.tblTransDetail.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblTransDetail.push(new TblTransDetailDto());
      }
    }

    if (this._salesService.headerData.tblExp.length < 5) {
      const number = 5 - this._salesService.headerData.tblExp.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblExp.push(new TblExpDto());
      }
    }


//

    if (this._salesService.headerData.tblDocAttach.length < 4) {
      const number = 4 - this._salesService.headerData.tblDocAttach.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblDocAttach.push(new TblDocAttachDto());
      }
    }
    if (this._salesService.headerData.tblWhDocAttach.length < 4) {
      const number = 4 - this._salesService.headerData.tblWhDocAttach.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblWhDocAttach.push(new TblDocAttachDto());
      }
    }
    if (this._salesService.headerData.tblVesDocAttach.length < 4) {
      const number = 4 - this._salesService.headerData.tblVesDocAttach.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblVesDocAttach.push(new TblVesDocAttachDto());
      }
    }
    if (this._salesService.headerData.tblQaQcDocAttach.length < 4) {
      const number = 4 - this._salesService.headerData.tblQaQcDocAttach.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblQaQcDocAttach.push(new TblDocAttachDto());
      }
    }

//

    if (this._salesService.headerData.tblTax.length < 1) {
      const number = 1 - this._salesService.headerData.tblTax.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblTax.push(new TbltaxDto());
      }
    }
    if (this._salesService.headerData.tblTaxDetail.length < 1) {
      const number = 1 - this._salesService.headerData.tblTaxDetail.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblTaxDetail.push(new tblTaxDetailDto());
      }
    }

    if (this.tblJournal.length < 4) {
      const number = 4 - this.tblJournal.length
      for (let index = 0; index < number; index++) {
        this.tblJournal.push(new tblJournalDto());
      }
    }

//

    if (this._salesService.headerData.tblLCDetails.length < 4) {
      const number = 4 - this._salesService.headerData.tblLCDetails.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblLCDetails.push(new TblLCDetailsDto());
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
    this._salesService.headerData.tblTransDetail.push(...newData);
    this.showLinking = false

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

  deleteRow(table: any, index: number) {

    if (table == 'tblTransDetail') {
      // this._salesService.headerData.tblTransDetail.splice(index, 1);

      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'tblTransDetail') {
            this._salesService.headerData.tblTransDetail.splice(index, 1);
            if (this._salesService.headerData.tblTransDetail.length === 0) {
              this.addRow('_salesService.headerData.tblTransDetail', -1);
            }
          }
        }
      });
    }

  }
  addRow(table: any, index: number) {
    if (table == '_salesService.headerData.tblTransDetail') {
      const newRow = new TblTransDetailDto()
      this._salesService.headerData.tblTransDetail.splice(index + 1, 0, newRow);

    }
    // if (table == 'TblHDetAccru') {
    //   const newRow = new TblHDetAccru()
    //   this.TblHDetAccru.splice(index + 1, 0, newRow);

    // }
  }
  deleteRowLC(table: any, index: number) {

    if (table == 'tblLCDetails') {
      this._salesService.headerData.tblLCDetails.splice(index, 1);
    }

  }
  addRowLC(table: any, index: number) {
    if (table == '_salesService.headerData.tblLCDetails') {
      const newRow = new TblLCDetailsDto()
      this._salesService.headerData.tblLCDetails.splice(index + 1, 0, newRow);

    }
  }
  Preview() {
    if (this.selectedRoute) {
      this.router.navigate(['report/' + this.selectedRoute])
    }

  }
}