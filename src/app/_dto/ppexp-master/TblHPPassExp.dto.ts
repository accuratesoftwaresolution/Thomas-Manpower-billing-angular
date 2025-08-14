import { TbldPPassExpCo } from "./TbldPPassExpCo.dto";

export class TblHPPassExp {

    HPPassExp_SysID: number;
    HPPassExp_Code: string = null;
    HPPassExp_Name: string = null;
    HPPassExp_AcDe_Yn: string = "N";
    HPPassExp_AcDe_SysID: number = 0;
    HPPassExp_AcDe_Code: string = null;
    HPPassExp_AcDe_Name: string = null;
    TbldPPassExpCo: TbldPPassExpCo[] = []

}