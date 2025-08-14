import { TblDigdUserDetailDto } from "./tbldigiuserdetail.dto";

export class TbldTranDigiLock {
    // Primary and Foreign Keys (typically numeric IDs)
    DigiAllh_SysID: number;
    DigiAllh_VouType_SysID: number = 0;
    DigiAllh_SingleCo_SysID: number = 0;
    DigiAllh_GroupCo_SysID: number = 0;
    DigiAllh_Menu_SysID: number = 0;
    DigiAllh_MidScreen_SysID: number = 0;
    DigiAllh_FirstMast_SysID: number = 0;
    DigiAllh_FirstTrans_SysID: number = 0;

    // Codes (usually short alphanumeric strings)
    DigiAllh_Vou_Type: string = null;
    DigiAllh_SingleCo_Code: string = null;
    DigiAllh_GroupCo_Code: string = null;
    DigiAllh_Menu_Code: string = null;
    DigiAllh_MidScreen_Code: string = null;

    // Names (text strings)
    DigiAllh_VouType_Name: string = null;
    DigiAllh_SingleCo_Name: string = null;
    DigiAllh_GroupCo_Name: string = null;
    DigiAllh_Menu_Name: string = null;
    DigiAllh_MidScreen_Name: string = null;

    // Flags (true/false)
    DigiAllh_Flag: boolean;
    DigiAllh_Flag_Suspend: boolean;
    DigiAllh_Flag_Authorize: boolean;
    DigiAllh_Flag_Reject: boolean;
    DigiAllh_Flag_Approve: boolean;
    DigiAllh_Flag_Posting: boolean;

    // Last Numbers (likely numeric counters)
    DigiAllh_lastTrans_SysID: number = 0;
    DigiAllh_LastMast_LastNo: number = 0;
    DigiAllh_LastTrans_LastNo: number = 0;

    // Dates
    DigiAllh_Vou_Date: Date = null;
    Digh_Log_Date: Date = null;

    // Log Info
    Digh_Log_Text: string = null;

    // Print/Check/Reconciliation Flags
    Digh_Printed_Yn: string = "N";
    Digh_RePrinted_Yn: string = "N";
    Digh_Checked_Yn: string = "N";
    Digh_Recon_Yn: string = "N";
    Digh_Posted_Yn: string = "N";

    TblDigdUserDetail: TblDigdUserDetailDto[] = [new TblDigdUserDetailDto()]

}