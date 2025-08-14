import { TbldBomManpowCo } from "./TbldBomManpowCo.dto";

export class TblHBomManpow {
    HManpow_SysID: number;           // BOM Manpower Process SysID
    HManpow_Code: string;            // BOM Manpower Process Code
    HManpow_Name: string;            // BOM Manpower Process Name
    HManpow_HrRate: number;          // BOM Manpower Process Hourly Rate
    HManpow_AcDe_Yn: string="N";

    HManpowModu_SysID :number;
    HManpowModu_Code:string;
    HManpowModu_Name:string;
    // Activation & Deactivation Y/N
    HManpow_AcDe_SysID: number;      // Activation & Deactivation SysID
    HManpow_AcDe_Code: string;       // Activation & Deactivation Code
    HManpow_AcDe_Name: string;       // Activation & Deactivation Name

    applicableCo: TbldBomManpowCo[] = []
}