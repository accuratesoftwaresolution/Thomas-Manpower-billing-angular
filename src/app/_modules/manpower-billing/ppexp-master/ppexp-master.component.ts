import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldPPassExpCo } from 'src/app/_dto/ppexp-master/TbldPPassExpCo.dto';
import { TblHPPassExp } from 'src/app/_dto/ppexp-master/TblHPPassExp.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-ppexp-master',
  templateUrl: './ppexp-master.component.html',
  styleUrls: ['./ppexp-master.component.scss']
})
export class PpexpMasterComponent implements OnInit {


 showListButton: boolean = true;

  TblHPPassExp: TblHPPassExp = new TblHPPassExp()

  activatedeactivate: any;

  singleCompany: any;
  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showList: boolean = false

  tableIndex: any;

  HPPassExp_SysID: any;

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
    this.TblHPPassExp.TbldPPassExpCo = [new TbldPPassExpCo()]
    this.showListButton = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HPPassExp_SysID = Number(id);
        this.TblHPPassExp.HPPassExp_SysID = Number(id);
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
        const isExist = this.TblHPPassExp.TbldPPassExpCo.some(item => item.DcpPassExp_SingleCo_Code === selectedCode);
        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Our PPExp Master' });
          return;
        }
        this.TblHPPassExp.TbldPPassExpCo[this.tableIndex].DcpPassExp_SingleCo_SysID = event.SingleCo_SysID;
        this.TblHPPassExp.TbldPPassExpCo[this.tableIndex].DcpPassExp_SingleCo_Code = event.SingleCo_Code;
        this.TblHPPassExp.TbldPPassExpCo[this.tableIndex].DcpPassExp_SingleCo_Name = event.SingleCo_Name;
        break;


      case 'ActAndDeactCode':
        this.TblHPPassExp.HPPassExp_AcDe_SysID = event.HActDeactive_SysID
        this.TblHPPassExp.HPPassExp_AcDe_Code = event.HActDeactive_Code
        this.TblHPPassExp.HPPassExp_AcDe_Name = event.HActDeactive_Name
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

        if (this.TblHPPassExp.HPPassExp_SysID && rowData.DcpPassExp_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.ppExpMaster, `company?where[DcpPassExp_GridSysID]=${this.TblHPPassExp.TbldPPassExpCo[0].DcpPassExp_GridSysID}&where[DcpPassExp_SingleCo_SysID]=${rowData.DcpPassExp_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              this.showListButton = true;
              if (table === 'TbldPPassExpCo') {
                this.TblHPPassExp.TbldPPassExpCo.splice(index, 1);
                if (this.TblHPPassExp.TbldPPassExpCo.length === 0) {
                  this.addRow('TbldPPassExpCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldPPassExpCo') {
            this.TblHPPassExp.TbldPPassExpCo.splice(index, 1);
            if (this.TblHPPassExp.TbldPPassExpCo.length === 0) {
              this.addRow('TbldPPassExpCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldPPassExpCo') {
      const newRow = new TbldPPassExpCo()
      this.TblHPPassExp.TbldPPassExpCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHPPassExp.HPPassExp_Code == null || this.TblHPPassExp.HPPassExp_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our PPExp Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHPPassExp.HPPassExp_Name == null || this.TblHPPassExp.HPPassExp_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our PPExp Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHPPassExp.TbldPPassExpCo[0].DcpPassExp_SingleCo_Code == null || this.TblHPPassExp.TbldPPassExpCo[0].DcpPassExp_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Our PPExp Master Single Company Code Cannot Be Null' });
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
    this.TblHPPassExp.TbldPPassExpCo = this.TblHPPassExp.TbldPPassExpCo.filter(
      row => row.DcpPassExp_SingleCo_Code && row.DcpPassExp_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.ppExpMaster, this.TblHPPassExp).then((res) => {
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
        this.TblHPPassExp = new TblHPPassExp();
        this.TblHPPassExp.TbldPPassExpCo = [new TbldPPassExpCo()];

        // Navigate to list screen
        this.router.navigate(['Manpower/ppexp-master/']);

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
    if (this.TblHPPassExp.HPPassExp_SysID || this.HPPassExp_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.ppExpMaster, this.TblHPPassExp.HPPassExp_SysID).then((res) => {
        this.TblHPPassExp = res
        this.showDeleteButton = true;
        this.showListButton = false;

        if (this.TblHPPassExp.TbldPPassExpCo.length == 0) {
          this.TblHPPassExp.TbldPPassExpCo = [new TbldPPassExpCo()]
          this.showDeleteButton = false;

        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHPPassExp = new TblHPPassExp()
          this.TblHPPassExp.TbldPPassExpCo = [new TbldPPassExpCo()]
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
        this.masterService.deleteData(apiUrl.ppExpMaster, this.TblHPPassExp.HPPassExp_SysID).then((res) => {

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
    this.TblHPPassExp = new TblHPPassExp()
    this.TblHPPassExp.TbldPPassExpCo = [new TbldPPassExpCo()]
    this.router.navigate(['Manpower/ppexp-master/']);

  }
  cancel() {
    this.TblHPPassExp = new TblHPPassExp()
    this.TblHPPassExp.TbldPPassExpCo = [new TbldPPassExpCo()]
    this.router.navigate(['Manpower/ppexp-master']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayList() {
    this.showList = true
    this.getListData()
    this.showListButton = false;

  }

  getListData() {
    this.masterService.getMasterData(apiUrl.ppExpMaster).then((res) => {
      this.listData = res
      this.filterTable()
      this.showListButton = false;
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HPPassExp_Code || item.HPPassExp_Name || item.HPPassExp_SysID;
      const matchesQuery =
        (item.HPPassExp_Code || '').toLowerCase().includes(query) ||
        (item.HPPassExp_Name || '').toLowerCase().includes(query) ||
        item.HPPassExp_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showList = false
    this.showListButton = true;
    this.router.navigate(['Manpower/ppexp-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['Manpower/ppexp-master/' + rowData.HPPassExp_SysID]);
    this.showListButton = false;
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showListButton = true;
        this.masterService.deleteData(apiUrl.ppExpMaster, rowData.HPPassExp_SysID).then((res) => {

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
