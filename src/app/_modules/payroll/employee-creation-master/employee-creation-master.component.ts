import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { bankdetailsdto } from 'src/app/_dto/bankdetails.dto';
import { calculationdetails } from 'src/app/_dto/calculationdetails.dto';
import { drivingdetails } from 'src/app/_dto/drivingdetails.dto';
import { emergencydetails } from 'src/app/_dto/emergencydetails.dto';
import { emiratedetails } from 'src/app/_dto/emiratedetails.dto';
import { insurancedetails } from 'src/app/_dto/insurancedetails.dto';
import { joiningdetailsdto } from 'src/app/_dto/joiningdetails.dto';
import { passportdetails } from 'src/app/_dto/passportdetails.do';
import { permanentaddressdto } from 'src/app/_dto/permenantaddress.dto';
import { presentaddressdto } from 'src/app/_dto/presentaddress.dto';
import { TbldEmplCo } from 'src/app/_dto/TbldEmplCo.dto';
import { TbldLeaveSum } from 'src/app/_dto/TbldLeaveSum.dto';
import { TblDocAttachDto } from 'src/app/_dto/tbldocattch.dto';
import { TblHEmpl } from 'src/app/_dto/TblHEmpl.dto';
import { wpsdetails } from 'src/app/_dto/wpsdetails.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { SalesService } from 'src/app/_providers/sales.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-employee-creation-master',
  templateUrl: './employee-creation-master.component.html',
  styleUrls: ['./employee-creation-master.component.scss']
})
export class EmployeeCreationMasterComponent implements OnInit {

  TblHEmpl: TblHEmpl = new TblHEmpl()

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showEmployeemasterList: boolean = false



  activeIndex: number = 0;

  selectedRow: any;
  product: any[] = [];


  tableIndex: any;

