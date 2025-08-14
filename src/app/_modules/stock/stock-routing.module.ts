import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueVoucherComponent } from './issue-voucher/issue-voucher.component';
import { StockIssueRequestComponent } from './stock-issue-request/stock-issue-request.component';
import { StockReceiptVoucherComponent } from './stock-receipt-voucher/stock-receipt-voucher.component';

const routes: Routes = [
  { path:'stock-issue-request' , component:StockIssueRequestComponent },
  { path:'issue-voucher' , component:IssueVoucherComponent },
  { path:'stock-receipt-voucher' , component:StockReceiptVoucherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
