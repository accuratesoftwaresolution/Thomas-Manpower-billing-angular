import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldCountryCoDto } from 'src/app/_dto/masters/country/TbldCountryCoDto.dto';
import { TblHCountryDto } from 'src/app/_dto/masters/country/TblHCountryDto.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {


  TblHCountryDto: TblHCountryDto = new TblHCountryDto()

  tableIndex: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showCountryList: boolean = false

  HCountry_SysID: any;

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
    this.TblHCountryDto.TbldCountryCo = [new TbldCountryCoDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HCountry_SysID = Number(id);
        this.TblHCountryDto.HCountry_SysID = Number(id);
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
        const isExist = this.TblHCountryDto.TbldCountryCo.some(item => item.DcCountry_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Country Master' });
          return;
        }
        this.TblHCountryDto.TbldCountryCo[this.tableIndex].DcCountry_SingleCo_SysID = event.SingleCo_SysID
        this.TblHCountryDto.TbldCountryCo[this.tableIndex].DcCountry_SingleCo_Code = event.SingleCo_Code
        this.TblHCountryDto.TbldCountryCo[this.tableIndex].DcCountry_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHCountryDto.HCountry_AcDe_SysID = event.HActDeactive_SysID
        this.TblHCountryDto.HCountry_AcDe_Code = event.HActDeactive_Code
        this.TblHCountryDto.HCountry_AcDe_Name = event.HActDeactive_Name
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
        //  console.log(this.DcCountry_SysID)

        if (this.TblHCountryDto.HCountry_SysID && rowData.DcCountry_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.country, `company?where[DcCountry_SysID]=${this.TblHCountryDto.TbldCountryCo[0].DcCountry_SysID}&where[DcCountry_SingleCo_SysID]=${rowData.DcCountry_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldCountryCo') {
                this.TblHCountryDto.TbldCountryCo.splice(index, 1);
                if (this.TblHCountryDto.TbldCountryCo.length === 0) {
                  this.addRow('TbldCountryCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldCountryCo') {
            this.TblHCountryDto.TbldCountryCo.splice(index, 1);
            if (this.TblHCountryDto.TbldCountryCo.length === 0) {
              this.addRow('TbldCountryCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldCountryCo') {
      const newRow = new TbldCountryCoDto()
      this.TblHCountryDto.TbldCountryCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHCountryDto.HCountry_Code == null || this.TblHCountryDto.HCountry_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Country Code Cannot Be Null' });
      return false;
    }

    if (this.TblHCountryDto.HCountry_Name == null || this.TblHCountryDto.HCountry_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Country Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHCountryDto.TbldCountryCo = this.TblHCountryDto.TbldCountryCo.filter(
      row => row.DcCountry_SingleCo_Code && row.DcCountry_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.country, this.TblHCountryDto).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHCountryDto = new TblHCountryDto()
        this.TblHCountryDto.TbldCountryCo = [new TbldCountryCoDto()]
        this.router.navigate(['l-master/country']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHCountryDto.HCountry_SysID || this.HCountry_SysID) {

      this.masterService.getMasterDatabyId(apiUrl.country, this.TblHCountryDto.HCountry_SysID).then((res) => {
        this.TblHCountryDto = res
        this.showDeleteButton = true;

        if (this.TblHCountryDto.TbldCountryCo.length == 0) {
          this.TblHCountryDto.TbldCountryCo = [new TbldCountryCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHCountryDto = new TblHCountryDto()
          this.TblHCountryDto.TbldCountryCo = [new TbldCountryCoDto()]
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
        this.masterService.deleteData(apiUrl.country, this.TblHCountryDto.HCountry_SysID).then((res) => {

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
    this.TblHCountryDto = new TblHCountryDto()
    this.TblHCountryDto.TbldCountryCo = [new TbldCountryCoDto()]
    this.router.navigate(['l-master/country/']);

  }

  cancel() {
    this.TblHCountryDto = new TblHCountryDto()
    this.TblHCountryDto.TbldCountryCo = [new TbldCountryCoDto()]
    this.router.navigate(['l-master/country/']);

  }



  // ---------------------------------------------------------------------List--------------------------
  displayCountryList() {
    this.showCountryList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.country).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCountry_Code || item.HCountry_Name || item.HCountry_SysID;
      const matchesQuery =
        (item.HCountry_Code || '').toLowerCase().includes(query) ||
        (item.HCountry_Name || '').toLowerCase().includes(query) ||
        item.HCountry_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showCountryList = false
    this.router.navigate(['l-master/country']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/country/' + rowData.HCountry_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.country, rowData.HCountry_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showCountryList = false

            this.getListData()
          }

        });
      }
    });
  }


}