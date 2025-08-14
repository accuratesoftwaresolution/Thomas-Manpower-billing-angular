import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { administrationRoutingComponents, AdministrationRoutingModule } from './administration-routing.module';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { WindowModule } from 'src/app/_window/window.module';
import { CompanyWiseComponent } from './company-wise/company-wise.component';
import { FormCreationComponent } from './form-creation/form-creation.component';


@NgModule({
  declarations: [
    administrationRoutingComponents,
    CompanyWiseComponent,
    FormCreationComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    WindowModule,
    FormsModule,
  ],
  providers: [
    BreadcrumbService
  ]
})
export class AdministrationModule { }
