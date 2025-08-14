import { TbldPQIDCo } from "./TbldPQIDCo.dto";

export class TblHPQID {

    HPQID_SysID: number;
    HPQID_Code: string = null;
    HPQID_Name: string = null;
    HPQID_AcDe_Yn: string = "N";
    HPQID_AcDe_SysID: number;
    HPQID_AcDe_Code: string = null;
    HPQID_AcDe_Name: string = null;
    TbldPQIDCo: TbldPQIDCo[] = []
}