import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPGPCo } from 'src/app/_dto/gp-master/TbldPGPCo.dto';
import { TblHPGP } from 'src/app/_dto/gp-master/TblHPGP.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';

@Component({
  selector: 'app-gp-master',
  templateUrl: './gp-master.component.html',
  styleUrls: ['./gp-master.component.scss']
})
export class GpMasterComponent implements OnInit {

showListButton: boolean = false;

  TblHPGP: TblHPGP = new TblHPGP()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showTermsConditionsList: boolean = false

  tableIndex: any;

  HPGP_SysID: any;

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
    this.TblHPGP.TbldPGPCo = [new TbldPGPCo()]
    this.showListButton =true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPGP_SysID = Number(id);
        this.TblHPGP.HPGP_SysID = Number(id);
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
        const isExist = this.TblHPGP.TbldPGPCo.some(item => item.DcpGP_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for GP Master' });
          return;
        }
        this.TblHPGP.TbldPGPCo[this.tableIndex].DcpGP_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPGP.TbldPGPCo[this.tableIndex].DcpGP_SingleCo_Code = event.SingleCo_Code;
        this.TblHPGP.TbldPGPCo[this.tableIndex].DcpGP_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPGP.HPGP_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPGP.HPGP_AcDe_Code = event.HActDeactive_Code
        this.TblHPGP.HPGP_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHPGP.HPGP_SysID && rowData.DcpGP_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.gpMaster, `company?where[DcpGP_GridSysID]=${this.TblHPGP.TbldPGPCo[0].DcpGP_GridSysID}&where[DcpGP_SingleCo_SysID]=${rowData.DcpGP_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
        this.showListButton = true;

              if (table === 'TbldPGPCo') {
                this.TblHPGP.TbldPGPCo.splice(index, 1);
                if (this.TblHPGP.TbldPGPCo.length === 0) {
                  this.addRow('TbldPGPCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPGPCo') {
            this.TblHPGP.TbldPGPCo.splice(index, 1);
            if (this.TblHPGP.TbldPGPCo.length === 0) {
              this.addRow('TbldPGPCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPGPCo') {
      const newRow = new TbldPGPCo()
      this.TblHPGP.TbldPGPCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPGP.HPGP_Code == null || this.TblHPGP.HPGP_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPGP.HPGP_Name == null || this.TblHPGP.HPGP_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPGP.TbldPGPCo[0].DcpGP_SingleCo_Code == null || this.TblHPGP.TbldPGPCo[0].DcpGP_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'GP Master Single Company Code Cannot Be Null' });
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
    this.TblHPGP.TbldPGPCo = this.TblHPGP.TbldPGPCo.filter(
      row => row.DcpGP_SingleCo_Code && row.DcpGP_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.gpMaster, this.TblHPGP).then((res) => {
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
        this.TblHPGP = new TblHPGP();
        this.TblHPGP.TbldPGPCo = [new TbldPGPCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/GP-master/']);

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
    if (this.TblHPGP.HPGP_SysID || this.HPGP_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.gpMaster, this.TblHPGP.HPGP_SysID).then((res) => {
        this.TblHPGP = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPGP.TbldPGPCo.length == 0) {
          this.TblHPGP.TbldPGPCo = [new TbldPGPCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPGP = new TblHPGP()
          this.TblHPGP.TbldPGPCo = [new TbldPGPCo()]
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
        this.masterService.deleteData(apiUrl.gpMaster, this.TblHPGP.HPGP_SysID).then((res) => {

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
    this.TblHPGP = new TblHPGP()
    this.TblHPGP.TbldPGPCo = [new TbldPGPCo()]
    this.router.navigate(['Manpower/GP-master/']);

  }
  cancel() {
    this.TblHPGP = new TblHPGP()
    this.TblHPGP.TbldPGPCo = [new TbldPGPCo()]
    this.router.navigate(['Manpower/GP-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showTermsConditionsList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.gpMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPGP_Code || item.HPGP_Name || item.HPGP_SysID;
      const matchesQuery =
        (item.HPGP_Code || '').toLowerCase().includes(query) ||
        (item.HPGP_Name || '').toLowerCase().includes(query) ||
        item.HPGP_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showTermsConditionsList = false
    this.showListButton = true;

    this.router.navigate(['Manpower/GP-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/GP-master/' + rowData.HPGP_SysID]);
    this.showListButton = false;

  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;

        this.masterService.deleteData(apiUrl.gpMaster, rowData.HPGP_SysID).then((res) => {

          if (res.success == false) {
        this.showListButton = true;

            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showTermsConditionsList = true
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

