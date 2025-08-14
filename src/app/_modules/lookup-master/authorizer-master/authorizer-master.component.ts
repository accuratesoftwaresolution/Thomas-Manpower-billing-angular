import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldAuthMasterCo } from 'src/app/_dto/TbldAuthMasterCo.dto';
import { TblHAuthMaster } from 'src/app/_dto/TblHAuthMaster.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-authorizer-master',
  templateUrl: './authorizer-master.component.html',
  styleUrls: ['./authorizer-master.component.scss']
})
export class AuthorizerMasterComponent implements OnInit {

 

   listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  menuList :boolean = false

  TblHAuthMaster: TblHAuthMaster = new TblHAuthMaster()

  tableIndex: any;

  HAuthMaste_SysID: any;

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
    this.TblHAuthMaster.TbldAuthMasterCo = [new TbldAuthMasterCo()]

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAuthMaste_SysID = Number(id);
        this.TblHAuthMaster.HAuthMaste_SysID = Number(id);
        this.getData()
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
        const isExist = this.TblHAuthMaster.TbldAuthMasterCo.some(item => item.DcAuthMaste_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Authorizer Master' });
          return;
        }
        this.TblHAuthMaster.TbldAuthMasterCo[this.tableIndex].DcAuthMaste_SingleCo_SysID = event.sysId

        this.TblHAuthMaster.TbldAuthMasterCo[this.tableIndex].DcAuthMaste_SingleCo_Code = event.code
        this.TblHAuthMaster.TbldAuthMasterCo[this.tableIndex].DcAuthMaste_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHAuthMaster.HAuthMaste_AcDe_Code = event.code
        this.TblHAuthMaster.HAuthMaste_AcDe_Name = event.name
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


        if (this.TblHAuthMaster.HAuthMaste_SysID && rowData.DcAuthMaste_SingleCo_SysID) {
          this.masterService.deleteData('account-module', `company?where[DcAuthMaste_SysID]=${this.TblHAuthMaster.TbldAuthMasterCo[0].DcAuthMaste_SysID}&where[DcAuthMaste_SingleCo_SysID]=${rowData.DcAuthMaste_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldAuthMasterCo') {
                this.TblHAuthMaster.TbldAuthMasterCo.splice(index, 1);
                if (this.TblHAuthMaster.TbldAuthMasterCo.length === 0) {
                  this.addRow('TbldAuthMasterCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldAuthMasterCo') {
            this.TblHAuthMaster.TbldAuthMasterCo.splice(index, 1);
            if (this.TblHAuthMaster.TbldAuthMasterCo.length === 0) {
              this.addRow('TbldAuthMasterCo', -1);
            }
          }
        }




      }
    });


  }

  addRow(table: any, index: number) {
    if (table == 'TbldAuthMasterCo') {
      const newRow = new TbldAuthMasterCo()
      this.TblHAuthMaster.TbldAuthMasterCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHAuthMaster.HAuthMaste_Code == null || this.TblHAuthMaster.HAuthMaste_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Menu Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHAuthMaster.HAuthMaste_Name == null || this.TblHAuthMaster.HAuthMaste_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Menu Master Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHAuthMaster.TbldAuthMasterCo = this.TblHAuthMaster.TbldAuthMasterCo.filter(
      row => row.DcAuthMaste_SingleCo_Code && row.DcAuthMaste_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData('account-module', this.TblHAuthMaster).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHAuthMaster = new TblHAuthMaster()
        this.TblHAuthMaster.TbldAuthMasterCo = [new TbldAuthMasterCo()]

      }

    })
  }

  funcSearch() {
    this.getData()
  }


  getData() {
    if (this.TblHAuthMaster.HAuthMaste_SysID || this.HAuthMaste_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.accModule, this.TblHAuthMaster.HAuthMaste_SysID).then((res) => {
        this.TblHAuthMaster = res
        this.showDeleteButton = true;

        if (this.TblHAuthMaster.TbldAuthMasterCo.length == 0) {
          this.TblHAuthMaster.TbldAuthMasterCo = [new TbldAuthMasterCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHAuthMaster = new TblHAuthMaster()
          this.TblHAuthMaster.TbldAuthMasterCo = [new TbldAuthMasterCo()]
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
        this.masterService.deleteData('account-module', this.TblHAuthMaster.HAuthMaste_SysID).then((res) => {

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
    this.TblHAuthMaster = new TblHAuthMaster()
    this.TblHAuthMaster.TbldAuthMasterCo = [new TbldAuthMasterCo()]
    this.router.navigate(['l-master/authorizer-master']);
  }

  cancel(){
    this.TblHAuthMaster = new TblHAuthMaster()
          this.TblHAuthMaster.TbldAuthMasterCo = [new TbldAuthMasterCo()]
  }

  //***************************************LIST********************************
  menumasterList() {
    this.menuList = true
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
      const hasData = item.HAuthMaste_Code || item.HAccModule_Short_Name || item.HAccModule_Long_Name || item.HAuthMaste_SysID;
      const matchesQuery =
        (item.HAuthMaste_Code || '').toLowerCase().includes(query) ||
        (item.HAccModule_Short_Name || '').toLowerCase().includes(query) ||
        (item.HAccModule_Long_Name || '').toLowerCase().includes(query) ||
        item.HAuthMaste_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.menuList = false
    this.router.navigate(['l-master/authorizer-master']);


  }
    editRow(rowData: any) {
    this.router.navigate(['l-master/authorizer-master/' + rowData.HAuthMaste_SysID]);
  }



}
