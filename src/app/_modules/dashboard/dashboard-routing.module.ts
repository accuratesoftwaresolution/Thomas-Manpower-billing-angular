import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { DashboardComponent } from './demo/view/dashboard.component';
import { AppMainComponent } from './layout-components/app.main.component';
import { AppHelpComponent } from './pages/app.help.component';
import { DashboardAnalyticsComponent } from './demo/view/dashboardanalytics.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { InvalidStateDemoComponent } from './demo/view/invalidstatedemo.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { ButtonDemoComponent } from './demo/view/buttondemo.component';
import { TableDemoComponent } from './demo/view/tabledemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { TreeDemoComponent } from './demo/view/treedemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
// import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MediaDemoComponent } from './demo/view/mediademo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { DisplayComponent } from './utilities/display.component';
import { ElevationComponent } from './utilities/elevation.component';
import { FlexboxComponent } from './utilities/flexbox.component';
import { IconsComponent } from './utilities/icons.component';
import { WidgetsComponent } from './utilities/widgets.component';
import { GridComponent } from './utilities/grid.component';
import { SpacingComponent } from './utilities/spacing.component';
import { TypographyComponent } from './utilities/typography.component';
import { TextComponent } from './utilities/text.component';
import { AppCrudComponent } from './pages/app.crud.component';
import { AppCalendarComponent } from './pages/app.calendar.component';
import { AppTimelineDemoComponent } from './pages/app.timelinedemo.component';
import { AppInvoiceComponent } from './pages/app.invoice.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppContactusComponent } from './pages/app.contactus.component';
import { AppLoginComponent } from './pages/app.login.component';
import { AppLandingComponent } from './pages/app.landing.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';

/*
    Created By  : Arun Joy
    Created On  : 13-02-2020
    Created For : For handling the route paths of the dashboard module
*/

