import { ProductModuleCompanyDto } from "./TbldProdModuleCo.dto";

export class ProductModuleDto {
  HProdModule_SysID: number;       // Product Module SysID
  HProdModule_Code: string = null       // Product Module Code
  HProdModule_Name: string = null       // Product Module Name
  HProdModule_AcDe_Yn: string = "N";    // Activation & Deactivation (Y/N)
  HProdModule_AcDe_SysID: number = 0;  // Activation & Deactivation SysID
  HProdModule_AcDe_Code: string = null  // Activation & Deactivation Code
  HProdModule_AcDe_Name: string = null  // Activation & Deactivation Name

  TbldProdModuleCo: ProductModuleCompanyDto[] = []
}
