import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldCityCoDto } from 'src/app/_dto/masters/city/TbldCityCo.dto';
import { TblHCityDto } from 'src/app/_dto/masters/city/TblHCity.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {


  HCity_SysID: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showCityList: boolean = false


  TblHCityDto: TblHCityDto = new TblHCityDto()

  tableIndex: any;


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
    this.TblHCityDto.TbldCityCo = [new TbldCityCoDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HCity_SysID = Number(id);
        this.TblHCityDto.HCity_SysID = Number(id);
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
        const isExist = this.TblHCityDto.TbldCityCo.some(item => item.DcCity_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for city Master' });
          return;
        }
        this.TblHCityDto.TbldCityCo[this.tableIndex].DcCity_SingleCo_SysID = event.SingleCo_SysID
        this.TblHCityDto.TbldCityCo[this.tableIndex].DcCity_SingleCo_Code = event.SingleCo_Code
        this.TblHCityDto.TbldCityCo[this.tableIndex].DcCity_SingleCo_Name = event.SingleCo_Name;

        break;


      case 'ActAndDeactCode':
        this.TblHCityDto.HCity_AcDe_SysID = event.HActDeactive_SysID
        this.TblHCityDto.Hcity_AcDe_Code = event.HActDeactive_Code
        this.TblHCityDto.Hcity_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHCityDto.HCity_SysID && rowData.DcCity_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.city, `company?where[DcCity_SysID]=${this.TblHCityDto.TbldCityCo[0].DcCity_SysID}&where[DcCity_SingleCo_SysID]=${rowData.DcCity_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldCityCo') {
                this.TblHCityDto.TbldCityCo.splice(index, 1);
                if (this.TblHCityDto.TbldCityCo.length === 0) {
                  this.addRow('TbldCityCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldCityCo') {
            this.TblHCityDto.TbldCityCo.splice(index, 1);
            if (this.TblHCityDto.TbldCityCo.length === 0) {
              this.addRow('TbldCityCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldCityCo') {
      const newRow = new TbldCityCoDto()
      this.TblHCityDto.TbldCityCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHCityDto.HCity_Code == null || this.TblHCityDto.HCity_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'city Code Cannot Be Null' });
      return false;
    }

    if (this.TblHCityDto.HCity_Name == null || this.TblHCityDto.HCity_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'city Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHCityDto.TbldCityCo = this.TblHCityDto.TbldCityCo.filter(
      row => row.DcCity_SingleCo_Code && row.DcCity_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.city, this.TblHCityDto).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHCityDto = new TblHCityDto()
        this.TblHCityDto.TbldCityCo = [new TbldCityCoDto()]
        this.router.navigate(['l-master/city']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHCityDto.HCity_SysID || this.HCity_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.city, this.TblHCityDto.HCity_SysID).then((res) => {
        this.TblHCityDto = res
        this.showDeleteButton = true;

        if (this.TblHCityDto.TbldCityCo.length == 0) {
          this.TblHCityDto.TbldCityCo = [new TbldCityCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHCityDto = new TblHCityDto()
          this.TblHCityDto.TbldCityCo = [new TbldCityCoDto()]
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
        this.masterService.deleteData(apiUrl.city, this.TblHCityDto.HCity_SysID).then((res) => {

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
    this.TblHCityDto = new TblHCityDto()
    this.TblHCityDto.TbldCityCo = [new TbldCityCoDto()]
    this.router.navigate(['l-master/city/']);

  }
  cancel() {
    this.TblHCityDto = new TblHCityDto()
    this.TblHCityDto.TbldCityCo = [new TbldCityCoDto()]
    this.router.navigate(['l-master/city/']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayCityList() {
    this.showCityList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.city).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCity_Code || item.HCity_Name || item.HCity_SysID;
      const matchesQuery =
        (item.HCity_Code || '').toLowerCase().includes(query) ||
        (item.HCity_Name || '').toLowerCase().includes(query) ||
        item.HCity_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showCityList = false
    this.router.navigate(['l-master/city']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/city/' + rowData.HCity_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.city, rowData.HCity_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showCityList = false

            this.getListData()
          }

        });
      }
    });
  }



}
