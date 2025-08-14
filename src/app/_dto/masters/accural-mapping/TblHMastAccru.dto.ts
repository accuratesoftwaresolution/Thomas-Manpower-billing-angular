import { TbldMastPrepCo } from "../prepaid-mapping/TbldMastPrepCo.dto";
import { TbldMastAccruCo } from "./TbldMastAccruCo.dto";
import { TblHDetAccru } from "./TblHDetAccru.dto";

export class TblHMastAccru {
    HAccru_SysID: number;
    HAccru_Code: string;
    HAccru_Name: string;

    HAccru_PaySysID:number;
    HAccru_PayCode: string;
    HAccru_PayName: string;
    HAccru_No_Months: number;

    HAccru_Narra_SysID: number;
    HAccru_Narra_Code: string;
    HAccru_Narra_Name: string;

    HAccru_AcDe_SysID: number;
    HAccru_AcDe_Code: string;
    HAccru_AcDe_Name: string;

  TblHDetAccru: TblHDetAccru[] = [];

  applicableCo: TbldMastAccruCo[] = [];


   
  }
  