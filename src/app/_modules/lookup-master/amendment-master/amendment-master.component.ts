import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldAmendCoDto } from 'src/app/_dto/masters/tbldAmendCo.dto';
import { TblHAmendDto } from 'src/app/_dto/masters/tblhAmend.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-amendment-master',
  templateUrl: './amendment-master.component.html',
  styleUrls: ['./amendment-master.component.scss']
})
export class AmendmentMasterComponent implements OnInit {

  TblHAmendDto: TblHAmendDto = new TblHAmendDto()

  tableIndex: any;

  HAmend_SysID: any;

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showamendmentList: boolean = false

  showDeleteButton: boolean = false;
  isSaving: any;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHAmendDto.tbldAmendCo = [new TbldAmendCoDto()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HAmend_SysID = Number(id);
        this.TblHAmendDto.HAmend_SysID = Number(id);
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
        const isExist = this.TblHAmendDto.tbldAmendCo.some(item => item.DcAmend_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for amendment Master' });
          return;
        }
        this.TblHAmendDto.tbldAmendCo[this.tableIndex].DcAmend_SingleCo_SysID = event.sysId
        this.TblHAmendDto.tbldAmendCo[this.tableIndex].DcAmend_SingleCo_Code = event.code
        this.TblHAmendDto.tbldAmendCo[this.tableIndex].DcAmend_SingleCo_Name = event.name;

        break;


      case 'ActAndDeactCode':
        this.TblHAmendDto.HAmend_AcDe_SysID = event.sysId
        this.TblHAmendDto.HAmend_AcDe_Code = event.code
        this.TblHAmendDto.HAmend_AcDe_Name = event.name
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


        if (this.TblHAmendDto.HAmend_SysID && rowData.DcAmend_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.amendment, `company?where[DcAmend_SysID]=${this.TblHAmendDto.tbldAmendCo[0].DcAmend_SysID}&where[DcAmend_SingleCo_SysID]=${rowData.DcAmend_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'tbldAmendCo') {
                this.TblHAmendDto.tbldAmendCo.splice(index, 1);
                if (this.TblHAmendDto.tbldAmendCo.length === 0) {
                  this.addRow('tbldAmendCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'tbldAmendCo') {
            this.TblHAmendDto.tbldAmendCo.splice(index, 1);
            if (this.TblHAmendDto.tbldAmendCo.length === 0) {
              this.addRow('tbldAmendCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'tbldAmendCo') {
      const newRow = new TbldAmendCoDto()
      this.TblHAmendDto.tbldAmendCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHAmendDto.HAmend_Code == null || this.TblHAmendDto.HAmend_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Amendment Code Cannot Be Null' });
      return false;
    }

    if (this.TblHAmendDto.HAmend_Name == null || this.TblHAmendDto.HAmend_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Amendment Name Cannot Be Null' });
      return false;
    }

    return true;
  }


  save() {
    if (!this.preSave()) {
      return;
    }
    this.TblHAmendDto.tbldAmendCo = this.TblHAmendDto.tbldAmendCo.filter(
      row => row.DcAmend_SingleCo_Code && row.DcAmend_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.amendment, this.TblHAmendDto).then((res) => {
      if (res.success == false && !res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

      } else if (res.success == false && res.error) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: res.error.message });
      }
      else {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.TblHAmendDto = new TblHAmendDto()
        this.TblHAmendDto.tbldAmendCo = [new TbldAmendCoDto()]
        this.router.navigate(['l-master/amendment-master']);


      }
    })
  }

  funcSearch() {
    this.getdata()
  }


  getdata() {
    if (this.TblHAmendDto.HAmend_SysID || this.HAmend_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.amendment, this.TblHAmendDto.HAmend_SysID).then((res) => {
        this.TblHAmendDto = res
        this.showDeleteButton = true;

        if (this.TblHAmendDto.tbldAmendCo.length == 0) {
          this.TblHAmendDto.tbldAmendCo = [new TbldAmendCoDto()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHAmendDto = new TblHAmendDto()
          this.TblHAmendDto.tbldAmendCo = [new TbldAmendCoDto()]
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
        this.masterService.deleteData(apiUrl.amendment, this.TblHAmendDto.HAmend_SysID).then((res) => {

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
    this.TblHAmendDto = new TblHAmendDto()
    this.TblHAmendDto.tbldAmendCo = [new TbldAmendCoDto()]
    this.router.navigate(['l-master/amendment-master/']);

  }
  cancel() {
    this.TblHAmendDto = new TblHAmendDto()
    this.TblHAmendDto.tbldAmendCo = [new TbldAmendCoDto()]
    this.router.navigate(['l-master/amendment-master/']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayamendmentList() {
    this.showamendmentList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.amendment).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HAmend_Code || item.HAmend_Name || item.HAmend_SysID;
      const matchesQuery =
        (item.HAmend_Code || '').toLowerCase().includes(query) ||
        (item.HAmend_Name || '').toLowerCase().includes(query) ||
        item.HAmend_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showamendmentList = false
    this.router.navigate(['l-master/amendment-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/amendment-master/' + rowData.HAmend_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.amendment, rowData.HAmend_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showamendmentList = false

            this.getListData()
          }

        });
      }
    });
  }


}
