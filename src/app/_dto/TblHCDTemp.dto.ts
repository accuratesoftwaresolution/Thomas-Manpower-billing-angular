import { TbldCDTempCo } from "./TbldCDTempCo.dto";

export class TblHCDTemp {
    HCDTemp_SysID: number;
    HCDTemp_Code: string = null;
    HCDTemp_Name:  string = null;
    HCDTemp_Menu_SysID: number = 0;
    HCDTemp_Menu_Code:  string = null;
    HCDTemp_Menu_Name:  string = null;

    HCDTemp_AcDe_Yn:  string = "N";
    HCDTemp_AcDe_SysID: number = 0;
    HCDTemp_AcDe_Code:  string = null;
    HCDTemp_AcDe_Name:  string = null;
    
    TbldCDTempCo :TbldCDTempCo []= []

}