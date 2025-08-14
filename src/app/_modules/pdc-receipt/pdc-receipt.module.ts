import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdcReceiptRoutingModule } from './pdc-receipt-routing.module';
import { PdcReceiptComponent } from './pdc-receipt.component';
import { PdcPaymentComponent } from './pdc-payment/pdc-payment.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { ReceiptComponent } from './receipt/receipt.component';


@NgModule({
  declarations: [PdcReceiptComponent, PdcPaymentComponent, ReceiptComponent],
  imports: [
    CommonModule,
    PdcReceiptRoutingModule,
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
export class PdcReceiptModule { }
