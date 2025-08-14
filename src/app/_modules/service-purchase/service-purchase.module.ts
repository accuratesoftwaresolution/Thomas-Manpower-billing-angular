import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePurchaseRoutingModule } from './service-purchase-routing.module';
import { ServicePurchaseComponent } from './service-purchase.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { ServicePurchComponent } from './service-purch/service-purch.component';

import { ServicePurchaseOrderComponent } from './service-purchase-order/service-purchase-order.component';
import { InterCoServicePurchaseOrderComponent } from './inter-co-service-purchase-order/inter-co-service-purchase-order.component';


@NgModule({
  declarations: [ServicePurchaseComponent, ServicePurchComponent, ServicePurchaseOrderComponent, InterCoServicePurchaseOrderComponent],
  imports: [
    CommonModule,
    ServicePurchaseRoutingModule,
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
export class ServicePurchaseModule { }
