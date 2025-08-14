import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenConfigurationRoutingModule } from './screen-configuration-routing.module';
import { ScreenConfigurationComponent } from './screen-configuration.component';
import { MasterScreenConfigComponent } from './master-screen-config/master-screen-config.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { ScreenValidationComponent } from './sales/screen-validation/screen-validation.component';
import { SalesListComponent } from './sales/sales-list/sales-list.component';


@NgModule({
  declarations: [
    ScreenConfigurationComponent, 
    MasterScreenConfigComponent,
    ScreenValidationComponent,
    SalesListComponent
  ],
  imports: [
    CommonModule,
    ScreenConfigurationRoutingModule,
     PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    WindowModule,
    IcommonModule

  ],
  providers: [
    BreadcrumbService
  ],
})
export class ScreenConfigurationModule { }
