import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptAndPaymentRoutingModule } from './receipt-and-payment-routing.module';
import { ReceiptAndPaymentComponent } from './receipt-and-payment.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { BankReceiptComponent } from './bank-receipt/bank-receipt.component';
import { BankReceiptsWithTaxComponent } from './bank-receipts-with-tax/bank-receipts-with-tax.component';
import { LcReceiptsComponent } from './lc-receipts/lc-receipts.component';
import { InterCoReceiptComponent } from './inter-co-receipt/inter-co-receipt.component';
import { BankPaymentComponent } from './bank-payment/bank-payment.component';
import { BankPaymentWithTaxComponent } from './bank-payment-with-tax/bank-payment-with-tax.component';
import { PettyCashComponent } from './petty-cash/petty-cash.component';
import { LcPaymentComponent } from './lc-payment/lc-payment.component';
import { InterCoPaymentComponent } from './inter-co-payment/inter-co-payment.component';


@NgModule({
  declarations: [ReceiptAndPaymentComponent, ReceiptComponent, BankReceiptComponent, BankReceiptsWithTaxComponent, LcReceiptsComponent, InterCoReceiptComponent, BankPaymentComponent, BankPaymentWithTaxComponent, PettyCashComponent, LcPaymentComponent, InterCoPaymentComponent],
  imports: [
    CommonModule,
    ReceiptAndPaymentRoutingModule,
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
export class ReceiptAndPaymentModule { }
