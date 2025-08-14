import { TbldCurrFirstCo } from "./TbldCurrFirstCo.dto";

export class TblHCurrFirst{
    HCurrFirst_SysID :number;
	HCurrFirst_Code:number = 0;
	HCurrFirst_Name:string = null;
	HCurrFirst_Symbol:number = null;
	HCurrFirst_Rate:number = null;
	HCurrFirst_Date:Date ;
	HCurrFirst_AcDe_Yn:string = "N";
	HCurrFirst_AcDe_SysID:number = 0;
	HCurrFirst_AcDe_Code:string= null;
	HCurrFirst_AcDe_Name :string = null;
	TbldCurrFirstCo :TbldCurrFirstCo[] = []
}