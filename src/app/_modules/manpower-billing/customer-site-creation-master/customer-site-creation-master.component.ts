import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPCustSiteCo } from 'src/app/_dto/customer-site-creation-master/TbldPCustSiteCo.dto';
import { TblHpCustSite } from 'src/app/_dto/customer-site-creation-master/TblHpCustSite.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-customer-site-creation-master',
  templateUrl: './customer-site-creation-master.component.html',
  styleUrls: ['./customer-site-creation-master.component.scss']
})
export class CustomerSiteCreationMasterComponent implements OnInit {
  showListButton: boolean = true;

  TblHpCustSite: TblHpCustSite = new TblHpCustSite()

  activatedeactivate: any;


  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPCustSite_SysID: any;

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
    this.TblHpCustSite.TbldPCustSiteCo = [new TbldPCustSiteCo()]
    this.showListButton = true;
    this.TblHpCustSite.HPCustSite_QRCode = 'assets/images/qr-code/site-qr.png';
    this.TblHpCustSite.HPCustSite_BarCode = 'assets/images/qr-code/barcode.avif';
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPCustSite_SysID = Number(id);
        this.TblHpCustSite.HPCustSite_SysID = Number(id);
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
        const isExist = this.TblHpCustSite.TbldPCustSiteCo.some(item => item.DcpCustSite_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Customer Site Creation Master' });
          return;
        }
        this.TblHpCustSite.TbldPCustSiteCo[this.tableIndex].DcpCustSite_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHpCustSite.TbldPCustSiteCo[this.tableIndex].DcpCustSite_SingleCo_Code = event.SingleCo_Code;
        this.TblHpCustSite.TbldPCustSiteCo[this.tableIndex].DcpCustSite_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHpCustSite.HPCustSite_AcDe_SysID = event.HActDeactive_SysID
        this.TblHpCustSite.HPCustSite_AcDe_Code = event.HActDeactive_Code
        this.TblHpCustSite.HPCustSite_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHpCustSite.HPCustSite_SysID && rowData.DcpCustSite_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.customerSiteCriteria, `company?where[DcpCustSite_GridSysID]=${this.TblHpCustSite.TbldPCustSiteCo[0].DcpCustSite_GridSysID}&where[DcpCustSite_SingleCo_SysID]=${rowData.DcpCustSite_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPCustSiteCo') {
                this.TblHpCustSite.TbldPCustSiteCo.splice(index, 1);
                if (this.TblHpCustSite.TbldPCustSiteCo.length === 0) {
                  this.addRow('TbldPCustSiteCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPCustSiteCo') {
            this.TblHpCustSite.TbldPCustSiteCo.splice(index, 1);
            if (this.TblHpCustSite.TbldPCustSiteCo.length === 0) {
              this.addRow('TbldPCustSiteCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPCustSiteCo') {
      const newRow = new TbldPCustSiteCo()
      this.TblHpCustSite.TbldPCustSiteCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHpCustSite.HPCustSite_Code == null || this.TblHpCustSite.HPCustSite_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Customer Site Creation  Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHpCustSite.HPCustSite_Name == null || this.TblHpCustSite.HPCustSite_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Customer Site Creation  Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHpCustSite.TbldPCustSiteCo[0].DcpCustSite_SingleCo_Code == null || this.TblHpCustSite.TbldPCustSiteCo[0].DcpCustSite_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Customer Site Creation  Master Single Company Code Cannot Be Null' });
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
    this.TblHpCustSite.TbldPCustSiteCo = this.TblHpCustSite.TbldPCustSiteCo.filter(
      row => row.DcpCustSite_SingleCo_Code && row.DcpCustSite_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.customerSiteCriteria, this.TblHpCustSite).then((res) => {
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
        this.TblHpCustSite = new TblHpCustSite();
        this.TblHpCustSite.TbldPCustSiteCo = [new TbldPCustSiteCo()];
        this.TblHpCustSite.HPCustSite_QRCode = 'assets/images/qr-code/site-qr.png';
        this.TblHpCustSite.HPCustSite_BarCode = 'assets/images/qr-code/barcode.avif';

        // Navigate to list screen
        this.router.navigate(['Manpower/customer-site-creation-master/']);

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
    if (this.TblHpCustSite.HPCustSite_SysID || this.HPCustSite_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.customerSiteCriteria, this.TblHpCustSite.HPCustSite_SysID).then((res) => {
        this.TblHpCustSite = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHpCustSite.TbldPCustSiteCo.length == 0) {
          this.TblHpCustSite.TbldPCustSiteCo = [new TbldPCustSiteCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHpCustSite = new TblHpCustSite()
          this.TblHpCustSite.TbldPCustSiteCo = [new TbldPCustSiteCo()]
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
        this.masterService.deleteData(apiUrl.customerSiteCriteria, this.TblHpCustSite.HPCustSite_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.TblHpCustSite.HPCustSite_QRCode = 'assets/images/qr-code/site-qr.png';
            this.TblHpCustSite.HPCustSite_BarCode = 'assets/images/qr-code/barcode.avif';
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
    this.TblHpCustSite = new TblHpCustSite()
    this.TblHpCustSite.TbldPCustSiteCo = [new TbldPCustSiteCo()]
    this.router.navigate(['Manpower/customer-site-creation-master/']);
    this.TblHpCustSite.HPCustSite_QRCode = 'assets/images/qr-code/site-qr.png';
    this.TblHpCustSite.HPCustSite_BarCode = 'assets/images/qr-code/barcode.avif';

  }
  cancel() {
    this.TblHpCustSite = new TblHpCustSite()
    this.TblHpCustSite.TbldPCustSiteCo = [new TbldPCustSiteCo()]
    this.router.navigate(['Manpower/customer-site-creation-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.customerSiteCriteria).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPCustSite_Code || item.HPCustSite_Name || item.HPCustSite_SysID;
      const matchesQuery =
        (item.HPCustSite_Code || '').toLowerCase().includes(query) ||
        (item.HPCustSite_Name || '').toLowerCase().includes(query) ||
        item.HPCustSite_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/customer-site-creation-master']);


  }

  onDateChange(type, value: string) {
    const dateObj = value ? new Date(value) : null;
    const digiLock = this.TblHpCustSite;
    if (type === 'creationDate') {
      digiLock.HPCustSite_CreaDate = dateObj;
    }
  }

  editRow(rowData: any) {
    this.router.navigate(['Manpower/customer-site-creation-master/' + rowData.HPCustSite_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.customerSiteCriteria, rowData.HPCustSite_SysID).then((res) => {

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
