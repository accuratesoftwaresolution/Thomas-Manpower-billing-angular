import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductionFlowComponent } from './create-production-flow/create-production-flow.component';
import { CreateAssemblingFlowComponent } from './create-assembling-flow/create-assembling-flow.component';
import { ProductionProcessComponent } from './production-process/production-process.component';
import { AssemblyProcessComponent } from './assembly-process/assembly-process.component';

const routes: Routes = [
  { path : 'create-production-flow' , component : CreateProductionFlowComponent },
  { path : 'create-assembling-flow' , component : CreateAssemblingFlowComponent },
  { path : 'production-process' , component : ProductionProcessComponent },
  { path : 'assembly-process' , component : AssemblyProcessComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
