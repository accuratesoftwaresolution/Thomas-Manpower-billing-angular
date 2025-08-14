import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IadetailComponent } from './iadetail/iadetail.component';
import { AccountsComponent } from './accounts/accounts.component';
import { FormsModule } from '@angular/forms';
import { TemplatesModules } from '../_share/templates-modules.share';
import { IbillComponent } from './ibill/ibill.component';
import { ChequeComponent } from './cheque/cheque.component';
import { IheaderComponent } from './iheader/iheader.component';
import { LangaugeTranslateModule } from '@accurate/providers';
import { IipoheaderComponent } from './iipoheader/iipoheader.component';
import { IipodetailComponent } from './iipodetail/iipodetail.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { IiposupexpComponent } from './iiposupexp/iiposupexp.component';
import { IintComponent } from './iint/iint.component';
import { IintOthersComponent } from './iint-others/iint-others.component';
import { IintacconfigComponent } from './iintacconfig/iintacconfig.component';
import { IintrpttitleComponent } from './iintrpttitle/iintrpttitle.component';
import { IintvrnoComponent } from './iintvrno/iintvrno.component';
import { IgenmenuComponent } from './igenmenu/igenmenu.component';
import { IapoheaderComponent } from './iapoheader/iapoheader.component';
import { IapodetailComponent } from './iapodetail/iapodetail.component';
import { IisoheaderComponent } from './iisoheader/iisoheader.component';
import { IisodetailComponent } from './iisodetail/iisodetail.component';
import { AidetailComponent } from './aidetail/aidetail.component';
import { AiheaderComponent } from './aiheader/aiheader.component';
import { AitemunitComponent } from './aitemunit/aitemunit.component';
import { AitembrComponent } from './aitembr/aitembr.component';
import { EmpGeneralComponent } from './emp-general/emp-general.component';
import { DependentsComponent } from './dependents/dependents.component';
import { AiinvoiceHeaderComponent } from './aiinvoice-header/aiinvoice-header.component';
import { AiinvoiceDetailComponent } from './aiinvoice-detail/aiinvoice-detail.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { TbltransHeaderComponent } from './tbltrans-header/tbltrans-header.component';
import { PopupComponent } from './popup/popup.component';
import { DialogModule } from 'primeng/dialog';
import { TabsComponent } from './tab/tabs/tabs.component';
import { MainComponent } from './tab/main/main.component';
// import { DocumentAttachmentComponent } from './tab/document-attachment/document-attachment.component';
import { LcDetailsComponent } from './tab/lc-details/lc-details.component';
import { OtherExpensesComponent } from './tab/other-expenses/other-expenses.component';
import { PaymentTermsComponent } from './tab/payment-terms/payment-terms.component';
import { PoNumberComponent } from './tab/po-number/po-number.component';
import { TaxComponent } from './tab/tax/tax.component';
import { TaxAdditionalEntryComponent } from './tab/tax-additional-entry/tax-additional-entry.component';
import { MastersComponent } from './tab/masters/masters.component';
import { QuantityReservationComponent } from './tab/quantity-reservation/quantity-reservation.component';
import { OtherFieldsComponent } from './tab/other-fields/other-fields.component';
import { JournalComponent } from './tab/journal/journal.component';
import { UserKeyComponent } from './tab/user-key/user-key.component';
import { InterCompanyComponent } from './tab/inter-company/inter-company.component';
import { FormSettingsComponent } from './tab/form-settings/form-settings.component';
import { AlertsAndMessagesComponent } from './tab/alerts-and-messages/alerts-and-messages.component';
import { PrintPopupComponent } from './print-popup/print-popup.component';
import { ReportModule } from '../_modules/report/report.module';



@NgModule({
  declarations: [
    IadetailComponent,
    AccountsComponent,
    IbillComponent,
    ChequeComponent,
    IheaderComponent,
    IipoheaderComponent,
    IipodetailComponent,
    IiposupexpComponent,
    IintComponent,
    IintOthersComponent,
    IintacconfigComponent,
    IintrpttitleComponent,
    IintvrnoComponent,
    IgenmenuComponent,
    IapoheaderComponent,
    IapodetailComponent,
    IisoheaderComponent,
    IisodetailComponent,
    AidetailComponent,
    AiheaderComponent,
    AitemunitComponent,
    AitembrComponent,
    EmpGeneralComponent,
    DependentsComponent,
    AiinvoiceHeaderComponent,
    AiinvoiceDetailComponent,


    ToolBarComponent,
    TbltransHeaderComponent,
    PopupComponent,
    MainComponent,
    // DocumentAttachmentComponent,
    LcDetailsComponent,
    TabsComponent,
    OtherExpensesComponent,
    PaymentTermsComponent,
    PoNumberComponent,
    TaxComponent,
    TaxAdditionalEntryComponent,
    MastersComponent,
    QuantityReservationComponent,
    OtherFieldsComponent,
    JournalComponent,
    UserKeyComponent,
    InterCompanyComponent,
    FormSettingsComponent,
    AlertsAndMessagesComponent,
    PrintPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TemplatesModules,
    DialogModule,
    LangaugeTranslateModule,
    UiModule,
    PrimeNgTemplatesModule,
    ReportModule
  ],
  exports: [
    IadetailComponent,
    AccountsComponent,
    IheaderComponent,
    IipoheaderComponent,
    IipodetailComponent,
    IintComponent,
    IintOthersComponent,
    IintacconfigComponent,
    IintrpttitleComponent,
    IintvrnoComponent,
    IgenmenuComponent,
    IiposupexpComponent,
    IapoheaderComponent,
    IapodetailComponent,
    IisoheaderComponent,
    IisodetailComponent,
    AidetailComponent,
    AiheaderComponent,
    AitemunitComponent,
    AitembrComponent,
    EmpGeneralComponent,
    DependentsComponent,
    AiinvoiceHeaderComponent,
    AiinvoiceDetailComponent,



    ToolBarComponent,
    TbltransHeaderComponent,
    PopupComponent,
    MainComponent,
    // DocumentAttachmentComponent,
    TabsComponent,
    OtherExpensesComponent,
    PaymentTermsComponent,
    PoNumberComponent,
    TaxComponent,
    TaxAdditionalEntryComponent,
    MastersComponent,
    QuantityReservationComponent,
    OtherFieldsComponent,
    JournalComponent,
    UserKeyComponent,
    InterCompanyComponent,
    FormSettingsComponent,
    AlertsAndMessagesComponent,
    PrintPopupComponent

  ]
})
export class WindowModule { }
