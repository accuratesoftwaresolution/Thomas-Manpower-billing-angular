import { TbldSalesOrgCo } from "./TbldSalesOrgCo.dto";

export class TblHSalesOrg {
    HSalesOrg_SysID: number;       // Sales Organization SysID
    HSalesOrg_Code: string =null;        // Sales Organization Code
    HSalesOrg_Name: string =null;         // Sales Organization Name
    HSalesOrg_AcDe_Yn: string="N";  // Activation & Deactivation (Y/N)
    HSalesOrg_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    HSalesOrg_AcDe_Code: string =null;    // Activation & Deactivation Code
    HSalesOrg_AcDe_Name: string =null;    // Activation & Deactivation Name
    TbldSalesOrgCo:TbldSalesOrgCo[] = []
  }
  