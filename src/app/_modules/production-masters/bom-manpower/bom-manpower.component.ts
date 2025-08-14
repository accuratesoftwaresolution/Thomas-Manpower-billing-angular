import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldBomManpowCo } from 'src/app/_dto/masters/bom-manpower/TbldBomManpowCo.dto';
import { TblHBomManpow } from 'src/app/_dto/masters/bom-manpower/TblHBomManpow.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-bom-manpower',
  templateUrl: './bom-manpower.component.html',
  styleUrls: ['./bom-manpower.component.scss']
})
export class BomManpowerComponent implements OnInit {


   TblHBomManpow: TblHBomManpow = new TblHBomManpow()

    listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showBomJobCreationList :boolean = false

  tableIndex: any;

  HManpow_SysID: any;

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
    this.TblHBomManpow.applicableCo = [new TbldBomManpowCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HManpow_SysID = Number(id);
        this.TblHBomManpow.HManpow_SysID = Number(id);
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
        const isExist = this.TblHBomManpow.applicableCo.some(item => item.DcManpow_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for BOM Man Power Master' });
          return;
        }
        this.TblHBomManpow.applicableCo[this.tableIndex].DcManpow_SingleCo_SysID = event.sysId
        this.TblHBomManpow.applicableCo[this.tableIndex].DcManpow_SingleCo_Code = event.code
        this.TblHBomManpow.applicableCo[this.tableIndex].DcManpow_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHBomManpow.HManpow_AcDe_Code = event.code
        this.TblHBomManpow.HManpow_AcDe_Name = event.name
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


        if (this.TblHBomManpow.HManpow_SysID && rowData.DcManpow_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.suppliercategory, `company?where[DcManpow_SysID]=${this.TblHBomManpow.applicableCo[0].DcManpow_SysID}&where[DcManpow_SingleCo_SysID]=${rowData.DcManpow_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'applicableCo') {
                this.TblHBomManpow.applicableCo.splice(index, 1);
                if (this.TblHBomManpow.applicableCo.length === 0) {
                  this.addRow('applicableCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'applicableCo') {
            this.TblHBomManpow.applicableCo.splice(index, 1);
            if (this.TblHBomManpow.applicableCo.length === 0) {
              this.addRow('applicableCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'applicableCo') {
      const newRow = new TbldBomManpowCo()
      this.TblHBomManpow.applicableCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHBomManpow.HManpow_Code == null || this.TblHBomManpow.HManpow_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Man Power Code Cannot Be Null' });
      return false;
    }

    if (this.TblHBomManpow.HManpow_Name == null || this.TblHBomManpow.HManpow_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'BOM Man Power Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHBomManpow.applicableCo = this.TblHBomManpow.applicableCo.filter(
      row => row.DcManpow_SingleCo_Code && row.DcManpow_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.suppliercategory, this.TblHBomManpow).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHBomManpow = new TblHBomManpow()
        this.TblHBomManpow.applicableCo = [new TbldBomManpowCo()]

      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHBomManpow.HManpow_SysID || this.HManpow_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.suppliercategory, this.TblHBomManpow.HManpow_SysID).then((res) => {
        this.TblHBomManpow = res
        this.showDeleteButton = true;

        if (this.TblHBomManpow.applicableCo.length == 0) {
          this.TblHBomManpow.applicableCo = [new TbldBomManpowCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHBomManpow = new TblHBomManpow()
          this.TblHBomManpow.applicableCo = [new TbldBomManpowCo()]
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
        this.masterService.deleteData(apiUrl.suppliercategory, this.TblHBomManpow.HManpow_SysID).then((res) => {

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
    this.TblHBomManpow = new TblHBomManpow()
    this.TblHBomManpow.applicableCo = [new TbldBomManpowCo()]
    this.router.navigate(['prod-masters/bom-manpower/']);

  }
  cancel(){
    this.TblHBomManpow = new TblHBomManpow()
          this.TblHBomManpow.applicableCo = [new TbldBomManpowCo()]
  }

   //***************************************LIST********************************
  displayBOMJobcreationList() {
    this.showBomJobCreationList = true
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
      const hasData = item.HManpow_Code || item.HManpow_Name || item.HManpow_SysID;
      const matchesQuery =
        (item.HManpow_Code || '').toLowerCase().includes(query) ||
        (item.HManpow_Name || '').toLowerCase().includes(query) ||
        item.HManpow_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showBomJobCreationList = false
    this.router.navigate(['prod-masters/bom-manpower']);


  }
    editRow(rowData: any) {
    this.router.navigate(['prod-masters/bom-manpower/' + rowData.HManpow_SysID]);
  }



}
