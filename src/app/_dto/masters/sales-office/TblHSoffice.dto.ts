import { TbldSofficeCo } from "./TbldSofficeCo.dto";

export class TblHSoffice {
  HSoffice_SysID: number;
  HSoffice_Code: string = null;
  HSoffice_Name: string = null;
  HSoffice_AcDe_Yn:string = "N";
  HSoffice_AcDe_SysID: number = 0;
  HSoffice_AcDe_Code: string = null;
  HSoffice_AcDe_Name: string = null;
  
  TbldSofficeCo: TbldSofficeCo[] = []

}
