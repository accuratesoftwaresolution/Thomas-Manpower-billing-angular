export class TblHAppDateDto {
    HAppD_SysID: string; // Unique identifier for the system entry
    HAppD_Date_Code: string; // Code representing the date
    HAppD_Date_Name: string; // Name representing the date
    HAppD_Emp_Code: string; // Employee code
    HAppD_Emp_Name: string; // Employee name
    HAppD_Emp_Email: string; // Employee email address
    HAppD_Message_Code: string; // Code representing the message
    HAppD_Message_Name: string; // Name representing the message
    HAppD_Alert_Date: string; // Date for the alert
    HAppD_Email_Close: boolean; // Indicates if the email is closed
    HAppD_Message_Close: boolean; // Indicates if the message is closed
}
