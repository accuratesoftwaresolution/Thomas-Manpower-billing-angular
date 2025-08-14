import { TbldBomBatchCo } from "./TbldBomBatchCo.dto";

export class TblHBomBatch {
    HBBatch_SysID: number;           // BOM Production Batch SysID
    HBBatch_Code: string;            // BOM Production Batch Code
    HBBatch_Name: string;            // BOM Production Batch Name
    HBBatch_AcDe_Yn: string ="N";        // Activation & Deactivation Y/N
    HBBatch_AcDe_SysID: number;      // Activation & Deactivation SysID
    HBBatch_AcDe_Code: string;       // Activation & Deactivation Code
    HBBatch_AcDe_Name: string;       // Activation & Deactivation Name

    applicableCo:TbldBomBatchCo[] = []
}