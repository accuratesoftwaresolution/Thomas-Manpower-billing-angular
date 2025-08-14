import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-note',
  templateUrl: './delivery-note.component.html',
  styleUrls: ['./delivery-note.component.scss']
})
export class DeliveryNoteComponent implements OnInit {

  salesDataTable = [
    {
        slNo: 1,
        productCode: 'P001',
        productDescription: 'Product A',
        batchNo : 12,
        qty: 10,
       
    },
    {
        slNo: 2,
        productCode: 'P002',
        productDescription: 'Product B',
        batchNo : 12,
        qty: 5,
       
    },
    {
        slNo: 3,
        productCode: 'P003',
        productDescription: 'Product C',
        batchNo : 12,
        qty: 8,
        
    }
];

  
  
selectedLinkRecords: any;

companyName: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress1: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress2: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress3: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
companyAddress4: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
phone: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
fax: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
TrnNumber: any= 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';


  constructor(   private location: Location) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}