import { TbldPLocationCo } from "./TbldPLocationCo.dto";

export class TblHPLocation {

    HPLocation_SysID: number;
    HPLocation_Code: string;
    HPLocation_Name: string;
    HPLocation_AcDe_Yn: string = "N";
    HPLocation_AcDe_SysID: number;
    HPLocation_AcDe_Code: string;
    HPLocation_AcDe_Name: string;

    TbldPLocationCo: TbldPLocationCo[] = []
}