import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production.component';
import { CreateProductionFlowComponent } from './create-production-flow/create-production-flow.component';
import { CreateAssemblingFlowComponent } from './create-assembling-flow/create-assembling-flow.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';
import { ProductionProcessComponent } from './production-process/production-process.component';
import { AssemblyProcessComponent } from './assembly-process/assembly-process.component';


@NgModule({
  declarations: [ProductionComponent, CreateProductionFlowComponent, CreateAssemblingFlowComponent, ProductionProcessComponent, AssemblyProcessComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
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
export class ProductionModule { }
