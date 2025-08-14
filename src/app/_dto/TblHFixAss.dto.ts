import { TbldFixAss } from "./TbldFixAss.dto";
import { TbldFixAssCo } from "./TbldFixAssCo.dto";

export class TblHFixAss {
    HFixAss_SysID: number;
    HFixAss_Code: string;
    HFixAss_Name: string;
    HFixAss_PayCode: string;
    HFixAss_PayName: string;
    HFixAss_No_Months: number;
    HFixAss_Narra_SysID: number;
    HFixAss_Narra_Code: string;
    HFixAss_Narra_Name: string;
    HFixAss_AcDe_Yn: string;
    HFixAss_AcDe_SysID: number;
    HFixAss_AcDe_Code: string;
    HFixAss_AcDe_Name: string;


  TbldFixAss: TbldFixAss[] = [];
  applicableCo: TbldFixAssCo[] = [];

}