import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccuralOpeningBalanceComponent } from './accural-opening-balance/accural-opening-balance.component';
import { AccrualPostDatedJournalComponent } from './accrual-post-dated-journal/accrual-post-dated-journal.component';
import { AccrualPostDatedJournalListingComponent } from './accrual-post-dated-journal-listing/accrual-post-dated-journal-listing.component';
import { ConversionOfAccrualJournalComponent } from './conversion-of-accrual-journal/conversion-of-accrual-journal.component';
import { AccrualPaymentComponent } from './accrual-payment/accrual-payment.component';
import { PrepaidOpeningBalanceComponent } from './prepaid-opening-balance/prepaid-opening-balance.component';
import { CreatePrepaidPostDatedJournalComponent } from './create-prepaid-post-dated-journal/create-prepaid-post-dated-journal.component';
import { PrepaidPaymentsComponent } from './prepaid-payments/prepaid-payments.component';
import { PrepaidPostDatedJournalListingComponent } from './prepaid-post-dated-journal-listing/prepaid-post-dated-journal-listing.component';
import { ConversionPostDatedJournalComponent } from './conversion-post-dated-journal/conversion-post-dated-journal.component';

const routes: Routes = [

  // Updated New Menu Screens ( 25-03-2025 )

  { path: 'accrual-opening-balance', component: AccuralOpeningBalanceComponent },
  { path: 'accrual-post-dated-journal', component: AccrualPostDatedJournalComponent },
  { path: 'accrual-post-dated-journal-listing', component: AccrualPostDatedJournalListingComponent },
  { path: 'conversion-of-accrual-journal', component: ConversionOfAccrualJournalComponent },
  { path: 'accrual-payment', component: AccrualPaymentComponent },

  { path: 'prepaid-opening-balance', component: PrepaidOpeningBalanceComponent },
  { path: 'prepaid-post-dated-journal', component: CreatePrepaidPostDatedJournalComponent },
  { path: 'prepaid-post-dated-journal-listing', component: PrepaidPostDatedJournalListingComponent },
  { path: 'conversion-of-post-dated-journal', component: ConversionPostDatedJournalComponent },
  { path: 'prepaid-payments', component: PrepaidPaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepaidAndAccuralRoutingModule { }
