import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FixedAssetsRoutingModule } from './fixed-assets-routing.module';
import { FixedAssetsComponent } from './fixed-assets.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { AssetsCategoryComponent } from './assets-category/assets-category.component';
import { AssetsGroupComponent } from './assets-group/assets-group.component';
import { CreateAssetsComponent } from './create-assets/create-assets.component';
import { AssetsOpeningBalanceComponent } from './assets-opening-balance/assets-opening-balance.component';
import { AssetsPurchaseComponent } from './assets-purchase/assets-purchase.component';
import { AssetsSalesComponent } from './assets-sales/assets-sales.component';
import { AssetsJournalComponent } from './assets-journal/assets-journal.component';
import { IcommonModule } from '../icommon/icommon.module';
import { FixedAssetsMasterComponent } from './fixed-assets-master/fixed-assets-master.component';
import { WindowModule } from 'src/app/_window/window.module';
import { FixedAssetsOpeningBalanceComponent } from './fixed-assets-opening-balance/fixed-assets-opening-balance.component';
import { DepreciationPostDatedJournelComponent } from './depreciation-post-dated-journel/depreciation-post-dated-journel.component';
import { FixedAssetsPurchaseComponent } from './fixed-assets-purchase/fixed-assets-purchase.component';
import { DepreciationConverstionJournalComponent } from './depreciation-converstion-journal/depreciation-converstion-journal.component';


@NgModule({
  declarations: [FixedAssetsComponent, AssetsCategoryComponent, AssetsGroupComponent, CreateAssetsComponent, AssetsOpeningBalanceComponent, AssetsPurchaseComponent, AssetsSalesComponent, AssetsJournalComponent, FixedAssetsMasterComponent, FixedAssetsOpeningBalanceComponent, DepreciationPostDatedJournelComponent, FixedAssetsPurchaseComponent, DepreciationConverstionJournalComponent],
  imports: [
    CommonModule,
    FixedAssetsRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    IcommonModule,
    WindowModule
  ],
  providers :[
    BreadcrumbService 
  ]
})
export class FixedAssetsModule { }
