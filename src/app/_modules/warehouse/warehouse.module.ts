import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { WarehouseTransferRequestComponent } from './warehouse-transfer-request/warehouse-transfer-request.component';
import { WarehouseIssueComponent } from './warehouse-issue/warehouse-issue.component';
import { WarehouseReceiptComponent } from './warehouse-receipt/warehouse-receipt.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';


@NgModule({
  declarations: [WarehouseComponent, WarehouseTransferRequestComponent, WarehouseIssueComponent, WarehouseReceiptComponent],
  imports: [
    CommonModule,
    WarehouseRoutingModule,
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
export class WarehouseModule { }
