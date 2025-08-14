import { MasterService } from '@accurate/providers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TblApplicableCoDto } from 'src/app/_dto/masters/tblapplicableco.dto';
import { EmployeeGroupDto } from 'src/app/_dto/masters/tblempgrp.dto';
import { EmpLeavePolicyDto } from 'src/app/_dto/masters/tblempleavepolicy.dto';
import { TblDigiDetailDto } from 'src/app/_dto/tbldigidetail.dto';
import { TblDigiHeadDto } from 'src/app/_dto/tbldigihead.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
@Component({
  selector: 'app-empleavepolicy',
  templateUrl: './empleavepolicy.component.html',
  styleUrls: ['./empleavepolicy.component.scss']
})
export class EmpleavepolicyComponent implements OnInit {

 showAmendment: boolean = false;
  activeState: boolean[] = [false, false, false];
  activeIndex: number = 0;
  display: boolean = false;

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
    { title: "DigiLock", content: "Content for Other Expenses" },
  ];

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
  }, {
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

  tableIndex: any;

  empLeavePolicy: EmpLeavePolicyDto = new EmpLeavePolicyDto()
  applicableCo: TblApplicableCoDto[] = [new TblApplicableCoDto()]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    public masterService: MasterService,
  ) { }

  ngOnInit(): void {
    this._salesService.headerData.tblDigiHead = [new TblDigiHeadDto()]
    // this._salesService.headerData.tblDigiDetail = [new TblDigiDetailDto()]

    if (this.applicableCo.length < 5) {
      const number = 5 - this.applicableCo.length
      for (let index = 0; index < number; index++) {
        this.applicableCo.push(new TblApplicableCoDto());
      }
    }
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {
      case 'ApplicableCompanyCode':
        break;
      case 'ActAndDeactCode':
        break;
      case 'AlertsEmpCodeM':
        break
      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {
      case 'ApplicableCompanyCode':
        break;
      case 'ActAndDeactCode':
        break;
      
      default:
        break;
    }

  }

  routeTo(screen) {
    this.router.navigate([screen]);
  }


















  changeIndex(i) {
    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }
  save() {

    // this.masterService.createMasterData(Body, apiUrl.tblhareacode).then((res) => {
    //   window.alert('Data Saved Successfully')
    // }, err => {
    //   window.alert('Error Occured ')
    // })
  }

}