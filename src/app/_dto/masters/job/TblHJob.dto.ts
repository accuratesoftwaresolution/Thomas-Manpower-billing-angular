import { TbldJobCo } from "./TbldJobCo.dto";

export class TblHJob {
    HJob_SysID: number;       // Job SysID
    HJob_Code: string=null;       // Job Code
    HJob_Name:  string=null;          // Job Name
    HJob_AcDe_Yn: string="N";    // Activation & Deactivation (Y/N)
    HJob_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    HJob_AcDe_Code:  string=null;     // Activation & Deactivation Code
    HJob_AcDe_Name:  string=null;     // Activation & Deactivation Name
    TbldJobCo :TbldJobCo[] = []

  }
  