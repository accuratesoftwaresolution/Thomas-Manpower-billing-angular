import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblDPurRateAgree } from 'src/app/_dto/masters/purchase-sales-rate-agreement/TblDPurRateAgree.dto';
import { TblHPurRateAgree } from 'src/app/_dto/masters/purchase-sales-rate-agreement/TblHPurRateAgree.dto';
import { TblHPurRateAgreeCo } from 'src/app/_dto/masters/purchase-sales-rate-agreement/TblHPurRateAgreeCo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-purchase-rate-agreement',
  templateUrl: './purchase-rate-agreement.component.html',
  styleUrls: ['./purchase-rate-agreement.component.scss']
})
export class PurchaseRateAgreementComponent implements OnInit {

  HPur_Agree_SysID: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showPurchaseRateList: boolean = false

  TblHPurRateAgree: TblHPurRateAgree = new TblHPurRateAgree();

  tableIndex: any;
  unitmaster: any;
  singleCoMaster: any;
  activateAndDeactivate: any;
  product: any;

  constructor(
    private router: Router,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    private _masterService: MasterService,
    private activatedRoute: ActivatedRoute,

    private _messageService: MessageService) { }

  ngOnInit(): void {
    this.TblHPurRateAgree.tblDPurRateAgree.push(new TblDPurRateAgree())
    this.TblHPurRateAgree.tbldPurRateAgreeCo.push(new TblHPurRateAgreeCo())

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        // this.showDeleteButton = true;
        this.HPur_Agree_SysID = Number(id);
        this.TblHPurRateAgree.HPur_Agree_SysID = Number(id);
        this.getdata()
      }
    });

    this.getLovData()
  }



  getdata() {
    if (this.TblHPurRateAgree.HPur_Agree_SysID || this.HPur_Agree_SysID) {
      this._masterService.getMasterDatabyId(apiUrl.purchaseRateAgreement, this.TblHPurRateAgree.HPur_Agree_SysID).then((res) => {
        this.TblHPurRateAgree = res
        // this.showDeleteButton = true;

        if (this.TblHPurRateAgree.tblDPurRateAgree.length == 0) {
          this.TblHPurRateAgree.tblDPurRateAgree = [new TblDPurRateAgree()]
        }

        if (this.TblHPurRateAgree.tbldPurRateAgreeCo.length == 0) {
          this.TblHPurRateAgree.tbldPurRateAgreeCo = [new TblHPurRateAgreeCo()]
        }


      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPurRateAgree = new TblHPurRateAgree()
          this.TblHPurRateAgree.tbldPurRateAgreeCo = [new TblHPurRateAgreeCo()]
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
        const isExist = this.TblHPurRateAgree.tbldPurRateAgreeCo.some(item => item.DcPur_Agree_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Purchase Rate Agreement Master' });
          return;
        }
        this.TblHPurRateAgree.tbldPurRateAgreeCo[this.tableIndex].DcPur_Agree_SingleCo_SysID = event.SingleCo_SysID
        this.TblHPurRateAgree.tbldPurRateAgreeCo[this.tableIndex].DcPur_Agree_SingleCo_Code = event.SingleCo_Code
        this.TblHPurRateAgree.tbldPurRateAgreeCo[this.tableIndex].DcPur_Agree_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHPurRateAgree.HPur_Agree_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPurRateAgree.HPur_Agree_AcDe_Code = event.HActDeactive_Code
        this.TblHPurRateAgree.HPur_Agree_AcDe_Name = event.HActDeactive_Name
        break;
      case 'ProductCode':
        this.TblHPurRateAgree.tblDPurRateAgree[this.tableIndex].DPurAgree_Prod_SysID = event.HProd_SysID
        this.TblHPurRateAgree.tblDPurRateAgree[this.tableIndex].DPurAgree_Prod_Code = event.HProd_Code
        this.TblHPurRateAgree.tblDPurRateAgree[this.tableIndex].DPurAgree_ProdShort_Name = event.HProd_Short_Name
        break;

      case 'ProductUnit':

        // this.TblHPurRateAgree.tblDPurRateAgree[this.tableIndex].HProd_Unit_SysID = event.HFirstUnit_SysID
        this.TblHPurRateAgree.tblDPurRateAgree[this.tableIndex].DPurAgree_Prod_Unit = event.HFirstUnit_Base_Unit
        // this.TblHPurRateAgree.tblDPurRateAgree[this.tableIndex].HProd_Unit_Frac = event.HFirstUnit_Unit_Frac
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


        if (this.TblHPurRateAgree.HPur_Agree_SysID && rowData.DcPur_Agree_SingleCo_SysID) {
          this._masterService.deleteData(apiUrl.purchaseRateAgreement, `company?where[DcPur_Agree_SysID]=${this.TblHPurRateAgree.tbldPurRateAgreeCo[0].DcPur_Agree_SysID}&where[DcPur_Agree_SingleCo_SysID]=${rowData.DcPur_Agree_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'tbldPurRateAgreeCo') {
                this.TblHPurRateAgree.tbldPurRateAgreeCo.splice(index, 1);
                if (this.TblHPurRateAgree.tbldPurRateAgreeCo.length === 0) {
                  this.addRow('tbldPurRateAgreeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'tbldPurRateAgreeCo') {
            this.TblHPurRateAgree.tbldPurRateAgreeCo.splice(index, 1);
            if (this.TblHPurRateAgree.tbldPurRateAgreeCo.length === 0) {
              this.addRow('tbldPurRateAgreeCo', -1);
            }
          }
        }
      }
    });
  }

  addRow(table: any, index: number) {
    if (table == 'tbldPurRateAgreeCo') {
      const newRow = new TblHPurRateAgreeCo()
      this.TblHPurRateAgree.tbldPurRateAgreeCo.splice(index + 1, 0, newRow);

    }
    if (table == 'tblDPurRateAgree') {
      const newRow = new TblDPurRateAgree()
      this.TblHPurRateAgree.tblDPurRateAgree.splice(index + 1, 0, newRow);

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


  async savePurchaseRate() {

    // if (!(await this.preSave())) {
    //   return;
    // }

    console.log(this.TblHPurRateAgree)
    // else {

    this._masterService.saveMasterData(apiUrl.purchaseRateAgreement, this.TblHPurRateAgree).then((res) => {
      console.log("res", res);
      this._messageService.add({ severity: 'success', summary: 'Date Saved', detail: 'Data Saved Successfully' });
      this.TblHPurRateAgree = new TblHPurRateAgree()
      this.TblHPurRateAgree.tblDPurRateAgree = [new TblDPurRateAgree()]
      this.TblHPurRateAgree.tbldPurRateAgreeCo = [new TblHPurRateAgreeCo()]
      this.router.navigate(['/l-master/purchase-rate-agree'])

    },
      err => {
        this._messageService.add({ severity: 'error', summary: err.error, detail: err.message });
      })

    // }
  }



  listPurchaseRate() {
    this.showPurchaseRateList = true
    this.getListData()
  }

  getListData() {
    this._masterService.getMasterData(apiUrl.purchaseRateAgreement).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPur_Agree_Code || item.HPur_Agree_Name || item.HPur_Agree_SysID;
      const matchesQuery =
        (item.HPur_Agree_Code || '').toLowerCase().includes(query) ||
        (item.HPur_Agree_Name || '').toLowerCase().includes(query) ||
        item.HPur_Agree_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showPurchaseRateList = false
    this.router.navigate(['l-master/purchase-rate-agree']);


  }



  editRow(rowData: any) {
    this.router.navigate(['l-master/purchase-rate-agree/' + rowData.HPur_Agree_SysID]);
  }

  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.purchaseRateAgreement, rowData.HPur_Agree_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showPurchaseRateList = false

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


        if (this.TblHPurRateAgree.HPur_Agree_SysID && rowData.DPurAgree_Prod_SysID) {
          this._masterService.deleteData(apiUrl.purchaseRateAgreement, `agreement-detail?where[DPurAgree_SysID]=${this.TblHPurRateAgree.tblDPurRateAgree[0].DPurAgree_SysID}&where[DPurAgree_Prod_SysID]=${rowData.DPurAgree_Prod_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'tblDPurRateAgree') {
                this.TblHPurRateAgree.tblDPurRateAgree.splice(index, 1);
                if (this.TblHPurRateAgree.tblDPurRateAgree.length === 0) {
                  this.addRow('tblDPurRateAgree', -1);
                }

              }

            }

          });
        } else {
          if (table === 'tblDPurRateAgree') {
            this.TblHPurRateAgree.tblDPurRateAgree.splice(index, 1);
            if (this.TblHPurRateAgree.tblDPurRateAgree.length === 0) {
              this.addRow('tblDPurRateAgree', -1);
            }
          }
        }
      }
    });


  }




  addPurchaseRow(table: any, index: number) {
    if (table == 'tblDPurRateAgree') {
      const newRow = new TblDPurRateAgree()
      this.TblHPurRateAgree.tblDPurRateAgree.splice(index + 1, 0, newRow);

    }

  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._masterService.deleteData(apiUrl.shippedToMaster, this.TblHPurRateAgree.HPur_Agree_SysID).then((res) => {
          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            // Only clear the details, keep one empty row
            this.TblHPurRateAgree.tblDPurRateAgree = [new TblDPurRateAgree()];
            this.TblHPurRateAgree.tbldPurRateAgreeCo = [new TblHPurRateAgreeCo()];
            this.TblHPurRateAgree = new TblHPurRateAgree();
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
    const digiLock = this.TblHPurRateAgree;
    if (type === 'validagreementate') {
      digiLock.HPur_Agree_From_Date = dateObj;
    }
  }


  onDatevalidtoChange(type, value: string) {
    const dateObj = value ? new Date(value) : null;
    const digiLock = this.TblHPurRateAgree;
    if (type === 'validagreementtodate') {
      digiLock.HPur_Agree_to_Date = dateObj;
    }

  }
}
