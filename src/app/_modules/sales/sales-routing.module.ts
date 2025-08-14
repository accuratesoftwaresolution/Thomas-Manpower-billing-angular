import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesListComponent } from './sales-list/sales-list.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesEnquiryComponent } from './sales-enquiry/sales-enquiry.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { InterCoSalesOrderComponent } from './inter-co-sales-order/inter-co-sales-order.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';

const routes: Routes = [
  { path: 'sales-list', component: SalesListComponent },

  { path: 'sales-enquiry', component: SalesEnquiryComponent },
  { path: 'sales-enquiry/:id', component: SalesEnquiryComponent },

  { path: 'sales-order', component: SalesOrderComponent },
  { path: 'sales-order/:id', component: SalesOrderComponent },

  { path: 'inter-co-sales-order', component: InterCoSalesOrderComponent },
  { path: 'inter-co-sales-order/:id', component: InterCoSalesOrderComponent },

  { path: 'delivery-note', component: DeliveryNoteComponent },
  { path: 'delivery-note/:id', component: DeliveryNoteComponent },


  { path: 'sales-invoice', component: SalesInvoiceComponent },
  { path: 'sales-invoice/:id', component: SalesInvoiceComponent },

  { path: 'sales-return', component: SalesReturnComponent },
  { path: 'sales-return/:id', component: SalesReturnComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
