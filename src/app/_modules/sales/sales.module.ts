import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SalesListComponent } from './sales-list/sales-list.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesEnquiryComponent } from './sales-enquiry/sales-enquiry.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { InterCoSalesOrderComponent } from './inter-co-sales-order/inter-co-sales-order.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';

 
@NgModule({
  declarations: [SalesComponent, SalesListComponent ,SalesInvoiceComponent, SalesEnquiryComponent, SalesOrderComponent, InterCoSalesOrderComponent, DeliveryNoteComponent, SalesReturnComponent],
  imports: [
    CommonModule,
      SalesRoutingModule,
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
export class SalesModule { }
