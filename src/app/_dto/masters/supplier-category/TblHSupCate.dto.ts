import { TbldSupCateCoDto } from "./TbldSupCateCo.dto";

export class TblHSupCateDto {
    HSupCate_SysID: number;       // Supplier Category SysID
    HSupCate_Code: string = null;        // Supplier Category Code
    HSupCate_Name: string = null;        // Supplier Category Name
    HSupCate_AcDe_Yn: string="N" ;    // Activation & Deactivation (Y/N)
    HSupCate_AcDe_SysID: number=0; // Activation & Deactivation SysID
    HSupCate_AcDe_Code: string = null;   // Activation & Deactivation Code
    HSupCate_AcDe_Name: string = null;   // Activation & Deactivation Name

    TbldSupCateCo :TbldSupCateCoDto [] = []
  }
  