import { TbldLeaveTypeCo } from "./TbldLeaveTypeCo.dto";

export class TblHLeaveType {
	HLeaveType_SysID: number;;
	HLeaveType_Code: string;
	HLeaveType_Name: string;
	HLeaveType_AcDe_Yn: string;
	HLeaveType_AcDe_SysID: number;
	HLeaveType_AcDe_Code: string;
	HLeaveType_AcDe_Name: string;

  TbldLeaveTypeCo: TbldLeaveTypeCo[] = [];


}