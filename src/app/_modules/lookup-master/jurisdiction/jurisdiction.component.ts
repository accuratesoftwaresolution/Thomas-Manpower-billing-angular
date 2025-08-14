import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldJurisdCo } from 'src/app/_dto/masters/jurisdiction/TbldJurisdCo.dto';
import { TblHJurisd } from 'src/app/_dto/masters/jurisdiction/TblHJurisd.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-jurisdiction',
  templateUrl: './jurisdiction.component.html',
  styleUrls: ['./jurisdiction.component.scss']
})
export class JurisdictionComponent implements OnInit {

  TblHJurisd: TblHJurisd = new TblHJurisd()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showJurisdictionList: boolean = false

  tableIndex: any;

  HJurisd_SysID: any;

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
    this.TblHJurisd.TbldJurisdCo = [new TbldJurisdCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HJurisd_SysID = Number(id);
        this.TblHJurisd.HJurisd_SysID = Number(id);
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

        const selectedCode = event.code
        const isExist = this.TblHJurisd.TbldJurisdCo.some(item => item.DcJurisd_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Jurisdiction Master' });
          return;
        }
        this.TblHJurisd.TbldJurisdCo[this.tableIndex].DcJurisd_SingleCo_SysID = event.SingleCo_SysID
        this.TblHJurisd.TbldJurisdCo[this.tableIndex].DcJurisd_SingleCo_Code = event.SingleCo_Code
        this.TblHJurisd.TbldJurisdCo[this.tableIndex].DcJurisd_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHJurisd.HJurisd_AcDe_SysID = event.HActDeactive_SysID
        this.TblHJurisd.HJurisd_AcDe_Code = event.HActDeactive_Code
        this.TblHJurisd.HJurisd_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHJurisd.HJurisd_SysID && rowData.DcJurisd_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.jurisdiction, `company?where[DcJurisd_SysID]=${this.TblHJurisd.TbldJurisdCo[0].DcJurisd_SysID}&where[DcJurisd_SingleCo_SysID]=${rowData.DcJurisd_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldJurisdCo') {
                this.TblHJurisd.TbldJurisdCo.splice(index, 1);
                if (this.TblHJurisd.TbldJurisdCo.length === 0) {
                  this.addRow('TbldJurisdCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldJurisdCo') {
            this.TblHJurisd.TbldJurisdCo.splice(index, 1);
            if (this.TblHJurisd.TbldJurisdCo.length === 0) {
              this.addRow('TbldJurisdCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldJurisdCo') {
      const newRow = new TbldJurisdCo()
      this.TblHJurisd.TbldJurisdCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHJurisd.HJurisd_Code == null || this.TblHJurisd.HJurisd_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Jurisdiction Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHJurisd.HJurisd_Name == null || this.TblHJurisd.HJurisd_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Jurisdiction Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHJurisd.TbldJurisdCo[0].DcJurisd_SingleCo_Code == null || this.TblHJurisd.TbldJurisdCo[0].DcJurisd_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Jurisdiction Single Company Code Cannot Be Null' });
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
    this.TblHJurisd.TbldJurisdCo = this.TblHJurisd.TbldJurisdCo.filter(
      row => row.DcJurisd_SingleCo_Code && row.DcJurisd_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.jurisdiction, this.TblHJurisd).then((res) => {
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
        this.TblHJurisd = new TblHJurisd();
        this.TblHJurisd.TbldJurisdCo = [new TbldJurisdCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/jurisdiction/']);

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
    if (this.TblHJurisd.HJurisd_SysID || this.HJurisd_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.jurisdiction, this.TblHJurisd.HJurisd_SysID).then((res) => {
        this.TblHJurisd = res
        this.showDeleteButton = true;

        if (this.TblHJurisd.TbldJurisdCo.length == 0) {
          this.TblHJurisd.TbldJurisdCo = [new TbldJurisdCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHJurisd = new TblHJurisd()
          this.TblHJurisd.TbldJurisdCo = [new TbldJurisdCo()]
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
        this.masterService.deleteData(apiUrl.jurisdiction, this.TblHJurisd.HJurisd_SysID).then((res) => {

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
    this.TblHJurisd = new TblHJurisd()
    this.TblHJurisd.TbldJurisdCo = [new TbldJurisdCo()]
    this.router.navigate(['l-master/jurisdiction/']);

  }
  cancel() {
    this.TblHJurisd = new TblHJurisd()
    this.TblHJurisd.TbldJurisdCo = [new TbldJurisdCo()]
    this.router.navigate(['l-master/jurisdiction']);


  }

  // ---------------------------------------------------------------------List--------------------------
  displayJurisdictionList() {
    this.showJurisdictionList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.jurisdiction).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HJurisd_Code || item.HJurisd_Name || item.HJurisd_SysID;
      const matchesQuery =
        (item.HJurisd_Code || '').toLowerCase().includes(query) ||
        (item.HJurisd_Name || '').toLowerCase().includes(query) ||
        item.HJurisd_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showJurisdictionList = false
    this.router.navigate(['l-master/jurisdiction']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/jurisdiction/' + rowData.HJurisd_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.jurisdiction, rowData.HJurisd_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showJurisdictionList = false

            this.getListData()
          }

        });
      }
    });
  }

}