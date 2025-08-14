import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TbldInterCoMessCo } from 'src/app/_dto/TbldInterCoMessCo.dto';
import { TblHInterCoMess } from 'src/app/_dto/TblHInterCoMess.dto';
import { CommonPopupService } from 'src/app/_providers/common-popup.service';
import { MasterService } from 'src/app/_providers/master.service';
import { LookupDialogService } from 'src/app/_providers/popup.service';
import { apiUrl } from 'src/app/_resources/api-url.properties';
@Component({
  selector: 'app-inter-company-message-master',
  templateUrl: './inter-company-message-master.component.html',
  styleUrls: ['./inter-company-message-master.component.scss']
})
export class InterCompanyMessageMasterComponent implements OnInit {
 TblHInterCoMess: TblHInterCoMess = new TblHInterCoMess()


  listData = []

  searchText: string = '';

  filteredfilteredlistData = [...this.listData];

  showInterCompanyList: boolean = false

  tableIndex: any;

  HInterCoMess_SysID: any;

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
    this.TblHInterCoMess.TbldInterCoMessCo = [new TbldInterCoMessCo()]
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
        this.showDeleteButton = true;
        this.HInterCoMess_SysID = Number(id);
        this.TblHInterCoMess.HInterCoMess_SysID = Number(id);
        this.getdata()
      }
    });
  }


  ShowPopUp(Type, i?) {

    this.tableIndex = i

    switch (Type) {

      case 'ApplicableCompanyCode':
        break;
      case 'AccDirectExpCode':
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

        const selectedCode = event.code
        const isExist = this.TblHInterCoMess.TbldInterCoMessCo.some(item => item.DcInterCoMess_SingleCo_Code === selectedCode)

        if (isExist) {
          return;
        }
        this.TblHInterCoMess.TbldInterCoMessCo[this.tableIndex].DcInterCoMess_SingleCo_SysID = event.sysId
        this.TblHInterCoMess.TbldInterCoMessCo[this.tableIndex].DcInterCoMess_SingleCo_Code = event.code
        this.TblHInterCoMess.TbldInterCoMessCo[this.tableIndex].DcInterCoMess_SingleCo_Name = event.name
        break;


      case 'ActAndDeactCode':
        this.TblHInterCoMess.HInterCoMess_AcDe_Code = event.code
        this.TblHInterCoMess.HInterCoMess_AcDe_Name = event.name
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


        if (this.TblHInterCoMess.HInterCoMess_SysID && rowData.DcInterCoMess_SingleCo_SysID) {
          this.masterService.deleteData(apiUrl.remarksMaster, `company?where[DcInterCoMess_SysID]=${this.TblHInterCoMess.TbldInterCoMessCo[0].DcInterCoMess_SysID}&where[DcInterCoMess_SingleCo_SysID]=${rowData.DcInterCoMess_SingleCo_SysID}`).then((res) => {

            if (res.success == false) {
              this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

            } else {
              this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
              if (table === 'TbldInterCoMessCo') {
                this.TblHInterCoMess.TbldInterCoMessCo.splice(index, 1);
                if (this.TblHInterCoMess.TbldInterCoMessCo.length === 0) {
                  this.addRow('TbldInterCoMessCo', -1);
                }
              }

            }

          });
        } else {
          if (table === 'TbldInterCoMessCo') {
            this.TblHInterCoMess.TbldInterCoMessCo.splice(index, 1);
            if (this.TblHInterCoMess.TbldInterCoMessCo.length === 0) {
              this.addRow('TbldInterCoMessCo', -1);
            }
          }
        }
      }
    });
  }


  addRow(table: any, index: number) {
    if (table == 'TbldInterCoMessCo') {
      const newRow = new TbldInterCoMessCo()
      this.TblHInterCoMess.TbldInterCoMessCo.splice(index + 1, 0, newRow);

    }
  }

  routeTo(screen) {
    this.router.navigate(['l-master/' + screen]);
  }

  preSave(): boolean {
    if (this.TblHInterCoMess.HInterCoMess_Code == null || this.TblHInterCoMess.HInterCoMess_Code.toString().trim() === '') {
      return false;
    }

    if (this.TblHInterCoMess.HInterCoMess_Name == null || this.TblHInterCoMess.HInterCoMess_Name.toString().trim() === '') {
      return false;
    }

     if (this.TblHInterCoMess.TbldInterCoMessCo[0].DcInterCoMess_SingleCo_Code == null || this.TblHInterCoMess.TbldInterCoMessCo[0].DcInterCoMess_SingleCo_Code.toString().trim() === '') {
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
    this.TblHInterCoMess.TbldInterCoMessCo = this.TblHInterCoMess.TbldInterCoMessCo.filter(
      row => row.DcInterCoMess_SingleCo_Code && row.DcInterCoMess_SingleCo_Code.trim() !== ''
    );

    this.masterService.saveMasterData(apiUrl.remarksMaster, this.TblHInterCoMess).then((res) => {
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
        this.TblHInterCoMess = new TblHInterCoMess();
        this.TblHInterCoMess.TbldInterCoMessCo = [new TbldInterCoMessCo()];

        // Navigate to list screen
        this.router.navigate(['l-master/inter-company-message-master/']);

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
    if (this.TblHInterCoMess.HInterCoMess_SysID || this.HInterCoMess_SysID) {
      this.masterService.getMasterDatabyId(apiUrl.remarksMaster, this.TblHInterCoMess.HInterCoMess_SysID).then((res) => {
        this.TblHInterCoMess = res
        this.showDeleteButton = true;

        if (this.TblHInterCoMess.TbldInterCoMessCo.length == 0) {
          this.TblHInterCoMess.TbldInterCoMessCo = [new TbldInterCoMessCo()]
        }

      }, err => {
        if (err.error.statusCode == 404) {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          this.TblHInterCoMess = new TblHInterCoMess()
          this.TblHInterCoMess.TbldInterCoMessCo = [new TbldInterCoMessCo()]
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
        this.masterService.deleteData(apiUrl.remarksMaster, this.TblHInterCoMess.HInterCoMess_SysID).then((res) => {

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
    this.TblHInterCoMess = new TblHInterCoMess()
    this.TblHInterCoMess.TbldInterCoMessCo = [new TbldInterCoMessCo()]
    this.router.navigate(['l-master/inter-company-message-master/']);

  }
  cancel() {
    this.TblHInterCoMess = new TblHInterCoMess()
    this.TblHInterCoMess.TbldInterCoMessCo = [new TbldInterCoMessCo()]
    this.router.navigate(['l-master/inter-company-message-master']);
  }

  // ---------------------------------------------------------------------List--------------------------
  displayInterCompanyList() {
    this.showInterCompanyList = true
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
      const hasData = item.HInterCoMess_Code || item.HInterCoMess_Name || item.HInterCoMess_SysID;
      const matchesQuery =
        (item.HInterCoMess_Code || '').toLowerCase().includes(query) ||
        (item.HInterCoMess_Name || '').toLowerCase().includes(query) ||
        item.HInterCoMess_SysID?.toString().includes(query);
      return hasData && matchesQuery;
    });
  }

  Back() {
    this.showInterCompanyList = false
    this.router.navigate(['l-master/inter-company-message-master']);


  }
  editRow(rowData: any) {
    this.router.navigate(['l-master/inter-company-message-master/' + rowData.HInterCoMess_SysID]);
  }


  deletelistRow(rowData: any, index: number) {

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.masterService.deleteData(apiUrl.remarksMaster, rowData.HInterCoMess_SysID).then((res) => {

          if (res.success == false) {
            this._messageService.add({ severity: 'error', summary: 'Error', detail: res.message });

          } else {
            this._messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
            this.showInterCompanyList = false

            this.getListData()
          }

        });
      }
    });
  }
}
