import { TbldPJobCreatCo } from "./TbldPJobCreatCo.dto";

export class TblHPJobCrea {

    HPJobCrea_SysID: number;
    HPJobCrea_Code: string = null;
    HPJobCrea_Name: string = null;
    HPJobCrea_AcDe_Yn: string = "N";
    HPJobCrea_AcDe_SysID: number;
    HPJobCrea_AcDe_Code: string = null;
    HPJobCrea_AcDe_Name: string = null;
    TbldPJobCreatCo: TbldPJobCreatCo[] = []
}