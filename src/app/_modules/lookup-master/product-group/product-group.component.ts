import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProdGroupHead } from 'src/app/_dto/masters/ProdGroupHead.dto';
import { ProdGroupDetail } from 'src/app/_dto/ProdGroupDetail.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.scss']
})
export class ProductGroupComponent implements OnInit {
  ProdGroupHead: ProdGroupHead = new ProdGroupHead()
  isSaving: boolean = false;

  progressValue: number = 0;

  tableIndex: any;

  HProdGroup_SysID: any;

  showDeleteButton: boolean = false;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showProductGroupList: boolean = false


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.ProdGroupHead.ProdGroupDetail = [new ProdGroupDetail()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HProdGroup_SysID = Number(id);
        this.ProdGroupHead.HProdGroup_SysID = Number(id);
        this.getdata()
      }
    });
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        break;
      case 'AccDirectExpCode':
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
        const isExist = this.ProdGroupHead.ProdGroupDetail.some(item => item.DcProdGroup_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Product Group Master' });
          return;
        }
        this.ProdGroupHead.ProdGroupDetail[this.tableIndex].DcVProdGroup_SingleCo_SysID = event.sysId
        this.ProdGroupHead.ProdGroupDetail[this.tableIndex].DcProdGroup_SingleCo_Code = event.code
        this.ProdGroupHead.ProdGroupDetail[this.tableIndex].DcProdGroup_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        // this.ProdGroupHead.HProfCent_AcDe_Code = event.code
        // this.ProdGroupHead.HProfCent_AcDe_Name = event.name
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


        if (this.ProdGroupHead.HProdGroup_SysID && rowData.DcVProdGroup_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.profitCenter, `company?where[DcProdGroup_SysID]=${this.ProdGroupHead.ProdGroupDetail[0].DcProdGroup_SysID}&where[DcVProdGroup_SingleCo_SysID]=${rowData.DcVProdGroup_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'ProdGroupDetail') {
                this.ProdGroupHead.ProdGroupDetail.splice(index, 1);
                if (this.ProdGroupHead.ProdGroupDetail.length === 0) {
                  this.addRow('ProdGroupDetail', -1);
                }
              }

            }

          });
        } else {
          if (table === 'ProdGroupDetail') {
            this.ProdGroupHead.ProdGroupDetail.splice(index, 1);
            if (this.ProdGroupHead.ProdGroupDetail.length === 0) {
              this.addRow('ProdGroupDetail', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'ProdGroupDetail') {
      const newRow = new ProdGroupDetail()
      this.ProdGroupHead.ProdGroupDetail.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.ProdGroupHead.HProdGroup_Code == null || this.ProdGroupHead.HProdGroup_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Product Group Code Cannot Be Null' });
      return false;
    }

    if (this.ProdGroupHead.HProdGroup_Short_Name == null || this.ProdGroupHead.HProdGroup_Short_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Product Group Name Cannot Be Null' });
      return false;
    }
    if (this.ProdGroupHead.ProdGroupDetail[0].DcProdGroup_SingleCo_Code == null || this.ProdGroupHead.ProdGroupDetail[0].DcProdGroup_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Product Group Single Company Code Cannot Be Null' });
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
    this.ProdGroupHead.ProdGroupDetail = this.ProdGroupHead.ProdGroupDetail.filter(
      row => row.DcProdGroup_SingleCo_Code && row.DcProdGroup_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.remarksMaster, this.ProdGroupHead).then((res) => {
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
        this.ProdGroupHead = new ProdGroupHead();
        this.ProdGroupHead.ProdGroupDetail = [new ProdGroupDetail()];

        // Navigate to list screen
        this.router.navigate(['l-master/remarks/']);

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
    if (this.ProdGroupHead.HProdGroup_SysID || this.HProdGroup_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.profitCenter, this.ProdGroupHead.HProdGroup_SysID).then((res) => {
        this.ProdGroupHead = res
        this.showDeleteButton = true;

        if (this.ProdGroupHead.ProdGroupDetail.length == 0) {
          this.ProdGroupHead.ProdGroupDetail = [new ProdGroupDetail()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.ProdGroupHead = new ProdGroupHead()
          this.ProdGroupHead.ProdGroupDetail = [new ProdGroupDetail()]
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
        this.masterService.deleteData(apiUrl.profitCenter, this.ProdGroupHead.HProdGroup_SysID).then((res) => {

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
    this.ProdGroupHead = new ProdGroupHead()
    this.ProdGroupHead.ProdGroupDetail = [new ProdGroupDetail()]
    this.router.navigate(['l-master/product-group']);

  }
  cancel() {
    this.ProdGroupHead = new ProdGroupHead()
    this.ProdGroupHead.ProdGroupDetail = [new ProdGroupDetail()]
    this.router.navigate(['l-master/product-group']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayProductGroupList() {
    this.showProductGroupList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.remarksMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HProdGroup_Code || item.HProdGroup_Name || item.HProdGroup_SysID;
      const matchesQuery =
        (item.HProdGroup_Code || '').toLowerCase().includes(query) ||
        (item.HProdGroup_Name || '').toLowerCase().includes(query) ||
        item.HProdGroup_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showProductGroupList = false
    this.router.navigate(['l-master/product-group']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/product-group/' + rowData.HProdGroup_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.remarksMaster, rowData.HProdGroup_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showProductGroupList = false

            this.getListData()
          }

        });
      }
    });
  }




}
