import { TbldBomProdModuCo } from "./TbldBomProdModuCo.dto";

export class TblHBomProdModu {
    HBProdModu_SysID: number;           // BOM Product Module SysID
    HBProdModu_Code: string;            // BOM Product Module Code
    HBProdModu_Name: string;            // BOM Product Module Name
    HBProdModu_AcDe_Yn: string = "N";        // Activation & Deactivation Y/N
    HBProdModu_AcDe_SysID: number;      // Activation & Deactivation SysID
    HBProdModu_AcDe_Code: string;       // Activation & Deactivation Code
    HBProdModu_AcDe_Name: string;       // Activation & Deactivation Name

    applicableCo: TbldBomProdModuCo[] = [];

}