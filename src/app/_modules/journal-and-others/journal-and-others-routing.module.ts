import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebitNoteComponent } from './debit-note/debit-note.component';
import { CreditNoteComponent } from './credit-note/credit-note.component';
import { JournalComponent } from './journal/journal.component';
import { InterCoDebitNoteRequestComponent } from './inter-co-debit-note-request/inter-co-debit-note-request.component';
import { InterCoDebitNoteComponent } from './inter-co-debit-note/inter-co-debit-note.component';
import { InterCoCreditNoteRequestComponent } from './inter-co-credit-note-request/inter-co-credit-note-request.component';
import { InterCoCreditNoteComponent } from './inter-co-credit-note/inter-co-credit-note.component';
import { InterCoJournalRequestComponent } from './inter-co-journal-request/inter-co-journal-request.component';
import { InterCoJournalComponent } from './inter-co-journal/inter-co-journal.component';

const routes: Routes = [
  { path : 'debit-note' , component : DebitNoteComponent },
  { path : 'credit-note' , component : CreditNoteComponent },
  { path : 'journal' , component : JournalComponent },
  { path : 'interco-debit-note-request' , component : InterCoDebitNoteRequestComponent },
  { path : 'interco-debit-note' , component : InterCoDebitNoteComponent },
  { path : 'interco-credit-note-request' , component : InterCoCreditNoteRequestComponent },
  { path : 'interco-credit-note' , component : InterCoCreditNoteComponent },
  { path : 'interco-journal-request' , component : InterCoJournalRequestComponent },
  { path : 'interco-journal' , component : InterCoJournalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournalAndOthersRoutingModule { }
