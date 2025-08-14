import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeCreationMasterComponent } from './employee-creation-master/employee-creation-master.component';
import { PayrollAdditionComponent } from './payroll-addition/payroll-addition.component';
import { PayrollDeductionComponent } from './payroll-deduction/payroll-deduction.component';
import { PayrollPolicySetupComponent } from './payroll-policy-setup/payroll-policy-setup.component';
import { PayrollDesignationGroupComponent } from './payroll-designation-group/payroll-designation-group.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { EmployeeJoiningComponent } from './employee-joining/employee-joining.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { RejoinRegisterComponent } from './rejoin-register/rejoin-register.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { PayrollCreationComponent } from './payroll-creation/payroll-creation.component';
import { SalaryPayableOpeningBalanceComponent } from './salary-payable-opening-balance/salary-payable-opening-balance.component';
import { SalaryPaymentComponent } from './salary-payment/salary-payment.component';
import { EmployeeJournalComponent } from './employee-journal/employee-journal.component';
import { PayrolladditionListComponent } from './payroll-addition/payrolladdition-list/payrolladdition-list.component';
import { PayrolldeductionListComponent } from './payroll-deduction/payrolldeduction-list/payrolldeduction-list.component';
import { PayrolldesignationListComponent } from './payroll-designation-group/payrolldesignation-list/payrolldesignation-list.component';

const routes: Routes = [
  {path:'employee-creation-master',component :EmployeeCreationMasterComponent},
  {path:'payroll-addition',component:PayrollAdditionComponent},
  {path:'payroll-addition/:id',component:PayrollAdditionComponent},


  {path :'payroll-deduction',component :PayrollDeductionComponent},
  {path :'payroll-deduction/:id',component :PayrollDeductionComponent},

  {path :'payroll-policy-setup',component :PayrollPolicySetupComponent},
  {path :'payroll-designation-group',component :PayrollDesignationGroupComponent},
  {path :'payroll-designation-group/:id',component :PayrollDesignationGroupComponent},

  {path :'payroll-leave-type',component :LeaveTypeComponent},
  {path :'employee-joining',component :EmployeeJoiningComponent},
  {path :'leave-Application',component :LeaveApplicationComponent}  ,
  {path :'rejoin-register',component :RejoinRegisterComponent}  ,
  {path :'employee-attendance',component :EmployeeAttendanceComponent}  ,
  {path :'payroll-creation',component :PayrollCreationComponent} , 
  {path :'salary-payable-opening-balance',component :SalaryPayableOpeningBalanceComponent} ,
  {path :'salary-payment',component :SalaryPaymentComponent} ,
  {path :'employee-journal',component :EmployeeJournalComponent} ,


// Payroll List

{path :'payrolladdition-list',component :PayrolladditionListComponent} ,
{path :'payrolldeduction-list',component :PayrolldeductionListComponent} ,
{path :'payrolldesignation-list',component :PayrolldesignationListComponent} 







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
