import { TbldBomProdProceCo } from "./TbldBomProdProceCo.dto";

export class TblHBomProdProce {
    HProdProce_SysID: number;           // BOM Production Process SysID
    HProdProce_Code: string;            // BOM Production Process Code
    HProdProce_Name: string;            // BOM Production Process Name
    HProdProce_AcDe_Yn: string = "N";        // Activation & Deactivation Y/N
    HProdProce_AcDe_SysID: number;      // Activation & Deactivation SysID
    HProdProce_AcDe_Code: string;       // Activation & Deactivation Code
    HProdProce_AcDe_Name: string;       // Activation & Deactivation Name

  applicableCo: TbldBomProdProceCo[] = [];

}