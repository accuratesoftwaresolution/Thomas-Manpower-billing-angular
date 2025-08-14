import { TbldProfCentCo } from "./TbldProfCentCo.dto";

export class TblHProfCent {
    HProfCent_SysID: number;       // Profit Center SysID
    HProfCent_Code: string = null;        // Profit Center Code
    HProfCent_Name: string = null;        // Profit Center Name
    HProfCent_AcDe_Yn: string = 'N';     // Activation & Deactivation (Y/N)
    HProfCent_AcDe_SysID: number = 0;    // Activation & Deactivation SysID
    HProfCent_AcDe_Code: string = null;     // Activation & Deactivation Code
    HProfCent_AcDe_Name: string = null;    // Activation & Deactivation Name

    TbldProfCentCo :TbldProfCentCo[] =[]
  }
  