import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldFirstUnitCo } from 'src/app/_dto/TbldFirstUnitCo.dto';
import { TblHFirstUnit } from 'src/app/_dto/TblHFirstUnit.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-unit-master',
  templateUrl: './unit-master.component.html',
  styleUrls: ['./unit-master.component.scss']
})
export class UnitMasterComponent implements OnInit {

  TblHFirstUnit: TblHFirstUnit = new TblHFirstUnit()

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showUnitList: boolean = false


  tableIndex: any;

  HFirstUnit_SysID: any;

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
    this.TblHFirstUnit.TbldFirstUnitCo = [new TbldFirstUnitCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HFirstUnit_SysID = Number(id);
        this.TblHFirstUnit.HFirstUnit_SysID = Number(id);
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
        const isExist = this.TblHFirstUnit.TbldFirstUnitCo.some(item => item.DcFirstUnit_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for unit-master ' });
          return;
        }
        this.TblHFirstUnit.TbldFirstUnitCo[this.tableIndex].DcFirstUnit_SingleCo_SysID = event.sysId
        this.TblHFirstUnit.TbldFirstUnitCo[this.tableIndex].DcFirstUnit_SingleCo_Code = event.code
        this.TblHFirstUnit.TbldFirstUnitCo[this.tableIndex].DcFirstUnit_SingleCo_Name = event.name;

        break;


      case 'ActAndDeactCode':
        this.TblHFirstUnit.HFirstUnit_AcDe_Code = event.code
        this.TblHFirstUnit.HFirstUnit_AcDe_Name = event.name
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


        if (this.TblHFirstUnit.HFirstUnit_SysID && rowData.DcFirstUnit_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.unitmaster, `company?where[DcFirstUnit_SysID]=${this.TblHFirstUnit.TbldFirstUnitCo[0].DcFirstUnit_SysID}&where[DcFirstUnit_SingleCo_SysID]=${rowData.DcFirstUnit_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldFirstUnitCo') {
                this.TblHFirstUnit.TbldFirstUnitCo.splice(index, 1);
                if (this.TblHFirstUnit.TbldFirstUnitCo.length === 0) {
                  this.addRow('TbldFirstUnitCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldFirstUnitCo') {
            this.TblHFirstUnit.TbldFirstUnitCo.splice(index, 1);
            if (this.TblHFirstUnit.TbldFirstUnitCo.length === 0) {
              this.addRow('TbldFirstUnitCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldFirstUnitCo') {
      const newRow = new TbldFirstUnitCo()
      this.TblHFirstUnit.TbldFirstUnitCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHFirstUnit.HFirstUnit_Base_Unit == null || this.TblHFirstUnit.HFirstUnit_Base_Unit.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Product First Unit Cannot Be Null' });
      return false;
    }

    if (this.TblHFirstUnit.HFirstUnit_Unit_Frac == null || this.TblHFirstUnit.HFirstUnit_Unit_Frac.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Product First Unit Fraction Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHFirstUnit.TbldFirstUnitCo = this.TblHFirstUnit.TbldFirstUnitCo.filter(
      row => row.DcFirstUnit_SingleCo_Code && row.DcFirstUnit_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.unitmaster, this.TblHFirstUnit).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHFirstUnit = new TblHFirstUnit()
        this.TblHFirstUnit.TbldFirstUnitCo = [new TbldFirstUnitCo()]
        this.router.navigate(['l-master/unit-master']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHFirstUnit.HFirstUnit_SysID || this.HFirstUnit_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.unitmaster, this.TblHFirstUnit.HFirstUnit_SysID).then((res) => {
        this.TblHFirstUnit = res
        this.showDeleteButton = true;

        if (this.TblHFirstUnit.TbldFirstUnitCo.length == 0) {
          this.TblHFirstUnit.TbldFirstUnitCo = [new TbldFirstUnitCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHFirstUnit = new TblHFirstUnit()
          this.TblHFirstUnit.TbldFirstUnitCo = [new TbldFirstUnitCo()]
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
        this.masterService.deleteData(apiUrl.unitmaster, this.TblHFirstUnit.HFirstUnit_SysID).then((res) => {

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
    this.TblHFirstUnit = new TblHFirstUnit()
    this.TblHFirstUnit.TbldFirstUnitCo = [new TbldFirstUnitCo()]
    this.router.navigate(['l-master/unit-master/']);

  }
  cancel() {
    this.TblHFirstUnit = new TblHFirstUnit()
    this.TblHFirstUnit.TbldFirstUnitCo = [new TbldFirstUnitCo()]
    this.router.navigate(['l-master/unit-master']);

  }



  // ---------------------------------------------------------------------List--------------------------
  displayUnitList() {
    this.showUnitList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.unitmaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HFirstUnit_Base_Unit || item.HFirstUnit_Unit_Frac || item.HFirstUnit_SysID;
      const matchesQuery =
        (item.HFirstUnit_Base_Unit || '').toLowerCase().includes(query) ||
        (item.HFirstUnit_Unit_Frac || '').toLowerCase().includes(query) ||
        item.HFirstUnit_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showUnitList = false
    this.router.navigate(['l-master/unit-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/unit-master/' + rowData.HFirstUnit_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.unitmaster, rowData.HFirstUnit_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showUnitList = false

            this.getListData()
          }

        });
      }
    });
  }


}
