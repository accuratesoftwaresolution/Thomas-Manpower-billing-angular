import { TbldPGateNoCo } from "./TbldPGateNoCo.dto";

export class TblHPGateNo{
    		
HPGateNo_SysID		:number;
HPGateNo_Code		:string = null;
HPGateNo_Name		:string = null;
HPGateNo_AcDe_Yn		:string = "N";
HPGateNo_AcDe_SysID		:number = 0;
HPGateNo_AcDe_Code		:string = null;
HPGateNo_AcDe_Name		:string = null;
		
TbldPGateNoCo:TbldPGateNoCo[] = []
}