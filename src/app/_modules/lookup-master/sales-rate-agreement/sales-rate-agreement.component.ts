import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblDSalRateAgree } from 'src/app/_dto/masters/sale-rate-agreement/TblDSalRateAgree.dto';
import { TblHSalRateAgree } from 'src/app/_dto/masters/sale-rate-agreement/TblHSalRateAgree.dto';
import { TblHSalRateAgreeCo } from 'src/app/_dto/masters/sale-rate-agreement/TblHSalRateAgreeCo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-sales-rate-agreement',
  templateUrl: './sales-rate-agreement.component.html',
  styleUrls: ['./sales-rate-agreement.component.scss']
})
export class SalesRateAgreementComponent implements OnInit {
  HSalAgree_SysID: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showSalesRateList: boolean = false

  TblHSalRateAgree: TblHSalRateAgree = new TblHSalRateAgree();

  tableIndex: any;
  activateAndDeactivate: any;
  singleCoMaster: any;
  product: any;
  unitmaster: any;

  constructor(
    private router: Router,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    private _masterService: MasterService,
    private activatedRoute: ActivatedRoute,

    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.TblHSalRateAgree.tblDSalRateAgree.push(new TblDSalRateAgree())
    this.TblHSalRateAgree.tbldSalAgreeCo.push(new TblHSalRateAgreeCo())

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        // this.showDeleteButton = true;
        this.HSalAgree_SysID = Number(id);
        this.TblHSalRateAgree.HSalAgree_SysID = Number(id);
        this.getdata()
      }
    });

    this.getLovData()
  }

  getdata() {
    if (this.TblHSalRateAgree.HSalAgree_SysID || this.HSalAgree_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.salesRateAgreement, this.TblHSalRateAgree.HSalAgree_SysID).then((res) => {
        this.TblHSalRateAgree = res
        // this.showDeleteButton = true;

        if (this.TblHSalRateAgree.tblDSalRateAgree.length == 0) {
          this.TblHSalRateAgree.tblDSalRateAgree = [new TblDSalRateAgree()]
        }

        if (this.TblHSalRateAgree.tbldSalAgreeCo.length == 0) {
          this.TblHSalRateAgree.tbldSalAgreeCo = [new TblHSalRateAgreeCo()]
        }


      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHSalRateAgree = new TblHSalRateAgree()
          this.TblHSalRateAgree.tbldSalAgreeCo = [new TblHSalRateAgreeCo()]
        }
      })
    }
  }


   getLovData() {

    this._masterService.getMasterData(apiUrl.unitmaster).then((res) => {
      this.unitmaster = res
    })

    this._masterService.getMasterData(apiUrl.productmaster).then((res) => {
      this.product = res
    })

    this._masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this._masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
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
      case 'ProductCode':
        this.popUpService.popUpData = this.product;
        break;
      case 'ProductUnit':
        this.popUpService.popUpData = this.unitmaster;
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
        const isExist = this.TblHSalRateAgree.tbldSalAgreeCo.some(item => item.DcSalAgree_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Purchase Rate Agreement Master' });
          return;
        }
        this.TblHSalRateAgree.tbldSalAgreeCo[this.tableIndex].DcSalAgree_SingleCo_SysID = event.SingleCo_SysID
        this.TblHSalRateAgree.tbldSalAgreeCo[this.tableIndex].DcSalAgree_SingleCo_Code = event.SingleCo_Code
        this.TblHSalRateAgree.tbldSalAgreeCo[this.tableIndex].DcSalAgree_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHSalRateAgree.HSalAgree_AcDe_SysID = event.HActDeactive_SysID
        this.TblHSalRateAgree.HSalAgree_AcDe_Code = event.HActDeactive_Code
        this.TblHSalRateAgree.HSalAgree_AcDe_Name = event.HActDeactive_Name
        break;
      case 'ProductCode':
        this.TblHSalRateAgree.tblDSalRateAgree[this.tableIndex].DSalAgree_Prod_SysID = event.HProd_SysID
        this.TblHSalRateAgree.tblDSalRateAgree[this.tableIndex].DSalAgree_Prod_Code = event.HProd_Code
        this.TblHSalRateAgree.tblDSalRateAgree[this.tableIndex].DSalAgree_ProdShort_Name = event.HProd_Short_Name
        break;

      case 'ProductUnit':
        this.TblHSalRateAgree.tblDSalRateAgree[this.tableIndex].DSalAgree_Prod_Unit = event.HFirstUnit_Base_Unit
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


        if (this.TblHSalRateAgree.HSalAgree_SysID && rowData.DcSalAgree_SingleCo_SysID) {
          this._masterService.deleteData(apiUrl.salesRateAgreement, `company?where[DcSalAgree_SysID]=${this.TblHSalRateAgree.tbldSalAgreeCo[0].DcSalAgree_SysID}&where[DcSalAgree_SingleCo_SysID]=${rowData.DcSalAgree_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'tbldSalAgreeCo') {
                this.TblHSalRateAgree.tbldSalAgreeCo.splice(index, 1);
                if (this.TblHSalRateAgree.tbldSalAgreeCo.length === 0) {
                  this.addRow('tbldSalAgreeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'tbldSalAgreeCo') {
            this.TblHSalRateAgree.tbldSalAgreeCo.splice(index, 1);
            if (this.TblHSalRateAgree.tbldSalAgreeCo.length === 0) {
              this.addRow('tbldSalAgreeCo', -1);
            }
          }
        }
      }
    });
  }

  addRow(table: any, index: number) {
    if (table == 'tbldSalAgreeCo') {
      const newRow = new TblHSalRateAgreeCo()
      this.TblHSalRateAgree.tbldSalAgreeCo.splice(index + 1, 0, newRow);

    }
    if (table == 'tblDSalRateAgree') {
      const newRow = new TblDSalRateAgree()
      this.TblHSalRateAgree.tblDSalRateAgree.splice(index + 1, 0, newRow);

    }
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


  async saveSalesRate() {

    // if (!(await this.preSave())) {
    //   return;
    // }

    console.log(this.TblHSalRateAgree)
    // else {

    this._masterService.saveMasterData(apiUrl.salesRateAgreement, this.TblHSalRateAgree).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHSalRateAgree = new TblHSalRateAgree()
      this.TblHSalRateAgree.tblDSalRateAgree = [new TblDSalRateAgree()]
      this.TblHSalRateAgree.tbldSalAgreeCo = [new TblHSalRateAgreeCo()]
      this.router.navigate(['/l-master/sales-rate-agree'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }



  listsalesrate() {
    this.showSalesRateList = true
    this.getListData()
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.salesRateAgreement).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HSalAgree_Code || item.HSalAgree_Name || item.HSalAgree_SysID;
      const matchesQuery =
        (item.HSalAgree_Code || '').toLowerCase().includes(query) ||
        (item.HSalAgree_Name || '').toLowerCase().includes(query) ||
        item.HSalAgree_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showSalesRateList = false
    this.router.navigate(['l-master/sales-rate-agree']);


  }



  editRow(rowData: any) {
    this.router.navigate(['l-master/sales-rate-agree/' + rowData.HSalAgree_SysID]);
  }

  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.salesRateAgreement, rowData.HSalAgree_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showSalesRateList = false

            this.getListData()
          }

        });
      }
    });
  }



  deletePurchaseRow(table: any, index: number, rowData) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this row?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {


        if (this.TblHSalRateAgree.HSalAgree_SysID && rowData.DSalAgree_Prod_SysID) {
          this._masterService.deleteData(apiUrl.salesRateAgreement, `agreement-detail?where[DSalAgree_SysID]=${this.TblHSalRateAgree.tblDSalRateAgree[0].DSalAgree_SysID}&where[DSalAgree_Prod_SysID]=${rowData.DSalAgree_Prod_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'tblDSalRateAgree') {
                this.TblHSalRateAgree.tblDSalRateAgree.splice(index, 1);
                if (this.TblHSalRateAgree.tblDSalRateAgree.length === 0) {
                  this.addRow('tblDSalRateAgree', -1);
                }

              }

            }

          });
        } else {
          if (table === 'tblDSalRateAgree') {
            this.TblHSalRateAgree.tblDSalRateAgree.splice(index, 1);
            if (this.TblHSalRateAgree.tblDSalRateAgree.length === 0) {
              this.addRow('tblDSalRateAgree', -1);
            }
          }
        }
      }
    });


  }




  addPurchaseRow(table: any, index: number) {
    if (table == 'tblDSalRateAgree') {
      const newRow = new TblDSalRateAgree()
      this.TblHSalRateAgree.tblDSalRateAgree.splice(index + 1, 0, newRow);

    }

  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.salesRateAgreement, this.TblHSalRateAgree.HSalAgree_SysID).then((res) => {
          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

            // ✅ Clear only these two tables, and keep empty row
            this.TblHSalRateAgree.tblDSalRateAgree = [new TblDSalRateAgree()];
            this.TblHSalRateAgree.tbldSalAgreeCo = [new TblHSalRateAgreeCo()];
            this.TblHSalRateAgree = new TblHSalRateAgree();
            this.router.navigate(['l-master/sales-rate-agree']);

          }
        }, err => {
          if (err.error.statusCode == 409) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        });
      }
    });
  }


  onDateChange(type, value: string) {
    const dateObj = value ? new Date(value) : null;
    const digiLock = this.TblHSalRateAgree;
    if (type === 'validagreementate') {
      digiLock.HSalAgree_From_Date = dateObj;
    }
  }


  onDatevalidtoChange(type, value: string) {
    const dateObj = value ? new Date(value) : null;
    const digiLock = this.TblHSalRateAgree;
    if (type === 'validagreementtodate') {
      digiLock.HSalAgree_to_Date = dateObj;
    }

  }
}
