import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-loan-account',
  templateUrl: './create-loan-account.component.html',
  styleUrls: ['./create-loan-account.component.scss']
})
export class CreateLoanAccountComponent implements OnInit {

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


  loanFields = [
    { id: 'LoanCode', label: 'Loan Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'LoanName', label: 'Loan Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'LoanGroupCode', label: 'Loan Group Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'LoanGroupName', label: 'Loan Group Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'LoanCategoryCode', label: 'Loan Category Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'LoanCategoryName', label: 'Loan Category Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'LoanModuleCode', label: 'Loan Module Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'LoanModuleName', label: 'Loan Module Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
    { id: 'LoanTypeCode', label: 'Loan Type Code', value: '', labelWidth: '30%', inputWidth: '30%', showButton: true },
    { id: 'LoanTypeName', label: 'Loan Type Name', value: '', labelWidth: '30%', inputWidth: '60%', showButton: false },
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

  LoanCodeTable = [
    { loanCode: 'LC001', loanName: 'Loan One' },
    { loanCode: 'LC002', loanName: 'Loan Two' },
    { loanCode: 'LC003', loanName: 'Loan Three' },
    // Add more records as needed
];

LoanGroupCodeTable = [
    { groupCode: 'GC001', groupName: 'Group One' },
    { groupCode: 'GC002', groupName: 'Group Two' },
    { groupCode: 'GC003', groupName: 'Group Three' },
    // Add more records as needed
];

LoanCategoryCodeTable = [
    { categoryCode: 'CC001', categoryName: 'Category One' },
    { categoryCode: 'CC002', categoryName: 'Category Two' },
    { categoryCode: 'CC003', categoryName: 'Category Three' },
    // Add more records as needed
];

LoanModuleCodeTable = [
    { moduleCode: 'MC001', moduleName: 'Module One' },
    { moduleCode: 'MC002', moduleName: 'Module Two' },
    { moduleCode: 'MC003', moduleName: 'Module Three' },
    // Add more records as needed
];

LoanTypeCodeTable = [
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



  LoanCodeData = {
    id: 'LoanCode',
    name: 'Loan Code Details',
    TableData: this.LoanCodeTable, // Assign the actual array
    columns: [
        { header: 'Loan Code', field: 'loanCode', width: '6rem' },
        { header: 'Loan Name', field: 'loanName', width: '10rem' }
    ]
};

LoanGroupCodeData = {
    id: 'LoanGroupCode',
    name: 'Loan Group Code Details',
    TableData: this.LoanGroupCodeTable, // Assign the actual array
    columns: [
        { header: 'Group Code', field: 'groupCode', width: '6rem' },
        { header: 'Group Name', field: 'groupName', width: '10rem' }
    ]
};

LoanCategoryCodeData = {
    id: 'LoanCategoryCode',
    name: 'Loan Category Code Details',
    TableData: this.LoanCategoryCodeTable, // Assign the actual array
    columns: [
        { header: 'Category Code', field: 'categoryCode', width: '6rem' },
        { header: 'Category Name', field: 'categoryName', width: '10rem' }
    ]
};

LoanModuleCodeData = {
    id: 'LoanModuleCode',
    name: 'Loan Module Code Details',
    TableData: this.LoanModuleCodeTable, // Assign the actual array
    columns: [
        { header: 'Module Code', field: 'moduleCode', width: '6rem' },
        { header: 'Module Name', field: 'moduleName', width: '10rem' }
    ]
};

LoanTypeCodeData = {
    id: 'LoanTypeCode',
    name: 'Loan Type Code Details',
    TableData: this.LoanTypeCodeTable, // Assign the actual array
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
    else if (Type == 'LoanCode') {
      this.PopUpData = this.LoanCodeData;
  }
  else if (Type == 'LoanGroupCode') {
      this.PopUpData = this.LoanGroupCodeData;
  }
  else if (Type == 'LoanCategoryCode') {
      this.PopUpData = this.LoanCategoryCodeData;
  }
  else if (Type == 'LoanModuleCode') {
      this.PopUpData = this.LoanModuleCodeData;
  }
  else if (Type == 'LoanTypeCode') {
      this.PopUpData = this.LoanTypeCodeData;
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