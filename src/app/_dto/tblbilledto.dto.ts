import { TbldBilledtoCoDto } from "./masters/tbldBilledtoCo.dto";

export class TblHBilledtoDto {
    HBilledto_SysID: number;
    HBilledto_Code: string;
    HBilledto_Name: string;
    HBilledto_Address_One: string;
    HBilledto_Address_Two: string;
    HBilledto_Address_Three: string;
    HBilledto_Address_Four: string;
    HBilledto_TRN_Number: string;
    HBilledto_Area_Code: string;
    HBilledto_Area_Name: string;
    HBilledto_City_Code: string;
    HBilledto_City_Name: string;
    HBilledto_Count_Code: string;
    HBilledto_Count_Name: string;
    HBilledto_Phone: string;
    HBilledto_Fax: string;
    HBilledto_Email_Address: string;
    tbldBilledTo ?: TbldBilledtoCoDto[];
  }