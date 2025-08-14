import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegisteredIssuesViewComponent } from './registered-issues/registered-issues-view/registered-issues-view.component';
import { RegisteredIssuesComponent } from './registered-issues/registered-issues.component';
import { ReprtConfigurationComponent } from './reprt-configuration/reprt-configuration.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'report-config', component: ReprtConfigurationComponent },
  { path: 'registered_issues', component: RegisteredIssuesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImplementationRoutingModule { }

export const implementationRoutingComponents = [
  MenuComponent,
  ReprtConfigurationComponent,
  RegisteredIssuesComponent,
  RegisteredIssuesViewComponent
];
