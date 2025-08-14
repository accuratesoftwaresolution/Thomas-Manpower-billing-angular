import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-assets',
  templateUrl: './create-assets.component.html',
  styleUrls: ['./create-assets.component.scss']
})
export class CreateAssetsComponent implements OnInit {

  AssetsCategoryTable = [
    {
      categorySysID: 'CAT001',
      fixedAssetsAccountCode: 'FAAC001',
      fixedAssetsAccountName: 'Fixed Asset - Equipment',
      accumulatedDepreciationAccountCode: 'ADAC001',
      accumulatedDepreciationAccountName: 'Accumulated Depreciation - Equipment',
      depreciationExpensesAccountCode: 'DEAC001',
      depreciationExpensesAccountName: 'Depreciation Expense - Equipment',
      assetsGainAccount: 'GA001',
      assetsLossAccount: 'LA001'
    },
    {
      categorySysID: 'CAT002',
      fixedAssetsAccountCode: 'FAAC002',
      fixedAssetsAccountName: 'Fixed Asset - Furniture',
      accumulatedDepreciationAccountCode: 'ADAC002',
      accumulatedDepreciationAccountName: 'Accumulated Depreciation - Furniture',
      depreciationExpensesAccountCode: 'DEAC002',
      depreciationExpensesAccountName: 'Depreciation Expense - Furniture',
      assetsGainAccount: 'GA002',
      assetsLossAccount: 'LA002'
    },
    {
      categorySysID: 'CAT003',
      fixedAssetsAccountCode: 'FAAC003',
      fixedAssetsAccountName: 'Fixed Asset - Vehicles',
      accumulatedDepreciationAccountCode: 'ADAC003',
      accumulatedDepreciationAccountName: 'Accumulated Depreciation - Vehicles',
      depreciationExpensesAccountCode: 'DEAC003',
      depreciationExpensesAccountName: 'Depreciation Expense - Vehicles',
      assetsGainAccount: 'GA003',
      assetsLossAccount: 'LA003'
    }
  ];


  assetFields = [
    { id: 'AssetsCode', label: 'Assets Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'AssetsName', label: 'Assets Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'AssetsGroupCode', label: 'Assets Group Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'AssetsGroupName', label: 'Assets Group Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'AssetsCategoryCode', label: 'Assets Category Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'AssetsCategoryName', label: 'Assets Category Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'AssetsModuleCode', label: 'Assets Module Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'AssetsModuleName', label: 'Assets Module Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'AssetsTypeCode', label: 'Assets Type Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'AssetsTypeName', label: 'Assets Type Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'AccountCode', label: 'Account Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'AccountName', label: 'Account Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false }
];




  ApplicableCompaniesTable = [
    {
      sysID: 'SYS001',
      companyCode: 'COM001',
      companyName: 'Company A'
    },
    {
      sysID: 'SYS002',
      companyCode: 'COM002',
      companyName: 'Company B'
    },
    {
      sysID: 'SYS003',
      companyCode: 'COM003',
      companyName: 'Company C'
    }
  ];



  CompanyCodeTable = [
    { sysID: 'SYS001', companyCode: 'COM001', companyName: 'Company A' },
    { sysID: 'SYS002', companyCode: 'COM002', companyName: 'Company B' },
    { sysID: 'SYS003', companyCode: 'COM003', companyName: 'Company C' }
  ];

  DepreciationExpensesAccountCodeTable = [
    { accountCode: 'DE001', accountName: 'Depreciation Account A' },
    { accountCode: 'DE002', accountName: 'Depreciation Account B' }
  ];

  AssetsGainAccountTable = [
    { accountCode: 'AG001', accountName: 'Assets Gain Account A' },
    { accountCode: 'AG002', accountName: 'Assets Gain Account B' }
  ];

  FixedAssetsAccountCodeTable = [
    { accountCode: 'FA001', accountName: 'Fixed Assets Account A' },
    { accountCode: 'FA002', accountName: 'Fixed Assets Account B' }
  ];

