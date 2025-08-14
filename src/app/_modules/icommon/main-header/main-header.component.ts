import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  @Input() fieldConfigs = [];
  @Input() title = '';


  constructor() { }

  ngOnInit(): void {
    this.fieldConfigs = [
      { emptyField: true },
      { label: 'Date', bindingName: 'date', width: '25%' },
      { label: 'Voucher Number', bindingName: 'selectedVoucherNumber', width: '30%', hasButton: true, popupName: 'VoucherType' },
      { label: 'Voucher Type', bindingName: 'selectedVoucherType', width: '25%' },
      { label: 'Sales Account Code', bindingName: 'selectedAccountCode', width: '30%', hasButton: true, popupName: 'SalesAccount' },
      { label: 'Sales Account Name', bindingName: 'selectedAccountName', width: '65%' },
      { label: 'Customer Code', bindingName: 'selectedCustomerCode', width: '30%', hasButton: true, popupName: 'CustomerCode' },
      { label: 'Customer Name', bindingName: 'selectedCustomerName', width: '65%' },
      { label: 'Shipped To Code', bindingName: 'selectedShippedToCode', width: '30%', hasButton: true, popupName: 'ShippedTo' },
      { label: 'Shipped To Name', bindingName: 'selectedShippedToName', width: '65%' },
      { label: 'Billed To Code', bindingName: 'selectedBilledToCode', width: '30%', hasButton: true, popupName: 'BilledTo' },
      { label: 'Billed To Name', bindingName: 'selectedBilledToName', width: '65%' },
      { label: 'Narration Code', bindingName: 'selectedNarrationCode', width: '30%', hasButton: true, popupName: 'NarrationCode' },
      { label: 'Narration Name', bindingName: 'selectedNarrationDescription', width: '65%' },
      { label: 'Currency Code', bindingName: 'selectedCurrencyCode', width: '30%', hasButton: true, popupName: 'CurrencyCode' },
      { label: 'Currency Name', bindingName: 'selectedCurrencyName', width: '65%' },
      { label: 'Conversion Rate', bindingName: 'selectedConversionRate', width: '30%' },
      { emptyField: true },
      { label: 'Sales Agreement Code', bindingName: 'selectedSalesAgreementCode', width: '30%', hasButton: true, popupName: 'SalesAgreementCode' },
      { label: 'Sales Agreement Name', bindingName: 'selectedSalesAgreementName', width: '65%' },
      { label: 'Copy Doc From Template Code', bindingName: 'selectedCopyDocFromTemplateCode', width: '30%', hasButton: true, popupName: 'CopyDocFromTemplateCode' },
      { label: 'Copy Doc From Template Name', bindingName: 'selectedCopyDocFromTemplateName', width: '65%' },
      { label: 'Product Module Code', bindingName: 'selectedProductModuleCode', width: '30%' }, 
      { label: 'Product Module Name', bindingName: 'selectedProductModuleName', width: '65%' }, 
      { label: 'Text', bindingName: 'selectedText', width: '70%' },

    ]


  }

}
