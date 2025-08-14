import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLoanAccountComponent } from './create-loan-account/create-loan-account.component';
import { CreateLoanCategoryComponent } from './create-loan-category/create-loan-category.component';
import { CreateLoanGroupComponent } from './create-loan-group/create-loan-group.component';
import { CreateNewLoanComponent } from './create-new-loan/create-new-loan.component';
import { LoanJournalComponent } from './loan-journal/loan-journal.component';
import { LoanOpeningBalanceComponent } from './loan-opening-balance/loan-opening-balance.component';
import { PdpPaymentComponent } from './pdp-payment/pdp-payment.component';

const routes: Routes = [
  { path: 'create-loan-category', component: CreateLoanCategoryComponent },
  { path: 'create-loan-group', component: CreateLoanGroupComponent },
  { path: 'create-loan-account', component: CreateLoanAccountComponent },
  { path: 'create-new-loan', component: CreateNewLoanComponent },
  { path: 'loan-journal', component: LoanJournalComponent },
  { path: 'loan-opening-balance', component: LoanOpeningBalanceComponent },
  { path: 'pdp-payment', component: PdpPaymentComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MurabahaloanAndTrRoutingModule { }
