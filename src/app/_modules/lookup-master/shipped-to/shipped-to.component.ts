import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { eventNames } from 'process';
import { TbldShippedtoCo } from 'src/app/_dto/masters/shipped-to/TbldShippedtoCo.dto';
import { TblHShippedto } from 'src/app/_dto/masters/shipped-to/TblHShippedto.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-shipped-to',
  templateUrl: './shipped-to.component.html',
  styleUrls: ['./shipped-to.component.scss']
})
export class ShippedToComponent implements OnInit {
 showDeleteButton: boolean = false

  TblHShippedto: TblHShippedto = new TblHShippedto();

  tableIndex: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showshippedToList: boolean = false

  HShippedto_SysID: any
  activateAndDeactivate: any;
  singleCoMaster: any;
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
    this.TblHShippedto.tbldShippedtoCo.push(new TbldShippedtoCo())
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HShippedto_SysID = Number(id);
        this.TblHShippedto.HShippedto_SysID = Number(id);
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
        const isExist = this.TblHShippedto.tbldShippedtoCo.some(item => item.DcShippedto_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Shipped To Master' });
          return;
        }
        this.TblHShippedto.tbldShippedtoCo[this.tableIndex].DcShippedto_SingleCo_SysID = event.SingleCo_SysID
        this.TblHShippedto.tbldShippedtoCo[this.tableIndex].DcShippedto_SingleCo_Code = event.SingleCo_Code
        this.TblHShippedto.tbldShippedtoCo[this.tableIndex].DcShippedto_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHShippedto.HShippedto_AcDe_SysID = event.HActDeactive_SysID
        this.TblHShippedto.HShippedto_AcDe_Code = event.HActDeactive_Code
        this.TblHShippedto.HShippedto_AcDe_Name = event.HActDeactive_Name
        break;
      case 'AreaCode':
        this.TblHShippedto.HShippedto_Area_SysID = event.HAreaCode_SysID
        this.TblHShippedto.HShippedto_Area_Code = event.HAreaCode_Code
        this.TblHShippedto.HShippedto_Area_Name = event.HAreaCode_Name
        break;
      case 'CityCode':
        this.TblHShippedto.HShippedto_City_SysID = event.HCity_SysID
        this.TblHShippedto.HShippedto_City_Code = event.HCity_Code
        this.TblHShippedto.HShippedto_City_Name = event.HCity_Name
        break;
      case 'CountryCode':
        this.TblHShippedto.HShippedto_Count_SysID = event.HCountry_SysID
        this.TblHShippedto.HShippedto_Count_Code = event.HCountry_Code
        this.TblHShippedto.HShippedto_Count_Name = event.HCountry_Name
        break;



      default:
        break;
    }

  }

  getdata() {
    if (this.TblHShippedto.HShippedto_SysID || this.HShippedto_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.shippedToMaster, this.TblHShippedto.HShippedto_SysID).then((res) => {
        this.TblHShippedto = res
        this.showDeleteButton = true;

        if (this.TblHShippedto.tbldShippedtoCo.length == 0) {
          this.TblHShippedto.tbldShippedtoCo = [new TbldShippedtoCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHShippedto = new TblHShippedto()
          this.TblHShippedto.tbldShippedtoCo = [new TbldShippedtoCo()]
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


        if (this.TblHShippedto.HShippedto_SysID && rowData.DcShippedto_SingleCo_SysID) {
          this._masterService.deleteData(apiUrl.shippedToMaster, `company?where[DcShippedto_SysID]=${this.TblHShippedto.tbldShippedtoCo[0].DcShippedto_SysID}&where[DcShippedto_SingleCo_SysID]=${rowData.DcShippedto_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'tbldShippedtoCo') {
                this.TblHShippedto.tbldShippedtoCo.splice(index, 1);
                if (this.TblHShippedto.tbldShippedtoCo.length === 0) {
                  this.addRow('tbldShippedtoCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'tbldShippedtoCo') {
            this.TblHShippedto.tbldShippedtoCo.splice(index, 1);
            if (this.TblHShippedto.tbldShippedtoCo.length === 0) {
              this.addRow('tbldShippedtoCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'tbldShippedtoCo') {
      const newRow = new TbldShippedtoCo();
      this.TblHShippedto.tbldShippedtoCo.splice(index + 1, 0, newRow);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.shippedToMaster, this.TblHShippedto.HShippedto_SysID).then((res) => {
          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            // Only clear the details, keep one empty row
            this.TblHShippedto = new TblHShippedto();
            this.TblHShippedto.tbldShippedtoCo = [new TbldShippedtoCo()];
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




  async saveshippedTo() {

    // if (!(await this.preSave())) {
    //   return;
    // }
    console.log(this.TblHShippedto)
    // else {
    this.TblHShippedto.tbldShippedtoCo = this.TblHShippedto.tbldShippedtoCo.filter(
      row => row.DcShippedto_SingleCo_Code && row.DcShippedto_SingleCo_Name.trim() !== ''
    );

    this._masterService.saveMasterData(apiUrl.shippedToMaster, this.TblHShippedto).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHShippedto = new TblHShippedto()
      this.TblHShippedto.tbldShippedtoCo = [new TbldShippedtoCo()]
      this.router.navigate(['/l-master/shipped-to'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }



  shippedTolist() {
    this.showshippedToList = true
    this.getListData()
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.shippedToMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HShippedto_Code || item.HShippedto_Name || item.HShippedto_SysID;
      const matchesQuery =
        (item.HShippedto_Code || '').toLowerCase().includes(query) ||
        (item.HShippedto_Name || '').toLowerCase().includes(query) ||
        item.HShippedto_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showshippedToList = false
    this.router.navigate(['l-master/shipped-to']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/shipped-to/' + rowData.HShippedto_SysID]);
  }

  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.shippedToMaster, rowData.HShippedto_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showshippedToList = false

            this.getListData()
          }

        });
      }
    });
  }

  Refresh() {
    this.TblHShippedto = new TblHShippedto();
  }

}
