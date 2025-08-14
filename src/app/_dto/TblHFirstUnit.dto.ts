import { TbldFirstUnitCo } from "./TbldFirstUnitCo.dto";

export class TblHFirstUnit {
    HFirstUnit_SysID: number;
    HFirstUnit_Base_Unit: number=0;
    HFirstUnit_Unit_Frac: number = 0;
    HFirstUnit_Grid_Number: number=null;
    HFirstUnit_AcDe_Yn: string = "N";
    HFirstUnit_AcDe_SysID: number = 0;
    HFirstUnit_AcDe_Code: string = null;
    HFirstUnit_AcDe_Name: string = null;

    TbldFirstUnitCo: TbldFirstUnitCo[] = []
}