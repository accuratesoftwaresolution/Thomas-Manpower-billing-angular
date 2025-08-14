import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPQIDCo } from 'src/app/_dto/qatar-id-master/TbldPQIDCo.dto';
import { TblHPQID } from 'src/app/_dto/qatar-id-master/TblHPQID.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-qatar-id-master',
  templateUrl: './qatar-id-master.component.html',
  styleUrls: ['./qatar-id-master.component.scss']
})
export class QatarIdMasterComponent implements OnInit {

  showListButton: boolean = true;

  TblHPQID: TblHPQID = new TblHPQID()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPQID_SysID: any;

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
    this.TblHPQID.TbldPQIDCo = [new TbldPQIDCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPQID_SysID = Number(id);
        this.TblHPQID.HPQID_SysID = Number(id);
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
        const isExist = this.TblHPQID.TbldPQIDCo.some(item => item.DcpQID_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Qatar ID Master' });
          return;
        }
        this.TblHPQID.TbldPQIDCo[this.tableIndex].DcpQID_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPQID.TbldPQIDCo[this.tableIndex].DcpQID_SingleCo_Code = event.SingleCo_Code;
        this.TblHPQID.TbldPQIDCo[this.tableIndex].DcpQID_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPQID.HPQID_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPQID.HPQID_AcDe_Code = event.HActDeactive_Code
        this.TblHPQID.HPQID_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPQID.HPQID_SysID && rowData.DcpQID_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.qatarID, `company?where[DcpQID_GridSysID]=${this.TblHPQID.TbldPQIDCo[0].DcpQID_GridSysID}&where[DcpQID_SingleCo_SysID]=${rowData.DcpQID_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPQIDCo') {
                this.TblHPQID.TbldPQIDCo.splice(index, 1);
                if (this.TblHPQID.TbldPQIDCo.length === 0) {
                  this.addRow('TbldPQIDCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPQIDCo') {
            this.TblHPQID.TbldPQIDCo.splice(index, 1);
            if (this.TblHPQID.TbldPQIDCo.length === 0) {
              this.addRow('TbldPQIDCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPQIDCo') {
      const newRow = new TbldPQIDCo()
      this.TblHPQID.TbldPQIDCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPQID.HPQID_Code == null || this.TblHPQID.HPQID_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Qatar ID Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPQID.HPQID_Name == null || this.TblHPQID.HPQID_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Qatar ID Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPQID.TbldPQIDCo[0].DcpQID_SingleCo_Code == null || this.TblHPQID.TbldPQIDCo[0].DcpQID_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Qatar ID Master Single Company Code Cannot Be Null' });
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
    this.TblHPQID.TbldPQIDCo = this.TblHPQID.TbldPQIDCo.filter(
      row => row.DcpQID_SingleCo_Code && row.DcpQID_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.qatarID, this.TblHPQID).then((res) => {
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
        this.TblHPQID = new TblHPQID();
        this.TblHPQID.TbldPQIDCo = [new TbldPQIDCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/qatar-id-master/']);

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
    if (this.TblHPQID.HPQID_SysID || this.HPQID_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.qatarID, this.TblHPQID.HPQID_SysID).then((res) => {
        this.TblHPQID = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPQID.TbldPQIDCo.length == 0) {
          this.TblHPQID.TbldPQIDCo = [new TbldPQIDCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPQID = new TblHPQID()
          this.TblHPQID.TbldPQIDCo = [new TbldPQIDCo()]
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
        this.masterService.deleteData(apiUrl.qatarID, this.TblHPQID.HPQID_SysID).then((res) => {

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
    this.TblHPQID = new TblHPQID()
    this.TblHPQID.TbldPQIDCo = [new TbldPQIDCo()]
    this.router.navigate(['Manpower/qatar-id-master/']);

  }
  cancel() {
    this.TblHPQID = new TblHPQID()
    this.TblHPQID.TbldPQIDCo = [new TbldPQIDCo()]
    this.router.navigate(['Manpower/qatar-id-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.qatarID).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPQID_Code || item.HPQID_Name || item.HPQID_SysID;
      const matchesQuery =
        (item.HPQID_Code || '').toLowerCase().includes(query) ||
        (item.HPQID_Name || '').toLowerCase().includes(query) ||
        item.HPQID_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/qatar-id-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/qatar-id-master/' + rowData.HPQID_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.qatarID, rowData.HPQID_SysID).then((res) => {

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
