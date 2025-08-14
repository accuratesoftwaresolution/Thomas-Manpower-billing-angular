import { TbldSmanCo } from "./TbldSmanCo.dto";

export class TblHSman {
    HSman_SysID: number;       // Salesman SysID
    HSman_Code: string =null;        // Salesman Code
    HSman_Name: string  =null;   ;        // Salesman Name
    HSman_AcDe_Yn: string = 'N';    // Activation & Deactivation (Y/N)
    HSman_AcDe_SysID: number =0;  // Activation & Deactivation SysID
    HSman_AcDe_Code: string  =null;   ;   // Activation & Deactivation Code
    HSman_AcDe_Name: string  =null;   ;   // Activation & Deactivation Name
    TbldSmanCo :TbldSmanCo[] = []
  }
  