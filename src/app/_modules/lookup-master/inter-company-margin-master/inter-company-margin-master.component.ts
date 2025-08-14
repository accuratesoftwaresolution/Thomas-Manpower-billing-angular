import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldInterCoMarginCo } from 'src/app/_dto/TbldInterCoMarginCo.dto';
import { TblHInterCoMargin } from 'src/app/_dto/TblHInterCoMargin.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-inter-company-margin-master',
  templateUrl: './inter-company-margin-master.component.html',
  styleUrls: ['./inter-company-margin-master.component.scss']
})
export class InterCompanyMarginMasterComponent implements OnInit {
TblHInterCoMargin: TblHInterCoMargin = new TblHInterCoMargin()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showInterCompanyList: boolean = false

  tableIndex: any;

  HInterCoMargin_SysID: any;

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
    this.TblHInterCoMargin.TbldInterCoMarginCo = [new TbldInterCoMarginCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HInterCoMargin_SysID = Number(id);
        this.TblHInterCoMargin.HInterCoMargin_SysID = Number(id);
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
        const isExist = this.TblHInterCoMargin.TbldInterCoMarginCo.some(item => item.DcInterCo_SingleCo_Code === selectedCode)

        if (isExist) {
          return;
        }
        this.TblHInterCoMargin.TbldInterCoMarginCo[this.tableIndex].DcInterCo_SingleCo_SysID = event.sysId
        this.TblHInterCoMargin.TbldInterCoMarginCo[this.tableIndex].DcInterCo_SingleCo_Code = event.code
        this.TblHInterCoMargin.TbldInterCoMarginCo[this.tableIndex].DcInterCo_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHInterCoMargin.HInterCo_AcDe_SysID = event.sysId
        this.TblHInterCoMargin.HInterCo_AcDe_Code = event.code
        this.TblHInterCoMargin.HInterCo_AcDe_Name = event.name
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


        if (this.TblHInterCoMargin.HInterCoMargin_SysID && rowData.DcInterCo_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.interCompanyMargin, `company?where[DcInterCo_SysID]=${this.TblHInterCoMargin.TbldInterCoMarginCo[0].DcInterCo_SysID}&where[DcInterCo_SingleCo_SysID]=${rowData.DcInterCo_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldInterCoMarginCo') {
                this.TblHInterCoMargin.TbldInterCoMarginCo.splice(index, 1);
                if (this.TblHInterCoMargin.TbldInterCoMarginCo.length === 0) {
                  this.addRow('TbldInterCoMarginCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldInterCoMarginCo') {
            this.TblHInterCoMargin.TbldInterCoMarginCo.splice(index, 1);
            if (this.TblHInterCoMargin.TbldInterCoMarginCo.length === 0) {
              this.addRow('TbldInterCoMarginCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldInterCoMarginCo') {
      const newRow = new TbldInterCoMarginCo()
      this.TblHInterCoMargin.TbldInterCoMarginCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHInterCoMargin.HInterCoMargin_Code == null || this.TblHInterCoMargin.HInterCoMargin_Code.toString().trim() === '') {
      return false;
    }

    if (this.TblHInterCoMargin.HInterCoMargin_Name == null || this.TblHInterCoMargin.HInterCoMargin_Name.toString().trim() === '') {
      return false;
    }

     if (this.TblHInterCoMargin.TbldInterCoMarginCo[0].DcInterCo_SingleCo_Code == null || this.TblHInterCoMargin.TbldInterCoMarginCo[0].DcInterCo_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Inter Company Margin Single Company Code Cannot Be Null' });
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
    this.TblHInterCoMargin.TbldInterCoMarginCo = this.TblHInterCoMargin.TbldInterCoMarginCo.filter(
      row => row.DcInterCo_SingleCo_Code && row.DcInterCo_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.interCompanyMargin, this.TblHInterCoMargin).then((res) => {
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
        this.TblHInterCoMargin = new TblHInterCoMargin();
        this.TblHInterCoMargin.TbldInterCoMarginCo = [new TbldInterCoMarginCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/inter-company-margin-master/']);

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
    if (this.TblHInterCoMargin.HInterCoMargin_SysID || this.HInterCoMargin_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.interCompanyMargin, this.TblHInterCoMargin.HInterCoMargin_SysID).then((res) => {
        this.TblHInterCoMargin = res
        this.showDeleteButton = true;

        if (this.TblHInterCoMargin.TbldInterCoMarginCo.length == 0) {
          this.TblHInterCoMargin.TbldInterCoMarginCo = [new TbldInterCoMarginCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHInterCoMargin = new TblHInterCoMargin()
          this.TblHInterCoMargin.TbldInterCoMarginCo = [new TbldInterCoMarginCo()]
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
        this.masterService.deleteData(apiUrl.interCompanyMargin, this.TblHInterCoMargin.HInterCoMargin_SysID).then((res) => {

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
    this.TblHInterCoMargin = new TblHInterCoMargin()
    this.TblHInterCoMargin.TbldInterCoMarginCo = [new TbldInterCoMarginCo()]
    this.router.navigate(['l-master/inter-company-margin-master/']);

  }
  cancel() {
    this.TblHInterCoMargin = new TblHInterCoMargin()
    this.TblHInterCoMargin.TbldInterCoMarginCo = [new TbldInterCoMarginCo()]
    this.router.navigate(['l-master/inter-company-margin-master']);
  }

  // ---------------------------------------------------------------------List--------------------------
  displayInterCompanyList() {
    this.showInterCompanyList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.interCompanyMargin).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HInterCoMargin_Code || item.HInterCoMargin_Name || item.HInterCoMargin_SysID;
      const matchesQuery =
        (item.HInterCoMargin_Code || '').toLowerCase().includes(query) ||
        (item.HInterCoMargin_Name || '').toLowerCase().includes(query) ||
        item.HInterCoMargin_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showInterCompanyList = false
    this.router.navigate(['l-master/inter-company-margin-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/inter-company-margin-master/' + rowData.HInterCoMargin_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.interCompanyMargin, rowData.HInterCoMargin_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showInterCompanyList = false

            this.getListData()
          }

        });
      }
    });
  }
  ConfirmDialog(){}
}
