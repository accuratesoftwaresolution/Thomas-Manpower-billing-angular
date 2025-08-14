import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldRemMastCo } from 'src/app/_dto/masters/remarks/TbldRemMastCo.dto';
import { TblHRemMast } from 'src/app/_dto/masters/remarks/TblHRemMast.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {
  TblHRemMast: TblHRemMast = new TblHRemMast()

  singleCompany: any = [];
  activatedeactivate: any = [];

  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showRemarksList: boolean = false

  tableIndex: any;

  HRemMast_SysID: any;

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
    this.TblHRemMast.TbldRemMastCo = [new TbldRemMastCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HRemMast_SysID = Number(id);
        this.TblHRemMast.HRemMast_SysID = Number(id);
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

        const selectedCode = event.SingleCo_Code
        const isExist = this.TblHRemMast.TbldRemMastCo.some(item => item.DcRemMast_SingleCo_Code === selectedCode)

        if (isExist) {
          this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Same Company Code Exists for Remarks Master' });
          return;
        }
        this.TblHRemMast.TbldRemMastCo[this.tableIndex].DcRemMast_SingleCo_SysID = event.SingleCo_SysID
        this.TblHRemMast.TbldRemMastCo[this.tableIndex].DcRemMast_SingleCo_Code = event.SingleCo_Code
        this.TblHRemMast.TbldRemMastCo[this.tableIndex].DcRemMast_SingleCo_Name = event.SingleCo_Name
        break;


      case 'ActAndDeactCode':
        this.TblHRemMast.HRemMast_AcDe_SysID = event.HActDeactive_SysID
        this.TblHRemMast.HRemMast_AcDe_Code = event.HActDeactive_Code
        this.TblHRemMast.HRemMast_AcDe_Name = event.HActDeactive_Name
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


        if (this.TblHRemMast.HRemMast_SysID && rowData.DcRemMast_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.remarksMaster, `company?where[DcRemMast_SysID]=${this.TblHRemMast.TbldRemMastCo[0].DcRemMast_SysID}&where[DcRemMast_SingleCo_SysID]=${rowData.DcRemMast_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldRemMastCo') {
                this.TblHRemMast.TbldRemMastCo.splice(index, 1);
                if (this.TblHRemMast.TbldRemMastCo.length === 0) {
                  this.addRow('TbldRemMastCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldRemMastCo') {
            this.TblHRemMast.TbldRemMastCo.splice(index, 1);
            if (this.TblHRemMast.TbldRemMastCo.length === 0) {
              this.addRow('TbldRemMastCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldRemMastCo') {
      const newRow = new TbldRemMastCo()
      this.TblHRemMast.TbldRemMastCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHRemMast.HRemMast_Code == null || this.TblHRemMast.HRemMast_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Remarks Master Code Cannot Be Null' });
      return false;
    }

    if (this.TblHRemMast.HRemMast_Name == null || this.TblHRemMast.HRemMast_Name.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Remarks Master Name Cannot Be Null' });
      return false;
    }

    if (this.TblHRemMast.TbldRemMastCo[0].DcRemMast_SingleCo_Code == null || this.TblHRemMast.TbldRemMastCo[0].DcRemMast_SingleCo_Code.toString().trim() === '') {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Remarks Single Company Code Cannot Be Null' });
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
    this.TblHRemMast.TbldRemMastCo = this.TblHRemMast.TbldRemMastCo.filter(
      row => row.DcRemMast_SingleCo_Code && row.DcRemMast_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.remarksMaster, this.TblHRemMast).then((res) => {
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
        this.TblHRemMast = new TblHRemMast();
        this.TblHRemMast.TbldRemMastCo = [new TbldRemMastCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/remarks/']);

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
    if (this.TblHRemMast.HRemMast_SysID || this.HRemMast_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.remarksMaster, this.TblHRemMast.HRemMast_SysID).then((res) => {
        this.TblHRemMast = res
        this.showDeleteButton = true;

        if (this.TblHRemMast.TbldRemMastCo.length == 0) {
          this.TblHRemMast.TbldRemMastCo = [new TbldRemMastCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHRemMast = new TblHRemMast()
          this.TblHRemMast.TbldRemMastCo = [new TbldRemMastCo()]
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
        this.masterService.deleteData(apiUrl.remarksMaster, this.TblHRemMast.HRemMast_SysID).then((res) => {

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
    this.TblHRemMast = new TblHRemMast()
    this.TblHRemMast.TbldRemMastCo = [new TbldRemMastCo()]
    this.router.navigate(['l-master/remarks/']);

  }
  cancel() {
    this.TblHRemMast = new TblHRemMast()
    this.TblHRemMast.TbldRemMastCo = [new TbldRemMastCo()]
    this.router.navigate(['l-master/remarks']);

  }

  // ---------------------------------------------------------------------List--------------------------
  displayRemarksList() {
    this.showRemarksList = true
    this.getListData()
  }

  getListData() {
    this.masterService.getMasterData(apiUrl.remarksMaster).then((res) => {
      this.listData = res
      this.filterTable()
    })
  }

  filterTable() {
    const query = this.searchText?.toLowerCase() || '';
    this.filteredfilteredlistData = this.listData.filter(item => {
      const hasData = item.HRemMast_Code || item.HRemMast_Name || item.HRemMast_SysID;
      const matchesQuery =
        (item.HRemMast_Code || '').toLowerCase().includes(query) ||
        (item.HRemMast_Name || '').toLowerCase().includes(query) ||
        item.HRemMast_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showRemarksList = false
    this.router.navigate(['l-master/remarks']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/remarks/' + rowData.HRemMast_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.remarksMaster, rowData.HRemMast_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showRemarksList = false

            this.getListData()
          }

        });
      }
    });
  }


}