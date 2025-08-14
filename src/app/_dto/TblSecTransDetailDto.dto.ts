export class TblSecTransDetailDto {

    Alld_SecSysID: number = 0;
    AlldS_SecSysID: number = 0;

    Alld_FixAssJv_SysID: number = 0;
    Alld_FixAssJv_Code: string = null;
    Alld_FixAssJv_Name: string = null;

    Alld_Payr_SysID: number = 0;
    Alld_Payr_Code: string = null;
    Alld_Payr_Name: string = null;

    Alld_PayrNarra_SysID: number = 0;
    Alld_PayrNarra_Code: string = null;
    Alld_PayrNarra_Name: string = null;

    Alld_Module_SysID: number = 0;
    Alld_Module_Code: string = null;
    Alld_Module_Name: string = null;

    Alld_SalAdd_SysID: number = 0; //Added to fisrt detail table
    Alld_SalAdd_Code: string = null; //Added to fisrt detail table
    Alld_SalAdd_Name: string = null; //Added to fisrt detail table

    Alld_SalDedu_SysID: number = 0;
    Alld_SalDedu_Code: string = null;
    Alld_SalDedu_Name: string = null;

    Alld_BOMProdPro_SysID: number = 0;
    Alld_BOMProdPro_Code: string = null;
    Alld_BOMProdPro_Name: string = null;

    Alld_BOMProdModu_SysID: number = 0; //Added to fisrt detail table
    Alld_BOMProdModu_Code: string = null; //Added to fisrt detail table
    Alld_BOMProdModu_Name: string = null; //Added to fisrt detail table

    Alld_BOMMan_SysID: number = 0;
    Alld_BOMMan_Code: string = null;
    Alld_BOMMan_Name: string = null;

    Alld_ManPowModu_SysID: number = 0; //Added to fisrt detail table
    Alld_ManPowModu_Code: string = null; //Added to fisrt detail table
    Alld_ManPowModu_Name: string = null; //Added to fisrt detail table

    Alld_BOMJob_SysID: number = 0;
    Alld_BOMJob_Code: string = null;
    Alld_BOMJob_Name: string = null;

    Alld_BOMEmp_SysID: number = 0; //Added to fisrt detail table
    Alld_BOMEmp_Code: string = null; //Added to fisrt detail table
    Alld_BOMEmp_Name: string = null; //Added to fisrt detail table

    Alld_BOMEmpModu_SysID: number = 0;
    Alld_BOMEmpModu_Code: string = null;
    Alld_BOMEmpModu_Name: string = null;

    Alld_Asset_SysID: number = 0;
    Alld_Asset_Code: string = null;
    Alld_Asset_Name: string = null;

    Alld_FixAss_SysID: number = 0;
    Alld_FixAss_Code: string = null;
    Alld_FixAss_Name: string = null;

    Alld_PayrAdd_SysID: number = 0;
    Alld_PayrAdd_Code: string = null;
    Alld_PayrAdd_Name: string = null;

    Alld_PayrAccAdd_SysID: number = 0;
    Alld_PayrAccAdd_Code: string = null;
    Alld_PayrAccAdd_Name: string = null;

    Alld_PayrAccDed_SysID: number = 0;
    Alld_PayrAccDed_Code: string = null;
    Alld_PayrAccDed_Name: string = null;

    Alld_PayrDed_SysID: number = 0;
    Alld_PayrDed_Code: string = null;
    Alld_PayrDed_Name: string = null;

    Alld_LPolicy_SysID: number = 0;
    Alld_LPolicy_Code: string = null;
    Alld_LPolicy_Name: string = null;

    ///these below are availble in both detail


    Alld_LType_SysID: number = 0;
    Alld_LType_Code: string = null;
    Alld_LType_Name: string = null;

    Alld_LeaSum_SysID: number = 0;
    Alld_LeaSum_Code: string = null;
    Alld_LeaSum_Name: string = null;

    Alld_Empl_SysID: number = 0;
    Alld_Empl_Code: string = null;
    Alld_Empl_Name: string = null;

    Alld_SalEmpl_SysID: number = 0;
    Alld_SalEmpl_Code: string = null;
    Alld_SalEmpll_Name: string = null;


    ///these above are availble in both detail


    Alld_EmplModu_SysID: number = 0;
    Alld_EmplModu_Code: string = null;
    Alld_EmplModu_Name: string = null;

    Alld_BOMProdPro_SlNo: string = null;
    Alld_BOMFinishPro_SlNo: string = null;

    Alld_BOMMan_Hrs: number = 0;
    Alld_BOMMan_Rate: number = 0;
    Alld_BOMMan_Amount: number = 0;

    Alld_BOMEmp_FromDate: Date = null;
    Alld_BOMEmp_ToDate: Date = null;
    Alld_BOMEmp_FromHrs: number = 0;
    Alld_BOMEmp_ToHrs: number = 0;
    Alld_BOMEmp_EstHrs: number = 0;
    Alld_BOMEmp_ActuHrs: number = 0;

    Alld_BOMProdMat_yn: string = null;
    Alld_BOMProdConsu_yn: string = null;
    Alld_BOMProdPack_yn: string = null;
    Alld_BOMProdManPow_yn: string = null;
    Alld_BOMProdScrap_yn: string = null;
    Alld_BOMProdExp_yn: string = null;
    Alld_BOMProdQaQc_yn: string = null;
    Alld_BOMFinishProd_yn: string = null;

    Alld_Asset_Unit: string = null;
    Alld_Asset_Qty: number = 0;
    Alld_AssetNonFin_Qty: number = 0;
    Alld_Asset_Rate: number = 0;
    Alld_AssetBatch_SysID: number = 0;
    Alld_Asset_Batch: string = null;
    Alld_Asset_ProdDate: Date = null;
    Alld_Asset_ExpDate: Date = null;
    Alld_Asset_NextDep_Date: Date = null;

    Alld_FixAss_Months: number = 0;
    Alld_FixAss_Date: Date = null;
    Alld_FixAssExp_Amount: number = 0;
    Alld_FixJvType_SysID: number = 0;
    Alld_FixJvType: string = null;
    Alld_FixAssJv_Number: string = null;
    Alld_FixAssNext_StartDate: Date = null;
    Alld_FixAssAlloPay_yn: string = null;

    Alld_LStart_Date: Date = null;
    Alld_LEnd_Date: Date = null;
    Alld_Leave_Days: number = 0;
    Alld_LDed_WithPay: number = 0;
    Alld_LDed_WithoutPay: number = 0;

    Alld_PropLStart_Date: Date = null;
    Alld_PropLEnd_Date: Date = null;
    Alld_PropJoin_Date: Date = null;
    Alld_PropLeave_Days: number = 0;
    Alld_PropLDed_WithPay: number = 0;
    Alld_PropLDed_WithoutPay: number = 0;

    Alld_AppLStart_Date: Date = null;
    Alld_AppLEnd_Date: Date = null;
    Alld_AppLeave_Days: number = 0;
    Alld_AppLDed_WithPay: number = 0;
    Alld_AppLDed_WithoutPay: number = 0;

    Alld_Rejoin_Date: Date = null;
    Alld_RejoinLeave_Days: number = 0;
    Alld_Rejoin_WithPay: number = 0;
    Alld_Rejoin_WithoutPay: number = 0;

    Alld_LeaSum_GridSysID: number = 0;
    Alld_LeaSum_NoDays: number = 0;
    Alld_LeaSum_AvailDays: number = 0;
    Alld_LeaSum_UsedDays: number = 0;
    Alld_LeaSum_BalDays: number = 0;

    Alld_Work_Days: number = 0;
    Alld_LeaveWith_Pay: number = 0;
    Alld_LeaveWithOut_Pay: number = 0;
    Alld_Total_Days: number = 0;
    Alld_LeavePaid_Days: number = 0;
    Alld_LeaveUnPaid_Days: number = 0;

    Alld_OT_Hrs: number = 0;
    Alld_Sal_Month: Date = null;
    Alld_Sal_Year: Date = null;

    Alld_BomBatch_SysID: number = 0;
    Alld_BomBatch_Code: string = null;
    Alld_BomBatch_Name: string = null;


    /// ADDED FROM FISRT DETAIL TABLE 

    Alld_Remark_SysID: number = 0;
    Alld_Remark_Code: string = null;
    Alld_Remark_Name: string = null;

    selected?: boolean = false;
 
    /////////////////////////////////

}