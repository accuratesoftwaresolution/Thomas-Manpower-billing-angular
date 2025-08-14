import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockReserveComponent } from './stock-reserve/stock-reserve.component';

const routes: Routes = [
    { path : 'stock-reserve', component: StockReserveComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReserveStockRoutingModule { }
