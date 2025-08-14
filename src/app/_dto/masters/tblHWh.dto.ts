import { TbldWhCo } from "../TbldWhCo.dto";

export class TblHWh {
  HWh_SysID: number;
  HWh_Code: string= null;
  HWh_Name:string= null;
 
  HWh_AcDe_Yn:string= "N";
  HWh_AcDe_SysID: number = 0;
  HWh_AcDe_Code:string= null;
  HWh_AcDe_Name:string= null;
  TbldWhCo :TbldWhCo[] = []

}