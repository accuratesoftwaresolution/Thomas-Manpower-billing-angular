import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPNatCo } from 'src/app/_dto/nationality-master/TbldPNatCo.dto';
import { TblHpNat } from 'src/app/_dto/nationality-master/TblHpNat.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-nationlity-master',
  templateUrl: './nationlity-master.component.html',
  styleUrls: ['./nationlity-master.component.scss']
})
export class NationlityMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHpNat: TblHpNat = new TblHpNat()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPNat_SysID: any;

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
    this.TblHpNat.TbldPNatCo = [new TbldPNatCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPNat_SysID = Number(id);
        this.TblHpNat.HPNat_SysID = Number(id);
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
        const isExist = this.TblHpNat.TbldPNatCo.some(item => item.DcpNat_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Nationlity Master' });
          return;
        }
        this.TblHpNat.TbldPNatCo[this.tableIndex].DcpNat_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHpNat.TbldPNatCo[this.tableIndex].DcpNat_SingleCo_Code = event.SingleCo_Code;
        this.TblHpNat.TbldPNatCo[this.tableIndex].DcpNat_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHpNat.HPNat_AcDe_SysID = event.HActDeactive_SysID
        this.TblHpNat.HPNat_AcDe_Code = event.HActDeactive_Code
        this.TblHpNat.HPNat_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHpNat.HPNat_SysID && rowData.DcpNat_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.nationalityMaster, `company?where[DcpNat_GridSysID]=${this.TblHpNat.TbldPNatCo[0].DcpNat_GridSysID}&where[DcpNat_SingleCo_SysID]=${rowData.DcpNat_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPNatCo') {
                this.TblHpNat.TbldPNatCo.splice(index, 1);
                if (this.TblHpNat.TbldPNatCo.length === 0) {
                  this.addRow('TbldPNatCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPNatCo') {
            this.TblHpNat.TbldPNatCo.splice(index, 1);
            if (this.TblHpNat.TbldPNatCo.length === 0) {
              this.addRow('TbldPNatCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPNatCo') {
      const newRow = new TbldPNatCo()
      this.TblHpNat.TbldPNatCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHpNat.HPNat_Code == null || this.TblHpNat.HPNat_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Nationlity Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHpNat.HPNat_Name == null || this.TblHpNat.HPNat_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Nationlity Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHpNat.TbldPNatCo[0].DcpNat_SingleCo_Code == null || this.TblHpNat.TbldPNatCo[0].DcpNat_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Nationlity Master Single Company Code Cannot Be Null' });
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
    this.TblHpNat.TbldPNatCo = this.TblHpNat.TbldPNatCo.filter(
      row => row.DcpNat_SingleCo_Code && row.DcpNat_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.nationalityMaster, this.TblHpNat).then((res) => {
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
        this.TblHpNat = new TblHpNat();
        this.TblHpNat.TbldPNatCo = [new TbldPNatCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/nationality-master/']);

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
    if (this.TblHpNat.HPNat_SysID || this.HPNat_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.nationalityMaster, this.TblHpNat.HPNat_SysID).then((res) => {
        this.TblHpNat = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHpNat.TbldPNatCo.length == 0) {
          this.TblHpNat.TbldPNatCo = [new TbldPNatCo()]
        this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHpNat = new TblHpNat()
          this.TblHpNat.TbldPNatCo = [new TbldPNatCo()]
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
        this.masterService.deleteData(apiUrl.nationalityMaster, this.TblHpNat.HPNat_SysID).then((res) => {

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
    this.TblHpNat = new TblHpNat()
    this.TblHpNat.TbldPNatCo = [new TbldPNatCo()]
    this.router.navigate(['Manpower/nationality-master/']);

  }
  cancel() {
    this.TblHpNat = new TblHpNat()
    this.TblHpNat.TbldPNatCo = [new TbldPNatCo()]
    this.router.navigate(['Manpower/nationality-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.nationalityMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPNat_Code || item.HPNat_Name || item.HPNat_SysID;
      const matchesQuery =
        (item.HPNat_Code || '').toLowerCase().includes(query) ||
        (item.HPNat_Name || '').toLowerCase().includes(query) ||
        item.HPNat_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/nationality-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/nationality-master/' + rowData.HPNat_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.nationalityMaster, rowData.HPNat_SysID).then((res) => {

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
