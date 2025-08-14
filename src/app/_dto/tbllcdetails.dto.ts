
export class TblLCDetailsDto {
    LCDs_SysID: number = 0;
    LCDSs_SysID: number = 0;

    LCDs_Flag: string = null;
    LCDs_Shipment_Date: Date = null;
    LCDs_Shipment_Amount: number = 0;
    LCDs_LastDate_Shipment: Date = null;
    LCDs_Expiry_Date: Date = null;
    LCDs_Alert_Date: Date = null;

    LCDs_Emp_SysID: number = 0;
    LCDs_Emp_Code: string = null;
    LCDs_Emp_Name: string = null;
    LCDs_Emp_Email: string = null;

    LCDs_Alert_SysID: number = 0;
    LCDs_AlertRep_Hrs: Date = null;
    LCDs_Alert_Code: string = null;
    LCDs_Alert_Name: string = null;
    LCDs_Alert_Stop_Yn: boolean = false;
}
