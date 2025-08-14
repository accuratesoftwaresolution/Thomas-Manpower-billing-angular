import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-attachment',
  templateUrl: './document-attachment.component.html',
  styleUrls: ['./document-attachment.component.scss']
})
export class DocumentAttachmentComponent implements OnInit {

columnMapping = {
  documnetCode:{
    header: 'Document Code',
    field : 'documnetCode',
    
  },
  documentName:{
    header: 'Document Name',
    field : 'documnetName',
    
  },
}

  documentTableData = [
    {
      
        documentCode: 'TR',
        documentName: 'Trade License',
        path: 'C:123',
        expiryDate: '2023-09-30',
        nextRenewalDate: '2024-09-30',
        alertDate: '2024-10-20',
        documentAlertByMail: 'Th@gmail.com',
        alertCode: '1001',
        alertName: 'Vessel Plan Change',
        alertStop: 'Closed',
    },
    {},
    {},
    {},
    
    // Add more entries as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }


  onFileChange(event: any, rowData: any) {
    const file = event.target.files[0];
    if (file) {
        rowData.documentName = file.name; 
        rowData.path = URL.createObjectURL(file); 
    }
}

}
