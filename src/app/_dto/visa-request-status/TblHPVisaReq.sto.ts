import { TbldPVisaReq } from "./TbldPVisaReq.dto";

export class TblHPVisaReq {

    HPVisaReq_SysID: number;
    HPVisaReq_Code: string = null;
    HPVisaReq_Name: string = null;
    HPVisaReq_AcDe_Yn: string = "N";
    HPVisaReq_AcDe_SysID: number;
    HPVisaReq_AcDe_Code: string = null;
    HPVisaReq_AcDe_Name: string = null;

    TbldPVisaReq: TbldPVisaReq[] = []
}