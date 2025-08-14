import { TbldPCliDesigCo } from "./TbldPCliDesigCo.dto";

export class TblHPCliDesig {

    HPCliDesig_SysID: number;
    HPCliDesig_Code: string = null;
    HPCliDesig_Name: string = null;
    HPCliDesig_AcDe_Yn: string = "N";
    HPCliDesig_AcDe_SysID: number;
    HPCliDesig_AcDe_Code: string = null;
    HPCliDesig_AcDe_Name: string = null;
    TbldPCliDesigCo: TbldPCliDesigCo[] = []
}