import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldBomProdModuCo } from 'src/app/_dto/masters/bom-product-module/TbldBomProdModuCo.dto';
import { TblHBomProdModu } from 'src/app/_dto/masters/bom-product-module/TblHBomProdModu.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-bom-product-module',
  templateUrl: './bom-product-module.component.html',
  styleUrls: ['./bom-product-module.component.scss']
})
export class BomProductModuleComponent implements OnInit {


  TblHBomProdModu: TblHBomProdModu = new TblHBomProdModu()

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showBomModuleList: boolean = false

  tableIndex: any;

  HBProdModu_SysID: any;

  showDeleteButton: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHBomProdModu.applicableCo = [new TbldBomProdModuCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HBProdModu_SysID = Number(id);
        this.TblHBomProdModu.HBProdModu_SysID = Number(id);
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
        const isExist = this.TblHBomProdModu.applicableCo.some(item => item.DcBProdModu_SingleCo_Code === selectedCode)
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for BOM Product Module Master' });
          return;
        }
        this.TblHBomProdModu.applicableCo[this.tableIndex].DcBProdModu_SingleCo_SysID = event.sysId
        this.TblHBomProdModu.applicableCo[this.tableIndex].DcBProdModu_SingleCo_Code = event.code
        this.TblHBomProdModu.applicableCo[this.tableIndex].DcBProdModu_SingleCo_Name = event.name
        break;

      case 'ActAndDeactCode':
        this.TblHBomProdModu.HBProdModu_AcDe_Code = event.code
        this.TblHBomProdModu.HBProdModu_AcDe_Name = event.name
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
        if (this.TblHBomProdModu.HBProdModu_SysID && rowData.DcBProdModu_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.suppliercategory, `company?where[DcBProdModu_SysID]=${this.TblHBomProdModu.applicableCo[0].DcBProdModu_SysID}&where[DcBProdModu_SingleCo_SysID]=${rowData.DcBProdModu_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'applicableCo') {
                this.TblHBomProdModu.applicableCo.splice(index, 1);
                if (this.TblHBomProdModu.applicableCo.length === 0) {
                  this.addRow('applicableCo', -1);
                }
              }
            }
          });
        } else {
          if (table === 'applicableCo') {
            this.TblHBomProdModu.applicableCo.splice(index, 1);
            if (this.TblHBomProdModu.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldBomProdModuCo()
      this.TblHBomProdModu.applicableCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHBomProdModu.HBProdModu_Code == null || this.TblHBomProdModu.HBProdModu_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Product Module Code Cannot Be Null' });
      return false;
    }

    if (this.TblHBomProdModu.HBProdModu_Name == null || this.TblHBomProdModu.HBProdModu_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Product Module Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHBomProdModu.applicableCo = this.TblHBomProdModu.applicableCo.filter(
      row => row.DcBProdModu_SingleCo_Code && row.DcBProdModu_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.suppliercategory, this.TblHBomProdModu).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHBomProdModu = new TblHBomProdModu()
        this.TblHBomProdModu.applicableCo = [new TbldBomProdModuCo()]

      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHBomProdModu.HBProdModu_SysID || this.HBProdModu_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.suppliercategory, this.TblHBomProdModu.HBProdModu_SysID).then((res) => {
        this.TblHBomProdModu = res
        this.showDeleteButton = true;

        if (this.TblHBomProdModu.applicableCo.length == 0) {
          this.TblHBomProdModu.applicableCo = [new TbldBomProdModuCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHBomProdModu = new TblHBomProdModu()
          this.TblHBomProdModu.applicableCo = [new TbldBomProdModuCo()]
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
        this.masterService.deleteData(apiUrl.suppliercategory, this.TblHBomProdModu.HBProdModu_SysID).then((res) => {

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
    this.TblHBomProdModu = new TblHBomProdModu()
    this.TblHBomProdModu.applicableCo = [new TbldBomProdModuCo()]
    this.router.navigate(['prod-masters/bom-product-module/']);

  }
  cancel() {
    this.TblHBomProdModu = new TblHBomProdModu()
    this.TblHBomProdModu.applicableCo = [new TbldBomProdModuCo()]
  }

  //***************************************LIST********************************
  displayBOMmoduleList() {
    this.showBomModuleList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData('account-module').then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HBProdModu_Code || item.HBProdModu_Name || item.HBProdModu_SysID;
      const matchesQuery =
        (item.HBProdModu_Code || '').toLowerCase().includes(query) ||
        (item.HBProdModu_Name || '').toLowerCase().includes(query) ||
        item.HBProdModu_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showBomModuleList = false
    this.router.navigate(['prod-masters/bom-product-module']);
  }
  editRow(rowData: any) {
    this.router.navigate(['prod-masters/bom-product-module/' + rowData.HBProdModu_SysID]);
  }

}
