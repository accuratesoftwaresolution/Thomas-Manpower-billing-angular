import { TbldNarraMastCo } from "./TbldNarraMastCo.dto";

export class TblHNarraMast {
  HNarraMast_SysID      :   number ;
  HNarraMast_Code       :   string  = null;
  HNarraMast_Name       :   string  = null;
  HNarraMast_AcDe_Yn    :  string="N";
  HNarraMast_AcDe_SysID :   number  = 0;
  HNarraMast_AcDe_Code  :   string  = null;
  HNarraMast_AcDe_Name  :   string  = null;
  TbldNarraMastCo       :   TbldNarraMastCo[] = []
}
