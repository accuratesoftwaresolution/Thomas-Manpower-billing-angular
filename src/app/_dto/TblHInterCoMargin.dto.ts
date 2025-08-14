import { TbldInterCoMarginCo } from "./TbldInterCoMarginCo.dto";

export class TblHInterCoMargin {

    HInterCoMargin_SysID: number;
    HInterCoMargin_Code: string;
    HInterCoMargin_Name: string;
    HInterCoMargin_Perce: number;
    HInterCo_AcDe_Yn: string ="N ";
    HInterCo_AcDe_SysID: number;
    HInterCo_AcDe_Code: string;
    HInterCo_AcDe_Name: string;

    TbldInterCoMarginCo:TbldInterCoMarginCo[]=[]

}