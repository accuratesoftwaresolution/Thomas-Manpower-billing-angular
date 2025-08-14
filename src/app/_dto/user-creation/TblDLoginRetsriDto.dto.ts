export class TblDLoginRetsriDto {
    DLog_SysID: number;
    DLog_Start_Date: Date;        
    DLog_End_Date: Date;          
    DLog_Start_Time: string;         
    DLog_End_Time: string;
    DLog_Pass_Expire: boolean;       
    DLog_PassExpire_Date: Date;
    DLog_UserLock_Code: string;
    DLog_UserLock_Name: string;
    DLog_Blocked_Report: boolean;    // checkbox
    DLog_PassChange_NextLogin: boolean;
  }