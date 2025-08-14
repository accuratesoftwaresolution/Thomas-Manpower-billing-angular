import { TbldVouTypeCoDto } from "./TbldVouTypeCo.dto";

export class TblHVouTypeDto {
  HVouType_SysID: number;         // Voucher Type SysID
  HVouType_Code: string = null;          // Voucher Type Code
  HVouType_Name: string = null;          // Voucher Type Name
  HVouType_Interco_Yn: string = "N";   // Voucher Type Inter Company (Y/N)
  HVouType_Start_Number: number = 0;  // Voucher Type Start Number
  HVouType_AcDe_Yn: string = "N";      // Activation & Deactivation (Y/N)
  HVouType_AcDe_SysID: number = 0;    // Activation & Deactivation SysID
  HVouType_AcDe_Code: string = null;     // Activation & Deactivation Code
  HVouType_AcDe_Name: string = null;     // Activation & Deactivation Name

  TbldVouTypeCo: TbldVouTypeCoDto[] = []
}