  scrollableTabs: any[] = [
    { id: 0, title: "Present Address", content: "", visible: true },
    { id: 1, title: "Permanent Address", content: "Content for Other Expenses", visible: true },
    { id: 2, title: "Emergency Details ", content: "", visible: true }, // Hidden tab example
    { id: 3, title: "Joining Details", content: "", visible: true },
    { id: 4, title: "Bank Details", content: "Content for Tax", visible: true },
    { id: 5, title: "Passport details ", content: "", visible: true }, // Hidden tab example
    { id: 6, title: "Emirates ID Details", content: "", visible: true },
    { id: 7, title: "Driving Details", content: "Content for Tax", visible: true },
    { id: 8, title: "Insurance Details", content: "", visible: true },
    { id: 9, title: "WPS File", content: "Content for Tax", visible: true },
    { id: 10, title: "Calculation Stop Details", content: "Content for Tax", visible: true },
    { id: 11, title: "Document Attachment", content: "Content for Tax", visible: true },




  ];
  TableData = [

    { field: 'LeaveSummaryGridSysID', header: 'Leave Summary  Grid SysID', hide: false, mandatory: false, width: '8rem', data: "12345", manual: false, bind: "DLSum_SysID", type: 'text', readOnly: true },
    { field: 'EmployeeSysID', header: 'Employee SysID', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, PopUp: false, bind: "DLSum_Emp_SysID", type: 'text' },
    { field: 'EmployeeCode', header: 'Employee Code', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, PopUpData: 'EmployeeCode', bind: "DLSum_Emp_Code", type: 'text' },
    { field: 'EmployeeName', header: 'Employee Name', hide: false, mandatory: false, width: '16rem', data: '123456789123456789123456789', manual: false, bind: "DLSum_Emp_Name", type: 'text' },
    { field: 'JoiningDate', header: 'Joining Date', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "DLSum_Join_Date", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { field: 'TerminationDate', header: 'Termination Date', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DLSum_Term_Date", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'date' },
    { field: 'LastDayofWorking', header: 'Last Day of Working', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DLSum_LastWork_Date", affects: ['Alld_Gross_Amount', 'Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'CalculationDate', header: 'Calculation Date', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DLSum_Calcu_Date", readOnly: false, align: 'left', type: 'date' },
    { field: 'NumberofLeaveSalaryDays', header: 'Number of Leave Salary  Days', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DLSum_Lsal_Days", affects: ['Alld_Net_Amount'], align: 'left', type: 'number' },
    { field: 'NumberofLeaveSalaryUsedDays', header: 'Number of Leave Salary  Used Days', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DLSum_LsalUsed_Days", readOnly: true, align: 'left', type: 'number' },
    { field: 'NumberofLeaveSalaryBalanceDays', header: 'Number of Leave Salary  Balance  Days', hide: false, mandatory: false, width: '7rem', data: '123456789', manual: false, bind: "DLSum_LsalBal_Days", type: 'number' },
    { field: 'LeaveSummaryReports', header: 'Leave Summary Reports', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, PopUp: true, PopUpData: 'SummaryDetail', type: 'text' },
    { field: 'NumberofGratuityDays', header: 'Number of Gratuity Days', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "DLSum_Gratu_Days", type: 'text' },
    { field: 'NumberofGratuityUsedDays', header: 'Number of Gratuity Used Days', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "DLSum_GratuUsed_Days", type: 'text' },
    { field: 'NumberofGratuityBalanceDays', header: 'Number of Gratuity Balance Days', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, bind: "DLSum_GratuBal_Days", type: 'text' },
    { field: 'GratuitySummaryReports ', header: 'Gratuity Summary Reports ', hide: false, mandatory: false, width: '8rem', data: '123456789', manual: false, PopUp: true, PopUpData: 'SummaryDetail', bind: "Alld_Multiple_Batch", type: 'text' },
    { field: 'AbsenceDays', header: 'Absence Days', hide: false, mandatory: false, width: '6rem', data: '123456789', manual: false, bind: "DLSum_Absen_Days", type: 'text' },
    { field: 'AbsenceReport', header: 'Absence Report', hide: false, mandatory: false, width: '8rem', data: '123456', manual: false, bind: "Alld_Tax_Name", type: 'text', PopUp: true, PopUpData: 'SummaryDetail' },
    { field: 'EmploymentStatus', header: 'Employment Status', hide: false, mandatory: false, width: '8rem', data: '12345678912345', manual: false, bind: "DLSum_Emplo_Status", type: 'text' },


  ];
  activateAndDeactivate: any;
  singleCoMaster: any;

  constructor(
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    public _salesService: SalesService,
    private confirmationService: ConfirmationService,
    private masterService: MasterService,
    private router: Router,
    private _messageService: MessageService

  ) { }

  ngOnInit(): void {
    this._salesService.headerData.tblDocAttach = [new TblDocAttachDto()]
    this.TblHEmpl.presentadressdto.push(new presentaddressdto());
    this.TblHEmpl.permanentaddressdto.push(new permanentaddressdto());
    this.TblHEmpl.emergencydetails.push(new emergencydetails());
    this.TblHEmpl.joiningdetailsdto.push(new joiningdetailsdto());
    this.TblHEmpl.bankdetailsdto.push(new bankdetailsdto());
    this.TblHEmpl.passportdetails.push(new passportdetails());
    this.TblHEmpl.emiratedetails.push(new emiratedetails());
    this.TblHEmpl.TbldLeaveSum.push(new TbldLeaveSum());
    this.TblHEmpl.drivingdetails.push(new drivingdetails());
    this.TblHEmpl.insurancedetails.push(new insurancedetails());
    this.TblHEmpl.wpsdetails.push(new wpsdetails());
    this.TblHEmpl.calculationdetails.push(new calculationdetails());
    this.TblHEmpl.applicableCo   = [new TbldEmplCo()]
   this.getLovData()
  }

  getLovData() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCoMaster;
        break;
      default:
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {

      case 'ApplicableCompanyCode':
         const selectedCode = event.SingleCo_Code
        const isExist = this.TblHEmpl.applicableCo.some(item => item.DcEmpl_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for voucher-type Master' });
          return;
        }

        this.TblHEmpl.applicableCo[this.tableIndex].DcEmpl_SingleCo_Code = event.SingleCo_SysID
        this.TblHEmpl.applicableCo[this.tableIndex].DcEmpl_SingleCo_Code = event.SingleCo_Code
        this.TblHEmpl.applicableCo[this.tableIndex].DcEmpl_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHEmpl.HEmpl_AcDe_SysID = event.HActDeactive_SysID
        this.TblHEmpl.HEmpl_AcDe_Code = event.HActDeactive_Code
        this.TblHEmpl.HEmpl_AcDe_Name = event.HActDeactive_Name
        break;

      case 'EmployeeGroupCode':
        this.TblHEmpl.HEmpl_Group_Code = event.HEmpl_Group_Code
        this.TblHEmpl.HEmpl_Group_Name = event.HEmpl_Group_Name
        break;

      case 'EmployeeCategoryCode':
        this.TblHEmpl.HEmpl_Categ_Code = event.categoryCode
        this.TblHEmpl.HEmpl_Categ_Name = event.categoryName
        break;

      case 'EmployeeModuleCode':
        this.TblHEmpl.HEmpl_Modu_Code = event.HEmpl_Modu_Code
        this.TblHEmpl.HEmpl_Modu_Name = event.HEmpl_Modu_Name
        break;

      case 'EmpTypCodeM':
        this.TblHEmpl.HEmpl_Type_Code = event.typeCode
        this.TblHEmpl.HEmpl_Type_Name = event.typeName
        break;
      case 'EmployeePayrollCode':
        this.TblHEmpl.HAppl_PaySetup_Code = event.HAppl_PaySetup_Code
        this.TblHEmpl.HAppl_PaySetup_Name = event.HAppl_PaySetup_Name
        break;
      case 'EmployeeAccountCode':
        this.TblHEmpl.HEmpl_Acc_Code = event.HEmpl_Acc_Code
        this.TblHEmpl.HEmpl_Acc_Name = event.HEmpl_Acc_Name
        break;
      case 'EmployeeTypeCode':
        this.TblHEmpl.HEmpl_Type_Code = event.typeCode
        this.TblHEmpl.HEmpl_Type_Name = event.typeName
        break;
      case 'CityCodeDataPopUp':
        this.TblHEmpl.presentadressdto[0].HEAdd_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.presentadressdto[0].HEAdd_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp':
        this.TblHEmpl.presentadressdto[0].HEAdd_Country_Code = event.HEAdd_Country_Code
        this.TblHEmpl.presentadressdto[0].HEAdd_Country_Name = event.HEAdd_Country_Name
        break;
      case 'CityCodeDataPopUp2':
        this.TblHEmpl.permanentaddressdto[0].HEPAdd_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.permanentaddressdto[0].HEPAdd_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp2':
        this.TblHEmpl.permanentaddressdto[0].HEPAdd_Country_Code = event.HEAdd_Country_Code
        this.TblHEmpl.permanentaddressdto[0].HEPAdd_Country_Name = event.HEAdd_Country_Name
        break;
      case 'CityCodeDataPopUp3':
        this.TblHEmpl.emergencydetails[0].HEmerAdd_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.emergencydetails[0].HEmerAdd_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp3':
        this.TblHEmpl.emergencydetails[0].HEmerAdd_Country_Code = event.HEAdd_Country_Code
        this.TblHEmpl.emergencydetails[0].HEmerAdd_Country_Name = event.HEAdd_Country_Name
        break;
      case 'CityCodeDataPopUp4':
        this.TblHEmpl.bankdetailsdto[0].HEBank_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.bankdetailsdto[0].HEBank_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp4':
        this.TblHEmpl.bankdetailsdto[0].HEBank_Count_Code = event.HEAdd_Country_Code
        this.TblHEmpl.bankdetailsdto[0].HEBank_Count_Name = event.HEAdd_Country_Name
        break;
      case 'EmployeeCode':
        this.TblHEmpl.TbldLeaveSum[this.tableIndex].DLSum_Emp_Code = event.DLSum_Emp_Code
        this.TblHEmpl.TbldLeaveSum[this.tableIndex].DLSum_Emp_Name = event.DLSum_Emp_Name
        break;
      case 'CityCodeDataPopUp5':
        this.TblHEmpl.passportdetails[0].HEPass_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.passportdetails[0].HEPass_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp5':
        this.TblHEmpl.passportdetails[0].HEPass_Count_Code = event.HEAdd_Country_Code
        this.TblHEmpl.passportdetails[0].HEPass_Count_Name = event.HEAdd_Country_Name
        break;
      case 'CityCodeDataPopUp6':
        this.TblHEmpl.emiratedetails[0].HEID_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.emiratedetails[0].HEID_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp6':
        this.TblHEmpl.emiratedetails[0].HEID_Count_Code = event.HEAdd_Country_Code
        this.TblHEmpl.emiratedetails[0].HEID_Count_Name = event.HEAdd_Country_Name
        break;
      case 'CityCodeDataPopUp7':
        this.TblHEmpl.drivingdetails[0].HEDri_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.drivingdetails[0].HEDri_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp7':
        this.TblHEmpl.drivingdetails[0].HEDri_Count_Code = event.HEAdd_Country_Code
        this.TblHEmpl.drivingdetails[0].HEDri_Count_Name = event.HEAdd_Country_Name
        break;
      case 'CityCodeDataPopUp8':
        this.TblHEmpl.insurancedetails[0].HEInsu_City_Code = event.HEAdd_City_Code
        this.TblHEmpl.insurancedetails[0].HEInsu_City_Name = event.HEAdd_City_Name
        break;
      case 'CountryCodeDataPopUp8':
        this.TblHEmpl.insurancedetails[0].HEInsu_Count_Code = event.HEAdd_Country_Code
        this.TblHEmpl.insurancedetails[0].HEInsu_Count_Name = event.HEAdd_Country_Name
        break;
      case 'SalaryRemarksCode':
        this.TblHEmpl.calculationdetails[0].HSalStop_Rem_Code = event.HSalStop_Rem_Code
        this.TblHEmpl.calculationdetails[0].HSalStop_Rem_Name = event.HSalStop_Rem_Name
        break;
      case 'OvertimeCalculationCode':
        this.TblHEmpl.calculationdetails[0].HOverStop_Rem_Code = event.HOverStop_Rem_Code
        this.TblHEmpl.calculationdetails[0].HOverStop_Rem_Name = event.HOverStop_Rem_Name
        break;
      case 'LeaveSalaryCalculationCode':
        this.TblHEmpl.calculationdetails[0].HLSalStop_Rem_Code = event.HLSalStop_Rem_Code
        this.TblHEmpl.calculationdetails[0].HLSalStop_Rem_Name = event.HLSalStop_Rem_Name
        break;
      case 'GratuityCalculationCode':
        this.TblHEmpl.calculationdetails[0].HLGratStop_Rem_Code = event.HGratStop_Rem_Code
        this.TblHEmpl.calculationdetails[0].HLGratStop_Rem_Name = event.HGratStop_Rem_Name
        break;


      default:
        break;
    }

  }

  deleteRow(table: any, index: number) {

    if (table == 'applicableCo') {
      // this.applicableCo.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'applicableCo') {
            this.TblHEmpl.applicableCo.splice(index, 1);
            if (this.TblHEmpl.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      });
    }

  }

  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldEmplCo()
      this.TblHEmpl.applicableCo.splice(index + 1, 0, newRow);

    }

  }

