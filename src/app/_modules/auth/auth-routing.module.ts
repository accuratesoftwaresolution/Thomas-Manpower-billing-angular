import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoogleAuthCheckingComponent } from './google-auth-checking/google-auth-checking.component';

/*
    Created By  : Arun Joy
    Created On  : 03-01-2020
    Created For : For handing the routes of the authentication module
*/

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'google', component: GoogleAuthCheckingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

export const authRoutingComponent = [
  LoginComponent,
  GoogleAuthCheckingComponent
];
