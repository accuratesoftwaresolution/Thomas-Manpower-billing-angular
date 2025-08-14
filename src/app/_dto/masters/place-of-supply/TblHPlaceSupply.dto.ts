import { TbldPlaceSupplyCo } from "./TbldPlaceSupplyCo.dto";

export class TblHPlaceSupply {
    HPlaceSupply_SysID: number;
    HPlaceSupply_Code: string = null;
    HPlaceSupply_Name: string = null;
    HPlaceSupply_AcDe_Yn:string = "N";
    HPlaceSupply_AcDe_SysID: number = 0;
    HPlaceSupply_AcDe_Code: string = null;
    HPlaceSupply_AcDe_Name: string = null;
    TbldPlaceSupplyCo:TbldPlaceSupplyCo[] = []
  }
  