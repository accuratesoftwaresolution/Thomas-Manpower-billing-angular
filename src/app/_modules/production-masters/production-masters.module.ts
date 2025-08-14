import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionMastersRoutingModule } from './production-masters-routing.module';
import { ProductionMastersComponent } from './production-masters.component';
import { BomJobCreationComponent } from './bom-job-creation/bom-job-creation.component';
import { BomProductionBatchComponent } from './bom-production-batch/bom-production-batch.component';
import { BomProductionProcessComponent } from './bom-production-process/bom-production-process.component';
import { BomProductModuleComponent } from './bom-product-module/bom-product-module.component';
import { BomManpowerComponent } from './bom-manpower/bom-manpower.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { IcommonModule } from '../icommon/icommon.module';
import { WindowModule } from 'src/app/_window/window.module';


@NgModule({
  declarations: [ProductionMastersComponent, BomJobCreationComponent, BomProductionBatchComponent, BomProductionProcessComponent, BomProductModuleComponent, BomManpowerComponent],
  imports: [
    CommonModule,
    ProductionMastersRoutingModule,
 PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    IcommonModule,
    WindowModule

  ],
  providers: [
    BreadcrumbService
  ]
})
export class ProductionMastersModule { }
