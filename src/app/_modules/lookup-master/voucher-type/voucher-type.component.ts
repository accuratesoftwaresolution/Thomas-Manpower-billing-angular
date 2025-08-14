import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldVouTypeCoDto } from 'src/app/_dto/masters/voucher-type/TbldVouTypeCo.dto';
import { TblHVouTypeDto } from 'src/app/_dto/masters/voucher-type/TblHVouType.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-voucher-type',
  templateUrl: './voucher-type.component.html',
  styleUrls: ['./voucher-type.component.scss']
})
export class VoucherTypeComponent implements OnInit {


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showVouchertypeList: boolean = false

  TblHVouTypeDto: TblHVouTypeDto = new TblHVouTypeDto()

  tableIndex: any;

  HVouType_SysID: any;

  showDeleteButton: boolean = false;


  isSaving: boolean = false;

  progressValue: number = 0;
  activateAndDeactivate: any;
  singleCoMaster: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHVouTypeDto.TbldVouTypeCo = [new TbldVouTypeCoDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HVouType_SysID = Number(id);
        this.TblHVouTypeDto.HVouType_SysID = Number(id);
        this.getdata()
      }
    });
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
        const isExist = this.TblHVouTypeDto.TbldVouTypeCo.some(item => item.DcVouType_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for voucher-type Master' });
          return;
        }
        this.TblHVouTypeDto.TbldVouTypeCo[this.tableIndex].DcVouType_SingleCo_SysID = event.SingleCo_SysID
        this.TblHVouTypeDto.TbldVouTypeCo[this.tableIndex].DcVouType_SingleCo_Code = event.SingleCo_Code
        this.TblHVouTypeDto.TbldVouTypeCo[this.tableIndex].DcVouType_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHVouTypeDto.HVouType_AcDe_Code = event.HActDeactive_SysID
        this.TblHVouTypeDto.HVouType_AcDe_Code = event.HActDeactive_Code
        this.TblHVouTypeDto.HVouType_AcDe_Name = event.HActDeactive_Name
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
        //  console.log(this.DcVouType_SysID)

        if (this.TblHVouTypeDto.HVouType_SysID && rowData.DcVouType_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.voucherType, `company?where[DcVouType_SysID]=${this.TblHVouTypeDto.TbldVouTypeCo[0].DcVouType_SysID}&where[DcVouType_SingleCo_SysID]=${rowData.DcVouType_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldVouTypeCo') {
                this.TblHVouTypeDto.TbldVouTypeCo.splice(index, 1);
                if (this.TblHVouTypeDto.TbldVouTypeCo.length === 0) {
                  this.addRow('TbldVouTypeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldVouTypeCo') {
            this.TblHVouTypeDto.TbldVouTypeCo.splice(index, 1);
            if (this.TblHVouTypeDto.TbldVouTypeCo.length === 0) {
              this.addRow('TbldVouTypeCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldVouTypeCo') {
      const newRow = new TbldVouTypeCoDto()
      this.TblHVouTypeDto.TbldVouTypeCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHVouTypeDto.HVouType_Code == null || this.TblHVouTypeDto.HVouType_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'voucher type Code Cannot Be Null' });
      return false;
    }

    if (this.TblHVouTypeDto.HVouType_Name == null || this.TblHVouTypeDto.HVouType_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'voucher type Name Cannot Be Null' });
      return false;
    }
     if (this.TblHVouTypeDto.TbldVouTypeCo[0].DcVouType_SingleCo_Code == null || this.TblHVouTypeDto.TbldVouTypeCo[0].DcVouType_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'voucher type Single Company Code Cannot Be Null' });
      return false;
    }


    return true;
  }

save() {
    if (!this.preSave()) return;

    this.isSaving = true;
    this.progressValue = 0;

    const interval = setInterval(() => {
      if (this.progressValue < 90) {
        this.progressValue += 10;
      } else {
        clearInterval(interval);
      }
    }, 500);

    // Trim empty rows
    this.TblHVouTypeDto.TbldVouTypeCo = this.TblHVouTypeDto.TbldVouTypeCo.filter(
      row => row.DcVouType_SingleCo_Code && row.DcVouType_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.voucherType, this.TblHVouTypeDto).then((res) => {
      clearInterval(interval);

      if (res.success === false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      if (res.success === false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
        this.progressValue = 0;
        this.isSaving = false;
        return;
      }

      // If success
      this.progressValue = 100;

      // Delay for smooth progress bar animation
      setTimeout(() => {
        this._messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: res.message
        });

        // Reset form
        this.TblHVouTypeDto = new TblHVouTypeDto();
        this.TblHVouTypeDto.TbldVouTypeCo = [new TbldVouTypeCoDto()];

        // Navigate to list screen
        this.router.navigate(['l-master/voucher-type/']);

        // Finally reset flags
        this.isSaving = false;
        this.progressValue = 0;
      }, 500);
    }).catch(() => {
      clearInterval(interval);
      this.progressValue = 0;
      this.isSaving = false;
      this._messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Save failed'
      });
    });
  }


  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHVouTypeDto.HVouType_SysID || this.HVouType_SysID) {

      this.masterService.getMasterDatabyId(apiUrl.voucherType, this.TblHVouTypeDto.HVouType_SysID).then((res) => {
        this.TblHVouTypeDto = res
        this.showDeleteButton = true;

        if (this.TblHVouTypeDto.TbldVouTypeCo.length == 0) {
          this.TblHVouTypeDto.TbldVouTypeCo = [new TbldVouTypeCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHVouTypeDto = new TblHVouTypeDto()
          this.TblHVouTypeDto.TbldVouTypeCo = [new TbldVouTypeCoDto()]
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
        this.masterService.deleteData(apiUrl.voucherType, this.TblHVouTypeDto.HVouType_SysID).then((res) => {

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
    this.TblHVouTypeDto = new TblHVouTypeDto()
    this.TblHVouTypeDto.TbldVouTypeCo = [new TbldVouTypeCoDto()]
    this.router.navigate(['l-master/voucher-type/']);

  }

  cancel() {
    this.TblHVouTypeDto = new TblHVouTypeDto()
    this.TblHVouTypeDto.TbldVouTypeCo = [new TbldVouTypeCoDto()]
    this.router.navigate(['l-master/voucher-type']);

  }
  // ---------------------------------------------------------------------List--------------------------
  displayVoucherTypeList() {
    this.showVouchertypeList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.voucherType).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HVouType_Code || item.HVouType_Name || item.HVouType_SysID;
      const matchesQuery =
        (item.HVouType_Code || '').toLowerCase().includes(query) ||
        (item.HVouType_Name || '').toLowerCase().includes(query) ||
        item.HVouType_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showVouchertypeList = false
    this.router.navigate(['l-master/voucher-type']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/voucher-type/' + rowData.HVouType_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.voucherType, rowData.HVouType_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showVouchertypeList = false

            this.getListData()
          }

        });
      }
    });
  }


}
