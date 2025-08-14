import { MasterService } from '@accurate/providers';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TblApplicableCoDto } from 'src/app/_dto/masters/tblapplicableco.dto';
import { TbldEmplCoDto } from 'src/app/_dto/masters/tbldEmplCo.dto';
import { TblDocumentDto } from 'src/app/_dto/masters/tbldoc.dto';
import { TblEmployeeDto } from 'src/app/_dto/masters/tblemp.dto';
import { TblDigiDetailDto } from 'src/app/_dto/tbldigidetail.dto';
import { TblDigiHeadDto } from 'src/app/_dto/tbldigihead.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';


@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent implements OnInit {

  showAmendment: boolean = false;
  activeState: boolean[] = [false, false, false];
  activeIndex: number = 0;
  display: boolean = false;
  HAreaCode_Code: 3;

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

  employee: TblEmployeeDto = new TblEmployeeDto()
  applicableCo: TblApplicableCoDto[] = [new TblApplicableCoDto()]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _salesService: SalesService,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    public masterService: MasterService,
  ) {
      this.employee.tbldEmplco = []
      const temp = new TbldEmplCoDto()
      this.employee.tbldEmplco.push(temp)
   }

  ngOnInit(): void {
    this._salesService.headerData.tblDigiHead = [new TblDigiHeadDto()]
    // this._salesService.headerData.tblDigiDetail = [new TblDigiDetailDto()]
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {
      case 'ApplicableCompanyCode':
        break;
      case 'ActAndDeactCode':
        break;

      case 'EmpGrpCodeM':
        break;
      case 'EmpCataCodeM':
        break;
      case 'EmpTypCodeM':
        break;
      case 'EmpLeavePolCodeM':
        break;

      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp
    console.log(Type);
    

    switch (Type) {
      case 'ApplicableCompanyCode':
        break;
      case 'ActAndDeactCode':
        break;
      case 'EmpGrpCodeM':
        this.employee.HEmpl_Group_Code = event.groupCode
        this.employee.HEmpl_Group_Name = event.groupName
        break;
      case 'EmpCataCodeM':
        this.employee.HEmpl_Categ_Code = event.categoryCode
        this.employee.HEmpl_Categ_Name = event.categoryName
        break;
      case 'EmpTypCodeM':
        this.employee.HEmpl_Type_Code = event.typeCode
        this.employee.HEmpl_Type_Name = event.typeName
        break;
      case 'EmpLeavePolCodeM':
        this.employee.HEmpl_LPolicy_Code = event.policyCode
        this.employee.HEmpl_LPolicy_Name = event.policyName
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

  funcSearch() {

  }

}