import { TbldPGPLocCo } from "./TbldPGPLocCo.dto";

export class TblHPGPLoc {

    HPGPLoc_SysID: number;
    HPGPLoc_Code: string = null;
    HPGPLoc_Name: string = null;
    HPGPLoc_AcDe_Yn: string = null;
    HPGPLoc_AcDe_SysID: number = 0;
    HPGPLoc_AcDe_Code: string = null;
    HPGPLoc_AcDe_Name: string = null;

    TbldPGPLocCo: TbldPGPLocCo[] = []
}