import { TbldBomJobCo } from "./TbldBomJobCo.dto";

export class TblHBomJob {
    HBJob_SysID: number;           // BOM Job SysID
    HBJob_Code: string = null;            // BOM Job Code
    HBJob_Name: string = null;            // BOM Job Name
    HBJob_AcDe_Yn: string = "N";        // Activation & Deactivation Y/N
    HBJob_AcDe_SysID: number = null;      // Activation & Deactivation SysID
    HBJob_AcDe_Code: string = null;       // Activation & Deactivation Code
    HBJob_AcDe_Name: string = null;       // Activation & Deactivation Name

    applicableCo: TbldBomJobCo[] = [];

}