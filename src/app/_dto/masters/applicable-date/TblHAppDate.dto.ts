import { TbldAppDateCo } from "./TbldAppDateCo.dto";

export class TblHAppDate {
    HAppDate_SysID: number;
    HAppDate_Code: string = null;
    HAppDate_Name: string = null;
    HAppDate_AcDe_Yn: string ="N";
    HAppDate_AcDe_SysID: number = 0;
    HAppDate_AcDe_Code: string = null;
    HAppDate_AcDe_Name: string = null;

    TbldAppDateCo:TbldAppDateCo[] = []
  }
  