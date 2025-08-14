import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { TblTransHeadDto } from 'src/app/_dto/tbltranshead.dto';
import { TbldEmpJoin } from 'src/app/_dto/TbldEmpJoin.dto';
import { TblTransDetailDto } from 'src/app/_dto/tbltransdetail.dto';
import { ConfirmationService } from 'primeng/api';
import { TblFirstTransHeadDto } from 'src/app/_dto/tblFirstTransHeadDto.dto';
import { TblSecTransHeadDto } from 'src/app/_dto/tblSecTransHeadDto.dto';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.scss']
})
export class LeaveApplicationComponent implements OnInit {
  product: any[] = [];
  activeIndex: number = 0
  showContextMenu = false;
  menuPosition = { x: 0, y: 0 };
  taxAllocation: boolean;

  selectedRow: any;
  selectedLinkingDataRows: any[] = [];
  showLinking: boolean = false
  display: boolean = false;

  invoiceAllocation: boolean;

  showPrint: boolean = false

  headerConf: any = { message: '', button: '' }

  fieldSettings: any = {};

  showConf: boolean = false

  tableIndex: any;

  voucherType: any[] = [];

  showStatus: boolean = false


  showSaveMsg: boolean = false

  TblSaveMsg: any = [{}]

  showAuthMsg: boolean = false

  showRejectMsg: boolean = false








