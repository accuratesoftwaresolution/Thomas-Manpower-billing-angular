import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldCDTempCo } from 'src/app/_dto/TbldCDTempCo.dto';
import { TblHCDTemp } from 'src/app/_dto/TblHCDTemp.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';


@Component({
  selector: 'app-copydoctemplate',
  templateUrl: './copydoctemplate.component.html',
  styleUrls: ['./copydoctemplate.component.scss']
})
export class CopydoctemplateComponent implements OnInit {

 TblHCDTemp: TblHCDTemp = new TblHCDTemp()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showCopyList: boolean = false

  tableIndex: any;

  HCDTemp_SysID: any;

  showDeleteButton: boolean = false;

  isSaving: boolean = false;

  progressValue: number = 0;
  activateAndDeactivate: any;
  singleCoMaster: any;
  menuCode: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public popUpService: CommonPopupService,
    private lookupService: LookupDialogService,
    private confirmationService: ConfirmationService,
    public masterService: MasterService,
    private _messageService: MessageService) { }


  ngOnInit(): void {
    this.TblHCDTemp.TbldCDTempCo = [new TbldCDTempCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HCDTemp_SysID = Number(id);
        this.TblHCDTemp.HCDTemp_SysID = Number(id);
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
    this.masterService.getMasterData(apiUrl.menuCode).then((res) => {
      this.menuCode = res
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
        case 'MenuCode':
        this.popUpService.popUpData = this.menuCode;
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
        const isExist = this.TblHCDTemp.TbldCDTempCo.some(item => item.DcCDTemp_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Copy Doc From Template Master' });
          return;
        }
        this.TblHCDTemp.TbldCDTempCo[this.tableIndex].DcCDTemp_SingleCo_SysID = event.SingleCo_SysID
        this.TblHCDTemp.TbldCDTempCo[this.tableIndex].DcCDTemp_SingleCo_Code = event.SingleCo_Code
        this.TblHCDTemp.TbldCDTempCo[this.tableIndex].DcCDTemp_SingleCo_Name = event.SingleCo_Name
        break;

        case 'MenuCode':
        this.TblHCDTemp.HCDTemp_Menu_SysID = event.HMenu_SysID
        this.TblHCDTemp.HCDTemp_Menu_Code = event.HMenu_Code
        this.TblHCDTemp.HCDTemp_Menu_Name = event.HMenu_Name
        break;


      case 'ActAndDeactCode':
        this.TblHCDTemp.HCDTemp_AcDe_SysID = event.HActDeactive_SysID
        this.TblHCDTemp.HCDTemp_AcDe_Code = event.HActDeactive_Code
        this.TblHCDTemp.HCDTemp_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHCDTemp.HCDTemp_SysID && rowData.DcCDTemp_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.copydocTemplate, `company?where[DcCDTemp_SysID]=${this.TblHCDTemp.TbldCDTempCo[0].DcCDTemp_SysID}&where[DcCDTemp_SingleCo_SysID]=${rowData.DcCDTemp_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldCDTempCo') {
                this.TblHCDTemp.TbldCDTempCo.splice(index, 1);
                if (this.TblHCDTemp.TbldCDTempCo.length === 0) {
                  this.addRow('TbldCDTempCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldCDTempCo') {
            this.TblHCDTemp.TbldCDTempCo.splice(index, 1);
            if (this.TblHCDTemp.TbldCDTempCo.length === 0) {
              this.addRow('TbldCDTempCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldCDTempCo') {
      const newRow = new TbldCDTempCo()
      this.TblHCDTemp.TbldCDTempCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHCDTemp.HCDTemp_Code == null || this.TblHCDTemp.HCDTemp_Code.toString().trim() === '') {
      this._messageService.add({severity: 'warn', summary: 'Warning', detail: 'Copy Doc From Template Code Cannot Be Null' });
      return false;
    }

    if (this.TblHCDTemp.HCDTemp_Name == null || this.TblHCDTemp.HCDTemp_Name.toString().trim() === '') {
      this._messageService.add({severity: 'warn', summary: 'Warning', detail: 'Copy Doc From Template Name Cannot Be Null' });
      return false;
    }

     if (this.TblHCDTemp.TbldCDTempCo[0].DcCDTemp_SingleCo_Code == null || this.TblHCDTemp.TbldCDTempCo[0].DcCDTemp_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({severity: 'warn', summary: 'Warning', detail: 'Copy Doc From Template Single Company Code Cannot Be Null' });
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
    this.TblHCDTemp.TbldCDTempCo = this.TblHCDTemp.TbldCDTempCo.filter(
      row => row.DcCDTemp_SingleCo_Code && row.DcCDTemp_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.copydocTemplate, this.TblHCDTemp).then((res) => {
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
        this.TblHCDTemp = new TblHCDTemp();
        this.TblHCDTemp.TbldCDTempCo = [new TbldCDTempCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/copydoctemplate/']);

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
    if (this.TblHCDTemp.HCDTemp_SysID || this.HCDTemp_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.copydocTemplate, this.TblHCDTemp.HCDTemp_SysID).then((res) => {
        this.TblHCDTemp = res
        this.showDeleteButton = true;

        if (this.TblHCDTemp.TbldCDTempCo.length == 0) {
          this.TblHCDTemp.TbldCDTempCo = [new TbldCDTempCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHCDTemp = new TblHCDTemp()
          this.TblHCDTemp.TbldCDTempCo = [new TbldCDTempCo()]
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
        this.masterService.deleteData(apiUrl.copydocTemplate, this.TblHCDTemp.HCDTemp_SysID).then((res) => {

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
    this.TblHCDTemp = new TblHCDTemp()
    this.TblHCDTemp.TbldCDTempCo = [new TbldCDTempCo()]
    this.router.navigate(['l-master/copydoctemplate/']);

  }
  cancel() {
    this.TblHCDTemp = new TblHCDTemp()
    this.TblHCDTemp.TbldCDTempCo = [new TbldCDTempCo()]
    this.router.navigate(['l-master/copydoctemplate']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayCopyList() {
    this.showCopyList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.copydocTemplate).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HCDTemp_Code || item.HCDTemp_Name || item.HCDTemp_SysID;
      const matchesQuery =
        (item.HCDTemp_Code || '').toLowerCase().includes(query) ||
        (item.HCDTemp_Name || '').toLowerCase().includes(query) ||
        item.HCDTemp_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showCopyList = false
    this.router.navigate(['l-master/copydoctemplate']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/copydoctemplate/' + rowData.HCDTemp_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.copydocTemplate, rowData.HCDTemp_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showCopyList = false

            this.getListData()
          }

        });
      }
    });
  }


}



