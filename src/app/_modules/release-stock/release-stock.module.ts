import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseStockRoutingModule } from './release-stock-routing.module';
import { ReleaseStockComponent } from './release-stock.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { StockReleaseComponent } from './stock-release/stock-release.component';


@NgModule({
  declarations: [ReleaseStockComponent, StockReleaseComponent],
  imports: [
    CommonModule,
    ReleaseStockRoutingModule,
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
export class ReleaseStockModule { }
