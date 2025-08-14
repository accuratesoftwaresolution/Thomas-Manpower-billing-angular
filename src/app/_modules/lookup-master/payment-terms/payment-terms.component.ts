import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblHPayTerm } from 'src/app/_dto/masters/tblHPayTerm.dto';
import { TbldPayTermCo } from 'src/app/_dto/TbldPayTermCo.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-payment-terms',
  templateUrl: './payment-terms.component.html',
  styleUrls: ['./payment-terms.component.scss']
})
export class PaymentTermsComponent implements OnInit {

  activatedeactivate:any;
  singleCompany: any;

  TblHPayTerm: TblHPayTerm = new TblHPayTerm()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showPaymentTermsList: boolean = false

  tableIndex: any;

  HPayTerm_SysID: any;

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
    this.TblHPayTerm.TbldPayTermCo = [new TbldPayTermCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPayTerm_SysID = Number(id);
        this.TblHPayTerm.HPayTerm_SysID = Number(id);
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
        this.popUpService.popUpData = this.singleCompany
        break;
      case 'AccDirectExpCode':
        break;
        case 'ActAndDeactCode':
          this.popUpService.popUpData = this.activatedeactivate
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

        const selectedCode = event.SingleCo_Code
        const isExist = this.TblHPayTerm.TbldPayTermCo.some(item => item.DcPayTerm_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Payment terms Master' });
          return;
        }
        this.TblHPayTerm.TbldPayTermCo[this.tableIndex].DcPayTerm_SingleCo_SysID = event.SingleCo_SysID
        this.TblHPayTerm.TbldPayTermCo[this.tableIndex].DcPayTerm_SingleCo_Code = event.SingleCo_Code
        this.TblHPayTerm.TbldPayTermCo[this.tableIndex].DcPayTerm_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHPayTerm.HPayTerm_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPayTerm.HPayTerm_AcDe_Code = event.HActDeactive_Code
        this.TblHPayTerm.HPayTerm_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHPayTerm.HPayTerm_SysID && rowData.DcPayTerm_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.paymentTermsMaster, `company?where[DcPayTerm_SysID]=${this.TblHPayTerm.TbldPayTermCo[0].DcPayTerm_SysID}&where[DcPayTerm_SingleCo_SysID]=${rowData.DcPayTerm_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldPayTermCo') {
                this.TblHPayTerm.TbldPayTermCo.splice(index, 1);
                if (this.TblHPayTerm.TbldPayTermCo.length === 0) {
                  this.addRow('TbldPayTermCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPayTermCo') {
            this.TblHPayTerm.TbldPayTermCo.splice(index, 1);
            if (this.TblHPayTerm.TbldPayTermCo.length === 0) {
              this.addRow('TbldPayTermCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPayTermCo') {
      const newRow = new TbldPayTermCo()
      this.TblHPayTerm.TbldPayTermCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPayTerm.HPayTerm_Code == null || this.TblHPayTerm.HPayTerm_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payment Terms Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPayTerm.HPayTerm_Name == null || this.TblHPayTerm.HPayTerm_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payment Terms Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPayTerm.TbldPayTermCo[0].DcPayTerm_SingleCo_Code == null || this.TblHPayTerm.TbldPayTermCo[0].DcPayTerm_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Payment Terms Single Company Code Cannot Be Null' });
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
    this.TblHPayTerm.TbldPayTermCo = this.TblHPayTerm.TbldPayTermCo.filter(
      row => row.DcPayTerm_SingleCo_Code !== undefined &&
        String(row.DcPayTerm_SingleCo_Code).trim() !== ''
    );


    this.masterService.saveMasterData(apiUrl.paymentTermsMaster, this.TblHPayTerm).then((res) => {
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
        this.TblHPayTerm = new TblHPayTerm();
        this.TblHPayTerm.TbldPayTermCo = [new TbldPayTermCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/payment-terms/']);

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
    if (this.TblHPayTerm.HPayTerm_SysID || this.HPayTerm_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.paymentTermsMaster, this.TblHPayTerm.HPayTerm_SysID).then((res) => {
        this.TblHPayTerm = res
        this.showDeleteButton = true;

        if (this.TblHPayTerm.TbldPayTermCo.length == 0) {
          this.TblHPayTerm.TbldPayTermCo = [new TbldPayTermCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPayTerm = new TblHPayTerm()
          this.TblHPayTerm.TbldPayTermCo = [new TbldPayTermCo()]
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
        this.masterService.deleteData(apiUrl.paymentTermsMaster, this.TblHPayTerm.HPayTerm_SysID).then((res) => {

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
    this.TblHPayTerm = new TblHPayTerm()
    this.TblHPayTerm.TbldPayTermCo = [new TbldPayTermCo()]
    this.router.navigate(['l-master/payment-terms/']);

  }
  cancel() {
    this.TblHPayTerm = new TblHPayTerm()
    this.TblHPayTerm.TbldPayTermCo = [new TbldPayTermCo()]
    this.router.navigate(['l-master/payment-terms']);


  }

  // ---------------------------------------------------------------------List--------------------------
  displayPaymentTermsList() {
    this.showPaymentTermsList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.paymentTermsMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPayTerm_Code || item.HPayTerm_Name || item.HPayTerm_SysID;
      const matchesQuery =
        (item.HPayTerm_Code || '').toLowerCase().includes(query) ||
        (item.HPayTerm_Name || '').toLowerCase().includes(query) ||
        item.HPayTerm_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showPaymentTermsList = false
    this.router.navigate(['l-master/payment-terms']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/payment-terms/' + rowData.HPayTerm_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.paymentTermsMaster, rowData.HPayTerm_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showPaymentTermsList = false

            this.getListData()
          }

        });
      }
    });
  }

}



