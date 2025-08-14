import { TblDigdUserDetailDto } from "./tbldigiuserdetail.dto";

export class TblDigiHeadDto {
  Digh_SingleCo_SysID: number;
  Digh_SingleCo_Code: string;
  Digh_GroupCo_Code: string;
  Digh_Module_Code: string;
  Digh_Master_Code: string;
  Digh_Vou_Type: string;
  Digi_Vou_Number: string;
  Digi_Vou_Date: Date;
  Digh_Screen_No: string;
  Digh_Menu_Number: string;
  Digh_Log_Vou_No: string;
  Digh_Log_Date: Date;
  Digh_Log_Text: string;
  Digh_Printed_Yn: string;
  Digh_RePrinted_Yn: string;
  Digh_Checked_Yn: string;
  Digh_Recon_Yn: string;
  Digh_Posted_Yn: string;
  tblUserDetail ? : TblDigdUserDetailDto[] ;
}
