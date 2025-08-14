import { TbldAlertCoDto } from "./tbldAlertCo.dto";

export class TblAlertDto {
    HAlert_SysID: string; // Unique identifier for the alert
    HAlert_EmpCode: string; // Employee code associated with the alert
    HAlert_EmpName: string; // Employee name associated with the alert
    HAlert_Code: string; // Code representing the alert
    HAlert_Name: string; // Name or title of the alert
    HAlert_Email: string; // Email address associated with the alert
    tbldAlertCo ?: TbldAlertCoDto[];
}
