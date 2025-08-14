import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldBomProdProceCo } from 'src/app/_dto/masters/bom-production-process/TbldBomProdProceCo.dto';
import { TblHBomProdProce } from 'src/app/_dto/masters/bom-production-process/TblHBomProdProce.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-bom-production-process',
  templateUrl: './bom-production-process.component.html',
  styleUrls: ['./bom-production-process.component.scss']
})
export class BomProductionProcessComponent implements OnInit {

  TblHBomProdProce: TblHBomProdProce = new TblHBomProdProce()

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showBomJobProcessList: boolean = false

  tableIndex: any;

  HProdProce_SysID: any;

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
    this.TblHBomProdProce.applicableCo = [new TbldBomProdProceCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HProdProce_SysID = Number(id);
        this.TblHBomProdProce.HProdProce_SysID = Number(id);
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
        const isExist = this.TblHBomProdProce.applicableCo.some(item => item.DcProdProce_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for BOM Production Process Master' });
          return;
        }
        this.TblHBomProdProce.applicableCo[this.tableIndex].DcProdProce_SingleCo_SysID = event.sysId
        this.TblHBomProdProce.applicableCo[this.tableIndex].DcProdProce_SingleCo_Code = event.code
        this.TblHBomProdProce.applicableCo[this.tableIndex].DcProdProce_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHBomProdProce.HProdProce_AcDe_Code = event.code
        this.TblHBomProdProce.HProdProce_AcDe_Name = event.name
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


        if (this.TblHBomProdProce.HProdProce_SysID && rowData.DcProdProce_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.suppliercategory, `company?where[DcProdProce_SysID]=${this.TblHBomProdProce.applicableCo[0].DcProdProce_SysID}&where[DcProdProce_SingleCo_SysID]=${rowData.DcProdProce_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'applicableCo') {
                this.TblHBomProdProce.applicableCo.splice(index, 1);
                if (this.TblHBomProdProce.applicableCo.length === 0) {
                  this.addRow('applicableCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'applicableCo') {
            this.TblHBomProdProce.applicableCo.splice(index, 1);
            if (this.TblHBomProdProce.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldBomProdProceCo()
      this.TblHBomProdProce.applicableCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHBomProdProce.HProdProce_Code == null || this.TblHBomProdProce.HProdProce_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Production Process Code Cannot Be Null' });
      return false;
    }

    if (this.TblHBomProdProce.HProdProce_Name == null || this.TblHBomProdProce.HProdProce_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Production Process Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHBomProdProce.applicableCo = this.TblHBomProdProce.applicableCo.filter(
      row => row.DcProdProce_SingleCo_Code && row.DcProdProce_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.suppliercategory, this.TblHBomProdProce).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHBomProdProce = new TblHBomProdProce()
        this.TblHBomProdProce.applicableCo = [new TbldBomProdProceCo()]

      }
    })
  }

  funcSearch() {
    this.getdata()
  }

  getdata() {
    if (this.TblHBomProdProce.HProdProce_SysID || this.HProdProce_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.suppliercategory, this.TblHBomProdProce.HProdProce_SysID).then((res) => {
        this.TblHBomProdProce = res
        this.showDeleteButton = true;

        if (this.TblHBomProdProce.applicableCo.length == 0) {
          this.TblHBomProdProce.applicableCo = [new TbldBomProdProceCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHBomProdProce = new TblHBomProdProce()
          this.TblHBomProdProce.applicableCo = [new TbldBomProdProceCo()]
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
        this.masterService.deleteData(apiUrl.suppliercategory, this.TblHBomProdProce.HProdProce_SysID).then((res) => {

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
    this.TblHBomProdProce = new TblHBomProdProce()
    this.TblHBomProdProce.applicableCo = [new TbldBomProdProceCo()]
    this.router.navigate(['prod-masters/bom-production-process/']);

  }
  cancel() {
    this.TblHBomProdProce = new TblHBomProdProce()
    this.TblHBomProdProce.applicableCo = [new TbldBomProdProceCo()]
  }

  //***************************************LIST********************************

  displayBOMProcessList() {
    this.showBomJobProcessList = true
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
      const hasData = item.HProdProce_Code || item.HProdProce_Name || item.HProdProce_SysID;
      const matchesQuery =
        (item.HProdProce_Code || '').toLowerCase().includes(query) ||
        (item.HProdProce_Name || '').toLowerCase().includes(query) ||
        item.HProdProce_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showBomJobProcessList = false
    this.router.navigate(['prod-masters/bom-production-process']);


  }
  editRow(rowData: any) {
    this.router.navigate(['prod-masters/bom-production-process/' + rowData.HProdProce_SysID]);
  }

}
