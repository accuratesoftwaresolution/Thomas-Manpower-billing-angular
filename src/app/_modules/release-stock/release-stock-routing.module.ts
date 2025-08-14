import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockReleaseComponent } from './stock-release/stock-release.component';

const routes: Routes = [
    { path : 'stock-release', component: StockReleaseComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReleaseStockRoutingModule { }
