import { TbldPLabCampCo } from "./TbldPLabCampCo.dto";

export class TblHPLabCamp {


    HPLabCamp_SysID: number;
    HPLabCamp_Code: string = null;
    HPLabCamp_Name: string = null;
    HPLabCamp_AcDe_Yn: string = "N";
    HPLabCamp_AcDe_SysID: number;
    HPLabCamp_AcDe_Code: string = null;
    HPLabCamp_AcDe_Name: string = null;

    TbldPLabCampCo: TbldPLabCampCo[] = []

}