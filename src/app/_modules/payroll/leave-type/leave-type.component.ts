import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldLeaveTypeCo } from 'src/app/_dto/TbldLeaveTypeCo.dto';
import { TblHLeaveType } from 'src/app/_dto/TblHLeaveType.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-leave-type',
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.scss']
})
export class LeaveTypeComponent implements OnInit {
 TblHLeaveType: TblHLeaveType = new TblHLeaveType()
  
    tableIndex: any;

      listData = []

    searchText: string = '';

    filteredfilteredlistData = [...this.listData];

    showLeaveTypeList :boolean = false
  
    HLeaveType_SysID: any;
  
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
      this.TblHLeaveType.TbldLeaveTypeCo = [new TbldLeaveTypeCo()]
      this.activatedRoute.paramMap.subscribe(params => {
        const id = params.get('id');
  
        if (id) {
          this.showDeleteButton = true;
          this.HLeaveType_SysID = Number(id);
          this.TblHLeaveType.HLeaveType_SysID = Number(id);
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
          const isExist = this.TblHLeaveType.TbldLeaveTypeCo.some(item => item.DcLeaveType_SingleCo_Code === selectedCode)
  
          if (isExist) {
            this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Remarks Master' });
            return;
          }
          this.TblHLeaveType.TbldLeaveTypeCo[this.tableIndex].DcLeaveType_SingleCo_SysID = event.sysId
          this.TblHLeaveType.TbldLeaveTypeCo[this.tableIndex].DcLeaveType_SingleCo_Code = event.code
          this.TblHLeaveType.TbldLeaveTypeCo[this.tableIndex].DcLeaveType_SingleCo_Name = event.name
          break;
  
  
        case 'ActAndDeactCode':
          this.TblHLeaveType.HLeaveType_AcDe_Code = event.code
          this.TblHLeaveType.HLeaveType_AcDe_Name = event.name
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
  
  
          if (this.TblHLeaveType.HLeaveType_SysID && rowData.DcLeaveType_SingleCo_SysID) {
            this.masterService.deleteData(apiUrl.payrollAddition, `company?where[DcLeaveType_SysID]=${this.TblHLeaveType.TbldLeaveTypeCo[0].DcLeaveType_SysID}&where[DcLeaveType_SingleCo_SysID]=${rowData.DcLeaveType_SingleCo_SysID}`).then((res) => {
  
              if (res.success == false) {
                this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
  
              } else {
                this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
                if (table === 'TbldLeaveTypeCo') {
                  this.TblHLeaveType.TbldLeaveTypeCo.splice(index, 1);
                  if (this.TblHLeaveType.TbldLeaveTypeCo.length === 0) {
                    this.addRow('TbldLeaveTypeCo', -1);
                  }
                }
  
              }
  
            });
          } else {
            if (table === 'TbldLeaveTypeCo') {
              this.TblHLeaveType.TbldLeaveTypeCo.splice(index, 1);
              if (this.TblHLeaveType.TbldLeaveTypeCo.length === 0) {
                this.addRow('TbldLeaveTypeCo', -1);
              }
            }
          }
        }
      });
    }
  
  
    addRow(table: any, index: number) {
      if (table == 'TbldLeaveTypeCo') {
        const newRow = new TbldLeaveTypeCo()
        this.TblHLeaveType.TbldLeaveTypeCo.splice(index + 1, 0, newRow);
  
      }
    }
  
    routeTo(screen) {
      this.router.navigate(['payroll/' + screen]);
    }
  
    preSave(): boolean {
      if (this.TblHLeaveType.HLeaveType_Code == null || this.TblHLeaveType.HLeaveType_Code.toString().trim() === '') {
        this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Leave Type Code Cannot Be Null' });
        return false;
      }
  
      if (this.TblHLeaveType.HLeaveType_Name == null || this.TblHLeaveType.HLeaveType_Name.toString().trim() === '') {
        this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payroll Leave Type Name Cannot Be Null' });
        return false;
      }
  
      return true;
    }
  
  
    save() {
      if (!this.preSave()) {
        return;
      }
      this.TblHLeaveType.TbldLeaveTypeCo = this.TblHLeaveType.TbldLeaveTypeCo.filter(
        row => row.DcLeaveType_SingleCo_Code && row.DcLeaveType_SingleCo_Code.trim() !== ''
      );
  
      this.masterService.saveMasterData(apiUrl.payrollAddition, this.TblHLeaveType).then((res) => {
        if (res.success == false && !res.error) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
  
        } else if (res.success == false && res.error) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
        }
        else {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
          this.TblHLeaveType = new TblHLeaveType()
          this.TblHLeaveType.TbldLeaveTypeCo = [new TbldLeaveTypeCo()]
  
        }
      })
    }
  
    funcSearch() {
      this.getdata()
    }
  
  
    getdata() {
      if (this.TblHLeaveType.HLeaveType_SysID || this.HLeaveType_SysID) {
        this.masterService.getMasterDatabyId(apiUrl.payrollAddition, this.TblHLeaveType.HLeaveType_SysID).then((res) => {
          this.TblHLeaveType = res
          this.showDeleteButton = true;
  
          if (this.TblHLeaveType.TbldLeaveTypeCo.length == 0) {
            this.TblHLeaveType.TbldLeaveTypeCo = [new TbldLeaveTypeCo()]
          }
  
        }, err => {
          if (err.error.statusCode == 404) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
            this.TblHLeaveType = new TblHLeaveType()
            this.TblHLeaveType.TbldLeaveTypeCo = [new TbldLeaveTypeCo()]
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
          this.masterService.deleteData(apiUrl.payrollAddition, this.TblHLeaveType.HLeaveType_SysID).then((res) => {
  
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
      this.TblHLeaveType = new TblHLeaveType()
      this.TblHLeaveType.TbldLeaveTypeCo = [new TbldLeaveTypeCo()]
      this.router.navigate(['payroll/payroll-leave-type/']);
  
    }
    cancel(){
      this.TblHLeaveType = new TblHLeaveType()
            // this.TblHLeaveType.TbldLeaveTypeCo = [new TbldLeaveTypeCo()]
    }

      //***************************************LIST********************************
    displayLeaveTypeList() {
      this.showLeaveTypeList = true
      this.getListData()
    }

    getListData() {
      this.masterService.getMasterData(apiUrl.payrollAddition).then((res) => {
        this.listData = res
        this.filterTable()
      })
    }

    filterTable() {
      const query = this.searchText?.toLowerCase() || '';
      this.filteredfilteredlistData = this.listData.filter(item => {
        const hasData = item.HLeaveType_Code || item.HLeaveType_Name || item.HLeaveType_SysID;
        const matchesQuery =
          (item.HLeaveType_Code || '').toLowerCase().includes(query) ||
          (item.HLeaveType_Name || '').toLowerCase().includes(query) ||
          item.HLeaveType_SysID?.toString().includes(query);
        return hasData && matchesQuery;
      });
    }

    Back() {
      this.showLeaveTypeList = false
      this.router.navigate(['payroll/payroll-leave-type']);


    }
      editRow(rowData: any) {
      this.router.navigate(['payroll/payroll-leave-type/' + rowData.HLeaveType_SysID]);
    }






}

