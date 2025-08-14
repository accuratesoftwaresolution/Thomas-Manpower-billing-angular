import { Component, OnInit } from '@angular/core';
import { TbldSysIDCoDto } from 'src/app/_dto/masters/tbldSysIDCo.dto';
import { TblHSysIDDto } from 'src/app/_dto/masters/tblHSysID.dto';

@Component({
  selector: 'app-sysid-number',
  templateUrl: './sysid-number.component.html',
  styleUrls: ['./sysid-number.component.scss']
})
export class SysidNumberComponent implements OnInit {

  activeState: boolean[] = [false, false, false];

  activeIndex: number = 0;

  display: boolean = false;

  showCompany: boolean = false;

  showAmendment: boolean = false;

  sysIdData: TblHSysIDDto = new TblHSysIDDto()

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
    // { title: "Tax", content: "Content for Tax" },

  ];

  documentTableData = [
    {},
    {},
    {},
    {},

    // Add more entries as needed
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


  FormFields = [{
    fieldName: "User Name",
    type: "input"
  }, {
    fieldName: "Password",
    type: "input"
  }, {
    fieldName: "Login Company Code",
    type: "input"
  }, {
    fieldName: "Login Company Name",
    type: "input"
  }, {
    fieldName: "Group Company Code",
    type: "input"
  }, {
    fieldName: "Group Company Name",
    type: "input"
  }]
  chosenCountry: any = null;

  chosenAmendment: any = null;

  constructor() {
    this.sysIdData.tbldSysIdCo = []
    const temp = new TbldSysIDCoDto()
    this.sysIdData.tbldSysIdCo.push(temp)
  }

  ngOnInit(): void {
  }

  changeIndex(i) {

    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i
  }

  chooseCompany(i) {
    this.chosenCountry = 'Company ' + i
    this.showCompany = !this.showCompany
  }


  chooseAmendment(i) {
    this.chosenAmendment = 'Amendment ' + i
    this.showAmendment = !this.showAmendment
  }
}
