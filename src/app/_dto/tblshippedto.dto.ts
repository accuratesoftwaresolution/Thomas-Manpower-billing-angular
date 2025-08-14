import { TbldShippedtoCoDto } from "./masters/tbldShippedtoCo.dto";

export class TblHShippedtoDto {
    
    HShippedto_SysID: number;

    HShippedto_Code: string;

    HShippedto_Name: string;

    HShippedto_Address_One: string;

    HShippedto_Address_Two: string;

    HShippedto_Address_Three: string;

    HShippedto_Address_Four: string;

    HShippedto_TRN_Number: string;

    HShippedto_Area_Code: string;

    HShippedto_Area_Name: string;

    HShippedto_City_Code: string;

    HShippedto_City_Name: string;

    HShippedto_Count_Code: string;

    HShippedto_Count_Name: string;

    HShippedto_Phone: string;

    HShippedto_Fax: string;

    HShippedto_Email_Address: string;

    tbldShippedToCo ?: TbldShippedtoCoDto[];

}