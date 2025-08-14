import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular modules
import { DatePipe } from '@angular/common';
// routing module
import { dashboardRoutingComponents, DashboardRoutingModule } from './dashboard-routing.module';

import { CountryService } from './demo/service/countryservice';
import { CustomerService } from './demo/service/customerservice';
import { EventService } from './demo/service/eventservice';
import { IconService } from './demo/service/iconservice';
import { NodeService } from './demo/service/nodeservice';
import { PhotoService } from './demo/service/photoservice';
import { ProductService } from './demo/service/productservice';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppCodeModule } from './layout-components/app.code.component';
import { AppMainComponent } from './layout-components/app.main.component';
import { AppConfigComponent } from '../../_modules/dashboard/layout-components/app.config.component';
import { AppMenuComponent } from '../../_modules/dashboard/layout-components/app.menu.component';
import { AppMenuitemComponent } from '../../_modules/dashboard/layout-components/app.menuitem.component';
import { AppInlineMenuComponent } from '../../_modules/dashboard/layout-components/app.inlinemenu.component';
import { AppRightMenuComponent } from '../../_modules/dashboard/layout-components/app.rightmenu.component';
import { AppBreadcrumbComponent } from '../../_modules/dashboard/layout-components/app.breadcrumb.component';
import { AppTopBarComponent } from '../../_modules/dashboard/layout-components/app.topbar.component';
import { AppFooterComponent } from '../../_modules/dashboard/layout-components/app.footer.component';
import { ActionService, AppBreadcrumbService, ToolbarModule } from '@accurate/toolbar';

import { PrimeNgTemplatesModule } from '@accurate/ui';
import { environment } from 'src/environments/environment';

/*
    Created By  : Arun Joy
    Created On  : 13-02-2020
    Created For : For handling the components and modules of the dashboard module
*/

@NgModule({
  declarations: [
    dashboardRoutingComponents,
    AppMainComponent,
    AppConfigComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppInlineMenuComponent,
    AppRightMenuComponent,
    AppBreadcrumbComponent,
    AppTopBarComponent,
    AppFooterComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AppCodeModule,
    PrimeNgTemplatesModule,
    ToolbarModule.forRoot(environment)
  ],
  providers: [
    DatePipe,
    MessageService,
    ConfirmationService,
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
    AppMainComponent,
    AppBreadcrumbService,
    ActionService
  ],
  bootstrap: [],
})
export class DashboardModule { }
