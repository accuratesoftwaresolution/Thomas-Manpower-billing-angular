import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { financeRoutingComponets, FinanceRoutingModule } from './finance-routing.module';
import { BranchSelectionModule } from '@accurate/branch-selection';
import { FormsModule } from '@angular/forms';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { ToolbarModule } from '@accurate/toolbar';
import { TreeModule } from 'primeng/tree';
import { PanelModule } from 'primeng/panel';
import { WindowModule } from 'src/app/_window/window.module';


@NgModule({
  declarations: [financeRoutingComponets],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    BranchSelectionModule,
    FormsModule,
    UiModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    ToolbarModule,
    TreeModule,
    PanelModule,
    WindowModule
  ],
  providers: [
    BreadcrumbService
  ]
})
export class FinanceModule { }
