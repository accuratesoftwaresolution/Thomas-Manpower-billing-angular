import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPVTypeCo } from 'src/app/_dto/Visa-type-master/TbldPVTypeCo.dto';
import { TblHpVType } from 'src/app/_dto/Visa-type-master/TblHpVType.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-visa-type-master',
  templateUrl: './visa-type-master.component.html',
  styleUrls: ['./visa-type-master.component.scss']
})
export class VisaTypeMasterComponent implements OnInit {

    showListButton: boolean = true;

  TblHpVType: TblHpVType = new TblHpVType()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPVType_SysID: any;

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
    this.TblHpVType.TbldPVTypeCo = [new TbldPVTypeCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPVType_SysID = Number(id);
        this.TblHpVType.HPVType_SysID = Number(id);
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
        const isExist = this.TblHpVType.TbldPVTypeCo.some(item => item.DcpVType_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Visa Type Master' });
          return;
        }
        this.TblHpVType.TbldPVTypeCo[this.tableIndex].DcpVType_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHpVType.TbldPVTypeCo[this.tableIndex].DcpVType_SingleCo_Code = event.SingleCo_Code;
        this.TblHpVType.TbldPVTypeCo[this.tableIndex].DcpVType_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHpVType.HPVType_AcDe_SysID = event.HActDeactive_SysID
        this.TblHpVType.HPVType_AcDe_Code = event.HActDeactive_Code
        this.TblHpVType.HPVType_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHpVType.HPVType_SysID && rowData.DcpVType_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.visaTypeMaster, `company?where[DcpVType_GridSysID]=${this.TblHpVType.TbldPVTypeCo[0].DcpVType_GridSysID}&where[DcpVType_SingleCo_SysID]=${rowData.DcpVType_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPVTypeCo') {
                this.TblHpVType.TbldPVTypeCo.splice(index, 1);
                if (this.TblHpVType.TbldPVTypeCo.length === 0) {
                  this.addRow('TbldPVTypeCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPVTypeCo') {
            this.TblHpVType.TbldPVTypeCo.splice(index, 1);
            if (this.TblHpVType.TbldPVTypeCo.length === 0) {
              this.addRow('TbldPVTypeCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPVTypeCo') {
      const newRow = new TbldPVTypeCo()
      this.TblHpVType.TbldPVTypeCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHpVType.HPVType_Code == null || this.TblHpVType.HPVType_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Type Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHpVType.HPVType_Name == null || this.TblHpVType.HPVType_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Type Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHpVType.TbldPVTypeCo[0].DcpVType_SingleCo_Code == null || this.TblHpVType.TbldPVTypeCo[0].DcpVType_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Visa Type Master Single Company Code Cannot Be Null' });
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
    this.TblHpVType.TbldPVTypeCo = this.TblHpVType.TbldPVTypeCo.filter(
      row => row.DcpVType_SingleCo_Code && row.DcpVType_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.visaTypeMaster, this.TblHpVType).then((res) => {
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
        this.TblHpVType = new TblHpVType();
        this.TblHpVType.TbldPVTypeCo = [new TbldPVTypeCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/visa-type-master/']);

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
    if (this.TblHpVType.HPVType_SysID || this.HPVType_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.visaTypeMaster, this.TblHpVType.HPVType_SysID).then((res) => {
        this.TblHpVType = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHpVType.TbldPVTypeCo.length == 0) {
          this.TblHpVType.TbldPVTypeCo = [new TbldPVTypeCo()]
        this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHpVType = new TblHpVType()
          this.TblHpVType.TbldPVTypeCo = [new TbldPVTypeCo()]
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
        this.masterService.deleteData(apiUrl.visaTypeMaster, this.TblHpVType.HPVType_SysID).then((res) => {

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
    this.TblHpVType = new TblHpVType()
    this.TblHpVType.TbldPVTypeCo = [new TbldPVTypeCo()]
    this.router.navigate(['Manpower/visa-type-master/']);

  }
  cancel() {
    this.TblHpVType = new TblHpVType()
    this.TblHpVType.TbldPVTypeCo = [new TbldPVTypeCo()]
    this.router.navigate(['Manpower/visa-type-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.visaTypeMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPVType_Code || item.HPVType_Name || item.HPVType_SysID;
      const matchesQuery =
        (item.HPVType_Code || '').toLowerCase().includes(query) ||
        (item.HPVType_Name || '').toLowerCase().includes(query) ||
        item.HPVType_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/visa-type-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/visa-type-master/' + rowData.HPVType_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.visaTypeMaster, rowData.HPVType_SysID).then((res) => {

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

