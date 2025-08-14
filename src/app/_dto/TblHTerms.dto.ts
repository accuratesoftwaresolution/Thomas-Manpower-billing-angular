import { TbldTermsCo } from "./TbldTermsCo.dto";

export class TblHTerms {

    HTerms_SysID: number;
    HTerms_Code: string;
    HTerms_Name: string;
    HTerms_AcDe_Yn: string;
    HTerms_AcDe_SysID: number;
    HTerms_AcDe_Code: string;
    HTerms_AcDe_Name: string;

    TbldTermsCo: TbldTermsCo[] = []
}