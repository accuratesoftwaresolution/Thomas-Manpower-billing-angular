import { TbldPayTermCo } from "../TbldPayTermCo.dto";

export class TblHPayTerm {

    HPayTerm_SysID: number;
    HPayTerm_Code: string;
    HPayTerm_Name: string;
    HPayTerm_Days: number;
    HPayTerm_AcDe_Yn: string
    HPayTerm_AcDe_SysID: number;
    HPayTerm_AcDe_Code: string;
    HPayTerm_AcDe_Name: string;
    TbldPayTermCo:TbldPayTermCo[] =[]


}