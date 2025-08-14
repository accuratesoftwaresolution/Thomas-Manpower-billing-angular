import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldOthCentreCo } from 'src/app/_dto/masters/other-center/TbldOthCentreCo.dto';
import { TblHOthCentre } from 'src/app/_dto/masters/other-center/TblHOthCentrer.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';



@Component({
  selector: 'app-other-center',
  templateUrl: './other-center.component.html',
  styleUrls: ['./other-center.component.scss']
})
export class OtherCenterComponent implements OnInit {
 // TbldOthCentreCo: any[] = [new TbldOthCentreCo()];

  TblHOthCentre: TblHOthCentre = new TblHOthCentre()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showOtherCenterList: boolean = false

  tableIndex: any;

  HOthCentre_SysID: any;

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
    this.TblHOthCentre.TbldOthCentreCo = [new TbldOthCentreCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HOthCentre_SysID = Number(id);
        this.TblHOthCentre.HOthCentre_SysID = Number(id);
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
        const isExist = this.TblHOthCentre.TbldOthCentreCo.some(item => item.DcOthCentre_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Other Center Master' });
          return;
        }
        this.TblHOthCentre.TbldOthCentreCo[this.tableIndex].DcOthCentre_SingleCo_SysID = event.SingleCo_SysID
        this.TblHOthCentre.TbldOthCentreCo[this.tableIndex].DcOthCentre_SingleCo_Code = event.SingleCo_Code
        this.TblHOthCentre.TbldOthCentreCo[this.tableIndex].DcOthCentre_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHOthCentre.HOthCentre_AcDe_SysID = event.HActDeactive_SysID
        this.TblHOthCentre.HOthCentre_AcDe_Code = event.HActDeactive_Code
        this.TblHOthCentre.HOthCentre_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHOthCentre.HOthCentre_SysID && rowData.DcOthCentre_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.otherCentre, `company?where[DcOthCentre_SysID]=${this.TblHOthCentre.TbldOthCentreCo[0].DcOthCentre_SysID}&where[DcOthCentre_SingleCo_SysID]=${rowData.DcOthCentre_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldOthCentreCo') {
                this.TblHOthCentre.TbldOthCentreCo.splice(index, 1);
                if (this.TblHOthCentre.TbldOthCentreCo.length === 0) {
                  this.addRow('TbldOthCentreCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldOthCentreCo') {
            this.TblHOthCentre.TbldOthCentreCo.splice(index, 1);
            if (this.TblHOthCentre.TbldOthCentreCo.length === 0) {
              this.addRow('TbldOthCentreCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldOthCentreCo') {
      const newRow = new TbldOthCentreCo()
      this.TblHOthCentre.TbldOthCentreCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHOthCentre.HOthCentre_Code == null || this.TblHOthCentre.HOthCentre_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Other Center Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHOthCentre.HOthCentre_Name == null || this.TblHOthCentre.HOthCentre_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Other Center Master Name Cannot Be Null' });
      return false;
    }

     if (this.TblHOthCentre.TbldOthCentreCo[0].DcOthCentre_SingleCo_Code == null || this.TblHOthCentre.TbldOthCentreCo[0].DcOthCentre_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Other Center Single Company Code Cannot Be Null' });
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
    this.TblHOthCentre.TbldOthCentreCo = this.TblHOthCentre.TbldOthCentreCo.filter(
      row => row.DcOthCentre_SingleCo_Code && row.DcOthCentre_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.otherCentre, this.TblHOthCentre).then((res) => {
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
        this.TblHOthCentre = new TblHOthCentre();
        this.TblHOthCentre.TbldOthCentreCo = [new TbldOthCentreCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/other-centers/']);

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
    if (this.TblHOthCentre.HOthCentre_SysID || this.HOthCentre_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.otherCentre, this.TblHOthCentre.HOthCentre_SysID).then((res) => {
        this.TblHOthCentre = res
        this.showDeleteButton = true;

        if (this.TblHOthCentre.TbldOthCentreCo.length == 0) {
          this.TblHOthCentre.TbldOthCentreCo = [new TbldOthCentreCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHOthCentre = new TblHOthCentre()
          this.TblHOthCentre.TbldOthCentreCo = [new TbldOthCentreCo()]
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
        this.masterService.deleteData(apiUrl.otherCentre, this.TblHOthCentre.HOthCentre_SysID).then((res) => {

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
    this.TblHOthCentre = new TblHOthCentre()
    this.TblHOthCentre.TbldOthCentreCo = [new TbldOthCentreCo()]
    this.router.navigate(['l-master/other-centers/']);

  }
  cancel() {
    this.TblHOthCentre = new TblHOthCentre()
    this.TblHOthCentre.TbldOthCentreCo = [new TbldOthCentreCo()]
    this.router.navigate(['l-master/other-centers']);


  }

  // ---------------------------------------------------------------------List--------------------------
  displayOtherCenterList() {
    this.showOtherCenterList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.otherCentre).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HOthCentre_Code || item.HOthCentre_Name || item.HOthCentre_SysID;
      const matchesQuery =
        (item.HOthCentre_Code || '').toLowerCase().includes(query) ||
        (item.HOthCentre_Name || '').toLowerCase().includes(query) ||
        item.HOthCentre_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showOtherCenterList = false
    this.router.navigate(['l-master/other-centers']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/other-centers/' + rowData.HOthCentre_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.otherCentre, rowData.HOthCentre_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showOtherCenterList = false

            this.getListData()
          }

        });
      }
    });
  }



}