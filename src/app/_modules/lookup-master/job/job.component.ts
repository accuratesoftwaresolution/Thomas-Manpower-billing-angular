import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldJobCo } from 'src/app/_dto/masters/job/TbldJobCo.dto';
import { TblHJob } from 'src/app/_dto/masters/job/TblHJob.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  TblHJob: TblHJob = new TblHJob()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showjobList: boolean = false

  tableIndex: any;

  HJob_SysID: any;

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
    this.TblHJob.TbldJobCo = [new TbldJobCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HJob_SysID = Number(id);
        this.TblHJob.HJob_SysID = Number(id);
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
        const isExist = this.TblHJob.TbldJobCo.some(item => item.DcJob_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for job Master' });
          return;
        }
        this.TblHJob.TbldJobCo[this.tableIndex].DcJob_SingleCo_SysID = event.SingleCo_SysID
        this.TblHJob.TbldJobCo[this.tableIndex].DcJob_SingleCo_Code = event.SingleCo_Code
        this.TblHJob.TbldJobCo[this.tableIndex].DcJob_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHJob.HJob_AcDe_SysID = event.HActDeactive_SysID
        this.TblHJob.HJob_AcDe_Code = event.HActDeactive_Code
        this.TblHJob.HJob_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHJob.HJob_SysID && rowData.DcJob_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.job, `company?where[DcJob_SysID]=${this.TblHJob.TbldJobCo[0].DcJob_SysID}&where[DcJob_SingleCo_SysID]=${rowData.DcJob_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldJobCo') {
                this.TblHJob.TbldJobCo.splice(index, 1);
                if (this.TblHJob.TbldJobCo.length === 0) {
                  this.addRow('TbldJobCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldJobCo') {
            this.TblHJob.TbldJobCo.splice(index, 1);
            if (this.TblHJob.TbldJobCo.length === 0) {
              this.addRow('TbldJobCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldJobCo') {
      const newRow = new TbldJobCo()
      this.TblHJob.TbldJobCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHJob.HJob_Code == null || this.TblHJob.HJob_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'job Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHJob.HJob_Name == null || this.TblHJob.HJob_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'job Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHJob.TbldJobCo[0].DcJob_SingleCo_Code == null || this.TblHJob.TbldJobCo[0].DcJob_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'job Single Company Code Cannot Be Null' });
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
    this.TblHJob.TbldJobCo = this.TblHJob.TbldJobCo.filter(
      row => row.DcJob_SingleCo_Code && row.DcJob_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.job, this.TblHJob).then((res) => {
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
        this.TblHJob = new TblHJob();
        this.TblHJob.TbldJobCo = [new TbldJobCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/job/']);

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
    if (this.TblHJob.HJob_SysID || this.HJob_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.job, this.TblHJob.HJob_SysID).then((res) => {
        this.TblHJob = res
        this.showDeleteButton = true;

        if (this.TblHJob.TbldJobCo.length == 0) {
          this.TblHJob.TbldJobCo = [new TbldJobCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHJob = new TblHJob()
          this.TblHJob.TbldJobCo = [new TbldJobCo()]
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
        this.masterService.deleteData(apiUrl.job, this.TblHJob.HJob_SysID).then((res) => {

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
    this.TblHJob = new TblHJob()
    this.TblHJob.TbldJobCo = [new TbldJobCo()]
    this.router.navigate(['l-master/job/']);

  }
  cancel() {
    this.TblHJob = new TblHJob()
    this.TblHJob.TbldJobCo = [new TbldJobCo()]
    this.router.navigate(['l-master/job']);
  }

  // ---------------------------------------------------------------------List--------------------------
  displayjobList() {
    this.showjobList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.job).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HJob_Code || item.HJob_Name || item.HJob_SysID;
      const matchesQuery =
        (item.HJob_Code || '').toLowerCase().includes(query) ||
        (item.HJob_Name || '').toLowerCase().includes(query) ||
        item.HJob_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showjobList = false
    this.router.navigate(['l-master/job']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/job/' + rowData.HJob_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.job, rowData.HJob_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showjobList = false

            this.getListData()
          }

        });
      }
    });
  }
}