  deleteRow1(table: any, index: number) {

    if (table == 'TbldLeaveSum') {
      // this.TbldLeaveSum.splice(index, 1);
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this row?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (table === 'TbldLeaveSum') {
            this.TblHEmpl.TbldLeaveSum.splice(index, 1);
            if (this.TblHEmpl.TbldLeaveSum.length === 0) {
              this.addRow1('TbldLeaveSum', -1);
            }
          }
        }
      });
    }

  }

  addRow1(table: any, index: number) {
    if (table == 'TbldLeaveSum') {
      const newRow = new TbldLeaveSum()
      this.TblHEmpl.TbldLeaveSum.splice(index + 1, 0, newRow)

    }
  }


  changeIndex(i) {

    if (this.activeIndex == i) {
      this.activeIndex = null
    }
    else
      this.activeIndex = i

  }

  toggleSelectAll(event: any) {
    const isChecked = event.target.checked;
    this.TblHEmpl.TbldLeaveSum.forEach(row => {
      row.selected = isChecked;
    });
  }

  isAllSelected(): boolean {
    return this.TblHEmpl.TbldLeaveSum.every(row => row.selected);
  }

  onRowClick(rowData: any, rowIndex: number): void {
    console.log('Row clicked:', rowData, 'Index:', rowIndex);
  }

  mainGroupOptions = [
    { code: '1001', name: 'Terminated' },
    { code: '1002', name: 'Resigned' },
    { code: '1002', name: 'Left Job' }
  ];

  ConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Only delete if user confirms
      }
    });
  }

  displayEmployeeList() {
    this.showEmployeemasterList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData('account-module').then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HEmpl_Code || item.HEmpl_Name || item.HEmpl_SysID;
      const matchesQuery =
        (item.HEmpl_Code || '').toLowerCase().includes(query) ||
        (item.HEmpl_Name || '').toLowerCase().includes(query) ||
        item.HEmpl_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  preSave(): boolean {
    if (this.TblHEmpl.HEmpl_Code == null || this.TblHEmpl.HEmpl_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee Code Cannot Be Null' });
      return false;
    }

    if (this.TblHEmpl.HEmpl_Name == null || this.TblHEmpl.HEmpl_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Employee Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHEmpl.applicableCo = this.TblHEmpl.applicableCo.filter(
      row => row.DcEmpl_SingleCo_Code && row.DcEmpl_SingleCo_Code.trim() !== ''
    );

    const body = { ...this.TblHEmpl };

    // Remove unwanted properties
    delete body.presentadressdto;
    delete body.permanentaddressdto;
    delete body.emergencydetails;
    delete body.joiningdetailsdto;
    delete body.bankdetailsdto;
    delete body.passportdetails;
    delete body.emiratedetails;
    delete body.TbldLeaveSum;
    delete body.drivingdetails;
    delete body.insurancedetails;
    delete body.wpsdetails;
    delete body.calculationdetails;


    this.masterService.saveMasterData(apiUrl.employeeCreation, body).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

        // this.router.navigate(['l-master/prod-module']);


      }
    })
  }

  Back() {
    this.showEmployeemasterList = false
    this.router.navigate(['payroll/employee-creation-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['payroll/employee-creation-master/' + rowData.HEmpl_SysID]);
  }



}
