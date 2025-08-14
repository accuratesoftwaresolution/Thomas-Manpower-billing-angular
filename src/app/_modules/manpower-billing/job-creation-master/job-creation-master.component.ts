import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPJobCreatCo } from 'src/app/_dto/job-creation-master/TbldPJobCreatCo.dto';
import { TblHPJobCrea } from 'src/app/_dto/job-creation-master/TblHPJobCrea.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-job-creation-master',
  templateUrl: './job-creation-master.component.html',
  styleUrls: ['./job-creation-master.component.scss']
})
export class JobCreationMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHPJobCrea: TblHPJobCrea = new TblHPJobCrea()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPJobCrea_SysID: any;

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
    this.TblHPJobCrea.TbldPJobCreatCo = [new TbldPJobCreatCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPJobCrea_SysID = Number(id);
        this.TblHPJobCrea.HPJobCrea_SysID = Number(id);
        this.getdata()
      }
    });
    this.getlovdata()
  }
  getlovdata() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activatedeactivate = res
    })
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
      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activatedeactivate;
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
        const isExist = this.TblHPJobCrea.TbldPJobCreatCo.some(item => item.DcpJobCrea_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Job Creation Master' });
          return;
        }
        this.TblHPJobCrea.TbldPJobCreatCo[this.tableIndex].DcpJobCrea_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPJobCrea.TbldPJobCreatCo[this.tableIndex].DcpJobCrea_SingleCo_Code = event.SingleCo_Code;
        this.TblHPJobCrea.TbldPJobCreatCo[this.tableIndex].DcpJobCrea_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPJobCrea.HPJobCrea_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPJobCrea.HPJobCrea_AcDe_Code = event.HActDeactive_Code
        this.TblHPJobCrea.HPJobCrea_AcDe_Name = event.HActDeactive_Name
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
        this.showListButton = true;

        if (this.TblHPJobCrea.HPJobCrea_SysID && rowData.DcpJobCrea_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.jobCreation, `company?where[DcpJobCrea_GridSysID]=${this.TblHPJobCrea.TbldPJobCreatCo[0].DcpJobCrea_GridSysID}&where[DcpJobCrea_SingleCo_SysID]=${rowData.DcpJobCrea_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPJobCreatCo') {
                this.TblHPJobCrea.TbldPJobCreatCo.splice(index, 1);
                if (this.TblHPJobCrea.TbldPJobCreatCo.length === 0) {
                  this.addRow('TbldPJobCreatCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPJobCreatCo') {
            this.TblHPJobCrea.TbldPJobCreatCo.splice(index, 1);
            if (this.TblHPJobCrea.TbldPJobCreatCo.length === 0) {
              this.addRow('TbldPJobCreatCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPJobCreatCo') {
      const newRow = new TbldPJobCreatCo()
      this.TblHPJobCrea.TbldPJobCreatCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPJobCrea.HPJobCrea_Code == null || this.TblHPJobCrea.HPJobCrea_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Job Creation Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPJobCrea.HPJobCrea_Name == null || this.TblHPJobCrea.HPJobCrea_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Job Creation Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPJobCrea.TbldPJobCreatCo[0].DcpJobCrea_SingleCo_Code == null || this.TblHPJobCrea.TbldPJobCreatCo[0].DcpJobCrea_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Job Creation Master Single Company Code Cannot Be Null' });
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
    this.TblHPJobCrea.TbldPJobCreatCo = this.TblHPJobCrea.TbldPJobCreatCo.filter(
      row => row.DcpJobCrea_SingleCo_Code && row.DcpJobCrea_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.jobCreation, this.TblHPJobCrea).then((res) => {
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

        this.showListButton = true;

        // Reset form
        this.TblHPJobCrea = new TblHPJobCrea();
        this.TblHPJobCrea.TbldPJobCreatCo = [new TbldPJobCreatCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/job-creation-master/']);

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
    if (this.TblHPJobCrea.HPJobCrea_SysID || this.HPJobCrea_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.jobCreation, this.TblHPJobCrea.HPJobCrea_SysID).then((res) => {
        this.TblHPJobCrea = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPJobCrea.TbldPJobCreatCo.length == 0) {
          this.TblHPJobCrea.TbldPJobCreatCo = [new TbldPJobCreatCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPJobCrea = new TblHPJobCrea()
          this.TblHPJobCrea.TbldPJobCreatCo = [new TbldPJobCreatCo()]
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
        this.masterService.deleteData(apiUrl.jobCreation, this.TblHPJobCrea.HPJobCrea_SysID).then((res) => {

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
    this.TblHPJobCrea = new TblHPJobCrea()
    this.TblHPJobCrea.TbldPJobCreatCo = [new TbldPJobCreatCo()]
    this.router.navigate(['Manpower/job-creation-master/']);

  }
  cancel() {
    this.TblHPJobCrea = new TblHPJobCrea()
    this.TblHPJobCrea.TbldPJobCreatCo = [new TbldPJobCreatCo()]
    this.router.navigate(['Manpower/job-creation-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.jobCreation).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPJobCrea_Code || item.HPJobCrea_Name || item.HPJobCrea_SysID;
      const matchesQuery =
        (item.HPJobCrea_Code || '').toLowerCase().includes(query) ||
        (item.HPJobCrea_Name || '').toLowerCase().includes(query) ||
        item.HPJobCrea_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/job-creation-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/job-creation-master/' + rowData.HPJobCrea_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.jobCreation, rowData.HPJobCrea_SysID).then((res) => {

          if (res.success == false) {
            this.showListButton = true;
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

            this.showListButton = true;

            this.getListData()
          }

        });
      }
    });
  }
}
function getlovdata() {
  throw new Error('Function not implemented.');
}
