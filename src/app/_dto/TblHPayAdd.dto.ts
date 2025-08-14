import { TbldHPayAddCo } from "./TbldHPayAddCo.dto";

export class TblHPayAdd{
    HPayroll_Add_SysID: number;
    HPayroll_Add_Code: string =null;
    HPayroll_Add_Name: string =null;
    HPayroll_AcDe_Yn: string ="N";
    HPayroll_AcDe_SysID: number = 0;
    HPayroll_AcDe_Code: string =null;
    HPayroll_AcDe_Name: string =null;

    TbldHPayAddCo :TbldHPayAddCo[] = []
}