import { TblDPurRateAgree } from "./TblDPurRateAgree.dto";
import { TblHPurRateAgreeCo } from "./TblHPurRateAgreeCo.dto";

export class TblHPurRateAgree {
     HPur_Agree_SysID :number;
    HPur_Agree_Code :string;
    HPur_Agree_Name :string;
    HPur_Agree_VenSysID :number;
    HPur_Agree_VenCode :string;
    HPur_Agree_VenName :string;
    HPur_Agree_CurrSysID :number;
    HPur_Agree_CurrCode :string;
    HPur_Agree_CurrName :string;
    HPur_Agree_CurrRate :number;
    HPur_Agree_From_Date :Date;
    HPur_Agree_to_Date :Date;
    HPur_Agree_AcDe_Yn :string = "N";
    HPur_Agree_AcDe_SysID :number;
    HPur_Agree_AcDe_Code :string;
    HPur_Agree_AcDe_Name :string;

  tblDPurRateAgree: TblDPurRateAgree[] = [];

  tbldPurRateAgreeCo: TblHPurRateAgreeCo[] = [];






}
