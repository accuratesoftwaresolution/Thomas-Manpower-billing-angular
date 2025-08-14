import { bankdetailsdto } from "./bankdetails.dto";
import { calculationdetails } from "./calculationdetails.dto";
import { drivingdetails } from "./drivingdetails.dto";
import { emergencydetails } from "./emergencydetails.dto";
import { emiratedetails } from "./emiratedetails.dto";
import { insurancedetails } from "./insurancedetails.dto";
import { joiningdetailsdto } from "./joiningdetails.dto";
import { passportdetails } from "./passportdetails.do";
import { permanentaddressdto } from "./permenantaddress.dto";
import { presentaddressdto } from "./presentaddress.dto";
import { TbldEmplCo } from "./TbldEmplCo.dto";
import { TbldLeaveSum } from "./TbldLeaveSum.dto";
import { wpsdetails } from "./wpsdetails.dto";

export class TblHEmpl {
  HEmpl_SysID: number;
  HEmpl_Code: string = null;
  HEmpl_Name: string = null;

  HEmpl_Group_SysID: number = 0;
  HEmpl_Group_Code: string = null;
  HEmpl_Group_Name: string = null;

  HEmpl_Categ_SysID: number = 0;
  HEmpl_Categ_Code: string = null;
  HEmpl_Categ_Name: string = null;

  HEmpl_Modu_SysID: number = 0;
  HEmpl_Modu_Code: string = null;
  HEmpl_Modu_Name: string = null;

  HEmpl_Type_SysID: number = 0;
  HEmpl_Type_Code: string = null;
  HEmpl_Type_Name: string = null;

  HEmpl_Acc_SysID: number = 0;
  HEmpl_Acc_Code: string = null;
  HEmpl_Acc_Name: string = null;

  HEmpl_LPolicy_SysID: number = 0;
  HEmpl_LPolicy_Code: string = null;
  HEmpl_LPolicy_Name: string = null;
  HEmpl_AcDe_Yn: string = null;

  HEmpl_AcDe_SysID: number = 0;
  HEmpl_AcDe_Code: string = null;
  HEmpl_AcDe_Name: string = null;

  HAppl_PaySetup_SysID: number = 0;
  HAppl_PaySetup_Code: string = null;
  HAppl_PaySetup_Name: string = null;

  presentadressdto: presentaddressdto[] = []
  permanentaddressdto: permanentaddressdto[] = []
  emergencydetails: emergencydetails[] = []
  joiningdetailsdto: joiningdetailsdto[] = []
  bankdetailsdto: bankdetailsdto[] = []
  passportdetails: passportdetails[] = []
  emiratedetails: emiratedetails[] = []
  TbldLeaveSum: TbldLeaveSum[] = []
  drivingdetails: drivingdetails[] = []
  insurancedetails: insurancedetails[] = []
  wpsdetails: wpsdetails[] = []
  calculationdetails: calculationdetails[] = []
  applicableCo: TbldEmplCo[] = [];

}