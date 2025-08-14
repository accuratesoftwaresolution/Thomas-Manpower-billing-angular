import { TaxTbl } from "../TaxTbl.dto";
import { TbldAccOneCodtoapplicable } from "../TbldAccOneCodto";
import { TblDocAttachDto } from "../tbldocattch.dto";
import { TblHFirstTax } from "../TblHFirstTax.dto";
import { TblmDocAttach } from "../TblmDocAttach.dto";
import { AccCommDto } from "./tblAccComm.dto";
import { TblHAccOneDto } from "./tblhAccOne.dto";



export class TblHAccGroupDto {

    // First Tab :Account Group------------------------------------------------------------------------------------------

    HAccGroup_SysID: number;
    HAccGroup_Code: string = null;
    HAccGroup_Name: string = null;
    HAccGroup_Address_One: string = null;
    HAccGroup_Address_Two: string = null;
    HAccGroup_Address_Three: string = null;
    HAccGroup_Address_Four: string = null;
    HAccGroup_TRN_Number: string = null;
    HAccGroup_Area_SysID: number = 0;
    HAccGroup_Area_Code: string = null;
    HAccGroup_Area_Name: string = null;
    HAccGroup_City_SysID: number = 0;
    HAccGroup_City_Code: string = null;
    HAccGroup_City_Name: string = null;
    HAccGroup_Count_SysID: number = 0;
    HAccGroup_Count_Code: string = null;
    HAccGroup_Count_Name: string = null;
    HAccGroup_Phone: string = null;
    HAccGroup_Fax: string = null;
    HAccGroup_Email_Address: string = null;
    HAccGroup_MainAssLiab_SysID: number = 0;
    HAccGroup_MainAssLiab_Code: string = null;
    HAccGroup_MainAssLiab_Name: string = null;
    HAccGroup_SubAssLiab_SysID: number = 0;
    HAccGroup_SubAssLiab_Code: string = null;
    HAccGroup_SubAssLiab_Name: string = null;
    HAccGroup_Module_SysID: number = 0;
    HAccGroup_Module_Code: string = null;
    HAccGroup_Module_Name: string = null;
    HAccGroup_Group_SysID: number = 0;
    HAccGroup_Group_Code: string = null;
    HAccGroup_Group_Name: string = null;
    HAccGroup_Type_SysID: number = 0;
    HAccGroup_Type_Code: string = null;
    HAccGroup_Type_Name: string = null;
    HAccGroup_FA_SysID: number = 0;
    HAccGroup_FA_Code: string = null;
    HAccGroup_FA_Name: string = null;
    HAccGroup_Emp_SysID: number = 0;
    HAccGroup_Emp_Code: string = null;
    HAccGroup_Emp_Name: string = null;

    HAccGroup_Prod_SysID: number = 0;
    HAccGroup_Prod_Code: string = null;
    HAccGroup_Prod_Name: string = null;

    HAccGroup_AccPre_SysID: number = 0;
    HAccGroup_AccPre_Code: string = null;
    HAccGroup_AccPre_Name: string = null;

    HAccGroup_CrLimit: number = 0;
    HAccGroup_CrLimit_Days: number = 0;
    HAccGroup_Insu_CrLimit: number = 0;
    HAccGroup_Insu_CrLimit_Days: number = 0;
    HAccGroup_Block_CrLimit: number = 0;
    HAccGroup_Block_CrLimit_Days: number = 0;
    HAccGroup_FinGroup1: number = 0;
    HAccGroup_FinGroup2: number = 0;
    HAccGroup_FinGroup3: number = 0;
    HAccGroup_FinGroup4: number = 0;
    HAccGroup_FinGroup5: number = 0;
    HAccGroup_FinGroup6: number = 0;
    HAccGroup_FinGroup7: number = 0;
    HAccGroup_FinGroup8: number = 0;
    HAccGroup_FinGroup9: number = 0;
    HAccGroup_AcDe_Yn: string = "N";

    HAccGroup_AcDe_SysID: number = 0;
    HAccGroup_AcDe_Code: string = null;
    HAccGroup_AcDe_Name: string = null;


    // Second Tab :Account Master------------------------------------------------------------------------------------------

    TblHAccOne: TblHAccOneDto[] = []

    // Third Tab : Master Details------------------------------------------------------------------------------------------

    TblHAccCom: AccCommDto[] = []

    // Fourth tabs

    TblmDocAttach: TblmDocAttach[] = []

}
