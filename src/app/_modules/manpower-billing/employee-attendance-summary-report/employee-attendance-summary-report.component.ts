import { Component, OnInit } from '@angular/core';
import { TbldPEmpMobCrit } from 'src/app/_dto/transaction-header-detail-singleco/TbldPEmpMobCrit.dto';
import { TblProjTransCriteria } from 'src/app/_dto/transaction-header-detail-singleco/TblProjTransCriteria.dto';
import { TblProjTransDetail } from 'src/app/_dto/transaction-header-detail-singleco/TblProjTransDetail.dto';
import { TblProjTransHead } from 'src/app/_dto/transaction-header-detail-singleco/TblProjTransHead.sto';

@Component({
  selector: 'app-employee-attendance-summary-report',
  templateUrl: './employee-attendance-summary-report.component.html',
  styleUrls: ['./employee-attendance-summary-report.component.scss']
})
export class EmployeeAttendanceSummaryReportComponent implements OnInit {


  showFilterOption: boolean = false

  LedgerAccountTable = [
    { timeCardSysID: 'TC001', employeeCode: 'EMP101', employeeName: 'John Doe', employeeModuleCode: 'MOD001', employeeModuleName: 'Payroll', jobCode: 'JOB123', jobName: 'Supervisor', designationCode: 'DES001', designationName: 'Engineer', manpowerDays: 22, totalWorkingDays: 26, attendancePerCamp: 21, remarkCode: 'RMK1', remarkName: 'On Time' },
    { timeCardSysID: 'TC002', employeeCode: 'EMP102', employeeName: 'Jane Smith', employeeModuleCode: 'MOD002', employeeModuleName: 'Logistics', jobCode: 'JOB456', jobName: 'Technician', designationCode: 'DES002', designationName: 'Assistant', manpowerDays: 20, totalWorkingDays: 26, attendancePerCamp: 19, remarkCode: 'RMK2', remarkName: 'Late' },
    { timeCardSysID: 'TC003', employeeCode: 'EMP103', employeeName: 'Alex King', employeeModuleCode: 'MOD003', employeeModuleName: 'Maintenance', jobCode: 'JOB789', jobName: 'Operator', designationCode: 'DES003', designationName: 'Foreman', manpowerDays: 18, totalWorkingDays: 26, attendancePerCamp: 17, remarkCode: 'RMK3', remarkName: 'Absent' },
    { timeCardSysID: 'TC004', employeeCode: 'EMP104', employeeName: 'Sara Lee', employeeModuleCode: 'MOD004', employeeModuleName: 'Construction', jobCode: 'JOB012', jobName: 'Welder', designationCode: 'DES004', designationName: 'Skilled', manpowerDays: 23, totalWorkingDays: 26, attendancePerCamp: 23, remarkCode: 'RMK4', remarkName: 'Good' },
    { timeCardSysID: 'TC005', employeeCode: 'EMP105', employeeName: 'Tom Brown', employeeModuleCode: 'MOD005', employeeModuleName: 'Electrical', jobCode: 'JOB345', jobName: 'Electrician', designationCode: 'DES005', designationName: 'Technician', manpowerDays: 24, totalWorkingDays: 26, attendancePerCamp: 24, remarkCode: 'RMK5', remarkName: 'Excellent' },
    { timeCardSysID: 'TC006', employeeCode: 'EMP106', employeeName: 'Nina Paul', employeeModuleCode: 'MOD006', employeeModuleName: 'Plumbing', jobCode: 'JOB678', jobName: 'Plumber', designationCode: 'DES006', designationName: 'Worker', manpowerDays: 21, totalWorkingDays: 26, attendancePerCamp: 20, remarkCode: 'RMK6', remarkName: 'Fair' },
    { timeCardSysID: 'TC007', employeeCode: 'EMP107', employeeName: 'Leo Mathew', employeeModuleCode: 'MOD007', employeeModuleName: 'HVAC', jobCode: 'JOB901', jobName: 'Technician', designationCode: 'DES007', designationName: 'Supervisor', manpowerDays: 26, totalWorkingDays: 26, attendancePerCamp: 25, remarkCode: 'RMK7', remarkName: 'Regular' },
    { timeCardSysID: 'TC008', employeeCode: 'EMP108', employeeName: 'Emily Davis', employeeModuleCode: 'MOD008', employeeModuleName: 'Admin', jobCode: 'JOB234', jobName: 'Assistant', designationCode: 'DES008', designationName: 'Admin', manpowerDays: 25, totalWorkingDays: 26, attendancePerCamp: 24, remarkCode: 'RMK8', remarkName: 'Punctual' },
    { timeCardSysID: 'TC009', employeeCode: 'EMP109', employeeName: 'Chris Ray', employeeModuleCode: 'MOD009', employeeModuleName: 'Transport', jobCode: 'JOB567', jobName: 'Driver', designationCode: 'DES009', designationName: 'Chauffeur', manpowerDays: 22, totalWorkingDays: 26, attendancePerCamp: 22, remarkCode: 'RMK9', remarkName: 'Consistent' },
    { timeCardSysID: 'TC010', employeeCode: 'EMP110', employeeName: 'Anna George', employeeModuleCode: 'MOD010', employeeModuleName: 'Catering', jobCode: 'JOB890', jobName: 'Cook', designationCode: 'DES010', designationName: 'Chef', manpowerDays: 24, totalWorkingDays: 26, attendancePerCamp: 23, remarkCode: 'RMK10', remarkName: 'Well Done' },
    { timeCardSysID: 'TC011', employeeCode: 'EMP111', employeeName: 'Vikram Sen', employeeModuleCode: 'MOD011', employeeModuleName: 'Security', jobCode: 'JOB321', jobName: 'Guard', designationCode: 'DES011', designationName: 'Watchman', manpowerDays: 26, totalWorkingDays: 26, attendancePerCamp: 26, remarkCode: 'RMK11', remarkName: 'Full Attendance' },
    { timeCardSysID: 'TC012', employeeCode: 'EMP112', employeeName: 'Tina Roy', employeeModuleCode: 'MOD012', employeeModuleName: 'IT', jobCode: 'JOB654', jobName: 'Support', designationCode: 'DES012', designationName: 'IT Support', manpowerDays: 25, totalWorkingDays: 26, attendancePerCamp: 25, remarkCode: 'RMK12', remarkName: 'Tech Support' },
    { timeCardSysID: 'TC013', employeeCode: 'EMP113', employeeName: 'George Abraham', employeeModuleCode: 'MOD013', employeeModuleName: 'Warehouse', jobCode: 'JOB987', jobName: 'Loader', designationCode: 'DES013', designationName: 'Labour', manpowerDays: 19, totalWorkingDays: 26, attendancePerCamp: 18, remarkCode: 'RMK13', remarkName: 'Needs Improvement' },
    { timeCardSysID: 'TC014', employeeCode: 'EMP114', employeeName: 'Priya Das', employeeModuleCode: 'MOD014', employeeModuleName: 'Cleaning', jobCode: 'JOB111', jobName: 'Cleaner', designationCode: 'DES014', designationName: 'Janitor', manpowerDays: 23, totalWorkingDays: 26, attendancePerCamp: 22, remarkCode: 'RMK14', remarkName: 'Clean Work' },
    { timeCardSysID: 'TC015', employeeCode: 'EMP115', employeeName: 'David Kumar', employeeModuleCode: 'MOD015', employeeModuleName: 'Project', jobCode: 'JOB222', jobName: 'Analyst', designationCode: 'DES015', designationName: 'Consultant', manpowerDays: 26, totalWorkingDays: 26, attendancePerCamp: 26, remarkCode: 'RMK15', remarkName: 'Top Performer' },
    { timeCardSysID: 'TC016', employeeCode: 'EMP116', employeeName: 'Meera Joshi', employeeModuleCode: 'MOD016', employeeModuleName: 'Training', jobCode: 'JOB333', jobName: 'Trainer', designationCode: 'DES016', designationName: 'Coach', manpowerDays: 24, totalWorkingDays: 26, attendancePerCamp: 24, remarkCode: 'RMK16', remarkName: 'Efficient' },
    { timeCardSysID: 'TC017', employeeCode: 'EMP117', employeeName: 'Rohan Iyer', employeeModuleCode: 'MOD017', employeeModuleName: 'Finance', jobCode: 'JOB444', jobName: 'Accountant', designationCode: 'DES017', designationName: 'Finance Exec', manpowerDays: 25, totalWorkingDays: 26, attendancePerCamp: 25, remarkCode: 'RMK17', remarkName: 'Accurate' },
    { timeCardSysID: 'TC018', employeeCode: 'EMP118', employeeName: 'Sneha Patil', employeeModuleCode: 'MOD018', employeeModuleName: 'Legal', jobCode: 'JOB555', jobName: 'Lawyer', designationCode: 'DES018', designationName: 'Legal Advisor', manpowerDays: 22, totalWorkingDays: 26, attendancePerCamp: 22, remarkCode: 'RMK18', remarkName: 'Precise' },
    { timeCardSysID: 'TC019', employeeCode: 'EMP119', employeeName: 'Amit Shah', employeeModuleCode: 'MOD019', employeeModuleName: 'Support', jobCode: 'JOB666', jobName: 'Support Exec', designationCode: 'DES019', designationName: 'Support Staff', manpowerDays: 21, totalWorkingDays: 26, attendancePerCamp: 20, remarkCode: 'RMK19', remarkName: 'Supportive' },
    { timeCardSysID: 'TC020', employeeCode: 'EMP120', employeeName: 'Kavya Nair', employeeModuleCode: 'MOD020', employeeModuleName: 'Operations', jobCode: 'JOB777', jobName: 'Manager', designationCode: 'DES020', designationName: 'Ops Manager', manpowerDays: 26, totalWorkingDays: 26, attendancePerCamp: 26, remarkCode: 'RMK20', remarkName: 'Outstanding' }
  ];

  ShowPopUp() {

  }
  TblProjTransHead: TblProjTransHead = new TblProjTransHead()

  selectedLinkRecords: any;

  companyName: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress1: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress2: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress3: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  companyAddress4: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  phone: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxx';
  fax: string = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  TrnNumber: any = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';


  constructor() { }

  ngOnInit(): void {

    this.TblProjTransHead.TblProjTransCriteria.push(new TblProjTransCriteria())
    this.TblProjTransHead.TblProjTransDetail.push(new TblProjTransDetail())
    this.TblProjTransHead.TbldPEmpMobCrit.push(new TbldPEmpMobCrit())

  }

}