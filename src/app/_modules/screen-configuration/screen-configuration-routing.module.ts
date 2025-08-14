import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenValidationComponent } from './sales/screen-validation/screen-validation.component';
import { MasterScreenConfigComponent } from './master-screen-config/master-screen-config.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';

const routes: Routes = [
  { path: 'sales-list', component: SalesListComponent },
  { path: 'sales', component: ScreenValidationComponent },
  { path: 'sales/:id', component: ScreenValidationComponent },
  { path: 'master', component: MasterScreenConfigComponent },
  { path: 'master/:id', component: MasterScreenConfigComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenConfigurationRoutingModule { }
