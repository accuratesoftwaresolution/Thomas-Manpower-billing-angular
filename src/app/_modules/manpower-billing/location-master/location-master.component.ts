import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPLocationCo } from 'src/app/_dto/location-master/TbldPLocationCo.dto';
import { TblHPLocation } from 'src/app/_dto/location-master/TblHPLocation.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.scss']
})
export class LocationMasterComponent implements OnInit {
 showListButton: boolean = true;

  TblHPLocation: TblHPLocation = new TblHPLocation()

  activatedeactivate: any;
  

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPLocation_SysID: any;

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
    this.TblHPLocation.TbldPLocationCo = [new TbldPLocationCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPLocation_SysID = Number(id);
        this.TblHPLocation.HPLocation_SysID = Number(id);
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
        const isExist = this.TblHPLocation.TbldPLocationCo.some(item => item.DcpLocation_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Location Master' });
          return;
        }
        this.TblHPLocation.TbldPLocationCo[this.tableIndex].DcpLocation_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPLocation.TbldPLocationCo[this.tableIndex].DcpLocation_SingleCo_Code = event.SingleCo_Code;
        this.TblHPLocation.TbldPLocationCo[this.tableIndex].DcpLocation_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPLocation.HPLocation_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPLocation.HPLocation_AcDe_Code = event.HActDeactive_Code
        this.TblHPLocation.HPLocation_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPLocation.HPLocation_SysID && rowData.DcpLocation_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.locationMaster, `company?where[DcpLocation_GridSysID]=${this.TblHPLocation.TbldPLocationCo[0].DcpLocation_GridSysID}&where[DcpLocation_SingleCo_SysID]=${rowData.DcpLocation_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPLocationCo') {
                this.TblHPLocation.TbldPLocationCo.splice(index, 1);
                if (this.TblHPLocation.TbldPLocationCo.length === 0) {
                  this.addRow('TbldPLocationCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPLocationCo') {
            this.TblHPLocation.TbldPLocationCo.splice(index, 1);
            if (this.TblHPLocation.TbldPLocationCo.length === 0) {
              this.addRow('TbldPLocationCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPLocationCo') {
      const newRow = new TbldPLocationCo()
      this.TblHPLocation.TbldPLocationCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPLocation.HPLocation_Code == null || this.TblHPLocation.HPLocation_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Location Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPLocation.HPLocation_Name == null || this.TblHPLocation.HPLocation_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Location Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPLocation.TbldPLocationCo[0].DcpLocation_SingleCo_Code == null || this.TblHPLocation.TbldPLocationCo[0].DcpLocation_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Location Master Single Company Code Cannot Be Null' });
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
    this.TblHPLocation.TbldPLocationCo = this.TblHPLocation.TbldPLocationCo.filter(
      row => row.DcpLocation_SingleCo_Code && row.DcpLocation_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.locationMaster, this.TblHPLocation).then((res) => {
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
        this.TblHPLocation = new TblHPLocation();
        this.TblHPLocation.TbldPLocationCo = [new TbldPLocationCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/location-master/']);

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
    if (this.TblHPLocation.HPLocation_SysID || this.HPLocation_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.locationMaster, this.TblHPLocation.HPLocation_SysID).then((res) => {
        this.TblHPLocation = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPLocation.TbldPLocationCo.length == 0) {
          this.TblHPLocation.TbldPLocationCo = [new TbldPLocationCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPLocation = new TblHPLocation()
          this.TblHPLocation.TbldPLocationCo = [new TbldPLocationCo()]
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
        this.masterService.deleteData(apiUrl.locationMaster, this.TblHPLocation.HPLocation_SysID).then((res) => {

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
    this.TblHPLocation = new TblHPLocation()
    this.TblHPLocation.TbldPLocationCo = [new TbldPLocationCo()]
    this.router.navigate(['Manpower/location-master/']);

  }
  cancel() {
    this.TblHPLocation = new TblHPLocation()
    this.TblHPLocation.TbldPLocationCo = [new TbldPLocationCo()]
    this.router.navigate(['Manpower/location-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.locationMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPLocation_Code || item.HPLocation_Name || item.HPLocation_SysID;
      const matchesQuery =
        (item.HPLocation_Code || '').toLowerCase().includes(query) ||
        (item.HPLocation_Name || '').toLowerCase().includes(query) ||
        item.HPLocation_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/location-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/location-master/' + rowData.HPLocation_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.locationMaster, rowData.HPLocation_SysID).then((res) => {

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
