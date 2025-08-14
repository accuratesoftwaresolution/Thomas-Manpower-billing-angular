import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { eventNames } from 'process';
import { TbldBilledtoCo } from 'src/app/_dto/masters/billed-to/TbldBilledtoCo.dto';
import { TblHBilledto } from 'src/app/_dto/masters/billed-to/TblHBilledto.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-billed-to',
  templateUrl: './billed-to.component.html',
  styleUrls: ['./billed-to.component.scss']
})
export class BilledToComponent implements OnInit {
  showDeleteButton: boolean = false

  TblHBilledto: TblHBilledto = new TblHBilledto();

  tableIndex: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showbilledToList: boolean = false

  HBilledto_SysID: any
  singleCoMaster: any;
  activateAndDeactivate: any;
  area: any;
  city: any;
  country: any;


  constructor(
    private router: Router,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private activatedRoute: ActivatedRoute,

    private confirmationService: ConfirmationService,
    private _masterService: MasterService,
    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.TblHBilledto.TbldBilledtoCo.push(new TbldBilledtoCo())
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HBilledto_SysID = Number(id);
        this.TblHBilledto.HBilledto_SysID = Number(id);
        this.getdata()
      }
    });
  this.getLovData()
  }

  getLovData() {
    this._masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this._masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
    this._masterService.getMasterData(apiUrl.area).then((res) => {
      this.area = res
    })
    this._masterService.getMasterData(apiUrl.city).then((res) => {
      this.city = res
    })
    this._masterService.getMasterData(apiUrl.country).then((res) => {
      this.country = res
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
        case 'AreaCode':
        this.popUpService.popUpData = this.area;
        break;
      case 'CityCode':
        this.popUpService.popUpData = this.city;
        break;
      case 'CountryCode':
        this.popUpService.popUpData = this.country;
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
        const isExist = this.TblHBilledto.TbldBilledtoCo.some(item => item.DcBilledto_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for billed To Master' });
          return;
        }
        this.TblHBilledto.TbldBilledtoCo[this.tableIndex].DcBilledto_SingleCo_SysID = event.SingleCo_SysID
        this.TblHBilledto.TbldBilledtoCo[this.tableIndex].DcBilledto_SingleCo_Code = event.SingleCo_Code
        this.TblHBilledto.TbldBilledtoCo[this.tableIndex].DcBilledto_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHBilledto.HBilledto_AcDe_SysID = event.HActDeactive_SysID
        this.TblHBilledto.HBilledto_AcDe_Code = event.HActDeactive_Code
        this.TblHBilledto.HBilledto_AcDe_Name = event.HActDeactive_Name
        break;
      case 'AreaCode':
        this.TblHBilledto.HBilledto_Area_SysID = event.HAreaCode_SysID
        this.TblHBilledto.HBilledto_Area_Code = event.HAreaCode_Code
        this.TblHBilledto.HBilledto_Area_Name = event.HAreaCode_Name
        break;
      case 'CityCode':
        this.TblHBilledto.HBilledto_City_SysID = event.HCity_SysID
        this.TblHBilledto.HBilledto_City_Code = event.HCity_Code
        this.TblHBilledto.HBilledto_City_Name = event.HCity_Name
        break;
      case 'CountryCode':
        this.TblHBilledto.HBilledto_Count_SysID = event.HCountry_SysID
        this.TblHBilledto.HBilledto_Count_Code = event.HCountry_Code
        this.TblHBilledto.HBilledto_Count_Name = event.HCountry_Name
        break;



      default:
        break;
    }

  }

  getdata() {
    if (this.TblHBilledto.HBilledto_SysID || this.HBilledto_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.billedToMaster, this.TblHBilledto.HBilledto_SysID).then((res) => {
        this.TblHBilledto = res
        this.showDeleteButton = true;

        if (this.TblHBilledto.TbldBilledtoCo.length == 0) {
          this.TblHBilledto.TbldBilledtoCo = [new TbldBilledtoCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHBilledto = new TblHBilledto()
          this.TblHBilledto.TbldBilledtoCo = [new TbldBilledtoCo()]
        }
      })
    }
  }

deleteRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (this.TblHBilledto.HBilledto_SysID && rowData.DcBilledto_SingleCo_SysID) {
          this._masterService.deleteData(apiUrl.billedToMaster, `company?where[DcBilledto_SysID]=${this.TblHBilledto.TbldBilledtoCo[0].DcBilledto_SysID}&where[DcBilledto_SingleCo_SysID]=${rowData.DcBilledto_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldBilledtoCo') {
                this.TblHBilledto.TbldBilledtoCo.splice(index, 1);
                if (this.TblHBilledto.TbldBilledtoCo.length === 0) {
                  this.addRow('TbldBilledtoCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldBilledtoCo') {
            this.TblHBilledto.TbldBilledtoCo.splice(index, 1);
            if (this.TblHBilledto.TbldBilledtoCo.length === 0) {
              this.addRow('TbldBilledtoCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldBilledtoCo') {
      const newRow = new TbldBilledtoCo();
      this.TblHBilledto.TbldBilledtoCo.splice(index + 1, 0, newRow);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.billedToMaster, this.TblHBilledto.HBilledto_SysID).then((res) => {
          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            // Only clear the details, keep one empty row
            this.TblHBilledto = new TblHBilledto();
            this.TblHBilledto.TbldBilledtoCo = [new TbldBilledtoCo()];
          }
        }, err => {
          if (err.error.statusCode == 409) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        });
      }
    });
  }


  routeTo(screen) {
    this.router.navigate([screen]);
  }

  ConfirmDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Only delete if user confirms
      }
    });
  }




  async saveBilledTo() {

    // if (!(await this.preSave())) {
    //   return;
    // }
    console.log(this.TblHBilledto)
    // else {
    this.TblHBilledto.TbldBilledtoCo = this.TblHBilledto.TbldBilledtoCo.filter(
      row => row.DcBilledto_SingleCo_Code && row.DcBilledto_SingleCo_Name.trim() !== ''
    );

    this._masterService.saveMasterData(apiUrl.billedToMaster, this.TblHBilledto).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHBilledto = new TblHBilledto()
      this.TblHBilledto.TbldBilledtoCo = [new TbldBilledtoCo()]
      this.router.navigate(['/l-master/billed-to'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }



  billedToList() {
    this.showbilledToList = true
    this.getListData()
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.billedToMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HBilledto_Code || item.HBilledto_Name || item.HBilledto_SysID;
      const matchesQuery =
        (item.HBilledto_Code || '').toLowerCase().includes(query) ||
        (item.HBilledto_Name || '').toLowerCase().includes(query) ||
        item.HBilledto_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showbilledToList = false
    this.router.navigate(['l-master/billed-to']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/billed-to/' + rowData.HBilledto_SysID]);
  }

  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.billedToMaster, rowData.HBilledto_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showbilledToList = false

            this.getListData()
          }

        });
      }
    });
  }

  Refresh() {
    this.TblHBilledto = new TblHBilledto();
  }

}
