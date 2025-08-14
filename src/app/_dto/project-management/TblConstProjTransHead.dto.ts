import { ConstBillStage } from "./ConstBillStage.dto";
import { ConstBudgCrea } from "./ConstBudgCrea.dto";
import { TblConstClientContact } from "./TblConstClientContact.dto";
import { TblConstCriteria } from "./TblConstCriteria.dto";
import { TblConstProjDetail } from "./TblConstProjDetail.dto";
import { TblConstSubPro } from "./TblConstSubPro.dto";
import { TblConstTask } from "./TblConstTask.dto";
import { TblConstValue } from "./TblConstValue.dto";
import { TbldConsProjCo } from "./TbldConsProjCo.dto";
import { TblOurConstContact } from "./TblOurConstContact.dto";

export class TblConstProjTransHead {
    Allh_SysID: number = 0;
    Allh_Vou_Number: number = 0;
    Allh_VouType_SysID: number = 0;
    Allh_Vou_Type: string = "";
    Allh_VouType_Name: string = "";
    Allh_SingleCo_SysID: number = 0;
    Allh_SingleCo_Code: string = "";
    Allh_SingleCo_Name: string = "";
    Allh_GroupCo_SysID: number = 0;
    Allh_GroupCo_Code: string = "";
    Allh_GroupCo_Name: string = "";
    Allh_Menu_SysID: number = 0;
    Allh_Menu_Code: string = "";
    Allh_Menu_Name: string = "";
    Allh_MidScreen_SysID: number = 0;
    Allh_MidScreen_Code: string = "";
    Allh_MidScreen_Name: string = "";
    Allh_Module_SysID: number = 0;
    Allh_Module_Code: string = "";
    Allh_Module_Name: string = "";
    Allh_UserLogin_SysID: number = 0;
    Allh_UserLogin_Code: string = "";
    Allh_UserLogin_Name: string = "";

    Allh_Curr_SysID: number = 0;
    Allh_Curr_Code: string = "";
    Allh_Curr_Name: string = "";
    Allh_Curr_Rate: number = 0;

    Allh_Narra_SysID: number = 0;
    Allh_Narra_Code: string = "";
    Allh_Narra_Name: string = "";
    Allh_Remark_SysID: number = 0;
    Allh_Remark_Code: string = "";
    Allh_Remark_Name: string = "";


    Allh_CProject_SysID: number = 0;
    Allh_CProject_Code: string = "";
    Allh_CProject_Name: string = "";
    Allh_CAraProject_Name: string = "";
    Allh_ProjPrio_SysID: number = 0;
    Allh_ProjPrio_Code: string = "";
    Allh_ProjPrio_Name: string = "";
    Allh_Client_SysID: number = 0;
    Allh_Client_Code: string = "";
    Allh_Client_Name: string = "";
    Allh_ProjType_SysID: number = 0;
    Allh_ProjType_Code: string = "";
    Allh_ProjType_Name: string = "";
    Allh_ProjStatus_SysID: number = 0;
    Allh_ProjStatus_Code: string = "";
    Allh_ProjStatus_Name: string = "";

    Allh_ProStart_Date: Date = null;
    Allh_ProEnd_Date: Date = null;
    Allh_ProMonth: Date = null;
    Allh_ProYear: Date = null;


    Allh_ProjComp_Status: string = "";


    // Allh_ProjBar_Code: string = ""; replaced with Allh_JobBar_Code
    // Allh_ProjQr_Code: string = ""; replaced with Allh_JobQR_Code

    Allh_JobQR_Code: string = "";
    Allh_JobBar_Code: string = "";


    Allh_FromLocation_SysID: number = 0;
    Allh_FromLocation_Code: string = "";
    Allh_FromLocation_Name: string = "";
    Allh_ToLocation_SysID: number = 0;
    Allh_ToLocation_Code: string = "";
    Allh_ToLocation_Name: string = "";
    Allh_Job_SysID: number = 0;
    Allh_Job_Code: string = "";
    Allh_Job_Name: string = "";
    Allh_EmplModu_SysID: number = 0;
    Allh_EmplModu_Code: string = "";
    Allh_EmplModu_Name: string = "";

    Allh_CostJob_SysID: number = 0;
    Allh_CostJob_Code: string = "";
    Allh_CostJob_Name: string = "";

    Allh_MasterAcDe_Yn: string = "";
    Allh_MasterAcDe_SysID: number = 0;
    Allh_MasterAcDe_Code: string = "";
    Allh_MasterAcDe_Name: string = "";

    TblConstProjDetail: TblConstProjDetail[] = []

    TbldConsProjCo: TbldConsProjCo[] = []

    TblConstClientContact: TblConstClientContact[] = [];

    TblOurConstContact: TblOurConstContact[] = [];

    TblConstCriteria: TblConstCriteria[] = [];

    TblConstValue: TblConstValue[] = []

    TblConstTask: TblConstTask[] = [];

    TblConstSubPro: TblConstSubPro[] = [];

    ConstBudgCrea: ConstBudgCrea[] = [];

    ConstBillStage: ConstBillStage[] = [];
}