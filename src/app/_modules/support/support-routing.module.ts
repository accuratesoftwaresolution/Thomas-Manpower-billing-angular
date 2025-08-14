import { ChatComponent } from './chat/chat.component';
import { FeedbackIssuesComponent } from './feedback-issues/feedback-issues.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'feedback', component: FeedbackIssuesComponent},
  { path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }

export const supportRoutingComponents = [
  FeedbackIssuesComponent,
  ChatComponent
]
