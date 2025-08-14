import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trail-balance',
  templateUrl: './trail-balance.component.html',
  styleUrls: ['./trail-balance.component.scss']
})
export class TrailBalanceComponent implements OnInit {

showFilterOption: boolean = false

  TblHMtbPosting = [
    { Tbp_Allh_SingleCo_Code: "SC001", Tbp_Allh_SingleCo_Name: "Single Company A", Tbp_Allh_GroupCo_Code: "GC001", Tbp_Allh_GroupCo_Name: "Group Company A", Tbp_Allh_Acc_Code: "ACC1001", Tbp_Allh_Acc_Name: "Account A", Tbp_Allh_Debit_Amount: 1000.00, Tbp_Allh_Credit_Amount: 500.00, Tbp_Allh_Debit_OrgCurr: 1200.00, Tbp_Allh_Credit_OrgCurr: 600.00, Tbp_Allh_Debit_Amount_2: 1100.00, Tbp_Allh_Credit_Amount_2: 550.00, Tbp_Allh_Debit_OrgCurr_2: 1300.00, Tbp_Allh_Credit_OrgCurr_2: 650.00, Tbp_Allh_Debit_Amount_3: 1150.00, Tbp_Allh_Credit_Amount_3: 575.00, Tbp_Allh_Debit_OrgCurr_3: 1350.00, Tbp_Allh_Credit_OrgCurr_3: 675.00, Tbp_AccOne_FinGroup1: "Group 1", Tbp_AccOne_FinGroup2: "Group 2", Tbp_AccOne_FinGroup3: "Group 3", Tbp_AccOne_FinGroup4: "Group 4", Tbp_AccOne_FinGroup5: "Group 5", Tbp_AccOne_FinGroup6: "Group 6", Tbp_AccOne_FinGroup7: "Group 7", Tbp_AccOne_FinGroup8: "Group 8", Tbp_AccOne_FinGroup9: "Group 9" },
    { Tbp_Allh_SingleCo_Code: "SC002", Tbp_Allh_SingleCo_Name: "Single Company B", Tbp_Allh_GroupCo_Code: "GC002", Tbp_Allh_GroupCo_Name: "Group Company B", Tbp_Allh_Acc_Code: "ACC1002", Tbp_Allh_Acc_Name: "Account B", Tbp_Allh_Debit_Amount: 2000.00, Tbp_Allh_Credit_Amount: 1000.00, Tbp_Allh_Debit_OrgCurr: 2200.00, Tbp_Allh_Credit_OrgCurr: 1100.00, Tbp_Allh_Debit_Amount_2: 2100.00, Tbp_Allh_Credit_Amount_2: 1050.00, Tbp_Allh_Debit_OrgCurr_2: 2300.00, Tbp_Allh_Credit_OrgCurr_2: 1150.00, Tbp_Allh_Debit_Amount_3: 2150.00, Tbp_Allh_Credit_Amount_3: 1075.00, Tbp_Allh_Debit_OrgCurr_3: 2350.00, Tbp_Allh_Credit_OrgCurr_3: 1175.00, Tbp_AccOne_FinGroup1: "Group 1B", Tbp_AccOne_FinGroup2: "Group 2B", Tbp_AccOne_FinGroup3: "Group 3B", Tbp_AccOne_FinGroup4: "Group 4B", Tbp_AccOne_FinGroup5: "Group 5B", Tbp_AccOne_FinGroup6: "Group 6B", Tbp_AccOne_FinGroup7: "Group 7B", Tbp_AccOne_FinGroup8: "Group 8B", Tbp_AccOne_FinGroup9: "Group 9B" },
    { Tbp_Allh_SingleCo_Code: "SC003", Tbp_Allh_SingleCo_Name: "Single Company C", Tbp_Allh_GroupCo_Code: "GC003", Tbp_Allh_GroupCo_Name: "Group Company C", Tbp_Allh_Acc_Code: "ACC1003", Tbp_Allh_Acc_Name: "Account C", Tbp_Allh_Debit_Amount: 3000.00, Tbp_Allh_Credit_Amount: 1500.00, Tbp_Allh_Debit_OrgCurr: 3200.00, Tbp_Allh_Credit_OrgCurr: 1600.00, Tbp_Allh_Debit_Amount_2: 3100.00, Tbp_Allh_Credit_Amount_2: 1550.00, Tbp_Allh_Debit_OrgCurr_2: 3300.00, Tbp_Allh_Credit_OrgCurr_2: 1650.00, Tbp_Allh_Debit_Amount_3: 3150.00, Tbp_Allh_Credit_Amount_3: 1575.00, Tbp_Allh_Debit_OrgCurr_3: 3350.00, Tbp_Allh_Credit_OrgCurr_3: 1675.00, Tbp_AccOne_FinGroup1: "Group 1C", Tbp_AccOne_FinGroup2: "Group 2C", Tbp_AccOne_FinGroup3: "Group 3C", Tbp_AccOne_FinGroup4: "Group 4C", Tbp_AccOne_FinGroup5: "Group 5C", Tbp_AccOne_FinGroup6: "Group 6C", Tbp_AccOne_FinGroup7: "Group 7C", Tbp_AccOne_FinGroup8: "Group 8C", Tbp_AccOne_FinGroup9: "Group 9C" },
    { Tbp_Allh_SingleCo_Code: "SC004", Tbp_Allh_SingleCo_Name: "Single Company D", Tbp_Allh_GroupCo_Code: "GC004", Tbp_Allh_GroupCo_Name: "Group Company D", Tbp_Allh_Acc_Code: "ACC1004", Tbp_Allh_Acc_Name: "Account D", Tbp_Allh_Debit_Amount: 4000.00, Tbp_Allh_Credit_Amount: 2000.00, Tbp_Allh_Debit_OrgCurr: 4200.00, Tbp_Allh_Credit_OrgCurr: 2100.00, Tbp_Allh_Debit_Amount_2: 4100.00, Tbp_Allh_Credit_Amount_2: 2050.00, Tbp_Allh_Debit_OrgCurr_2: 4300.00, Tbp_Allh_Credit_OrgCurr_2: 2150.00, Tbp_Allh_Debit_Amount_3: 4150.00, Tbp_Allh_Credit_Amount_3: 2075.00, Tbp_Allh_Debit_OrgCurr_3: 4350.00, Tbp_Allh_Credit_OrgCurr_3: 2175.00, Tbp_AccOne_FinGroup1: "Group 1D", Tbp_AccOne_FinGroup2: "Group 2D", Tbp_AccOne_FinGroup3: "Group 3D", Tbp_AccOne_FinGroup4: "Group 4D", Tbp_AccOne_FinGroup5: "Group 5D", Tbp_AccOne_FinGroup6: "Group 6D", Tbp_AccOne_FinGroup7: "Group 7D", Tbp_AccOne_FinGroup8: "Group 8D", Tbp_AccOne_FinGroup9: "Group 9D" },
    { Tbp_Allh_SingleCo_Code: "SC005", Tbp_Allh_SingleCo_Name: "Single Company E", Tbp_Allh_GroupCo_Code: "GC005", Tbp_Allh_GroupCo_Name: "Group Company E", Tbp_Allh_Acc_Code: "ACC1005", Tbp_Allh_Acc_Name: "Account E", Tbp_Allh_Debit_Amount: 5000.00, Tbp_Allh_Credit_Amount: 2500.00, Tbp_Allh_Debit_OrgCurr: 5200.00, Tbp_Allh_Credit_OrgCurr: 2600.00, Tbp_Allh_Debit_Amount_2: 5100.00, Tbp_Allh_Credit_Amount_2: 2550.00, Tbp_Allh_Debit_OrgCurr_2: 5300.00, Tbp_Allh_Credit_OrgCurr_2: 2650.00, Tbp_Allh_Debit_Amount_3: 5150.00, Tbp_Allh_Credit_Amount_3: 2575.00, Tbp_Allh_Debit_OrgCurr_3: 5350.00, Tbp_Allh_Credit_OrgCurr_3: 2675.00, Tbp_AccOne_FinGroup1: "Group 1E", Tbp_AccOne_FinGroup2: "Group 2E", Tbp_AccOne_FinGroup3: "Group 3E", Tbp_AccOne_FinGroup4: "Group 4E", Tbp_AccOne_FinGroup5: "Group 5E", Tbp_AccOne_FinGroup6: "Group 6E", Tbp_AccOne_FinGroup7: "Group 7E", Tbp_AccOne_FinGroup8: "Group 8E", Tbp_AccOne_FinGroup9: "Group 9E" }
  ];


  selectedLinkRecords: any;

  companyName: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress1: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress2: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress3: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress4: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  phone: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
  fax: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  TrnNumber: any = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';


  constructor() { }

  ngOnInit(): void {
  }

}