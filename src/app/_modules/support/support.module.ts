import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { supportRoutingComponents, SupportRoutingModule } from './support-routing.module';
import { FormsModule } from '@angular/forms';
import { PrimeNgTemplatesModule, UiModule } from '@accurate/ui';
import { LangaugeTranslateModule, ProvidersModule } from '@accurate/providers';
import { environment } from 'src/environments/environment';
import { HttpInterceptProviders } from '@accurate/core';

@NgModule({
  declarations: [supportRoutingComponents],
  imports: [
    ProvidersModule.forRoot(environment),
    CommonModule,
    SupportRoutingModule,
    ToastModule,
    FileUploadModule,
    FormsModule,
    TableModule,
    PrimeNgTemplatesModule,
    LangaugeTranslateModule,
    UiModule,
  ],
  providers: [
    HttpInterceptProviders
  ]
})
export class SupportModule { }
