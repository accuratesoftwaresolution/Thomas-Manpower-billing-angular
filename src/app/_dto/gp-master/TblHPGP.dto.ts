import { TbldPGPCo } from "./TbldPGPCo.dto";

export class TblHPGP {

    HPGP_SysID: number;
    HPGP_Code: string = null;
    HPGP_Name: string = null;
    HPGP_AcDe_Yn: string = "N";
    HPGP_AcDe_SysID: number = 0;
    HPGP_AcDe_Code: string = null;
    HPGP_AcDe_Name: string = null;

    TbldPGPCo: TbldPGPCo[] = [];
}