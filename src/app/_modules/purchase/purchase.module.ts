import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { PurchaseComponent } from './purchase.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { PurchaseRequistionComponent } from './purchase-requistion/purchase-requistion.component';
import { PurchaseEnquiryComponent } from './purchase-enquiry/purchase-enquiry.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { InterCoPurchaseOrderComponent } from './inter-co-purchase-order/inter-co-purchase-order.component';
import { MaterialReceiptVoucherComponent } from './material-receipt-voucher/material-receipt-voucher.component';
import { PurchaseVoucherComponent } from './purchase-voucher/purchase-voucher.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';


@NgModule({
  declarations: [PurchaseComponent, PurchaseRequistionComponent, PurchaseEnquiryComponent, PurchaseOrderComponent, InterCoPurchaseOrderComponent, MaterialReceiptVoucherComponent, PurchaseVoucherComponent, PurchaseReturnComponent],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
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
export class PurchaseModule { }
