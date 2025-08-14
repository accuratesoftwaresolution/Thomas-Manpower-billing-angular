import { TbldRemMastCo } from "./TbldRemMastCo.dto";

export class TblHRemMast {
    HRemMast_SysID: number;
    HRemMast_Code: string = null;
    HRemMast_Name: string = null;
    HRemMast_AcDe_Yn: string="N";
    HRemMast_AcDe_SysID: number = 0;
    HRemMast_AcDe_Code: string = null;
    HRemMast_AcDe_Name: string = null;

    TbldRemMastCo :TbldRemMastCo[]=[]
  }
  