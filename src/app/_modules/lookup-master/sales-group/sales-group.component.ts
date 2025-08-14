import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldSalGroupCo } from 'src/app/_dto/masters/sales-group/TbldSalGroupCo.dto';
import { TblHSalGroup } from 'src/app/_dto/masters/sales-group/TblHSalGroup.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-sales-group',
  templateUrl: './sales-group.component.html',
  styleUrls: ['./sales-group.component.scss']
})
export class SalesGroupComponent implements OnInit {
TblHSalGroup: TblHSalGroup = new TblHSalGroup()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showSalesGroupList: boolean = false

  tableIndex: any;

  HSalGroup_SysID: any;

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
    this.TblHSalGroup.TbldSalGroupCo = [new TbldSalGroupCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HSalGroup_SysID = Number(id);
        this.TblHSalGroup.HSalGroup_SysID = Number(id);
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
        const isExist = this.TblHSalGroup.TbldSalGroupCo.some(item => item.DcSalGroup_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Sales Group Master' });
          return;
        }
        this.TblHSalGroup.TbldSalGroupCo[this.tableIndex].DcSalGroup_SingleCo_SysID = event.SingleCo_SysID
        this.TblHSalGroup.TbldSalGroupCo[this.tableIndex].DcSalGroup_SingleCo_Code = event.SingleCo_Code
        this.TblHSalGroup.TbldSalGroupCo[this.tableIndex].DcSalGroup_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHSalGroup.HSalGroup_AcDe_SysID = event.HActDeactive_SysID
        this.TblHSalGroup.HSalGroup_AcDe_Code = event.HActDeactive_Code
        this.TblHSalGroup.HSalGroup_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHSalGroup.HSalGroup_SysID && rowData.DcSalGroup_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.salesGroup, `company?where[DcSalGroup_SysID]=${this.TblHSalGroup.TbldSalGroupCo[0].DcSalGroup_SysID}&where[DcSalGroup_SingleCo_SysID]=${rowData.DcSalGroup_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldSalGroupCo') {
                this.TblHSalGroup.TbldSalGroupCo.splice(index, 1);
                if (this.TblHSalGroup.TbldSalGroupCo.length === 0) {
                  this.addRow('TbldSalGroupCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldSalGroupCo') {
            this.TblHSalGroup.TbldSalGroupCo.splice(index, 1);
            if (this.TblHSalGroup.TbldSalGroupCo.length === 0) {
              this.addRow('TbldSalGroupCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldSalGroupCo') {
      const newRow = new TbldSalGroupCo()
      this.TblHSalGroup.TbldSalGroupCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHSalGroup.HSalGroup_Code == null || this.TblHSalGroup.HSalGroup_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Group Code Cannot Be Null' });
      return false;
    }

    if (this.TblHSalGroup.HSalGroup_Name == null || this.TblHSalGroup.HSalGroup_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Group Name Cannot Be Null' });
      return false;
    }

     if (this.TblHSalGroup.TbldSalGroupCo[0].DcSalGroup_SingleCo_Code == null || this.TblHSalGroup.TbldSalGroupCo[0].DcSalGroup_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Sales Group Single Company Code Cannot Be Null' });
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
    this.TblHSalGroup.TbldSalGroupCo = this.TblHSalGroup.TbldSalGroupCo.filter(
      row => row.DcSalGroup_SingleCo_Code && row.DcSalGroup_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.salesGroup, this.TblHSalGroup).then((res) => {
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
        this.TblHSalGroup = new TblHSalGroup();
        this.TblHSalGroup.TbldSalGroupCo = [new TbldSalGroupCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/sales-group/']);

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
    if (this.TblHSalGroup.HSalGroup_SysID || this.HSalGroup_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.salesGroup, this.TblHSalGroup.HSalGroup_SysID).then((res) => {
        this.TblHSalGroup = res
        this.showDeleteButton = true;

        if (this.TblHSalGroup.TbldSalGroupCo.length == 0) {
          this.TblHSalGroup.TbldSalGroupCo = [new TbldSalGroupCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHSalGroup = new TblHSalGroup()
          this.TblHSalGroup.TbldSalGroupCo = [new TbldSalGroupCo()]
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
        this.masterService.deleteData(apiUrl.salesGroup, this.TblHSalGroup.HSalGroup_SysID).then((res) => {

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
    this.TblHSalGroup = new TblHSalGroup()
    this.TblHSalGroup.TbldSalGroupCo = [new TbldSalGroupCo()]
    this.router.navigate(['l-master/sales-group/']);

  }
  cancel() {
    this.TblHSalGroup = new TblHSalGroup()
    this.TblHSalGroup.TbldSalGroupCo = [new TbldSalGroupCo()]
    this.router.navigate(['l-master/sales-group']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displaySalesGroupList() {
    this.showSalesGroupList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.salesGroup).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HSalGroup_Code || item.HSalGroup_Name || item.HSalGroup_SysID;
      const matchesQuery =
        (item.HSalGroup_Code || '').toLowerCase().includes(query) ||
        (item.HSalGroup_Name || '').toLowerCase().includes(query) ||
        item.HSalGroup_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showSalesGroupList = false
    this.router.navigate(['l-master/sales-group']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/sales-group/' + rowData.HSalGroup_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.salesGroup, rowData.HSalGroup_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showSalesGroupList = false

            this.getListData()
          }

        });
      }
    });
  }

}