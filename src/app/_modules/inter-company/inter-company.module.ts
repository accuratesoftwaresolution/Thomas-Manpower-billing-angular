import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterCompanyRoutingModule } from './inter-company-routing.module';
import { InterCompanyComponent } from './inter-company.component';
import { InterCompanyPurchaseOrderComponent } from './inter-company-purchase-order/inter-company-purchase-order.component';
import { InterCompanySalesOrderComponent } from './inter-company-sales-order/inter-company-sales-order.component';
import { InterCompanyStockTransferComponent } from './inter-company-stock-transfer/inter-company-stock-transfer.component';
import { IntraCompanyStockTransferComponent } from './intra-company-stock-transfer/intra-company-stock-transfer.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
     InterCompanyComponent,
     InterCompanyPurchaseOrderComponent,
     InterCompanySalesOrderComponent, 
     InterCompanyStockTransferComponent, 
     IntraCompanyStockTransferComponent
    ],
  imports: [
    CommonModule,
    InterCompanyRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
  ],
  providers :[
    BreadcrumbService 
  ]
})
export class InterCompanyModule { }
