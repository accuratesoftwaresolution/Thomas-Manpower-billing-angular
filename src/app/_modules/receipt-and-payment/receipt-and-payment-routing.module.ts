import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptComponent } from './receipt/receipt.component';
import { BankReceiptComponent } from './bank-receipt/bank-receipt.component';
import { BankReceiptsWithTaxComponent } from './bank-receipts-with-tax/bank-receipts-with-tax.component';
import { InterCoReceiptComponent } from './inter-co-receipt/inter-co-receipt.component';
import { LcReceiptsComponent } from './lc-receipts/lc-receipts.component';
import { BankPaymentComponent } from './bank-payment/bank-payment.component';
import { BankPaymentWithTaxComponent } from './bank-payment-with-tax/bank-payment-with-tax.component';
import { LcPaymentComponent } from './lc-payment/lc-payment.component';
import { PettyCashComponent } from './petty-cash/petty-cash.component';
import { InterCoPaymentComponent } from './inter-co-payment/inter-co-payment.component';

const routes: Routes = [

  { path: 'receipt', component : ReceiptComponent},
  { path: 'bank-receipt', component : BankReceiptComponent},
  { path: 'bank-receipt-tax', component : BankReceiptsWithTaxComponent},
  { path: 'inter-co-receipt', component : InterCoReceiptComponent},
  { path: 'lc-receipt', component : LcReceiptsComponent},


  { path: 'bank-payment', component : BankPaymentComponent},
  { path: 'bank-payment-tax', component : BankPaymentWithTaxComponent},

  { path: 'petty-cash', component : PettyCashComponent},
  { path: 'lc-payment', component : LcPaymentComponent},
  { path: 'inter-co-payment', component : InterCoPaymentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceiptAndPaymentRoutingModule { }
