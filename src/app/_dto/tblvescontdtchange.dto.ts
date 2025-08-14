export class TblVesContDtChangeDto {

  ConBsC_SysID: number = 0;
  ConBsCS_SysID: number = 0;

  ConBsC_Number?: string = null; 
  ConBsC_Org_Date?: Date= null;  
  ConBsC_Change_Date?: Date= null;  
  ConBsC_Change_Reason?: string = null; 
  ConBsC_Alert_Date?: Date= null; 
  
  
  ConBsC_Emp_SysID: number = 0;
  ConBsC_Emp_Code?: string = null; 
  ConBsC_Emp_Name?: string = null; 
  ConBsC_Emp_Email?: string = null; 
  
  
  ConBsC_Alert_SysID: number = 0;
  ConBsC_Alert_Code?: string = null; 
  ConBsC_Alert_Name?: string = null; 
  ConBsC_Alert_Stop_Yn?: string = null; 
}
