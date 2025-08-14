import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldActDeactiveCo } from 'src/app/_dto/TbldActDeactiveCo.dto';
import { TblHActDeactive } from 'src/app/_dto/TblHActDeactive.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-activate-and-deactivate',
  templateUrl: './activate-and-deactivate.component.html',
  styleUrls: ['./activate-and-deactivate.component.scss']
})
export class ActivateAndDeactivateComponent implements OnInit {

  TblHActDeactive: TblHActDeactive = new TblHActDeactive()

  singleCompany: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showActivateDeactivateList: boolean = false

  tableIndex: any;

  HActDeactive_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHActDeactive.TbldActDeactiveCo = [new TbldActDeactiveCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HActDeactive_SysID = Number(id);
        this.TblHActDeactive.HActDeactive_SysID = Number(id);
        this.getdata()
      }

    });
    this.getlovdata()
  }

  getlovdata() {

    this.masterService.getMasterData(apiUrl.singleCompany).then((res) => {
      this.singleCompany = res
    })
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
         this.popUpService.popUpData = this.singleCompany;

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
        const selectedCode = event.SingleCo_Code;
        const isExist = this.TblHActDeactive.TbldActDeactiveCo.some(item => item.DcActDeactive_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Activate and Deactivate Master' });
          return;
        }
        this.TblHActDeactive.TbldActDeactiveCo[this.tableIndex].DcActDeactive_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHActDeactive.TbldActDeactiveCo[this.tableIndex].DcActDeactive_SingleCo_Code = event.SingleCo_Code;
        this.TblHActDeactive.TbldActDeactiveCo[this.tableIndex].DcActDeactive_SingleCo_Name = event.SingleCo_Name;
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


        if (this.TblHActDeactive.HActDeactive_SysID && rowData.DcActDeactive_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.activateAndDeactivate, `company?where[DcActDeactive_SysID]=${this.TblHActDeactive.TbldActDeactiveCo[0].DcActDeactive_SysID}&where[DcActDeactive_SingleCo_SysID]=${rowData.DcActDeactive_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldActDeactiveCo') {
                this.TblHActDeactive.TbldActDeactiveCo.splice(index, 1);
                if (this.TblHActDeactive.TbldActDeactiveCo.length === 0) {
                  this.addRow('TbldActDeactiveCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldActDeactiveCo') {
            this.TblHActDeactive.TbldActDeactiveCo.splice(index, 1);
            if (this.TblHActDeactive.TbldActDeactiveCo.length === 0) {
              this.addRow('TbldActDeactiveCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldActDeactiveCo') {
      const newRow = new TbldActDeactiveCo()
      this.TblHActDeactive.TbldActDeactiveCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHActDeactive.HActDeactive_Code == null || this.TblHActDeactive.HActDeactive_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Activate and Deactivate Code Cannot Be Null' });
      return false;
    }

    if (this.TblHActDeactive.HActDeactive_Name == null || this.TblHActDeactive.HActDeactive_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Activate and Deactivate Name Cannot Be Null' });
      return false;
    }

    if (this.TblHActDeactive.TbldActDeactiveCo[0].DcActDeactive_SingleCo_Code == null || this.TblHActDeactive.TbldActDeactiveCo[0].DcActDeactive_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Activate and Deactivate Single Company Code Cannot Be Null' });
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
    this.TblHActDeactive.TbldActDeactiveCo = this.TblHActDeactive.TbldActDeactiveCo.filter(
      row => row.DcActDeactive_SingleCo_Code && row.DcActDeactive_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.activateAndDeactivate, this.TblHActDeactive).then((res) => {
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
        this.TblHActDeactive = new TblHActDeactive();
        this.TblHActDeactive.TbldActDeactiveCo = [new TbldActDeactiveCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/active-deactive/']);

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
    if (this.TblHActDeactive.HActDeactive_SysID || this.HActDeactive_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.activateAndDeactivate, this.TblHActDeactive.HActDeactive_SysID).then((res) => {
        this.TblHActDeactive = res
        this.showDeleteButton = true;

        if (this.TblHActDeactive.TbldActDeactiveCo.length == 0) {
          this.TblHActDeactive.TbldActDeactiveCo = [new TbldActDeactiveCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHActDeactive = new TblHActDeactive()
          this.TblHActDeactive.TbldActDeactiveCo = [new TbldActDeactiveCo()]
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
        this.masterService.deleteData(apiUrl.activateAndDeactivate, this.TblHActDeactive.HActDeactive_SysID).then((res) => {

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
    this.TblHActDeactive = new TblHActDeactive()
    this.TblHActDeactive.TbldActDeactiveCo = [new TbldActDeactiveCo()]
    this.router.navigate(['l-master/active-deactive/']);

  }
  cancel() {
    this.TblHActDeactive = new TblHActDeactive()
    this.TblHActDeactive.TbldActDeactiveCo = [new TbldActDeactiveCo()]
    this.router.navigate(['l-master/active-deactive']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayActivateDeactivateList() {
    this.showActivateDeactivateList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HActDeactive_Code || item.HActDeactive_Name || item.HActDeactive_SysID;
      const matchesQuery =
        (item.HActDeactive_Code || '').toLowerCase().includes(query) ||
        (item.HActDeactive_Name || '').toLowerCase().includes(query) ||
        item.HActDeactive_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showActivateDeactivateList = false
    this.router.navigate(['l-master/active-deactive']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/active-deactive/' + rowData.HActDeactive_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.activateAndDeactivate, rowData.HActDeactive_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showActivateDeactivateList = false

            this.getListData()
          }

        });
      }
    });
  }

}
