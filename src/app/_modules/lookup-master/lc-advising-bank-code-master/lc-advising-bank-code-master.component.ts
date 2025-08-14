import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldLCAdvBankCo } from 'src/app/_dto/TbldLCAdvBankCo.dto';
import { TblHLCAdvBank } from 'src/app/_dto/TblHLCAdvBank.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-lc-advising-bank-code-master',
  templateUrl: './lc-advising-bank-code-master.component.html',
  styleUrls: ['./lc-advising-bank-code-master.component.scss']
})
export class LcAdvisingBankCodeMasterComponent implements OnInit {

TblHLCAdvBank: TblHLCAdvBank = new TblHLCAdvBank()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  Showadvisinglist: boolean = false

  tableIndex: any;

  HLCAdvBank_SysID: any;

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
    this.TblHLCAdvBank.TbldLCAdvBankCo = [new TbldLCAdvBankCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HLCAdvBank_SysID = Number(id);
        this.TblHLCAdvBank.HLCAdvBank_SysID = Number(id);
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
        const isExist = this.TblHLCAdvBank.TbldLCAdvBankCo.some(item => item.DcLCAdvBank_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for LC Advising Bank Code Master' });
          return;
        }
        this.TblHLCAdvBank.TbldLCAdvBankCo[this.tableIndex].DcLCAdvBank_SingleCo_SysID = event.sysId
        this.TblHLCAdvBank.TbldLCAdvBankCo[this.tableIndex].DcLCAdvBank_SingleCo_Code = event.code
        this.TblHLCAdvBank.TbldLCAdvBankCo[this.tableIndex].DcLCAdvBank_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHLCAdvBank.HLCAdvBank_AcDe_Code = event.code
        this.TblHLCAdvBank.HLCAdvBank_AcDe_Name = event.name
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


        if (this.TblHLCAdvBank.HLCAdvBank_SysID && rowData.DcLCAdvBank_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.applicableDate, `company?where[DcLCAdvBank_SysID]=${this.TblHLCAdvBank.TbldLCAdvBankCo[0].DcLCAdvBank_SysID}&where[DcLCAdvBank_SingleCo_SysID]=${rowData.DcLCAdvBank_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldLCAdvBankCo') {
                this.TblHLCAdvBank.TbldLCAdvBankCo.splice(index, 1);
                if (this.TblHLCAdvBank.TbldLCAdvBankCo.length === 0) {
                  this.addRow('TbldLCAdvBankCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldLCAdvBankCo') {
            this.TblHLCAdvBank.TbldLCAdvBankCo.splice(index, 1);
            if (this.TblHLCAdvBank.TbldLCAdvBankCo.length === 0) {
              this.addRow('TbldLCAdvBankCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldLCAdvBankCo') {
      const newRow = new TbldLCAdvBankCo()
      this.TblHLCAdvBank.TbldLCAdvBankCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHLCAdvBank.HLCAdvBank_Code == null || this.TblHLCAdvBank.HLCAdvBank_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Advising Bank Code Code Cannot Be Null' });
      return false;
    }

    if (this.TblHLCAdvBank.HLCAdvBank_Name == null || this.TblHLCAdvBank.HLCAdvBank_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Advising Bank Code Name Cannot Be Null' });
      return false;
    }

    if (this.TblHLCAdvBank.TbldLCAdvBankCo[0].DcLCAdvBank_SingleCo_Code == null || this.TblHLCAdvBank.TbldLCAdvBankCo[0].DcLCAdvBank_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'LC Advising Bank Code Single Company Code Cannot Be Null' });
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
    this.TblHLCAdvBank.TbldLCAdvBankCo = this.TblHLCAdvBank.TbldLCAdvBankCo.filter(
      row => row.DcLCAdvBank_SingleCo_Code && row.DcLCAdvBank_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.applicableDate, this.TblHLCAdvBank).then((res) => {
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
        this.TblHLCAdvBank = new TblHLCAdvBank();
        this.TblHLCAdvBank.TbldLCAdvBankCo = [new TbldLCAdvBankCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/lc-advising-bank-code/']);

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
    if (this.TblHLCAdvBank.HLCAdvBank_SysID || this.HLCAdvBank_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.applicableDate, this.TblHLCAdvBank.HLCAdvBank_SysID).then((res) => {
        this.TblHLCAdvBank = res
        this.showDeleteButton = true;

        if (this.TblHLCAdvBank.TbldLCAdvBankCo.length == 0) {
          this.TblHLCAdvBank.TbldLCAdvBankCo = [new TbldLCAdvBankCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHLCAdvBank = new TblHLCAdvBank()
          this.TblHLCAdvBank.TbldLCAdvBankCo = [new TbldLCAdvBankCo()]
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
        this.masterService.deleteData(apiUrl.applicableDate, this.TblHLCAdvBank.HLCAdvBank_SysID).then((res) => {

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
    this.TblHLCAdvBank = new TblHLCAdvBank()
    this.TblHLCAdvBank.TbldLCAdvBankCo = [new TbldLCAdvBankCo()]
    this.router.navigate(['l-master/lc-advising-bank-code/']);

  }
  cancel() {
    this.TblHLCAdvBank = new TblHLCAdvBank()
    this.TblHLCAdvBank.TbldLCAdvBankCo = [new TbldLCAdvBankCo()]
    this.router.navigate(['l-master/lc-advising-bank-code']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayLCadvisingList() {
    this.Showadvisinglist = true
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
      const hasData = item.HLCAdvBank_Code || item.HLCAdvBank_Name || item.HLCAdvBank_SysID;
      const matchesQuery =
        (item.HLCAdvBank_Code || '').toLowerCase().includes(query) ||
        (item.HLCAdvBank_Name || '').toLowerCase().includes(query) ||
        item.HLCAdvBank_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.Showadvisinglist = false
    this.router.navigate(['l-master/lc-advising-bank-code']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/lc-advising-bank-code/' + rowData.HLCAdvBank_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.applicableDate, rowData.HLCAdvBank_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.Showadvisinglist = false

            this.getListData()
          }

        });
      }
    });
  }

}
