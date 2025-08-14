import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldLCNegBankCo } from 'src/app/_dto/TbldLCNegBankCo.dto';
import { TblHLCNegBank } from 'src/app/_dto/TblHLCNegBank.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-lc-negotiating-bank-code-master',
  templateUrl: './lc-negotiating-bank-code-master.component.html',
  styleUrls: ['./lc-negotiating-bank-code-master.component.scss']
})
export class LcNegotiatingBankCodeMasterComponent implements OnInit {

 TblHLCNegBank: TblHLCNegBank = new TblHLCNegBank()

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  Showlcnegotiatinglist: boolean = false

  tableIndex: any;

  HLCNegBank_SysID: any;

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
    this.TblHLCNegBank.TbldLCNegBankCo = [new TbldLCNegBankCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HLCNegBank_SysID = Number(id);
        this.TblHLCNegBank.HLCNegBank_SysID = Number(id);
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
        const isExist = this.TblHLCNegBank.TbldLCNegBankCo.some(item => item.DcLCNegBank_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for LC Negotiating Bank Master' });
          return;
        }
        this.TblHLCNegBank.TbldLCNegBankCo[this.tableIndex].DcLCNegBank_SingleCo_SysID = event.sysId
        this.TblHLCNegBank.TbldLCNegBankCo[this.tableIndex].DcLCNegBank_SingleCo_Code = event.code
        this.TblHLCNegBank.TbldLCNegBankCo[this.tableIndex].DcLCNegBank_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHLCNegBank.HLCNegBank_AcDe_Code = event.code
        this.TblHLCNegBank.HLCNegBank_AcDe_Name = event.name
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


        if (this.TblHLCNegBank.HLCNegBank_SysID && rowData.DcLCNegBank_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.applicableDate, `company?where[DcLCNegBank_Master_SysID]=${this.TblHLCNegBank.TbldLCNegBankCo[0].DcLCNegBank_Master_SysID}&where[DcLCNegBank_SingleCo_SysID]=${rowData.DcLCNegBank_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldLCNegBankCo') {
                this.TblHLCNegBank.TbldLCNegBankCo.splice(index, 1);
                if (this.TblHLCNegBank.TbldLCNegBankCo.length === 0) {
                  this.addRow('TbldLCNegBankCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldLCNegBankCo') {
            this.TblHLCNegBank.TbldLCNegBankCo.splice(index, 1);
            if (this.TblHLCNegBank.TbldLCNegBankCo.length === 0) {
              this.addRow('TbldLCNegBankCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldLCNegBankCo') {
      const newRow = new TbldLCNegBankCo()
      this.TblHLCNegBank.TbldLCNegBankCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHLCNegBank.HLCNegBank_Code == null || this.TblHLCNegBank.HLCNegBank_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Negotiating Bank Code Cannot Be Null' });
      return false;
    }

    if (this.TblHLCNegBank.HLCNegBank_Name == null || this.TblHLCNegBank.HLCNegBank_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Negotiating Bank Name Cannot Be Null' });
      return false;
    }

    if (this.TblHLCNegBank.TbldLCNegBankCo[0].DcLCNegBank_SingleCo_Code == null || this.TblHLCNegBank.TbldLCNegBankCo[0].DcLCNegBank_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Negotiating Bank Single Company Code Cannot Be Null' });
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
    this.TblHLCNegBank.TbldLCNegBankCo = this.TblHLCNegBank.TbldLCNegBankCo.filter(
      row => row.DcLCNegBank_SingleCo_Code && row.DcLCNegBank_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.applicableDate, this.TblHLCNegBank).then((res) => {
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
        this.TblHLCNegBank = new TblHLCNegBank();
        this.TblHLCNegBank.TbldLCNegBankCo = [new TbldLCNegBankCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/lc-negotiating-bank-code/']);

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
    if (this.TblHLCNegBank.HLCNegBank_SysID || this.HLCNegBank_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.applicableDate, this.TblHLCNegBank.HLCNegBank_SysID).then((res) => {
        this.TblHLCNegBank = res
        this.showDeleteButton = true;

        if (this.TblHLCNegBank.TbldLCNegBankCo.length == 0) {
          this.TblHLCNegBank.TbldLCNegBankCo = [new TbldLCNegBankCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHLCNegBank = new TblHLCNegBank()
          this.TblHLCNegBank.TbldLCNegBankCo = [new TbldLCNegBankCo()]
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
        this.masterService.deleteData(apiUrl.applicableDate, this.TblHLCNegBank.HLCNegBank_SysID).then((res) => {

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
    this.TblHLCNegBank = new TblHLCNegBank()
    this.TblHLCNegBank.TbldLCNegBankCo = [new TbldLCNegBankCo()]
    this.router.navigate(['l-master/lc-negotiating-bank-code/']);

  }
  cancel() {
    this.TblHLCNegBank = new TblHLCNegBank()
    this.TblHLCNegBank.TbldLCNegBankCo = [new TbldLCNegBankCo()]
    this.router.navigate(['l-master/lc-negotiating-bank-code']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayLCnegotiatingList() {
    this.Showlcnegotiatinglist = true
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
      const hasData = item.HLCNegBank_Code || item.HLCNegBank_Name || item.HLCNegBank_SysID;
      const matchesQuery =
        (item.HLCNegBank_Code || '').toLowerCase().includes(query) ||
        (item.HLCNegBank_Name || '').toLowerCase().includes(query) ||
        item.HLCNegBank_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.Showlcnegotiatinglist = false
    this.router.navigate(['l-master/lc-negotiating-bank-code']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/lc-negotiating-bank-code/' + rowData.HLCNegBank_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.applicableDate, rowData.HLCNegBank_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Showlcnegotiatinglist = false

            this.getListData()
          }

        });
      }
    });
  }
}