  AssetsCodeTable = [
    { assetsCode: 'AC001', assetsName: 'Asset One' },
    { assetsCode: 'AC002', assetsName: 'Asset Two' },
    { assetsCode: 'AC003', assetsName: 'Asset Three' },
    // Add more records as needed
  ];
  
  AssetsGroupCodeTable = [
    { groupCode: 'GC001', groupName: 'Group One' },
    { groupCode: 'GC002', groupName: 'Group Two' },
    { groupCode: 'GC003', groupName: 'Group Three' },
    // Add more records as needed
  ];
  
  AssetsCategoryCodeTable = [
    { categoryCode: 'CC001', categoryName: 'Category One' },
    { categoryCode: 'CC002', categoryName: 'Category Two' },
    { categoryCode: 'CC003', categoryName: 'Category Three' },
    // Add more records as needed
  ];
  
  AssetsModuleCodeTable = [
    { moduleCode: 'MC001', moduleName: 'Module One' },
    { moduleCode: 'MC002', moduleName: 'Module Two' },
    { moduleCode: 'MC003', moduleName: 'Module Three' },
    // Add more records as needed
  ];
  
  AssetsTypeCodeTable = [
    { typeCode: 'TC001', typeName: 'Type One' },
    { typeCode: 'TC002', typeName: 'Type Two' },
    { typeCode: 'TC003', typeName: 'Type Three' },
    // Add more records as needed
  ];
  
  AccountDetailsTable = [
    { accountCode: 'ACC001', accountName: 'Account One' },
    { accountCode: 'ACC002', accountName: 'Account Two' },
    { accountCode: 'ACC003', accountName: 'Account Three' },
    // Add more records as needed
  ];
  



  CompanyCodeData = {
    id: 'CompanyCode',
    name: 'Company Code Details',
    TableData: this.CompanyCodeTable, // Use your Company Code table data
    columns: [
      { header: 'SysID', field: 'sysID', width: '4rem' },
      { header: 'Company Code', field: 'companyCode', width: '6rem' },
      { header: 'Company Name', field: 'companyName', width: '8rem' }
    ]
  };

