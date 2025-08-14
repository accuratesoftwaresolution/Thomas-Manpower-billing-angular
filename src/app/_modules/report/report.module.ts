import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { PrintFormatComponent } from './print-format/print-format.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { BankPaymentsComponent } from './bank-payments/bank-payments.component';
import { PaymentVoucherComponent } from './payment-voucher/payment-voucher.component';
import { PettycashPaymentVoucherComponent } from './pettycash-payment-voucher/pettycash-payment-voucher.component';
import { PdcReceiptVoucherComponent } from './pdc-receipt-voucher/pdc-receipt-voucher.component';
import { JournalComponent } from './journal/journal.component';
import { ReceiptVoucherComponent } from './receipt-voucher/receipt-voucher.component';
import { BankReceiptVoucherComponent } from './bank-receipt-voucher/bank-receipt-voucher.component';
import { PettycashReceiptVoucherComponent } from './pettycash-receipt-voucher/pettycash-receipt-voucher.component';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { TaxDebitNoteComponent } from './tax-debit-note/tax-debit-note.component';
import { TaxCreditNoteComponent } from './tax-credit-note/tax-credit-note.component';
import { ExcessStockComponent } from './excess-stock/excess-stock.component';
import { ShortageOfStockComponent } from './shortage-of-stock/shortage-of-stock.component';
import { OpeningStockComponent } from './opening-stock/opening-stock.component';
import { SalesEnquiryComponent } from './sales-enquiry/sales-enquiry.component';
import { OpportunityItemComponent } from './opportunity-item/opportunity-item.component';
import { SalesQuotationComponent } from './sales-quotation/sales-quotation.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesTaxInvoiceComponent } from './sales-tax-invoice/sales-tax-invoice.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { PurchaseRequisitionComponent } from './purchase-requisition/purchase-requisition.component';
import { PurchaseEnquiryComponent } from './purchase-enquiry/purchase-enquiry.component';
import { PurchaseVoucherComponent } from './purchase-voucher/purchase-voucher.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { MaterialReceiptComponent } from './material-receipt/material-receipt.component';
import { ServicePurchaseComponent } from './service-purchase/service-purchase.component';
import { ServicePurchaseOrderComponent } from './service-purchase-order/service-purchase-order.component';
import { IntercoPurchaseOrderComponent } from './interco-purchase-order/interco-purchase-order.component';
import { IntercoStockTransferComponent } from './interco-stock-transfer/interco-stock-transfer.component';
import { IntercoSalesOrderComponent } from './interco-sales-order/interco-sales-order.component';
import { IntraStockTransferComponent } from './intra-stock-transfer/intra-stock-transfer.component';
import { SalesRegisterComponent } from './sales-register/sales-register.component';
import { SalesgroupByCustomerComponent } from './salesgroup-by-customer/salesgroup-by-customer.component';
import { SalesgroupByProductComponent } from './salesgroup-by-product/salesgroup-by-product.component';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { PurchaseGroupByVendorComponent } from './purchase-group-by-vendor/purchase-group-by-vendor.component';
import { PurchaseGroupByProductComponent } from './purchase-group-by-product/purchase-group-by-product.component';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { JournalRegisterComponent } from './journal-register/journal-register.component';
import { LedgerAccountComponent } from './ledger-account/ledger-account.component';
import { CashBankBookComponent } from './cash-bank-book/cash-bank-book.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { TrailBalanceComponent } from './trail-balance/trail-balance.component';
import { ProfitAndLoseAccComponent } from './profit-and-lose-acc/profit-and-lose-acc.component';


@NgModule({
  declarations: [ReportComponent, PrintFormatComponent, PurchaseOrderComponent, BankPaymentsComponent, PaymentVoucherComponent, PettycashPaymentVoucherComponent, PdcReceiptVoucherComponent, JournalComponent, ReceiptVoucherComponent, BankReceiptVoucherComponent, PettycashReceiptVoucherComponent, OpeningBalanceComponent, TaxDebitNoteComponent, TaxCreditNoteComponent, ExcessStockComponent, ShortageOfStockComponent, OpeningStockComponent, SalesEnquiryComponent, OpportunityItemComponent, SalesQuotationComponent, SalesOrderComponent, SalesInvoiceComponent, SalesTaxInvoiceComponent, DeliveryNoteComponent, SalesReturnComponent, PurchaseRequisitionComponent, PurchaseEnquiryComponent, PurchaseVoucherComponent, PurchaseReturnComponent, MaterialReceiptComponent, ServicePurchaseComponent, ServicePurchaseOrderComponent, IntercoPurchaseOrderComponent, IntercoStockTransferComponent, IntercoSalesOrderComponent, IntraStockTransferComponent, SalesRegisterComponent, SalesgroupByCustomerComponent, SalesgroupByProductComponent, PurchaseRegisterComponent, PurchaseGroupByVendorComponent, PurchaseGroupByProductComponent, StockRegisterComponent, JournalRegisterComponent, LedgerAccountComponent, CashBankBookComponent, BalanceSheetComponent, TrailBalanceComponent, ProfitAndLoseAccComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
  ],
  exports: [
    CashBankBookComponent,
    SalesEnquiryComponent
  ],
  

  providers :[
    BreadcrumbService 
  ],
})
export class ReportModule { }
