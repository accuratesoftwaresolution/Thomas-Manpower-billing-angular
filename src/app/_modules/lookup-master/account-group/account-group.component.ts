import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldMAccGroupCo } from 'src/app/_dto/TbldMAccGroupCo.dto';
import { TblHMAccGroup } from 'src/app/_dto/TblHMAccGroup.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-account-group',
  templateUrl: './account-group.component.html',
  styleUrls: ['./account-group.component.scss']
})
export class AccountGroupComponent implements OnInit {
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showAccountGroupList :boolean = false


  TblHMAccGroup: TblHMAccGroup = new TblHMAccGroup()

  tableIndex: any;

  HMAccGroup_SysID: any;

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
    this.TblHMAccGroup.TbldMAccGroupCo = [new TbldMAccGroupCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HMAccGroup_SysID = Number(id);
        this.TblHMAccGroup.HMAccGroup_SysID = Number(id);
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
        const isExist = this.TblHMAccGroup.TbldMAccGroupCo.some(item => item.DcMAccGroup_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Account Group Master' });
          return;
        }
        this.TblHMAccGroup.TbldMAccGroupCo[this.tableIndex].DcMAccGroup_SingleCo_SysID = event.SingleCo_SysID
        this.TblHMAccGroup.TbldMAccGroupCo[this.tableIndex].DcMAccGroup_SingleCo_Code = event.SingleCo_Code
        this.TblHMAccGroup.TbldMAccGroupCo[this.tableIndex].DcMAccGroup_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHMAccGroup.HMAccGroup_AcDe_SysID = event.HActDeactive_SysID
        this.TblHMAccGroup.HMAccGroup_AcDe_Code = event.HActDeactive_Code
        this.TblHMAccGroup.HMAccGroup_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHMAccGroup.HMAccGroup_SysID && rowData.DcMAccGroup_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.accountGroup, `company?where[DcMAccGroupSysID]=${this.TblHMAccGroup.TbldMAccGroupCo[0].DcMAccGroupSysID}&where[DcMAccGroup_SingleCo_SysID]=${rowData.DcMAccGroup_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldMAccGroupCo') {
                this.TblHMAccGroup.TbldMAccGroupCo.splice(index, 1);
                if (this.TblHMAccGroup.TbldMAccGroupCo.length === 0) {
                  this.addRow('TbldMAccGroupCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldMAccGroupCo') {
            this.TblHMAccGroup.TbldMAccGroupCo.splice(index, 1);
            if (this.TblHMAccGroup.TbldMAccGroupCo.length === 0) {
              this.addRow('TbldMAccGroupCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldMAccGroupCo') {
      const newRow = new TbldMAccGroupCo()
      this.TblHMAccGroup.TbldMAccGroupCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHMAccGroup.HMAccGroup_Code == null || this.TblHMAccGroup.HMAccGroup_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Account Group Code Cannot Be Null' });
      return false;
    }

    if (this.TblHMAccGroup.HMAccGroup_Name == null || this.TblHMAccGroup.HMAccGroup_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Account Group Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHMAccGroup.TbldMAccGroupCo = this.TblHMAccGroup.TbldMAccGroupCo.filter(
      row => row.DcMAccGroup_SingleCo_Code && row.DcMAccGroup_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.accountGroup, this.TblHMAccGroup).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHMAccGroup = new TblHMAccGroup()
        this.TblHMAccGroup.TbldMAccGroupCo = [new TbldMAccGroupCo()]

      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHMAccGroup.HMAccGroup_SysID || this.HMAccGroup_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.accountGroup, this.TblHMAccGroup.HMAccGroup_SysID).then((res) => {
        this.TblHMAccGroup = res
        this.showDeleteButton = true;

        if (this.TblHMAccGroup.TbldMAccGroupCo.length == 0) {
          this.TblHMAccGroup.TbldMAccGroupCo = [new TbldMAccGroupCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHMAccGroup = new TblHMAccGroup()
          this.TblHMAccGroup.TbldMAccGroupCo = [new TbldMAccGroupCo()]
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
        this.masterService.deleteData(apiUrl.accountGroup, this.TblHMAccGroup.HMAccGroup_SysID).then((res) => {

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
    this.TblHMAccGroup = new TblHMAccGroup()
    this.TblHMAccGroup.TbldMAccGroupCo = [new TbldMAccGroupCo()]
    this.router.navigate(['l-master/account-group/']);

  }
  cancel() {
    this.TblHMAccGroup = new TblHMAccGroup()
    this.TblHMAccGroup.TbldMAccGroupCo = [new TbldMAccGroupCo()]
    this.router.navigate(['l-master/account-group/']);

  }

  //***************************************LIST********************************
 displayAccountList() {
    this.showAccountGroupList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.accountGroup).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HMAccGroup_Code || item.HMAccGroup_Name || item.HMAccGroup_SysID;
      const matchesQuery =
        (item.HMAccGroup_Code || '').toLowerCase().includes(query) ||
        (item.HMAccGroup_Name || '').toLowerCase().includes(query) ||
        item.HMAccGroup_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showAccountGroupList = false
    this.router.navigate(['l-master/account-group']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/account-group/' + rowData.HMAccGroup_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.accountGroup, rowData.HMAccGroup_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showAccountGroupList = false

            this.getListData()
          }

        });
      }
    });
  }




}