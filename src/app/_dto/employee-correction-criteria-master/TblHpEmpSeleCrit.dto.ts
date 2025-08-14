import { TbldPEmpSeleCritCo } from "./TbldPEmpSeleCritCo.dto";

export class TblHpEmpSeleCrit {
    HPEmpSeleCrit_SysID: number;
    HPEmpSeleCrit_Code: string = null;
    HPEmpSeleCrit_Name: string = null;
    HPEmpSeleCrit_AcDe_Yn: string = "N";
    HPEmpSeleCrit_AcDe_SysID: number;
    HPEmpSeleCrit_AcDe_Code: string = null;
    HPEmpSeleCrit_AcDe_Name: string = null;

    TbldPEmpSeleCritCo: TbldPEmpSeleCritCo[] = []
}