import { TbldMAccGroupCo } from "./TbldMAccGroupCo.dto";

export class TblHMAccGroup {

    HMAccGroup_SysID: number;
    HMAccGroup_Code: string ="";
    HMAccGroup_Name: string ="";
    HMAccGroup_AcDe_Yn: string ="N";
    HMAccGroup_AcDe_SysID: number =0;
    HMAccGroup_AcDe_Code: string ="";
    HMAccGroup_AcDe_Name: string ="";

    TbldMAccGroupCo:TbldMAccGroupCo[] = []

}