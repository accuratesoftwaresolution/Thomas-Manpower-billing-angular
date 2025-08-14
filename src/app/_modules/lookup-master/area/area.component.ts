import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldAreaCodeCoDto } from 'src/app/_dto/masters/area/TbldAreaCodeCo.dto';
import { TblHAreaCodeDto } from 'src/app/_dto/masters/area/TblHAreaCode.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {


  TblHAreaCodeDto: TblHAreaCodeDto = new TblHAreaCodeDto()

  tableIndex: any;

  HAreaCode_SysID: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showAreaList: boolean = false

  showDeleteButton: boolean = false;
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
    this.TblHAreaCodeDto.TbldAreaCodeCo = [new TbldAreaCodeCoDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAreaCode_SysID = Number(id);
        this.TblHAreaCodeDto.HAreaCode_SysID = Number(id);
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
        const isExist = this.TblHAreaCodeDto.TbldAreaCodeCo.some(item => item.DcAreaCode_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for area Master' });
          return;
        }
        this.TblHAreaCodeDto.TbldAreaCodeCo[this.tableIndex].DcAreaCode_SingleCo_SysID = event.SingleCo_SysID
        this.TblHAreaCodeDto.TbldAreaCodeCo[this.tableIndex].DcAreaCode_SingleCo_Code = event.SingleCo_Code
        this.TblHAreaCodeDto.TbldAreaCodeCo[this.tableIndex].DcAreaCode_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHAreaCodeDto.HAreaCode_AcDe_SysID = event.HActDeactive_SysID
        this.TblHAreaCodeDto.HAreaCode_AcDe_Code = event.HActDeactive_Code
        this.TblHAreaCodeDto.HAreaCode_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHAreaCodeDto.HAreaCode_SysID && rowData.DcAreaCode_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.area, `company?where[DcAreaCode_SysID]=${this.TblHAreaCodeDto.TbldAreaCodeCo[0].DcAreaCode_SysID}&where[DcAreaCode_SingleCo_SysID]=${rowData.DcAreaCode_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldAreaCodeCo') {
                this.TblHAreaCodeDto.TbldAreaCodeCo.splice(index, 1);
                if (this.TblHAreaCodeDto.TbldAreaCodeCo.length === 0) {
                  this.addRow('TbldAreaCodeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldAreaCodeCo') {
            this.TblHAreaCodeDto.TbldAreaCodeCo.splice(index, 1);
            if (this.TblHAreaCodeDto.TbldAreaCodeCo.length === 0) {
              this.addRow('TbldAreaCodeCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldAreaCodeCo') {
      const newRow = new TbldAreaCodeCoDto()
      this.TblHAreaCodeDto.TbldAreaCodeCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHAreaCodeDto.HAreaCode_Code == null || this.TblHAreaCodeDto.HAreaCode_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'area Code Cannot Be Null' });
      return false;
    }

    if (this.TblHAreaCodeDto.HAreaCode_Name == null || this.TblHAreaCodeDto.HAreaCode_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'area Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHAreaCodeDto.TbldAreaCodeCo = this.TblHAreaCodeDto.TbldAreaCodeCo.filter(
      row => row.DcAreaCode_SingleCo_Code && row.DcAreaCode_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.area, this.TblHAreaCodeDto).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHAreaCodeDto = new TblHAreaCodeDto()
        this.TblHAreaCodeDto.TbldAreaCodeCo = [new TbldAreaCodeCoDto()]
        this.router.navigate(['l-master/area']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHAreaCodeDto.HAreaCode_SysID || this.HAreaCode_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.area, this.TblHAreaCodeDto.HAreaCode_SysID).then((res) => {
        this.TblHAreaCodeDto = res
        this.showDeleteButton = true;

        if (this.TblHAreaCodeDto.TbldAreaCodeCo.length == 0) {
          this.TblHAreaCodeDto.TbldAreaCodeCo = [new TbldAreaCodeCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHAreaCodeDto = new TblHAreaCodeDto()
          this.TblHAreaCodeDto.TbldAreaCodeCo = [new TbldAreaCodeCoDto()]
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
        this.masterService.deleteData(apiUrl.area, this.TblHAreaCodeDto.HAreaCode_SysID).then((res) => {

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
    this.TblHAreaCodeDto = new TblHAreaCodeDto()
    this.TblHAreaCodeDto.TbldAreaCodeCo = [new TbldAreaCodeCoDto()]
    this.router.navigate(['l-master/area/']);

  }
  cancel() {
    this.TblHAreaCodeDto = new TblHAreaCodeDto()
    this.TblHAreaCodeDto.TbldAreaCodeCo = [new TbldAreaCodeCoDto()]
    this.router.navigate(['l-master/area/']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayAreaList() {
    this.showAreaList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.area).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HAreaCode_Code || item.HAreaCode_Name || item.HAreaCode_SysID;
      const matchesQuery =
        (item.HAreaCode_Code || '').toLowerCase().includes(query) ||
        (item.HAreaCode_Name || '').toLowerCase().includes(query) ||
        item.HAreaCode_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showAreaList = false
    this.router.navigate(['l-master/area']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/area/' + rowData.HAreaCode_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.area, rowData.HAreaCode_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showAreaList = false

            this.getListData()
          }

        });
      }
    });
  }


}
