import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MurabahaloanAndTrRoutingModule } from './murabahaloan-and-tr-routing.module';
import { CreateLoanCategoryComponent } from './create-loan-category/create-loan-category.component';
import { CreateLoanGroupComponent } from './create-loan-group/create-loan-group.component';
import { CreateLoanAccountComponent } from './create-loan-account/create-loan-account.component';
import { LoanOpeningBalanceComponent } from './loan-opening-balance/loan-opening-balance.component';
import { CreateNewLoanComponent } from './create-new-loan/create-new-loan.component';
import { PdpPaymentComponent } from './pdp-payment/pdp-payment.component';
import { LoanJournalComponent } from './loan-journal/loan-journal.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { IcommonModule } from '../icommon/icommon.module';


@NgModule({
  declarations: [CreateLoanCategoryComponent, CreateLoanGroupComponent, CreateLoanAccountComponent, LoanOpeningBalanceComponent, CreateNewLoanComponent, PdpPaymentComponent, LoanJournalComponent],
  imports: [
    CommonModule,
    MurabahaloanAndTrRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    IcommonModule
  ],
  providers :[
    BreadcrumbService 
  ]
})
export class MurabahaloanAndTrModule { }
