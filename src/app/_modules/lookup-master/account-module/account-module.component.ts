import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldAccModuleCo } from 'src/app/_dto/masters/account-module/TbldAccModuleCo.dto';
import { TblHAccModule } from 'src/app/_dto/masters/account-module/TblHAccModule.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-account-module',
  templateUrl: './account-module.component.html',
  styleUrls: ['./account-module.component.scss']
})
export class AccountModuleComponent implements OnInit {


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showAccountModuleList: boolean = false

  TblHAccModule: TblHAccModule = new TblHAccModule()

  tableIndex: any;

  HAccModule_SysID: any;

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
    this.TblHAccModule.TbldAccModuleCo = [new TbldAccModuleCo()]

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAccModule_SysID = Number(id);
        this.TblHAccModule.HAccModule_SysID = Number(id);
        this.getData()
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
        const isExist = this.TblHAccModule.TbldAccModuleCo.some(item => item.DcAccModule_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Account Module Master' });
          return;
        }
        this.TblHAccModule.TbldAccModuleCo[this.tableIndex].DcAccModule_SingleCo_SysID = event.SingleCo_SysID

        this.TblHAccModule.TbldAccModuleCo[this.tableIndex].DcAccModule_SingleCo_Code = event.SingleCo_Code
        this.TblHAccModule.TbldAccModuleCo[this.tableIndex].DcAccModule_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHAccModule.HAccModule_AcDe_SysID = event.HActDeactive_SysID
        this.TblHAccModule.HAccModule_AcDe_Code = event.HActDeactive_Code
        this.TblHAccModule.HAccModule_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHAccModule.HAccModule_SysID && rowData.DcAccModule_SingleCo_SysID) {
          this.masterService.deleteData('account-module', `company?where[DcAccModule_SysID]=${this.TblHAccModule.TbldAccModuleCo[0].DcAccModule_SysID}&where[DcAccModule_SingleCo_SysID]=${rowData.DcAccModule_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldAccModuleCo') {
                this.TblHAccModule.TbldAccModuleCo.splice(index, 1);
                if (this.TblHAccModule.TbldAccModuleCo.length === 0) {
                  this.addRow('TbldAccModuleCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldAccModuleCo') {
            this.TblHAccModule.TbldAccModuleCo.splice(index, 1);
            if (this.TblHAccModule.TbldAccModuleCo.length === 0) {
              this.addRow('TbldAccModuleCo', -1);
            }
          }
        }




      }
    });


  }

  addRow(table: any, index: number) {
    if (table == 'TbldAccModuleCo') {
      const newRow = new TbldAccModuleCo()
      this.TblHAccModule.TbldAccModuleCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHAccModule.HAccModule_Code == null || this.TblHAccModule.HAccModule_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Account Module Code Cannot Be Null' });
      return false;
    }

    if (this.TblHAccModule.HAccModule_Name == null || this.TblHAccModule.HAccModule_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Account Module Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHAccModule.TbldAccModuleCo = this.TblHAccModule.TbldAccModuleCo.filter(
      row => row.DcAccModule_SingleCo_Code && row.DcAccModule_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData('account-module', this.TblHAccModule).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHAccModule = new TblHAccModule()
        this.TblHAccModule.TbldAccModuleCo = [new TbldAccModuleCo()]

      }

    })
  }

  funcSearch() {
    this.getData()
  }


  getData() {
    if (this.TblHAccModule.HAccModule_SysID || this.HAccModule_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.accModule, this.TblHAccModule.HAccModule_SysID).then((res) => {
        this.TblHAccModule = res
        this.showDeleteButton = true;

        if (this.TblHAccModule.TbldAccModuleCo.length == 0) {
          this.TblHAccModule.TbldAccModuleCo = [new TbldAccModuleCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHAccModule = new TblHAccModule()
          this.TblHAccModule.TbldAccModuleCo = [new TbldAccModuleCo()]
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
        this.masterService.deleteData('account-module', this.TblHAccModule.HAccModule_SysID).then((res) => {

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
    this.TblHAccModule = new TblHAccModule()
    this.TblHAccModule.TbldAccModuleCo = [new TbldAccModuleCo()]
    this.router.navigate(['l-master/account-module']);
  }

  cancel() {
    this.TblHAccModule = new TblHAccModule()
    this.TblHAccModule.TbldAccModuleCo = [new TbldAccModuleCo()]
    this.router.navigate(['l-master/account-module']);

  }

  //***************************************LIST********************************
  displayAccountModuleList() {
    this.showAccountModuleList = true
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
      const hasData = item.HAccModule_Code || item.HAccModule_Short_Name || item.HAccModule_Long_Name || item.HAccModule_SysID;
      const matchesQuery =
        (item.HAccModule_Code || '').toLowerCase().includes(query) ||
        (item.HAccModule_Short_Name || '').toLowerCase().includes(query) ||
        (item.HAccModule_Long_Name || '').toLowerCase().includes(query) ||
        item.HAccModule_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showAccountModuleList = false
    this.router.navigate(['l-master/account-module']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/account-module/' + rowData.HAccModule_SysID]);
  }

  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData('account-module', rowData.HAccModule_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showAccountModuleList = false

            this.getListData()
          }

        });
      }
    });
  }



}