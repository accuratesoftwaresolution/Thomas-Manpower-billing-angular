import { TbldPProjCo } from "./TbldPProjCo.dto";

export class TblHPProjCo {

    HPProjCo_SysID: number;
    HPProjCo_Code: string = null;
    HPProjCo_Name: string = null;
    HPProjCo_AcDe_Yn: string = "N"
    HPProjCo_AcDe_SysID: number;
    HPProjCo_AcDe_Code: string = null;
    HPProjCo_AcDe_Name: string = null;
    TbldPProjCo:TbldPProjCo[] = []

}