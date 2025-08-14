import { TbldInterCoMessCo } from "./TbldInterCoMessCo.dto";

export class TblHInterCoMess {

    HInterCoMess_SysID: number;
    HInterCoMess_Code: string;
    HInterCoMess_Name: string;
    HInterCoMess_AcDe_Yn: string;
    HInterCoMess_AcDe_SysID: number;
    HInterCoMess_AcDe_Code: string;
    HInterCoMess_AcDe_Name: string;

    TbldInterCoMessCo: any[] = [new TbldInterCoMessCo()];


}