import { TblDSalRateAgree } from "./TblDSalRateAgree.dto";
import { TblHSalRateAgreeCo } from "./TblHSalRateAgreeCo.dto";


export class TblHSalRateAgree {
  HSalAgree_SysID: number;
  HSalAgree_Code: string;
  HSalAgree_Name: string;
  HSalAgree_Cust_SysID: number;
  HSalAgree_Cust_Code: string;
  HSalAgree_Cus_Name: string;
  HSalAgree_Curr_SysID: number;
  HSalAgree_Curr_Code: string;
  HSalAgree_Curr_Name: string;
  HSalAgree_Curr_Rate: number;
  HSalAgree_From_Date: Date;
  HSalAgree_to_Date: Date;
  HSalAgree_AcDe_Yn: string = "N";
  HSalAgree_AcDe_SysID: number;
  HSalAgree_AcDe_Code: string;
  HSalAgree_AcDe_Name: string;

  tblDSalRateAgree: TblDSalRateAgree[] = [];

  tbldSalAgreeCo : TblHSalRateAgreeCo[] = [];


}
