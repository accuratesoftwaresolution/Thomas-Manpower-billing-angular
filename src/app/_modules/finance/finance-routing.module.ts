import { AgeingReportComponent } from './finance-reports/ageing-report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountAddressEditComponent } from './masters/account-address-edit/account-address-edit.component';
import { ExpGroupCategoryComponent } from './expense-analysis/exp-group-category/exp-group-category.component';
import { GroupMasterComponent } from './expense-analysis/group-master/group-master.component';
import { AccountMasterComponent } from './masters/account-master/account-master.component';
import { CashBankSetupComponent } from './masters/cash-bank-setup/cash-bank-setup.component';
import { CategoryGroupComponent } from './masters/category-group/category-group.component';
import { CategoryComponent } from './masters/category/category.component';
import { CreditLimitEntryComponent } from './masters/credit-limit-entry/credit-limit-entry.component';
import { StatusChangeComponent } from './masters/status-change/status-change.component';
import { ExpHeadCategoryComponent } from './expense-analysis/exp-head-category/exp-head-category.component';
import { FinanceReportsComponent } from './finance-reports/finance-reports.component';
import { FinanceComponent } from './finance/finance.component';
import { ExpenseHeadComponent } from './expense-analysis/expense-head/expense-head.component';
import { GroupStatusChangeComponent } from './expense-analysis/group-status-change/group-status-change.component';
import { HeadStatusChangeComponent } from './expense-analysis/head-status-change/head-status-change.component';
import { SetExpenseCodeComponent } from './expense-analysis/set-expense-code/set-expense-code.component';
import { AllocationComponent } from './allocation/allocation.component';
import { ReportDesignerBalancesheetComponent } from './report-designer-balancesheet-profitloss/report-designer-balancesheet.component';

const routes: Routes = [
  { path: 'accounts', component: AccountMasterComponent },
  { path: 'category-group', component: CategoryGroupComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'cash-bank-setup', component: CashBankSetupComponent },
  { path: 'status-change', component: StatusChangeComponent },
  { path: 'accounts-address-edit', component: AccountAddressEditComponent },
  { path: 'credit-limit-entry', component: CreditLimitEntryComponent },
  { path: 'accounts', component: AccountMasterComponent },
  { path: 'category-group', component: CategoryGroupComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'cash-bank-setup', component: CashBankSetupComponent },
  { path: 'group', component: GroupMasterComponent },
  { path: 'expense-head', component: ExpenseHeadComponent },
  { path: 'grp-status-change', component: GroupStatusChangeComponent },
  { path: 'head-status-change', component: HeadStatusChangeComponent },
  { path: 'exp-group-category', component: ExpGroupCategoryComponent },
  { path: 'exp-head-category', component: ExpHeadCategoryComponent },
  { path: 'reports/acc_ageing', component: AgeingReportComponent },
  { path: 'reports/:menuId', component: FinanceReportsComponent },
  { path: 'set-expense-code', component: SetExpenseCodeComponent },
  { path: ':int', component: FinanceComponent },
  { path: 'budget/allocation', component: AllocationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }

export const financeRoutingComponets = [
  AccountMasterComponent,
  CategoryGroupComponent,
  CategoryComponent,
  CashBankSetupComponent,
  StatusChangeComponent,
  AccountAddressEditComponent,
  CreditLimitEntryComponent,
  GroupMasterComponent,
  ExpGroupCategoryComponent,
  ExpHeadCategoryComponent,
  FinanceReportsComponent,
  FinanceComponent,
  ExpenseHeadComponent,
  GroupStatusChangeComponent,
  HeadStatusChangeComponent,
  SetExpenseCodeComponent,
  AllocationComponent,
  AgeingReportComponent,
  ReportDesignerBalancesheetComponent
];
