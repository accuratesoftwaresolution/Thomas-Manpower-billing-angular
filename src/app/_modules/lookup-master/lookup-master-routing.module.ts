import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdModuleComponent } from './prod-module/prod-module.component';
import { CurrencyComponent } from './currency/currency.component';
import { CopydoctemplateComponent } from './copydoctemplate/copydoctemplate.component';
import { FactoryComponent } from './factory/factory.component';
import { ProdPlantComponent } from './prod-plant/prod-plant.component';
import { PickupPointComponent } from './pickup-point/pickup-point.component';
import { BookagentComponent } from './bookagent/bookagent.component';
import { ShiplineComponent } from './shipline/shipline.component';
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
import { ProfitcenterComponent } from './profitcenter/profitcenter.component';
import { SalesmanComponent } from './salesman/salesman.component';
import { DivisionComponent } from './division/division.component';
import { DeptComponent } from './dept/dept.component';
import { JobComponent } from './job/job.component';
import { OtherCenterComponent } from './other-center/other-center.component';
import { SalesOrgComponent } from './sales-org/sales-org.component';
import { DistchannelComponent } from './distchannel/distchannel.component';
import { SalesOfficeComponent } from './sales-office/sales-office.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
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
import { AccountModuleComponent } from './account-module/account-module.component';
import { AccountGroupComponent } from './account-group/account-group.component';
import { NarrationComponent } from './narration/narration.component';
import { ApplicableDateComponent } from './applicable-date/applicable-date.component';
import { PurchaseRateAgreementComponent } from './purchase-rate-agreement/purchase-rate-agreement.component';
import { SalesRateAgreementComponent } from './sales-rate-agreement/sales-rate-agreement.component';
import { LandedCostPercComponent } from './landed-cost-perc/landed-cost-perc.component';
import { BilledToComponent } from './billed-to/billed-to.component';
import { ShippedToComponent } from './shipped-to/shipped-to.component';
import { PrepaidMappingComponent } from './prepaid-mapping/prepaid-mapping.component';
import { AccuralMappingComponent } from './accural-mapping/accural-mapping.component';
import { UnitMasterComponent } from './unit-master/unit-master.component';
import { MiddleScreenValidationMasterComponent } from './middle-screen-validation-master/middle-screen-validation-master.component';
import { AuthorizerMasterComponent } from './authorizer-master/authorizer-master.component';
import { EmployeeDepartmentCodeComponent } from './employee-department-code/employee-department-code.component';
import { FieldHideDisplayMasterComponent } from './field-hide-display-master/field-hide-display-master.component';
import { TabDisplayMasterComponent } from './tab-display-master/tab-display-master.component';
import { MenuMasterComponent } from './menu-master/menu-master.component';
import { MessageMasterComponent } from './message-master/message-master.component';
import { AmendmentMasterComponent } from './amendment-master/amendment-master.component';
import { InterCompanyMessageMasterComponent } from './inter-company-message-master/inter-company-message-master.component';
import { InterCompanyMarginMasterComponent } from './inter-company-margin-master/inter-company-margin-master.component';
import { TermsAndConditionsMasterComponent } from './terms-and-conditions-master/terms-and-conditions-master.component';
import { PrintFormatComponent } from './print-format/print-format.component';
import { LcNumberMasterComponent } from './lc-number-master/lc-number-master.component';
import { LcIssuingBankCodeMasterComponent } from './lc-issuing-bank-code-master/lc-issuing-bank-code-master.component';
import { LcAdvisingBankCodeMasterComponent } from './lc-advising-bank-code-master/lc-advising-bank-code-master.component';
import { LcNegotiatingBankCodeMasterComponent } from './lc-negotiating-bank-code-master/lc-negotiating-bank-code-master.component';
import { ActivateAndDeactivateComponent } from './activate-and-deactivate/activate-and-deactivate.component';
import { CorporateTaxMasterComponent } from './corporate-tax-master/corporate-tax-master.component';
import { RemarklistComponent } from './remarks/remarklist/remarklist.component';
import { AccountDocumentAttachmentComponent } from './account-master/account-document-attachment/account-document-attachment.component';
import { TaxMasterComponent } from '../icommon/tax-master/tax-master.component';

