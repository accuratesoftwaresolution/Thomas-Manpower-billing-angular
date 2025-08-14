import { TbldPGpExpCo } from "./TbldPGpExpCo.dto";

export class TblHPGpExp {

    HPGpExp_SysID: number;
    HPGpExp_Code: string = null;
    HPGpExp_Name: string = null;
    HPGpExp_AcDe_Yn: string = "N";
    HPGpExp_AcDe_SysID: number;
    HPGpExp_AcDe_Code: string = null;
    HPGpExp_AcDe_Name: string = null;

    TbldPGpExpCo: TbldPGpExpCo[] = []
}