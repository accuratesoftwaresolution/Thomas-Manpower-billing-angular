import { TbldAccTypeCo } from "./TbldAccTypeCo.dto";


export class TblHAccType {
    HAccType_SysID: number;       // Account Type SysID
    HAccType_Code: string =null;        // Account Type Code
    HAccType_Name: string =null;    // Account Type Name
    HAccType_AcDe_Yn:string = 'N';   // Activation & Deactivation (Y/N)
    HAccType_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    HAccType_AcDe_Code: string =null;   // Activation & Deactivation Code
    HAccType_AcDe_Name: string =null;   // Activation & Deactivation Name
    TbldAccTypeCo :TbldAccTypeCo[] = []
  }
  