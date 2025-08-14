import { TbldMenuCoDto } from "./TbldMenuCoDto.dto";

export class TblHArrayMenu {
    HMenu_SysID: number;
    HMenu_Code: string;
    HMenu_Name: string;
    HMenu_AcDe_Yn: string;
    HMenu_AcDe_SysID: number;
    HMenu_AcDe_Code: string;
    HMenu_AcDe_Name: string;
    TbldMenuCo: TbldMenuCoDto[] = []
}