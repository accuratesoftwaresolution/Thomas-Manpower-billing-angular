import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldBomBatchCo } from 'src/app/_dto/masters/bom-production-batch/TbldBomBatchCo.dto';
import { TblHBomBatch } from 'src/app/_dto/masters/bom-production-batch/TblHBomBatch.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-bom-production-batch',
  templateUrl: './bom-production-batch.component.html',
  styleUrls: ['./bom-production-batch.component.scss']
})
export class BomProductionBatchComponent implements OnInit {

 TblHBomBatch: TblHBomBatch = new TblHBomBatch()

    listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showBombatchList :boolean = false

  tableIndex: any;

  HBBatch_SysID: any;

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
    this.TblHBomBatch.applicableCo = [new TbldBomBatchCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HBBatch_SysID = Number(id);
        this.TblHBomBatch.HBBatch_SysID = Number(id);
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
        const isExist = this.TblHBomBatch.applicableCo.some(item => item.DcBBatch_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for BOM Job Creation Master' });
          return;
        }
        this.TblHBomBatch.applicableCo[this.tableIndex].DcBBatch_SingleCo_SysID = event.sysId
        this.TblHBomBatch.applicableCo[this.tableIndex].DcBBatch_SingleCo_Code = event.code
        this.TblHBomBatch.applicableCo[this.tableIndex].DcBBatch_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHBomBatch.HBBatch_AcDe_Code = event.code
        this.TblHBomBatch.HBBatch_AcDe_Name = event.name
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


        if (this.TblHBomBatch.HBBatch_SysID && rowData.DcBBatch_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.suppliercategory, `company?where[DcBBatch_SysID]=${this.TblHBomBatch.applicableCo[0].DcBBatch_SysID}&where[DcBBatch_SingleCo_SysID]=${rowData.DcBBatch_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'applicableCo') {
                this.TblHBomBatch.applicableCo.splice(index, 1);
                if (this.TblHBomBatch.applicableCo.length === 0) {
                  this.addRow('applicableCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'applicableCo') {
            this.TblHBomBatch.applicableCo.splice(index, 1);
            if (this.TblHBomBatch.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldBomBatchCo()
      this.TblHBomBatch.applicableCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHBomBatch.HBBatch_Code == null || this.TblHBomBatch.HBBatch_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Job Creation Code Cannot Be Null' });
      return false;
    }

    if (this.TblHBomBatch.HBBatch_Name == null || this.TblHBomBatch.HBBatch_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Job Creation Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHBomBatch.applicableCo = this.TblHBomBatch.applicableCo.filter(
      row => row.DcBBatch_SingleCo_Code && row.DcBBatch_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.suppliercategory, this.TblHBomBatch).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHBomBatch = new TblHBomBatch()
        this.TblHBomBatch.applicableCo = [new TbldBomBatchCo()]

      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHBomBatch.HBBatch_SysID || this.HBBatch_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.suppliercategory, this.TblHBomBatch.HBBatch_SysID).then((res) => {
        this.TblHBomBatch = res
        this.showDeleteButton = true;

        if (this.TblHBomBatch.applicableCo.length == 0) {
          this.TblHBomBatch.applicableCo = [new TbldBomBatchCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHBomBatch = new TblHBomBatch()
          this.TblHBomBatch.applicableCo = [new TbldBomBatchCo()]
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
        this.masterService.deleteData(apiUrl.suppliercategory, this.TblHBomBatch.HBBatch_SysID).then((res) => {

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
    this.TblHBomBatch = new TblHBomBatch()
    this.TblHBomBatch.applicableCo = [new TbldBomBatchCo()]
    this.router.navigate(['prod-masters/bom-production-batch/']);

  }
  cancel(){
    this.TblHBomBatch = new TblHBomBatch()
          this.TblHBomBatch.applicableCo = [new TbldBomBatchCo()]
  }

   //***************************************LIST********************************
  displayBOMbatchList() {
    this.showBombatchList = true
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
      const hasData = item.HBBatch_Code || item.HBBatch_Name ||  item.HBBatch_SysID;
      const matchesQuery =
        (item.HBBatch_Code || '').toLowerCase().includes(query) ||
        (item.HBBatch_Name || '').toLowerCase().includes(query) ||
        item.HBBatch_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showBombatchList = false
    this.router.navigate(['prod-masters/bom-production-batch']);


  }
    editRow(rowData: any) {
    this.router.navigate(['prod-masters/bom-production-batch/' + rowData.HBBatch_SysID]);
  }


}
