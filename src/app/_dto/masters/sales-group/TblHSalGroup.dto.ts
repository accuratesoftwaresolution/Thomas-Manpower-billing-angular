import { TbldSalGroupCo } from "./TbldSalGroupCo.dto";

export class TblHSalGroup {
    HSalGroup_SysID: number;
    HSalGroup_Code: string = null;
    HSalGroup_Name:  string = null;
    HSalGroup_AcDe_Yn: string="N";
    HSalGroup_AcDe_SysID: number = 0;
    HSalGroup_AcDe_Code:  string = null;
    HSalGroup_AcDe_Name:  string = null;
    TbldSalGroupCo:TbldSalGroupCo[] = [];

  }
  