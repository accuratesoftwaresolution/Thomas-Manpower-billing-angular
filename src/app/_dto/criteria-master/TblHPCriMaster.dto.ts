import { TbldPCriMasterCo } from "./TbldPCriMasterCo.dto";

export class TblHPCriMaster{
    		
HPCriMaster_SysID		:number;
HPCriMaster_Code		:string = null;
HPCriMaster_Name		:string = null;
HPCriMaster_AcDe_Yn		:string = "N";
HPCriMaster_AcDe_SysID		:number;
HPCriMaster_AcDe_Code		:string = null;
HPCriMaster_AcDe_Name		:string = null;

TbldPCriMasterCo:TbldPCriMasterCo[] = []
}