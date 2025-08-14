import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPCreatorCo } from 'src/app/_dto/creator-master/TbldPCreatorCo.dto';
import { TblHPCreator } from 'src/app/_dto/creator-master/TblHPCreator.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-creator-master',
  templateUrl: './creator-master.component.html',
  styleUrls: ['./creator-master.component.scss']
})
export class CreatorMasterComponent implements OnInit {
 showListButton: boolean = true;

  TblHPCreator: TblHPCreator = new TblHPCreator()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPCreator_SysID: any;

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
    this.TblHPCreator.TbldPCreatorCo = [new TbldPCreatorCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPCreator_SysID = Number(id);
        this.TblHPCreator.HPCreator_SysID = Number(id);
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
        const isExist = this.TblHPCreator.TbldPCreatorCo.some(item => item.DcpCreator_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Creator Master' });
          return;
        }
        this.TblHPCreator.TbldPCreatorCo[this.tableIndex].DcpCreator_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPCreator.TbldPCreatorCo[this.tableIndex].DcpCreator_SingleCo_Code = event.SingleCo_Code;
        this.TblHPCreator.TbldPCreatorCo[this.tableIndex].DcpCreator_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPCreator.HPCreator_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPCreator.HPCreator_AcDe_Code = event.HActDeactive_Code
        this.TblHPCreator.HPCreator_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPCreator.HPCreator_SysID && rowData.DcpCreator_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.creatorMaster, `company?where[DcpCreator_GridSysID]=${this.TblHPCreator.TbldPCreatorCo[0].DcpCreator_GridSysID}&where[DcpCreator_SingleCo_SysID]=${rowData.DcpCreator_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPCreatorCo') {
                this.TblHPCreator.TbldPCreatorCo.splice(index, 1);
                if (this.TblHPCreator.TbldPCreatorCo.length === 0) {
                  this.addRow('TbldPCreatorCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPCreatorCo') {
            this.TblHPCreator.TbldPCreatorCo.splice(index, 1);
            if (this.TblHPCreator.TbldPCreatorCo.length === 0) {
              this.addRow('TbldPCreatorCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPCreatorCo') {
      const newRow = new TbldPCreatorCo()
      this.TblHPCreator.TbldPCreatorCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPCreator.HPCreator_Code == null || this.TblHPCreator.HPCreator_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Creator Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPCreator.HPCreator_Name == null || this.TblHPCreator.HPCreator_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Creator Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPCreator.TbldPCreatorCo[0].DcpCreator_SingleCo_Code == null || this.TblHPCreator.TbldPCreatorCo[0].DcpCreator_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Creator Master Single Company Code Cannot Be Null' });
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
    this.TblHPCreator.TbldPCreatorCo = this.TblHPCreator.TbldPCreatorCo.filter(
      row => row.DcpCreator_SingleCo_Code && row.DcpCreator_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.creatorMaster, this.TblHPCreator).then((res) => {
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
        this.TblHPCreator = new TblHPCreator();
        this.TblHPCreator.TbldPCreatorCo = [new TbldPCreatorCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/creator-master/']);

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
    if (this.TblHPCreator.HPCreator_SysID || this.HPCreator_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.creatorMaster, this.TblHPCreator.HPCreator_SysID).then((res) => {
        this.TblHPCreator = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPCreator.TbldPCreatorCo.length == 0) {
          this.TblHPCreator.TbldPCreatorCo = [new TbldPCreatorCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPCreator = new TblHPCreator()
          this.TblHPCreator.TbldPCreatorCo = [new TbldPCreatorCo()]
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
        this.masterService.deleteData(apiUrl.creatorMaster, this.TblHPCreator.HPCreator_SysID).then((res) => {

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
    this.TblHPCreator = new TblHPCreator()
    this.TblHPCreator.TbldPCreatorCo = [new TbldPCreatorCo()]
    this.router.navigate(['Manpower/creator-master/']);

  }
  cancel() {
    this.TblHPCreator = new TblHPCreator()
    this.TblHPCreator.TbldPCreatorCo = [new TbldPCreatorCo()]
    this.router.navigate(['Manpower/creator-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.creatorMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPCreator_Code || item.HPCreator_Name || item.HPCreator_SysID;
      const matchesQuery =
        (item.HPCreator_Code || '').toLowerCase().includes(query) ||
        (item.HPCreator_Name || '').toLowerCase().includes(query) ||
        item.HPCreator_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/creator-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/creator-master/' + rowData.HPCreator_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.creatorMaster, rowData.HPCreator_SysID).then((res) => {

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
