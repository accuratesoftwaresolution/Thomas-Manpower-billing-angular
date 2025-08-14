import { TbldEmpModuleCo } from "./TbldEmpModuleCo.dto";

export class TblHEmpModule {

    HEmpModule_SysID: number;
    HEmpModule_Code: string = null;
    HEmpModule_Name: string = null;
    HEmpModule_AcDe_Yn: string = "N";
    HEmpModule_AcDe_SysID: number = 0;
    HEmpModule_AcDe_Code: string = null;
    HEmpModule_AcDe_Name: string = null;

    TbldEmpModuleCo:TbldEmpModuleCo[]=[]
}