import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollComponent } from './payroll.component';
import { EmployeeCreationMasterComponent } from './employee-creation-master/employee-creation-master.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { IcommonModule } from '../icommon/icommon.module';
import { WindowModule } from 'src/app/_window/window.module';
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


@NgModule({
  declarations: [PayrollComponent, EmployeeCreationMasterComponent, PayrollAdditionComponent, PayrollDeductionComponent, PayrollPolicySetupComponent, PayrollDesignationGroupComponent, LeaveTypeComponent, EmployeeJoiningComponent, LeaveApplicationComponent, RejoinRegisterComponent, EmployeeAttendanceComponent, PayrollCreationComponent, SalaryPayableOpeningBalanceComponent, SalaryPaymentComponent, EmployeeJournalComponent, PayrolladditionListComponent, PayrolldeductionListComponent, PayrolldesignationListComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    IcommonModule,
    WindowModule

  ]
})
export class PayrollModule { }
