import { TbldFieldDispHideCo } from "./TbldFieldDispHideCo.dto";

export class TbHlFieldDispHide {
    HFieldDispHide_SysID: number;
    HFieldDispHide_Code: string = null;
    HFieldDispHide_Name: string = null;;
    HFieldDispHide_AcDe_Yn: string ="N";
    HFieldDispHide_AcDe_SysID: number;
    HFieldDispHide_AcDe_Code: string = null;;
    HFieldDispHide_AcDe_Name: string = null;;
    TbldFieldDispHideCo: TbldFieldDispHideCo[] = []
}