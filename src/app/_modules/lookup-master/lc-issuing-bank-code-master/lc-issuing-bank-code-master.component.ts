import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldLCIssuBankCo } from 'src/app/_dto/TbldLCIssuBankCo.dto';
import { TblHLCIssuBank } from 'src/app/_dto/TblHLCIssuBank.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-lc-issuing-bank-code-master',
  templateUrl: './lc-issuing-bank-code-master.component.html',
  styleUrls: ['./lc-issuing-bank-code-master.component.scss']
})
export class LcIssuingBankCodeMasterComponent implements OnInit {
TblHLCIssuBank: TblHLCIssuBank = new TblHLCIssuBank()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showlcissuinglist: boolean = false

  tableIndex: any;

  HLCIssuBank_SysID: any;

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
    this.TblHLCIssuBank.TbldLCIssuBankCo = [new TbldLCIssuBankCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HLCIssuBank_SysID = Number(id);
        this.TblHLCIssuBank.HLCIssuBank_SysID = Number(id);
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
        const isExist = this.TblHLCIssuBank.TbldLCIssuBankCo.some(item => item.DcLCIssuBank_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for LC Issuing Bank Code Master' });
          return;
        }
        this.TblHLCIssuBank.TbldLCIssuBankCo[this.tableIndex].DcLCIssuBank_SingleCo_SysID = event.sysId
        this.TblHLCIssuBank.TbldLCIssuBankCo[this.tableIndex].DcLCIssuBank_SingleCo_Code = event.code
        this.TblHLCIssuBank.TbldLCIssuBankCo[this.tableIndex].DcLCIssuBank_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHLCIssuBank.HLCIssuBank_AcDe_Code = event.code
        this.TblHLCIssuBank.HLCIssuBank_AcDe_Name = event.name
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


        if (this.TblHLCIssuBank.HLCIssuBank_SysID && rowData.DcLCIssuBank_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.applicableDate, `company?where[DcLCIssuBank_SysID]=${this.TblHLCIssuBank.TbldLCIssuBankCo[0].DcLCIssuBank_SysID}&where[DcLCIssuBank_SingleCo_SysID]=${rowData.DcLCIssuBank_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldLCIssuBankCo') {
                this.TblHLCIssuBank.TbldLCIssuBankCo.splice(index, 1);
                if (this.TblHLCIssuBank.TbldLCIssuBankCo.length === 0) {
                  this.addRow('TbldLCIssuBankCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldLCIssuBankCo') {
            this.TblHLCIssuBank.TbldLCIssuBankCo.splice(index, 1);
            if (this.TblHLCIssuBank.TbldLCIssuBankCo.length === 0) {
              this.addRow('TbldLCIssuBankCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldLCIssuBankCo') {
      const newRow = new TbldLCIssuBankCo()
      this.TblHLCIssuBank.TbldLCIssuBankCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHLCIssuBank.HLCIssuBank_Code == null || this.TblHLCIssuBank.HLCIssuBank_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Issuing Bank Code Code Cannot Be Null' });
      return false;
    }

    if (this.TblHLCIssuBank.HLCIssuBank_Name == null || this.TblHLCIssuBank.HLCIssuBank_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Issuing Bank Code Name Cannot Be Null' });
      return false;
    }

    if (this.TblHLCIssuBank.TbldLCIssuBankCo[0].DcLCIssuBank_SingleCo_Code == null || this.TblHLCIssuBank.TbldLCIssuBankCo[0].DcLCIssuBank_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Issuing Bank Code Single Company Code Cannot Be Null' });
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
    this.TblHLCIssuBank.TbldLCIssuBankCo = this.TblHLCIssuBank.TbldLCIssuBankCo.filter(
      row => row.DcLCIssuBank_SingleCo_Code && row.DcLCIssuBank_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.applicableDate, this.TblHLCIssuBank).then((res) => {
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
        this.TblHLCIssuBank = new TblHLCIssuBank();
        this.TblHLCIssuBank.TbldLCIssuBankCo = [new TbldLCIssuBankCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/lc-issuing-bank-code/']);

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
    if (this.TblHLCIssuBank.HLCIssuBank_SysID || this.HLCIssuBank_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.applicableDate, this.TblHLCIssuBank.HLCIssuBank_SysID).then((res) => {
        this.TblHLCIssuBank = res
        this.showDeleteButton = true;

        if (this.TblHLCIssuBank.TbldLCIssuBankCo.length == 0) {
          this.TblHLCIssuBank.TbldLCIssuBankCo = [new TbldLCIssuBankCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHLCIssuBank = new TblHLCIssuBank()
          this.TblHLCIssuBank.TbldLCIssuBankCo = [new TbldLCIssuBankCo()]
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
        this.masterService.deleteData(apiUrl.applicableDate, this.TblHLCIssuBank.HLCIssuBank_SysID).then((res) => {

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
    this.TblHLCIssuBank = new TblHLCIssuBank()
    this.TblHLCIssuBank.TbldLCIssuBankCo = [new TbldLCIssuBankCo()]
    this.router.navigate(['l-master/lc-issuing-bank-code/']);

  }
  cancel() {
    this.TblHLCIssuBank = new TblHLCIssuBank()
    this.TblHLCIssuBank.TbldLCIssuBankCo = [new TbldLCIssuBankCo()]
    this.router.navigate(['l-master/lc-issuing-bank-code']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayLCIssuingList() {
    this.showlcissuinglist = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.applicableDate).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HLCIssuBank_Code || item.HLCIssuBank_Name || item.HLCIssuBank_SysID;
      const matchesQuery =
        (item.HLCIssuBank_Code || '').toLowerCase().includes(query) ||
        (item.HLCIssuBank_Name || '').toLowerCase().includes(query) ||
        item.HLCIssuBank_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showlcissuinglist = false
    this.router.navigate(['l-master/lc-issuing-bank-code']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/lc-issuing-bank-code/' + rowData.HLCIssuBank_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.applicableDate, rowData.HLCIssuBank_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showlcissuinglist = false

            this.getListData()
          }

        });
      }
    });
  }
}
