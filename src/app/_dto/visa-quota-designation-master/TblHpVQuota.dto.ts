import { TbldPVQuotaCo } from "./TbldPVQuotaCo.dto";

export class TblHpVQuota {
    HPVQuota_SysID: number;
    HPVQuota_Code: string = null;
    HPVQuota_Name: string = null;
    HPVQuota_AcDe_Yn: string = "N";
    HPVQuota_AcDe_SysID: number;
    HPVQuota_AcDe_Code: string = null;
    HPVQuota_AcDe_Name: string = null;
    TbldPVQuotaCo: TbldPVQuotaCo[] = [];

}