  DepreciationExpensesAccountCodeData = {
    id: 'DepreciationExpensesAccountCode',
    name: 'Depreciation Expenses Account Code Details',
    TableData: this.DepreciationExpensesAccountCodeTable, // Assign the actual array
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '6rem' },
      { header: 'Account Name', field: 'accountName', width: '10rem' }
    ]
  };

  AssetsGainAccountData = {
    id: 'AssetsGainAccount',
    name: 'Assets Gain Account Details',
    TableData: this.AssetsGainAccountTable, // Assign the actual array
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '6rem' },
      { header: 'Account Name', field: 'accountName', width: '10rem' }
    ]
  };

  FixedAssetsAccountCodeData = {
    id: 'FixedAssetsAccountCode',
    name: 'Fixed Assets Account Code Details',
    TableData: this.FixedAssetsAccountCodeTable, // Assign the actual array
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '6rem' },
      { header: 'Account Name', field: 'accountName', width: '10rem' }
    ]
  };



   AssetsCodeData = {
    id: 'AssetsCode',
    name: 'Assets Code Details',
    TableData: this.AssetsCodeTable, // Assign the actual array
    columns: [
      { header: 'Assets Code', field: 'assetsCode', width: '6rem' },
      { header: 'Assets Name', field: 'assetsName', width: '10rem' }
    ]
  };
  
   AssetsGroupCodeData = {
    id: 'AssetsGroupCode',
    name: 'Assets Group Code Details',
    TableData: this.AssetsGroupCodeTable, // Assign the actual array
    columns: [
      { header: 'Group Code', field: 'groupCode', width: '6rem' },
      { header: 'Group Name', field: 'groupName', width: '10rem' }
    ]
  };
  
   AssetsCategoryCodeData = {
    id: 'AssetsCategoryCode',
    name: 'Assets Category Code Details',
    TableData: this.AssetsCategoryCodeTable, // Assign the actual array
    columns: [
      { header: 'Category Code', field: 'categoryCode', width: '6rem' },
      { header: 'Category Name', field: 'categoryName', width: '10rem' }
    ]
  };
  
   AssetsModuleCodeData = {
    id: 'AssetsModuleCode',
    name: 'Assets Module Code Details',
    TableData: this.AssetsModuleCodeTable, // Assign the actual array
    columns: [
      { header: 'Module Code', field: 'moduleCode', width: '6rem' },
      { header: 'Module Name', field: 'moduleName', width: '10rem' }
    ]
  };
  
   AssetsTypeCodeData = {
    id: 'AssetsTypeCode',
    name: 'Assets Type Code Details',
    TableData: this.AssetsTypeCodeTable, // Assign the actual array
    columns: [
      { header: 'Type Code', field: 'typeCode', width: '6rem' },
      { header: 'Type Name', field: 'typeName', width: '10rem' }
    ]
  };
  
   AccountDetailsData = {
    id: 'AccountDetails',
    name: 'Account Details',
    TableData: this.AccountDetailsTable, // Assign the actual array
    columns: [
      { header: 'Account Code', field: 'accountCode', width: '6rem' },
      { header: 'Account Name', field: 'accountName', width: '10rem' }
    ]
  };
  























  activeState: boolean[] = [false, false, false];

  activeIndex: number = 0;

  display: boolean = false;

  // pop-up/look-up starts

  ShowLookUp: boolean = false

  // Default empty object to hold the current popup's data

  PopUpData = { id: '', name: '', TableData: [], columns: [] };

  // Ensure to define the other data tables like CustomerCodeTableData, ShippedToTableData, etc. as needed.

  // pop-up/look-up ends


  constructor(private router: Router,) { }


  ngOnInit(): void { }

  changeIndex(i) {

    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i

  }

  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }


  ShowPopUp(Type) {
    if (Type == 'CompanyCode') {
      this.PopUpData = this.CompanyCodeData;
    }
    else if (Type == 'DepreciationExpensesAccountCode') {
      this.PopUpData = this.DepreciationExpensesAccountCodeData;
    }
    else if (Type == 'AssetsGainAccount') {
      this.PopUpData = this.AssetsGainAccountData;
    }
    else if (Type == 'FixedAssetsAccountCode') {
      this.PopUpData = this.FixedAssetsAccountCodeData;
    }
    else if (Type == 'AssetsCode') {
      this.PopUpData = this.AssetsCodeData;
    }
    else if (Type == 'AssetsGroupCode') {
      this.PopUpData = this.AssetsGroupCodeData;
    }
    else if (Type == 'AssetsCategoryCode') {
      this.PopUpData = this.AssetsCategoryCodeData;
    }
    else if (Type == 'AssetsModuleCode') {
      this.PopUpData = this.AssetsModuleCodeData;
    }
    else if (Type == 'AssetsTypeCode') {
      this.PopUpData = this.AssetsTypeCodeData;
    }
    else if (Type == 'AccountDetails') {
      this.PopUpData = this.AccountDetailsData;
    }

    this.ShowLookUp = true

  }

  chooseLookup(selectedRow) {
    this.ShowLookUp = false;
  }

  // routeTo(screen) {

  //   if (screen == 'VesselBooking') {
  //     this.router.navigate(['/common/vessel-booking']);
  //   }
  //   else if (screen == 'QA/QC') {
  //     this.router.navigate(['/common/qa-qc']);
  //   }
  //   else if (screen == 'ApplicableDates') {
  //     this.router.navigate(['/common/applicable-dates']);
  //   }
  //   else if (screen == 'WHManagement') {
  //     this.router.navigate(['/common/wh-management']);
  //   }
  // }

}