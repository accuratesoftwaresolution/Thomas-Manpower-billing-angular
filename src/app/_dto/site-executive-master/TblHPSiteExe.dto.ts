import { TbldPSiteExeCo } from "./TbldPSiteExeCo.dto";

export class TblHPSiteExe {

    HPSiteExe_SysID: number;
    HPSiteExe_Code: string = null;
    HPSiteExe_Name: string = null;
    HPSiteExe_AcDe_Yn: string = "N";
    HPSiteExe_AcDe_SysID: number;
    HPSiteExe_AcDe_Code: string = null;
    HPSiteExe_AcDe_Name: string = null;
    TbldPSiteExeCo: TbldPSiteExeCo[] = []
}