import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldDivisionCo } from 'src/app/_dto/masters/division/TbldDivisionCo.dto';
import { TblHDivision } from 'src/app/_dto/masters/division/TblHDivision.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  // TbldDivisionCo: any[] = [new TbldDivisionCo()];

  TblHDivision: TblHDivision = new TblHDivision()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showdivisionList: boolean = false

  tableIndex: any;

  HDivision_SysID: any;

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
    this.TblHDivision.TbldDivisionCo = [new TbldDivisionCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HDivision_SysID = Number(id);
        this.TblHDivision.HDivision_SysID = Number(id);
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
        const isExist = this.TblHDivision.TbldDivisionCo.some(item => item.DcDivision_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Division Master' });
          return;
        }
        this.TblHDivision.TbldDivisionCo[this.tableIndex].DcDivision_SingleCo_SysID = event.SingleCo_SysID
        this.TblHDivision.TbldDivisionCo[this.tableIndex].DcDivision_SingleCo_Code = event.SingleCo_Code
        this.TblHDivision.TbldDivisionCo[this.tableIndex].DcDivision_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHDivision.HDivision_AcDe_SysID = event.HActDeactive_SysID
        this.TblHDivision.HDivision_AcDe_Code = event.HActDeactive_Code
        this.TblHDivision.HDivision_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHDivision.HDivision_SysID && rowData.DcDivision_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.division, `company?where[DcDivision_SysID]=${this.TblHDivision.TbldDivisionCo[0].DcDivision_SysID}&where[DcDivision_SingleCo_SysID]=${rowData.DcDivision_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldDivisionCo') {
                this.TblHDivision.TbldDivisionCo.splice(index, 1);
                if (this.TblHDivision.TbldDivisionCo.length === 0) {
                  this.addRow('TbldDivisionCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldDivisionCo') {
            this.TblHDivision.TbldDivisionCo.splice(index, 1);
            if (this.TblHDivision.TbldDivisionCo.length === 0) {
              this.addRow('TbldDivisionCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldDivisionCo') {
      const newRow = new TbldDivisionCo()
      this.TblHDivision.TbldDivisionCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHDivision.HDivision_Code == null || this.TblHDivision.HDivision_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Division Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHDivision.HDivision_Name == null || this.TblHDivision.HDivision_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Division Master Name Cannot Be Null' });
      return false;
    }

     if (this.TblHDivision.TbldDivisionCo[0].DcDivision_SingleCo_Code == null || this.TblHDivision.TbldDivisionCo[0].DcDivision_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Division Single Company Code Cannot Be Null' });
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
    this.TblHDivision.TbldDivisionCo = this.TblHDivision.TbldDivisionCo.filter(
      row => row.DcDivision_SingleCo_Code && row.DcDivision_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.division, this.TblHDivision).then((res) => {
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
        this.TblHDivision = new TblHDivision();
        this.TblHDivision.TbldDivisionCo = [new TbldDivisionCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/division/']);

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
    if (this.TblHDivision.HDivision_SysID || this.HDivision_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.division, this.TblHDivision.HDivision_SysID).then((res) => {
        this.TblHDivision = res
        this.showDeleteButton = true;

        if (this.TblHDivision.TbldDivisionCo.length == 0) {
          this.TblHDivision.TbldDivisionCo = [new TbldDivisionCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHDivision = new TblHDivision()
          this.TblHDivision.TbldDivisionCo = [new TbldDivisionCo()]
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
        this.masterService.deleteData(apiUrl.division, this.TblHDivision.HDivision_SysID).then((res) => {

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
    this.TblHDivision = new TblHDivision()
    this.TblHDivision.TbldDivisionCo = [new TbldDivisionCo()]
    this.router.navigate(['l-master/division/']);

  }
  cancel() {
    this.TblHDivision = new TblHDivision()
    this.TblHDivision.TbldDivisionCo = [new TbldDivisionCo()]
    this.router.navigate(['l-master/division']);


  }

  // ---------------------------------------------------------------------List--------------------------
  displaydivisionList() {
    this.showdivisionList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.division).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HDivision_Code || item.HDivision_Name || item.HDivision_SysID;
      const matchesQuery =
        (item.HDivision_Code || '').toLowerCase().includes(query) ||
        (item.HDivision_Name || '').toLowerCase().includes(query) ||
        item.HDivision_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showdivisionList = false
    this.router.navigate(['l-master/division']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/division/' + rowData.HDivision_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.division, rowData.HDivision_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showdivisionList = false

            this.getListData()
          }

        });
      }
    });
  }

}


