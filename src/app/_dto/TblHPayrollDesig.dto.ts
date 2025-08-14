import { TbldPayrollDesigCo } from "./TbldPayrollDesigCo.dto";


export class TblHPayrollDesig {

    HPayrollDesig_SysID: number;
    HPayrollDesig_Code: string = null;
    HPayrollDesig_Name: string = null;
    HPayrollDesig_AcDe_Yn: string = null;
    HPayrollDesig_AcDe_SysID: number = 0;
    HPayrollDesig_AcDe_Code: string = null;
    HPayrollDesig_AcDe_Name: string = null;
    TbldPayrollDesigCo: TbldPayrollDesigCo[] = []
}