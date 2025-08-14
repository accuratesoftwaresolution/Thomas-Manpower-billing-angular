import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { IssueVoucherComponent } from './issue-voucher/issue-voucher.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { StockIssueRequestComponent } from './stock-issue-request/stock-issue-request.component';
import { StockReceiptVoucherComponent } from './stock-receipt-voucher/stock-receipt-voucher.component';


@NgModule({
  declarations: [StockComponent, IssueVoucherComponent, StockIssueRequestComponent, StockReceiptVoucherComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
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
export class StockModule { }
