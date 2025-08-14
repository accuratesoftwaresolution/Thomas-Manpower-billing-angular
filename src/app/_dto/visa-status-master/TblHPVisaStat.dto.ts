import { TbldPVisaStatCo } from "./TbldPVisaStatCo.sto";

export class TblHPVisaStat {

    HPVisaStat_SysID: number;
    HPVisaStat_Code: string = null;
    HPVisaStat_Name: string = null;
    HPVisaStat_AcDe_Yn: string = "N";
    HPVisaStat_AcDe_SysID: number = 0;
    HPVisaStat_AcDe_Code: string = null;
    HPVisaStat_AcDe_Name: string = null;

    TbldPVisaStatCo: TbldPVisaStatCo[] = []

}