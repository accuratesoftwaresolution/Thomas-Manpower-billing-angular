import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutingComponents, AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { MenuService, ToolbarModule } from '@accurate/toolbar';
import { MessageService } from 'primeng/api'; 

import { HttpInterceptProviders } from '@accurate/core';
import { BreadcrumbService, LangaugeTranslateModule, LangaugeTranslateService, ProvidersModule } from '@accurate/providers';
import { environment } from 'src/environments/environment';
import { PrimeNgTemplatesModule } from '@accurate/ui';
// Ideal Time Out
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { AppBreadcrumbService } from '@accurate/toolbar';
import { BranchSelectionModule } from '@accurate/branch-selection';
import { CurrencyRateDirective } from './_directive/currency-rate.directive';
import { AmountDirective } from './_directive/amount.directive';
import { DateDirective } from './_directive/date.directive';
import { QtyDirective } from './_directive/qty.directive';
import { RateDirective } from './_directive/rate.directive';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ProvidersModule.forRoot(environment),
        ToolbarModule.forRoot(environment),
        PrimeNgTemplatesModule,
        LangaugeTranslateModule,
        //For Ideal Timeout
        NgIdleKeepaliveModule.forRoot(),
        MomentModule,
        BranchSelectionModule,
        TableModule,
        DropdownModule
    ],
    declarations: [
        AppComponent,
        appRoutingComponents, 
        CurrencyRateDirective,
        AmountDirective,
        DateDirective,
        QtyDirective,
        RateDirective,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MenuService, AppBreadcrumbService, MessageService,
        HttpInterceptProviders,
        LangaugeTranslateService,
        CurrencyRateDirective,
        AmountDirective,
        DateDirective,
        QtyDirective,
        RateDirective,
        BreadcrumbService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
