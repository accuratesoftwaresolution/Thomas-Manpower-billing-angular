import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsCategoryComponent } from './assets-category/assets-category.component';
import { AssetsGroupComponent } from './assets-group/assets-group.component';
import { AssetsJournalComponent } from './assets-journal/assets-journal.component';
import { AssetsOpeningBalanceComponent } from './assets-opening-balance/assets-opening-balance.component';
import { AssetsPurchaseComponent } from './assets-purchase/assets-purchase.component';
import { AssetsSalesComponent } from './assets-sales/assets-sales.component';
import { CreateAssetsComponent } from './create-assets/create-assets.component';
import { FixedAssetsMasterComponent } from './fixed-assets-master/fixed-assets-master.component';
import { FixedAssetsOpeningBalanceComponent } from './fixed-assets-opening-balance/fixed-assets-opening-balance.component';
import { DepreciationPostDatedJournelComponent } from './depreciation-post-dated-journel/depreciation-post-dated-journel.component';
import { FixedAssetsPurchaseComponent } from './fixed-assets-purchase/fixed-assets-purchase.component';
import { DepreciationConverstionJournalComponent } from './depreciation-converstion-journal/depreciation-converstion-journal.component';

const routes: Routes = [
  { path: 'assets-category', component: AssetsCategoryComponent },
  { path: 'assets-group', component: AssetsGroupComponent },
  { path: 'assets-journal', component: AssetsJournalComponent },
  { path: 'assets-opening-balance', component: AssetsOpeningBalanceComponent },
  { path: 'assets-purchase', component: AssetsPurchaseComponent },
  { path: 'assets-sales', component: AssetsSalesComponent },
  { path: 'create-assets', component: CreateAssetsComponent },
  { path: 'fixed-assets-master', component: FixedAssetsMasterComponent },
  { path: 'fixed-assets-opening-balance', component: FixedAssetsOpeningBalanceComponent },
  { path: 'depreciation-post-dated-journal', component: DepreciationPostDatedJournelComponent },
  {path:'fixed-assets-purchase',component :FixedAssetsPurchaseComponent},
  {path :'depreciation-converstion-journal',component :DepreciationConverstionJournalComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedAssetsRoutingModule { }
