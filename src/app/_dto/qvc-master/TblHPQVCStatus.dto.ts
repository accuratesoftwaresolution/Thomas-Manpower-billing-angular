import { TbldPQVCStatusCo } from "./TbldPQVCStatusCo.dto";

export class TblHPQVCStatus {

    HPQVCStatus_SysID: number;
    HPQVCStatus_Code: string = null;
    HPQVCStatus_Name: string = null;
    HPQVCStatus_AcDe_Yn: string = "N";
    HPQVCStatus_AcDe_SysID: number;
    HPQVCStatus_AcDe_Code: string = null;
    HPQVCStatus_AcDe_Name: string = null;

    TbldPQVCStatusCo:TbldPQVCStatusCo[] = []

}