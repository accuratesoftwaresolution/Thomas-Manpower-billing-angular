import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BomJobCreationComponent } from './bom-job-creation/bom-job-creation.component';
import { BomProductionBatchComponent } from './bom-production-batch/bom-production-batch.component';
import { BomProductionProcessComponent } from './bom-production-process/bom-production-process.component';
import { BomProductModuleComponent } from './bom-product-module/bom-product-module.component';
import { BomManpowerComponent } from './bom-manpower/bom-manpower.component';

const routes: Routes = [
  { path : 'bom-job-creation' , component : BomJobCreationComponent},
  { path : 'bom-production-batch' , component : BomProductionBatchComponent},
  { path : 'bom-production-process' , component : BomProductionProcessComponent},
  { path : 'bom-product-module' , component : BomProductModuleComponent},
  { path : 'bom-manpower' , component : BomManpowerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionMastersRoutingModule { }
