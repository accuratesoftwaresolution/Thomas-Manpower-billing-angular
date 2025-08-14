import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReserveStockRoutingModule } from './reserve-stock-routing.module';
import { ReserveStockComponent } from './reserve-stock.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { StockReserveComponent } from './stock-reserve/stock-reserve.component';


@NgModule({
  declarations: [ReserveStockComponent, StockReserveComponent],
  imports: [
    CommonModule,
    ReserveStockRoutingModule,
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
export class ReserveStockModule { }
