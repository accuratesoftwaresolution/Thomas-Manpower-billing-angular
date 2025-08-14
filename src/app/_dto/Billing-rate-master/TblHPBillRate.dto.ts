import { TbldPBillRate } from "./TbldPBillRate.dto";
import { TbldPBillRateCo } from "./TbldPBillRateCo.dto";

export class TblHPBillRate {

    HPBRate_SysID: number;
    HPBRate_Code: string = null;
    HPBRate_Name: string = null;
    HPBRate_JobSysID: number = 0;
    HPBRate_JobCode: string = null;
    HPBRate_JobName: string = null;
    HPBRate_CurrSysID: number = 0;
    HPBRate_CurrCode: string = null;
    HPBRate_CurrName: string = null;
    HPBRate_ConvRate: number = 0;
    HPBRate_AcDe_Yn: string = null;
    HPBRate_AcDe_SysID: number = 0;
    HPBRate_AcDe_Code: string = null;
    HPBRate_AcDe_Name: string = null;

    TbldPBillRate: TbldPBillRate[] = []
    TbldPBillRateCo:TbldPBillRateCo[]=[]
}