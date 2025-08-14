export class TblDLoginRightDto {
    DLogin_SysID: number;
    DLogin_Access: boolean = false;
    DLogin_Edit: boolean = false;
    DLogin_Delete: boolean = false;
    DLogin_Print: boolean = false;
    DLogin_Reprint: boolean = false;
    DLogin_EditDoc_OtherUser: boolean = false;
    DLogin_DocEdit_Checked: boolean = false;
    DLogin_DocEdit_Recon: boolean = false;
    DLogin_DocEdit_HighGroup: boolean = false;
    DLogin_CrLimit_Check: boolean = false;
    DLogin_TransLimit_Check: boolean = false;
    DLogin_Cash_Check: boolean = false;
    DLogin_PrePrint: boolean = false;
    DLogin_API: boolean = false;
    Dlogin_AlwSusp_Saving: boolean = false;
    DLogin_PrintLayout_Change: boolean = false;
    DLogin_Print_UnAuth: boolean = false;
    DLogin_Print_AcceLink: boolean = false;
    DLogin_CheqVoid: boolean = false;
    DLogin_CloseLink: boolean = false;
    Dlogin_UploadData: boolean = false;
    Dlogin_DownLoadData: boolean = false;
  }
  