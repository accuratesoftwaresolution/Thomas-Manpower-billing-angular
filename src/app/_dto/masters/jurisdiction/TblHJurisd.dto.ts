import { TbldJurisdCo } from "./TbldJurisdCo.dto";

export class TblHJurisd {
    HJurisd_SysID: number;
    HJurisd_Code: string =null;
    HJurisd_Name: string =null;
    HJurisd_AcDe_Yn:string="N";
    HJurisd_AcDe_SysID: number = 0;
    HJurisd_AcDe_Code: string =null;
    HJurisd_AcDe_Name: string =null;
    TbldJurisdCo :TbldJurisdCo[] = []
  }
  