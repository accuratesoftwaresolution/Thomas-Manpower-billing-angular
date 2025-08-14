import { TbldPNatCo } from "./TbldPNatCo.dto";

export class TblHpNat {
    HPNat_SysID: number;
    HPNat_Code: string;
    HPNat_Name: string;
    HPNat_AcDe_Yn: string;
    HPNat_AcDe_SysID: number;
    HPNat_AcDe_Code: string;
    HPNat_AcDe_Name: string;

    TbldPNatCo:TbldPNatCo[] = []
}