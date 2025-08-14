import { TbldHPayDeduCo } from "./TbldHPayDeduCo.dto";

export class TblHPayDedu {
  HPayroll_Dedu_SysID: number;
  HPayroll_Dedu_Code: string = null;
  HPayroll_Dedu_Name: string = null;
  HPayroll_AcDe_Yn: string = "N";
  HPayroll_AcDe_SysID: number = 0;
  HPayroll_AcDe_Code: string = null;
  HPayroll_AcDe_Name: string = null;

  TbldHPayDeduCo: TbldHPayDeduCo[] = []
}