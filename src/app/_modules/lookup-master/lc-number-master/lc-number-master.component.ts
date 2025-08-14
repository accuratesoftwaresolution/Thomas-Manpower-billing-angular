import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldLCNoCo } from 'src/app/_dto/TbldLCNoCo.dto';
import { TblHLCNo } from 'src/app/_dto/TblHLCNo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-lc-number-master',
  templateUrl: './lc-number-master.component.html',
  styleUrls: ['./lc-number-master.component.scss']
})
export class LcNumberMasterComponent implements OnInit {
TblHLCNo: TblHLCNo = new TblHLCNo()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  Showlcnumberlist: boolean = false

  tableIndex: any;

  HLCNo_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHLCNo.TbldLCNoCo = [new TbldLCNoCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HLCNo_SysID = Number(id);
        this.TblHLCNo.HLCNo_SysID = Number(id);
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
        const isExist = this.TblHLCNo.TbldLCNoCo.some(item => item.DcLCNo_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for LC Number Master' });
          return;
        }
        this.TblHLCNo.TbldLCNoCo[this.tableIndex].DcLCNo_SingleCo_SysID = event.sysId
        this.TblHLCNo.TbldLCNoCo[this.tableIndex].DcLCNo_SingleCo_Code = event.code
        this.TblHLCNo.TbldLCNoCo[this.tableIndex].DcLCNo_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHLCNo.HLCNo_AcDe_SysID = event.sysId
        this.TblHLCNo.HLCNo_AcDe_Code = event.code
        this.TblHLCNo.HLCNo_AcDe_Name = event.name
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


        if (this.TblHLCNo.HLCNo_SysID && rowData.DcLCNo_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.lcNumber, `company?where[DcLCNo_SysID]=${this.TblHLCNo.TbldLCNoCo[0].DcLCNo_SysID}&where[DcLCNo_SingleCo_SysID]=${rowData.DcLCNo_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldLCNoCo') {
                this.TblHLCNo.TbldLCNoCo.splice(index, 1);
                if (this.TblHLCNo.TbldLCNoCo.length === 0) {
                  this.addRow('TbldLCNoCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldLCNoCo') {
            this.TblHLCNo.TbldLCNoCo.splice(index, 1);
            if (this.TblHLCNo.TbldLCNoCo.length === 0) {
              this.addRow('TbldLCNoCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldLCNoCo') {
      const newRow = new TbldLCNoCo()
      this.TblHLCNo.TbldLCNoCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHLCNo.HLCNo_Code == null || this.TblHLCNo.HLCNo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Number Code Cannot Be Null' });
      return false;
    }

    if (this.TblHLCNo.HLCNo_Name == null || this.TblHLCNo.HLCNo_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Number Name Cannot Be Null' });
      return false;
    }

    if (this.TblHLCNo.TbldLCNoCo[0].DcLCNo_SingleCo_Code == null || this.TblHLCNo.TbldLCNoCo[0].DcLCNo_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Number Single Company Code Cannot Be Null' });
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
    this.TblHLCNo.TbldLCNoCo = this.TblHLCNo.TbldLCNoCo.filter(
      row => row.DcLCNo_SingleCo_Code && row.DcLCNo_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.lcNumber, this.TblHLCNo).then((res) => {
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
        this.TblHLCNo = new TblHLCNo();
        this.TblHLCNo.TbldLCNoCo = [new TbldLCNoCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/lc-number-master/']);

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
    if (this.TblHLCNo.HLCNo_SysID || this.HLCNo_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.lcNumber, this.TblHLCNo.HLCNo_SysID).then((res) => {
        this.TblHLCNo = res
        this.showDeleteButton = true;

        if (this.TblHLCNo.TbldLCNoCo.length == 0) {
          this.TblHLCNo.TbldLCNoCo = [new TbldLCNoCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHLCNo = new TblHLCNo()
          this.TblHLCNo.TbldLCNoCo = [new TbldLCNoCo()]
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
        this.masterService.deleteData(apiUrl.lcNumber, this.TblHLCNo.HLCNo_SysID).then((res) => {

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
    this.TblHLCNo = new TblHLCNo()
    this.TblHLCNo.TbldLCNoCo = [new TbldLCNoCo()]
    this.router.navigate(['l-master/lc-number-master/']);

  }
  cancel() {
    this.TblHLCNo = new TblHLCNo()
    this.TblHLCNo.TbldLCNoCo = [new TbldLCNoCo()]
    this.router.navigate(['l-master/lc-number-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayLCnumberList() {
    this.Showlcnumberlist = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.lcNumber).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HLCNo_Code || item.HLCNo_Name || item.HLCNo_SysID;
      const matchesQuery =
        (item.HLCNo_Code || '').toLowerCase().includes(query) ||
        (item.HLCNo_Name || '').toLowerCase().includes(query) ||
        item.HLCNo_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.Showlcnumberlist = false
    this.router.navigate(['l-master/lc-number-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/lc-number-master/' + rowData.HLCNo_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.lcNumber, rowData.HLCNo_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Showlcnumberlist = false

            this.getListData()
          }

        });
      }
    });
  }
}
