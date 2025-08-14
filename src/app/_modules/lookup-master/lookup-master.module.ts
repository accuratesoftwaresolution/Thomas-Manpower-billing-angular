import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupMasterRoutingModule } from './lookup-master-routing.module';
import { LookupMasterComponent } from './lookup-master.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { IcommonModule } from '../icommon/icommon.module';
import { BilledToComponent } from './billed-to/billed-to.component';
import { ProdModuleComponent } from './prod-module/prod-module.component';
import { WindowModule } from 'src/app/_window/window.module';
import { CurrencyComponent } from './currency/currency.component';
import { CopydoctemplateComponent } from './copydoctemplate/copydoctemplate.component';
import { FactoryComponent } from './factory/factory.component';
import { ProdPlantComponent } from './prod-plant/prod-plant.component';
import { PickupPointComponent } from './pickup-point/pickup-point.component';
import { BookagentComponent } from './bookagent/bookagent.component';
import { ShiplineComponent } from './shipline/shipline.component';
import { ShoplineComponent } from './shopline/shopline.component';
import { LoadingportComponent } from './loadingport/loadingport.component';
import { TransitportComponent } from './transitport/transitport.component';
import { PortdischargeComponent } from './portdischarge/portdischarge.component';
import { ClearingAgentComponent } from './clearing-agent/clearing-agent.component';
import { SwtichblportComponent } from './swtichblport/swtichblport.component';
import { SwitchblagentComponent } from './switchblagent/switchblagent.component';
import { DocumentComponent } from './document/document.component';
import { EmpComponent } from './emp/emp.component';
import { RemarksComponent } from './remarks/remarks.component';
import { AlertComponent } from './alert/alert.component';
import { PostingComponent } from './posting/posting.component';
import { HidedisplayFieldComponent } from './hidedisplay-field/hidedisplay-field.component';
import { TabformComponent } from './tabform/tabform.component';
import { AuthorizerComponent } from './authorizer/authorizer.component';
import { EmpdeptComponent } from './empdept/empdept.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { EmpGrpComponent } from './emp-grp/emp-grp.component';
import { EmpCategoryComponent } from './emp-category/emp-category.component';
import { EmpleavepolicyComponent } from './empleavepolicy/empleavepolicy.component';
import { PostcenterComponent } from './postcenter/postcenter.component';
import { ProfitcenterComponent } from './profitcenter/profitcenter.component';
import { SalesmanComponent } from './salesman/salesman.component';
import { DivisionComponent } from './division/division.component';
import { DeptComponent } from './dept/dept.component';
import { JobComponent } from './job/job.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { OtherCenterComponent } from './other-center/other-center.component';
import { DistchannelComponent } from './distchannel/distchannel.component';
import { SalesOfficeComponent } from './sales-office/sales-office.component';
import { SalesOrgComponent } from './sales-org/sales-org.component';
import { SalesGroupComponent } from './sales-group/sales-group.component';
import { PlaceofsupplyComponent } from './placeofsupply/placeofsupply.component';
import { JurisdictionComponent } from './jurisdiction/jurisdiction.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { AccountMasterComponent } from './account-master/account-master.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { ProductGroupComponent } from './product-group/product-group.component';
import { VoucherTypeComponent } from './voucher-type/voucher-type.component';
import { AccountTypeComponent } from './account-type/account-type.component';
import { AreaComponent } from './area/area.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { SupplierCategoryComponent } from './supplier-category/supplier-category.component';
import { AccountGroupComponent } from './account-group/account-group.component';
import { AccountModuleComponent } from './account-module/account-module.component';
import { NarrationComponent } from './narration/narration.component';
import { ApplicableDateComponent } from './applicable-date/applicable-date.component';
import { SalesRateAgreementComponent } from './sales-rate-agreement/sales-rate-agreement.component';
import { PurchaseRateAgreementComponent } from './purchase-rate-agreement/purchase-rate-agreement.component';
import { PrepaidMappingComponent } from './prepaid-mapping/prepaid-mapping.component';
import { AccuralMappingComponent } from './accural-mapping/accural-mapping.component';
import { LandedCostPercComponent } from './landed-cost-perc/landed-cost-perc.component';
import { ShippedToComponent } from './shipped-to/shipped-to.component';
import { UnitMasterComponent } from './unit-master/unit-master.component';
import { MiddleScreenValidationMasterComponent } from './middle-screen-validation-master/middle-screen-validation-master.component';
import { AuthorizerMasterComponent } from './authorizer-master/authorizer-master.component';
import { EmployeeDepartmentCodeComponent } from './employee-department-code/employee-department-code.component';
import { FieldHideDisplayMasterComponent } from './field-hide-display-master/field-hide-display-master.component';
import { TabDisplayMasterComponent } from './tab-display-master/tab-display-master.component';
import { MenuMasterComponent } from './menu-master/menu-master.component';
import { MessageMasterComponent } from './message-master/message-master.component';
import { ActivateAndDeactivateComponent } from './activate-and-deactivate/activate-and-deactivate.component';
import { DocumentStartingNumberComponent } from './document-starting-number/document-starting-number.component';
import { AmendmentMasterComponent } from './amendment-master/amendment-master.component';
import { InterCompanyMessageMasterComponent } from './inter-company-message-master/inter-company-message-master.component';
import { InterCompanyMarginMasterComponent } from './inter-company-margin-master/inter-company-margin-master.component';
import { TermsAndConditionsMasterComponent } from './terms-and-conditions-master/terms-and-conditions-master.component';
import { PrintFormatComponent } from './print-format/print-format.component';
import { LcNumberMasterComponent } from './lc-number-master/lc-number-master.component';
import { LcIssuingBankCodeMasterComponent } from './lc-issuing-bank-code-master/lc-issuing-bank-code-master.component';
import { LcAdvisingBankCodeMasterComponent } from './lc-advising-bank-code-master/lc-advising-bank-code-master.component';
import { LcNegotiatingBankCodeMasterComponent } from './lc-negotiating-bank-code-master/lc-negotiating-bank-code-master.component';
import { CorporateTaxMasterComponent } from './corporate-tax-master/corporate-tax-master.component';
import { ProductgroupListComponent } from './product-group/productgroup-list/productgroup-list.component';
import { RemarklistComponent } from './remarks/remarklist/remarklist.component';
import { AccountDocumentAttachmentComponent } from './account-master/account-document-attachment/account-document-attachment.component';
import { ProductDocumentAttachmentComponent } from './product-master/product-document-attachment/product-document-attachment.component';


