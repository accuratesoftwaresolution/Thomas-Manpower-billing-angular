import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPlaceSupplyCo } from 'src/app/_dto/masters/place-of-supply/TbldPlaceSupplyCo.dto';
import { TblHPlaceSupply } from 'src/app/_dto/masters/place-of-supply/TblHPlaceSupply.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-placeofsupply',
  templateUrl: './placeofsupply.component.html',
  styleUrls: ['./placeofsupply.component.scss']
})
export class PlaceofsupplyComponent implements OnInit {


  TblHPlaceSupply: TblHPlaceSupply = new TblHPlaceSupply()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showPlaceOfSupplyList: boolean = false

  tableIndex: any;

  HPlaceSupply_SysID: any;

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
    this.TblHPlaceSupply.TbldPlaceSupplyCo = [new TbldPlaceSupplyCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPlaceSupply_SysID = Number(id);
        this.TblHPlaceSupply.HPlaceSupply_SysID = Number(id);
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
        const isExist = this.TblHPlaceSupply.TbldPlaceSupplyCo.some(item => item.DcPlaceSupply_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Place Of Supply Master' });
          return;
        }
        this.TblHPlaceSupply.TbldPlaceSupplyCo[this.tableIndex].DcPlaceSupply_SingleCo_SysID = event.SingleCo_SysID
        this.TblHPlaceSupply.TbldPlaceSupplyCo[this.tableIndex].DcPlaceSupply_SingleCo_Code = event.SingleCo_Code
        this.TblHPlaceSupply.TbldPlaceSupplyCo[this.tableIndex].DcPlaceSupply_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHPlaceSupply.HPlaceSupply_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPlaceSupply.HPlaceSupply_AcDe_Code = event.HActDeactive_Code
        this.TblHPlaceSupply.HPlaceSupply_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHPlaceSupply.HPlaceSupply_SysID && rowData.DcPlaceSupply_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.placeOfsupply, `company?where[DcPlaceSupply_SysID]=${this.TblHPlaceSupply.TbldPlaceSupplyCo[0].DcPlaceSupply_SysID}&where[DcPlaceSupply_SingleCo_SysID]=${rowData.DcPlaceSupply_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldPlaceSupplyCo') {
                this.TblHPlaceSupply.TbldPlaceSupplyCo.splice(index, 1);
                if (this.TblHPlaceSupply.TbldPlaceSupplyCo.length === 0) {
                  this.addRow('TbldPlaceSupplyCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPlaceSupplyCo') {
            this.TblHPlaceSupply.TbldPlaceSupplyCo.splice(index, 1);
            if (this.TblHPlaceSupply.TbldPlaceSupplyCo.length === 0) {
              this.addRow('TbldPlaceSupplyCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPlaceSupplyCo') {
      const newRow = new TbldPlaceSupplyCo()
      this.TblHPlaceSupply.TbldPlaceSupplyCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPlaceSupply.HPlaceSupply_Code == null || this.TblHPlaceSupply.HPlaceSupply_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Place Of Suply Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPlaceSupply.HPlaceSupply_Name == null || this.TblHPlaceSupply.HPlaceSupply_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Place Of Suply Master Name Cannot Be Null' });
      return false;
    }

     if (this.TblHPlaceSupply.TbldPlaceSupplyCo[0].DcPlaceSupply_SingleCo_Code == null || this.TblHPlaceSupply.TbldPlaceSupplyCo[0].DcPlaceSupply_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Place Of Suply Single Company Code Cannot Be Null' });
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
    this.TblHPlaceSupply.TbldPlaceSupplyCo = this.TblHPlaceSupply.TbldPlaceSupplyCo.filter(
      row => row.DcPlaceSupply_SingleCo_Code && row.DcPlaceSupply_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.placeOfsupply, this.TblHPlaceSupply).then((res) => {
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
        this.TblHPlaceSupply = new TblHPlaceSupply();
        this.TblHPlaceSupply.TbldPlaceSupplyCo = [new TbldPlaceSupplyCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/place-of-supply/']);

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
    if (this.TblHPlaceSupply.HPlaceSupply_SysID || this.HPlaceSupply_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.placeOfsupply, this.TblHPlaceSupply.HPlaceSupply_SysID).then((res) => {
        this.TblHPlaceSupply = res
        this.showDeleteButton = true;

        if (this.TblHPlaceSupply.TbldPlaceSupplyCo.length == 0) {
          this.TblHPlaceSupply.TbldPlaceSupplyCo = [new TbldPlaceSupplyCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPlaceSupply = new TblHPlaceSupply()
          this.TblHPlaceSupply.TbldPlaceSupplyCo = [new TbldPlaceSupplyCo()]
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
        this.masterService.deleteData(apiUrl.placeOfsupply, this.TblHPlaceSupply.HPlaceSupply_SysID).then((res) => {

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
    this.TblHPlaceSupply = new TblHPlaceSupply()
    this.TblHPlaceSupply.TbldPlaceSupplyCo = [new TbldPlaceSupplyCo()]
    this.router.navigate(['l-master/place-of-supply/']);

  }
  cancel() {
    this.TblHPlaceSupply = new TblHPlaceSupply()
    this.TblHPlaceSupply.TbldPlaceSupplyCo = [new TbldPlaceSupplyCo()]
    this.router.navigate(['l-master/place-of-supply']);


  }

  // ---------------------------------------------------------------------List--------------------------
  displayPowerOFSupplyList() {
    this.showPlaceOfSupplyList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.placeOfsupply).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPlaceSupply_Code || item.HPlaceSupply_Name || item.HPlaceSupply_SysID;
      const matchesQuery =
        (item.HPlaceSupply_Code || '').toLowerCase().includes(query) ||
        (item.HPlaceSupply_Name || '').toLowerCase().includes(query) ||
        item.HPlaceSupply_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showPlaceOfSupplyList = false
    this.router.navigate(['l-master/place-of-supply']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/place-of-supply/' + rowData.HPlaceSupply_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.placeOfsupply, rowData.HPlaceSupply_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showPlaceOfSupplyList = false

            this.getListData()
          }

        });
      }
    });
  }


}