import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProductModuleCompanyDto } from 'src/app/_dto/masters/product-module/TbldProdModuleCo.dto';
import { ProductModuleDto } from 'src/app/_dto/masters/product-module/TblHProdModule.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-prod-module',
  templateUrl: './prod-module.component.html',
  styleUrls: ['./prod-module.component.scss']
})
export class ProdModuleComponent implements OnInit {

  ProductModuleDto: ProductModuleDto = new ProductModuleDto()

  tableIndex: any;

  HProdModule_SysID: any;

  showDeleteButton: boolean = false;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showProductModuleList: boolean = false


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.ProductModuleDto.TbldProdModuleCo = [new ProductModuleCompanyDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HProdModule_SysID = Number(id);
        this.ProductModuleDto.HProdModule_SysID = Number(id);
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
        const isExist = this.ProductModuleDto.TbldProdModuleCo.some(item => item.DcProdModule_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for ProductModule Master' });
          return;
        }
        this.ProductModuleDto.TbldProdModuleCo[this.tableIndex].DcProdModule_SingleCo_SysID = event.sysId
        this.ProductModuleDto.TbldProdModuleCo[this.tableIndex].DcProdModule_SingleCo_Code = event.code
        this.ProductModuleDto.TbldProdModuleCo[this.tableIndex].DcProdModule_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.ProductModuleDto.HProdModule_AcDe_Code = event.code
        this.ProductModuleDto.HProdModule_AcDe_Name = event.name
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
        //  console.log(this.DcProdModule_SysID)

        if (this.ProductModuleDto.HProdModule_SysID && rowData.DcProdModule_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.ProductModule, `company?where[DcProdModule_SysID]=${this.ProductModuleDto.TbldProdModuleCo[0].DcProdModule_SysID}&where[DcProdModule_SingleCo_SysID]=${rowData.DcProdModule_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldProdModuleCo') {
                this.ProductModuleDto.TbldProdModuleCo.splice(index, 1);
                if (this.ProductModuleDto.TbldProdModuleCo.length === 0) {
                  this.addRow('TbldProdModuleCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldProdModuleCo') {
            this.ProductModuleDto.TbldProdModuleCo.splice(index, 1);
            if (this.ProductModuleDto.TbldProdModuleCo.length === 0) {
              this.addRow('TbldProdModuleCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldProdModuleCo') {
      const newRow = new ProductModuleCompanyDto()
      this.ProductModuleDto.TbldProdModuleCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.ProductModuleDto.HProdModule_Code == null || this.ProductModuleDto.HProdModule_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Product Module Code Cannot Be Null' });
      return false;
    }

    if (this.ProductModuleDto.HProdModule_Name == null || this.ProductModuleDto.HProdModule_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Product Module Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.ProductModuleDto.TbldProdModuleCo = this.ProductModuleDto.TbldProdModuleCo.filter(
      row => row.DcProdModule_SingleCo_Code && row.DcProdModule_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.ProductModule, this.ProductModuleDto).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.ProductModuleDto = new ProductModuleDto()
        this.ProductModuleDto.TbldProdModuleCo = [new ProductModuleCompanyDto()]
        this.router.navigate(['l-master/prod-module']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.ProductModuleDto.HProdModule_SysID || this.HProdModule_SysID) {

      this.masterService.getMasterDatabyId(apiUrl.ProductModule, this.ProductModuleDto.HProdModule_SysID).then((res) => {
        this.ProductModuleDto = res
        this.showDeleteButton = true;

        if (this.ProductModuleDto.TbldProdModuleCo.length == 0) {
          this.ProductModuleDto.TbldProdModuleCo = [new ProductModuleCompanyDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.ProductModuleDto = new ProductModuleDto()
          this.ProductModuleDto.TbldProdModuleCo = [new ProductModuleCompanyDto()]
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
        this.masterService.deleteData(apiUrl.ProductModule, this.ProductModuleDto.HProdModule_SysID).then((res) => {

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
    this.ProductModuleDto = new ProductModuleDto()
    this.ProductModuleDto.TbldProdModuleCo = [new ProductModuleCompanyDto()]
    this.router.navigate(['l-master/prod-module/']);

  }

  cancel() {
    this.ProductModuleDto = new ProductModuleDto()
    this.ProductModuleDto.TbldProdModuleCo = [new ProductModuleCompanyDto()]
    this.router.navigate(['l-master/prod-module']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayProductModuleList() {
    this.showProductModuleList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.ProductModule).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HProdModule_Code || item.HProdModule_Name || item.HProdModule_SysID;
      const matchesQuery =
        (item.HProdModule_Code || '').toLowerCase().includes(query) ||
        (item.HProdModule_Name || '').toLowerCase().includes(query) ||
        item.HProdModule_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showProductModuleList = false
    this.router.navigate(['l-master/prod-module']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/prod-module/' + rowData.HProdModule_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.ProductModule, rowData.HProdModule_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showProductModuleList = false

            this.getListData()
          }

        });
      }
    });
  }



}