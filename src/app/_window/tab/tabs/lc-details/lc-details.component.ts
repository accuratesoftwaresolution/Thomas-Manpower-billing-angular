import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lc-details',
  templateUrl: './lc-details.component.html',
  styleUrls: ['./lc-details.component.scss']
})
export class LcDetailsComponent implements OnInit {



  products = [{},{},{},{},{},{},{},{},]


  LcDetailTable = [ 
    { field: 'lcCode', header: 'LC Code', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: true },
    { field: 'lcName', header: 'LC Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false },
    { field: 'poNumber', header: 'PO Number', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: false },
    { field: 'lcNumber', header: 'LC Number', hide: false, mandatory: false, width: '6rem', data: '12345678912345', manual: false },
    { field: 'bankLCFCAmount', header: 'Bank LCFC Amount', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'shipmentDate', header: 'Shipment Date', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'lastShipmentDate', header: 'Last Date of Shipment', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'lcShipmentAmount', header: 'LC Shipment Amount', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'lcExpiryDate', header: 'LC Expiry Date', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'documentDate', header: 'Document Date', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'documentAlertByMail', header: 'Document Alert by Mail', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'alertCode', header: 'Alert Code', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false },
    { field: 'alertName', header: 'Alert Name', hide: false, mandatory: false, width: '8rem', data: '123456789123456789123456789', manual: false },
    { field: 'alertStop', header: 'Alert Stop', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
