import { TbldEmplCoDto } from "./tbldEmplCo.dto";

export class TblHEmplDto {
    HEmpl_SysID: number;
    HEmpl_Code: string;
    HEmpl_Name: string;
    HEmpl_Group_Code: string;
    HEmpl_Group_Name: string;
    HEmpl_Categ_Code: string;
    HEmpl_Categ_Name: string;
    HEmpl_Type_Code: string;
    HEmpl_Type_Name: string;
    HEmpl_LPolicy_Code: string;
    HEmpl_LPolicy_Name: string;
    // Present Address
    HEAdd_First_Name: string;
    HEAdd_Sec_Name: string;
    HEAdd_Full_Name: string;
    HEAdd_Add1_Name: string;
    HEAdd_Add2_Name: string;
    HEAdd_Add3_Name: string;
    HEAdd_Add4_Name: string;
    HEAdd_City_Code: string;
    HEAdd_City_Name: string;
    HEAdd_Country_Code: string;
    HEAdd_Country_Name: string;
    HEAdd_Tel_Number: string;
    HEAdd_Fax_Number: string;
    HEAdd_Email: string;
    // Permanent Address
    HEPAdd_First_Name: string;
    HEPAdd_Sec_Name: string;
    HEPAdd_Full_Name: string;
    HEPAdd_Add1_Name: string;
    HEPAdd_Add2_Name: string;
    HEPAdd_Add3_Name: string;
    HEPAdd_Add4_Name: string;
    HEPAdd_City_Code: string;
    HEPAdd_City_Name: string;
    HEPAdd_Country_Code: string;
    HEPAdd_Country_Name: string;
    HEPAdd_Tel_Number: string;
    HEPAdd_Fax_Number: string;
    HEPAdd_Email: string;
    // Emergency Details
    HEmerAdd_First_Name: string;
    HEmerAdd_Sec_Name: string;
    HEmerAdd_Full_Name: string;
    HEmerAdd_Add1_Name: string;
    HEmerAdd_Add2_Name: string;
    HEmerAdd_Add3_Name: string;
    HEmerAdd_Add4_Name: string;
    HEmerAdd_City_Code: string;
    HEmerAdd_City_Name: string;
    HEmerAdd_Country_Code: string;
    HEmerAdd_Country_Name: string;
    HEmerAdd_Tel_Number: string;
    HEmerAdd_Fax_Number: string;
    HEmerAdd_Email: string;
    // Joining Details
    HEmpl_Join_Date: Date;
    HEmpl_ContStart_Date: Date;
    HEmpl_ContEnd_Date: Date;
    HEmpl_Retire_Date: Date;
    // Bank Details
    HEBank_Name: string;
    HEBank_Acc_No: string;
    HEBank_IBANAcc_No: string;
    HEBank_RouAcc_No: string;
    HEBank_Swift_No: string;
    HEBank_Add1_No: string;
    HEBank_Add2_No: string;
    HEBank_Add3_No: string;
    HEBank_Add4_No: string;
    HEBank_City_Code: string;
    HEBank_City_Name: string;
    HEBank_Count_Code: string;
    HEBank_Count_Name: string;
    HEBank_Tele_No: string;
    HEBank_Fax_No: string;
    HEBank_Email: string;
    // Passport Details
    HEPass_Number: string;
    HEPass_Bdate: Date;
    HEPass_Dissue: Date;
    HEPass_Validtill: Date;
    HEPass_City_Code: string;
    HEPass_City_Name: string;
    HEPass_Count_Code: string;
    HEPass_Count_Name: string;
    HEPass_Place_Issue: string;
    HEPass_Mstatus: string;
    // Emirates ID Details
    HEID_Number: string;
    HEID_Bdate: Date;
    HEID_Dissue: Date;
    HEID_Validtill: Date;
    HEID_City_Code: string;
    HEID_City_Name: string;
    HEID_Count_Code: string;
    HEID_Count_Name: string;
    HEID_Place_Issue: string;
    HEID_Mstatus: string;
    // Driving Details
    HEDri_Number: string;
    HEDri_Bdate: Date;
    HEDri_Date_Issue: Date;
    HEDri_Validtill: Date;
    HEDri_City_Code: string;
    HEDri_City_Name: string;
    HEDri_Count_Code: string;
    HEDri_Count_Name: string;
    // Insurance Details
    HEInsu_Number: string;
    HEInsu_Bdate: Date;
    HEInsu_Date_Issue: Date;
    HEInsu_Validtill: Date;
    HEInsu_City_Code: string;
    HEInsu_City_Name: string;
    HEInsu_Count_Code: string;
    HEInsu_Count_Name: string;
    // WPS
    HEWps_EDR: string;
    HEWps_LabCard_No: string;
    HEWps_SCR: string;
    HEWps_MOL_ID: string;
    HEWps_Pay_Bank: string;
    HEWps_Date_Payment: string;
    tbldEmplco ?: TbldEmplCoDto[];
  }
  