import { TbldShippedtoCo } from "./TbldShippedtoCo.dto";

export class TblHShippedto {
  HShippedto_SysID: number;
  HShippedto_Code: string;
  HShippedto_Name: string;
  HShippedto_Address_One: string;
  HShippedto_Address_Two: string;
  HShippedto_Address_Three: string;
  HShippedto_Address_Four: string;
  HShippedto_TRN_Number: string;
  HShippedto_Area_SysID: number;
  HShippedto_Area_Code: string;
  HShippedto_Area_Name: string;
  HShippedto_City_SysID: number;
  HShippedto_City_Code: string;
  HShippedto_City_Name: string;
  HShippedto_Count_SysID: number;
  HShippedto_Count_Code: string;
  HShippedto_Count_Name: string;
  HShippedto_Phone: string;
  HShippedto_Fax: string;
  HShippedto_Email_Address: string;
  HShippedto_AcDe_Yn: boolean;
  HShippedto_AcDe_SysID: number;
  HShippedto_AcDe_Code: string;
  HShippedto_AcDe_Name: string;

  tbldShippedtoCo: TbldShippedtoCo[] = [];

}
