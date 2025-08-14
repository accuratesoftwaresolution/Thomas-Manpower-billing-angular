import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { gratuitypolicydetail } from 'src/app/_dto/gratuitypolicydetail.dto';
import { leavepolicydetail } from 'src/app/_dto/leavepolicydetail.dto';
import { payrollsetupdetail } from 'src/app/_dto/payrollsetupdetail.dto';
import { TblHPaySetup } from 'src/app/_dto/TblHPaySetup.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';

@Component({
  selector: 'app-payroll-policy-setup',
  templateUrl: './payroll-policy-setup.component.html',
  styleUrls: ['./payroll-policy-setup.component.scss']
})
export class PayrollPolicySetupComponent implements OnInit {

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showpolicysetupList: boolean = false
  activeIndex: number = 0
  tableIndex: any;
  TblHPaySetup: TblHPaySetup = new TblHPaySetup()

  scrollableTabs: any[] = [
    { id: 0, title: "Payroll Policy Setup", content: "", visible: true },
    { id: 1, title: "Leave Salary Policy ", content: "Content for Other Expenses", visible: true },
    { id: 2, title: "Gratuity Policy  ", content: "Content for Other Expenses", visible: true },

  ]


  TableData = [

    { field: 'LeaveSummaryGridSysI', header: 'Payroll Grid  SysID', hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, bind: "DPayroll_Grid_SysID", type: 'number' },
    { field: 'EmployeeSysID', header: 'Sl.No', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, PopUp: false, bind: "DPayroll_SlNo", type: 'number' },
    { field: 'EmployeeCode', header: 'Salary Addition SysID', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "DPayroll_Add_SysID", type: 'number' },
    { field: 'EmployeeName', header: 'Salary Addition Code', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, PopUp: true, PopUpData: 'SalaryAdditionCode', bind: "DPayroll_Add_Code", type: 'text' },
    { field: 'JoiningDate', header: 'Salary Addition Name', hide: false, mandatory: false, width: '16rem', data: '123456', manual: false, bind: "DPayroll_Add_Name", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },
    { field: 'TerminationDate', header: 'Account Addition SysID', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DPayroll_AccAdd_SysID", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'LastDayofWorking', header: 'Account Addition Code', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DPayroll_AccAdd_Code", PopUp: true, PopUpData: 'AccountAdditionCode', align: 'left', type: 'text' },
    { field: 'CalculationDate', header: 'Account Addition Name', hide: false, mandatory: false, width: '16rem', data: '12345678912345', manual: false, bind: "DPayroll_AccAdd_Name", readOnly: false, align: 'left', type: 'text' },
    { field: 'NumberofLeaveSalaryDays', header: 'Salary Deduction SysID', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DPayroll_Ded_SysID", affects: ['Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'NumberofLeaveSalaryUsedDays', header: 'Salary Deduction Code', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DPayroll_Ded_Code", PopUp: true, PopUpData: 'SalaryDeductionCode', align: 'left', type: 'text' },
    { field: 'NumberofLeaveSalaryBalanceDays', header: 'Salary Deduction Name', hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, bind: "DPayroll_Ded_Name", type: 'text' },
    { field: 'LeaveSummaryReports', header: 'Account Deduction SysID', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'number', bind: "DPayroll_AccDed_SysID" },
    { field: 'NumberofGratuityDays', header: 'Account Deduction Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "DPayroll_AccDed_Code", PopUp: true, PopUpData: 'AccountDeductionCode', type: 'text' },
    { field: 'NumberofGratuityUsedDays', header: 'Account Deduction  Name', hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, bind: "DPayroll_AccDed_Name", type: 'text' },
    { field: 'NumberofGratuityBalanceDays', header: 'Remarks Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "DPayroll_Remark_Code", PopUp: true, PopUpData: 'RemarkCodePayroll', type: 'text' },
    { field: 'GratuitySummaryReports ', header: '	Remarks Name ', hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, bind: "DPayroll_Remark_Name", type: 'text' },
  ]


  TableData1 = [

    { header: 'Leave Type Grid  Code', bind: "DLPolicy_Grid_SysID", hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, type: 'number' },
    { header: 'Leave Policy Sl No', bind: "DLPolicy_SlNo", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, PopUp: false, type: 'number' },
    { header: 'Leave Type SysID', bind: "DLPolicy_SysID", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'number' },
    { header: 'Leave Type Code', bind: "DLPolicy_Code", hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, PopUp: true, PopUpData: 'LeaveTypeCode', type: 'text' },
    { header: 'Leave Type Name', bind: "DLPolicy_Name", hide: false, mandatory: false, width: '16rem', data: '123456', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },
    { header: 'Leave Salary Yearly LeaveDays', bind: "DLPolicy_Number_Day", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Leave Salary Yearly Full Days', bind: "DLPolicy_YearFull_Day", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'text' },
    { header: 'Leave Salary Yearly Days Applicable Yes/No', bind: "DLPolicy_YearFull_Yn", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'checkbox', checkbox: true },
    { header: 'Leave Salary as 11+1 Month Salary', bind: "DLPolicy_Number_Month", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, affects: ['Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Leave Salary as 11+1 Full Month', bind: "DLPolicy_Full_Month", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'text' },
    { header: 'Leave Salary as 11+1 Full Month Applicable Yes/No', bind: "DLPolicy_Full_Yn", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'checkbox', checkbox: true },
    { header: 'Remarks Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "DLPolicy_Remark_Code", PopUp: true, PopUpData: 'PolicyRemarkCode', type: 'text' },
    { header: '	Remarks Name ', hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, bind: "DLPolicy_Remark_Name", type: 'text' },

  ]

  TableData2 = [

    { header: 'Gratuity  Policy Grid SysID', bind: "DGPolicy_Grid_SysID", hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, type: 'number' },
    { header: 'Gratuity  Policy Sl No', bind: "DGPolicy_SlNo", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, PopUp: false, type: 'number' },
    { header: 'Gratuity  Policy Code SysID', bind: "DGPolicy_SysID", hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, type: 'number' },
    { header: 'Gratuity Policy Code', bind: "DGPolicy_Code", hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false, PopUp: true, PopUpData: 'GratuityTypeCode', type: 'text' },
    { header: 'Gratuity  Policy Name', bind: "DGPolicy_Name", hide: false, mandatory: false, width: '16rem', data: '123456', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },
    { header: 'Gratuity  Policy Number Of Days', bind: "DGPolicy_Number_Day", hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'text' },

    { header: 'Gratuity  Policy  From Year', bind: "DGPolicy_From_Year", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { header: 'Gratuity  Policy To Year', bind: "DGPolicy_To_Year", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, align: 'left', type: 'number' },
    { header: 'Fraction Applicable Per Year', bind: "DGPolicy_Fraction", hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, readOnly: false, align: 'center', type: 'number' },

    { header: 'Remarks Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "DGPolicy_Remarks_Code", PopUp: true, PopUpData: 'GratuityRemarkCode', type: 'text' },
    { header: '	Remarks Name ', hide: false, mandatory: false, width: '16rem', data: '123456789', manual: false, bind: "DGPolicy_Remarks_Name", type: 'text' },

  ]
  constructor(public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    public _salesService: SalesService,
    private confirmationService: ConfirmationService,
    private masterService: MasterService,
    private router: Router) { }

  ngOnInit(): void {
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

      case 'ApplicableCompanyCode':
        break;
      case 'AccDirectExpCode':
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

      case 'PayrollDesignationCode':
        this.TblHPaySetup.HPayroll_DesGroup_Code = event.HPayroll_DesGroup_Code
        this.TblHPaySetup.HPayroll_DesGroup_Name = event.HPayroll_DesGroup_Name

      case 'SalaryAdditionCode':
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_Add_Code = event.DPayroll_Add_Code
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_Add_Name = event.DPayroll_Add_Name
        break;
      case 'AccountAdditionCode':
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_AccAdd_Code = event.DPayroll_AccAdd_Code
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_AccAdd_Name = event.DPayroll_AccAdd_Name
        break;
      case 'SalaryDeductionCode':
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_Ded_Code = event.SalaryDeductionCode
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_Ded_Name = event.SalaryDeductionName
        break;
      case 'AccountDeductionCode':
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_AccDed_Code = event.AccountDeductionCode
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_AccDed_Name = event.AccountDeductionName
        break;
      case 'RemarkCodePayroll':
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_Remark_Code = event.HRemMast_Code
        this.TblHPaySetup.payrollsetupdetail[this.tableIndex].DPayroll_Remark_Name = event.HRemMast_Name
        break;
      case 'LeaveTypeCode':
        this.TblHPaySetup.leavesalary[0].leavepolicydetail[this.tableIndex].DLPolicy_Code = event.dlPolicyCode
        this.TblHPaySetup.leavesalary[0].leavepolicydetail[this.tableIndex].DLPolicy_Name = event.dlPolicyName
        break;
      case 'PolicyRemarkCode':
        this.TblHPaySetup.leavesalary[0].leavepolicydetail[this.tableIndex].DLPolicy_Remark_Code = event.HRemMast_Code
        this.TblHPaySetup.leavesalary[0].leavepolicydetail[this.tableIndex].DLPolicy_Remark_Name = event.HRemMast_Name
        break;
      case 'GratuityRemarkCode':
        this.TblHPaySetup.gratuitypolicydetail[this.tableIndex].DGPolicy_Remarks_Code = event.HRemMast_Code
        this.TblHPaySetup.gratuitypolicydetail[this.tableIndex].DGPolicy_Remarks_Name = event.HRemMast_Name
        break;
      case 'GratuityTypeCode':
        this.TblHPaySetup.gratuitypolicydetail[this.tableIndex].DGPolicy_Code = event.dlPolicyCode
        this.TblHPaySetup.gratuitypolicydetail[this.tableIndex].DGPolicy_Name = event.dlPolicyName
        break;
    }
  }
  // toggleSelectAll(event: any) {
  //   const isChecked = event.target.checked;
  //   this.payrollsetupdetail.forEach(row => {
  //     row.selected = isChecked;
  //   });
  // }

  // isAllSelected(): boolean {
  //   return this.payrollsetupdetail.every(row => row.selected);
  // }


  toggleSelectAll(event: any, table?) {
    const isChecked = event.target.checked;

    if (table == 'payrollsetupdetail') {
      this.TblHPaySetup.payrollsetupdetail.forEach(row => {
        row.selected = isChecked;
      });
    }
    else if (table == 'leavepolicydetail') {
      this.TblHPaySetup.leavesalary[0].leavepolicydetail.forEach(row => {
        row.selected = isChecked;
      });
    }
    else if (table == 'gratuitypolicydetail') {
      this.TblHPaySetup.gratuitypolicydetail.forEach(row => {
        row.selected = isChecked;
      });
    }
  }

  isAllSelected(table?): boolean {
    if (table == 'payrollsetupdetail') {
      return this.TblHPaySetup.payrollsetupdetail.every(row => row.selected);
    }
    else if (table == 'leavepolicydetail') {
      return this.TblHPaySetup.leavesalary[0].leavepolicydetail.every(row => row.selected);
    }
    else if (table == 'gratuitypolicydetail') {
      return this.TblHPaySetup.gratuitypolicydetail.every(row => row.selected);
    }

  }
  onRowClick(rowData: any, rowIndex: number): void {
    console.log('Row clicked:', rowData, 'Index:', rowIndex);
  }

  deleteRow1(table: any, index: number) {

    if (table == 'payrollsetupdetail') {
      // this.payrollsetupdetail.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'payrollsetupdetail') {
            this.TblHPaySetup.payrollsetupdetail.splice(index, 1);
            if (this.TblHPaySetup.payrollsetupdetail.length === 0) {
              this.addRow1('payrollsetupdetail', -1);
            }
          }
        }
      });
    }

  }

  addRow1(table: any, index: number) {
    if (table == 'payrollsetupdetail') {
      const newRow = new payrollsetupdetail()
      this.TblHPaySetup.payrollsetupdetail.splice(index + 1, 0, newRow);

    }

  }

  deleteRow2(table: any, index: number) {

    if (table == 'leavepolicydetail') {
      // this.leavepolicydetail.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'leavepolicydetail') {
            this.TblHPaySetup.leavesalary[0].leavepolicydetail.splice(index, 1);
            if (this.TblHPaySetup.leavesalary[0].leavepolicydetail.length === 0) {
              this.addRow2('leavepolicydetail', -1);
            }
          }
        }
      });
    }

  }

  addRow2(table: any, index: number) {
    if (table == 'leavepolicydetail') {
      const newRow = new leavepolicydetail()
      this.TblHPaySetup.leavesalary[0].leavepolicydetail.splice(index + 1, 0, newRow);

    }

  }

  deleteRow3(table: any, index: number) {

    if (table == 'gratuitypolicydetail') {
      // this.gratuitypolicydetail.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'gratuitypolicydetail') {
            this.TblHPaySetup.gratuitypolicydetail.splice(index, 1);
            if (this.TblHPaySetup.gratuitypolicydetail.length === 0) {
              this.addRow3('gratuitypolicydetail', -1);
            }
          }
        }
      });
    }
  }



  addRow3(table: any, index: number) {
    if (table == 'gratuitypolicydetail') {
      const newRow = new gratuitypolicydetail()
      this.TblHPaySetup.gratuitypolicydetail.splice(index + 1, 0, newRow);

    }

  }
  ConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Only delete if user confirms
      }
    });
  }


  displaypolicysetupList() {
    this.showpolicysetupList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData('account-module').then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPayroll_Code || item.HPayroll_Name || item.HPayroll_SysID;
      const matchesQuery =
        (item.HPayroll_Code || '').toLowerCase().includes(query) ||
        (item.HPayroll_Name || '').toLowerCase().includes(query) ||
        item.HPayroll_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showpolicysetupList = false
    this.router.navigate(['payroll/payroll-policy-setup']);


  }
  editRow(rowData: any) {
    this.router.navigate(['payroll/payroll-policy-setup/' + rowData.HPayroll_SysID]);
  }

}
