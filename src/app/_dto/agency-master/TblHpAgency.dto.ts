import { TbldPAgencyCo } from "./TbldPAgencyCo.dto";

export class TblHpAgency {

    HPAgency_SysID: number;
    HPAgency_Code: string = null;
    HPAgency_Name: string = null;
    HPAgency_AcDe_Yn: string = "N";
    HPAgency_AcDe_SysID: number = 0;
    HPAgency_AcDe_Code: string = null;
    HPAgency_AcDe_Name: string = null;

    TbldPAgencyCo:TbldPAgencyCo[] = [];
}