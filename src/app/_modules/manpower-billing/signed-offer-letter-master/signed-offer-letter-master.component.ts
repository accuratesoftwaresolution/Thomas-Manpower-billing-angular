import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPSignOffer } from 'src/app/_dto/signed-offer-letter-master/TbldPSignOffer.dto';
import { TblHPSignOffer } from 'src/app/_dto/signed-offer-letter-master/TblHPSignOffer.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-signed-offer-letter-master',
  templateUrl: './signed-offer-letter-master.component.html',
  styleUrls: ['./signed-offer-letter-master.component.scss']
})
export class SignedOfferLetterMasterComponent implements OnInit {

 showListButton: boolean = true;

  TblHPSignOffer: TblHPSignOffer = new TblHPSignOffer()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPSignOffer_SysID: any;

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
    this.TblHPSignOffer.TbldPSignOffer = [new TbldPSignOffer()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPSignOffer_SysID = Number(id);
        this.TblHPSignOffer.HPSignOffer_SysID = Number(id);
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
        const isExist = this.TblHPSignOffer.TbldPSignOffer.some(item => item.DcpSignOffer_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Signed Offer Letter Master' });
          return;
        }
        this.TblHPSignOffer.TbldPSignOffer[this.tableIndex].DcpSignOffer_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPSignOffer.TbldPSignOffer[this.tableIndex].DcpSignOffer_SingleCo_Code = event.SingleCo_Code;
        this.TblHPSignOffer.TbldPSignOffer[this.tableIndex].DcpSignOffer_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPSignOffer.HPSignOffer_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPSignOffer.HPSignOffer_AcDe_Code = event.HActDeactive_Code
        this.TblHPSignOffer.HPSignOffer_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPSignOffer.HPSignOffer_SysID && rowData.DcpSignOffer_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.signedOfferLetter, `company?where[DcpSignOffer_GridSysID]=${this.TblHPSignOffer.TbldPSignOffer[0].DcpSignOffer_GridSysID}&where[DcpSignOffer_SingleCo_SysID]=${rowData.DcpSignOffer_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPSignOffer') {
                this.TblHPSignOffer.TbldPSignOffer.splice(index, 1);
                if (this.TblHPSignOffer.TbldPSignOffer.length === 0) {
                  this.addRow('TbldPSignOffer', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPSignOffer') {
            this.TblHPSignOffer.TbldPSignOffer.splice(index, 1);
            if (this.TblHPSignOffer.TbldPSignOffer.length === 0) {
              this.addRow('TbldPSignOffer', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPSignOffer') {
      const newRow = new TbldPSignOffer()
      this.TblHPSignOffer.TbldPSignOffer.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPSignOffer.HPSignOffer_Code == null || this.TblHPSignOffer.HPSignOffer_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Signed Offer Letter Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPSignOffer.HPSignOffer_Name == null || this.TblHPSignOffer.HPSignOffer_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Signed Offer Letter Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPSignOffer.TbldPSignOffer[0].DcpSignOffer_SingleCo_Code == null || this.TblHPSignOffer.TbldPSignOffer[0].DcpSignOffer_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Signed Offer Letter Master Single Company Code Cannot Be Null' });
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
    this.TblHPSignOffer.TbldPSignOffer = this.TblHPSignOffer.TbldPSignOffer.filter(
      row => row.DcpSignOffer_SingleCo_Code && row.DcpSignOffer_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.signedOfferLetter, this.TblHPSignOffer).then((res) => {
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
        this.TblHPSignOffer = new TblHPSignOffer();
        this.TblHPSignOffer.TbldPSignOffer = [new TbldPSignOffer()];

        // Navigate to list screen
        this.router.navigate(['Manpower/signed-offer-letter/']);

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
    if (this.TblHPSignOffer.HPSignOffer_SysID || this.HPSignOffer_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.signedOfferLetter, this.TblHPSignOffer.HPSignOffer_SysID).then((res) => {
        this.TblHPSignOffer = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPSignOffer.TbldPSignOffer.length == 0) {
          this.TblHPSignOffer.TbldPSignOffer = [new TbldPSignOffer()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPSignOffer = new TblHPSignOffer()
          this.TblHPSignOffer.TbldPSignOffer = [new TbldPSignOffer()]
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
        this.masterService.deleteData(apiUrl.signedOfferLetter, this.TblHPSignOffer.HPSignOffer_SysID).then((res) => {

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
    this.TblHPSignOffer = new TblHPSignOffer()
    this.TblHPSignOffer.TbldPSignOffer = [new TbldPSignOffer()]
    this.router.navigate(['Manpower/signed-offer-letter/']);

  }
  cancel() {
    this.TblHPSignOffer = new TblHPSignOffer()
    this.TblHPSignOffer.TbldPSignOffer = [new TbldPSignOffer()]
    this.router.navigate(['Manpower/signed-offer-letter']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.signedOfferLetter).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPSignOffer_Code || item.HPSignOffer_Name || item.HPSignOffer_SysID;
      const matchesQuery =
        (item.HPSignOffer_Code || '').toLowerCase().includes(query) ||
        (item.HPSignOffer_Name || '').toLowerCase().includes(query) ||
        item.HPSignOffer_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/signed-offer-letter']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/signed-offer-letter/' + rowData.HPSignOffer_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.signedOfferLetter, rowData.HPSignOffer_SysID).then((res) => {

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
