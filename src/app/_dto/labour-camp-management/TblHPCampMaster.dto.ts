import { TbldPCampMaster } from "./TbldPCampMaster.dto";
import { TbldPCampMasterCo } from "./TbldPCampMasterCo.dto";

export class TblHPCampMaster {
    Hp_CampVouSysID: number;
    Hp_CampSysID: number = 0;
    Hp_CampCode: string = "";
    Hp_CampName: string = "";
    Hp_CampSviserSysID: number = 0;
    Hp_CampSviserCode: string = "";
    Hp_CampSviserName: string = "";

    TbldPCampMaster: TbldPCampMaster[] = []
    TbldPCampMasterCo:TbldPCampMasterCo[] = []
}