@NgModule({
  declarations: [LookupMasterComponent,BilledToComponent, ProdModuleComponent, CurrencyComponent, CopydoctemplateComponent, FactoryComponent, ProdPlantComponent, PickupPointComponent, BookagentComponent, ShiplineComponent, ShoplineComponent, LoadingportComponent, TransitportComponent, PortdischargeComponent, ClearingAgentComponent, SwtichblportComponent, SwitchblagentComponent, DocumentComponent, EmpComponent, RemarksComponent, AlertComponent, PostingComponent, HidedisplayFieldComponent, TabformComponent, AuthorizerComponent, EmpdeptComponent, CriteriaComponent, EmpGrpComponent, EmpCategoryComponent, EmpleavepolicyComponent, PostcenterComponent, ProfitcenterComponent, SalesmanComponent, DivisionComponent, DeptComponent, JobComponent, WarehouseComponent, OtherCenterComponent, DistchannelComponent, SalesOfficeComponent, SalesOrgComponent, SalesGroupComponent, PlaceofsupplyComponent, JurisdictionComponent, PaymentTermsComponent, CostCenterComponent,AccountMasterComponent, ProductMasterComponent, ProductGroupComponent, VoucherTypeComponent, AccountTypeComponent, AreaComponent, CityComponent, CountryComponent, SupplierCategoryComponent, AccountGroupComponent, AccountModuleComponent, NarrationComponent , ApplicableDateComponent, SalesRateAgreementComponent, PurchaseRateAgreementComponent, PrepaidMappingComponent, AccuralMappingComponent, LandedCostPercComponent, ShippedToComponent, UnitMasterComponent, MiddleScreenValidationMasterComponent, AuthorizerMasterComponent, EmployeeDepartmentCodeComponent, FieldHideDisplayMasterComponent, TabDisplayMasterComponent, MenuMasterComponent, MessageMasterComponent, ActivateAndDeactivateComponent, DocumentStartingNumberComponent, AmendmentMasterComponent, InterCompanyMessageMasterComponent, InterCompanyMarginMasterComponent, TermsAndConditionsMasterComponent, PrintFormatComponent, LcNumberMasterComponent, LcIssuingBankCodeMasterComponent, LcAdvisingBankCodeMasterComponent, LcNegotiatingBankCodeMasterComponent, CorporateTaxMasterComponent, ProductgroupListComponent, RemarklistComponent, AccountDocumentAttachmentComponent, ProductDocumentAttachmentComponent],
  imports: [
    CommonModule,
    LookupMasterRoutingModule,
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
export class LookupMasterModule { }
