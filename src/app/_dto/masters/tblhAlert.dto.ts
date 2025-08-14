import { TbldAlertCo } from "../TbldAlertCo.dto";

export class TblHAlert {

    HAlert_SysID: number;
    HAlert_Code: string = null;
    HAlert_Name: string = null;
    HAlert_AcDe_Yn: string ="N";
    HAlert_AcDe_SysID: number = null;
    HAlert_AcDe_Code: string = null;
    HAlert_AcDe_Name: string = null;


    TbldAlertCo: TbldAlertCo[] = []
}