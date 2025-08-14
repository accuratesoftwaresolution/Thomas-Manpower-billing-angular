import { TbldProdModuleCoDto } from "./tblProdModuleCo.dto";

export class TblHProdModuleDto{

  HProdModule_SysID :number ;

  HProdModule_Code: string;

  HProdModule_Name: string;

  tbldProdModuleCo ?: TbldProdModuleCoDto[]
}