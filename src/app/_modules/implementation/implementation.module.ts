import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { implementationRoutingComponents, ImplementationRoutingModule } from './implementation-routing.module';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { LangaugeTranslateModule } from '@accurate/providers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { HttpInterceptProviders } from '@accurate/core';


@NgModule({
  declarations: [
    implementationRoutingComponents
  ],
  imports: [
    CommonModule,
    ImplementationRoutingModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    FormsModule,
    UiModule,
    ToastModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpInterceptProviders
  ]
})
export class ImplementationModule { }
