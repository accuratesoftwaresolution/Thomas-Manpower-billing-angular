import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { TblFirstTransHeadDto } from 'src/app/_dto/tblFirstTransHeadDto.dto';
import { TblSecTransDetailDto } from 'src/app/_dto/TblSecTransDetailDto.dto';
import { TblSecTransHeadDto } from 'src/app/_dto/tblSecTransHeadDto.dto';
import { TblTransDetailDto } from 'src/app/_dto/tbltransdetail.dto';
import { TblTransHeadDto } from 'src/app/_dto/tbltranshead.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';

@Component({
  selector: 'app-rejoin-register',
  templateUrl: './rejoin-register.component.html',
  styleUrls: ['./rejoin-register.component.scss']
})
export class RejoinRegisterComponent implements OnInit {

  selectedRow: any;
  product: any[] = [];

  showContextMenu = false;
  menuPosition = { x: 0, y: 0 };

  TblSaveMsg: any = [{}]

  showAuthMsg: boolean = false

  showRejectMsg: boolean = false

  showLinking: boolean = false

  selectedLinkingDataRows: any[] = [];

  activeIndex: number = 0

  taxAllocation: boolean;

  invoiceAllocation: boolean;

  showPrint: boolean = false

  headerConf: any = { message: '', button: '' }

  fieldSettings: any = {};

  showConf: boolean = false

  tableIndex: any;

  voucherType: any[] = [];
  showStatus: boolean = false


  showSaveMsg: boolean = false

  display: boolean = false;

  LeaveApproved: TblSecTransDetailDto[] = [new TblSecTransDetailDto(), new TblSecTransDetailDto(), new TblSecTransDetailDto()]
  LeaveRejoin: TblSecTransDetailDto[] = [new TblSecTransDetailDto(), new TblSecTransDetailDto(), new TblSecTransDetailDto()]

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

  TransactionSteps = [
    { name: 'Name4', status: 'Approved' },
    { name: 'Name5', status: 'Rejected' },
    { name: 'Name6', status: 'Rejected' },
    { name: 'Name7', status: 'Approved' },
    { name: 'Name8', status: 'Rejected' },
    { name: 'Name9', status: 'Rejected' },
  ];

  scrollableTabs: any[] = [
    { id: 0, title: "Leave Applied ", content: "", visible: true },
    { id: 1, title: "Leave Approved & Rejoin Details ", content: "", visible: true },


  ]

  hideOrDisplayFields = [
    {
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Alld_SysID',
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
      SysID: 1,
      HFieldMaster_SysID: 1,
      HFieldMaster_Code: 'VoucherNumber',
      HFieldMaster_Name: 'Voucher Number',
      HDataField_Name: 'Allh_Vou_Type',
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
      HDataField_Name: 'Allh_Vou_Date',
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
      HDataField_Name: 'Allh_Empl_Code',
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
      HDataField_Name: 'Allh_Empl_Name',
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
      HDataField_Name: 'Allh_LPolicy_Code',
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
      HDataField_Name: 'Allh_LPolicy_Name',
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
      HDataField_Name: 'Allh_Narra_Code',
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
      HDataField_Name: 'Allh_Narra_Name',
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
      HDataField_Name: 'Allh_DocTemp_Code',
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
      HDataField_Name: 'Allh_DocTemp_Name',
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
      HDataField_Name: 'Alld_Rejoin_Date',
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
      HDataField_Name: 'Alld_RejoinLeave_Days',
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
      HDataField_Name: 'Alld_Rejoin_WithPay',
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
      HDataField_Name: 'Alld_Rejoin_WithoutPay',
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
      HDataField_Name: 'Alld_Link_One',
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
      HDataField_Name: 'Alld_Link_Three',
      HFieldValue_Yn: true, // Mandatory Value
      HFieldHide_Yn: false, // Hide Field
      HFieldDisable_Yn: true, // Disable Field
      HField_Alert_Code: 'ALRT001',
      HField_Alert_Name: 'Voucher Number is required',
      HField_Narration_Code: 'NARR001',
      HField_Narration_Name: 'Voucher narration',
    },
  ]

