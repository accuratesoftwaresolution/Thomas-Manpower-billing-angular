import { TbldAreaCodeCoDto } from "./TbldAreaCodeCo.dto";

export class TblHAreaCodeDto {
    HAreaCode_SysID: number;       // Area SysID
    HAreaCode_Code: string =null;        // Area Code
    HAreaCode_Name: string =null;        // Area Name
    HAreaCode_AcDe_Yn: string ="N";    // Activation & Deactivation (Y/N)
    HAreaCode_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    HAreaCode_AcDe_Code: string =null;   // Activation & Deactivation Code
    HAreaCode_AcDe_Name: string =null;   // Activation & Deactivation Name
    TbldAreaCodeCo :TbldAreaCodeCoDto [] = []
  }
  