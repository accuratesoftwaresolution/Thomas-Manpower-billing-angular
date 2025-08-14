import { TbldOthCentreCo } from "./TbldOthCentreCo.dto";

export class TblHOthCentre {
    HOthCentre_SysID: number;       // Other Centre SysID
    HOthCentre_Code: string=null;        // Other Centre Code
    HOthCentre_Name: string=null;         // Other Centre Name
    HOthCentre_AcDe_Yn: string='N';    // Activation & Deactivation (Y/N)
    HOthCentre_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
    HOthCentre_AcDe_Code: string=null;    // Activation & Deactivation Code
    HOthCentre_AcDe_Name: string=null;    // Activation & Deactivation Name

    TbldOthCentreCo:TbldOthCentreCo[] = []
  }
  