  TableData = [

    { header: 'Leave Applied Grid SysID', bind: "Alld_SysID", hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, type: 'number' },
    { header: 'Leave Type SysID', bind: "Alld_LType_SysID", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, PopUp: false, type: 'number' },
    { header: 'Leave Type Code', bind: "Alld_LType_Code", PopUp: true, PopUpData: 'LeaveTypeCode', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'text' },
    { header: 'Leave Type Name', bind: "Alld_LType_Name", hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, type: 'text' },
    { header: 'Proposed Leave Start Date', bind: "Alld_PropLStart_Date", hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { header: 'Proposed  Leave End Date', bind: "Alld_PropLEnd_Date", hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { header: 'Proposed  Leave Proposed Rejoin Date', bind: "Alld_PropJoin_Date", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { header: 'Proposed  Total leave Days', bind: "Alld_PropLeave_Days", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'number' },
    { header: 'Deduction Days with Pay', bind: "Alld_PropLDed_WithPay", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'number' },
    { header: 'Deduction Days Without Pay', bind: "Alld_PropLDed_WithoutPay", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'text' },
    { header: 'Approved Leave Start Date', bind: "Alld_AppLStart_Date", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'date' },
    { header: 'Approved Leave End Date', bind: "Alld_AppLEnd_Date", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'date' },
    { header: 'Approved  Total leave Days', bind: "Alld_AppLeave_Days", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'number' },
    { header: 'Approved Deduction days With Pay', bind: "Alld_AppLDed_WithPay", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'text' },
    { header: 'Approved  Deduction Days Without Pay', bind: "Alld_AppLDed_WithoutPay", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'text' },
    { header: 'Remarks SysID', bind: "Alld_Remark_SysID", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'number' },
    { header: 'Remarks Code', bind: "Alld_Remark_Code", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, PopUpData: 'RemarkCode', type: 'text' },
    { header: 'Remarks Name', bind: "Alld_Remark_Name", hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, type: 'text' },
  ]



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

  LinkingData = [
    { SysID: 1, serialNo: 'S001', transactionNo: 'T12345', productCode: 'P001', productName: 'Product A', quantity: 10 },
    { SysID: 2, serialNo: 'S002', transactionNo: 'T12346', productCode: 'P002', productName: 'Product B', quantity: 20 },
    { SysID: 3, serialNo: 'S003', transactionNo: 'T12347', productCode: 'P003', productName: 'Product C', quantity: 15 },
    { SysID: 4, serialNo: 'S004', transactionNo: 'T12348', productCode: 'P004', productName: 'Product D', quantity: 30 },
    { SysID: 5, serialNo: 'S005', transactionNo: 'T12349', productCode: 'P005', productName: 'Product E', quantity: 25 }
  ];


  TableData1 = [

    { header: 'Leave Applied Grid SysID', bind: "Alld_SysID", hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, type: 'number' },
    { header: 'Leave Type SysID', bind: "Alld_LType_SysID", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, PopUp: false, type: 'number' },
    { header: 'Leave Type Code', bind: "Alld_LType_Code", PopUp: true, PopUpData: 'LeaveTypeCodeData1', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'text' },
    { header: 'Leave Type Name', bind: "Alld_LType_Name", hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, type: 'text' },
    { header: 'Approved Leave Start Date', bind: "Alld_AppLStart_Date", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'date' },
    { header: 'Approved Leave End Date', bind: "Alld_AppLEnd_Date", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'date' },
    { header: 'Approved Rejoin Date', bind: "Alld_Rejoin_Date", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { header: 'Approved  Total leave Days', bind: "Alld_RejoinLeave_Days", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'number' },


    { header: 'Approved  Deduction Days with Pay ', bind: "Alld_Rejoin_WithPay", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'number' },
    { header: 'Approved  Deduction Days Without Pay', bind: "Alld_Rejoin_WithoutPay", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'text' },
    { header: 'Link Voucher Number 01', bind: "Alld_Link_One", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'number' },
    { header: 'Link Voucher Number 02', bind: "Alld_Link_Two", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'number' },
    { header: 'Link Voucher Number 03', bind: "Alld_Link_Three", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'number' },
    { header: 'Remarks SysID', bind: "Alld_Remark_SysID", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'number' },
    { header: 'Remarks Code', bind: "Alld_Remark_Code", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, PopUpData: 'RemarkCode1', type: 'text' },
    { header: 'Remarks Name', bind: "Alld_Remark_Name", hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, type: 'text' },
  ]

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

  selectedItem(event: any) {
    let Type = this.popUpService.selectedPopUp
    switch (Type) {
      case 'EmployeeCode':
        this._salesService.headerData.tblSecTransHead.Allh_Empl_Code = event.DLSum_Emp_Code
        this._salesService.headerData.tblSecTransHead.Allh_Empl_Name = event.DLSum_Emp_Name
        break;
      case 'NarrationCode':
        this._salesService.headerData.tblTransHead.Allh_Narra_Code = event.code
        this._salesService.headerData.tblTransHead.Allh_Narra_Name = event.name
        break;
      case 'LeavePolicyCode':
        this._salesService.headerData.tblSecTransHead.Allh_LPolicy_Code = event.LPolicy_Code
        this._salesService.headerData.tblSecTransHead.Allh_LPolicy_Name = event.LPolicy_Name
        break;
      case 'CopyDocFromTemplateCode':
        this._salesService.headerData.tblTransHead.Allh_DocTemp_Code = event.copyDocTempCode
        this._salesService.headerData.tblTransHead.Allh_DocTemp_Name = event.copyDocTempName
        break;

      case 'RemarkCode':
        this.LeaveApproved[this.tableIndex].Alld_Remark_Code = event.HRemark_Code
        this.LeaveApproved[this.tableIndex].Alld_Remark_Name = event.HRemark_Name
        break;
      case 'LeaveTypeCode':
        this.LeaveApproved[this.tableIndex].Alld_LType_Code = event.dlPolicyCode
        this.LeaveApproved[this.tableIndex].Alld_LType_Name = event.dlPolicyName
        break;
      case 'LeaveTypeCodeData1':
        this.LeaveRejoin[this.tableIndex].Alld_LType_Code = event.dlPolicyCode
        this.LeaveRejoin[this.tableIndex].Alld_LType_Name = event.dlPolicyName
        break;
      case 'RemarkCode1':
        this.LeaveRejoin[this.tableIndex].Alld_Remark_Code = event.HRemark_Code
        this.LeaveRejoin[this.tableIndex].Alld_Remark_Name = event.HRemark_Name
        break;
      default:
        break;
    }
  }

  isAllSelected(): boolean {
    return this.LeaveApproved.every(row => row.selected);

  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this.LeaveApproved.forEach(row => {
      row.selected = isChecked;
    });
  }

  isAllSelected1(): boolean {
    return this.LeaveRejoin.every(row => row.selected);

  }
  toggleSelectAll1(event: any) {
    const isChecked = event.target.checked;
    this.LeaveRejoin.forEach(row => {
      row.selected = isChecked;
    });
  }
  routeTo(screen?) {

    if (screen == 'VesselBooking') {
      this.router.navigate(['/common/vessel-booking']);
    }
    else if (screen == 'QA/QC') {
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

  displaySelectedRows() {
    const selectedRows = this._salesService.headerData.tblTransDetail.filter(row => row.selected);
    console.log('Selected Rows:', selectedRows);
    this._salesService.selectedDetailRows = selectedRows
  }

  AddRows() {

    if (this._salesService.headerData.tblTransDetail.length < 3) {
      const number = 3 - this._salesService.headerData.tblTransDetail.length
      for (let index = 0; index < number; index++) {
        this._salesService.headerData.tblTransDetail.push(new TblTransDetailDto());
      }
    }
  }
  deleteRow(table: any, index: number) {

    if (table == 'LeaveApproved') {
      // this.LeaveApproved.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'LeaveApproved') {
            this.LeaveApproved.splice(index, 1);
            if (this.LeaveApproved.length === 0) {
              this.addRow('LeaveApproved', -1);
            }
          }
        }
      });
    }
  }




  addRow(table: any, index: number) {
    if (table == 'LeaveApproved') {
      const newRow = new TblSecTransDetailDto()
      this.LeaveApproved.splice(index + 1, 0, newRow);

    }
  }

  deleteRow1(table: any, index: number) {

    if (table == 'LeaveRejoin') {
      // this.LeaveRejoin.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'LeaveRejoin') {
            this.LeaveRejoin.splice(index, 1);
            if (this.LeaveRejoin.length === 0) {
              this.addRow1('LeaveRejoin', -1);
            }
          }
        }
      });
    }


  }

  addRow1(table: any, index: number) {
    if (table == 'LeaveRejoin') {
      const newRow = new TblSecTransDetailDto()
      this.LeaveRejoin.splice(index + 1, 0, newRow);

    }
  }



}
