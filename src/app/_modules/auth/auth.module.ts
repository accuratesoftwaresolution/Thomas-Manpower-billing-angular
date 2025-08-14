import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule, authRoutingComponent } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgTemplatesModule } from '@accurate/ui';
import { ProgressBarModule } from 'primeng/progressbar';

/*
    Created By  : Arun Joy
    Created On  : 03-01-2020
    Created For : For handing the componets and modules for authentication module
*/

@NgModule({
  declarations: [
    authRoutingComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgTemplatesModule,
    ProgressBarModule 
  ]
})
export class AuthModule { }
