export class TblVesDetailDto {
  ConBs_SysID: number = 0;
  ConBsS_SysID: number = 0; // Unique identifier for the container
  ConBs_Number?: number = 0; // Container Number
  ConBs_Type?: string = null; // Container Type
  ConBs_BL_Number?: number = 0; // BL Number
  ConBs_BL_Date: Date = null; // BL Date
  ConBs_Sailing_Date: Date = null; // Vessel Sailing Date
  ConBs_Free_Days?: number= 0; // Free Days
  ConBs_Arrival_Date: Date = null; // Arrival Date
  ConBs_Cutoff_Date: Date = null; // Cutoff Date
  ConBs_BOE_No?: string = null; // BOE Number
  ConBs_BOE_Date: Date = null; // BOE Date
  ConBs_Switch_No?: string = null; // Switch BL Number
  ConBs_Do_No?: string = null; // DO Number
  ConBs_Do_Date: Date = null; // DO Date
  ConBs_CArrival_Date: Date = null; // Container Arrival Date
  ConBs_OffLoad_Date: Date = null; // Containers Offload Date
  ConBs_Return_Date: Date = null; // Container Return Date
  ConBs_Alert_Date: Date = null; 
  
  ConBs_Emp_SysID: number = 0;
  ConBs_Emp_Code?: string = null; 
  ConBs_Emp_Name?: string = null; 
  ConBs_Emp_Email?: string = null; 

  ConBs_Alert_SysID: number = 0;
  ConBs_Alert_Code?: string = null; 
  ConBs_Alert_Name?: string = null; 
  ConBs_Alert_Stop_Yn?: string = null; 
}
