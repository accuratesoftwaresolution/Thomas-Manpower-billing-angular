import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldHPayDeduCo } from 'src/app/_dto/TbldHPayDeduCo.dto';
import { TblHPayDedu } from 'src/app/_dto/TblHPayDedu.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-payroll-deduction',
  templateUrl: './payroll-deduction.component.html',
  styleUrls: ['./payroll-deduction.component.scss']
})
export class PayrollDeductionComponent implements OnInit {

  TblHPayDedu: TblHPayDedu = new TblHPayDedu()

  tableIndex: any;


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showpayrollDeductionList: boolean = false

  HPayroll_Dedu_SysID: any;

  showDeleteButton: boolean = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHPayDedu.TbldHPayDeduCo = [new TbldHPayDeduCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPayroll_Dedu_SysID = Number(id);
        this.TblHPayDedu.HPayroll_Dedu_SysID = Number(id);
        this.getdata()
      }
    });
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        break;
      case 'AccDirectExpCode':
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

        const selectedCode = event.code
        const isExist = this.TblHPayDedu.TbldHPayDeduCo.some(item => item.DcPayroll_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Payroll Deduction Master' });
          return;
        }
        this.TblHPayDedu.TbldHPayDeduCo[this.tableIndex].DcPayroll_SingleCo_SysID = event.sysId
        this.TblHPayDedu.TbldHPayDeduCo[this.tableIndex].DcPayroll_SingleCo_Code = event.code
        this.TblHPayDedu.TbldHPayDeduCo[this.tableIndex].DcPayroll_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHPayDedu.HPayroll_AcDe_Code = event.code
        this.TblHPayDedu.HPayroll_AcDe_Name = event.name
        break;


      default:
        break;
    }

  }

  deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (this.TblHPayDedu.HPayroll_Dedu_SysID && rowData.DcPayroll_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.payrollDeduction, `company?where[DcPayroll_Dedu_SysID]=${this.TblHPayDedu.TbldHPayDeduCo[0].DcPayroll_Dedu_SysID}&where[DcPayroll_SingleCo_SysID]=${rowData.DcPayroll_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldHPayDeduCo') {
                this.TblHPayDedu.TbldHPayDeduCo.splice(index, 1);
                if (this.TblHPayDedu.TbldHPayDeduCo.length === 0) {
                  this.addRow('TbldHPayDeduCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldHPayDeduCo') {
            this.TblHPayDedu.TbldHPayDeduCo.splice(index, 1);
            if (this.TblHPayDedu.TbldHPayDeduCo.length === 0) {
              this.addRow('TbldHPayDeduCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldHPayDeduCo') {
      const newRow = new TbldHPayDeduCo()
      this.TblHPayDedu.TbldHPayDeduCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['payroll/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPayDedu.HPayroll_Dedu_Code == null || this.TblHPayDedu.HPayroll_Dedu_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Deduction Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPayDedu.HPayroll_Dedu_Name == null || this.TblHPayDedu.HPayroll_Dedu_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Deduction Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHPayDedu.TbldHPayDeduCo = this.TblHPayDedu.TbldHPayDeduCo.filter(
      row => row.DcPayroll_SingleCo_Code && row.DcPayroll_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.payrollDeduction, this.TblHPayDedu).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHPayDedu = new TblHPayDedu()
        this.TblHPayDedu.TbldHPayDeduCo = [new TbldHPayDeduCo()]

      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHPayDedu.HPayroll_Dedu_SysID || this.HPayroll_Dedu_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.payrollDeduction, this.TblHPayDedu.HPayroll_Dedu_SysID).then((res) => {
        this.TblHPayDedu = res
        this.showDeleteButton = true;

        if (this.TblHPayDedu.TbldHPayDeduCo.length == 0) {
          this.TblHPayDedu.TbldHPayDeduCo = [new TbldHPayDeduCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPayDedu = new TblHPayDedu()
          this.TblHPayDedu.TbldHPayDeduCo = [new TbldHPayDeduCo()]
        }
      })
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.payrollDeduction, this.TblHPayDedu.HPayroll_Dedu_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Refresh()


          }

        }, err => {
          if (err.error.statusCode == 409) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        });
      }

    });
  }

  Refresh() {
    this.TblHPayDedu = new TblHPayDedu()
    this.TblHPayDedu.TbldHPayDeduCo = [new TbldHPayDeduCo()]
    this.router.navigate(['payroll/payroll-deduction/']);

  }
  cancel() {
    this.TblHPayDedu = new TblHPayDedu()
    this.TblHPayDedu.TbldHPayDeduCo = [new TbldHPayDeduCo()]
  }

  //***************************************LIST********************************
  displaypayrollDeductionList() {
    this.showpayrollDeductionList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.payrollDeduction).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPayroll_Dedu_Code || item.HPayroll_Dedu_Name || item.HPayroll_Dedu_SysID;
      const matchesQuery =
        (item.HPayroll_Dedu_Code || '').toLowerCase().includes(query) ||
        (item.HPayroll_Dedu_Name || '').toLowerCase().includes(query) ||
        item.HPayroll_Dedu_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showpayrollDeductionList = false
    this.router.navigate(['payroll/payroll-deduction']);


  }
  editRow(rowData: any) {
    this.router.navigate(['payroll/payroll-deduction/' + rowData.HPayroll_Dedu_SysID]);
  }


}
