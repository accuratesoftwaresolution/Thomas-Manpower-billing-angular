import { TbldPOffLetterCo } from "./TbldPOffLetterCo.dto";

export class TblHPOffLetter {

    HPOffLetter_SysID: number;
    HPOffLetter_Code: string = null;
    HPOffLetter_Name: string = null;
    HPOffLetter_AcDe_Yn: string = "N";
    HPOffLetter_AcDe_SysID: number = 0;
    HPOffLetter_AcDe_Code: string = null;
    HPOffLetter_AcDe_Name: string = null;
    TbldPOffLetterCo: TbldPOffLetterCo[] = []

}