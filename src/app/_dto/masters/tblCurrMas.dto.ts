import { TblDCurrDetailDto } from "./tblCurrDetail.dto";
import { TbldCurrMasCoDto } from "./tblCurrMasCo.dto";

export class TblHCurrMasDto {
    HCurrMas_SysID: number;
    HCurrMas_Code: string;
    HCurrMas_Name: string;
    HCurrMas_Symbol: string;
    HCurrMas_Rate: number;
    HCurrMas_Date: Date;
    HCurrMas_Deactive_Yn: string;
    HCurrMas_Report_Rate: number;
    HCurrMas_Report_Date: Date;
    tblDCurrDetail ?: TblDCurrDetailDto[];
    tblDCurrMasCo ? : TbldCurrMasCoDto[];
  }