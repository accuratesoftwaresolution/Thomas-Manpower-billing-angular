export class TblVesBookDto {
  VSsBooking_SysID: number = 0; // Vessel Booking SysID
  VSSsBooking_SysID: number = 0;
  VSsBRef_No: string = null; // Booking Reference No
  VSsBooking_Date: Date = null; // Vessel Booking Date

  VSsFactory_SysID: number = 0;
  VSsFactory_Code: string = null; // Factory Code
  VSsFactory_Name: string = null; // Factory Name

  VSsPlant_SysID: number = 0;
  VSsPlant_Code: string = null; // Production Plant Code
  VSsPlant_Name: string = null; // Production Plant Name

  VSsPickup_SysID: number = 0;
  VSsPickup_Code: string = null; // Pickup Point Code
  VSsPickup_Name: string = null; // Pickup Point Name

  VSsBAgent_SysID: number = 0;
  VSsPickup_Date: Date = null; // Pickup Date
  VSsBAgent_Code: string = null; // Booking Agent Code
  VSsBAgent_Name: string = null; // Booking Agent Name

  VSsLine_SysID: number = 0;
  VSsLine_Code: string = null; // Shipping Line Code
  VSsLine_Name: string = null; // Shipping Line Name

  VSsLPort_SysID: number = 0;
  VSsLPort_Code: string = null; // Loading Port Code
  VSsLPort_Name: string = null; // Loading Port Name


  VSsLoad_Date: Date = null; // Loading Date

  VSsTPort_SysID: number = 0;
  VSsTPort_Code: string = null; // Transit Port Code
  VSsTPort_Name: string = null; // Transit Port Name

  VSsPortDisch_SysID: number = 0;
  VSsPortDisch_Code: string = null; // Port of Discharge Code
  VSsPortDisch_Name: string = null; // Port of Discharge Name

  VSsCAgent_SysID: number = 0;
  VSsCAgent_Code: string = null; // Clearing Agent Code
  VSsCAgent_Name: string = null; // Clearing Agent Name

  VSsSwitch_SysID: number = 0;
  VSsSwitch_Code: string = null; // Switch BL Port Code
  VSsSwitch_Name: string = null; // Switch BL Port Name


  VSsSAgent_SysID: number = 0;
  VSsSAgent_Code: string = null; // Switch BL Agent Code
  VSsSAgent_Name: string = null; // Switch BL Agent Name


  VSsLoss_Reason: string = null; // Loss & Reason
  VSsNCR_Number: string = null; // NCR Number
  VSsNCR_Date: Date = null; // NCR Date
  VSsNCR_Suppl_Date: Date = null; // NCR issue to Supplier Date
  VSsNCR_Suppl_ClaimRec_Date: Date = null; // Supplier Claim Received Date
  VSsNCR_Suppl_ClaimClose_Date: Date = null; // NCR issue to Supplier Closed Date
  VSsNCR_Suppl_ClaimClose_Reason: string = null; // NCR issue to Supplier Reason for closing
  VSsNCR_Insu_Date: Date = null; // NCR issued to Insurance company Date
  VSsNCR_Insu_ClaimRec_Date: Date = null; // Insurance Claim Received Date
  VSsNCR_Insu_ClaimClose_Date: Date = null; // NCR issued to Insurance Company Closed Date
  VSsNCR_Insu_ClaimClose_Reason: string = null; // NCR issued to Insurance Reason for closing
  VSsTracking_Link: string = null; // Tracking Link
}
