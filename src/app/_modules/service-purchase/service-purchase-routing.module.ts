import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicePurchComponent } from './service-purch/service-purch.component';
import { ServicePurchaseOrderComponent } from './service-purchase-order/service-purchase-order.component';
import { InterCoServicePurchaseOrderComponent } from './inter-co-service-purchase-order/inter-co-service-purchase-order.component';

const routes: Routes = [

  { path: 'purchase', component: ServicePurchComponent },
  { path: 'purchase/:id', component: ServicePurchComponent },

  { path: 'purchase-order', component: ServicePurchaseOrderComponent },
  { path: 'purchase-order/:id', component: ServicePurchaseOrderComponent },

  { path: 'inter-co-service-purchase', component: InterCoServicePurchaseOrderComponent },
  { path: 'inter-co-service-purchase/:id', component: InterCoServicePurchaseOrderComponent },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePurchaseRoutingModule { }
