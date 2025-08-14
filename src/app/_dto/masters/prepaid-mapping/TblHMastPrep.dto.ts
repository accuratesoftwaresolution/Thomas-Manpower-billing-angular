import { TbldMastPrepCo } from "./TbldMastPrepCo.dto";
import { TblHDetPrep } from "./TblHDetPrep.dto";

export class TblHMastPrep {
  
    HPrep_SysID: number;
    HPrep_Code: string;
    HPrep_Name: string;

    HPrep_PaySysID:number;
    HPrep_PayCode: string;
    HPrep_PayName: string;
    HPrep_No_Months: number;

    HPrep_Narra_SysID: number;
    HPrep_Narra_Code: string;
    HPrep_Narra_Name: string;

    HPrep_AcDe_SysID: number;
    HPrep_AcDe_Code: string;
    HPrep_AcDe_Name: string;

  TblHDetPrep: TblHDetPrep[] = [];

  applicableCo: TbldMastPrepCo[] = [];

   
  }
  