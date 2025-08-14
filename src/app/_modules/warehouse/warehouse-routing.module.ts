import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseTransferRequestComponent } from './warehouse-transfer-request/warehouse-transfer-request.component';
import { WarehouseIssueComponent } from './warehouse-issue/warehouse-issue.component';
import { WarehouseReceiptComponent } from './warehouse-receipt/warehouse-receipt.component';

const routes: Routes = [
  { path:'transfer-request' , component:WarehouseTransferRequestComponent },
  { path:'warehouse-issue' , component:WarehouseIssueComponent },
  { path:'warehouse-receipt' , component:WarehouseReceiptComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
