import { gratuitypolicydetail } from "./gratuitypolicydetail.dto";
import { leavepolicydetail } from "./leavepolicydetail.dto";
import { leavesalary } from "./leavesalary.dto";
import { payrollsetupdetail } from "./payrollsetupdetail.dto";

export class TblHPaySetup {
  HPayroll_SysID: number;
  HPayroll_Code: string;
  HPayroll_Name: string;
  HPayroll_DesGroup_SysID: number;
  HPayroll_DesGroup_Code: string;
  HPayroll_DesGroup_Name: string;
  HPayroll_Narra_SysID: number;
  HPayroll_Narra_Code: string;
  HPayroll_Narra_Name: string;


  payrollsetupdetail: payrollsetupdetail[] = [new payrollsetupdetail(), new payrollsetupdetail(), new payrollsetupdetail()]
  gratuitypolicydetail: gratuitypolicydetail[] = [new gratuitypolicydetail(), new gratuitypolicydetail(), new gratuitypolicydetail()]
  leavesalary: leavesalary []= [new leavesalary()]

}