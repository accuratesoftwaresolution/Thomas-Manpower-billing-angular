import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  PanelMenuModule } from 'primeng/panelmenu';
import { iCommonRoutingcomponents, IcommonRoutingModule } from './icommon-routing.module';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { GroupCompanyComponent } from './group-company/group-company.component';
import { CompanyCreationComponent } from './company-creation/company-creation.component';
import { RoleCreationComponent } from './role-creation/role-creation.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { UserRightsComponent } from './user-rights/user-rights.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { SalesOfficeComponent } from './sales-office/sales-office.component';
import { SalesGroupComponent } from './sales-group/sales-group.component';
import { EmployeeComponent } from './employee/employee.component';
import { PaymentTermsComponent } from './payment-terms/payment-terms.component';
import { RemarkMasterComponent } from './remark-master/remark-master.component';
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
import { LcDetailsComponent } from './lc-details/lc-details.component';
import { DigilockComponent } from './digilock/digilock.component';
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
import { WindowModule } from 'src/app/_window/window.module';
import { SingleCompanyComponent } from './single-company/single-company.component';
import { MasterDocumentAtttachComponent } from './single-company/master-document-atttach/master-document-atttach.component';


@NgModule({
  declarations: [iCommonRoutingcomponents, GroupCompanyComponent,
    CompanyCreationComponent, RoleCreationComponent,
    UserLoginComponent, UserCreationComponent,
    UserRightsComponent,
    ProductMasterComponent,
    SalesOfficeComponent, 
    SalesGroupComponent, 
    EmployeeComponent,
    PaymentTermsComponent, 
    RemarkMasterComponent,
    AmendmentComponent, 
    AlertsMasterComponent, 
    CurrencyCodeComponent,
    TaxCountryComponent, 
    TaxTypeComponent, TaxMasterComponent, VoucherTypeNumberComponent,
    TaxRateComponent, SysidNumberComponent,
    IncoTermsComponent, CrmBusinessPartnerComponent, ActivityComponent, OpertunityComponent, 
    OpportunityItemsComponent, VesselBookingDetailsComponent, QaQcDetailsComponent
    , WhManagementComponent, LcDetailsComponent, DigilockComponent, 
    MainHeaderComponent, SalesQuotationComponent, SalesCumDeliveryNoteComponent, 
    PGoodReceiptNoteComponent, BomWoComponent, 
    DocumentAttachmentComponent, BankPaymentsComponent, PaymentsComponent, 
    PettyCashPaymentsComponent, PdcPaymentComponent, 
    ReceiptComponent, PettyCashReceiptComponent, PdcReceiptComponent, 
    JournalComponent, OpeningBalanceComponent, DebitNoteComponent, CreditNoteComponent, 
    ExcessStockComponent, ShortageOfStockComponent, OpeningStockComponent, 
    InterCompanyPurchaseOrderComponent, 
    InterCompanyStockTransferComponent, IntraCompanyStockTransferComponent, SingleCompanyComponent, MasterDocumentAtttachComponent
  ],
  imports: [
    CommonModule,
    IcommonRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    WindowModule,
   
  ],
  providers: [
    BreadcrumbService
  ],
  exports: [DigilockComponent, DocumentAttachmentComponent, LcDetailsComponent , VesselBookingDetailsComponent , QaQcDetailsComponent , WhManagementComponent]
})
export class IcommonModule { }
