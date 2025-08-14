import { TbldPVisaAppStatus } from "./TbldPVisaAppStatus.dto";

export class TblHPVisaAppStatus {

    HPVisaAppStatus_SysID: number;
    HPVisaAppStatus_Code: string = null;
    HPVisaAppStatus_Name: string = null;
    HPVisaAppStatus_AcDe_Yn: string = "N";
    HPVisaAppStatus_AcDe_SysID: number;
    HPVisaAppStatus_AcDe_Code: string = null;
    HPVisaAppStatus_AcDe_Name: string = null;

    TbldPVisaAppStatus: TbldPVisaAppStatus[] = []
}