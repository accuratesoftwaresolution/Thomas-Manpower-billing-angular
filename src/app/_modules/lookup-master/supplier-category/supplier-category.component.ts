import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldSupCateCoDto } from 'src/app/_dto/masters/supplier-category/TbldSupCateCo.dto';
import { TblHSupCateDto } from 'src/app/_dto/masters/supplier-category/TblHSupCate.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-supplier-category',
  templateUrl: './supplier-category.component.html',
  styleUrls: ['./supplier-category.component.scss']
})
export class SupplierCategoryComponent implements OnInit {

  TblHSupCateDto: TblHSupCateDto = new TblHSupCateDto()

  tableIndex: any;

  HSupCate_SysID: any;

  showDeleteButton: boolean = false;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showSupplierCategoryList: boolean = false
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
    this.TblHSupCateDto.TbldSupCateCo = [new TbldSupCateCoDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HSupCate_SysID = Number(id);
        this.TblHSupCateDto.HSupCate_SysID = Number(id);
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
        const isExist = this.TblHSupCateDto.TbldSupCateCo.some(item => item.DcSupCate_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Supplier Category Master' });
          return;
        }
        this.TblHSupCateDto.TbldSupCateCo[this.tableIndex].DcSupCate_SingleCo_SysID = event.SingleCo_SysID
        this.TblHSupCateDto.TbldSupCateCo[this.tableIndex].DcSupCate_SingleCo_Code = event.SingleCo_Code
        this.TblHSupCateDto.TbldSupCateCo[this.tableIndex].DcSupCate_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHSupCateDto.HSupCate_AcDe_SysID = event.HActDeactive_SysID
        this.TblHSupCateDto.HSupCate_AcDe_Code = event.HActDeactive_Code
        this.TblHSupCateDto.HSupCate_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHSupCateDto.HSupCate_SysID && rowData.DcSupCate_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.suppliercategory, `company?where[DcSupCate_SysID]=${this.TblHSupCateDto.TbldSupCateCo[0].DcSupCate_SysID}&where[DcSupCate_SingleCo_SysID]=${rowData.DcSupCate_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldSupCateCo') {
                this.TblHSupCateDto.TbldSupCateCo.splice(index, 1);
                if (this.TblHSupCateDto.TbldSupCateCo.length === 0) {
                  this.addRow('TbldSupCateCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldSupCateCo') {
            this.TblHSupCateDto.TbldSupCateCo.splice(index, 1);
            if (this.TblHSupCateDto.TbldSupCateCo.length === 0) {
              this.addRow('TbldSupCateCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldSupCateCo') {
      const newRow = new TbldSupCateCoDto()
      this.TblHSupCateDto.TbldSupCateCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHSupCateDto.HSupCate_Code == null || this.TblHSupCateDto.HSupCate_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Supplier Category Code Cannot Be Null' });
      return false;
    }

    if (this.TblHSupCateDto.HSupCate_Name == null || this.TblHSupCateDto.HSupCate_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Supplier Category Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHSupCateDto.TbldSupCateCo = this.TblHSupCateDto.TbldSupCateCo.filter(
      row => row.DcSupCate_SingleCo_Code && row.DcSupCate_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.suppliercategory, this.TblHSupCateDto).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHSupCateDto = new TblHSupCateDto()
        this.TblHSupCateDto.TbldSupCateCo = [new TbldSupCateCoDto()]
        this.router.navigate(['l-master/supplier-category/']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHSupCateDto.HSupCate_SysID || this.HSupCate_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.suppliercategory, this.TblHSupCateDto.HSupCate_SysID).then((res) => {
        this.TblHSupCateDto = res
        this.showDeleteButton = true;

        if (this.TblHSupCateDto.TbldSupCateCo.length == 0) {
          this.TblHSupCateDto.TbldSupCateCo = [new TbldSupCateCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHSupCateDto = new TblHSupCateDto()
          this.TblHSupCateDto.TbldSupCateCo = [new TbldSupCateCoDto()]
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
        this.masterService.deleteData(apiUrl.suppliercategory, this.TblHSupCateDto.HSupCate_SysID).then((res) => {

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
    this.TblHSupCateDto = new TblHSupCateDto()
    this.TblHSupCateDto.TbldSupCateCo = [new TbldSupCateCoDto()]
    this.router.navigate(['l-master/supplier-category/']);

  }
  cancel() {
    this.TblHSupCateDto = new TblHSupCateDto()
    this.TblHSupCateDto.TbldSupCateCo = [new TbldSupCateCoDto()]
    this.router.navigate(['l-master/supplier-category/']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displaySupplierList() {
    this.showSupplierCategoryList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.suppliercategory).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HSupCate_Code || item.HSupCate_Name || item.HSupCate_SysID;
      const matchesQuery =
        (item.HSupCate_Code || '').toLowerCase().includes(query) ||
        (item.HSupCate_Name || '').toLowerCase().includes(query) ||
        item.HSupCate_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showSupplierCategoryList = false
    this.router.navigate(['l-master/supplier-category']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/supplier-category/' + rowData.HSupCate_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.suppliercategory, rowData.HSupCate_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showSupplierCategoryList = false

            this.getListData()
          }

        });
      }
    });
  }


}