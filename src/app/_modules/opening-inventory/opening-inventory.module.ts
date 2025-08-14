import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningInventoryRoutingModule } from './opening-inventory-routing.module';
import { OpeningInventoryComponent } from './opening-inventory.component';
import { InventoryOpeningEntryComponent } from './inventory-opening-entry/inventory-opening-entry.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';


@NgModule({
  declarations: [OpeningInventoryComponent, InventoryOpeningEntryComponent],
  imports: [
    CommonModule,
    OpeningInventoryRoutingModule,
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
export class OpeningInventoryModule { }
