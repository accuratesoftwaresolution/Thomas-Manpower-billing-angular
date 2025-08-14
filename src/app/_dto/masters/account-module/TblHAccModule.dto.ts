import { TbldAccModuleCo } from "./TbldAccModuleCo.dto";


export class TblHAccModule {
  HAccModule_SysID: number;       // Account Module SysID
  HAccModule_Code: string = null;        // Account Module Code
  HAccModule_Name: string = null;        // Account Module Name
  HAccModule_AcDe_Yn: string = 'N'    // Activation & Deactivation (Y/N)
  HAccModule_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
  HAccModule_AcDe_Code: string = null;   // Activation & Deactivation Code
  HAccModule_AcDe_Name: string = null;   // Activation & Deactivation Name
  TbldAccModuleCo: TbldAccModuleCo[] = []
}
