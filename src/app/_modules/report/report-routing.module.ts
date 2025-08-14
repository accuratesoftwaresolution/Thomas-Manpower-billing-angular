import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintFormatComponent } from './print-format/print-format.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { BankPaymentsComponent } from './bank-payments/bank-payments.component';
import { PaymentVoucherComponent } from './payment-voucher/payment-voucher.component';
import { PettycashPaymentVoucherComponent } from './pettycash-payment-voucher/pettycash-payment-voucher.component';
import { PdcReceiptVoucherComponent } from './pdc-receipt-voucher/pdc-receipt-voucher.component';
import { JournalComponent } from './journal/journal.component';
import { BankReceiptVoucherComponent } from './bank-receipt-voucher/bank-receipt-voucher.component';
import { ReceiptVoucherComponent } from './receipt-voucher/receipt-voucher.component';
import { PettycashReceiptVoucherComponent } from './pettycash-receipt-voucher/pettycash-receipt-voucher.component';
import { TaxCreditNoteComponent } from './tax-credit-note/tax-credit-note.component';
import { TaxDebitNoteComponent } from './tax-debit-note/tax-debit-note.component';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { ExcessStockComponent } from './excess-stock/excess-stock.component';
import { OpeningStockComponent } from './opening-stock/opening-stock.component';
import { ShortageOfStockComponent } from './shortage-of-stock/shortage-of-stock.component';
import { OpportunityItemComponent } from './opportunity-item/opportunity-item.component';
import { SalesEnquiryComponent } from './sales-enquiry/sales-enquiry.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesQuotationComponent } from './sales-quotation/sales-quotation.component';
import { SalesTaxInvoiceComponent } from './sales-tax-invoice/sales-tax-invoice.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { DeliveryNoteComponent } from './delivery-note/delivery-note.component';
import { PurchaseEnquiryComponent } from './purchase-enquiry/purchase-enquiry.component';
import { PurchaseRequisitionComponent } from './purchase-requisition/purchase-requisition.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { PurchaseVoucherComponent } from './purchase-voucher/purchase-voucher.component';
import { MaterialReceiptComponent } from './material-receipt/material-receipt.component';
import { ServicePurchaseOrderComponent } from './service-purchase-order/service-purchase-order.component';
import { ServicePurchaseComponent } from './service-purchase/service-purchase.component';
import { IntercoPurchaseOrderComponent } from './interco-purchase-order/interco-purchase-order.component';
import { IntercoSalesOrderComponent } from './interco-sales-order/interco-sales-order.component';
import { IntercoStockTransferComponent } from './interco-stock-transfer/interco-stock-transfer.component';
import { IntraStockTransferComponent } from './intra-stock-transfer/intra-stock-transfer.component';
import { SalesRegisterComponent } from './sales-register/sales-register.component';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { SalesgroupByCustomerComponent } from './salesgroup-by-customer/salesgroup-by-customer.component';
import { SalesgroupByProductComponent } from './salesgroup-by-product/salesgroup-by-product.component';
import { PurchaseGroupByVendorComponent } from './purchase-group-by-vendor/purchase-group-by-vendor.component';
import { PurchaseGroupByProductComponent } from './purchase-group-by-product/purchase-group-by-product.component';
import { StockRegisterComponent } from './stock-register/stock-register.component';
import { JournalRegisterComponent } from './journal-register/journal-register.component';
import { LedgerAccountComponent } from './ledger-account/ledger-account.component';
import { CashBankBookComponent } from './cash-bank-book/cash-bank-book.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { ProfitAndLoseAccComponent } from './profit-and-lose-acc/profit-and-lose-acc.component';
import { TrailBalanceComponent } from './trail-balance/trail-balance.component';

const routes: Routes = [
  { path: 'print-format', component: PrintFormatComponent },
  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'bank-payment-voucher', component: BankPaymentsComponent },
  { path: 'payment-voucher', component: PaymentVoucherComponent },
  { path: 'petty-cash-payment-voucher', component: PettycashPaymentVoucherComponent },
  { path: 'pdc-receipt-voucher', component: PdcReceiptVoucherComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'bank-receipt-voucher', component: BankReceiptVoucherComponent },
  { path: 'receipt-voucher', component: ReceiptVoucherComponent },
  { path: 'petty-cash-receipt-voucher', component: PettycashReceiptVoucherComponent },
  { path: 'tax-credit-note', component: TaxCreditNoteComponent },
  { path: 'tax-debit-note', component: TaxDebitNoteComponent },
  { path: 'opening-balance', component: OpeningBalanceComponent },
  { path: 'excess-stock', component: ExcessStockComponent },
  { path: 'opening-stock', component: OpeningStockComponent },
  { path: 'shortage-of-stock', component: ShortageOfStockComponent },
  
  { path: 'opportunity-item', component: OpportunityItemComponent },
  { path: 'sales-enquiry', component: SalesEnquiryComponent },
  { path: 'sales-invoice', component: SalesInvoiceComponent },
  { path: 'sales-order', component: SalesOrderComponent },
  { path: 'sales-quotation', component: SalesQuotationComponent },
  { path: 'sales-tax-invoice', component: SalesTaxInvoiceComponent },
  { path: 'sales-return', component: SalesReturnComponent },
  { path: 'delivery-note', component: DeliveryNoteComponent },

  { path: 'purchase-enquiry', component: PurchaseEnquiryComponent },
  { path: 'purchase-requisition', component: PurchaseRequisitionComponent },
  { path: 'purchase-return', component: PurchaseReturnComponent },
  { path: 'purchase-voucher', component: PurchaseVoucherComponent },
  { path: 'material-receipt', component: MaterialReceiptComponent },
  { path: 'service-purchase', component: ServicePurchaseComponent },
  { path: 'service-purchase-order', component: ServicePurchaseOrderComponent },

  { path: 'interco-purchase-order', component: IntercoPurchaseOrderComponent },
  { path: 'interco-sales-order', component: IntercoSalesOrderComponent },
  { path: 'interco-stock-transfer', component: IntercoStockTransferComponent },
  { path: 'intra-stock-transfer', component: IntraStockTransferComponent },

  { path: 'sales-register', component: SalesRegisterComponent },
  { path: 'salesgroup-by-customer', component: SalesgroupByCustomerComponent },
  { path: 'salesgroup-by-product', component: SalesgroupByProductComponent },

  { path: 'purchase-register', component: PurchaseRegisterComponent },
  { path: 'purchase-by-vendor', component: PurchaseGroupByVendorComponent },
  { path: 'purchase-by-product', component: PurchaseGroupByProductComponent },

  { path: 'stock-register', component: StockRegisterComponent },
  { path: 'journal-register', component: JournalRegisterComponent },
  { path: 'ledger-account', component: LedgerAccountComponent },
  { path: 'cash-bank-book', component: CashBankBookComponent },

  { path: 'balance-sheet', component: BalanceSheetComponent },
  { path: 'profit-and-loss-acc', component: ProfitAndLoseAccComponent },
  { path: 'trail-balance', component: TrailBalanceComponent },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
