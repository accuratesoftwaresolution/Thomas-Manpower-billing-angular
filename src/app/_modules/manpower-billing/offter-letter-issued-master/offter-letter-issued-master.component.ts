import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPOffLetterCo } from 'src/app/_dto/offer-letter-issued-master/TbldPOffLetterCo.dto';
import { TblHPOffLetter } from 'src/app/_dto/offer-letter-issued-master/TblHPOffLetter.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-offter-letter-issued-master',
  templateUrl: './offter-letter-issued-master.component.html',
  styleUrls: ['./offter-letter-issued-master.component.scss']
})
export class OffterLetterIssuedMasterComponent implements OnInit {
 showListButton: boolean = true;

  TblHPOffLetter: TblHPOffLetter = new TblHPOffLetter()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPOffLetter_SysID: any;

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
    this.TblHPOffLetter.TbldPOffLetterCo = [new TbldPOffLetterCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPOffLetter_SysID = Number(id);
        this.TblHPOffLetter.HPOffLetter_SysID = Number(id);
        this.getdata()
      }
    });
    this.getlovdata()
  }
  getlovdata() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activatedeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCompany).then((res) => {
      this.singleCompany = res
    })
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCompany;
        break;
      case 'AccDirectExpCode':
        break;
      default:
        break;
      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activatedeactivate;
        break;
    }
    this.popUpService.selectedPopUp = Type

    this.lookupService.openDialog(Type, Type);
  }

  selectedItem(event: any) {

    let Type = this.popUpService.selectedPopUp

    switch (Type) {


      case 'ApplicableCompanyCode':
        const selectedCode = event.SingleCo_Code;
        const isExist = this.TblHPOffLetter.TbldPOffLetterCo.some(item => item.DcpOffLetter_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Offer Letter Issued Master' });
          return;
        }
        this.TblHPOffLetter.TbldPOffLetterCo[this.tableIndex].DcpOffLetter_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPOffLetter.TbldPOffLetterCo[this.tableIndex].DcpOffLetter_SingleCo_Code = event.SingleCo_Code;
        this.TblHPOffLetter.TbldPOffLetterCo[this.tableIndex].DcpOffLetter_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPOffLetter.HPOffLetter_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPOffLetter.HPOffLetter_AcDe_Code = event.HActDeactive_Code
        this.TblHPOffLetter.HPOffLetter_AcDe_Name = event.HActDeactive_Name
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
        this.showListButton = true;

        if (this.TblHPOffLetter.HPOffLetter_SysID && rowData.DcpOffLetter_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.offerLetterIssued, `company?where[DcpOffLetter_GridSysID]=${this.TblHPOffLetter.TbldPOffLetterCo[0].DcpOffLetter_GridSysID}&where[DcpOffLetter_SingleCo_SysID]=${rowData.DcpOffLetter_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPOffLetterCo') {
                this.TblHPOffLetter.TbldPOffLetterCo.splice(index, 1);
                if (this.TblHPOffLetter.TbldPOffLetterCo.length === 0) {
                  this.addRow('TbldPOffLetterCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPOffLetterCo') {
            this.TblHPOffLetter.TbldPOffLetterCo.splice(index, 1);
            if (this.TblHPOffLetter.TbldPOffLetterCo.length === 0) {
              this.addRow('TbldPOffLetterCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPOffLetterCo') {
      const newRow = new TbldPOffLetterCo()
      this.TblHPOffLetter.TbldPOffLetterCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPOffLetter.HPOffLetter_Code == null || this.TblHPOffLetter.HPOffLetter_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Offer Letter Issued Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPOffLetter.HPOffLetter_Name == null || this.TblHPOffLetter.HPOffLetter_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Offer Letter Issued Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPOffLetter.TbldPOffLetterCo[0].DcpOffLetter_SingleCo_Code == null || this.TblHPOffLetter.TbldPOffLetterCo[0].DcpOffLetter_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Offer Letter Issued Master Single Company Code Cannot Be Null' });
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
    this.TblHPOffLetter.TbldPOffLetterCo = this.TblHPOffLetter.TbldPOffLetterCo.filter(
      row => row.DcpOffLetter_SingleCo_Code && row.DcpOffLetter_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.offerLetterIssued, this.TblHPOffLetter).then((res) => {
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

        this.showListButton = true;

        // Reset form
        this.TblHPOffLetter = new TblHPOffLetter();
        this.TblHPOffLetter.TbldPOffLetterCo = [new TbldPOffLetterCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/offer-letter-issued/']);

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
    if (this.TblHPOffLetter.HPOffLetter_SysID || this.HPOffLetter_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.offerLetterIssued, this.TblHPOffLetter.HPOffLetter_SysID).then((res) => {
        this.TblHPOffLetter = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPOffLetter.TbldPOffLetterCo.length == 0) {
          this.TblHPOffLetter.TbldPOffLetterCo = [new TbldPOffLetterCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPOffLetter = new TblHPOffLetter()
          this.TblHPOffLetter.TbldPOffLetterCo = [new TbldPOffLetterCo()]
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
        this.masterService.deleteData(apiUrl.offerLetterIssued, this.TblHPOffLetter.HPOffLetter_SysID).then((res) => {

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
    this.TblHPOffLetter = new TblHPOffLetter()
    this.TblHPOffLetter.TbldPOffLetterCo = [new TbldPOffLetterCo()]
    this.router.navigate(['Manpower/offer-letter-issued/']);

  }
  cancel() {
    this.TblHPOffLetter = new TblHPOffLetter()
    this.TblHPOffLetter.TbldPOffLetterCo = [new TbldPOffLetterCo()]
    this.router.navigate(['Manpower/offer-letter-issued']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.offerLetterIssued).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPOffLetter_Code || item.HPOffLetter_Name || item.HPOffLetter_SysID;
      const matchesQuery =
        (item.HPOffLetter_Code || '').toLowerCase().includes(query) ||
        (item.HPOffLetter_Name || '').toLowerCase().includes(query) ||
        item.HPOffLetter_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/offer-letter-issued']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/offer-letter-issued/' + rowData.HPOffLetter_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.offerLetterIssued, rowData.HPOffLetter_SysID).then((res) => {

          if (res.success == false) {
            this.showListButton = true;
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });

            this.showListButton = true;

            this.getListData()
          }

        });
      }
    });
  }
}
function getlovdata() {
  throw new Error('Function not implemented.');
}
