import { TblmDocAttach } from "./TblmDocAttach.dto";

export class TblHSingleCoDto {
    SingleCo_SysID: number;
    SingleCo_Code: string = null;
    SingleCo_Name: string = null;
    SingleCo_OthLang_Name: string = null;
    SingleCo_Address_One: string = null;
    SingleCo_Address_Two: string = null;
    SingleCo_Address_Three: string = null;
    SingleCo_Address_Four: string = null;
    SingleCo_Area_SysID: number = 0;
    SingleCo_Area_Code: string = null;
    SingleCo_Area_Name: string = null;
    SingleCo_City_SysID: number = 0;
    SingleCo_City_Code: string = null;
    SingleCo_City_Name: string = null;
    SingleCo_Count_SysID: number = 0;
    SingleCo_Count_Code: string = null;
    SingleCo_Count_Name: string = null;
    SingleCo_Phone: string = null;
    SingleCo_Fax: string = null;
    SingleCo_Email_Address: string = null;
    SingleCo_TINTRN: string = null;
    SingleCo_Date: Date = null;
    SingleCo_SecurityLvl: string = null;
    SingleCo_SuperUserPswd: string = null;
    SingleCo_HideUnautho: string = null;
    SingleCo_Template: string = null;
    SingleCo_FirstMast_SysID: number = 0;
    SingleCo_FirstTrans_SysID: number = 0;
    SingleCo_PnLAcc_SysID: number = 0;
    SingleCo_PnLAcc_Code: string = null;
    SingleCo_PnLAcc_Name: string = null;
    SingleCo_Logo: string = null;
    SingleCo_Allow_Amt: string = "N";
    SingleCo_Allow_AmtDays: string = "N";
    SingleCo_Insu_Amt: string = "N";
    SingleCo_Insu_AmtDays: string = "N";
    SingleCo_Block_Amt: string = "N";
    SingleCo_Block_AmtDays: string = "N";
    SingleCo_BillAllo_Method: string = null;
    SingleCo_Disp_LedgTrial: string = "N";
    SingleCo_Pay_DueDate: string = "N";
    SingleCo_Accmast_CRrLimit: string = null;
    SingleCo_NegStock_Check: string = null;
    SingleCo_NegCash_Check: string = "N";
    SingleCo_Inven_PostMethod: string = null;
    SingleCo_AccPosting_Inven: string = "N";
    SingleCo_Stock_Valuation: string = null;
    SingleCo_Stock_RateChange: string = "N";
    SingleCo_Stock_ProdAlert: string = "N";
    SingleCo_Stock_RatePerce: number = 0;
    SingleCo_BuyRate_ChaMes: string = null;
    SingleCo_BatStock_Items: string = "N";
    SingleCo_BatService_Items: string = "N";
    SingleCo_BatDupl_Yn: string = "N";
    SingleCo_BatExp_AllowYn: string = "N";
    SingleCo_BatExpAllow_NoDays: number = 0;
    SingleCo_Produ_MultiSele: string = "N";
    SingleCo_Group_SysID: number = 0;
    SingleCo_Group_Code: string = null;
    SingleCo_Group_Name: string = null;
    SingleCo_Creation_Date: Date = null;
    SingleCo_AcDe_Yn: string = "N";
    SingleCo_AcDe_SysID: number = 0;
    SingleCo_AcDe_Code: string = null;
    SingleCo_AcDe_Name: string = null;
    SingleCo_Refresh_Token: string = null;
    
    SingleCo_Salt: string = null;
    SingleCo_BatExpNotSell_Yn: string = "N";


    TblmDocAttach: TblmDocAttach[] = []






}
