import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  
  activeState: boolean[] = [false, false, false];

  activeIndex: number   = 0;

  display:boolean = false;

  showCompany:boolean = false;

  showAmendment:boolean = false;

  status:string

  selectedCities: string[] = [];
  
  rights = [
    { hasRight: true, detail: 'Access', hasAction: true },
    { hasRight: true, detail: 'Edit', hasAction: true },
    { hasRight: true, detail: 'Delete', hasAction: true },
    { hasRight: true, detail: 'Print', hasAction: true },
    { hasRight: true, detail: 'Re Print Documents', hasAction: true },
    { hasRight: true, detail: 'Edit Documents Enter by Other Users', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are checked', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are Reconciled', hasAction: true },
    { hasRight: true, detail: 'Edit Documents are Authorized by Higher groups', hasAction: true },
    { hasRight: true, detail: 'Enter Documents Exceed the limit', hasAction: true },
    { hasRight: true, detail: 'Enter Documents Make Cash and Bank Negative', hasAction: true },
    { hasRight: true, detail: 'Edit documents that are re Printed', hasAction: true },
    { hasRight: true, detail: 'Accesses though API', hasAction: true },
    { hasRight: true, detail: 'Always suspend upon saving', hasAction: true },
    { hasRight: true, detail: 'Change Print Layouts', hasAction: true },
    { hasRight: true, detail: 'Print Un authorized documents', hasAction: true },
    { hasRight: true, detail: 'Access to link Report', hasAction: true },
    { hasRight: true, detail: 'Make Cheque Void', hasAction: true },
    { hasRight: true, detail: 'Close Link', hasAction: true },
    { hasRight: true, detail: 'Access documents entered by other user', hasAction: true }
];

  scrollableTabs: any[] = [
    { title: "General", content: "" },
    { title: "Other Details", content: "" },
    { title: "Content", content: "" },
    { title: "Linked Document", content: "" },
    { title: "DigiLock", content: "Content for Other Expenses" },
    // { title: "Tax", content: "Content for Tax" },

  ];

  documentTableData = [
    {},
    {},
    {},
    {},
    
    // Add more entries as needed
  ];

  contactFields = [
    { label: 'Contact ID', key: 'contactId', type: 'text' },
    { label: 'First Name', key: 'firstName', type: 'text' },
    { label: 'Middle Name', key: 'middleName', type: 'text' },
    { label: 'Surname', key: 'surname', type: 'text' },
    { label: 'Title', key: 'title', type: 'text' },
    { label: 'Position', key: 'position', type: 'text' },
    { label: 'Address', key: 'address', type: 'text' },
    { label: 'Telephone 1', key: 'telephone1', type: 'text' },
    { label: 'Telephone 2', key: 'telephone2', type: 'text' },
    { label: 'Mobile Phone', key: 'mobilePhone', type: 'text' },
    { label: 'Fax', key: 'fax', type: 'text' },
    { label: 'E-Mail', key: 'email', type: 'email' },
    { label: 'E-Mail Group', key: 'emailGroup', type: 'text' },
    { label: 'Remarks 1', key: 'remarks1', type: 'text' },
    { label: 'Remarks 2', key: 'remarks2', type: 'text' },
    { label: 'Password', key: 'password', type: 'password' },
    { label: 'Country of Birth', key: 'countryOfBirth', type: 'text' }
  ];

  contactPersonData = [
    {name:'Amanda Costner'},
    {name:'Max teq'},
    {name: 'Define New'},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    // Add more entries as needed
  ];

  restrictionData = [{}]

  DigiLockerFields = [{
    fieldName:"All Transaction Number",
    type:"input"
  },{
    fieldName:"Screen number",
    type:"input"
  },{
    fieldName:"Flag Code(A/S/R)",
    type:"input"
  },{
    fieldName:"Transaction Entered User",
    type:"input"
  },{
    fieldName:"Transaction Edit User Code",
    type:"input"
  },{
    fieldName:"Log Voucher No",
    type:"input"
  },{
    fieldName:"Log Voucher Date",
    type:"input"
  },{
    fieldName:"Amendment Code",
    type:"input"
  },{
    fieldName:"Printed Yn",
    type:"input"
  },{
    fieldName:"Re Printed Yn",
    type:"input"
  },{
    fieldName:"Document Checked Yn",
    type:"input"
  }]


  FormFields = [{
    fieldName:"User Name",
    type:"input"
  },{
    fieldName:"Password",
    type:"input"
  },{
    fieldName:"Login Company Code",
    type:"input"
  },{
    fieldName:"Login Company Name",
    type:"input"
  },{
    fieldName:"Group Company Code",
    type:"input"
  },{
    fieldName:"Group Company Name",
    type:"input"
  }]
  chosenCountry: any = null;

  chosenAmendment: any = null;
  
  constructor() { }

  ngOnInit(): void {
  }

  changeIndex(i){

    if(this.activeIndex == i){
      this.activeIndex = null
    }
    else
    this.activeIndex = i

    console.log("this.activeIndex===",this.activeIndex);
    
  }

  chooseCompany(i){
    this.chosenCountry = 'Company '+i
    this.showCompany = !this.showCompany
  }


  chooseAmendment(i){
    this.chosenAmendment = 'Amendment '+i
    this.showAmendment = !this.showAmendment
  }
}
