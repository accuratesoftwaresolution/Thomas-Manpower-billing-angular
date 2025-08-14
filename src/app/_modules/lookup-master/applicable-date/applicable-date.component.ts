import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldAppDateCo } from 'src/app/_dto/masters/applicable-date/TbldAppDateCo.dto';
import { TblHAppDate } from 'src/app/_dto/masters/applicable-date/TblHAppDate.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-applicable-date',
  templateUrl: './applicable-date.component.html',
  styleUrls: ['./applicable-date.component.scss']
})
export class ApplicableDateComponent implements OnInit {
  
  TblHAppDate: TblHAppDate = new TblHAppDate()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  ShowApplicableList: boolean = false

  tableIndex: any;

  HAppDate_SysID: any;

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
    this.TblHAppDate.TbldAppDateCo = [new TbldAppDateCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAppDate_SysID = Number(id);
        this.TblHAppDate.HAppDate_SysID = Number(id);
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
        const isExist = this.TblHAppDate.TbldAppDateCo.some(item => item.DcAppDate_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Applicable Date Master' });
          return;
        }
        this.TblHAppDate.TbldAppDateCo[this.tableIndex].DcAppDate_SingleCo_SysID = event.sysId
        this.TblHAppDate.TbldAppDateCo[this.tableIndex].DcAppDate_SingleCo_Code = event.code
        this.TblHAppDate.TbldAppDateCo[this.tableIndex].DcAppDate_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHAppDate.HAppDate_AcDe_Code = event.code
        this.TblHAppDate.HAppDate_AcDe_Name = event.name
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


        if (this.TblHAppDate.HAppDate_SysID && rowData.DcAppDate_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.applicableDate, `company?where[DcAppDate_SysID]=${this.TblHAppDate.TbldAppDateCo[0].DcAppDate_SysID}&where[DcAppDate_SingleCo_SysID]=${rowData.DcAppDate_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldAppDateCo') {
                this.TblHAppDate.TbldAppDateCo.splice(index, 1);
                if (this.TblHAppDate.TbldAppDateCo.length === 0) {
                  this.addRow('TbldAppDateCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldAppDateCo') {
            this.TblHAppDate.TbldAppDateCo.splice(index, 1);
            if (this.TblHAppDate.TbldAppDateCo.length === 0) {
              this.addRow('TbldAppDateCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldAppDateCo') {
      const newRow = new TbldAppDateCo()
      this.TblHAppDate.TbldAppDateCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHAppDate.HAppDate_Code == null || this.TblHAppDate.HAppDate_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Applicable Date Code Cannot Be Null' });
      return false;
    }

    if (this.TblHAppDate.HAppDate_Name == null || this.TblHAppDate.HAppDate_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Applicable Date Name Cannot Be Null' });
      return false;
    }

    if (this.TblHAppDate.TbldAppDateCo[0].DcAppDate_SingleCo_Code == null || this.TblHAppDate.TbldAppDateCo[0].DcAppDate_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Applicable Date Single Company Code Cannot Be Null' });
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
    this.TblHAppDate.TbldAppDateCo = this.TblHAppDate.TbldAppDateCo.filter(
      row => row.DcAppDate_SingleCo_Code && row.DcAppDate_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.applicableDate, this.TblHAppDate).then((res) => {
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
        this.TblHAppDate = new TblHAppDate();
        this.TblHAppDate.TbldAppDateCo = [new TbldAppDateCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/applicable-date/']);

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
    if (this.TblHAppDate.HAppDate_SysID || this.HAppDate_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.applicableDate, this.TblHAppDate.HAppDate_SysID).then((res) => {
        this.TblHAppDate = res
        this.showDeleteButton = true;

        if (this.TblHAppDate.TbldAppDateCo.length == 0) {
          this.TblHAppDate.TbldAppDateCo = [new TbldAppDateCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHAppDate = new TblHAppDate()
          this.TblHAppDate.TbldAppDateCo = [new TbldAppDateCo()]
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
        this.masterService.deleteData(apiUrl.applicableDate, this.TblHAppDate.HAppDate_SysID).then((res) => {

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
    this.TblHAppDate = new TblHAppDate()
    this.TblHAppDate.TbldAppDateCo = [new TbldAppDateCo()]
    this.router.navigate(['l-master/applicable-date/']);

  }
  cancel() {
    this.TblHAppDate = new TblHAppDate()
    this.TblHAppDate.TbldAppDateCo = [new TbldAppDateCo()]
    this.router.navigate(['l-master/applicable-date']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayApplicableList() {
    this.ShowApplicableList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.applicableDate).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HAppDate_Code || item.HAppDate_Name || item.HAppDate_SysID;
      const matchesQuery =
        (item.HAppDate_Code || '').toLowerCase().includes(query) ||
        (item.HAppDate_Name || '').toLowerCase().includes(query) ||
        item.HAppDate_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.ShowApplicableList = false
    this.router.navigate(['l-master/applicable-date']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/applicable-date/' + rowData.HAppDate_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.applicableDate, rowData.HAppDate_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.ShowApplicableList = false

            this.getListData()
          }

        });
      }
    });
  }

}