  LeaveTable: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto()]
  LeaveSummaryTable: TblTransDetailDto[] = [new TblTransDetailDto(), new TblTransDetailDto(), new TblTransDetailDto()]
  // this._salesService.headerData = new TblTransHeadDto();

  TbldEmpJoin: TbldEmpJoin[] = [new TbldEmpJoin(), new TbldEmpJoin(), new TbldEmpJoin()]

  scrollableTabs: any[] = [
    { id: 0, title: "Leave Applied ", content: "", visible: true },
    { id: 1, title: "Leave Summary ", content: "", visible: true },
    { id: 2, title: "Leave Approved", content: "", visible: true },


  ]

  TblAuthMsg: any = [
    { employeeCode: 'EMP001', employeeName: 'Alice Johnson', alertsCode: 'ALR001', alertsName: 'System Alert', alertsEmail: 'alice.johnson@example.com' },
  ];
  TblRejectMsg: any = [
    { employeeCode: 'EMP001', employeeName: 'Alice Johnson', alertsCode: 'ALR001', alertsName: 'System Alert', alertsEmail: 'alice.johnson@example.com' },
  ];
  FinanceApprovalStatus = [
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

  TblAllocation: any[] = [
    { reference: 'Ref1', dueDate: '2023-01-01', billAmount: 100, amountAdjusted: 50 },
    { reference: 'Ref2', dueDate: '2023-01-02', billAmount: 200, amountAdjusted: 100 },
    { reference: 'Ref3', dueDate: '2023-01-03', billAmount: 300, amountAdjusted: 150 },
    { reference: 'Ref4', dueDate: '2023-01-04', billAmount: 400, amountAdjusted: 200 },
    { reference: 'Ref5', dueDate: '2023-01-05', billAmount: 500, amountAdjusted: 250 },
    { reference: 'Ref6', dueDate: '2023-01-06', billAmount: 600, amountAdjusted: 300 },
  ];

  buttons = [
    { label: 'Tax Allo', action: () => this.showTaxAlloCation(), visible: true, disabled: false },
    { label: 'Invoice Allo', action: () => this.showInvAlloCation(), visible: true, disabled: false },
    { label: 'Save', action: () => this.showConfirm('Save'), visible: true, disabled: false },
    { label: 'Cancel', visible: true, disabled: false },
    // { label: 'Add', action: () => this.addNew(), visible: true, disabled: false },
    // { label: 'List', action: () => this.routeTo('sales-list'), visible: true, disabled: false },
    { label: 'Print', action: () => this.showPrintFormat(), visible: true, disabled: false },
    { label: 'Suspended', visible: true, disabled: false },
    { label: 'Authorize', action: () => this.showConfirm('Authorize'), visible: true, disabled: false },
    { label: 'Reject', action: () => this.showConfirm('Reject'), visible: true, disabled: false },
    { label: 'Approve', visible: true, disabled: false }
  ];
  hideOrDisplayFields = [

    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_AppLDed_WithPay',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_AppLDed_WithoutPay',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_AppLeave_Days',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_AppLEnd_Date',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_AppLStart_Date',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_PropLDed_WithoutPay',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_PropLDed_WithPay',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_PropLeave_Days',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_PropJoin_Date',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_PropLEnd_Date',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_PropLStart_Date',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LType_Name',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LType_Code',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LType_SysID',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },

    // ..........................
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_Remark_Name',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_Remark_Code',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_Remark_SysID',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LeaSum_BalDays',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LeaSum_UsedDays',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LeaSum_AvailDays',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LeaSum_NoDays',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LeaSum_Name',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LeaSum_Code',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_LeaSum_SysID',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
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
    {
      SysID: 2,
      HFieldMaster_SysID: 2,
      HFieldMaster_Code: '',
      HFieldMaster_Name: '',
      HDataField_Name: 'Allh_LPolicy_Code',
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
      HDataField_Name: 'Allh_LPolicy_Name',
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
      HDataField_Name: 'Allh_LPolicy_SysID',
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
      HDataField_Name: 'Allh_Empl_Code',
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
      HDataField_Name: 'Allh_Empl_Name',
      HFieldValue_Yn: false,
      HFieldHide_Yn: false,
      HFieldDisable_Yn: true,
      HField_Alert_Code: 'ALRT002',
      HField_Alert_Name: 'Field Must Be Entered',
      HField_Narration_Code: '',
      HField_Narration_Name: '',
    },
  ]
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

  TableData = [

    { header: 'Leave Applied Grid SysID', hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, bind: "Alld_SysID", type: 'number', readOnly: false },

    { header: 'Sl.No', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "Alld_SlNo", type: 'number' },
    { header: 'Leave Type SysID', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LType_SysID", type: 'number' },
    { header: 'Leave Type Code', PopUp: true, PopUpData: 'LeaveTypeCode', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_LType_Code", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },
    { header: 'Leave Type Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LType_Name", type: 'text' },
    { header: 'Leave Start Date', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_LStart_Date", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { header: 'Leave End Date', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "Alld_LEnd_Date", type: 'date' },
    { header: 'Leave Proposed Rejoin Date', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_PropJoin_Date", type: 'date' },
    { header: 'Total leave Days', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_Leave_Days", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Deduction Days with Pay', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, bind: "Alld_LDed_WithPay", type: 'text' },
    { header: 'Deduction Days Without Pay', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LDed_WithoutPay", type: 'text' },
    { header: 'Remarks SysID', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_Remark_SysID", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, PopUpData: 'LeaveRemarksCode', bind: "Alld_Remark_Code", type: 'text' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_Remark_Name", type: 'text' },
  ]



  TableData1 = [

    { header: 'Leave Summary Grid SysID', hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, bind: "Alld_SysID", type: 'number', readOnly: false },

    { header: 'Sl.No', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "Alld_SlNo", type: 'number' },
    { header: 'Leave Policy Summary SysID', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LeaSum_SysID", type: 'number' },
    { header: 'Leave Policy Summary Code', PopUp: true, PopUpData: 'LeaveSummaryCode', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_LeaSum_Code", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },
    { header: 'Leave Policy Summary Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LeaSum_Name", type: 'text' },
    { header: 'Yearly Available Days', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_LeaSum_NoDays", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Total Available Days', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "Alld_LeaSum_AvailDays", type: 'number' },
    { header: 'Number of Days Used ', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LeaSum_UsedDays", type: 'number' },
    { header: 'Balance Available Days', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_LeaSum_BalDays", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Remarks SysID', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, bind: "Alld_Remark_SysID", type: 'text' },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_Remark_Code", type: 'text', PopUp: true, PopUpData: 'LeaveSummaryRemarksCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '16rem', data: '123456', manual: false, bind: "Alld_Remark_Name", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },

  ]
  LinkingData = [
    { SysID: 1, serialNo: 'S001', transactionNo: 'T12345', productCode: 'P001', productName: 'Product A', quantity: 10 },
    { SysID: 2, serialNo: 'S002', transactionNo: 'T12346', productCode: 'P002', productName: 'Product B', quantity: 20 },
    { SysID: 3, serialNo: 'S003', transactionNo: 'T12347', productCode: 'P003', productName: 'Product C', quantity: 15 },
    { SysID: 4, serialNo: 'S004', transactionNo: 'T12348', productCode: 'P004', productName: 'Product D', quantity: 30 },
    { SysID: 5, serialNo: 'S005', transactionNo: 'T12349', productCode: 'P005', productName: 'Product E', quantity: 25 }
  ];



  TableData3 = [

    { header: 'Leave Applied Grid SysID', hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, bind: "Alld_SysID", type: 'number', readOnly: false },
    { header: 'Sl.No', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "Alld_SlNo", type: 'number' },
    { header: 'Leave Type SysID', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LType_SysID", type: 'number' },
    { header: 'Leave Type Code', PopUp: true, PopUpData: 'ApprovalLeaveTypeCode', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_LType_Code", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },
    { header: 'Leave Type Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "Alld_LType_Name", type: 'text' },
    { header: 'Proposed Leave Start Date', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_PropLStart_Date", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { header: 'Proposed  Leave End Date', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "Alld_PropLEnd_Date", type: 'date' },
    { header: 'Proposed  Leave Proposed Rejoin Date ', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_PropJoin_Date", type: 'date' },
    { header: 'Proposed  Total leave Days', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_PropLeave_Days", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Deduction Days with Pay', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, bind: "Alld_PropLDed_WithPay", type: 'text' },
    { header: 'Deduction Days Without Pay', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_PropLDed_WithoutPay", type: 'text', },
    { header: 'Approved Leave Start Date', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_AppLStart_Date", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },

    { header: 'Approved Leave End Date ', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_AppLEnd_Date", type: 'date' },
    { header: 'Approved  Total leave Days', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_AppLeave_Days", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Approval Deduction Days with Pay', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, bind: "Alld_AppLDed_WithPay", type: 'text' },
    { header: 'Approval Deduction Days without Pay', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, bind: "Alld_AppLDed_WithoutPay", type: 'text', },
    { header: 'Remarks SysID', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_Remark_SysID", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_Remark_Code", align: 'left', type: 'text', PopUp: true, PopUpData: 'LeaveApprovedCode' },
    { header: 'Remarks Name', hide: false, mandatory: false, width: '16rem', data: '123456', manual: false, bind: "Alld_Remark_Name", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },

  ]



  constructor(private router: Router,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
private confirmationService: ConfirmationService,
    private lookupService: LookupDialogService) { }

  ngOnInit(): void {
    this._salesService.headerData = new TblTransHeadDto()
        this._salesService.headerData.tblTransHead = new TblFirstTransHeadDto();
        this._salesService.headerData.tblSecTransHead = new TblSecTransHeadDto();
    this.AddRows()
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


  showTaxAlloCation() {
    this.taxAllocation = true
  }

  showInvAlloCation() {
    this.invoiceAllocation = true
  }

  showPrintFormat() {
    this.showPrint = true
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


  changeIndex(i) {

    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i

  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {
      case 'VocherType':
        this.popUpService.popUpData = this.voucherType;
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
      case 'VocherType':
        this._salesService.headerData.tblTransHead.Allh_Vou_Type = event.voucherName
        break;
      case 'EmployeeCode':
        this._salesService.headerData.tblSecTransHead.Allh_Empl_Code = event.DLSum_Emp_Code
        this._salesService.headerData.tblSecTransHead.Allh_Empl_Name = event.DLSum_Emp_Name
        break;
      case 'NarrationCode':
        this._salesService.headerData.tblTransHead.Allh_Narra_Code = event.code
        this._salesService.headerData.tblTransHead.Allh_Narra_Name = event.name
        break;
      case 'CopyDocFromTemplateCode':
        this._salesService.headerData.tblTransHead.Allh_DocTemp_Code = event.copyDocTempCode
        this._salesService.headerData.tblTransHead.Allh_DocTemp_Name = event.copyDocTempName
        break;
      case 'RemarksCodeJoining':
        this.TbldEmpJoin[this.tableIndex].HReJoin_Rem_Code = event.HRemMast_Code
        this.TbldEmpJoin[this.tableIndex].HReJoin_Rem_Name = event.HRemMast_Name
        break;
      case 'RemarksCodeJoining':
        this.TbldEmpJoin[this.tableIndex].HReJoin_Rem_Code = event.HRemMast_Code
        this.TbldEmpJoin[this.tableIndex].HReJoin_Rem_Name = event.HRemMast_Name
        break;
      case 'JoiningEmployeeCode':
        this.TbldEmpJoin[this.tableIndex].EmpJoin_Emp_Code = event.DLSum_Emp_Code
        this.TbldEmpJoin[this.tableIndex].EmpJoin_Emp_Name = event.DLSum_Emp_Name
        break;
      case 'LeavePolicyCode':
        this._salesService.headerData.tblSecTransHead.Allh_LPolicy_Code = event.LPolicy_Code
        this._salesService.headerData.tblSecTransHead.Allh_LPolicy_Name = event.LPolicy_Name

      case 'LeaveRemarksCode':
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;
      case 'LeaveTypeCode':
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_LType_Code = event.dlPolicyCode
        this._salesService.headerData.tblTransDetail[this.tableIndex].Alld_LType_Name = event.dlPolicyName
        break;

      case 'LeaveSummaryCode':
        this.LeaveTable[this.tableIndex].Alld_LeaSum_Code = event.leaveCode
        this.LeaveTable[this.tableIndex].Alld_LeaSum_Name = event.leaveName
        break;
      case 'LeaveSummaryRemarksCode':
        this.LeaveTable[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.LeaveTable[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;
      case 'LeaveApprovedCode':
        this.LeaveSummaryTable[this.tableIndex].Alld_Remark_Code = event.HRemMast_Code
        this.LeaveSummaryTable[this.tableIndex].Alld_Remark_Name = event.HRemMast_Name
        break;

      case 'ApprovalLeaveTypeCode':
        this.LeaveSummaryTable[this.tableIndex].Alld_LType_Code = event.dlPolicyCode
        this.LeaveSummaryTable[this.tableIndex].Alld_LType_Name = event.dlPolicyName
        break;

      default:
        break;
    }
  }

  deleteRow1(table: any, index: number) {

    if (table == 'TbldLeaveSum') {
      this.TbldEmpJoin.splice(index, 1);
    }

  }

  addRow1(table: any, index: number) {
    if (table == 'TbldLeaveSum') {
      const newRow = new TbldEmpJoin()
      this.TbldEmpJoin.splice(index + 1, 0, newRow);

    }

  }
  toggleSelectAll(event: any , table?) {
    const isChecked = event.target.checked;

    if (table == 'tblTransDetail') {
      this._salesService.headerData.tblTransDetail.forEach(row => {
        row.selected = isChecked;
      });
    }
    else if (table == 'LeaveTable') {
      this.LeaveTable.forEach(row => {
        row.selected = isChecked;
      });
    }
    else if (table == 'LeaveSummaryTable') {
      this.LeaveSummaryTable.forEach(row => {
        row.selected = isChecked;
      });
    }
  }

  isAllSelected(table?): boolean {
    if (table == 'tblTransDetail') {
      return this._salesService.headerData.tblTransDetail.every(row => row.selected);
    }
    else if (table == 'LeaveTable') {
      return this.LeaveTable.every(row => row.selected);
    }
    else if (table == 'LeaveSummaryTable') {
      return this.LeaveSummaryTable.every(row => row.selected);
    }

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
    console.log('Updated Sales Data:', this._salesService.headerData.tblTransDetail);

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

  Save() { }


  displaySelectedRows() {
    const selectedRows = this._salesService.headerData.tblTransDetail.filter(row => row.selected);
    console.log('Selected Rows:', selectedRows);
    this._salesService.selectedDetailRows = selectedRows
  }

  deleteRow2(table: any, index: number) {

    if (table == 'TblTransDetailDto') {
      // this._salesService.headerData.tblTransDetail.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TblTransDetailDto') {
            this._salesService.headerData.tblTransDetail.splice(index, 1);
            if (this._salesService.headerData.tblTransDetail.length === 0) {
              this.addRow2('TblTransDetailDto', -1);
            }
          }
        }
      });
    }

  }

  addRow2(table: any, index: number) {
    if (table == 'TblTransDetailDto') {
      const newRow = new TblTransDetailDto()
      this._salesService.headerData.tblTransDetail.splice(index + 1, 0, newRow);

    }

  }

  deleteRow3(table: any, index: number) {

    if (table == 'TblTransDetailDto') {
      // this.LeaveTable.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TblTransDetailDto') {
            this.LeaveTable.splice(index, 1);
            if (this.LeaveTable.length === 0) {
              this.addRow3('TblTransDetailDto', -1);
            }
          }
        }
      });
    }

  }

  addRow3(table: any, index: number) {
    if (table == 'TblTransDetailDto') {
      const newRow = new TblTransDetailDto()
      this.LeaveTable.splice(index + 1, 0, newRow);

    }

  }
  deleteRow4(table: any, index: number) {

    if (table == 'TblTransDetailDto') {
      // this.LeaveSummaryTable.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TblTransDetailDto') {
            this.LeaveSummaryTable.splice(index, 1);
            if (this.LeaveSummaryTable.length === 0) {
              this.addRow3('TblTransDetailDto', -1);
            }
          }
        }
      });
    }

  }

  addRow4(table: any, index: number) {
    if (table == 'TblTransDetailDto') {
      const newRow = new TblTransDetailDto()
      this.LeaveSummaryTable.splice(index + 1, 0, newRow);

    }

  }

  AddRows() {

    if (this._salesService.headerData.tblTransDetail.length < 3) {
      const number = 3 - this._salesService.headerData.tblTransDetail.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblTransDetail.push(new TblTransDetailDto());
      }
    }
  }
}
