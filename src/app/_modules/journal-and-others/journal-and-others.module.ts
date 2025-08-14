import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalAndOthersRoutingModule } from './journal-and-others-routing.module';
import { JournalAndOthersComponent } from './journal-and-others.component';
import { DebitNoteComponent } from './debit-note/debit-note.component';
import { CreditNoteComponent } from './credit-note/credit-note.component';
import { JournalComponent } from './journal/journal.component';
import { InterCoDebitNoteRequestComponent } from './inter-co-debit-note-request/inter-co-debit-note-request.component';
import { InterCoDebitNoteComponent } from './inter-co-debit-note/inter-co-debit-note.component';
import { InterCoCreditNoteRequestComponent } from './inter-co-credit-note-request/inter-co-credit-note-request.component';
import { InterCoCreditNoteComponent } from './inter-co-credit-note/inter-co-credit-note.component';
import { InterCoJournalRequestComponent } from './inter-co-journal-request/inter-co-journal-request.component';
import { InterCoJournalComponent } from './inter-co-journal/inter-co-journal.component';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { BreadcrumbService, LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule } from '@angular/forms';
import { WindowModule } from 'src/app/_window/window.module';
import { IcommonModule } from '../icommon/icommon.module';


@NgModule({
  declarations: [JournalAndOthersComponent, DebitNoteComponent, CreditNoteComponent, JournalComponent, InterCoDebitNoteRequestComponent, InterCoDebitNoteComponent, InterCoCreditNoteRequestComponent, InterCoCreditNoteComponent, InterCoJournalRequestComponent, InterCoJournalComponent],
  imports: [
    CommonModule,
    JournalAndOthersRoutingModule,
  PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
    FormsModule,
    WindowModule,
    IcommonModule
  ],
  providers: [
    BreadcrumbService
  ],
})
export class JournalAndOthersModule { }
