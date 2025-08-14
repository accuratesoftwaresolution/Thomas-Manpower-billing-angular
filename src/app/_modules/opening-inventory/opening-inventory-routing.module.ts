import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryOpeningEntryComponent } from './inventory-opening-entry/inventory-opening-entry.component';

const routes: Routes = [
  { path : 'inventory-opening-entry', component: InventoryOpeningEntryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeningInventoryRoutingModule { }
