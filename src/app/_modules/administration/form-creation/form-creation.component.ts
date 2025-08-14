import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.scss']
})
export class FormCreationComponent implements OnInit {

  constructor() { }

  MasterFormTable = [
    { field: '12345678912345', header: 'Document Form Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Document Form Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Menu Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Menu Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Form Group Code', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Form Group Name', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'View Document Form', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Edit Document Form', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    { field: '12345678912345', header: 'Delete Document Form', hide: false, mandatory: false, width: '5rem', data: '12345678912345', manual: false },
    ];

    documentForms = [
      {
        formCode: '1001',
        formName: 'Import Purchase',
        menuCode: '1001',
        menuName: 'Import Purchase',
        formGroupCode: '1001',
        formGroupName: 'Purchase',
        newFormCode: '1002',
        newFormName: 'Import GRN',
        newMenuCode: '1001',
        newMenuName: 'Import GRN',
        newFormGroupCode: '1001',
        newFormGroupName: 'Purchase'
      }
      // Add more rows as needed
    ];

  ngOnInit(): void {
  }

}
