import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InterCompanyPurchaseOrderComponent } from './inter-company-purchase-order/inter-company-purchase-order.component';
import { InterCompanySalesOrderComponent } from './inter-company-sales-order/inter-company-sales-order.component';
import { InterCompanyStockTransferComponent } from './inter-company-stock-transfer/inter-company-stock-transfer.component';
import { IntraCompanyStockTransferComponent } from './intra-company-stock-transfer/intra-company-stock-transfer.component';

const routes: Routes = [
  { path: 'inter-company-purchase-order', component: InterCompanyPurchaseOrderComponent },
  { path: 'inter-company-sales-order', component: InterCompanySalesOrderComponent  },
  { path: 'inter-company-stock-transfer', component: InterCompanyStockTransferComponent },
  { path: 'intra-company-stock-transfer', component: IntraCompanyStockTransferComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterCompanyRoutingModule { }
