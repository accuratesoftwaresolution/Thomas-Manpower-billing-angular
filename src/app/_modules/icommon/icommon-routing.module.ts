import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonDescriptionComponent } from './common-description/common-description.component';
import { CompanytypeComponent } from './companytype/companytype.component';
import { CreditcardComponent } from './creditcard/creditcard.component';
import { CurrencyComponent } from './currency/currency.component';
import { DeptCollectorComponent } from './dept-collector/dept-collector.component';
import { TerritoryComponent } from './territory/territory.component';
import { VatCatComponent } from './vat-cat/vat-cat.component';
import { VatInOutComponent } from './vat-in-out/vat-in-out.component';
import { GroupCompanyComponent } from './group-company/group-company.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserRightsComponent } from './user-rights/user-rights.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { SalesOfficeComponent } from './sales-office/sales-office.component';
import { SalesGroupComponent } from './sales-group/sales-group.component';
import { EmployeeComponent } from './employee/employee.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { RemarkMasterComponent } from './remark-master/remark-master.component';
import { CompanyCreationComponent } from './company-creation/company-creation.component';
import { AmendmentComponent } from './amendment/amendment.component';
import { AlertsMasterComponent } from './alerts-master/alerts-master.component';
import { CurrencyCodeComponent } from './currency-code/currency-code.component';
import { TaxCountryComponent } from './tax-country/tax-country.component';
import { TaxTypeComponent } from './tax-type/tax-type.component';
import { TaxMasterComponent } from './tax-master/tax-master.component';
import { VoucherTypeNumberComponent } from './voucher-type-number/voucher-type-number.component';
import { TaxRateComponent } from './tax-rate/tax-rate.component';
import { SysidNumberComponent } from './sysid-number/sysid-number.component';
import { IncoTermsComponent } from './inco-terms/inco-terms.component';
import { CrmBusinessPartnerComponent } from './crm-business-partner/crm-business-partner.component';
import { ActivityComponent } from './activity/activity.component';
import { OpertunityComponent } from './opertunity/opertunity.component';
import { OpportunityItemsComponent } from './opportunity-items/opportunity-items.component';
import { VesselBookingDetailsComponent } from './vessel-booking-details/vessel-booking-details.component';
import { QaQcDetailsComponent } from './qa-qc-details/qa-qc-details.component';
import { WhManagementComponent } from './wh-management/wh-management.component';
import { DigilockComponent } from './digilock/digilock.component';
import { LcDetailsComponent } from './lc-details/lc-details.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SalesQuotationComponent } from './sales-quotation/sales-quotation.component';
import { SalesCumDeliveryNoteComponent } from './sales-cum-delivery-note/sales-cum-delivery-note.component';
import { PGoodReceiptNoteComponent } from './p-good-receipt-note/p-good-receipt-note.component';
import { BomWoComponent } from './bom-wo/bom-wo.component';
import { DocumentAttachmentComponent } from './document-attachment/document-attachment.component';
import { BankPaymentsComponent } from './bank-payments/bank-payments.component';
import { PaymentsComponent } from './payments/payments.component';
import { PettyCashPaymentsComponent } from './petty-cash-payments/petty-cash-payments.component';
import { PdcPaymentComponent } from './pdc-payment/pdc-payment.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { PettyCashReceiptComponent } from './petty-cash-receipt/petty-cash-receipt.component';
import { PdcReceiptComponent } from './pdc-receipt/pdc-receipt.component';
import { JournalComponent } from './journal/journal.component';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { DebitNoteComponent } from './debit-note/debit-note.component';
import { CreditNoteComponent } from './credit-note/credit-note.component';
import { ExcessStockComponent } from './excess-stock/excess-stock.component';
import { ShortageOfStockComponent } from './shortage-of-stock/shortage-of-stock.component';
import { OpeningStockComponent } from './opening-stock/opening-stock.component';
import { InterCompanyPurchaseOrderComponent } from './inter-company-purchase-order/inter-company-purchase-order.component';
import { InterCompanyStockTransferComponent } from './inter-company-stock-transfer/inter-company-stock-transfer.component';
import { IntraCompanyStockTransferComponent } from './intra-company-stock-transfer/intra-company-stock-transfer.component';
import { SingleCompanyComponent } from './single-company/single-company.component';
import { MasterDocumentAtttachComponent } from './single-company/master-document-atttach/master-document-atttach.component';

const routes: Routes = [
  { path: 'currency', component: CurrencyComponent },
  { path: 'common_desc', component: CommonDescriptionComponent },
  { path: 'vat-category', component: VatCatComponent },
  { path: 'vat-inout', component: VatInOutComponent },
  { path: 'debt-collector', component: DeptCollectorComponent },

  { path: 'territory', component: TerritoryComponent },
  { path: 'company-type', component: CompanytypeComponent},
  { path: 'group-company', component: GroupCompanyComponent },
  { path: 'group-company/:id', component: GroupCompanyComponent },

  { path: 'user-login', component: UserLoginComponent },
  { path: 'user-creation', component: UserCreationComponent },
  { path: 'user-creation/:id', component: UserCreationComponent },
  { path: 'role-creation', component: UserRightsComponent },
  { path: 'product-master', component: ProductMasterComponent },
  { path: 'sales-office', component: SalesOfficeComponent },
  { path: 'sales-group', component: SalesGroupComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'payment-terms', component: PaymentTermsComponent },
  { path: 'remark-master', component: RemarkMasterComponent },
  { path: 'company-creation', component: CompanyCreationComponent },
  { path: 'amendment', component: AmendmentComponent },
  { path: 'alerts-master', component: AlertsMasterComponent },
  { path: 'currency-code', component: CurrencyCodeComponent },
  { path: 'tax-country', component: TaxCountryComponent },
  { path: 'tax-type', component: TaxTypeComponent },
  { path: 'tax-master', component: TaxMasterComponent },
  { path: 'tax-master/:id', component: TaxMasterComponent },


  { path: 'tax-rate', component: TaxRateComponent },
  { path: 'sysid-number', component: SysidNumberComponent },
  { path: 'inco-terms', component: IncoTermsComponent },
  { path: 'voucher-type-number', component: VoucherTypeNumberComponent },
  { path: 'crm-menu', component: CrmBusinessPartnerComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'opportunity', component: OpertunityComponent },
  { path: 'opportunity-items', component: OpportunityItemsComponent },
  { path: 'vessel-booking', component: VesselBookingDetailsComponent },
  { path: 'qa-qc', component: QaQcDetailsComponent },
  { path: 'wh-management', component: WhManagementComponent },
  { path: 'lc-details', component: LcDetailsComponent },
  { path: 'digilock', component: DigilockComponent },
  { path: 'main-header', component: MainHeaderComponent },
  { path: 'sales-quotation', component: SalesQuotationComponent },
  { path: 'sales-cum-delivery-note', component: SalesCumDeliveryNoteComponent },
  { path: 'purchase-goods-receipt-note', component: PGoodReceiptNoteComponent },
  { path: 'bom-wo', component: BomWoComponent },
  { path: 'bank-payments', component: BankPaymentsComponent },
  { path: 'payments', component: PaymentsComponent },
  { path: 'petty-cash-payments', component: PettyCashPaymentsComponent },
  { path: 'pdc-payments', component: PdcPaymentComponent },
  { path: 'receipt', component: ReceiptComponent },
  { path: 'petty-cash-receipt', component: PettyCashReceiptComponent },
  { path: 'pdc-receipt', component: PdcReceiptComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'opening-balance', component: OpeningBalanceComponent },
  { path: 'debit-note', component: DebitNoteComponent },
  { path: 'credit-note', component: CreditNoteComponent },
  { path: 'excess-stock', component: ExcessStockComponent },
  { path: 'shortage-of-stock', component: ShortageOfStockComponent },
  { path: 'opening-stock', component: OpeningStockComponent },

  { path: 'single-company', component: SingleCompanyComponent },
  { path: 'single-company/:id', component: SingleCompanyComponent },



  { path: 'inter-company-purchase-order', component: InterCompanyPurchaseOrderComponent },
  { path: 'inter-company-stock-transfer', component: InterCompanyStockTransferComponent },
  { path: 'intra-company-stock-transfer', component: IntraCompanyStockTransferComponent },


  { path: 'document-attachment', component: DocumentAttachmentComponent },
  { path: 'master-document-attachment', component: MasterDocumentAtttachComponent },



  // { path: 'credit-card', component: CreditcardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IcommonRoutingModule { }

export const iCommonRoutingcomponents = [
  CurrencyComponent,
  CommonDescriptionComponent,
  VatCatComponent,
  VatInOutComponent,
  DeptCollectorComponent,
  TerritoryComponent,
  CompanytypeComponent,
  CreditcardComponent
]