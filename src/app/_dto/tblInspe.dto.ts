export class TblInspeDto {


  QCs_SysID: number = 0;
  QCsS_SysID: number = 0;

  QCs_Prod_SysID: number = 0;
  QCs_Prod_Code: string = null;
  QCs_Prod_Name: string = null;
  QCs_Prod_LName: string = null;

  QCs_Accepted_Qty: number = 0;
  QCs_Rejected_Qty: number = 0;
  QCs_Total_Qty: number = 0;
  QCs_Reject_Reason: string = null;
  QCs_Action_Required: string = null;
  QCs_Ncr_Number: string = null;
  QCs_Ncr_Date: Date = null;
  QCs_Action_Taken: string = null;
  QCs_Ncr_Closing_Date: Date = null;
  QCs_InspeCompl_Yn: string = null;
  Qcs_Alert_Date: Date = null;


  Qcs_Emp_SysID: number = 0;
  Qcs_Emp_Code: string = null;
  Qcs_Emp_Name: string = null;
  Qcs_Emp_Email: string = null;


  Qcs_Alert_SysID: number = 0;
  Qcs_Alert_Code: string = null;
  Qcs_Alert_Name: string = null;
  Qcs_Alert_Stop_Yn: string = null;
}
