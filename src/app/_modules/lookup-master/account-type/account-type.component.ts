import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldAccTypeCo } from 'src/app/_dto/masters/account-type/TbldAccTypeCo.dto';
import { TblHAccType } from 'src/app/_dto/masters/account-type/TblHAccType.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss']
})
export class AccountTypeComponent implements OnInit {

  TblHAccType: TblHAccType = new TblHAccType;

  tableIndex: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showAccountTypeList: boolean = false

  HAccType_SysID: any;

  showDeleteButton: boolean = false;
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
    this.TblHAccType.TbldAccTypeCo = [new TbldAccTypeCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAccType_SysID = Number(id);
        this.TblHAccType.HAccType_SysID = Number(id);
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
        const isExist = this.TblHAccType.TbldAccTypeCo.some(item => item.DcAccType_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Account Type Master' });
          return;
        }
        this.TblHAccType.TbldAccTypeCo[this.tableIndex].DcAccType_SingleCo_SysID = event.SingleCo_SysID
        this.TblHAccType.TbldAccTypeCo[this.tableIndex].DcAccType_SingleCo_Code = event.SingleCo_Code
        this.TblHAccType.TbldAccTypeCo[this.tableIndex].DcAccType_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHAccType.HAccType_AcDe_SysID = event.HActDeactive_SysID
        this.TblHAccType.HAccType_AcDe_Code = event.HActDeactive_Code
        this.TblHAccType.HAccType_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHAccType.HAccType_SysID && rowData.DcAccType_SingleCo_SysID) {
          this.masterService.deleteData('account-type', `company?where[DcAccType_SysID]=${this.TblHAccType.TbldAccTypeCo[0].DcAccType_SysID}&where[DcAccType_SingleCo_SysID]=${rowData.DcAccType_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldAccTypeCo') {
                this.TblHAccType.TbldAccTypeCo.splice(index, 1);
                if (this.TblHAccType.TbldAccTypeCo.length === 0) {
                  this.addRow('TbldAccTypeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldAccTypeCo') {
            this.TblHAccType.TbldAccTypeCo.splice(index, 1);
            if (this.TblHAccType.TbldAccTypeCo.length === 0) {
              this.addRow('TbldAccTypeCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldAccTypeCo') {
      const newRow = new TbldAccTypeCo()
      this.TblHAccType.TbldAccTypeCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHAccType.HAccType_Code == null || this.TblHAccType.HAccType_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Account Type Code Cannot Be Null' });
      return false;
    }

    if (this.TblHAccType.HAccType_Name == null || this.TblHAccType.HAccType_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Account Type Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHAccType.TbldAccTypeCo = this.TblHAccType.TbldAccTypeCo.filter(
      row => row.DcAccType_SingleCo_Code && row.DcAccType_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData('account-type', this.TblHAccType).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHAccType = new TblHAccType()
        this.TblHAccType.TbldAccTypeCo = [new TbldAccTypeCo()]
        this.router.navigate(['l-master/account-type']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHAccType.HAccType_SysID || this.HAccType_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.accType, this.TblHAccType.HAccType_SysID).then((res) => {
        this.TblHAccType = res

        if (this.TblHAccType.TbldAccTypeCo.length == 0) {
          this.TblHAccType.TbldAccTypeCo = [new TbldAccTypeCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHAccType = new TblHAccType()
          this.TblHAccType.TbldAccTypeCo = [new TbldAccTypeCo()]
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
        this.masterService.deleteData('account-type', this.TblHAccType.HAccType_SysID).then((res) => {

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
    this.TblHAccType = new TblHAccType()
    this.TblHAccType.TbldAccTypeCo = [new TbldAccTypeCo()]
    this.router.navigate(['l-master/account-type']);

  }

  cancel() {
    this.TblHAccType = new TblHAccType()
    this.TblHAccType.TbldAccTypeCo = [new TbldAccTypeCo()]
    this.router.navigate(['l-master/account-type']);

  }

  displayAccountTypeList() {
    this.showAccountTypeList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData('account-type').then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HAccType_Code || item.HAccType_Name || item.HAccType_SysID;
      const matchesQuery =
        (item.HAccType_Code || '').toLowerCase().includes(query) ||
        (item.HAccType_Name || '').toLowerCase().includes(query) ||
        item.HAccType_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showAccountTypeList = false
    this.router.navigate(['l-master/account-type']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/account-type/' + rowData.HAccType_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.accType, rowData.HAccType_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showAccountTypeList = false

            this.getListData()
          }

        });
      }
    });
  }

}