const routes: Routes = [
  {
    path: '', component: AppMainComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'administration', loadChildren: () => import('../../_modules/administration/administration.module').then(m => m.AdministrationModule) },
      { path: 'implementation', loadChildren: () => import('../../_modules/implementation/implementation.module').then(m => m.ImplementationModule) },
      { path: 'finance', loadChildren: () => import('../../_modules/finance/finance.module').then(m => m.FinanceModule) },
      { path: 'common', loadChildren: () => import('../../_modules/icommon/icommon.module').then(m => m.IcommonModule) },
      { path: 'support', loadChildren: () => import('../support/support.module').then(m => m.SupportModule) },

      { path: 'inter-company', loadChildren: () => import('../../_modules/inter-company/inter-company.module').then(m => m.InterCompanyModule) },
      { path: 'report', loadChildren: () => import('../../_modules/report/report.module').then(m => m.ReportModule) },
      { path: 'fixed-assets', loadChildren: () => import('../../_modules/fixed-assets/fixed-assets.module').then(m => m.FixedAssetsModule) },
      { path: 'prepaid-and-accural', loadChildren: () => import('../../_modules/prepaid-and-accural/prepaid-and-accural.module').then(m => m.PrepaidAndAccuralModule) },
      { path: 'murabaha-loan-tr', loadChildren: () => import('../../_modules/murabahaloan-and-tr/murabahaloan-and-tr.module').then(m => m.MurabahaloanAndTrModule) },
      { path: 'payroll', loadChildren: () => import('../../_modules/payroll/payroll.module').then(m => m.PayrollModule) },
      { path: 'l-master', loadChildren: () => import('../../_modules/lookup-master/lookup-master.module').then(m => m.LookupMasterModule) },
      { path: 'screen-config', loadChildren: () => import('../../_modules/screen-configuration/screen-configuration.module').then(m => m.ScreenConfigurationModule) },
      { path: 'sales', loadChildren: () => import('../../_modules/sales/sales.module').then(m => m.SalesModule) },
      { path: 'receipts-payments', loadChildren: () => import('../../_modules/receipt-and-payment/receipt-and-payment.module').then(m => m.ReceiptAndPaymentModule) },
      { path: 'stock', loadChildren: () => import('../../_modules/stock/stock.module').then(m => m.StockModule) },
      { path: 'purchase', loadChildren: () => import('../../_modules/purchase/purchase.module').then(m => m.PurchaseModule) },
      { path: 'service-purchase', loadChildren: () => import('../../_modules/service-purchase/service-purchase.module').then(m => m.ServicePurchaseModule) },
      { path: 'pdc-receipts-payments', loadChildren: () => import('../../_modules/pdc-receipt/pdc-receipt.module').then(m => m.PdcReceiptModule) },
      { path: 'journal-and-others', loadChildren: () => import('../../_modules/journal-and-others/journal-and-others.module').then(m => m.JournalAndOthersModule) },
      { path: 'warehouse', loadChildren: () => import('../../_modules/warehouse/warehouse.module').then(m => m.WarehouseModule) },
      { path: 'opening-inventory', loadChildren: () => import('../../_modules/opening-inventory/opening-inventory.module').then(m => m.OpeningInventoryModule) },
      { path: 'reserve-stock', loadChildren: () => import('../../_modules/reserve-stock/reserve-stock.module').then(m => m.ReserveStockModule) },
      { path: 'release-stock', loadChildren: () => import('../../_modules/release-stock/release-stock.module').then(m => m.ReleaseStockModule) },
      { path: 'prod-masters', loadChildren: () => import('../../_modules/production-masters/production-masters.module').then(m => m.ProductionMastersModule) },
      { path: 'production', loadChildren: () => import('../../_modules/production/production.module').then(m => m.ProductionModule) },

      //Manpower Billing
      { path: 'Manpower', loadChildren: () => import('../../_modules/manpower-billing/manpower-billing.module').then(m => m.ManpowerBillingModule) },


    ]
  },
  {
    path: 'demo', component: AppMainComponent,
    children: [
      { path: 'favorites/dashboardanalytics', component: DashboardAnalyticsComponent },
      { path: 'uikit/formlayout', component: FormLayoutDemoComponent },
      { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
      { path: 'uikit/invalidstate', component: InvalidStateDemoComponent },
      { path: 'uikit/input', component: InputDemoComponent },
      { path: 'uikit/button', component: ButtonDemoComponent },
      { path: 'uikit/table', component: TableDemoComponent },
      { path: 'uikit/list', component: ListDemoComponent },
      { path: 'uikit/tree', component: TreeDemoComponent },
      { path: 'uikit/panel', component: PanelsDemoComponent },
      { path: 'uikit/overlay', component: OverlaysDemoComponent },
      { path: 'uikit/menu', component: MenusDemoComponent },
      { path: 'uikit/media', component: MediaDemoComponent },
      { path: 'uikit/message', component: MessagesDemoComponent },
      { path: 'uikit/misc', component: MiscDemoComponent },
      { path: 'utilities/display', component: DisplayComponent },
      { path: 'utilities/elevation', component: ElevationComponent },
      { path: 'utilities/flexbox', component: FlexboxComponent },
      { path: 'utilities/grid', component: GridComponent },
      { path: 'utilities/icons', component: IconsComponent },
      { path: 'utilities/widgets', component: WidgetsComponent },
      { path: 'utilities/spacing', component: SpacingComponent },
      { path: 'utilities/typography', component: TypographyComponent },
      { path: 'utilities/text', component: TextComponent },
      { path: 'pages/crud', component: AppCrudComponent },
      { path: 'pages/calendar', component: AppCalendarComponent },
      { path: 'pages/timeline', component: AppTimelineDemoComponent },
      { path: 'pages/invoice', component: AppInvoiceComponent },
      { path: 'pages/help', component: AppHelpComponent },
      { path: 'empty', component: EmptyDemoComponent },
      { path: 'charts', component: ChartsDemoComponent },
      { path: 'file', component: FileDemoComponent },
      { path: 'pages/empty', component: EmptyDemoComponent },
      { path: 'documentation', component: DocumentationComponent }
    ]
  },
  { path: 'error', component: AppErrorComponent },
  { path: 'access', component: AppAccessdeniedComponent },
  { path: 'notfound', component: AppNotfoundComponent },
  { path: 'contactus', component: AppContactusComponent },
  { path: 'login', component: AppLoginComponent },
  { path: 'landing', component: AppLandingComponent },
  // { path: '**', redirectTo: 'notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

export const dashboardRoutingComponents = [
  DashboardComponent,
  EmptyDemoComponent,
  ChartsDemoComponent,
  FileDemoComponent,
  DocumentationComponent,
  AppHelpComponent,
  DashboardAnalyticsComponent,
  FormLayoutDemoComponent,
  FloatLabelDemoComponent,
  InvalidStateDemoComponent,
  InputDemoComponent,
  ButtonDemoComponent,
  TableDemoComponent,
  ListDemoComponent,
  TreeDemoComponent,
  PanelsDemoComponent,
  OverlaysDemoComponent,
  MenusDemoComponent,
  MediaDemoComponent,
  MessagesDemoComponent,
  MiscDemoComponent,
  DisplayComponent,
  ElevationComponent,
  FlexboxComponent,
  IconsComponent,
  WidgetsComponent,
  GridComponent,
  SpacingComponent,
  TypographyComponent,
  TextComponent,
  AppCrudComponent,
  AppCalendarComponent,
  AppTimelineDemoComponent,
  AppInvoiceComponent,
  AppErrorComponent,
  AppAccessdeniedComponent,
  AppNotfoundComponent,
  AppContactusComponent,
  AppLoginComponent,
  AppLandingComponent,
  ChangePasswordComponent
];