import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrepaidAndAccuralRoutingModule } from './prepaid-and-accural-routing.module';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { IcommonModule } from '../icommon/icommon.module';
import { AccuralOpeningBalanceComponent } from './accural-opening-balance/accural-opening-balance.component';
import { WindowModule } from 'src/app/_window/window.module';
import { AccrualPostDatedJournalComponent } from './accrual-post-dated-journal/accrual-post-dated-journal.component';
import { AccrualPostDatedJournalListingComponent } from './accrual-post-dated-journal-listing/accrual-post-dated-journal-listing.component';
import { ConversionOfAccrualJournalComponent } from './conversion-of-accrual-journal/conversion-of-accrual-journal.component';
import { AccrualPaymentComponent } from './accrual-payment/accrual-payment.component';
import { PrepaidOpeningBalanceComponent } from './prepaid-opening-balance/prepaid-opening-balance.component';
import { CreatePrepaidPostDatedJournalComponent } from './create-prepaid-post-dated-journal/create-prepaid-post-dated-journal.component';
import { PrepaidPaymentsComponent } from './prepaid-payments/prepaid-payments.component';
import { PrepaidPostDatedJournalListingComponent } from './prepaid-post-dated-journal-listing/prepaid-post-dated-journal-listing.component';
import { ConversionPostDatedJournalComponent } from './conversion-post-dated-journal/conversion-post-dated-journal.component';


@NgModule({
  declarations: [ AccuralOpeningBalanceComponent, AccrualPostDatedJournalComponent, AccrualPostDatedJournalListingComponent, ConversionOfAccrualJournalComponent, AccrualPaymentComponent, PrepaidOpeningBalanceComponent, CreatePrepaidPostDatedJournalComponent, PrepaidPaymentsComponent, PrepaidPostDatedJournalListingComponent, ConversionPostDatedJournalComponent],
  imports: [
    CommonModule,
    PrepaidAndAccuralRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    WindowModule,
    IcommonModule

  ],
  providers: [
    BreadcrumbService
  ],
})
export class PrepaidAndAccuralModule { }
