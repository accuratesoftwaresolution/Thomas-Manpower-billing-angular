import { TbldDivisionCo } from "./TbldDivisionCo.dto";

export class TblHDivision {
    HDivision_SysID: number;       // Division SysID
    HDivision_Code: string = null;        // Division Code
    HDivision_Name: string = null;         // Division Name
    HDivision_AcDe_Yn: string = "N";     // Activation & Deactivation (Y/N)
    HDivision_AcDe_SysID: number=0;  // Activation & Deactivation SysID
    HDivision_AcDe_Code:  string = null;    // Activation & Deactivation Code
    HDivision_AcDe_Name:  string = null;    // Activation & Deactivation Name
    TbldDivisionCo:TbldDivisionCo[] = []
  }
  