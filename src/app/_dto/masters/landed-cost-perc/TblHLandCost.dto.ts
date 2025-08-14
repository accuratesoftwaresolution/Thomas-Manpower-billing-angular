import { TblDLandCost } from "./TblDLandCost.dto";
import { TbldLandCostCo } from "./TbldLandCostCo.dto";

export class TblHLandCost {
  HLmCost_SysID: number;
  HLmCost_Code: string;
  HLmCost_Name: string;
  HLmCost_Perce: number;
  HLmCost_AcDe_Yn: string = "N";
  HLmCost_AcDe_SysID: number;
  HLmCost_AcDe_Code: string;
  HLmCost_AcDe_Name: string;

  TblDLandCost: TblDLandCost[] = [];
  applicableCo: TbldLandCostCo[] = [];





}
