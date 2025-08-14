import { UserPasswordHistoryComponent } from './user-password-history/user-password-history.component';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { InterfaceObjectComponent } from './interface-object/interface-object.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { CompanyComponent } from './company/company.component';
import { InterfaceAdminComponent } from './interface-admin/interface-admin.component';
import { InterfaceLogicComponent } from './interface-logic/interface-logic.component';
import { MenuRightsComponent } from './menu-rights/menu-rights.component';
import { SetupComponent } from './setup/setup.component';
import { UserComponent } from './user/user.component';
import { IuserComponent } from './user/iuser/iuser.component';
import { IusercorightsComponent } from './user/iusercorights/iusercorights.component';
import { IuserpwdComponent } from './user/iuserpwd/iuserpwd.component';
import { IuserotherrightsSalesmanComponent } from './user/iuserotherrights-salesman/iuserotherrights-salesman.component';
import { IuserotherrightsGrp1Component } from './user/iuserotherrights-grp1/iuserotherrights-grp1.component';
import { IuserotherrightsGrp2Component } from './user/iuserotherrights-grp2/iuserotherrights-grp2.component';
import { IuserotherrightsGrp3Component } from './user/iuserotherrights-grp3/iuserotherrights-grp3.component';
import { IuserotherrightsGrp4Component } from './user/iuserotherrights-grp4/iuserotherrights-grp4.component';
import { IuserotherrightsGrp5Component } from './user/iuserotherrights-grp5/iuserotherrights-grp5.component';
import { IuserotherrightsGrp6Component } from './user/iuserotherrights-grp6/iuserotherrights-grp6.component';
import { IuserotherrightsGrp7Component } from './user/iuserotherrights-grp7/iuserotherrights-grp7.component';
import { IuserotherrightsGrp8Component } from './user/iuserotherrights-grp8/iuserotherrights-grp8.component';
import { DivisionComponent } from './division/division.component';
import { InterfaceManagerComponent } from './interface-manager/interface-manager.component';
import { AccountFilterEntryComponent } from './account-filter-entry/account-filter-entry.component';
import { CompanyWiseComponent } from './company-wise/company-wise.component';
import { FormCreationComponent } from './form-creation/form-creation.component';

const routes: Routes = [
  { path: 'company1', component: CompanyComponent },
  { path: 'company', component: CompanyWiseComponent },
  { path: 'division', component: DivisionComponent },
  { path: 'interface-admin', component: InterfaceAdminComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'menu-rights', component: MenuRightsComponent },
  { path: 'int-logic', component: InterfaceLogicComponent },
  { path: 'branch', component: BranchComponent },
  { path: 'menu-rights', component: MenuRightsComponent },
  { path: 'user', component: UserComponent },
  { path: 'int-object', component: InterfaceObjectComponent },
  { path: 'branch-detail', component: BranchDetailsComponent },
  { path: 'interface-manager', component: InterfaceManagerComponent },
  { path: 'user-password-history', component: UserPasswordHistoryComponent},
  { path: 'account-filter-entry', component: AccountFilterEntryComponent},
  { path: 'form-creation', component: FormCreationComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }

export const administrationRoutingComponents = [
  CompanyComponent,
  DivisionComponent,
  InterfaceAdminComponent,
  SetupComponent,
  BranchComponent,
  MenuRightsComponent,
  InterfaceLogicComponent,
  UserComponent,
  IuserComponent,
  IusercorightsComponent,
  IuserpwdComponent,
  IuserotherrightsSalesmanComponent,
  IuserotherrightsGrp1Component,
  IuserotherrightsGrp2Component,
  IuserotherrightsGrp3Component,
  IuserotherrightsGrp4Component,
  IuserotherrightsGrp5Component,
  IuserotherrightsGrp6Component,
  IuserotherrightsGrp7Component,
  IuserotherrightsGrp8Component,
  InterfaceObjectComponent,
  BranchDetailsComponent,
  InterfaceManagerComponent,
  UserPasswordHistoryComponent,
  AccountFilterEntryComponent
];
