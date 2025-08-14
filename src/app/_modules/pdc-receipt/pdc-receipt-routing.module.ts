import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PdcPaymentComponent } from './pdc-payment/pdc-payment.component';
import { ReceiptComponent } from './receipt/receipt.component';

const routes: Routes = [
  { path: 'pdc-payment', component : PdcPaymentComponent},
  { path: 'pdc-receipt', component : ReceiptComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdcReceiptRoutingModule { }
