import { TbldPDesigCo } from "./TbldPDesigCo.dto";

export class TblHPDesig {

    HPDesig_SysID: number;
    HPDesig_Code: string = null;
    HPDesig_Name: string = null;
    HPDesig_AcDe_Yn: string = null;
    HPDesig_AcDe_SysID: number;
    HPDesig_AcDe_Code: string = null;
    HPDesig_AcDe_Name: string = null;
    TbldPDesigCo:TbldPDesigCo[] = [];

}