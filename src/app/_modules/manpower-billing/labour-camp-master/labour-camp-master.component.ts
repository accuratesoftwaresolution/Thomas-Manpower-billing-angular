import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPLabCampCo } from 'src/app/_dto/labour-camp-master/TbldPLabCampCo.dto';
import { TblHPLabCamp } from 'src/app/_dto/labour-camp-master/TblHPLabCamp.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-labour-camp-master',
  templateUrl: './labour-camp-master.component.html',
  styleUrls: ['./labour-camp-master.component.scss']
})
export class LabourCampMasterComponent implements OnInit {
showListButton: boolean = true;

  TblHPLabCamp: TblHPLabCamp = new TblHPLabCamp()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPLabCamp_SysID: any;

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
    this.TblHPLabCamp.TbldPLabCampCo = [new TbldPLabCampCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPLabCamp_SysID = Number(id);
        this.TblHPLabCamp.HPLabCamp_SysID = Number(id);
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
        const isExist = this.TblHPLabCamp.TbldPLabCampCo.some(item => item.DcpLabCamp_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Labour Camp Master' });
          return;
        }
        this.TblHPLabCamp.TbldPLabCampCo[this.tableIndex].DcpLabCamp_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPLabCamp.TbldPLabCampCo[this.tableIndex].DcpLabCamp_SingleCo_Code = event.SingleCo_Code;
        this.TblHPLabCamp.TbldPLabCampCo[this.tableIndex].DcpLabCamp_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPLabCamp.HPLabCamp_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPLabCamp.HPLabCamp_AcDe_Code = event.HActDeactive_Code
        this.TblHPLabCamp.HPLabCamp_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPLabCamp.HPLabCamp_SysID && rowData.DcpLabCamp_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.labourCampMaster, `company?where[DcpLabCamp_GridSysID]=${this.TblHPLabCamp.TbldPLabCampCo[0].DcpLabCamp_GridSysID}&where[DcpLabCamp_SingleCo_SysID]=${rowData.DcpLabCamp_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPLabCampCo') {
                this.TblHPLabCamp.TbldPLabCampCo.splice(index, 1);
                if (this.TblHPLabCamp.TbldPLabCampCo.length === 0) {
                  this.addRow('TbldPLabCampCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPLabCampCo') {
            this.TblHPLabCamp.TbldPLabCampCo.splice(index, 1);
            if (this.TblHPLabCamp.TbldPLabCampCo.length === 0) {
              this.addRow('TbldPLabCampCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPLabCampCo') {
      const newRow = new TbldPLabCampCo()
      this.TblHPLabCamp.TbldPLabCampCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPLabCamp.HPLabCamp_Code == null || this.TblHPLabCamp.HPLabCamp_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Labour Camp Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPLabCamp.HPLabCamp_Name == null || this.TblHPLabCamp.HPLabCamp_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Labour Camp Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPLabCamp.TbldPLabCampCo[0].DcpLabCamp_SingleCo_Code == null || this.TblHPLabCamp.TbldPLabCampCo[0].DcpLabCamp_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Labour Camp Master Single Company Code Cannot Be Null' });
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
    this.TblHPLabCamp.TbldPLabCampCo = this.TblHPLabCamp.TbldPLabCampCo.filter(
      row => row.DcpLabCamp_SingleCo_Code && row.DcpLabCamp_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.labourCampMaster, this.TblHPLabCamp).then((res) => {
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
        this.TblHPLabCamp = new TblHPLabCamp();
        this.TblHPLabCamp.TbldPLabCampCo = [new TbldPLabCampCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/labour-camp-master/']);

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
    if (this.TblHPLabCamp.HPLabCamp_SysID || this.HPLabCamp_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.labourCampMaster, this.TblHPLabCamp.HPLabCamp_SysID).then((res) => {
        this.TblHPLabCamp = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPLabCamp.TbldPLabCampCo.length == 0) {
          this.TblHPLabCamp.TbldPLabCampCo = [new TbldPLabCampCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPLabCamp = new TblHPLabCamp()
          this.TblHPLabCamp.TbldPLabCampCo = [new TbldPLabCampCo()]
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
        this.masterService.deleteData(apiUrl.labourCampMaster, this.TblHPLabCamp.HPLabCamp_SysID).then((res) => {

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
    this.TblHPLabCamp = new TblHPLabCamp()
    this.TblHPLabCamp.TbldPLabCampCo = [new TbldPLabCampCo()]
    this.router.navigate(['Manpower/labour-camp-master/']);

  }
  cancel() {
    this.TblHPLabCamp = new TblHPLabCamp()
    this.TblHPLabCamp.TbldPLabCampCo = [new TbldPLabCampCo()]
    this.router.navigate(['Manpower/labour-camp-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.labourCampMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPLabCamp_Code || item.HPLabCamp_Name || item.HPLabCamp_SysID;
      const matchesQuery =
        (item.HPLabCamp_Code || '').toLowerCase().includes(query) ||
        (item.HPLabCamp_Name || '').toLowerCase().includes(query) ||
        item.HPLabCamp_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/labour-camp-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/labour-camp-master/' + rowData.HPLabCamp_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.labourCampMaster, rowData.HPLabCamp_SysID).then((res) => {

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
