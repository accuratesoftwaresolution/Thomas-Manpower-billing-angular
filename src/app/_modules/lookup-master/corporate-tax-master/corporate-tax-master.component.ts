import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldCorpTaxCo } from 'src/app/_dto/TbldCorpTaxCo.dto';
import { TblHCorpTax } from 'src/app/_dto/TblHCorpTax.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-corporate-tax-master',
  templateUrl: './corporate-tax-master.component.html',
  styleUrls: ['./corporate-tax-master.component.scss']
})
export class CorporateTaxMasterComponent implements OnInit {

  TblHCorpTax: TblHCorpTax = new TblHCorpTax()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showCorporateTaxList: boolean = false

  tableIndex: any;

  HCorpTax_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  activateAndDeactivate: any;
  singleCoMaster: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHCorpTax.TbldCorpTaxCo = [new TbldCorpTaxCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HCorpTax_SysID = Number(id);
        this.TblHCorpTax.HCorpTax_SysID = Number(id);
        this.getdata()
      }
    });
  this.getLovData()
  }

  getLovData() {
    this.masterService.getMasterData(apiUrl.activateAndDeactivate).then((res) => {
      this.activateAndDeactivate = res
    })
    this.masterService.getMasterData(apiUrl.singleCoMaster).then((res) => {
      this.singleCoMaster = res
    })
  }

  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ActAndDeactCode':
        this.popUpService.popUpData = this.activateAndDeactivate;
        break;
      case 'ApplicableCompanyCode':
        this.popUpService.popUpData = this.singleCoMaster;
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

        const selectedCode = event.SingleCo_Code
        const isExist = this.TblHCorpTax.TbldCorpTaxCo.some(item => item.DcCorpTax_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Corporate Tax Master' });
          return;
        }
        this.TblHCorpTax.TbldCorpTaxCo[this.tableIndex].DcCorpTax_SingleCo_SysID = event.SingleCo_SysID
        this.TblHCorpTax.TbldCorpTaxCo[this.tableIndex].DcCorpTax_SingleCo_Code = event.SingleCo_Code
        this.TblHCorpTax.TbldCorpTaxCo[this.tableIndex].DcCorpTax_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHCorpTax.HCorpTax_AcDe_Code = event.HActDeactive_SysID
        this.TblHCorpTax.HCorpTax_AcDe_Code = event.HActDeactive_Code
        this.TblHCorpTax.HCorpTax_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHCorpTax.HCorpTax_SysID && rowData.DcCorpTax_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.corporatTax, `company?where[DcCorpTax_SysID]=${this.TblHCorpTax.TbldCorpTaxCo[0].DcCorpTax_SysID}&where[DcCorpTax_SingleCo_SysID]=${rowData.DcCorpTax_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldCorpTaxCo') {
                this.TblHCorpTax.TbldCorpTaxCo.splice(index, 1);
                if (this.TblHCorpTax.TbldCorpTaxCo.length === 0) {
                  this.addRow('TbldCorpTaxCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldCorpTaxCo') {
            this.TblHCorpTax.TbldCorpTaxCo.splice(index, 1);
            if (this.TblHCorpTax.TbldCorpTaxCo.length === 0) {
              this.addRow('TbldCorpTaxCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldCorpTaxCo') {
      const newRow = new TbldCorpTaxCo()
      this.TblHCorpTax.TbldCorpTaxCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHCorpTax.HCorpTax_Code == null || this.TblHCorpTax.HCorpTax_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Corporate Tax Code Cannot Be Null' });
      return false;
    }

    if (this.TblHCorpTax.HCorpTax_Name == null || this.TblHCorpTax.HCorpTax_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Corporate Tax Name Cannot Be Null' });
      return false;
    }

     if (this.TblHCorpTax.TbldCorpTaxCo[0].DcCorpTax_SingleCo_Code == null || this.TblHCorpTax.TbldCorpTaxCo[0].DcCorpTax_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Corporate Tax Single Company Code Cannot Be Null' });
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
    this.TblHCorpTax.TbldCorpTaxCo = this.TblHCorpTax.TbldCorpTaxCo.filter(
      row => row.DcCorpTax_SingleCo_Code && row.DcCorpTax_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.corporatTax, this.TblHCorpTax).then((res) => {
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
        this.TblHCorpTax = new TblHCorpTax();
        this.TblHCorpTax.TbldCorpTaxCo = [new TbldCorpTaxCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/corporate-tax/']);

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
    if (this.TblHCorpTax.HCorpTax_SysID || this.HCorpTax_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.corporatTax, this.TblHCorpTax.HCorpTax_SysID).then((res) => {
        this.TblHCorpTax = res
        this.showDeleteButton = true;

        if (this.TblHCorpTax.TbldCorpTaxCo.length == 0) {
          this.TblHCorpTax.TbldCorpTaxCo = [new TbldCorpTaxCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHCorpTax = new TblHCorpTax()
          this.TblHCorpTax.TbldCorpTaxCo = [new TbldCorpTaxCo()]
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
        this.masterService.deleteData(apiUrl.corporatTax, this.TblHCorpTax.HCorpTax_SysID).then((res) => {

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
    this.TblHCorpTax = new TblHCorpTax()
    this.TblHCorpTax.TbldCorpTaxCo = [new TbldCorpTaxCo()]
    this.router.navigate(['l-master/corporate-tax/']);

  }
  cancel() {
    this.TblHCorpTax = new TblHCorpTax()
    this.TblHCorpTax.TbldCorpTaxCo = [new TbldCorpTaxCo()]
    this.router.navigate(['l-master/corporate-tax']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayCorporateTaxList() {
    this.showCorporateTaxList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.corporatTax).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCorpTax_Code || item.HCorpTax_Name || item.HCorpTax_SysID;
      const matchesQuery =
        (item.HCorpTax_Code || '').toLowerCase().includes(query) ||
        (item.HCorpTax_Name || '').toLowerCase().includes(query) ||
        item.HCorpTax_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showCorporateTaxList = false
    this.router.navigate(['l-master/corporate-tax']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/corporate-tax/' + rowData.HCorpTax_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.corporatTax, rowData.HCorpTax_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showCorporateTaxList = false

            this.getListData()
          }

        });
      }
    });
  }

}
