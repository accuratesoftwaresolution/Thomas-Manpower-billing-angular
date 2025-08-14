import { TbldDeptCo } from "./TbldDeptCo.dto";

export class TblHDept {
  HDept_SysID: number;       // Department SysID
  HDept_Code: string = null;        // Department Code
  HDept_Name: string = null;      // Department Name
  HDept_AcDe_Yn: string="N" ;  // Activation & Deactivation (Y/N)
  HDept_AcDe_SysID: number =0;  // Activation & Deactivation SysID
  HDept_AcDe_Code: string = null; // Activation & Deactivation Code
  HDept_AcDe_Name: string = null; // Activation & Deactivation Name
  TbldDeptCo: TbldDeptCo[] = []


}
