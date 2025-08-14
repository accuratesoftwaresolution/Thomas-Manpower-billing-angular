import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PurchaseRequistionComponent } from './purchase-requistion/purchase-requistion.component';
import { PurchaseEnquiryComponent } from './purchase-enquiry/purchase-enquiry.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { InterCoPurchaseOrderComponent } from './inter-co-purchase-order/inter-co-purchase-order.component';
import { MaterialReceiptVoucherComponent } from './material-receipt-voucher/material-receipt-voucher.component';
import { PurchaseVoucherComponent } from './purchase-voucher/purchase-voucher.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';

const routes: Routes = [


  { path: 'purchase-requisition', component: PurchaseRequistionComponent },
  { path: 'purchase-requisition/:id', component: PurchaseRequistionComponent },

  { path: 'purchase-enquiry', component: PurchaseEnquiryComponent },
  { path: 'purchase-enquiry/:id', component: PurchaseEnquiryComponent },

  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'purchase-order/:id', component: PurchaseOrderComponent },

  { path: 'inter-co-purchase-order', component: InterCoPurchaseOrderComponent },
  { path: 'inter-co-purchase-order/:id', component: InterCoPurchaseOrderComponent },

  { path: 'material-receipt', component: MaterialReceiptVoucherComponent },
  { path: 'material-receipt/:id', component: MaterialReceiptVoucherComponent },

  { path: 'purchase-voucher', component: PurchaseVoucherComponent },
  { path: 'purchase-voucher/:id', component: PurchaseVoucherComponent },

  { path: 'purchase-return', component: PurchaseReturnComponent },
  { path: 'purchase-return/:id', component: PurchaseReturnComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