const routes: Routes = [
  { path: 'account-master', component: AccountMasterComponent },
  { path: 'account-master/:id', component: AccountMasterComponent },

  { path: 'product-master', component: ProductMasterComponent },
  { path: 'product-master/:id', component: ProductMasterComponent },

  { path: 'product-group', component: ProductGroupComponent },
  { path: 'product-group/:id', component: ProductGroupComponent },

  { path: 'prod-module', component: ProdModuleComponent },
  { path: 'prod-module/:id', component: ProdModuleComponent },


  { path: 'voucher-type', component: VoucherTypeComponent },
  { path: 'voucher-type/:id', component: VoucherTypeComponent },


  { path: 'account-type', component: AccountTypeComponent },
  { path: 'account-type/:id', component: AccountTypeComponent },

  { path: 'account-module', component: AccountModuleComponent },
  { path: 'account-module/:id', component: AccountModuleComponent },

  { path: 'cost-center', component: CostCenterComponent },
  { path: 'cost-center/:id', component: CostCenterComponent },

  { path: 'area', component: AreaComponent },
  { path: 'area/:id', component: AreaComponent },


  { path: 'city', component: CityComponent },
  { path: 'city/:id', component: CityComponent },

  { path: 'country', component: CountryComponent },
  { path: 'country/:id', component: CountryComponent },


  { path: 'supplier-category', component: SupplierCategoryComponent },
  { path: 'supplier-category/:id', component: SupplierCategoryComponent },

  { path: 'account-group', component: AccountGroupComponent },
  { path: 'account-group/:id', component: AccountGroupComponent },


  { path: 'profit-center', component: ProfitcenterComponent },
  { path: 'profit-center/:id', component: ProfitcenterComponent },

  { path: 'salesman', component: SalesmanComponent },
  { path: 'salesman/:id', component: SalesmanComponent },

  { path: 'division', component: DivisionComponent },
  { path: 'division/:id', component: DivisionComponent },

  { path: 'department', component: DeptComponent },
  { path: 'department/:id', component: DeptComponent },

  { path: 'job', component: JobComponent },
  { path: 'job/:id', component: JobComponent },


  { path: 'warehouse', component: WarehouseComponent },
  { path: 'warehouse/:id', component: WarehouseComponent },


  { path: 'other-centers', component: OtherCenterComponent },
  { path: 'other-centers/:id', component: OtherCenterComponent },

  { path: 'sales-organization', component: SalesOrgComponent },
  { path: 'sales-organization/:id', component: SalesOrgComponent },


  { path: 'distribution-channel', component: DistchannelComponent },
  { path: 'distribution-channel/:id', component: DistchannelComponent },


  { path: 'sales-office', component: SalesOfficeComponent },
  { path: 'sales-office/:id', component: SalesOfficeComponent },

  { path: 'sales-group', component: SalesGroupComponent },
  { path: 'sales-group/:id', component: SalesGroupComponent },

  { path: 'place-of-supply', component: PlaceofsupplyComponent },
  { path: 'place-of-supply/:id', component: PlaceofsupplyComponent },


  { path: 'jurisdiction', component: JurisdictionComponent },
  { path: 'jurisdiction/:id', component: JurisdictionComponent },


  { path: 'remarks', component: RemarksComponent },
  { path: 'remarks/:id', component: RemarksComponent },

  { path: 'narration', component: NarrationComponent },
  { path: 'narration/:id', component: NarrationComponent },


  { path: 'applicable-date', component: ApplicableDateComponent },
  { path: 'applicable-date/:id', component: ApplicableDateComponent },


  { path: 'purchase-rate-agree', component: PurchaseRateAgreementComponent },
  { path: 'purchase-rate-agree/:id', component: PurchaseRateAgreementComponent },

  { path: 'sales-rate-agree', component: SalesRateAgreementComponent },
  { path: 'sales-rate-agree/:id', component: SalesRateAgreementComponent },


  { path: 'landed-cost-perc', component: LandedCostPercComponent },
  { path: 'billed-to', component: BilledToComponent },
  { path: 'billed-to/:id', component: BilledToComponent },


  { path: 'shipped-to', component: ShippedToComponent },
  { path: 'shipped-to/:id', component: ShippedToComponent },

  { path: 'prepaid', component: PrepaidMappingComponent },
  { path: 'accural', component: AccuralMappingComponent },


  { path: 'currency', component: CurrencyComponent },
  { path: 'currency/:id', component: CurrencyComponent },

  { path: 'copydoctemplate', component: CopydoctemplateComponent },
  { path: 'copydoctemplate/:id', component: CopydoctemplateComponent },

  { path: 'factory', component: FactoryComponent },
  { path: 'prod-plant', component: ProdPlantComponent },
  { path: 'pickup-point', component: PickupPointComponent },
  { path: 'bookagent', component: BookagentComponent },
  { path: 'shipline', component: ShiplineComponent },
  { path: 'loadingport', component: LoadingportComponent },
  { path: 'transitport', component: TransitportComponent },
  { path: 'portdischarge', component: PortdischargeComponent },
  { path: 'clearing-agent', component: ClearingAgentComponent },
  { path: 'switchblport', component: SwtichblportComponent },
  { path: 'switchblagent', component: SwitchblagentComponent },
  { path: 'document', component: DocumentComponent },
  { path: 'document/:id', component: DocumentComponent },

  { path: 'emp', component: EmpComponent },
  { path: 'alert', component: AlertComponent },
  { path: 'alert/:id', component: AlertComponent },


  { path: 'posting', component: PostingComponent },
  { path: 'hidedisplay-field', component: HidedisplayFieldComponent },
  { path: 'hidedisplay-field/:id', component: HidedisplayFieldComponent },

  { path: 'tabform', component: TabformComponent },
  { path: 'authorizer', component: AuthorizerComponent },
  { path: 'emp-dept', component: EmpdeptComponent },
  { path: 'emp-grp', component: EmpGrpComponent },
  { path: 'emp-category', component: EmpCategoryComponent },
  { path: 'emp-leave-policy', component: EmpleavepolicyComponent },
  { path: 'criteria', component: CriteriaComponent },
  { path: 'payment-terms', component: PaymentTermsComponent },
  { path: 'payment-terms/:id', component: PaymentTermsComponent },

  { path: 'unit-master', component: UnitMasterComponent },
  { path: 'unit-master/:id', component: UnitMasterComponent },


  { path: 'middle-screen-validation-master', component: MiddleScreenValidationMasterComponent },
  { path: 'authorizer-master', component: AuthorizerMasterComponent },
  { path: 'employee-department-code', component: EmployeeDepartmentCodeComponent },
  { path: 'criteria-master', component: CriteriaComponent },
  { path: 'field-hide-display-master', component: FieldHideDisplayMasterComponent },
  { path: 'tab-display-master', component: TabDisplayMasterComponent },
  { path: 'tab-display-master/:id', component: TabDisplayMasterComponent },


  { path: 'menu-master', component: MenuMasterComponent },
  { path: 'menu-master/:id', component: MenuMasterComponent },

  { path: 'message-master', component: MessageMasterComponent },
  { path: 'message-master/:id', component: MessageMasterComponent },


  { path: 'amendment-master', component: AmendmentMasterComponent },
  { path: 'amendment-master/:id', component: AmendmentMasterComponent },

  { path: 'active-deactive', component: ActivateAndDeactivateComponent },
  { path: 'active-deactive/:id', component: ActivateAndDeactivateComponent },



  { path: 'inter-company-message-master', component: InterCompanyMessageMasterComponent },
  { path: 'inter-company-margin-master', component: InterCompanyMarginMasterComponent },
  { path: 'inter-company-margin-master/:id', component: InterCompanyMarginMasterComponent },

  { path: 'terms-and-conditions-master', component: TermsAndConditionsMasterComponent },
  { path: 'terms-and-conditions-master/:id', component: TermsAndConditionsMasterComponent },

  
  { path: 'print-format-master', component: PrintFormatComponent },
  { path: 'print-format-master/:id', component: PrintFormatComponent },

  { path: 'lc-number-master', component: LcNumberMasterComponent },
  { path: 'lc-number-master/:id', component: LcNumberMasterComponent },

  { path: 'lc-issuing-bank-code', component: LcIssuingBankCodeMasterComponent },
  { path: 'lc-advising-bank-code', component: LcAdvisingBankCodeMasterComponent },
  { path: 'lc-negotiating-bank-code', component: LcNegotiatingBankCodeMasterComponent },
  { path: 'corporate-tax', component: CorporateTaxMasterComponent },
  { path: 'corporate-tax/:id', component: CorporateTaxMasterComponent },


  {path:'tax-master',component:TaxMasterComponent},
  {path:'tax-master/:id',component:TaxMasterComponent},







  //LIST

  { path: 'remarks-list', component: RemarklistComponent },


  // Attachment
  { path: 'account-document-attachment', component: AccountDocumentAttachmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupMasterRoutingModule { }
